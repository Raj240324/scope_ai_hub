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
const TrainerProfiles = lazy(() => import('./pages/careers/TrainerProfiles'));
const CareerSupport = lazy(() => import('./pages/career-support/CareerSupport'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Full-screen preloader — shows for ~2 s on first visit, then fades out.
// No longer gated on hero frame loading — video loads independently.
function AppPreloader({ onReady }) {
  const [visible, setVisible] = useState(() => !window.__appPreloaderShown);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (window.__appPreloaderShown) {
      onReady?.();
      return;
    }
  }, []);

  // Called by CoreSpinLoader once its simulated progress reaches 100 %
  const handleLoaderComplete = useCallback(() => {
    if (window.__appPreloaderShown) return;

    setFadeOut(true);
    window.__appPreloaderShown = true;
    // Remove from DOM after the 500 ms fade-out transition
    setTimeout(() => {
      setVisible(false);
      onReady?.();
    }, 500);
  }, [onReady]);

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
  <div className="min-h-screen bg-[var(--bg-body)]" />
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

        <Route path="/careers/trainers" element={<TrainerProfiles />} />
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
