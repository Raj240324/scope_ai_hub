import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Send, Loader2, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const ContactForm = ({ initialCourse = "General Inquiry" }) => {
  const form = useRef();
  const { closeModal } = useModal();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQualDropdownOpen, setIsQualDropdownOpen] = useState(false);

  const courses = [
    { value: "General Inquiry", label: "General Inquiry" },
    { value: "Full Stack Web Development (MERN Stack)", label: "Full Stack Development" },
    { value: "Data Science & Artificial Intelligence", label: "Data Science & AI" },
    { value: "UI/UX Design Strategy", label: "UI/UX Design" },
    { value: "Cyber Security & Ethical Hacking", label: "Cyber Security" },
    { value: "Cloud Computing & DevOps", label: "Cloud Computing" }
  ];

  const qualifications = [
    { value: "Student", label: "Student (Arts/Science/Engineering)" },
    { value: "Job Seeker", label: "Job Seeker / Fresher" },
    { value: "Working Professional", label: "Working Professional" },
    { value: "Business Owner", label: "Business Owner / Entrepreneur" },
    { value: "Other", label: "Other" }
  ];

  // Update selected course if initialCourse prop changes
  React.useEffect(() => {
    if (initialCourse) {
      setSelectedCourse(initialCourse);
    }
  }, [initialCourse]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.course-dropdown-container')) {
        setIsDropdownOpen(false);
      }
      if (isQualDropdownOpen && !event.target.closest('.qual-dropdown-container')) {
        setIsQualDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, isQualDropdownOpen]);

  const validateForm = () => {
    const errors = {};
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const phone = formData.get('user_phone');
    const location = formData.get('user_location');
    const message = formData.get('message');

    if (!name || name.trim().length < 2) {
      errors.user_name = 'Name must be at least 2 characters long';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.user_email = 'Please enter a valid email address';
    }

    // Remove non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone || digitsOnly.length < 10 || digitsOnly.length > 15) {
      errors.user_phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!location || location.trim().length < 2) {
      errors.user_location = 'Please enter your City/Area';
    }

    if (!selectedQualification) {
      errors.qualification = 'Please select your current status';
    }

    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('sending');

    // Note: User needs to replace these with their own EmailJS IDs
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceId === 'YOUR_SERVICE_ID') {
      // Simulate success for demo purposes
      setTimeout(() => {
        setStatus('success');
        form.current.reset();
        setFormErrors({});
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        setStatus('success');
        form.current.reset();
        setFormErrors({});
      }, (error) => {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again later.');
      });
  };

  if (status === 'success') {
    return (
      <div className="bg-accent-success/10 border border-accent-success/20 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-success/20 mb-6">
          <CheckCircle className="h-8 w-8 text-accent-success" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600 mb-6">Thank you for reaching out. Our counselor will get back to you within 24 hours.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setStatus('idle')}
            className="btn-primary"
          >
            Send Another Message
          </button>
          {closeModal && (
            <button 
              onClick={closeModal}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-1.5">
          <label htmlFor="user_name" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            placeholder="John Doe"
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm ${
              formErrors.user_name ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {formErrors.user_name && <p className="text-[10px] text-red-500 font-bold">{formErrors.user_name}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="user_email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="john@example.com"
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm ${
              formErrors.user_email ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {formErrors.user_email && <p className="text-[10px] text-red-500 font-bold">{formErrors.user_email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-1.5">
          <label htmlFor="user_phone" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="user_phone"
            id="user_phone"
            placeholder="+91 98765 43210"
            maxLength={15}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9+\s]/g, '');
            }}
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm ${
              formErrors.user_phone ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {formErrors.user_phone && <p className="text-[10px] text-red-500 font-bold">{formErrors.user_phone}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="user_location" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Location (City/Area) <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="user_location"
            id="user_location"
            placeholder="e.g. Maraimalai Nagar, Chennai"
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm ${
              formErrors.user_location ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {formErrors.user_location && <p className="text-[10px] text-red-500 font-bold">{formErrors.user_location}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-1.5 relative qual-dropdown-container">
          <label htmlFor="qualification" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Current Status <span className="text-red-500">*</span></label>
          <input type="hidden" name="qualification" value={selectedQualification} />
          <button
            type="button"
            onClick={() => setIsQualDropdownOpen(!isQualDropdownOpen)}
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm flex items-center justify-between group ${
              formErrors.qualification ? 'border-red-500' : 'border-slate-200'
            }`}
          >
            <span className={selectedQualification ? "text-slate-900" : "text-slate-400"}>
              {qualifications.find(q => q.value === selectedQualification)?.label || "Select status"}
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isQualDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {formErrors.qualification && <p className="text-[10px] text-red-500 font-bold">{formErrors.qualification}</p>}

          <AnimatePresence>
            {isQualDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-[110] left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="max-h-[200px] overflow-y-auto no-scrollbar py-1">
                  {qualifications.map((q) => (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => {
                        setSelectedQualification(q.value);
                        setIsQualDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                        selectedQualification === q.value 
                          ? 'bg-primary/5 text-primary font-bold' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{q.label}</span>
                      {selectedQualification === q.value && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="space-y-1.5 relative course-dropdown-container">
          <label htmlFor="course_interest" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Interested Course <span className="text-red-500">*</span></label>
          <input type="hidden" name="course_interest" value={selectedCourse} />
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm flex items-center justify-between group"
          >
            <span className={selectedCourse ? "text-slate-900" : "text-slate-400"}>
              {courses.find(c => c.value === selectedCourse)?.label || "Select a course"}
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-[110] left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="max-h-[200px] overflow-y-auto no-scrollbar py-1">
                  {courses.map((course) => (
                    <button
                      key={course.value}
                      type="button"
                      onClick={() => {
                        setSelectedCourse(course.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                        selectedCourse === course.value 
                          ? 'bg-primary/5 text-primary font-bold' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{course.label}</span>
                      {selectedCourse === course.value && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Your Message <span className="text-red-500">*</span></label>
        <textarea
          name="message"
          id="message"
          rows="3"
          placeholder="How can we help you?"
          className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none ${
            formErrors.message ? 'border-red-500' : 'border-slate-200'
          }`}
        ></textarea>
        {formErrors.message && <p className="text-[10px] text-red-500 font-bold">{formErrors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-[10px] font-bold">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary/20 ${
          status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </>
        )}
      </button>
      
      <p className="text-center text-[10px] text-slate-400 font-medium">
        By submitting, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default ContactForm;
