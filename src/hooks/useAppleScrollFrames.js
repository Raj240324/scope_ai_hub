import { useEffect, useRef, useState } from "react";
import { getHeroCache } from "../utils/heroFrameCache";

// ─────────────────────────────────────────────────────────────────────────────
// Apple-style scroll-driven frame animation hook.
//
// Pipeline:  scroll → progress → frame index → ctx.drawImage()
//
// No Workers, no OffscreenCanvas, no velocity prediction.
// Uses the heroFrameCache singleton for decoded ImageBitmaps.
// ─────────────────────────────────────────────────────────────────────────────

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

// ── Device profile ──────────────────────────────────────────────────────────
function getDeviceProfile() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid || window.innerWidth < 768;

  // DPR: mobile clamped to 1 for GPU savings, desktop max 2
  const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

  // Canvas resolution cap
  const maxW = isMobile ? 540 : 1920;
  const maxH = isMobile ? 960 : 1080;

  return { isMobile, dpr, maxW, maxH };
}

// ═════════════════════════════════════════════════════════════════════════════
export function useAppleScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
}) {
  const ctxRef = useRef(null);
  const rafId = useRef(null);
  const curFrame = useRef(-1);
  const canvasW = useRef(0);
  const canvasH = useRef(0);

  const pageVisible = useRef(true);
  const inView = useRef(true);
  const sectionTop = useRef(0);
  const scrollH = useRef(0);

  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ── Sync section geometry ───────────────────────────────────────────────
  function syncGeometry() {
    const s = sectionRef.current;
    if (!s) return;
    const rect = s.getBoundingClientRect();
    sectionTop.current = rect.top + window.scrollY;
    scrollH.current = s.offsetHeight - window.innerHeight;
  }

  // ── Sync canvas resolution (capped per device) ─────────────────────────
  function syncCanvas() {
    const c = canvasRef.current;
    if (!c) return;

    const profile = getDeviceProfile();
    const pw = Math.min(Math.round(c.offsetWidth * profile.dpr), profile.maxW);
    const ph = Math.min(Math.round(c.offsetHeight * profile.dpr), profile.maxH);

    if (c.width === pw && c.height === ph) return;
    c.width = pw;
    c.height = ph;
    canvasW.current = pw;
    canvasH.current = ph;
    ctxRef.current = c.getContext("2d", { alpha: false });
  }

  // ── Draw a single frame to canvas ──────────────────────────────────────
  function drawFrame(idx) {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const cache = getHeroCache();
    const bitmaps = cache.bitmaps;
    const len = bitmaps.length;
    if (len === 0) return;

    // Find the best available frame — exact or nearest neighbor
    let bm = idx < len ? (bitmaps[idx] ?? null) : null;
    if (!bm) {
      for (let d = 1; d < Math.min(len, 32); d++) {
        bm = bitmaps[clamp(idx - d, 0, len - 1)] ?? null;
        if (bm) break;
        bm = bitmaps[clamp(idx + d, 0, len - 1)] ?? null;
        if (bm) break;
      }
    }
    if (!bm) return;

    // Cover-fit the bitmap into the canvas
    const cw = canvasW.current, ch = canvasH.current;
    const bw = bm.width, bh = bm.height;
    const scale = Math.max(cw / bw, ch / bh);
    const dw = bw * scale, dh = bh * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

    ctx.drawImage(bm, dx, dy, dw, dh);
  }

  // ── RAF loop: scroll → progress → frame index → draw ──────────────────
  function startRaf() {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    function tick() {
      rafId.current = requestAnimationFrame(tick);

      // Skip if hidden, off-screen, or no frames loaded
      if (!pageVisible.current || !inView.current) return;

      const cache = getHeroCache();
      const total = cache.bitmaps.length;
      if (total === 0) return;

      // Calculate scroll progress 0..1
      const sh = scrollH.current;
      const raw = sh > 0
        ? clamp((window.scrollY - sectionTop.current) / sh, 0, 1)
        : 0;

      // Map progress to frame index
      const loaded = cache.loaded;
      const maxIdx = Math.max(0, loaded - 1);
      const idx = clamp(Math.round(raw * maxIdx), 0, total - 1);

      // Only redraw when frame changes
      if (idx !== curFrame.current) {
        curFrame.current = idx;
        drawFrame(idx);
      }
    }

    rafId.current = requestAnimationFrame(tick);
  }

  // ── Page visibility ────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const h = () => {
      pageVisible.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [reducedMotion]);

  // ── ResizeObserver: keep canvas/geometry in sync ────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ro = new ResizeObserver(() => {
      syncCanvas();
      syncGeometry();
    });
    ro.observe(section);
    ro.observe(canvas);
    syncCanvas();
    syncGeometry();
    return () => ro.disconnect();
  }, [reducedMotion]);

  // ── Scroll → re-sync geometry ──────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("scroll", syncGeometry, { passive: true });
    return () => window.removeEventListener("scroll", syncGeometry);
  }, [reducedMotion]);

  // ── IntersectionObserver: pause when off-screen ────────────────────────
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const io = new IntersectionObserver(
      ([e]) => { inView.current = e.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  // ── Main effect: start animation loop, draw poster frame ──────────────
  useEffect(() => {
    if (reducedMotion) return;

    syncCanvas();
    syncGeometry();

    // Initialize context
    const c = canvasRef.current;
    if (c) {
      ctxRef.current = c.getContext("2d", { alpha: false });
    }

    curFrame.current = -1;
    startRaf();

    // Draw poster frame as soon as available
    const cache = getHeroCache();
    const checkPoster = () => {
      if (cache.bitmaps[0]) {
        drawFrame(0);
        curFrame.current = 0;
      }
    };
    checkPoster();

    // Poll for poster frame if not immediately available
    const posterInterval = setInterval(() => {
      if (cache.bitmaps[0]) {
        drawFrame(0);
        curFrame.current = 0;
        clearInterval(posterInterval);
      }
    }, 50);

    // Subscribe to fully-loaded state
    const unsub = cache.onProgress((loaded, total) => {
      if (total > 0 && loaded >= total) {
        setIsFullyLoaded(true);
      }
    });

    return () => {
      clearInterval(posterInterval);
      unsub();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      ctxRef.current = null;
      curFrame.current = -1;
    };
  }, [totalFrames, reducedMotion]);

  return { isFullyLoaded };
}