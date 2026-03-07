import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ──────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT = "400vh";

// Higher = snappier response, 1 = instant (no lerp). 0.25 is butter-smooth
// without perceptible lag. On weaker GPUs the lerp hides dropped frames.
const LERP_FACTOR = 0.25;

// Loading pipeline configuration
const CRITICAL_BATCH_END = 40;       // Frames 2-40 loaded immediately after frame 1
const BATCH_CONCURRENCY  = 4;        // Max parallel fetches per batch
const FRAME_CACHE_LIMIT  = 60;       // Max decoded bitmaps held in memory

const FRAME_PATH = (n) => `/frames/${String(n).padStart(5, "0")}.jpg`;

// ─── Helper: CSS object-fit:cover on canvas ───────────────────────────────────
function drawCover(ctx, img, cw, ch) {
  const ir = img.naturalWidth  ? (img.naturalWidth / img.naturalHeight)
           : (img.width        / img.height);
  const cr = cw / ch;
  let dw, dh, dx, dy;
  if (ir > cr) { dh = ch; dw = dh * ir; }
  else          { dw = cw; dh = dw / ir; }
  dx = (cw - dw) / 2;
  dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

// ─── Lerp helper ─────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─── Map a value from one range to another, clamped ──────────────────────────
const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
};

// ─── Reveal config ───────────────────────────────────────────────────────────
const FRAME_100_PROGRESS = 100 / (TOTAL_FRAMES - 1);
const SCALE_START   = FRAME_100_PROGRESS;
const SCALE_END     = 1.00;
const OPACITY_START_END = SCALE_START + 0.03;
const DOT_SCALE     = 0.03;

// ─── requestIdleCallback polyfill for Safari ────────────────────────────────
const rIC = typeof requestIdleCallback === "function"
  ? requestIdleCallback
  : (cb) => setTimeout(() => cb({ timeRemaining: () => 10 }), 1);

// ─── Fetch → Blob → createImageBitmap pipeline (off-main-thread decode) ─────
async function decodeBitmap(url) {
  const res  = await fetch(url);
  const blob = await res.blob();
  return createImageBitmap(blob);
}

