import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE PROFILER
// Runs once at load time. Determines the correct frame count, resolution cap,
// and worker count for the current device. Mobile-first — never over-allocates.
// ─────────────────────────────────────────────────────────────────────────────
function getDeviceProfile() {
  const ua        = navigator.userAgent || "";
  const isIOS     = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile  = isIOS || isAndroid || window.innerWidth < 768;

  // navigator.deviceMemory: 0.25 / 0.5 / 1 / 2 / 4 / 8 GB
  // Undefined on Safari — treat as unknown (assume mid-range)
  const ram = navigator.deviceMemory ?? 4;

  // navigator.connection.effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  const connType = navigator.connection?.effectiveType ?? "4g";
  const isSlow   = connType === "slow-2g" || connType === "2g" || connType === "3g";

  // OffscreenCanvas is available on:
  //   Chrome 69+, Edge 79+, Firefox 105+, Safari 16.4+
  // On older Safari (very common on iPhones < iOS 16.4) it crashes silently.
  // We detect it properly — don't assume.
  const hasOffscreen = (() => {
    try {
      const oc = new OffscreenCanvas(1, 1);
      oc.getContext("2d");
      return true;
    } catch (_) {
      return false;
    }
  })();

  // ImageDecoder: Chrome 94+, Safari 16.4+. Older devices fall back to
  // fetch + createImageBitmap automatically in the worker.
  const hasImageDecoder = typeof ImageDecoder !== "undefined";

  // Worker count — mobile devices get fewer workers to avoid RAM pressure.
  // Low-end Android / old iPhones: 2 workers max.
  // Mid-range mobile: 3 workers.
  // Desktop: up to 6 workers.
  let workerCount;
  if (!isMobile) {
    workerCount = Math.min(navigator.hardwareConcurrency || 4, 6);
  } else if (ram <= 2 || isSlow) {
    workerCount = 2;
  } else {
    workerCount = Math.min(navigator.hardwareConcurrency || 2, 3);
  }

  // Frame stride — how many source frames to skip between loaded frames.
  // More stride = fewer frames in memory = safer on low-end devices.
  // Desktop:           stride 1  → 192 frames (buttery)
  // Mobile high-end:   stride 3  → 64 frames  (smooth)
  // Mobile mid-range:  stride 4  → 48 frames  (good)
  // Mobile low-end / slow net: stride 6 → 32 frames (safe)
  let stride;
  if (!isMobile) {
    stride = 1;
  } else if (ram >= 4 && !isSlow) {
    stride = 3;
  } else if (ram >= 2) {
    stride = 4;
  } else {
    stride = 6;
  }

  // Resolution cap — bitmaps are baked at this size.
  // This is the SINGLE most important memory protection.
  // Desktop:    cap 1920×1080
  // Mobile:     cap 720×405  (plenty sharp on a phone screen)
  // Low-end:    cap 540×303
  const dpr     = Math.min(window.devicePixelRatio || 1, 2);
  let maxW, maxH;
  if (!isMobile) {
    maxW = 1920; maxH = 1080;
  } else if (ram >= 2 && !isSlow) {
    maxW = 720;  maxH = 405;
  } else {
    maxW = 540;  maxH = 303;
  }

  const bitmapW = Math.min(Math.round(window.innerWidth  * dpr), maxW);
  const bitmapH = Math.min(Math.round(window.innerHeight * dpr), maxH);

  return {
    isMobile,
    isIOS,
    isAndroid,
    stride,
    bitmapW,
    bitmapH,
    workerCount,
    hasOffscreen,
    hasImageDecoder,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE WORKER SOURCE
// Runs entirely off the main thread — zero main-thread decode cost.
//
// Decode pipeline (auto-selects best available API):
//   1. ImageDecoder  → Chrome 94+, Safari 16.4+  (fastest, stream-based)
//   2. createImageBitmap(blob) → universal fallback (works everywhere)
//
// The bitmap is resized to display resolution INSIDE the worker.
// The main thread receives a ready-to-draw, GPU-resident texture.
// ─────────────────────────────────────────────────────────────────────────────
const WORKER_SOURCE = `
async function decode(url, w, h) {
  // Strategy 1: ImageDecoder API (fastest)
  if (typeof ImageDecoder !== 'undefined') {
    try {
      const res  = await fetch(url);
      const type = res.headers.get('content-type') || 'image/webp';
      const dec  = new ImageDecoder({ data: res.body, type, preferAnimation: false });
      await dec.completed;
      const { image } = await dec.decode({ frameIndex: 0 });
      const bm = await createImageBitmap(image, {
        resizeWidth: w, resizeHeight: h, resizeQuality: 'medium',
      });
      image.close();
      dec.close();
      return bm;
    } catch (_) {
      // Fall through to Strategy 2
    }
  }

  // Strategy 2: fetch + createImageBitmap (universal — works on all browsers)
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob, {
    resizeWidth: w, resizeHeight: h, resizeQuality: 'medium',
  });
}

self.onmessage = async ({ data: { id, url, w, h } }) => {
  try {
    const bitmap = await decode(url, w, h);
    // Transfer the bitmap to the main thread — zero copy, no serialisation cost
    self.postMessage({ id, ok: true, bitmap }, [bitmap]);
  } catch (e) {
    // Per-frame failure is non-fatal — nearest-neighbour fallback covers gaps
    self.postMessage({ id, ok: false, error: e.message });
  }
};
`;

// ─────────────────────────────────────────────────────────────────────────────
// WORKER POOL
// Spawns N workers from a Blob URL — no file config needed.
// Maintains a task queue so workers stay busy without over-queuing.
// ─────────────────────────────────────────────────────────────────────────────
function createWorkerPool(size) {
  const blob    = new Blob([WORKER_SOURCE], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);
  const workers = Array.from({ length: size }, () => new Worker(blobUrl));
  URL.revokeObjectURL(blobUrl); // safe — workers hold their own internal ref

  const pending = new Map();
  const busy    = new Array(size).fill(false);
  const queue   = [];
  let   seq     = 0;

  function drain() {
    if (!queue.length) return;
    const idx = busy.findIndex((b) => !b);
    if (idx === -1) return;
    const { task, resolve, reject } = queue.shift();
    busy[idx] = true;
    pending.set(task.id, { resolve, reject });
    workers[idx].postMessage(task);
  }

  workers.forEach((w, i) => {
    w.onmessage = ({ data }) => {
      busy[i] = false;
      const p = pending.get(data.id);
      if (!p) return;
      pending.delete(data.id);
      data.ok ? p.resolve(data.bitmap) : p.reject(new Error(data.error));
      drain();
    };
    w.onerror = (e) => {
      busy[i] = false;
      // Drain so the queue doesn't stall on a worker error
      drain();
    };
  });

  return {
    decode(url, w, h) {
      const id = seq++;
      return new Promise((resolve, reject) => {
        queue.push({ task: { id, url, w, h }, resolve, reject });
        drain();
      });
    },
    terminate() {
      workers.forEach((w) => w.terminate());
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY LOAD ORDER
// Loads anchor frames first so any scrub position has a nearby frame ready.
// Order: frame 0 → 25% → 50% → 75% → 100% → fill everything in between.
// ─────────────────────────────────────────────────────────────────────────────
function buildPriorityOrder(total) {
  const seen  = new Set();
  const order = [];
  const add   = (i) => {
    const c = Math.min(Math.max(i, 0), total - 1);
    if (!seen.has(c)) { seen.add(c); order.push(c); }
  };
  [0, Math.floor(total * 0.25), Math.floor(total * 0.5), Math.floor(total * 0.75), total - 1]
    .forEach(add);
  for (let i = 0; i < total; i++) add(i);
  return order;
}

// ─────────────────────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

// ═════════════════════════════════════════════════════════════════════════════
// useAppleScrollFrames
// Mobile-first, crash-proof, full Apple-grade implementation.
// ═════════════════════════════════════════════════════════════════════════════
export function useAppleScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
}) {
  // ── Bitmap store — sparse array, fills slot-by-slot as workers finish
  const cache     = useRef([]);
  const cacheSize = useRef(0);

  // ── OffscreenCanvas double-buffer (prevents tearing)
  // Only created if hasOffscreen=true (guarded per device)
  const offscreen   = useRef(null);
  const offCtx      = useRef(null);
  const mainCtx     = useRef(null);

  // ── rAF
  const rafId    = useRef(null);
  const rafReady = useRef(false);
  const curFrame = useRef(-1);
  const dirty    = useRef(false);

  // ── Scroll velocity (5-sample ring buffer for 1-frame lookahead)
  const velBuf = useRef([]);

  // ── Visibility guards
  const pageVisible = useRef(true);
  const inView      = useRef(true);

  // ── Scroll geometry
  const sectionTop   = useRef(0);
  const scrollHeight = useRef(0);

  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function syncGeometry() {
    const s = sectionRef.current;
    if (!s) return;
    const rect         = s.getBoundingClientRect();
    sectionTop.current   = rect.top + window.scrollY;
    scrollHeight.current = s.offsetHeight - window.innerHeight;
  }

  function syncCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw  = Math.round(c.offsetWidth  * dpr);
    const ph  = Math.round(c.offsetHeight * dpr);
    if (c.width === pw && c.height === ph) return; // no change — don't rebuild

    c.width  = pw;
    c.height = ph;

    // Re-acquire main context (invalidated after resize in some browsers)
    mainCtx.current = c.getContext("2d", { alpha: false });

    // Rebuild offscreen buffer ONLY if the device supports it safely
    // (hasOffscreen was checked at profile time)
    if (offscreen.current) {
      offscreen.current = new OffscreenCanvas(pw, ph);
      offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
    }

    dirty.current = true;
  }

  // ── drawFrame — double-buffered on supported devices, direct on others ──
  function drawFrame(idx) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = mainCtx.current;
    if (!ctx) return;

    // Find best available bitmap — exact match or nearest loaded neighbour
    const len = cache.current.length;
    let bm    = (len > 0 && idx < len) ? cache.current[idx] : null;
    if (!bm) {
      for (let d = 1; d < Math.min(len, 64); d++) {
        bm = cache.current[clamp(idx - d, 0, len - 1)] ?? null; if (bm) break;
        bm = cache.current[clamp(idx + d, 0, len - 1)] ?? null; if (bm) break;
      }
    }
    if (!bm) return;

    const cw = canvas.width,  ch = canvas.height;
    const bw = bm.width,      bh = bm.height;
    const scale = Math.max(cw / bw, ch / bh);
    const dw    = bw * scale, dh = bh * scale;
    const dx    = (cw - dw) / 2, dy = (ch - dh) / 2;

    const off = offscreen.current;
    const oc  = offCtx.current;

    if (off && oc && off.width === cw && off.height === ch) {
      // Double-buffer path: compose offscreen → blit atomically to visible canvas
      oc.drawImage(bm, dx, dy, dw, dh);
      ctx.drawImage(off, 0, 0);
    } else {
      // Direct path: OffscreenCanvas unavailable (older Safari, Firefox < 105)
      ctx.drawImage(bm, dx, dy, dw, dh);
    }
  }

  // ── rAF loop ──────────────────────────────────────────────────────────────
  function startRaf() {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    function tick() {
      rafId.current = requestAnimationFrame(tick);

      // Gate: only draw when ready and visible
      if (!rafReady.current || !pageVisible.current || !inView.current) return;
      if (cacheSize.current === 0) return;

      // ── Velocity prediction: 1-frame lookahead ───────────────────────────
      // Samples scroll position into a ring buffer and predicts where the
      // viewport will be in ~16.67ms. Canvas stays in sync with the finger.
      const now = performance.now();
      const vb  = velBuf.current;
      vb.push({ y: window.scrollY, t: now });
      if (vb.length > 5) vb.shift();

      let predictedY = window.scrollY;
      if (vb.length >= 2) {
        const dt = vb[vb.length - 1].t - vb[0].t;
        if (dt > 0) {
          const vel  = (vb[vb.length - 1].y - vb[0].y) / dt; // px/ms
          predictedY = window.scrollY + vel * 16.667;
        }
      }

      // ── Map scroll → frame index ─────────────────────────────────────────
      const sh  = scrollHeight.current;
      const raw = sh > 0 ? clamp((predictedY - sectionTop.current) / sh, 0, 1) : 0;
      const idx = clamp(
        Math.round(easeInOut(raw) * (cacheSize.current - 1)),
        0,
        cacheSize.current - 1
      );

      if (idx !== curFrame.current) {
        curFrame.current = idx;
        dirty.current    = true;
      }

      // Only call drawImage when the frame actually changes — zero GPU work
      // when the user is not scrolling
      if (dirty.current) {
        dirty.current = false;
        drawFrame(curFrame.current);
      }
    }

    rafId.current = requestAnimationFrame(tick);
  }

  // ── Effects ───────────────────────────────────────────────────────────────

  // Page visibility — pause rAF when tab is backgrounded (saves battery)
  useEffect(() => {
    if (reducedMotion) return;
    const h = () => { pageVisible.current = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [reducedMotion]);

  // ResizeObserver — keep canvas size + scroll geometry accurate
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const ro = new ResizeObserver(() => {
      syncCanvas();
      syncGeometry();
    });
    ro.observe(section);
    ro.observe(canvas);

    // Must run synchronously — geometry must be correct before first scroll
    syncCanvas();
    syncGeometry();
    return () => ro.disconnect();
  }, [reducedMotion]);

  // Passive scroll listener — keeps sectionTop fresh on every scroll tick.
  // ResizeObserver alone misses scroll-driven layout shifts.
  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("scroll", syncGeometry, { passive: true });
    return () => window.removeEventListener("scroll", syncGeometry);
  }, [reducedMotion]);

  // IntersectionObserver — pause rAF when hero is fully off-screen
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const io = new IntersectionObserver(
      ([e]) => { inView.current = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  // ── Main load effect ───────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    // Profile the device — determines stride, resolution, worker count
    const profile = getDeviceProfile();

    // Build frame index list based on device profile
    const frames = [];
    for (let i = 1; i <= totalFrames; i += profile.stride) frames.push(i);
    const total = frames.length;

    // Reset all state
    cache.current      = new Array(total).fill(null);
    cacheSize.current  = 0; // rAF uses this — 0 means "not ready yet"
    curFrame.current   = -1;
    dirty.current      = false;
    rafReady.current   = false;
    velBuf.current     = [];
    offscreen.current  = null;
    offCtx.current     = null;
    mainCtx.current    = null;

    const pool = createWorkerPool(profile.workerCount);
    let cancelled = false;

    // Workers use Blob URLs — relative paths like /hero-frames/... resolve
    // against the blob origin, not the page. Always pass absolute URLs.
    const abs = (path) => new URL(path, window.location.href).href;

    startRaf();

    async function load() {
      // ── PHASE 1: Poster frame ─────────────────────────────────────────────
      // Decode frame 1 immediately. Draw it. Flip rafReady = true.
      // The user can scroll from this exact moment — animation is live.
      try {
        const bm = await pool.decode(
          abs(framePath(frames[0])),
          profile.bitmapW,
          profile.bitmapH
        );
        if (cancelled) { bm?.close(); return; }

        // Ensure canvas is correctly sized before first draw
        syncCanvas();
        syncGeometry();

        const c = canvasRef.current;
        if (c) {
          mainCtx.current = c.getContext("2d", { alpha: false });

          // Init offscreen buffer ONLY on devices that support it safely
          if (profile.hasOffscreen) {
            try {
              offscreen.current = new OffscreenCanvas(c.width, c.height);
              offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
            } catch (_) {
              // Device reported OffscreenCanvas support but failed — degrade safely
              offscreen.current = null;
              offCtx.current    = null;
            }
          }
        }

        cache.current[0]  = bm;
        cacheSize.current = 1; // unlock rAF — exactly 1 frame available
        curFrame.current  = 0;
        dirty.current     = true;
        drawFrame(0); // immediate poster draw

        // ✅ Scroll animation is now LIVE
        rafReady.current = true;

      } catch (e) {
        console.error("[hero] poster frame failed:", e);
        // Unlock anyway so the page isn't broken — canvas just stays black
        if (!cancelled) rafReady.current = true;
      }

      // ── PHASE 2: Remaining frames in priority order ───────────────────────
      // workerCount frames decode in parallel, completely off the main thread.
      // Slots fill in progressively — rAF nearest-neighbour covers any gaps.
      // No batching needed — the pool queue manages concurrency automatically.
      const order = buildPriorityOrder(total).slice(1); // slot 0 already done

      await Promise.all(
        order.map((slotIdx) =>
          pool
            .decode(abs(framePath(frames[slotIdx])), profile.bitmapW, profile.bitmapH)
            .then((bm) => {
              if (cancelled) { bm?.close(); return; }
              cache.current[slotIdx] = bm;
              // Update cacheSize to the highest consecutive loaded slot
              // so rAF can address it safely
              let s = cacheSize.current;
              while (s < total && cache.current[s] != null) s++;
              cacheSize.current = s;
              dirty.current = true;
            })
            .catch(() => {
              // Single frame failure — silent, nearest-neighbour covers it
            })
        )
      );

      if (!cancelled) {
        cacheSize.current = total;
        setIsFullyLoaded(true);
      }
    }

    load().catch(console.error);

    return () => {
      cancelled = true;
      rafReady.current  = false;
      offscreen.current = null;
      offCtx.current    = null;
      mainCtx.current   = null;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      pool.terminate();
      // Free every bitmap from GPU memory — critical on mobile
      cache.current.forEach((bm) => bm?.close());
      cache.current     = [];
      cacheSize.current = 0;
    };
  }, [totalFrames, reducedMotion]);

  return { isFullyLoaded };
}