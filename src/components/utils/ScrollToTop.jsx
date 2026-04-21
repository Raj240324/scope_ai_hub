import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element instead of the top
    if (hash) {
      // Small delay to allow the page to render before scrolling to the section
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, left: 0, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Scroll to top immediately on navigation (including same-page clicks)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash, key]);

  return null;
};

export default ScrollToTop;
