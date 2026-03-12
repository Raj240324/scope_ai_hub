import React, { useEffect } from "react";

const StaticHero = () => {
  useEffect(() => {
    // The image itself isn't completely crucial to hold the preloader for long,
    // but we can instantly dispatch since it will load very fast.
    window.dispatchEvent(new Event("heroVideoReady"));
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        backgroundColor: "#010408",
      }}
    >
      <img
        src="/hero-frames/frame_0001.webp"
        alt="Hero Background"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.75, // Match other video/canvas brightness
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
};

export default StaticHero;
