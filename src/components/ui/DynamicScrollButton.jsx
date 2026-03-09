import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleVisibility = () => {
    const scrolled = window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Show 'scroll to bottom' only when user is near the top (scrolled less than 500px)
    setIsAtTop(scrolled < 500);


  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const Icon = isAtTop ? ChevronDown : ChevronUp;
  const handleClick = isAtTop ? scrollToBottom : scrollToTop;
  const label = isAtTop ? 'Scroll to Bottom' : 'Back to Top';

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
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all group border border-white/20 backdrop-blur-sm"
          aria-label={label}
        >
          <Icon className="w-7 h-7 transition-transform group-hover:-translate-y-1" />
          <span className="absolute right-16 bg-[var(--bg-card)] text-[var(--text-heading)] px-4 py-2 rounded-xl text-caption font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--border-color)] pointer-events-none">
            {label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default DynamicScrollButton;