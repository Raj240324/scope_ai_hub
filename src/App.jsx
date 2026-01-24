import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

// Components
import ErrorBoundary from './components/layout/ErrorBoundary';
import ScrollToTop from './components/utils/ScrollToTop';
import TawkChat from './components/utils/TawkChat';
import WhatsAppButton from './components/ui/WhatsAppButton';
import { ModalProvider } from './context/ModalContext';
import ContactModal from './components/ui/ContactModal';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Placement = lazy(() => import('./pages/Placement'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CoursesList = lazy(() => import('./pages/courses/CoursesList'));
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/legal/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// New Pages

const Gallery = lazy(() => import('./pages/Gallery'));


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
          <TawkChat />
          <WhatsAppButton />
          <Router>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/placement" element={<Placement />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                {/* New Pages */}
                <Route path="/gallery" element={<Gallery />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ContactModal />
          </Router>
        </ModalProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
