import { useEffect, useRef, useState } from "react";
import FrameWorker from "../utils/frameWorker.js?worker";

// ─────────────────────────────────────────────────────────────────────────────
// heroFrameCache preloads frames during the preloader window.
// By the time this hook runs, the browser HTTP cache already has every frame.
// Workers fetch the same URLs → instant cache hits → zero network wait.
// No shared memory needed — browser cache handles it automatically.
// ─────────────────────────────────────────────────────────────────────────────

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

function getDeviceProfile() {
  const ua        = navigator.userAgent || "";
  const isIOS     = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile  = isIOS || isAndroid || window.innerWidth < 768;
  const ram       = navigator.deviceMemory ?? 4;
  const connType  = navigator.connection?.effectiveType ?? "4g";
  const isSlow    = connType === "slow-2g" || connType === "2g" || connType === "3g";

  const hasOffscreen = (() => {
    try { new OffscreenCanvas(1, 1).getContext("2d"); return true; }
    catch (_) { return false; }
  })();

  let workerCount;
  if (!isMobile)               workerCount = Math.min(navigator.hardwareConcurrency || 4, 6);
  else if (ram <= 2 || isSlow) workerCount = 2;
  else                         workerCount = Math.min(navigator.hardwareConcurrency || 2, 3);

  let stride;
  if (!isMobile)                    stride = 1;
  else if (ram >= 4 && !isSlow)     stride = 3;
  else if (ram >= 2)                stride = 4;
  else                              stride = 6;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let maxW, maxH;
  if (!isMobile)                    { maxW = 1920; maxH = 1080; }
  else if (ram >= 2 && !isSlow)     { maxW = 720;  maxH = 405;  }
  else                              { maxW = 540;  maxH = 303;  }

  return {
    stride, workerCount, hasOffscreen,
    bitmapW: Math.min(Math.round(window.innerWidth  * dpr), maxW),
    bitmapH: Math.min(Math.round(window.innerHeight * dpr), maxH),
  };
}

function buildPriorityOrder(total) {
  const seen  = new Set();
  const order = [];
  const add   = (i) => {
    const c = Math.min(Math.max(i, 0), total - 1);
    if (!seen.has(c)) { seen.add(c); order.push(c); }
  };
  [0, Math.floor(total * 0.25), Math.floor(total * 0.5),
   Math.floor(total * 0.75), total - 1].forEach(add);
  for (let i = 0; i < total; i++) add(i);
  return order;
}

function createWorkerPool(size) {
  const workers = Array.from({ length: size }, () => new FrameWorker());
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
    w.onerror = () => { busy[i] = false; drain(); };
  });

  return {
    decode(url, w, h) {
      const id = seq++;
      return new Promise((resolve, reject) => {
        queue.push({ task: { id, url, w, h }, resolve, reject });
        drain();
      });
    },
    terminate() { workers.forEach((w) => w.terminate()); },
  };
}

