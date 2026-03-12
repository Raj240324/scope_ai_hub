import React, { useState, useEffect, useRef } from "react";

// ── Device-adaptive video source ────────────────────────────────────────────
// Mobile (< 768px or touch device) → 640×360, ~1.6 MB
// Desktop                          → 1280×720, ~6.3 MB
function getHeroVideoSrc() {
  if (typeof window === "undefined") return "/hero_desktop.mp4";
  const ua = navigator.userAgent || "";
  const isMobile =
    /iPhone|iPad|iPod|Android/i.test(ua) || window.innerWidth < 768;
  return isMobile ? "/hero_mobile.mp4" : "/hero_desktop.mp4";
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    mq.addEventListener("change", (e) => setReduced(e.matches));
  }, []);
  return reduced;
}

// Shown on devices that prefer reduced motion
function StaticHeroFallback() {
  return (
    <div style={{
      position:"absolute", inset:0, zIndex:0,
      background:"radial-gradient(ellipse 80% 80% at 60% 50%, #0a1628 0%, #010408 100%)",
    }}>
      <img
        src="/hero-frames/frame_0001.webp"
        alt="" aria-hidden="true"
        style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.7 }}
      />
    </div>
  );
}

function GrainOverlay() {
  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
      opacity:0.045, mixBlendMode:"overlay",
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat:"repeat", backgroundSize:"128px 128px",
    }}/>
  );
}

function VignetteOverlay() {
  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
      background:"radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
    }}/>
  );
}

function ScanlineOverlay() {
  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
      opacity:0.025,
      backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
    }}/>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
