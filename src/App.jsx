import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import ErrorBoundary from './components/layout/ErrorBoundary';
import ScrollToTop from './components/utils/ScrollToTop';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import ContactModal from './components/ui/ContactModal';
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
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Full-screen preloader — only shows on first load / refresh
function AppPreloader() {
  const [visible, setVisible] = useState(() => !window.__appPreloaderShown);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (window.__appPreloaderShown) return;

    // Show for 4 seconds (full animation cycle), then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      window.__appPreloaderShown = true;
      // Remove from DOM after fade animation
      setTimeout(() => setVisible(false), 700);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <CoreSpinLoader />
    </div>
  );
}

// Minimal Suspense fallback for route transitions
const PageLoader = () => (
  <div className="min-h-screen bg-[var(--bg-body)]" />
);

function App() {
  return (
    <ErrorBoundary>
      <AppPreloader />
      <HelmetProvider>
        <ModalProvider>
          <ThemeProvider>
            <Router>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/nda-policy" element={<NDAPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/legal/trainer-conduct" element={<TrainerCodeOfConduct />} />
                <Route path="/careers/join-as-trainer" element={<JoinAsTrainer />} />
                <Route path="/careers/trainers" element={<TrainerProfiles />} />
                <Route path="/sitemap" element={<Sitemap />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>

            </Suspense>
            <ContactModal />
            </Router>
          </ThemeProvider>
        </ModalProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
