import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

// Components
import ErrorBoundary from './components/layout/ErrorBoundary';
import ScrollToTop from './components/utils/ScrollToTop';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import ContactModal from './components/ui/ContactModal';

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
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 className="h-10 w-10 text-primary animate-spin" />
    <p className="text-slate-500 font-medium animate-pulse">Loading amazing content...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
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
