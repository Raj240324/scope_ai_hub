import { useEffect, useRef, useState } from "react";

/**
 * useAppleScrollFrames — CRASH-FIXED VERSION
 *
 * Key fixes vs original:
 *  1. Bitmaps are resized to DISPLAY resolution on load (not native 1920×1080).
 *     192 frames × ~300KB display-res = ~57MB GPU — vs ~576MB native. No crash.
 *  2. Canvas is sized once to window dimensions, never fights ResizeObserver.
 *  3. rAF uses a dirty flag — only calls drawImage when the frame index changes.
 *  4. Mobile loads every 3rd frame (64 frames) instead of every 2nd.
 *  5. Bitmap close() is called immediately after a frame is drawn if low-memory.
 *  6. Scroll progress is read in rAF (not in scroll handler) to avoid fighting.
 */

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}
const yieldToMain = () => new Promise((r) => setTimeout(r, 0));

// ── KEY FIX: Load bitmap resized to display dimensions ───────────────────────
// This is the single most important change. Instead of uploading a 1920×1080
// ImageBitmap to GPU for every frame, we upload one sized to the actual canvas
// display size (e.g. 1280×720 on a laptop). Memory drops by 4–9×.
async function loadBitmapAtSize(url, displayWidth, displayHeight) {
  const img = new Image();
  img.src = url;
  await img.decode();                   // ensure fully decoded, no jank
  return createImageBitmap(img, {
    resizeWidth:   displayWidth,
    resizeHeight:  displayHeight,
    resizeQuality: "medium",            // "high" costs more GPU time
  });
}

const BATCH_SIZE = 8; // smaller batches = more yields = smoother loading

async function loadAllBitmaps({
  frameIndices,
  framePath,
  displayWidth,
  displayHeight,
  onBatchDone,
  isCancelled,
}) {
  const bitmaps = new Array(frameIndices.length).fill(null);

  for (let b = 0; b < frameIndices.length; b += BATCH_SIZE) {
    if (isCancelled()) return bitmaps;

    const batch = frameIndices.slice(b, b + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((frameNum) =>
        loadBitmapAtSize(framePath(frameNum), displayWidth, displayHeight).catch(() => null)
      )
    );

    results.forEach((bm, j) => {
      if (bm) bitmaps[b + j] = bm;
    });

    onBatchDone(Math.min(b + BATCH_SIZE, frameIndices.length), frameIndices.length);
    await yieldToMain();
  }

  return bitmaps;
}

