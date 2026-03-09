import { useEffect, useRef, useCallback, useState } from "react";
import {
  TOTAL_FRAMES,
  startFrameLoading,
  releaseFrameCache,
} from "../utils/frameLoader";
import {
  getFrameIndexForScroll,
  getSectionScrollableHeight,
} from "../utils/scrollProgress";

/**
 * useScrollFrames.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook that wires together frame loading, scroll mapping, and canvas rendering.
 */
export function useScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
}) {
  // ── Detect mobile once on mount ────────────────────────────────────────────
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
  }, []);

  // ── Frame cache (lives outside React state) ────────────────────────────────
  const frameCacheRef = useRef(
    Array.from({ length: TOTAL_FRAMES }, () => null)
  );

  // ── Scroll / layout state (all refs — never triggers re-renders) ───────────
  const scrollYRef = useRef(0);
  const sectionTopRef = useRef(0);
  const scrollableHeightRef = useRef(0);
  const currentFrameIndexRef = useRef(-1); // -1 = not yet drawn
  const isVisibleRef = useRef(true); // IntersectionObserver flag
  const rafIdRef = useRef(null);

  // ── React state (only for progress display, not on hot path) ──────────────
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ── Canvas drawing ─────────────────────────────────────────────────────────

  /**
   * Draw the frame at `index` onto the canvas.
   * Falls back to the nearest available frame if the exact index is missing.
   */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cache = frameCacheRef.current;

    // Find nearest loaded frame (prefer looking backwards for continuity).
    let bitmap = cache[index] ?? null;
    if (!bitmap) {
      for (let offset = 1; offset < 10; offset++) {
        bitmap = cache[Math.max(0, index - offset)] ?? null;
        if (bitmap) break;
        bitmap = cache[Math.min(TOTAL_FRAMES - 1, index + offset)] ?? null;
        if (bitmap) break;
      }
    }

    if (!bitmap) return;

    // Letterbox / fill: draw the bitmap centred and aspect-ratio-correct.
    const cw = canvas.width;
    const ch = canvas.height;
    const bw = bitmap.width;
    const bh = bitmap.height;

    const scale = Math.max(cw / bw, ch / bh);
    const dw = bw * scale;
    const dh = bh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bitmap, dx, dy, dw, dh);
  }, [canvasRef]);

  // ── rAF render loop ────────────────────────────────────────────────────────

  const renderLoop = useCallback(() => {
    if (!isVisibleRef.current) {
      rafIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const totalFrames = isMobile.current
      ? Math.ceil(TOTAL_FRAMES / 2)
      : TOTAL_FRAMES;

    const frameIndex = getFrameIndexForScroll(
      {
        scrollY: scrollYRef.current,
        sectionTop: sectionTopRef.current,
        scrollableHeight: scrollableHeightRef.current,
      },
      totalFrames,
      true // enable ease-in-out
    );

    // Map mobile frame index back to cache index (mobile uses every 2nd frame).
    const cacheIndex = isMobile.current ? frameIndex * 2 : frameIndex;
    const clampedCacheIndex = Math.min(cacheIndex, TOTAL_FRAMES - 1);

    // Only redraw when the frame actually changes.
    if (clampedCacheIndex !== currentFrameIndexRef.current) {
      currentFrameIndexRef.current = clampedCacheIndex;
      drawFrame(clampedCacheIndex);
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame]);

  // ── Scroll listener ────────────────────────────────────────────────────────

  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // ── ResizeObserver — keep canvas size and layout metrics fresh ─────────────

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const updateMetrics = () => {
      const rect = section.getBoundingClientRect();
      sectionTopRef.current = rect.top + window.scrollY;
      scrollableHeightRef.current = getSectionScrollableHeight(section);

      // Keep canvas pixel buffer in sync with displayed size.
      const { offsetWidth, offsetHeight } = canvas;
      if (
        canvas.width !== offsetWidth ||
        canvas.height !== offsetHeight
      ) {
        canvas.width = offsetWidth;
        canvas.height = offsetHeight;
        // Re-draw current frame at new resolution.
        if (currentFrameIndexRef.current >= 0) {
          drawFrame(currentFrameIndexRef.current);
        }
      }
    };

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(section);
    observer.observe(canvas);

    updateMetrics(); // Initial measurement
    return () => observer.disconnect();
  }, [sectionRef, canvasRef, drawFrame]);

  // ── IntersectionObserver — pause loop when off-screen ──────────────────────

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  // ── Start rendering + loading ──────────────────────────────────────────────

  useEffect(() => {
    if (reducedMotion) {
      // Still load frame 1 for static display.
      const canvas = canvasRef.current;
      if (!canvas) return;

      const url = `/hero-frames/frame_0001.webp`;
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.width, ch / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      };
      img.src = url;
      return;
    }

    // 1. Start rAF loop.
    rafIdRef.current = requestAnimationFrame(renderLoop);

    // 2. Start frame loading.
    const abort = new AbortController();
    startFrameLoading(
      frameCacheRef.current,
      isMobile.current,
      (loaded, total) => {
        setLoadedCount(loaded);
        if (loaded === total) setIsFullyLoaded(true);
      },
      abort.signal
    );

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      abort.abort();
      releaseFrameCache(frameCacheRef.current);
    };
  }, [renderLoop, reducedMotion, canvasRef]);

  return {
    loadedCount,
    isFullyLoaded,
  };
}
