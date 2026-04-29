import React, { useRef, useState, useEffect, useMemo } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Send, Loader2, AlertCircle, Check } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import ReCAPTCHA from "react-google-recaptcha";
import { checkRateLimit } from '../../utils/rateLimiter';
import { submitEnquiry } from '../../services/enquiryService';
import { trackEvent } from '../../utils/analytics';
import { courses } from '../../data/courses';
import { staggerContainer, staggerItem } from '../../utils/motionVariants';

/* ─── Step Definitions ──────────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: 'Name', field: 'user_name', placeholder: 'Your full name', type: 'text' },
  { id: 2, label: 'Email', field: 'user_email', placeholder: 'you@example.com', type: 'email' },
  { id: 3, label: 'Phone', field: 'user_phone', placeholder: '98765 43210', type: 'tel' },
  { id: 4, label: 'Location', field: 'user_location', placeholder: 'e.g. Adyar, Chennai', type: 'text' },
  { id: 5, label: 'Status', field: 'qualification', placeholder: 'Select your current status', type: 'select' },
  { id: 6, label: 'Interest', field: 'inquiry_type', placeholder: 'What are you looking for?', type: 'select' },
  { id: 7, label: 'Program', field: 'program_interest', placeholder: 'Select an AI program', type: 'select', conditional: true },
  { id: 8, label: 'Message', field: 'message', placeholder: 'Tell us how we can help you…', type: 'textarea' },
];

const INQUIRY_OPTIONS = [
  { value: 'Enroll in an AI Program', label: 'Enroll in an AI Program' },
  { value: 'Free Career Counseling', label: 'Free Career Counseling' },
  { value: 'Corporate AI Training', label: 'Corporate AI Training' },
  { value: 'Placement Assistance', label: 'Placement Assistance' },
  { value: 'Download Brochure', label: 'Download Brochure' },
  { value: 'General Inquiry', label: 'General Inquiry' },
];

const PROGRAM_OPTIONS = courses.map(c => ({
  value: c.title,
  label: c.title,
}));

const QUALIFICATIONS = [
  { value: 'Student', label: 'Student (Arts / Science / Engineering)' },
  { value: 'Job Seeker', label: 'Job Seeker / Fresher' },
  { value: 'Working Professional', label: 'Working Professional' },
  { value: 'Business Owner', label: 'Business Owner / Entrepreneur' },
  { value: 'Other', label: 'Other' },
];

/* ─── Main Component ─────────────────────────────────────────────── */

