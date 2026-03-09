import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  const toggleVisibility = () => {
    const scrolled = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Show only after user has passed the hero (approx 80vh)
    if (scrolled > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Dynamic Logic: Determine scroll direction and update button action
    if (scrolled > lastScrollY.current) {
      // Scrolling down. If we are near the very bottom, force context to"Back to Top"
      if (scrolled >= pageHeight - 50) {
        setIsScrollingDown(false);
      } else {
        setIsScrollingDown(true);
      }
    } else if (scrolled < lastScrollY.current) {
      // Scrolling up. We always want"Back to Top" context here.
      setIsScrollingDown(false);
    }

    lastScrollY.current = scrolled;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    toggleVisibility(); // Set initial state
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const Icon = isScrollingDown ? ChevronDown : ChevronUp;
  const handleClick = isScrollingDown ? scrollToBottom : scrollToTop;
  const label = isScrollingDown ? 'Scroll to Bottom' : 'Back to Top';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="fixed bottom-8 left-4 sm:bottom-8 sm:left-4 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary text-[var(--text-on-inverted)] rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all group border border-white/20 backdrop-blur-sm"
          aria-label={label}
        >
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform ${isScrollingDown ? 'group-hover:translate-y-1' : 'group-hover:-translate-y-1'}`} />
          <span className="absolute left-16 bg-[var(--bg-card)] text-[var(--text-heading)] px-4 py-2 rounded-xl text-caption font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--border-color)] pointer-events-none">
            {label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default DynamicScrollButton;