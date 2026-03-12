import React, { useRef, useEffect } from "react";

const TOTAL_FRAMES = 192;
const padFrame = (index) => `frame_${index.toString().padStart(4, "0")}.webp`;

const DesktopHeroSequence = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES + 1).fill(null));
  const frameIndexRef = useRef(0);

  // Dispatch event so AppPreloader instantly dismisses once the first frame is ready
  useEffect(() => {
    const handleFirstFrame = () => {
      window.dispatchEvent(new Event("heroVideoReady"));
    };

    const img = new Image();
    img.src = `/hero-frames/${padFrame(1)}`;
    img.onload = () => {
      imagesRef.current[1] = img;
      frameIndexRef.current = 1;
      const canvas = canvasRef.current;
      if (canvas && contextRef.current) {
        drawCover(contextRef.current, img, canvas.width, canvas.height);
      }
      handleFirstFrame();
    };
  }, []);

  // Lazily preload remaining frames (doesn't block first render)
  useEffect(() => {
    const preloadFrames = () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/hero-frames/${padFrame(i)}`;
        imagesRef.current[i] = img;
      }
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(preloadFrames, { timeout: 1000 });
    } else {
      setTimeout(preloadFrames, 500);
    }
  }, []);

  // Handle scroll and canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha:false for faster Compositor performance
    const context = canvas.getContext("2d", { alpha: false });
    contextRef.current = context;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Redraw current frame on resize
      const img = imagesRef.current[frameIndexRef.current];
      if (img && img.complete) {
        drawCover(context, img, canvas.width, canvas.height);
      }
    };

    setSize();
    window.addEventListener("resize", setSize);

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateFrame();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateFrame = () => {
      // 500vh container means 400vh of scrollable space
      const scrollMax = window.innerHeight * 4;
      const scrollTop = document.documentElement.scrollTop || window.scrollY;

      let progress = scrollTop / scrollMax;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // Smooth easing maps progress [0..1] -> [1..192]
      let frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1)) + 1;
      if (frameIndex > TOTAL_FRAMES) frameIndex = TOTAL_FRAMES;

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;

        const img = imagesRef.current[frameIndex];
        if (img && img.complete) {
          drawCover(context, img, canvas.width, canvas.height);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Similar to object-fit: cover, but drawn natively into Canvas 2D
  const drawCover = (ctx, img, w, h) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let renderW, renderH, x, y;

    if (imgRatio > canvasRatio) {
      renderH = h;
      renderW = img.width * (h / img.height);
      x = (w - renderW) / 2;
      y = 0;
    } else {
      renderW = w;
      renderH = img.height * (w / img.width);
      x = 0;
      y = (h - renderH) / 2;
    }

    ctx.drawImage(img, x, y, renderW, renderH);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        /* Hardware acceleration hits */
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
};

export default DesktopHeroSequence;