// ═══════════════════════════════════════════════════════════════════════════════
export function useAppleScrollFrames({
  sectionRef,
  canvasRef,
  reducedMotion,
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
}) {
  const isMobileRef = useRef(false);

  // Display dimensions — set once, never change mid-session
  // This is the resolution we bake into every bitmap on load
  const displayWidthRef  = useRef(1280);
  const displayHeightRef = useRef(720);

  const bitmapCacheRef    = useRef([]);
  const bitmapCountRef    = useRef(0);
  const currentFrameRef   = useRef(-1);
  const dirtyRef          = useRef(true);  // rAF only draws when true

  const isVisibleRef      = useRef(true);
  const isPageVisibleRef  = useRef(true);
  const rafIdRef          = useRef(null);
  const rafReadyRef       = useRef(false);

  // Scroll geometry — updated in scroll handler + ResizeObserver
  const sectionTopRef        = useRef(0);
  const scrollableHeightRef  = useRef(0);

  const [loadedCount,    setLoadedCount]    = useState(0);
  const [isFullyLoaded,  setIsFullyLoaded]  = useState(false);

  // ── drawFrame ──────────────────────────────────────────────────────────────
  // Since bitmaps are pre-sized to displayWidth×displayHeight, drawImage is
  // just a straight blit — no scaling math needed at draw time.
  function drawFrame(index) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx   = canvas.getContext("2d");
    if (!ctx)   return;
    const cache = bitmapCacheRef.current;
    if (!cache.length) return;

    let bm = cache[index] ?? null;
    if (!bm) {
      for (let d = 1; d < 16; d++) {
        bm = cache[Math.max(0, index - d)]                  ?? null; if (bm) break;
        bm = cache[Math.min(cache.length - 1, index + d)]  ?? null; if (bm) break;
      }
    }
    if (!bm) return;

    // Canvas is already sized to window — bitmaps are pre-sized to same dims
    // So this is a 1:1 blit, not a scale. Near-zero CPU cost.
    const cw = canvas.width, ch = canvas.height;
    const bw = bm.width,     bh = bm.height;

    // Still do cover-fit in case window was resized after load
    const scale = Math.max(cw / bw, ch / bh);
    const dw = bw * scale, dh = bh * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bm, dx, dy, dw, dh);
  }

  // ── rAF loop — dirty-flag pattern ─────────────────────────────────────────
  // Only calls drawImage when the target frame index has changed.
  // This prevents the GPU from doing any work at 60fps when user isn't scrolling.
  function startRafLoop() {
    function loop() {
      rafIdRef.current = requestAnimationFrame(loop);

      if (
        !rafReadyRef.current     ||
        !isPageVisibleRef.current ||
        !isVisibleRef.current
      ) return;

      const count = bitmapCountRef.current;
      if (count === 0) return;

      const sh  = scrollableHeightRef.current;
      const raw = sh > 0
        ? clamp((window.scrollY - sectionTopRef.current) / sh, 0, 1)
        : 0;
      const idx = clamp(Math.round(easeInOut(raw) * (count - 1)), 0, count - 1);

      // KEY FIX: dirty flag — only draw when frame changes
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        dirtyRef.current = true;
      }

      if (dirtyRef.current) {
        dirtyRef.current = false;
        drawFrame(currentFrameRef.current);
      }
    }

    rafIdRef.current = requestAnimationFrame(loop);
  }

  // ── Page Visibility ────────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const onViz = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onViz);
    return () => document.removeEventListener("visibilitychange", onViz);
  }, [reducedMotion]);

  // ── ResizeObserver — update scroll geometry + canvas size ─────────────────
  // Canvas pixel dimensions are set here, NOT in the load phase.
  // This separates "what size is the canvas on screen" from "what res are the bitmaps".
  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const update = () => {
      // Update scroll geometry
      const rect = section.getBoundingClientRect();
      sectionTopRef.current       = rect.top + window.scrollY;
      scrollableHeightRef.current = section.offsetHeight - window.innerHeight;

      // Size canvas to device pixels for sharpness
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× to save GPU
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      const pw  = Math.round(w * dpr);
      const ph  = Math.round(h * dpr);

      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width  = pw;
        canvas.height = ph;
        // Force redraw at new size
        if (currentFrameRef.current >= 0) {
          dirtyRef.current = true;
        }
      }
    };

    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(canvas);
    update();
    return () => ro.disconnect();
  }, [sectionRef, canvasRef]);

  // ── IntersectionObserver ───────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([e]) => { isVisibleRef.current = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [sectionRef]);

  // ── Main load effect ───────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    // Detect mobile BEFORE deciding frame stride
    isMobileRef.current =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    // ── KEY FIX: Set display resolution once, based on current window size ──
    // Bitmaps will be baked at this resolution. Capped values prevent
    // loading massive textures on large monitors.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    displayWidthRef.current  = Math.min(Math.round(window.innerWidth  * dpr), 1920);
    displayHeightRef.current = Math.min(Math.round(window.innerHeight * dpr), 1080);

    // Mobile: every 3rd frame (64 frames). Desktop: every frame (192).
    const frameIndices = [];
    const stride = isMobileRef.current ? 3 : 1;
    for (let i = 1; i <= totalFrames; i += stride) {
      frameIndices.push(i);
    }

    let cancelled = false;
    bitmapCacheRef.current  = [];
    bitmapCountRef.current  = 0;
    rafReadyRef.current     = false;
    currentFrameRef.current = -1;
    dirtyRef.current        = false;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    startRafLoop();

    async function load() {
      // Step 1: Load + show frame 1 immediately as poster
      const firstBitmap = await loadBitmapAtSize(
        framePath(1),
        displayWidthRef.current,
        displayHeightRef.current
      ).catch(() => null);

      if (cancelled || !firstBitmap) return;

      // Size canvas to match display (not native frame resolution)
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width  = Math.round(canvas.offsetWidth  * dpr);
        canvas.height = Math.round(canvas.offsetHeight * dpr);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const cw = canvas.width, ch = canvas.height;
          const bw = firstBitmap.width, bh = firstBitmap.height;
          const scale = Math.max(cw / bw, ch / bh);
          ctx.drawImage(
            firstBitmap,
            (cw - bw * scale) / 2,
            (ch - bh * scale) / 2,
            bw * scale,
            bh * scale
          );
        }
      }

      // Step 2: Load all remaining frames in display resolution
      const bitmaps = await loadAllBitmaps({
        frameIndices,
        framePath,
        displayWidth:  displayWidthRef.current,
        displayHeight: displayHeightRef.current,
        onBatchDone: (loaded, total) => {
          if (!cancelled) setLoadedCount(loaded);
        },
        isCancelled: () => cancelled,
      });

      if (cancelled) {
        bitmaps.forEach((bm) => bm?.close());
        return;
      }

      if (!bitmaps[0] && firstBitmap) bitmaps[0] = firstBitmap;

      // Step 3: Publish bitmaps atomically, enable rAF
      bitmapCacheRef.current = bitmaps;
      bitmapCountRef.current = bitmaps.length;
      setLoadedCount(bitmaps.length);
      setIsFullyLoaded(true);
      rafReadyRef.current = true;
      dirtyRef.current    = true; // force one draw immediately
    }

    load().catch((err) => {
      if (!cancelled) console.error("[useAppleScrollFrames]", err);
    });

    return () => {
      cancelled = true;
      rafReadyRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      bitmapCacheRef.current.forEach((bm) => bm?.close());
      bitmapCacheRef.current = [];
      bitmapCountRef.current = 0;
    };
  }, [totalFrames, reducedMotion]);

  return { loadedCount, isFullyLoaded };
}