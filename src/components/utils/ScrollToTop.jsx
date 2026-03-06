import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, key } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on navigation (including same-page clicks)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, key]);

  return null;
};

export default ScrollToTop;
