import React, { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';

// Components
import ErrorBoundary from './components/layout/ErrorBoundary';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import ContactModal from './components/ui/ContactModal';
import NewUserModalTrigger from './components/utils/NewUserModalTrigger';
import { CoreSpinLoader } from './components/ui/CoreSpinLoader';
import { useScrollLock } from './hooks/useScrollLock';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CoursesList = lazy(() => import('./pages/courses/CoursesList'));
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/legal/TermsConditions'));
const NDAPolicy = lazy(() => import('./pages/legal/NDAPolicy'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const Disclaimer = lazy(() => import('./pages/legal/Disclaimer'));
const TrainerCodeOfConduct = lazy(() => import('./pages/legal/TrainerCodeOfConduct'));
const JoinAsTrainer = lazy(() => import('./pages/careers/JoinAsTrainer'));
const CareerSupport = lazy(() => import('./pages/career-support/CareerSupport'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ── Prefetch critical routes on idle so navigation is instant ────────────────
const prefetchRoutes = () => {
  import('./pages/About');
  import('./pages/courses/CoursesList');
  import('./pages/courses/CourseDetail');
  import('./pages/Admissions');
  import('./pages/Contact');
  import('./pages/FAQ');
};

if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(prefetchRoutes, { timeout: 3000 });
} else {
  setTimeout(prefetchRoutes, 2000);
}

// Full-screen preloader — syncs with hero video loading
function AppPreloader({ onReady }) {
  const [visible, setVisible] = useState(() => !window.__appPreloaderShown);
  const [fadeOut, setFadeOut] = useState(false);
  
  const loaderDoneRef = useRef(false);
  const videoDoneRef = useRef(false);

  // Lock scroll while preloader is visible
  useScrollLock(visible);

  const checkDone = useCallback(() => {
    if (window.__appPreloaderShown) return;
    if (loaderDoneRef.current && videoDoneRef.current && !fadeOut) {
      setFadeOut(true);
      window.__appPreloaderShown = true;
      setTimeout(() => {
        setVisible(false);
        onReady?.();
      }, 300);
    }
  }, [fadeOut, onReady]);

  // Called by CoreSpinLoader once its simulated progress reaches 100%
  const handleLoaderComplete = useCallback(() => {
    loaderDoneRef.current = true;
    checkDone();
  }, [checkDone]);

  useEffect(() => {
    if (window.__appPreloaderShown) {
      onReady?.();
      return;
    }

    // If not on the home page, no need to wait for the hero video
    if (window.location.pathname !== '/') {
      videoDoneRef.current = true;
    }

    const handleVideoReady = () => {
      videoDoneRef.current = true;
      checkDone();
    };

    window.addEventListener("heroVideoReady", handleVideoReady);

    // Safety timeout: force dismiss after 3 seconds total if video stalls
    const timeout = setTimeout(() => {
      videoDoneRef.current = true;
      checkDone();
    }, 3000);

    return () => {
      window.removeEventListener("heroVideoReady", handleVideoReady);
      clearTimeout(timeout);
    };
  }, [checkDone, onReady]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-body)] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <CoreSpinLoader onComplete={handleLoaderComplete} />
    </div>
  );
}

// Minimal Suspense fallback for route transitions
const PageLoader = () => (
  <div className="min-h-screen bg-[var(--bg-body)] flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-transparent border-t-[var(--color-primary)] animate-spin" />
  </div>
);

// Extracted routes component to use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />

        <Route path="/admissions" element={<Admissions />} />
        <Route path="/career-support" element={<CareerSupport />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route path="/careers/join-as-trainer" element={<JoinAsTrainer />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/nda-policy" element={<NDAPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/legal/trainer-conduct" element={<TrainerCodeOfConduct />} />

        <Route path="/sitemap" element={<Sitemap />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  const [isAppReady, setIsAppReady] = useState(() => window.__appPreloaderShown || false);

  return (
    <ErrorBoundary>
      <AppPreloader onReady={() => setIsAppReady(true)} />

      <Router>
        <SmoothScroll>
          <LazyMotion features={domAnimation}>
            <HelmetProvider>
              <ModalProvider>
                <ThemeProvider>
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedRoutes />
                  </Suspense>
                  <NewUserModalTrigger isAppReady={isAppReady} />
                  <ContactModal />
                </ThemeProvider>
              </ModalProvider>
            </HelmetProvider>
          </LazyMotion>
        </SmoothScroll>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
