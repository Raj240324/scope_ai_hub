import React, { useState, useEffect } from "react";
import { getHeroMode } from "../../utils/deviceCapability";
import DesktopHeroSequence from "./DesktopHeroSequence";
import VideoHero from "./VideoHero";
import StaticHero from "./StaticHero";

const HeroEngine = () => {
  const [mode, setMode] = useState("static");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setMode("static"); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }

    setMode(getHeroMode());
  }, []);

  if (mode === "desktop") {
    return <DesktopHeroSequence />;
  }

  if (mode === "video") {
    return <VideoHero />;
  }

  return <StaticHero />;
};

export default HeroEngine;
