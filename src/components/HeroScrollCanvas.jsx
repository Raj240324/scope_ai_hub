import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScrollFrames } from "../hooks/useScrollFrames";
import { TOTAL_FRAMES } from "../utils/frameLoader";

/**
 * useReducedMotion hook
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/** Subtle cinematic film-grain overlay */
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        opacity: 0.045,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/** Radial vignette for depth */
function VignetteOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}

/** Scanline overlay for a subtle CRT / holographic aesthetic. */
function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        opacity: 0.025,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
      }}
    />
  );
}

/** Animated loading bar */
function LoadingBar({ loaded, total, hidden }) {
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading hero animation"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 30,
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.6s ease 0.4s",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #d64fd9 0%, #b833bb 50%, #d64fd9 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s linear infinite",
          transition: "width 0.3s ease",
          boxShadow: "0 0 8px rgba(214,79,217,0.8)",
        }}
      />
    </div>
  );
}

/** Scroll-progress indicator */
function ScrollIndicator({ sectionRef }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTop) / scrollableHeight)
      );
      track.style.transform = `scaleY(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [sectionRef]);

  const HERO_PARTNERS = [
  {
    name: "TCS",
    logo: "https://cdn.brandfetch.io/idK2mWG2SJ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1759053200614",
  },
  {
    name: "Infosys",
    logo: "https://cdn.brandfetch.io/id2jVuQy_9/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1676271043735",
  },
  {
    name: "Cognizant",
    logo: "https://cdn.brandfetch.io/idzF9a2Y93/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667652314787",
  },
];

  return (
    <div className="hero-scroll-indicator">
      <div
        ref={trackRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #d64fd9, #b833bb)",
          transformOrigin: "top center",
          transform: "scaleY(0)",
          borderRadius: "1px",
          boxShadow: "0 0 6px rgba(214,79,217,0.6)",
        }}
      />
    </div>
  );
}

/** Static fallback for reduced motion */
function StaticHeroFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background:
          "radial-gradient(ellipse 80% 80% at 60% 50%, #0a1628 0%, #010408 100%)",
      }}
    >
      <img
        src="/hero-frames/frame_0001.webp"
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

const HeroScrollCanvas = ({ badge, title, subtitle, children }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { loadedCount, isFullyLoaded } = useScrollFrames({
    sectionRef,
    canvasRef,
    reducedMotion,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.src = "/hero-frames/frame_0001.webp";
  
    img.onload = () => {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
  
      let drawWidth, drawHeight, offsetX, offsetY;
  
      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
  }, []);

  const anim = (delay) =>
    reducedMotion ? "none" : `fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) ${delay} both`;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollHintBob {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(5px); opacity: 0.6; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .hero-content-wrap {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(1.25rem, 4vw, 3rem);
          padding-top: max(80px, env(safe-area-inset-top, 80px));
          padding-bottom: clamp(1.5rem, 5vw, 3.5rem);
          pointer-events: none;
          overflow: hidden;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: clamp(0.55rem, 2.2vw, 0.72rem);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #d64fd9;
          margin-bottom: 0.7rem;
        }

        .hero-h1 {
          font-family: 'Bebas Neue', 'Arial Black', sans-serif;
          font-weight: 400;
          font-size: clamp(2.2rem, 6vw, 4.25rem);
          line-height: 0.96;
          letter-spacing: 0.02em;
          color: #f5f0ea;
          margin: 0 0 0.75rem;
          text-shadow: 0 4px 40px rgba(0,0,0,0.7);
        }

        .hero-sub {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.88rem, 3.2vw, 1.15rem);
          line-height: 1.75;
          color: rgba(245,240,234,0.55);
          max-width: 46ch;
          margin: 0 0 1.4rem;
        }

        .hero-cta-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          pointer-events: auto;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.8rem;
          background: linear-gradient(110deg, #d64fd9, #b833bb);
          color: #fff;
          font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
          font-weight: 700;
          font-size: clamp(0.82rem, 2.5vw, 1rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          box-shadow: 0 4px 28px rgba(214,79,217,0.45);
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
          border: none;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(214,79,217,0.65);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.8rem;
          border: 1px solid rgba(245,240,234,0.2);
          color: #f5f0ea;
          font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
          font-weight: 700;
          font-size: clamp(0.82rem, 2.5vw, 1rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          backdrop-filter: blur(6px);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: background 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
          background: transparent;
        }
        .hero-btn-ghost:hover {
          background: rgba(214,79,217,0.1);
          border-color: rgba(214,79,217,0.5);
        }

        .hero-scroll-indicator {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 120px;
          background: rgba(255,255,255,0.12);
          z-index: 20;
          border-radius: 1px;
        }

        .hero-mobile-overlay {
          display: none;
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(4,6,12,0.92) 0%,
            rgba(4,6,12,0.70) 50%,
            transparent 100%
          );
        }

        @media (max-width: 1024px) {
          .hero-h1 { font-size: clamp(2.1rem, 6vw, 3.6rem); }
        }

        @media (max-width: 768px) {
          .hero-mobile-overlay { display: block; }
          .hero-scroll-indicator { display: none; }
          .hero-content-wrap {
            justify-content: flex-end;
            padding: 64px 1.25rem 1.75rem;
          }
          .hero-eyebrow { font-size: 0.58rem; margin-bottom: 0.5rem; }
          .hero-h1 {
            font-size: clamp(1.9rem, 9.5vw, 2.6rem);
            line-height: 1.02;
            margin-bottom: 0.6rem;
          }
          .hero-sub {
            font-size: 0.88rem;
            margin-bottom: 1.1rem;
            max-width: 34ch;
          }
          .hero-cta-row { gap: 0.6rem; }
          .hero-btn-primary,
          .hero-btn-ghost {
            padding: 0.75rem 1.4rem;
            font-size: 0.82rem;
          }
        }

        @media (max-width: 480px) {
          .hero-h1 {
            font-size: clamp(1.7rem, 9vw, 2.2rem);
          }
          .hero-cta-row { flex-direction: column; align-items: flex-start; }
          .hero-btn-primary,
          .hero-btn-ghost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

        <section
        ref={sectionRef}
        aria-label="Hero animation section"
        style={{
          position: "relative",
          height: "140vh",
          backgroundColor: "#010408",
          margin: 0,
          padding: 0,
          overflow: "visible", // Ensure sticky works
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden", // Clip canvas and grain inside the sticky container
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Reduced-motion fallback */}
          {reducedMotion && <StaticHeroFallback />}

          {/* Canvas (z-0, behind everything) */}
          {!reducedMotion && (
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                backgroundColor: "#010408",
              }}
            />
          )}

          {/* Atmospheric overlays */}
          <GrainOverlay />
          <VignetteOverlay />
          <ScanlineOverlay />

          {/* Mobile left-side dark gradient (text readability) */}
          <div className="hero-mobile-overlay" aria-hidden="true" />

          {/* Hero text content (z-20) */}
          <div className="hero-content-wrap">
            {/* Eyebrow */}
            <div className="hero-eyebrow" style={{ animation: anim("0.1s") }}>
              <span style={{
                width: 24, height: 1, flexShrink: 0, display: "inline-block",
                background: "linear-gradient(90deg,#d64fd9,#b833bb)",
              }} />
              {badge || "Built for the AI Era"}
            </div>

            {/* Headline */}
            <h1 className="hero-h1" style={{ animation: anim("0.25s") }}>
              Dominate<br />
              with{" "}
              <span style={{
                backgroundImage: "linear-gradient(110deg, #d64fd9, #b833bb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Intelligence.
              </span>
              <br />
              <span style={{
                WebkitTextStroke: "1.5px rgba(245,240,234,0.3)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
                Lead Without
              </span>
              <br />
              Limits.
            </h1>

            {/* Subheadline */}
            <p className="hero-sub" style={{ animation: anim("0.4s") }}>
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="hero-cta-row" style={{ animation: anim("0.55s") }}>
              {children}
            </div>
            {/* Trust micro-bar */}
<div
  className="text-[var(--text-muted)]"
  style={{
    marginTop: "0.85rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    alignItems: "center",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    animation: anim("0.65s"),
  }}
>
  <span>⭐ 4.9 Student Rating</span>
  <span style={{ opacity: 0.4 }}>•</span>
  <span>1000+ Students Trained</span>
  <span style={{ opacity: 0.4 }}>•</span>
  <span>Hiring Partners: TCS, Infosys</span>
</div>

            {/* Scroll hint */}
            <div
              style={{
                marginTop: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                opacity: 0,
                animation: reducedMotion
                  ? "none"
                  : "fadeSlideUp 0.8s ease 0.9s both, scrollHintBob 2s ease-in-out infinite 2s",
              }}
            >
              <div style={{
                width: 1, height: 32, flexShrink: 0,
                background: "linear-gradient(to bottom, #d64fd9, transparent)",
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(214,79,217,0.6)",
              }}>
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Scroll progress indicator */}
          {!reducedMotion && <ScrollIndicator sectionRef={sectionRef} />}

          {/* Frame loading bar */}
          {!reducedMotion && (
            <LoadingBar
              loaded={loadedCount}
              total={TOTAL_FRAMES}
              hidden={isFullyLoaded}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default HeroScrollCanvas;
