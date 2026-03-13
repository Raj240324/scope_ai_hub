import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';
import TrainerForm from './TrainerForm';
import { useModal } from '../../context/ModalContext';
import { useScrollLock } from '../../hooks/useScrollLock';

const ContactModal = () => {
  const { isModalOpen, closeModal, modalCourse, modalType } = useModal();
  const scrollContainerRef = useRef(null);

  // Handle body scroll lock and prevent layout shift
  useScrollLock(isModalOpen);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[var(--text-heading)]/60 backdrop-blur-sm touch-none"
          />

          {/* Modal Content */}
          <m.div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-[2rem] shadow-2xl z-10 flex flex-col max-h-[92vh] md:max-h-[85vh] overflow-hidden"
          >
            {/* Close Button */}
            <m.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all z-20"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </m.button>

            {/* Scrollable Content Area */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16 custom-scrollbar"
              tabIndex="0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div>
                <div className="mb-4 md:mb-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-widest mb-2 md:mb-3">
                    <span>{modalType === 'trainer' ? 'Join Academic Faculty' : 'Admissions Open 2026-27'}</span>
                  </div>
                  <h2 id="modal-title" className="heading-md md:heading-hero text-[var(--text-heading)] mb-2 md:mb-3 tracking-tight">
                    {modalType === 'trainer' ? (
                      <>Expert <span className="text-primary">Mentor Program</span></>
                    ) : modalCourse === 'Download Brochure' ? (
                      <>Get Your <span className="text-primary">Career Guide</span></>
                    ) : modalCourse === 'Corporate Training' ? (
                      <>Corporate <span className="text-primary">Inquiry</span></>
                    ) : modalCourse === 'Career Counseling' ? (
                      <>Free Career <span className="text-primary">Counseling</span></>
                    ) : modalCourse === 'Placement Inquiry' ? (
                      <>Placement <span className="text-primary">Support</span></>
                    ) : modalCourse !== 'General Inquiry' && modalCourse !== '' ? (
                      <>Join <span className="text-primary">{modalCourse}</span></>
                    ) : (
                      <>Start Your <span className="text-primary">Journey</span></>
                    )}
                  </h2>
                  <p className="text-[var(--text-muted)] text-caption md:text-sm leading-relaxed">
                    {modalType === 'trainer'
                      ? "Apply to join our expert teaching faculty. Share your industry experience and shape the future of tech talent in Chennai."
                      : modalCourse === 'Download Brochure' 
                      ? "Fill out the form below to receive our 2026 Career Guide and full syllabus in your inbox."
                      : modalCourse === 'Corporate Training'
                      ? "Let us know your organization's requirements, and our corporate training team will get back to you with a customized proposal."
                      : modalCourse === 'Career Counseling'
                      ? "Confused about which path to take? Schedule a 1:1 session with our senior experts to map out your career roadmap."
                      : modalCourse === 'Placement Inquiry'
                      ? "Looking for job opportunities? Our placement cell will help you connect with our 75+ hiring partners."
                      : modalCourse !== 'General Inquiry' 
                      ? `Join our ${modalCourse} program. Fill out the form below to get complete syllabus and fee structure.`
                      : "Have questions? Our career counselor will help you choose the right path for your future."}
                  </p>
                </div>

                {modalType === 'trainer' ? (
                  <TrainerForm autoFocus={true} />
                ) : (
                  <ContactForm initialCourse={modalCourse} autoFocus={true} />
                )}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;