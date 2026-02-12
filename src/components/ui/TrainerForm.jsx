import React, { useRef, useState } from 'react';
import { CheckCircle, Send, Loader2, AlertCircle, ChevronDown, Check, Briefcase, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';

const TrainerForm = () => {
  const form = useRef();
  const { closeModal } = useModal();
  const [status, setStatus] = useState('idle');
  const [formErrors, setFormErrors] = useState({});
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [isExpertiseDropdownOpen, setIsExpertiseDropdownOpen] = useState(false);

  const expertiseOptions = [
    { value: "Full Stack Development", label: "Full Stack Development" },
    { value: "MERN Stack", label: "MERN Stack Specialist" },
    { value: "Data Science & AI", label: "Data Science & AI" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Cloud & DevOps", label: "Cloud & DevOps" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Other", label: "Other Technical Domain" }
  ];

  const validateForm = () => {
    const errors = {};
    const formData = new FormData(form.current);
    const name = formData.get('trainer_name');
    const email = formData.get('trainer_email');
    const phone = formData.get('trainer_phone');
    const Experience = formData.get('experience');
    const linkedin = formData.get('linkedin_url');

    // Strict Name Validation
    if (!name || name.trim().length < 2) {
      errors.trainer_name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.trainer_name = 'Name should only contain letters and spaces';
    }

    // Official Email Validation
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.trainer_email = 'Valid official email required';
    }

    // Strict Phone Validation (10 digits)
    if (!phone || phone.replace(/\D/g, '').length !== 10) {
      errors.trainer_phone = 'Phone number must be exactly 10 digits';
    }

    if (!selectedExpertise) errors.expertise = 'Please select your expertise';
    if (!Experience) {
      errors.experience = 'Years of experience is required';
    } else if (parseInt(Experience) > 50) {
      errors.experience = 'Experience cannot exceed 50 years';
    }
    if (linkedin && !linkedin.includes('linkedin.com')) errors.linkedin_url = 'Please provide a valid LinkedIn URL';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-6">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Application Received!</h3>
        <p className="text-[var(--text-muted)] mb-6 font-medium">Thank you for your interest in joining {BRANDING.fullName}. Our academic team will review your profile and contact you for a technical discussion.</p>
        <button 
          onClick={closeModal}
          className="px-8 py-3 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] font-bold rounded-xl hover:opacity-90 transition-all"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={handleApply} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Full Name (Letters Only)</label>
          <input
            name="trainer_name"
            placeholder="Expert Name"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            }}
            className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[var(--text-heading)] ${formErrors.trainer_name ? 'border-red-500' : 'border-[var(--border-color)]'}`}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Email Address</label>
          <input
            name="trainer_email"
            type="email"
            placeholder="expert@example.com"
            className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[var(--text-heading)] ${formErrors.trainer_email ? 'border-red-500' : 'border-[var(--border-color)]'}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Phone Number (10 Digits Only)</label>
          <input
            name="trainer_phone"
            placeholder="6383980415"
            maxLength={10}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
            }}
            className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[var(--text-heading)] ${formErrors.trainer_phone ? 'border-red-500' : 'border-[var(--border-color)]'}`}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Years of Exp. (Numbers Only)</label>
          <input
            name="experience"
            type="text"
            placeholder="e.g. 5"
            maxLength={2}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
            }}
            className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[var(--text-heading)] ${formErrors.experience ? 'border-red-500' : 'border-[var(--border-color)]'}`}
          />
        </div>
      </div>

      <div className="space-y-1.5 relative">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Expertise</label>
        <button
          type="button"
          onClick={() => setIsExpertiseDropdownOpen(!isExpertiseDropdownOpen)}
          className={`w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl flex items-center justify-between text-sm transition-all ${formErrors.expertise ? 'border-red-500' : 'border-[var(--border-color)]'}`}
        >
          <span className={selectedExpertise ? "text-[var(--text-heading)]" : "text-[var(--text-muted)]"}>
            {selectedExpertise || "Select Expertise"}
          </span>
          <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${isExpertiseDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isExpertiseDropdownOpen && (
            <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="absolute z-20 left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
              {expertiseOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setSelectedExpertise(opt.value); setIsExpertiseDropdownOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/5 transition-colors flex items-center justify-between"
                >
                  {opt.label}
                  {selectedExpertise === opt.value && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">LinkedIn Profile (Optional)</label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            name="linkedin_url"
            placeholder="linkedin.com/in/username"
            className={`w-full pl-11 pr-4 py-3 bg-[var(--bg-secondary)] border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[var(--text-heading)] ${formErrors.linkedin_url ? 'border-red-500' : 'border-[var(--border-color)]'}`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[var(--bg-inverted)] hover:opacity-90 text-[var(--text-on-inverted)] font-black py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-[0.98]"
      >
        {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        <span>SUBMIT APPLICATION</span>
      </button>

      <p className="text-center text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">
        By applying, you agree to our <a href="/legal/trainer-conduct" className="text-primary underline">Trainer Code of Conduct</a>.
      </p>
    </form>
  );
};

export default TrainerForm;
