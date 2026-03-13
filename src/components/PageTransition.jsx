import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLenis } from './SmoothScroll';
import { EASE } from '../utils/motionVariants';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const lenis = useLenis();

  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }}
    >
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.25, 
          ease: EASE,
          exit: { duration: 0.15, ease: EASE }
        }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
};

export default PageTransition;
