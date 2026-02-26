import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Send, Loader2, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

/* ─── Step Definitions ──────────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: 'Name', field: 'user_name', placeholder: 'Your full name', type: 'text' },
  { id: 2, label: 'Email', field: 'user_email', placeholder: 'you@example.com', type: 'email' },
  { id: 3, label: 'Phone', field: 'user_phone', placeholder: '98765 43210', type: 'tel' },
  { id: 4, label: 'Location', field: 'user_location', placeholder: 'e.g. Adyar, Chennai', type: 'text' },
  { id: 5, label: 'Status', field: 'qualification', placeholder: 'Select your current status', type: 'select' },
  { id: 6, label: 'Course', field: 'course_interest', placeholder: 'Select a course', type: 'select' },
  { id: 7, label: 'Message', field: 'message', placeholder: 'Tell us how we can help you…', type: 'textarea' },
];

const COURSES = [
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Full Stack Web Development (MERN Stack)', label: 'Full Stack Development' },
  { value: 'Data Science & Artificial Intelligence', label: 'Data Science & AI' },
  { value: 'UI/UX Design Strategy', label: 'UI/UX Design' },
  { value: 'Cyber Security & Ethical Hacking', label: 'Cyber Security' },
  { value: 'Cloud Computing & DevOps', label: 'Cloud Computing' },
];

const QUALIFICATIONS = [
  { value: 'Student', label: 'Student (Arts / Science / Engineering)' },
  { value: 'Job Seeker', label: 'Job Seeker / Fresher' },
  { value: 'Working Professional', label: 'Working Professional' },
  { value: 'Business Owner', label: 'Business Owner / Entrepreneur' },
  { value: 'Other', label: 'Other' },
];

/* ─── Main Component ─────────────────────────────────────────────── */

const ContactForm = ({ initialCourse = 'General Inquiry' }) => {
  const { closeModal } = useModal();
  const form = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ course_interest: initialCourse });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');


  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course_interest: initialCourse }));
    }
  }, [initialCourse]);



  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const value = formData[step.field] || '';

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
    if (step.field === 'course_interest') {
      if (!v) return 'Please select a course';
    }
    if (step.field === 'message') {
      if (v.length < 10) return 'Tell us a bit more (at least 10 characters)';
    }
    return '';
  };

  const handleNext = () => {
    const err = validateCurrent();
    if (err) { setFieldError(err); return; }
    setFieldError('');
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setFieldError('');
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleChange = (field, val) => {
    setFormData({ ...formData, [field]: val });
    if (fieldError) setFieldError('');
  };

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = async () => {
    setStatus('sending');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${API_URL}/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Something went wrong.');
      }
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setErrorMessage(e.message || 'Something went wrong. Try again.');
    }
  };

  /* ── Success State ───────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-8 animate-in fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500/20">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-heading)]">You're all set, {formData.user_name}!</h2>
          <p className="text-sm text-[var(--text-muted)]">Our counselor will reach out within 24 hours.</p>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => { setStatus('idle'); setCurrentStep(0); setFormData({ course_interest: initialCourse }); }}
            className="btn-primary text-sm"
          >
            Send Another
          </button>
          {closeModal && (
            <button onClick={closeModal} className="px-6 py-3 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] font-bold rounded-xl text-sm hover:opacity-90 transition-all">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div ref={form}>
      {/* Step indicators */}
      <div className="mb-6 sm:mb-8 flex items-center justify-center gap-1 sm:gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => i < currentStep && (setFieldError(''), setCurrentStep(i))}
              disabled={i > currentStep}
              className={`relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 text-[11px] sm:text-xs font-bold
                ${i < currentStep ? 'bg-primary/15 text-primary' : ''}
                ${i === currentStep ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}
                ${i > currentStep ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)]' : ''}
                ${i > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {i < currentStep ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} /> : s.id}
              {i === currentStep && (
                <span className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
              )}
            </button>
            {i < STEPS.length - 1 && (
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

      {/* Progress bar */}
      <div className="mb-6 overflow-hidden rounded-full bg-[var(--bg-secondary)] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Active step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {/* Label row */}
          <div className="flex items-baseline justify-between">
            <label className="text-base sm:text-lg font-bold text-[var(--text-heading)]">
              {step.label} <span className="text-red-500 text-xs">*</span>
            </label>
            <span className="text-[10px] font-bold text-[var(--text-muted)] tabular-nums uppercase tracking-wider">
              {currentStep + 1} / {STEPS.length}
            </span>
          </div>

          {/* Input */}
          {step.type === 'textarea' ? (
            <textarea
              rows={3}
              placeholder={step.placeholder}
              value={value}
              onChange={(e) => handleChange(step.field, e.target.value)}
              autoFocus
              className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base sm:text-sm text-[var(--text-heading)] resize-none ${
                fieldError ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
            />
          ) : step.type === 'select' ? (
            <div className="flex flex-col gap-2">
              {(step.field === 'qualification' ? QUALIFICATIONS : COURSES).map((opt, i) => {
                const isSelected = value === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    onClick={() => handleChange(step.field, opt.value)}
                    className={`group relative w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10'
                        : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-primary/40 hover:text-[var(--text-heading)]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-white scale-100'
                        : 'border border-[var(--border-color)] scale-90 opacity-0 group-hover:opacity-40'
                    }`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <input
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
              autoFocus
              className={`w-full px-4 py-3.5 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base sm:text-sm text-[var(--text-heading)] ${
                fieldError ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
            />
          )}

          {/* Error message */}
          <AnimatePresence>
            {fieldError && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] text-red-500 font-bold flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3 shrink-0" /> {fieldError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* API error */}
          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-xs font-bold">{errorMessage}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleNext}
          disabled={status === 'sending'}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting…</span>
            </>
          ) : currentStep === STEPS.length - 1 ? (
            <>
              <Send className="h-4 w-4" />
              <span>Submit</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="w-full text-center text-sm text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Go back
          </button>
        )}
      </div>

      {/* Privacy notice */}
      <p className="text-center text-[10px] text-[var(--text-muted)] font-medium mt-4">
        By submitting, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default ContactForm;