const HeroScrollCanvas = ({ badge, subtitle, children }) => {
  const reducedMotion = useReducedMotion();
  const [videoSrc]    = useState(() => getHeroVideoSrc());
  const [videoReady, setVideoReady] = useState(false);
  const videoRef      = useRef(null);

  // Pause video when tab is hidden to save battery & CPU
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Dispatch event so the App preloader can wait for video to be ready
  useEffect(() => {
    if (videoReady) {
      window.dispatchEvent(new Event("heroVideoReady"));
    }
  }, [videoReady]);

  const anim = (delay) =>
    reducedMotion ? "none" : `fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) ${delay} both`;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scrollHintBob {
          0%,100% { transform:translateY(0);   opacity:0.4; }
          50%      { transform:translateY(5px); opacity:0.6; }
        }
        .hero-content-wrap {
          position:absolute; inset:0; z-index:20;
          display:flex; flex-direction:column; justify-content:flex-end;
          padding:clamp(1.25rem,4vw,3rem);
          padding-top:max(80px,env(safe-area-inset-top,80px));
          padding-bottom:clamp(1.5rem,5vw,3.5rem);
          pointer-events:none; overflow:hidden;
        }
        .hero-eyebrow {
          display:inline-flex; align-items:center; gap:0.6rem;
          font-family:'DM Mono','Courier New',monospace;
          font-size:clamp(0.55rem,2.2vw,0.72rem);
          letter-spacing:0.28em; text-transform:uppercase;
          color:#d64fd9; margin-bottom:0.7rem;
        }
        .hero-h1 {
          font-family:'Bebas Neue','Arial Black',sans-serif;
          font-weight:400; font-size:clamp(2.2rem,6vw,4.25rem);
          line-height:0.96; letter-spacing:0.02em;
          color:#f5f0ea; margin:0 0 0.75rem;
          text-shadow:0 4px 40px rgba(0,0,0,0.7);
        }
        .hero-sub {
          font-family:'Barlow',sans-serif;
          font-weight:300; font-style:italic;
          font-size:clamp(0.88rem,3.2vw,1.15rem);
          line-height:1.75; color:rgba(245,240,234,0.55);
          max-width:46ch; margin:0 0 1.4rem;
        }
        .hero-cta-row { display:flex; gap:0.75rem; flex-wrap:wrap; pointer-events:auto; }
        .hero-btn-primary {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.8rem 1.8rem;
          background:linear-gradient(110deg,#d64fd9,#b833bb); color:#fff;
          font-family:'Barlow Condensed','Arial Narrow',sans-serif;
          font-weight:700; font-size:clamp(0.82rem,2.5vw,1rem);
          letter-spacing:0.1em; text-transform:uppercase; text-decoration:none;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          box-shadow:0 4px 28px rgba(214,79,217,0.45);
          transition:opacity .2s,transform .2s,box-shadow .2s;
          white-space:nowrap; cursor:pointer; border:none;
        }
        .hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 36px rgba(214,79,217,0.65); }
        .hero-btn-ghost {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.8rem 1.8rem; border:1px solid rgba(245,240,234,0.2); color:#f5f0ea;
          font-family:'Barlow Condensed','Arial Narrow',sans-serif;
          font-weight:700; font-size:clamp(0.82rem,2.5vw,1rem);
          letter-spacing:0.1em; text-transform:uppercase; text-decoration:none;
          backdrop-filter:blur(6px);
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition:background .2s,border-color .2s;
          white-space:nowrap; cursor:pointer; background:transparent;
        }
        .hero-btn-ghost:hover { background:rgba(214,79,217,0.1); border-color:rgba(214,79,217,0.5); }
        .hero-mobile-overlay {
          display:none; position:absolute; inset:0; z-index:6; pointer-events:none;
          background:linear-gradient(to right,rgba(4,6,12,0.92) 0%,rgba(4,6,12,0.70) 50%,transparent 100%);
        }
        @media (max-width:1024px) { .hero-h1 { font-size:clamp(2.1rem,6vw,3.6rem); } }
        @media (max-width:768px) {
          .hero-mobile-overlay { display:block; }
          .hero-content-wrap { justify-content:flex-end; padding:64px 1.25rem 1.75rem; }
          .hero-eyebrow { font-size:0.58rem; margin-bottom:0.5rem; }
          .hero-h1 { font-size:clamp(1.9rem,9.5vw,2.6rem); line-height:1.02; margin-bottom:0.6rem; }
          .hero-sub { font-size:0.88rem; margin-bottom:1.1rem; max-width:34ch; }
          .hero-cta-row { gap:0.6rem; }
          .hero-btn-primary,.hero-btn-ghost { padding:0.75rem 1.4rem; font-size:0.82rem; }
        }
        @media (max-width:480px) {
          .hero-h1 { font-size:clamp(1.7rem,9vw,2.2rem); }
          .hero-cta-row { flex-direction:column; align-items:flex-start; }
          .hero-btn-primary,.hero-btn-ghost { width:100%; justify-content:center; }
        }
      `}</style>

      <section
        id="hero-section"
        aria-label="Hero section"
        style={{
          position: "relative",
          height: "100dvh", 
          minHeight: "600px",
          backgroundColor: "#010408", 
          margin: 0, 
          padding: 0, 
          overflow: "hidden",
          display: "flex", 
          flexDirection: "column",
        }}
      >
        {/* Static fallback — shown when user prefers reduced motion */}
        {reducedMotion && <StaticHeroFallback />}

        {/* Video — autoplaying background loop */}
        {!reducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/hero-frames/frame_0001.webp"
            onLoadedData={() => setVideoReady(true)}
            aria-hidden="true"
            style={{
              position:"absolute", inset:0,
              width:"100%", height:"100%",
              objectFit:"cover",
              zIndex:0, backgroundColor:"#010408",
              pointerEvents:"none",
              /* smooth GPU rendering */
              transform: "translateZ(0)",
              willChange: "transform",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        <GrainOverlay />
        <VignetteOverlay />
        <ScanlineOverlay />
        <div className="hero-mobile-overlay" aria-hidden="true" />

        <div className="hero-content-wrap">
          <div className="hero-eyebrow" style={{ animation:anim("0.1s") }}>
            <span style={{
              width:24, height:1, flexShrink:0, display:"inline-block",
              background:"linear-gradient(90deg,#d64fd9,#b833bb)",
            }}/>
            {badge || "Built for the AI Era"}
          </div>

          <h1 className="hero-h1" style={{ animation:anim("0.25s") }}>
            Dominate<br/>
            with{" "}
            <span style={{
              backgroundImage:"linear-gradient(110deg,#d64fd9,#b833bb)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text",
            }}>Intelligence.</span>
            <br/>
            <span style={{
              WebkitTextStroke:"1.5px rgba(245,240,234,0.3)",
              WebkitTextFillColor:"transparent",
              color:"transparent",
            }}>Lead Without</span>
            <br/>Limits.
          </h1>

          <p className="hero-sub" style={{ animation:anim("0.4s") }}>{subtitle}</p>

          <div className="hero-cta-row" style={{ animation:anim("0.55s") }}>
            {children}
          </div>

          <div style={{
            marginTop:"0.85rem",
            display:"flex", flexWrap:"wrap",
            gap:"0.75rem", alignItems:"center",
            fontFamily:"'DM Mono',monospace",
            fontSize:"0.65rem", letterSpacing:"0.12em",
            animation:anim("0.65s"),
          }}>
            <span>⭐ 4.9 Student Rating</span>
            <span style={{opacity:0.4}}>•</span>
            <span>1200+ Students Trained</span>
            <span style={{opacity:0.4}}>•</span>
            <span>Hiring Partners: TCS, Infosys</span>
          </div>

          <div style={{
            marginTop:"1.2rem",
            display:"flex", alignItems:"center", gap:"0.5rem",
            opacity:0,
            animation: reducedMotion
              ? "none"
              : "fadeSlideUp 0.8s ease 0.9s both, scrollHintBob 2s ease-in-out infinite 2s",
          }}>
            <div style={{
              width:1, height:32, flexShrink:0,
              background:"linear-gradient(to bottom,#d64fd9,transparent)",
            }}/>
            <span style={{
              fontFamily:"'DM Mono',monospace",
              fontSize:"0.58rem", letterSpacing:"0.22em",
              textTransform:"uppercase",
              color:"var(--color-brand-highlight)",
            }}>Scroll to explore</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroScrollCanvas;