import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useModal } from '../context/ModalContext';

const NotFound = () => {
  const { openModal } = useModal();
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center section-padding pt-32 md:pt-40">
        <div className="text-center max-w-xl px-4">
          <div className="relative mb-12">
            <h1 className="text-[8rem] md:text-[12rem] font-black text-[var(--bg-secondary)] leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[var(--bg-card)] p-6 rounded-3xl shadow-2xl border border-[var(--border-color)] transform -rotate-3">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[var(--text-heading)]">Page Not Found</h2>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-[var(--text-muted)] mb-12">
            Oops! The page you are looking for might have been moved, deleted, or never existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary flex items-center px-8 py-4 w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary flex items-center px-8 py-4 w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
            <p className="text-[var(--text-muted)] font-medium mb-6">Need help? Explore our popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="text-sm font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full">All Courses</Link>
              <Link to="/reviews" className="text-sm font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full">Student Reviews</Link>
              <Link to="/placement" className="text-sm font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full">Placement Support</Link>
              <button 
                onClick={() => openModal()}
                className="text-sm font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
