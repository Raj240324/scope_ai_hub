import React, { useState, useEffect, useRef } from "react";

const VideoHero = () => {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  // Tab visibility pause to save battery
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Dispatch video ready to UI and wait for canplaythrough
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = async () => {
      try {
        await video.play();
      } catch (e) {}
      
      setVideoReady(true);
      window.dispatchEvent(new Event("heroVideoReady"));
    };

    video.addEventListener("canplaythrough", handleReady);
    return () => video.removeEventListener("canplaythrough", handleReady);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      poster="/hero-frames/frame_0001.webp"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
        zIndex: 0,
        /* hardware acceleration */
        transform: "translateZ(0)",
        willChange: "transform",
        /* fade-in */
        opacity: videoReady ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <source src="/hero_mobile.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoHero;
