import React, { useRef, useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Send, Loader2, AlertCircle, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { handleApiError, normalizeError } from '../../utils/apiErrorHandler';
import { BRANDING } from '../../data/branding';

/* ─── Step Definitions ──────────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: 'Full Name', field: 'trainer_name', placeholder: 'Your full name', type: 'text' },
  { id: 2, label: 'Email', field: 'trainer_email', placeholder: 'expert@example.com', type: 'email' },
  { id: 3, label: 'Phone', field: 'trainer_phone', placeholder: '98765 43210', type: 'tel' },
  { id: 4, label: 'Experience', field: 'experience', placeholder: 'Years of experience (e.g. 5)', type: 'number' },
  { id: 5, label: 'Expertise', field: 'expertise', placeholder: 'Select your primary expertise', type: 'select' },
  { id: 6, label: 'LinkedIn', field: 'linkedin_url', placeholder: 'linkedin.com/in/username', type: 'url', optional: true },
];

const EXPERTISE_OPTIONS = [
  { value: 'Generative AI & Prompt Engineering', label: 'Generative AI & Prompt Engineering' },
  { value: 'Python & Machine Learning', label: 'Python & Machine Learning' },
  { value: 'Data Analytics & AI', label: 'Data Analytics & AI' },
  { value: 'Deep Learning & Neural Networks', label: 'Deep Learning & Neural Networks' },
  { value: 'NLP & LLMs', label: 'NLP & Large Language Models' },
  { value: 'Computer Vision', label: 'Computer Vision & Image AI' },
  { value: 'MLOps & Cloud AI', label: 'MLOps & Cloud AI' },
  { value: 'AI Ethics & Governance', label: 'AI Ethics & Governance' },
  { value: 'Other', label: 'Other Technical Domain' },
];

/* ─── Main Component ─────────────────────────────────────────────── */

const TrainerForm = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const { closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formLoadedAt] = useState(Date.now());

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const value = formData[step.field] || '';

  /* ── Validation per step ─────────────────────────────────── */
  const validateCurrent = () => {
    const v = (formData[step.field] || '').trim();

    if (step.field === 'trainer_name') {
      if (v.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s]+$/.test(v)) return 'Name should only contain letters';
    }
    if (step.field === 'trainer_email') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) return 'Enter a valid email address';
    }
    if (step.field === 'trainer_phone') {
      const digits = v.replace(/\D/g, '');
      if (digits.length !== 10) return 'Phone must be exactly 10 digits';
    }
    if (step.field === 'experience') {
      if (!v) return 'Years of experience is required';
      if (parseInt(v) > 50) return 'Experience cannot exceed 50 years';
    }
    if (step.field === 'expertise') {
      if (!v) return 'Please select your expertise';
    }
    if (step.field === 'linkedin_url') {
      // Optional — skip validation if empty
      if (v && !v.includes('linkedin.com')) return 'Please provide a valid LinkedIn URL';
    }
    return '';
  };

  const handleNext = () => {
    const err = validateCurrent();
    if (err) { setFieldError(err); return; }

    // Prevent submission before 3 seconds
    if (currentStep === STEPS.length - 1 && Date.now() - formLoadedAt < 3000) {
      setFieldError('Please take a moment to review your entry.');
      return;
    }

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

  /* ── Secure Submit Pipeline ─────────────────────────────── */
  const handleSubmit = async () => {
    setStatus('sending');
    setErrorMessage('');

    try {
      // Step 1: Honeypot
      if (honeypot) {
        await new Promise((r) => setTimeout(r, 1500));
        setStatus('success');
        return;
      }

      // Step 2: Check reCAPTCHA v2 token
      if (!captchaToken) {
        setStatus('error');
        setErrorMessage('Please complete the reCAPTCHA.');
        return;
      }

      // Step 3: Submit to secure serverless function
      const response = await fetch('/api/send-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainer_name: formData.trainer_name,
          trainer_email: formData.trainer_email,
          trainer_phone: formData.trainer_phone,
          experience: formData.experience,
          expertise: formData.expertise,
          linkedin_url: formData.linkedin_url || null,
          recaptchaToken: captchaToken,
          formLoadedAt,
        }),
      });

      if (!response.ok) {
        const message = await handleApiError(response);
        setStatus('error');
        setErrorMessage(message);
        setCaptchaToken(null);
        if (recaptchaRef.current) recaptchaRef.current.reset();
        return;
      }

      setStatus('success');
    } catch (e) {
      setStatus('error');
      setErrorMessage(normalizeError(e));
      setCaptchaToken(null);
      if (recaptchaRef.current) recaptchaRef.current.reset();
    }
  };

  /* ── Success State ───────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-8 animate-in fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="heading-sm font-bold text-[var(--text-heading)]">Application Received!</h2>
          <p className="text-small text-[var(--text-muted)]">Our academic team will review your profile and contact you for a technical discussion.</p>
        </div>
        <button
          onClick={closeModal}
          className="btn-secondary text-small px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
        >
          Close
        </button>
      </div>
    );
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div ref={form}>
      {/* Honeypot — invisible to humans */}
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
      {/* Step indicators */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => i < currentStep && (setFieldError(''), setCurrentStep(i))}
              disabled={i > currentStep}
              className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 text-caption font-bold
                ${i < currentStep ? 'bg-primary/15 text-primary' : ''}
                ${i === currentStep ? 'bg-primary text-[var(--text-on-inverted)] shadow-lg shadow-primary/30' : ''}
                ${i > currentStep ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)]' : ''}
                ${i > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {i < currentStep ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.id}
              {i === currentStep && (
                <span className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
              )}
            </button>
            {i < STEPS.length - 1 && (
              <div className="relative h-[1.5px] w-4 sm:w-6">
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
            <label className="text-body sm:text-lg font-bold text-[var(--text-heading)]">
              {step.label} {!step.optional && <span className="text-red-500 text-caption">*</span>}
              {step.optional && <span className="text-[var(--text-muted)] text-caption font-normal ml-1">(Optional)</span>}
            </label>
            <span className="text-caption font-bold text-[var(--text-muted)] tabular-nums uppercase tracking-wider">
              {currentStep + 1} / {STEPS.length}
            </span>
          </div>

          {/* Input — select as pill chips */}
          {step.type === 'select' ? (
            <div className="flex flex-col gap-2">
              {EXPERTISE_OPTIONS.map((opt, i) => {
                const isSelected = value === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
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
                  </motion.button>
                );
              })}
            </div>
          ) : step.type === 'url' ? (
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder={step.placeholder}
                value={value}
                onChange={(e) => handleChange(step.field, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                autoFocus
                className={`w-full pl-11 pr-4 py-3.5 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-all text-small text-[var(--text-heading)] ${
                  fieldError ? 'border-red-500' : 'border-[var(--border-color)]'
                }`}
              />
            </div>
          ) : (
            <input
              type={step.type}
              placeholder={step.placeholder}
              value={value}
              onChange={(e) => {
                let v = e.target.value;
                if (step.field === 'trainer_name') v = v.replace(/[^a-zA-Z\s]/g, '');
                if (step.field === 'trainer_phone') v = v.replace(/\D/g, '').slice(0, 10);
                if (step.field === 'experience') v = v.replace(/\D/g, '').slice(0, 2);
                handleChange(step.field, v);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              autoFocus
              className={`w-full px-4 py-3.5 bg-[var(--bg-secondary)] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-all text-small text-[var(--text-heading)] ${
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
                className="text-caption text-red-500 font-bold flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3 shrink-0" /> {fieldError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* API error */}
          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-caption font-bold">{errorMessage}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        {currentStep === STEPS.length - 1 && (
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setCaptchaToken(token);
                if (status === 'error') setStatus('idle');
              }}
            />
          </div>
        )}
        <button
          onClick={handleNext}
          disabled={status === 'sending'}
          className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting…</span>
            </>
          ) : currentStep === STEPS.length - 1 ? (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Application</span>
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
            className="w-full text-center text-small text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Go back
          </button>
        )}
      </div>

      {/* Notice */}
      <p className="text-center text-caption text-[var(--text-muted)] font-medium mt-4">
        By applying, you agree to our <a href="/legal/trainer-conduct" className="text-primary hover:underline">Trainer Code of Conduct</a>.
      </p>
    </div>
  );
};

export default TrainerForm;
