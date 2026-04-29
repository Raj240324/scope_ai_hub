import React, { lazy, Suspense } from 'react';
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
import AnalyticsTracker from './components/utils/AnalyticsTracker';

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
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const TrainerCodeOfConduct = lazy(() => import('./pages/legal/TrainerCodeOfConduct'));
const JoinAsTrainer = lazy(() => import('./pages/careers/JoinAsTrainer'));
const CareerSupport = lazy(() => import('./pages/career-support/CareerSupport'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));

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
      <AnalyticsTracker />
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
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/legal/trainer-conduct" element={<TrainerCodeOfConduct />} />

        <Route path="/sitemap" element={<Sitemap />} />

        {/* 404 Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SmoothScroll>
          <LazyMotion features={domAnimation}>
            <HelmetProvider>
              <ModalProvider>
                <ThemeProvider>
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedRoutes />
                  </Suspense>
                  <NewUserModalTrigger isAppReady />
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