// ─── Load a batch of frame indices, `concurrency` at a time ─────────────────
async function loadBatch(indices, cache, requested, concurrency) {
  let i = 0;
  async function next() {
    while (i < indices.length) {
      const idx = indices[i++];
      if (cache.has(idx) || requested.has(idx)) continue; // dedup
      requested.add(idx);
      try {
        const bmp = await decodeBitmap(FRAME_PATH(idx + 1)); // 1-indexed file
        cache.set(idx, bmp);
      } catch {
        // Network error — skip frame, render loop will use nearest
      }
    }
  }
  const workers = [];
  for (let w = 0; w < Math.min(concurrency, indices.length); w++) {
    workers.push(next());
  }
  await Promise.all(workers);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroScroll({ children, badge, title, subtitle }) {
  const containerRef    = useRef(null);
  const canvasRef       = useRef(null);

  const contentInnerRef = useRef(null);

  const targetFrameRef  = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef          = useRef(null);
  const stRef           = useRef(null);
  const progressRef     = useRef(0); // store scroll progress for content transform

  // Frame cache: Map<frameIndex, ImageBitmap>
  const cacheRef        = useRef(new Map());
  // Tracks insertion order for bounded eviction
  const cacheOrderRef   = useRef([]);
  // Dedup: tracks frames already requested (prevents duplicate network calls)
  const requestedRef    = useRef(new Set());
  // Live canvas dimensions updated by resize handler, consumed by RAF loop
  const canvasSizeRef   = useRef({ w: window.innerWidth, h: window.innerHeight });

  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const scrollIndicatorRef = useRef(null);

  // ── Bounded cache helper ────────────────────────────────────────────────
  const cacheSet = useCallback((idx, bmp) => {
    const cache = cacheRef.current;
    const order = cacheOrderRef.current;

    if (cache.has(idx)) return;

    cache.set(idx, bmp);
    order.push(idx);

    // Evict oldest frames beyond the limit (never evict frame 0)
    while (order.length > FRAME_CACHE_LIMIT) {
      const oldest = order.shift();
      if (oldest === 0) { order.push(oldest); continue; } // protect frame 0
      const old = cache.get(oldest);
      if (old && old.close) old.close(); // release ImageBitmap GPU memory
      cache.delete(oldest);
    }
  }, []);

  // ── Find nearest loaded frame for graceful degradation ────────────────
  const findNearest = useCallback((target) => {
    const cache = cacheRef.current;
    if (cache.has(target)) return cache.get(target);

    // Search outward from target
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      if (target - d >= 0 && cache.has(target - d)) return cache.get(target - d);
      if (target + d < TOTAL_FRAMES && cache.has(target + d)) return cache.get(target + d);
    }
    return null;
  }, []);

  // ── 1. Progressive frame loading pipeline ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const cache = cacheRef.current;
    const requested = requestedRef.current;

    async function loadFrames() {
      // ── Phase 1: Frame 1 (instant — highest priority) ──────────────
      requested.add(0);
      try {
        const bmp = await decodeBitmap(FRAME_PATH(1));
        if (cancelled) return;
        cacheSet(0, bmp);
        setFirstFrameReady(true);

        // Immediately draw frame 1 to canvas so hero is never blank
        const canvas = canvasRef.current;
        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = window.innerWidth;
          const h = window.innerHeight;
          canvas.width  = w * dpr;
          canvas.height = h * dpr;
          canvas.style.width  = w + "px";
          canvas.style.height = h + "px";
          const ctx = canvas.getContext("2d", { alpha: false });
          ctx.scale(dpr, dpr);
          drawCover(ctx, bmp, w, h);
          canvasSizeRef.current = { w, h };
        }
      } catch {
        // Even if frame 1 fails, don't block — let scroll indicator show
        if (!cancelled) setFirstFrameReady(true);
        return;
      }

      if (cancelled) return;

      // ── Phase 2: Critical frames 2–40 (batched, immediate) ─────────
      const criticalIndices = [];
      for (let i = 1; i < CRITICAL_BATCH_END && i < TOTAL_FRAMES; i++) {
        criticalIndices.push(i);
      }

      await loadBatch(criticalIndices, {
        has: (k) => cache.has(k),
        set: (k, v) => { if (!cancelled) cacheSet(k, v); },
      }, requested, BATCH_CONCURRENCY);

      if (cancelled) return;

      // ── Phase 3: Remaining frames 41–192 (idle loading) ────────────
      const remaining = [];
      for (let i = CRITICAL_BATCH_END; i < TOTAL_FRAMES; i++) {
        remaining.push(i);
      }

      // Load in small chunks during idle periods
      const IDLE_CHUNK = 4;
      let ri = 0;

      function loadIdleChunk() {
        if (cancelled || ri >= remaining.length) return;

        // Load a small chunk, respecting the idle deadline
        const chunkEnd = Math.min(ri + IDLE_CHUNK, remaining.length);
        const chunk = remaining.slice(ri, chunkEnd);
        ri = chunkEnd;

        loadBatch(chunk, {
          has: (k) => cache.has(k),
          set: (k, v) => { if (!cancelled) cacheSet(k, v); },
        }, requested, BATCH_CONCURRENCY).then(() => {
          if (!cancelled && ri < remaining.length) {
            rIC(loadIdleChunk);
          }
        });
      }

      rIC(loadIdleChunk);
    }

    loadFrames();

    return () => { cancelled = true; };
  }, [cacheSet]);

  // ── 2. Canvas resize (debounced, DPR-aware) ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimer;

    const syncSize = () => {
      // Recompute DPR on every resize (handles monitor switching / zoom)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      // Update live dimension ref so RAF loop uses new values immediately
      canvasSizeRef.current = { w, h };

      // Redraw current frame at new dimensions
      const frame = findNearest(Math.round(currentFrameRef.current));
      if (frame) {
        drawCover(ctx, frame, w, h);
      }

      // Refresh ScrollTrigger measurements after layout change
      ScrollTrigger.refresh();
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncSize, 100);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [findNearest]);

  // ── 3. Set initial hidden state ──────────────────────────────────────
  useEffect(() => {
    if (contentInnerRef.current) {
      const el = contentInnerRef.current;
      el.style.transform = `scale(${DOT_SCALE})`;
      el.style.opacity = "0";
      el.style.transformOrigin = "50% 50%";
      el.style.willChange = "transform, opacity";
    }
  }, []);

  // ── 4. Optimized render loop + scroll-driven transforms ───────────────
  useEffect(() => {
    if (!firstFrameReady) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d", { alpha: false }); // opaque = faster

    // Ensure frame 1 is drawn (guarantee: hero never blank)
    const { w, h } = canvasSizeRef.current;
    const frame0 = findNearest(0);
    if (frame0) drawCover(ctx, frame0, w, h);

    stRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   "top top",
      end:     `+=${SCROLL_HEIGHT}`,
      pin:     true,
      scrub:   0, // instant scrub — we handle smoothing in RAF
      invalidateOnRefresh: true, // recalculate after layout changes
      onUpdate: (self) => {
        const p = self.progress;
        targetFrameRef.current = p * (TOTAL_FRAMES - 1);
        progressRef.current = p;
      },
    });

    // RAF loop — runs at display refresh rate
    let lastDrawn = -1;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Lerp for silky frame interpolation
      const prev = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = Math.abs(target - prev);

      // Skip lerp if very close (avoid infinite micro-updates)
      if (diff < 0.05) {
        currentFrameRef.current = target;
      } else {
        currentFrameRef.current = lerp(prev, target, LERP_FACTOR);
      }

      const frameIndex = Math.round(currentFrameRef.current);

      // Read live dimensions from ref (updated by resize handler)
      const size = canvasSizeRef.current;

      // Only redraw canvas when the actual frame changes
      if (frameIndex !== lastDrawn && frameIndex >= 0 && frameIndex < TOTAL_FRAMES) {
        const bmp = findNearest(frameIndex);
        if (bmp) {
          drawCover(ctx, bmp, size.w, size.h);
          lastDrawn = frameIndex;
        }
      }

      // Update content transform directly (no GSAP overhead)
      const p = progressRef.current;

      // Scroll indicator fade
      if (scrollIndicatorRef.current) {
        const indicatorOpacity = Math.max(0, 1 - p * 10);
        scrollIndicatorRef.current.style.opacity = indicatorOpacity;
      }

      // Content scale + opacity (GPU-accelerated via transform)
      if (contentInnerRef.current) {
        const scale   = mapRange(p, SCALE_START, SCALE_END,         DOT_SCALE, 1);
        const opacity = mapRange(p, SCALE_START, OPACITY_START_END, 0,         1);
        contentInnerRef.current.style.transform = `scale(${scale}) translateZ(0)`;
        contentInnerRef.current.style.opacity = opacity;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      stRef.current?.kill();
    };
  }, [firstFrameReady, findNearest]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Homepage hero"
    >
      {/* Canvas background — GPU layer promoted */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "contents", imageRendering: "auto" }}
        aria-hidden="true"
      />

      {/* Static first-frame fallback — visible until canvas draws */}
      {!firstFrameReady && (
        <img
          src={FRAME_PATH(1)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
      )}

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-navy/30 mix-blend-multiply z-[1]" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[radial-gradient(circle,_var(--color-brand-cyan-primary)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none blur-3xl blur-layer" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-[radial-gradient(circle,_var(--color-brand-purple-highlight)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none blur-3xl blur-layer" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-[3]" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-0">
        <div
          ref={contentInnerRef}
          className="max-w-4xl w-full text-center flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-white/5 text-white/90 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/10">
              {badge}
            </div>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-[1.65rem] sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl mb-12 leading-relaxed text-white/80 max-w-2xl mx-auto font-medium drop-shadow-md">
              {subtitle}
            </p>
          )}

          {/* CTAs / children */}
          <div className="flex flex-col items-center w-full">
            {children}
          </div>
        </div>
      </div>

      {/* Scroll Indicator — shows as soon as frame 1 is ready */}
      {firstFrameReady && (
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-[max(env(safe-area-inset-bottom,0px)_+_3.5rem,_5rem)] sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          <div className="w-5 h-8 sm:w-7 sm:h-11 rounded-full border-2 border-white/50 flex items-start justify-center p-1 sm:p-1.5 mb-2 sm:mb-3">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-bounce" />
          </div>
          <div className="flex flex-col items-center -space-y-1.5 mb-1 sm:mb-2 animate-bounce" style={{ animationDelay: '0.15s' }}>
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-white/30" />
          </div>
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
            Scroll to Explore
          </p>
        </div>
      )}

    </section>
  );
}