// ═════════════════════════════════════════════════════════════════════════════
export function useAppleScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
}) {
  const cache     = useRef([]);
  const cacheSize = useRef(0);

  const offscreen = useRef(null);
  const offCtx    = useRef(null);
  const mainCtx   = useRef(null);

  const rafId    = useRef(null);
  const rafReady = useRef(false);
  const curFrame = useRef(-1);
  const dirty    = useRef(false);
  const velBuf   = useRef([]);

  const pageVisible  = useRef(true);
  const inView       = useRef(true);
  const sectionTop   = useRef(0);
  const scrollHeight = useRef(0);

  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ── helpers ──────────────────────────────────────────────────────────────

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
    if (c.width === pw && c.height === ph) return;
    c.width  = pw;
    c.height = ph;
    mainCtx.current = c.getContext("2d", { alpha: false });
    if (offscreen.current) {
      try {
        offscreen.current = new OffscreenCanvas(pw, ph);
        offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
      } catch (_) { offscreen.current = null; offCtx.current = null; }
    }
    dirty.current = true;
  }

  function drawFrame(idx) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = mainCtx.current;
    if (!ctx) return;

    const len = cache.current.length;
    let bm    = (len > 0 && idx < len) ? (cache.current[idx] ?? null) : null;
    if (!bm) {
      for (let d = 1; d < Math.min(len, 64); d++) {
        bm = cache.current[clamp(idx - d, 0, len - 1)] ?? null; if (bm) break;
        bm = cache.current[clamp(idx + d, 0, len - 1)] ?? null; if (bm) break;
      }
    }
    if (!bm) return;

    const cw    = canvas.width,  ch = canvas.height;
    const bw    = bm.width,      bh = bm.height;
    const scale = Math.max(cw / bw, ch / bh);
    const dw    = bw * scale,    dh = bh * scale;
    const dx    = (cw - dw) / 2, dy = (ch - dh) / 2;

    const off = offscreen.current;
    const oc  = offCtx.current;
    if (off && oc && off.width === cw && off.height === ch) {
      oc.drawImage(bm, dx, dy, dw, dh);
      ctx.drawImage(off, 0, 0);
    } else {
      ctx.drawImage(bm, dx, dy, dw, dh);
    }
  }

  function startRaf() {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    function tick() {
      rafId.current = requestAnimationFrame(tick);
      if (!rafReady.current || !pageVisible.current || !inView.current) return;
      if (cacheSize.current === 0) return;

      // velocity prediction — 1 frame lookahead
      const now = performance.now();
      const vb  = velBuf.current;
      vb.push({ y: window.scrollY, t: now });
      if (vb.length > 5) vb.shift();

      let predictedY = window.scrollY;
      if (vb.length >= 2) {
        const dt = vb[vb.length - 1].t - vb[0].t;
        if (dt > 0)
          predictedY = window.scrollY +
            ((vb[vb.length - 1].y - vb[0].y) / dt) * 16.667;
      }

      const sh  = scrollHeight.current;
      const raw = sh > 0
        ? clamp((predictedY - sectionTop.current) / sh, 0, 1)
        : 0;
      const idx = clamp(
        Math.round(easeInOut(raw) * (cacheSize.current - 1)),
        0, cacheSize.current - 1
      );

      if (idx !== curFrame.current) { curFrame.current = idx; dirty.current = true; }
      if (dirty.current) { dirty.current = false; drawFrame(curFrame.current); }
    }

    rafId.current = requestAnimationFrame(tick);
  }

  // ── effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (reducedMotion) return;
    const h = () => { pageVisible.current = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ro = new ResizeObserver(() => { syncCanvas(); syncGeometry(); });
    ro.observe(section);
    ro.observe(canvas);
    syncCanvas();
    syncGeometry();
    return () => ro.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("scroll", syncGeometry, { passive: true });
    return () => window.removeEventListener("scroll", syncGeometry);
  }, [reducedMotion]);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const io = new IntersectionObserver(
      ([e]) => { inView.current = e.isIntersecting; }, { threshold: 0 }
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  // ── main load ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    const profile = getDeviceProfile();
    const frames  = [];
    for (let i = 1; i <= totalFrames; i += profile.stride) frames.push(i);
    const total = frames.length;

    cache.current      = new Array(total).fill(null);
    cacheSize.current  = 0;
    curFrame.current   = -1;
    dirty.current      = false;
    rafReady.current   = false;
    velBuf.current     = [];
    offscreen.current  = null;
    offCtx.current     = null;
    mainCtx.current    = null;

    // Absolute URLs required inside worker scope
    const abs  = (path) => new URL(path, window.location.href).href;
    const pool = createWorkerPool(profile.workerCount);
    let cancelled = false;

    startRaf();

    async function load() {
      // Phase 1: poster frame → show immediately, unlock scroll
      // heroFrameCache already fetched this URL → browser returns it
      // from HTTP cache instantly, worker decodes it in ~5ms
      try {
        const bm = await pool.decode(
          abs(framePath(frames[0])),
          profile.bitmapW,
          profile.bitmapH
        );
        if (cancelled) { bm?.close(); return; }

        syncCanvas();
        syncGeometry();

        const c = canvasRef.current;
        if (c) {
          mainCtx.current = c.getContext("2d", { alpha: false });
          if (profile.hasOffscreen) {
            try {
              offscreen.current = new OffscreenCanvas(c.width, c.height);
              offCtx.current    = offscreen.current.getContext("2d", { alpha: false });
            } catch (_) { offscreen.current = null; offCtx.current = null; }
          }
        }

        cache.current[0]  = bm;
        cacheSize.current = 1;
        curFrame.current  = 0;
        dirty.current     = true;
        drawFrame(0);
        rafReady.current  = true; // ✅ scroll animation live

      } catch (e) {
        console.error("[hero] poster frame failed:", e);
        if (!cancelled) rafReady.current = true;
      }

      // Phase 2: all remaining frames — all cache hits, loads almost instantly
      const order = buildPriorityOrder(total).slice(1);
      await Promise.all(
        order.map((slotIdx) =>
          pool
            .decode(
              abs(framePath(frames[slotIdx])),
              profile.bitmapW,
              profile.bitmapH
            )
            .then((bm) => {
              if (cancelled) { bm?.close(); return; }
              cache.current[slotIdx] = bm;
              let s = cacheSize.current;
              while (s < total && cache.current[s] != null) s++;
              cacheSize.current = s;
              dirty.current = true;
            })
            .catch(() => {})
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
      cache.current.forEach((bm) => bm?.close());
      cache.current     = [];
      cacheSize.current = 0;
    };
  }, [totalFrames, reducedMotion]);

  return { isFullyLoaded };
}