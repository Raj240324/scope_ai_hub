/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }) {
  const [lenis, setLenis] = React.useState(null);
  const location = useLocation();

  // Initialize Lenis
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let localLenis;
    try {
      localLenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3), // smoother + lighter
        smoothTouch: false,
        wheelMultiplier: 0.9, // 🔥 reduce aggressiveness
        touchMultiplier: 2,
        infinite: false,
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLenis(localLenis);

      function raf(time) {
        localLenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (err) {
      console.error('[SmoothScroll] Lenis Init Error:', err);
    }

    return () => {
      if (localLenis) localLenis.destroy();
    };
  }, []);

  // Handle route changes — respect hash fragments for section navigation
  useEffect(() => {
    if (!lenis) return;

    if (location.hash) {
      // First attempt triggers early for visual feedback
      const timer1 = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          lenis.scrollTo(element, { offset: -100, immediate: false });
        }
      }, 100);

      // Second attempt ensures accurate final position after lazy-loaded content resolves
      const timer2 = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          lenis.scrollTo(element, { offset: -100, immediate: false });
        }
      }, 700);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname, location.hash, lenis]);

  // Hero Conflict Resolution
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const heroEl = document.getElementById('hero-section');
    if (!heroEl || !lenis) return;

    let heroObserver;
    try {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lenis.stop();
          } else {
            lenis.start();
          }
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(heroEl);
    } catch (err) {
      console.error('[SmoothScroll] Hero Observer Error:', err);
    }

    return () => {
      if (heroObserver) heroObserver.disconnect();
    };
  }, [lenis]);

  if (typeof window === 'undefined') return <>{children}</>;

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScroll;