const ContactForm = ({ initialCourse = 'General Inquiry', autoFocus = false }) => {
  const { closeModal } = useModal();
  const form = useRef();
  const inputRef = useRef(null);
  const recaptchaRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_location: '',
    qualification: '',
    inquiry_type: '',
    program_interest: null,
    message: ''
  });
  
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  // eslint-disable-next-line react-hooks/purity
  const formLoadedAt = useRef(Date.now());

  // Handle initialCourse compatibility
  useEffect(() => {
    if (initialCourse) {
      const isActualCourse = courses.some(c => c.title === initialCourse);
      if (isActualCourse) {
        setFormData(prev => ({
          ...prev,
          inquiry_type: 'Enroll in an AI Program',
          program_interest: initialCourse
        }));
      } else if (INQUIRY_OPTIONS.some(opt => opt.value === initialCourse)) {
        setFormData(prev => ({
          ...prev,
          inquiry_type: initialCourse,
          program_interest: null
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          inquiry_type: 'General Inquiry',
          program_interest: null
        }));
      }
    }
  }, [initialCourse]);

  // Auto-focus first input on mount and on step change
  useEffect(() => {
    // Only proceed if autoFocus is true or we are past the first step
    if (!autoFocus && currentStep === 0) return;

    // Scroll container to top on step change
    const scrollContainer = inputRef.current?.closest('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Small delay to coordinate with modal entrance animation
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 400); // Matches modal spring animation timing
    return () => clearTimeout(timer);
  }, [currentStep, autoFocus]);

  // Derived Steps (handle conditional visibility)
  const activeSteps = useMemo(() => {
    return STEPS.filter(s => {
      if (s.field === 'program_interest') {
        return formData.inquiry_type === 'Enroll in an AI Program';
      }
      return true;
    });
  }, [formData.inquiry_type]);

  const step = activeSteps[currentStep] || activeSteps[0];
  const progress = ((currentStep + 1) / activeSteps.length) * 100;
  const value = formData[step.field] ?? '';

  /* ── Validation per step ─────────────────────────────────── */
  const validateCurrent = () => {
    const v = (formData[step.field] || '').trim();

    if (step.field === 'user_name') {
      if (v.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s]+$/.test(v)) return 'Name should only contain letters';
    }
    if (step.field === 'user_email') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) return 'Enter a valid email address';
    }
    if (step.field === 'user_phone') {
      const digits = v.replace(/\D/g, '');
      if (digits.length !== 10) return 'Phone must be exactly 10 digits';
    }
    if (step.field === 'user_location') {
      if (v.length < 2) return 'Enter your city or area';
    }
    if (step.field === 'qualification') {
      if (!v) return 'Please select your status';
    }
    if (step.field === 'inquiry_type') {
      if (!v) return 'Please select an inquiry type';
    }
    if (step.field === 'program_interest') {
      if (formData.inquiry_type === 'Enroll in an AI Program' && !v) return 'Please select a program';
    }
    if (step.field === 'message') {
      if (v.length < 10) return 'Tell us a bit more (at least 10 characters)';
    }
    return '';
  };

  const handleNext = () => {
    const err = validateCurrent();
    if (err) { setFieldError(err); return; }
    
    // eslint-disable-next-line react-hooks/purity
    if (currentStep === activeSteps.length - 1 && Date.now() - formLoadedAt.current < 3000) {
      setFieldError('Please take a moment to review your entry.');
      return;
    }

    setFieldError('');
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setFieldError('');
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleChange = (field, val) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: val };
      if (field === 'inquiry_type' && val !== 'Enroll in an AI Program') {
        newData.program_interest = null;
      }
      return newData;
    });
    if (fieldError) setFieldError('');
  };

  /* ── Secure Submit Pipeline ─────────────────────────────── */
  const handleSubmit = async () => {
    setStatus('sending');
    setErrorMessage('');

    try {
      if (honeypot) {
        await new Promise((r) => setTimeout(r, 1500));
        setStatus('success');
        return;
      }

      checkRateLimit();

      if (!captchaToken) {
        setStatus('error');
        setErrorMessage('Please complete the reCAPTCHA.');
        return;
      }

      const result = await submitEnquiry({
        ...formData,
        recaptchaToken: captchaToken,
        formLoadedAt,
      });

      if (result.success) {
        setStatus('success');
        
        // Track Lead Generation in GA4
        trackEvent('generate_lead', {
          event_category: 'Enquiry',
          event_label: formData.inquiry_type,
          course_name: formData.program_interest || 'General'
        });
        
      } else {
        setStatus('error');
        setErrorMessage(result.message);
        setCaptchaToken(null);
        if (recaptchaRef.current) recaptchaRef.current.reset();
      }
    } catch (e) {
      setStatus('error');
      setErrorMessage(e.message || 'Something went wrong. Please try again.');
      setCaptchaToken(null);
      if (recaptchaRef.current) recaptchaRef.current.reset();
    }
  };

  /* ── Success State ───────────────────────────────────────── */
  if (status === 'success') {
    let successMessage ="Thank you! Our team will get back to you soon.";
    if (formData.inquiry_type === 'Free Career Counseling') {
      successMessage ="Our career advisor will contact you within 24 hours.";
    } else if (formData.inquiry_type === 'Corporate AI Training') {
      successMessage ="Our enterprise team will reach out shortly.";
    }

    return (
      <div className="flex flex-col items-center gap-5 py-8 animate-in fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500/20">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="heading-sm font-bold text-[var(--text-heading)]">You're all set, {formData.user_name}!</h2>
          <p className="text-small text-[var(--text-muted)]">{successMessage}</p>
        </div>
        <div className="flex gap-3 mt-2">
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { 
              setStatus('idle'); 
              setCurrentStep(0); 
              setFormData({
                user_name: '',
                user_email: '',
                user_phone: '',
                user_location: '',
                qualification: '',
                inquiry_type: '',
                program_interest: null,
                message: ''
              }); 
              setCaptchaToken(null);
              if (recaptchaRef.current) recaptchaRef.current.reset();
            }}
            className="btn-primary text-small focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          >
            Send Another
          </m.button>
          {closeModal && (
            <m.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeModal} 
              className="btn-secondary text-small focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            >
              Close
            </m.button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={form}>
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute w-1 h-1 opacity-0 -z-50 -left-[9999px]"
      />
      
      {/* Stepper indicators */}
      <div className="mb-6 sm:mb-8 flex items-center justify-center gap-1 sm:gap-2">
        {activeSteps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => i < currentStep && (setFieldError(''), setCurrentStep(i))}
              disabled={i > currentStep}
              className={`relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 text-caption sm:text-xs font-bold
                ${i < currentStep ? 'bg-primary/15 text-primary' : ''}
                ${i === currentStep ? 'bg-primary text-[var(--text-on-inverted)] shadow-lg shadow-primary/30' : ''}
                ${i > currentStep ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)]' : ''}
                ${i > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {i < currentStep ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} /> : i + 1}
              {i === currentStep && (
                <span className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
              )}
            </button>
            {i < activeSteps.length - 1 && (
              <div className="relative h-[1.5px] w-2 sm:w-6">
                <div className="absolute inset-0 bg-[var(--border-color)]" />
                <div
                  className="absolute inset-0 bg-primary/40 transition-all duration-700 origin-left"
                  style={{ transform: `scaleX(${i < currentStep ? 1 : 0})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 overflow-hidden rounded-full bg-[var(--bg-secondary)] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={step.field}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-baseline justify-between">
            <label className="text-body sm:text-lg font-bold text-[var(--text-heading)]">
              {step.label} <span className="text-red-500 text-caption">*</span>
            </label>
            <span className="text-caption font-bold text-[var(--text-muted)] tabular-nums uppercase tracking-wider">
              {currentStep + 1} / {activeSteps.length}
            </span>
          </div>

          {step.type === 'textarea' ? (
            <textarea
              ref={inputRef}
              rows={3}
              placeholder={step.placeholder}
              value={value}
              onChange={(e) => handleChange(step.field, e.target.value)}
              className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-all text-body sm:text-sm text-[var(--text-heading)] resize-none ${
                fieldError ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
            />
          ) : step.type === 'select' ? (
            <m.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              {(step.field === 'qualification' ? QUALIFICATIONS : (step.field === 'inquiry_type' ? INQUIRY_OPTIONS : PROGRAM_OPTIONS)).map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <m.button
                    key={opt.value}
                    type="button"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChange(step.field, opt.value)}
                    className={`group relative w-full px-4 py-3 rounded-xl text-small font-medium text-left transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10'
                        : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-primary/40 hover:text-[var(--text-heading)]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-[var(--text-on-inverted)] scale-100'
                        : 'border border-[var(--border-color)] scale-90 opacity-0 group-hover:opacity-40'
                    }`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </m.button>
                );
              })}
              
              {step.field === 'inquiry_type' && (
                <p className="text-caption text-[var(--text-muted)] font-medium mt-1">
                  Not sure which program fits you? Choose Free Career Counseling.
                </p>
              )}
              {step.field === 'program_interest' && (
                <p className="text-caption text-primary font-bold mt-1">
                  Limited seats available for 2026–27 batch.
                </p>
              )}
            </m.div>
          ) : (
            <input
              ref={inputRef}
              type={step.type}
              placeholder={step.placeholder}
              value={value}
              onChange={(e) => {
                let v = e.target.value;
                if (step.field === 'user_name') v = v.replace(/[^a-zA-Z\s]/g, '');
                if (step.field === 'user_phone') v = v.replace(/\D/g, '').slice(0, 10);
                handleChange(step.field, v);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className={`w-full px-4 py-3.5 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-all text-body sm:text-sm text-[var(--text-heading)] ${
                fieldError ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
            />
          )}

          <AnimatePresence>
            {fieldError && (
              <m.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-caption text-red-500 font-bold flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3 shrink-0" /> {fieldError}
              </m.p>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-caption font-bold">{errorMessage}</p>
            </div>
          )}
        </m.div>
      </AnimatePresence>

      <div className="mt-6 space-y-3">
        {currentStep === activeSteps.length - 1 && (
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
              onChange={(token) => {
                setCaptchaToken(token);
                if (status === 'error') setStatus('idle');
              }}
            />
          </div>
        )}
        
        {currentStep === activeSteps.length - 1 ? (
          <m.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={status === 'sending'}
            className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting…</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </m.button>
        ) : (
          <m.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={status === 'sending'}
            className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting…</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </m.button>
        )}

        {currentStep > 0 && (
          <m.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="w-full text-center text-small text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Go back
          </m.button>
        )}
      </div>

      <p className="text-center text-caption text-[var(--text-muted)] font-medium mt-4">
        By submitting, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms-conditions" className="text-primary hover:underline">Terms & Conditions</a>. This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a> apply.
      </p>
    </div>
  );
};

export default ContactForm;
