import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-color)] last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left group">
        <span className="heading-sm font-semibold text-[var(--text-heading)] group-hover:text-primary transition-colors pr-4">{question}</span>
        <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center transition-all ${isOpen ? 'bg-[var(--bg-inverted)] border-[var(--text-heading)] text-[var(--text-on-inverted)] rotate-180' : 'text-[var(--text-muted)]'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-body">{answer}</p>
      </div>
    </div>
  );
};

const faqs = [
  { q: "Do you provide placement support?", a: "We provide an intensive career-ready ecosystem. This includes technical grooming, resume building, and mock interviews, while connecting you with our 75+ hiring partners to help you secure the right role." },
  { q: "Are your trainers industry experts?", a: "Absolutely! All our mentors are industry veterans with 8+ years of experience in top tech companies like Zoho, Freshworks, and MNCs." },
  { q: "Is the curriculum updated for 2026 standards?", a: "Yes, our syllabus is regularly updated and aligned with current industrial requirements to ensure you learn the most in-demand technologies." },
  { q: "Do you offer multilingual support for local students?", a: "Yes, we explain complex technical concepts in Tamil, Telugu, and English to ensure every student understands the fundamentals clearly." },
  { q: "Is the certification officially recognized?", a: `Yes, you will receive an official certification from ${BRANDING.fullName} upon successful completion of your projects. This certificate is recognized by our extensive network of hiring partners as a mark of technical proficiency.` },
  { q: "Is my project data and idea protected?", a: "Absolutely. We maintain a strict NDA (Non-Disclosure Agreement) policy. All our trainers and staff are legally bound to protect student project data and intellectual property." },
];

const FAQSection = () => (
  <section className="section-padding bg-[var(--bg-body)]">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-6">Got Questions? <br /> We Have <span className="font-extrabold text-primary">Answers</span>.</h2>
          <p className="text-[var(--text-muted)] text-body-lg mb-8 leading-relaxed">
            If you have any other questions, feel free to reach out to our team. We're happy to help you choose the right path for your career.
          </p>
          <Link to="/faq" className="btn-secondary inline-flex items-center">
            View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
