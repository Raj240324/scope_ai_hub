import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// WHY NO WORKERS
// This site's CSP blocks blob: URL workers ("worker-src" falls back to
// "script-src" which only allows 'self' — blob: is rejected).
// Solution: decode frames on the main thread using img.decode() +
// createImageBitmap, yielding back to the browser between every batch via
// setTimeout(0). The browser paints, handles input, and runs rAF between
// batches — the main thread is never starved, scroll stays smooth.
// ─────────────────────────────────────────────────────────────────────────────

// ── Yield to browser between decode batches ──────────────────────────────────
const yieldToMain = () => new Promise((r) => setTimeout(r, 0));

// ── Decode one frame → GPU-resident ImageBitmap ──────────────────────────────
// Strategy 1: img.decode() — works everywhere (Chrome, Safari, Firefox, all Android)
// Strategy 2: fetch + blob fallback — for any browser that fails img.decode()
async function decodeBitmap(url, w, h) {
  // Strategy 1: img.decode() — universal, no fetch needed
  try {
    const img = new Image();
    img.src = url;
    await img.decode(); // fully decoded before GPU upload
    return await createImageBitmap(img, {
      resizeWidth:   w,
      resizeHeight:  h,
      resizeQuality: "medium",
    });
  } catch (_) {
    // Strategy 2: fetch → blob fallback
    const blob = await (await fetch(url)).blob();
    return await createImageBitmap(blob, {
      resizeWidth:   w,
      resizeHeight:  h,
      resizeQuality: "medium",
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE PROFILER
// Runs once. Determines the correct frame count, bitmap resolution, and
// batch size for the current device. Mobile-first — never over-allocates.
// ─────────────────────────────────────────────────────────────────────────────
function getDeviceProfile() {
  const ua        = navigator.userAgent || "";
  const isIOS     = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile  = isIOS || isAndroid || window.innerWidth < 768;

  // navigator.deviceMemory: 0.25 / 0.5 / 1 / 2 / 4 / 8 GB (undefined on Safari)
  const ram      = navigator.deviceMemory ?? 4;
  const connType = navigator.connection?.effectiveType ?? "4g";
  const isSlow   = connType === "slow-2g" || connType === "2g" || connType === "3g";

  // OffscreenCanvas — check properly, not just typeof
  const hasOffscreen = (() => {
    try { new OffscreenCanvas(1, 1).getContext("2d"); return true; }
    catch (_) { return false; }
  })();

  // Frame stride — how many source frames to skip
  // Desktop:           1  → 192 frames (buttery, every frame)
  // Mobile high-end:   3  → 64 frames  (smooth)
  // Mobile mid-range:  4  → 48 frames  (good)
  // Mobile low-end / slow net: 6 → 32 frames (safe, no OOM)
  let stride;
  if (!isMobile)                      stride = 1;
  else if (ram >= 4 && !isSlow)       stride = 3;
  else if (ram >= 2)                  stride = 4;
  else                                stride = 6;

  // Bitmap resolution cap — THE most important memory protection
  // Bitmaps are baked at this size; GPU never sees full 1920×1080 on mobile
  const dpr  = Math.min(window.devicePixelRatio || 1, 2);
  let maxW, maxH;
  if (!isMobile)            { maxW = 1920; maxH = 1080; }
  else if (ram >= 2 && !isSlow) { maxW = 720;  maxH = 405;  }
  else                      { maxW = 540;  maxH = 303;  }

  const bitmapW = Math.min(Math.round(window.innerWidth  * dpr), maxW);
  const bitmapH = Math.min(Math.round(window.innerHeight * dpr), maxH);

  // Decode batch size — how many frames to decode before yielding to the browser.
  // Smaller = more responsive during load but slightly slower total decode.
  // Mobile gets smaller batches to keep touch and scroll responsive.
  const batchSize = isMobile ? 4 : 8;

  return { isMobile, isIOS, isAndroid, stride, bitmapW, bitmapH, batchSize, hasOffscreen };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY LOAD ORDER
// Poster (0%) → keyframes at 25/50/75/100% → fill everything else
// Means any scrub position has a nearby frame available immediately
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
// CSP-safe (no blob workers), works on all browsers, mobile-first.
// ═════════════════════════════════════════════════════════════════════════════
export function useAppleScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
}) {
  // ── Bitmap store
  const cache     = useRef([]);
  const cacheSize = useRef(0); // highest consecutive loaded slot — rAF reads this

  // ── OffscreenCanvas double-buffer (atomic frame flip, prevents tearing)
  const offscreen = useRef(null);
  const offCtx    = useRef(null);
  const mainCtx   = useRef(null);

  // ── rAF
  const rafId    = useRef(null);
  const rafReady = useRef(false); // true after poster frame is drawn
  const curFrame = useRef(-1);
  const dirty    = useRef(false);

  // ── Scroll velocity prediction (5-sample ring buffer)
  const velBuf = useRef([]);

  // ── Visibility guards — pause rAF when not needed
  const pageVisible = useRef(true);
  const inView      = useRef(true);

  // ── Scroll geometry
  const sectionTop   = useRef(0);
  const scrollHeight = useRef(0);

  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────────────────
  function syncGeometry() {
    const s = sectionRef.current;
    if (!s) return;
    const rect           = s.getBoundingClientRect();
    sectionTop.current   = rect.top + window.scrollY;
    scrollHeight.current = s.offsetHeight - window.innerHeight;
  }

  function syncCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw  = Math.round(c.offsetWidth  * dpr);
    const ph  = Math.round(c.offsetHeight * dpr);
    if (c.width === pw && c.height === ph) return; // no change

    c.width  = pw;
    c.height = ph;
    mainCtx.current = c.getContext("2d", { alpha: false });

    // Rebuild offscreen buffer at new canvas size
    if (offscreen.current) {
      try {
        offscreen.current = new OffscreenCanvas(pw, ph);
        offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
      } catch (_) {
        offscreen.current = null;
        offCtx.current    = null;
      }
    }
    dirty.current = true;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // drawFrame — double-buffered on supported browsers, direct on others
  // ─────────────────────────────────────────────────────────────────────────
  function drawFrame(idx) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = mainCtx.current;
    if (!ctx) return;

    // Find best available bitmap — nearest loaded neighbour if exact not ready
    const len = cache.current.length;
    let bm    = (len > 0 && idx < len) ? (cache.current[idx] ?? null) : null;
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
      // Double-buffer: draw offscreen first, then blit atomically
      oc.drawImage(bm, dx, dy, dw, dh);
      ctx.drawImage(off, 0, 0);
    } else {
      // Direct draw (OffscreenCanvas unavailable — older Safari / Firefox)
      ctx.drawImage(bm, dx, dy, dw, dh);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // rAF loop — velocity prediction + dirty-flag draw
  // ─────────────────────────────────────────────────────────────────────────
  function startRaf() {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    function tick() {
      rafId.current = requestAnimationFrame(tick);

      if (!rafReady.current || !pageVisible.current || !inView.current) return;
      if (cacheSize.current === 0) return;

      // ── Velocity prediction: 1-frame lookahead ───────────────────────────
      // Ring-buffer last 5 scroll positions + timestamps.
      // Extrapolate 16.67ms forward so canvas matches where the finger WILL be.
      const now = performance.now();
      const vb  = velBuf.current;
      vb.push({ y: window.scrollY, t: now });
      if (vb.length > 5) vb.shift();

      let predictedY = window.scrollY;
      if (vb.length >= 2) {
        const dt = vb[vb.length - 1].t - vb[0].t;
        if (dt > 0) {
          const vel  = (vb[vb.length - 1].y - vb[0].y) / dt;
          predictedY = window.scrollY + vel * 16.667;
        }
      }

      // ── Map scroll position → frame index ────────────────────────────────
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

      // Only call drawImage when frame actually changes — zero GPU work at rest
      if (dirty.current) {
        dirty.current = false;
        drawFrame(curFrame.current);
      }
    }

    rafId.current = requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────────────────────

  // Page visibility — pause rAF when tab is backgrounded (saves battery/GPU)
  useEffect(() => {
    if (reducedMotion) return;
    const h = () => { pageVisible.current = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [reducedMotion]);

  // ResizeObserver — keep canvas pixel size + scroll geometry accurate
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ro = new ResizeObserver(() => { syncCanvas(); syncGeometry(); });
    ro.observe(section);
    ro.observe(canvas);
    syncCanvas();   // must run synchronously before first draw
    syncGeometry(); // must run synchronously before first scroll tick
    return () => ro.disconnect();
  }, [reducedMotion]);

  // Passive scroll listener — keeps sectionTop stale-free every tick
  // ResizeObserver alone misses scroll-driven layout shifts
  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("scroll", syncGeometry, { passive: true });
    return () => window.removeEventListener("scroll", syncGeometry);
  }, [reducedMotion]);

  // IntersectionObserver — pause rAF when hero is off-screen
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

  // ─────────────────────────────────────────────────────────────────────────
  // Main load effect
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    const profile = getDeviceProfile();

    // Build the frame list for this device
    const frames = [];
    for (let i = 1; i <= totalFrames; i += profile.stride) frames.push(i);
    const total = frames.length;

    // Reset all state
    cache.current      = new Array(total).fill(null);
    cacheSize.current  = 0;
    curFrame.current   = -1;
    dirty.current      = false;
    rafReady.current   = false;
    velBuf.current     = [];
    offscreen.current  = null;
    offCtx.current     = null;
    mainCtx.current    = null;

    let cancelled = false;

    startRaf(); // starts idle — activates when rafReady flips true

    async function load() {
      // ── PHASE 1: Poster frame ─────────────────────────────────────────────
      // Load frame 1, draw it immediately, then unlock scroll animation.
      // User can interact from this point — everything else loads behind them.
      try {
        const bm = await decodeBitmap(
          framePath(frames[0]),
          profile.bitmapW,
          profile.bitmapH
        );
        if (cancelled) { bm?.close(); return; }

        // Canvas must be correctly sized before first draw
        syncCanvas();
        syncGeometry();

        const c = canvasRef.current;
        if (c) {
          mainCtx.current = c.getContext("2d", { alpha: false });

          // Init offscreen buffer only if device supports it safely
          if (profile.hasOffscreen) {
            try {
              offscreen.current = new OffscreenCanvas(c.width, c.height);
              offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
            } catch (_) {
              offscreen.current = null;
              offCtx.current    = null;
            }
          }
        }

        cache.current[0]  = bm;
        cacheSize.current = 1;
        curFrame.current  = 0;
        dirty.current     = true;
        drawFrame(0); // immediate poster draw

        // ✅ Scroll animation is live from this exact point
        rafReady.current = true;

      } catch (e) {
        console.error("[hero] poster frame failed:", e);
        if (!cancelled) rafReady.current = true; // unlock anyway
      }

      // ── PHASE 2: Remaining frames in priority order ───────────────────────
      // Decode in small batches, yielding to the browser between each batch.
      // Nearest-neighbour fallback in drawFrame covers any gaps during loading.
      // Priority order: keyframes at 25/50/75/100% first, then fill in between.
      const order = buildPriorityOrder(total).slice(1); // slot 0 already done

      for (let b = 0; b < order.length; b += profile.batchSize) {
        if (cancelled) break;

        const batch = order.slice(b, b + profile.batchSize);

        // Decode this batch in parallel
        const results = await Promise.allSettled(
          batch.map((slotIdx) =>
            decodeBitmap(
              framePath(frames[slotIdx]),
              profile.bitmapW,
              profile.bitmapH
            ).then((bm) => ({ slotIdx, bm }))
          )
        );

        if (cancelled) {
          results.forEach((r) => r.status === "fulfilled" && r.value?.bm?.close());
          break;
        }

        // Write successful bitmaps into the cache
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value?.bm) {
            const { slotIdx, bm } = r.value;
            cache.current[slotIdx] = bm;
          }
        });

        // Advance cacheSize to the highest consecutive loaded slot
        // This is what rAF reads — it must only advance forward, never jump
        let s = cacheSize.current;
        while (s < total && cache.current[s] != null) s++;
        cacheSize.current = s;

        dirty.current = true; // repaint on next rAF tick

        // Yield to browser — allows scroll, touch, and paint between batches
        await yieldToMain();
      }

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
      // Free all bitmaps from GPU memory — critical on mobile
      cache.current.forEach((bm) => bm?.close());
      cache.current     = [];
      cacheSize.current = 0;
    };
  }, [totalFrames, reducedMotion]);

  return { isFullyLoaded };
}