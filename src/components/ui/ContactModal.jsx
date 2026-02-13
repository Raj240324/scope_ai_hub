import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';
import TrainerForm from './TrainerForm';
import { useModal } from '../../context/ModalContext';

const ContactModal = () => {
  const { isModalOpen, closeModal, modalCourse, modalType } = useModal();

  // Handle body scroll lock and prevent layout shift
  React.useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[var(--text-heading)]/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-[2rem] shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all z-20"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <div className="p-6 md:p-10 overflow-y-auto no-scrollbar">
              <div className="mb-6 md:mb-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4">
                  <span>{modalType === 'trainer' ? 'Join Academic Faculty' : 'Admissions Open 2026-27'}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[var(--text-heading)] mb-2 md:mb-3 tracking-tight">
                  {modalType === 'trainer' ? (
                    <>Expert <span className="text-primary">Mentor Program</span></>
                  ) : modalCourse === 'Download Brochure' ? (
                    <>Get Your <span className="text-primary">Career Guide</span></>
                  ) : modalCourse === 'Corporate Training' ? (
                    <>Corporate <span className="text-primary">Inquiry</span></>
                  ) : (
                    <>Start Your <span className="text-primary">Journey</span></>
                  )}
                </h2>
                <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed">
                  {modalType === 'trainer'
                    ? "Apply to join our expert teaching faculty. Share your industry experience and shape the future of tech talent in Chennai."
                    : modalCourse === 'Download Brochure' 
                    ? "Fill out the form below to receive our 2026 Career Guide and full syllabus in your inbox."
                    : modalCourse === 'Corporate Training'
                    ? "Let us know your organization's requirements, and our corporate training team will get back to you with a customized proposal."
                    : modalCourse !== 'General Inquiry' 
                    ? `Join our ${modalCourse} program. Fill out the form below to get complete syllabus and fee structure.`
                    : "Have questions? Our career counselor will help you choose the right path for your future."}
                </p>
              </div>

              {modalType === 'trainer' ? (
                <TrainerForm />
              ) : (
                <ContactForm initialCourse={modalCourse} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
