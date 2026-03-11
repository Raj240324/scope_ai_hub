import { useEffect, useRef, useCallback, useState } from "react";

/**
 * useCanvasVideoFrames.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in replacement for useScrollFrames.
 *
 * WHAT CHANGES:
 *   Frame source: 192 WebP files → 1 video file (pre-decoded to ImageBitmaps)
 *
 * WHAT IS PRESERVED (feature-for-feature):
 *   ✓ Mobile detection → decodes half the frames (96) on mobile
 *   ✓ rAF render loop (same architecture — not scroll-event driven)
 *   ✓ IntersectionObserver → pauses rAF loop when section is off-screen
 *   ✓ ResizeObserver → keeps canvas pixel buffer in sync with layout
 *   ✓ Easing on frame index (ease-in-out, mirrors getFrameIndexForScroll)
 *   ✓ Nearest-frame fallback → never shows a blank canvas mid-decode
 *   ✓ Progressive rendering → rAF draws as soon as any frames are ready
 *   ✓ GPU memory cleanup → bm.close() on unmount (mirrors releaseFrameCache)
 *   ✓ Identical return shape: { loadedCount, isFullyLoaded }
 *
 * USAGE — identical to useScrollFrames:
 *   const { loadedCount, isFullyLoaded } = useCanvasVideoFrames({
 *     sectionRef,
 *     canvasRef,
 *     reducedMotion,
 *     src: "/robot_arm_hero.mp4",
 *     totalFrames: 192,
 *   });
 */

// ── Easing — mirrors ease-in-out inside getFrameIndexForScroll ───────────────
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

