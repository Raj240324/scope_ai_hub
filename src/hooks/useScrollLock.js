import { useEffect } from 'react';
import { useLenis } from '../components/SmoothScroll';

/**
 * Hook to lock body scroll and stop Lenis smooth scrolling.
 * @param {boolean} lock - Whether to lock the scroll.
 */
export const useScrollLock = (lock) => {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (lock) {
      // Calculate scrollbar width to prevent layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock standard body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.touchAction = 'none'; // Prevent touch gestures on mobile
      
      // Stop Lenis smooth scroll
      if (lenis) {
        lenis.stop();
      }
    } else {
      // Unlock standard body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.touchAction = '';
      
      // Start Lenis smooth scroll
      if (lenis) {
        lenis.start();
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.touchAction = '';
      if (lenis) {
        lenis.start();
      }
    };
  }, [lock, lenis]);
};
