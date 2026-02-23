import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ──────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT = "400vh";
const LERP_FACTOR = 0.12;

const FRAME_PATH = (n) => `/frames/${String(n).padStart(5, "0")}.jpg`;

// ─── Helper: CSS object-fit:cover on canvas ───────────────────────────────────
function drawCover(ctx, img, cw, ch) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw, dh, dx, dy;
  if (ir > cr) { dh = ch; dw = dh * ir; }
  else          { dw = cw; dh = dw / ir; }
  dx = (cw - dw) / 2;
  dy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
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
// Frame 100 of 191 = progress 0.5236 — content appears as a tiny dot here.
// From frame 100 → 192: block scales from a tiny dot (0.03) → full size (1).
// Opacity snaps in instantly at frame 100 so the dot is visible right away.
const FRAME_100_PROGRESS = 100 / (TOTAL_FRAMES - 1); // ≈ 0.5236
const SCALE_START   = FRAME_100_PROGRESS; // expansion begins at frame 100
const SCALE_END     = 1.00;               // full size at last frame
const OPACITY_START_END = SCALE_START + 0.03; // opacity reaches 1 within 3% scroll after dot appears
const DOT_SCALE     = 0.03;              // starting scale — tiny dot at center

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroScroll({ children, badge, title, subtitle }) {
  const containerRef    = useRef(null);
  const canvasRef       = useRef(null);
  const framesRef       = useRef([]);

  // Single ref for the entire content block — we scale this as one unit
  const contentInnerRef = useRef(null);

  const targetFrameRef  = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef          = useRef(null);
  const stRef           = useRef(null);

  const [loaded,   setLoaded]   = useState(false);
  const [progress, setProgress] = useState(0);

  // ── 1. Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const images = [];
    let done = 0;

    const onLoad = () => {
      if (cancelled) return;
      done++;
      setProgress(Math.round((done / TOTAL_FRAMES) * 100));
      if (done === TOTAL_FRAMES) { framesRef.current = images; setLoaded(true); }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload  = onLoad;
      img.onerror = onLoad;
      images.push(img);
    }
    return () => { cancelled = true; };
  }, []);

  // ── 2. Canvas resize ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const frames = framesRef.current;
      if (frames.length > 0) {
        drawCover(canvas.getContext("2d"), frames[Math.round(currentFrameRef.current)],
                  canvas.width, canvas.height);
      }
    };

    syncSize();
    window.addEventListener("resize", syncSize);
    return () => window.removeEventListener("resize", syncSize);
  }, []);

  // ── 3. Set initial hidden state — invisible, scale 0 at center ───────────
  useEffect(() => {
    if (contentInnerRef.current) {
      gsap.set(contentInnerRef.current, {
        scale: DOT_SCALE,
        opacity: 0,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });
    }
  }, []);

  // ── 4. GSAP + RAF render loop + scroll-driven scale expand ─────────────────
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const frames = framesRef.current;

    drawCover(ctx, frames[0], canvas.width, canvas.height);

    stRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   "top top",
      end:     `+=${SCROLL_HEIGHT}`,
      pin:     true,
      scrub:   true,
      onUpdate: (self) => {
        const p = self.progress;

        // Frame scrubbing
        targetFrameRef.current = p * (TOTAL_FRAMES - 1);

        // Scale expand: tiny dot at frame 100, grows to full size by last frame
        const scale   = mapRange(p, SCALE_START, SCALE_END,         DOT_SCALE, 1);
        // Opacity snaps from 0 → 1 very quickly after frame 100 (dot appears instantly)
        const opacity = mapRange(p, SCALE_START, OPACITY_START_END, 0,         1);

        if (contentInnerRef.current) {
          gsap.set(contentInnerRef.current, { scale, opacity });
        }
      },
    });

    // RAF loop: lerp currentFrame → targetFrame
    let lastDrawn = -1;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      currentFrameRef.current = lerp(
        currentFrameRef.current,
        targetFrameRef.current,
        LERP_FACTOR
      );

      const frameIndex = Math.round(currentFrameRef.current);
      if (frameIndex !== lastDrawn && frameIndex >= 0 && frameIndex < TOTAL_FRAMES) {
        drawCover(ctx, frames[frameIndex], canvas.width, canvas.height);
        lastDrawn = frameIndex;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      stRef.current?.kill();
    };
  }, [loaded]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Homepage hero"
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-navy/30 mix-blend-multiply z-[1]" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle,_var(--color-brand-cyan-primary)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_var(--color-brand-purple-highlight)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-[3]" />

      {/* Content overlay — pinned to exact viewport center, scales from that point */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-0">
        {/*
          contentInnerRef wraps everything. transform-origin is 50% 50% of this
          element, which is now exactly the viewport center — so the dot expands
          from the same visual point the camera is focused on at frame 100.
        */}
        <div
          ref={contentInnerRef}
          className="max-w-4xl w-full text-center flex flex-col items-center"
        >
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-white/5 text-white/90 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/10">
              {badge}
            </div>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
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

      {/* Preloader */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="w-12 h-12 mb-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
            Loading experience…
          </p>
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-white/40 text-xs tabular-nums">{progress}%</p>
        </div>
      )}
    </section>
  );
}