export function useCanvasVideoFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  src,
  totalFrames = 192,
}) {
  // ── Detect mobile once on mount (mirrors original exactly) ───────────────
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
  }, []);

  // ── Bitmap cache (mirrors frameCacheRef) ──────────────────────────────────
  const bitmapCacheRef  = useRef([]);  // ImageBitmap[] — GPU-resident frames
  const bitmapCountRef  = useRef(0);   // actual decoded count (grows as decoded)

  // ── Scroll / layout state (all refs — never triggers re-renders) ──────────
  const scrollYRef           = useRef(0);
  const sectionTopRef        = useRef(0);
  const scrollableHeightRef  = useRef(0);
  const currentFrameIndexRef = useRef(-1);  // -1 = not yet drawn
  const isVisibleRef         = useRef(true);
  const rafIdRef             = useRef(null);

  // ── React state (only for LoadingBar — not on hot path) ──────────────────
  const [loadedCount, setLoadedCount]     = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // ── Canvas drawing — mirrors drawFrame exactly ────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cache = bitmapCacheRef.current;
    if (!cache.length) return;

    // Nearest-available fallback (prefer looking backwards for continuity)
    let bitmap = cache[index] ?? null;
    if (!bitmap) {
      for (let offset = 1; offset < 10; offset++) {
        bitmap = cache[Math.max(0, index - offset)] ?? null;
        if (bitmap) break;
        bitmap = cache[Math.min(cache.length - 1, index + offset)] ?? null;
        if (bitmap) break;
      }
    }
    if (!bitmap) return;

    // Letterbox / cover: centred, aspect-ratio-correct (mirrors original)
    const cw = canvas.width;
    const ch = canvas.height;
    const bw = bitmap.width;
    const bh = bitmap.height;

    const scale = Math.max(cw / bw, ch / bh);
    const dw    = bw * scale;
    const dh    = bh * scale;
    const dx    = (cw - dw) / 2;
    const dy    = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bitmap, dx, dy, dw, dh); // ← zero decode cost; pure GPU blit
  }, [canvasRef]);

  // ── rAF render loop — mirrors renderLoop exactly ──────────────────────────
  const renderLoop = useCallback(() => {
    // Pause when off-screen (mirrors original's isVisibleRef check)
    if (!isVisibleRef.current) {
      rafIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const bitmapCount = bitmapCountRef.current;
    if (bitmapCount === 0) {
      rafIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // Scroll progress → eased t → frame index
    const scrollableH = scrollableHeightRef.current;
    const rawProgress = scrollableH > 0
      ? clamp((scrollYRef.current - sectionTopRef.current) / scrollableH, 0, 1)
      : 0;

    const easedProgress = easeInOut(rawProgress);
    const frameIndex    = clamp(
      Math.round(easedProgress * (bitmapCount - 1)),
      0,
      bitmapCount - 1
    );

    // Only redraw when frame changes (mirrors original's guard)
    if (frameIndex !== currentFrameIndexRef.current) {
      currentFrameIndexRef.current = frameIndex;
      drawFrame(frameIndex);
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame]);

  // ── Scroll listener — passive, mirrors original ───────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // ── ResizeObserver — keep canvas + metrics fresh, mirrors original ────────
  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const updateMetrics = () => {
      const rect              = section.getBoundingClientRect();
      sectionTopRef.current   = rect.top + window.scrollY;
      scrollableHeightRef.current = section.offsetHeight - window.innerHeight;

      const { offsetWidth, offsetHeight } = canvas;
      if (canvas.width !== offsetWidth || canvas.height !== offsetHeight) {
        canvas.width  = offsetWidth;
        canvas.height = offsetHeight;
        if (currentFrameIndexRef.current >= 0) {
          drawFrame(currentFrameIndexRef.current);
        }
      }
    };

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(section);
    observer.observe(canvas);
    updateMetrics();
    return () => observer.disconnect();
  }, [sectionRef, canvasRef, drawFrame]);

  // ── IntersectionObserver — pause rAF when off-screen ─────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  // ── Main effect: start rAF loop + pre-decode frames ──────────────────────
  useEffect(() => {
    if (reducedMotion || !src) return;

    let cancelled = false;
    bitmapCacheRef.current = [];
    bitmapCountRef.current = 0;

    // 1. Start rAF loop immediately — draws progressively as frames decode
    //    (same as original: startFrameLoading + renderLoop run in parallel)
    rafIdRef.current = requestAnimationFrame(renderLoop);

    // 2. Pre-decode video frames → ImageBitmaps (GPU memory)
    async function preloadBitmaps() {
      const video       = document.createElement("video");
      video.src         = src;
      video.muted       = true;
      video.playsInline = true;
      video.preload     = "auto";
      video.crossOrigin = "anonymous";

      await new Promise((res, rej) => {
        video.onloadedmetadata = res;
        video.onerror = () =>
          rej(new Error(`[useCanvasVideoFrames] Cannot load: ${src}`));
        video.load();
      });

      if (cancelled) return;

      const duration = video.duration;

      // Mobile: decode half the frames (mirrors original's mobile halving)
      const targetFrames = isMobile.current
        ? Math.ceil(totalFrames / 2)
        : totalFrames;

      const offscreen = document.createElement("canvas");

      // Seek to 0 to get real pixel dimensions
      await new Promise((res) => { video.onseeked = res; video.currentTime = 0; });
      offscreen.width  = video.videoWidth;
      offscreen.height = video.videoHeight;

      const ctx     = offscreen.getContext("2d", { willReadFrequently: false });
      const bitmaps = [];

      for (let i = 0; i < targetFrames; i++) {
        if (cancelled) return;

        // Mobile steps every 2nd source frame → same visual range at half cost
        const sourceIndex = isMobile.current ? i * 2 : i;
        const t = (sourceIndex / (totalFrames - 1)) * duration;

        await new Promise((res) => {
          video.onseeked = res;
          video.currentTime = t;
        });

        ctx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
        const bitmap = await createImageBitmap(offscreen);
        bitmaps.push(bitmap);

        // Incrementally expose bitmaps to rAF loop — progressive rendering
        // mirrors original's startFrameLoading progressive callback
        bitmapCacheRef.current = bitmaps;
        bitmapCountRef.current = bitmaps.length;

        // Throttle React state updates (every 4 frames)
        if (i % 4 === 0 || i === targetFrames - 1) {
          setLoadedCount(i + 1);
        }
      }

      if (cancelled) return;

      setLoadedCount(targetFrames);
      setIsFullyLoaded(true);
    }

    preloadBitmaps().catch((err) => {
      if (!cancelled) console.error(err);
    });

    return () => {
      // Mirror original cleanup: abort + cancel rAF + release GPU memory
      cancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      // Close ImageBitmaps to free GPU memory (mirrors releaseFrameCache)
      bitmapCacheRef.current.forEach((bm) => bm?.close());
      bitmapCacheRef.current = [];
      bitmapCountRef.current = 0;
    };
  }, [src, totalFrames, reducedMotion, renderLoop]);

  return { loadedCount, isFullyLoaded };
}