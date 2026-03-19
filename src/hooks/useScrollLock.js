import { useEffect } from 'react';
import { useLenis } from '../components/SmoothScroll';

export const useScrollLock = (lock) => {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const body = document.body;

    if (lock) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollBarWidth}px`;

      // ✅ STOP Lenis (correct approach)
      lenis?.stop();
    } else {
      body.style.overflow = '';
      body.style.paddingRight = '';

      // ✅ Restart Lenis
      lenis?.start();
    }

    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
      lenis?.start();
    };
  }, [lock, lenis]);
};
