import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  once = true,
  enabled = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) { setIsVisible(true); return; }
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let observer;
    try {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      }, { threshold, rootMargin });
      observer.observe(el);
    } catch (err) {
      setIsVisible(true);
      console.error('[useScrollReveal]', err);
    }

    return () => { if (observer) observer.disconnect(); };
  }, [reducedMotion, threshold, rootMargin, once, enabled]);

  return { ref, isVisible };
}
