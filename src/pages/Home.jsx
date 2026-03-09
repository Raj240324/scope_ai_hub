import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Users, Award, CheckCircle2, PlayCircle,
  Code2, Cpu, ShieldCheck, Smartphone, Figma, Search, Star, Zap,
  Briefcase, GraduationCap, Building2, Plus, Minus, MessageSquare,
  Globe, Download, Rocket, MapPin
} from 'lucide-react';
import { StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Marquee, Parallax } from '../components/utils/Animations';
import Layout from '../components/layout/Layout';
import HeroScrollCanvas from '../components/HeroScrollCanvas';
import CourseCard from '../components/ui/CourseCard';
import DesignTestimonial from '../components/ui/DesignTestimonial';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';
import SEO from '../components/utils/SEO';

// Section components
import StatsSection from '../components/home/StatsSection';
import HiringPartners from '../components/home/HiringPartners';
import MethodologySection from '../components/home/MethodologySection';
import CoursesSection from '../components/home/CoursesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import CareerSupportSection from '../components/home/CareerSupportSection';

const learningPartners = [
  { name: "NASSCOM", logo: "/nasscom-logo.webp" },
  { name: "ISO Certified", logo: "/ISO.webp" },
  { name: "FutureSkills", logo: "/future-skills.webp" },
  { name: "MSME", logo: "/msme-logo.webp" }
];

const Home = () => {
  const { openModal } = useModal();
  const flagshipCourses = courses.slice(0, 6);

  return (
    <Layout immersive={true}>
      <SEO
        title="AI Training Institute in Chennai with Placement"
        description="Master Generative AI, Machine Learning, NLP, Computer Vision, and more with expert mentorship. Scope AI Hub offers practical AI training in Chennai with placement support."
        keywords="AI Training Institute Chennai, Prompt Engineering Course, Machine Learning Training, NLP Course, Data Analytics, MLOps, Computer Vision, Python AI, Placement Support"
        canonical="/"
      />
      <HeroScrollCanvas
        badge="Built for the AI Era"
        subtitle="Advanced AI and Cloud programs engineered to create fearless innovators ready to compete on a global stage."
      >
        <Link to="/courses" className="hero-btn-primary">
          Explore Courses
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "4px" }}>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <button
          onClick={() => openModal()}
          className="hero-btn-ghost"
          aria-label="Book Free Demo"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ marginRight: "6px" }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5.5 5l3 2-3 2V5z" fill="currentColor" />
          </svg>
          Book Free Demo
        </button>
      </HeroScrollCanvas>

      <StatsSection />
      <HiringPartners />
      <CoursesSection courses={flagshipCourses} />
      <MethodologySection openModal={openModal} />
      <TestimonialsSection />
      <CareerSupportSection />

      {/* Certifications & Recognitions */}
      <section className="py-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <p className="text-center text-caption font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-8">Recognized &amp; Certified By</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {learningPartners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="h-20 w-36 md:h-24 md:w-44 flex items-center justify-center transition-all">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      width={176}
                      height={80}
                      loading="lazy"
                      className="max-h-16 md:max-h-20 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="heading-sm font-black text-[var(--text-muted)] group-hover:text-[var(--text-heading)] transition-colors">{partner.name}</span>
                  )}
                </div>
                <span className="text-caption font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection limit={4} />
      <CTASection openModal={openModal} />

      {/* Final CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="dark-section rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-white shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
              <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-lg font-bold text-white mb-6">Ready to Build Your <span className="text-primary">Future</span>?</h2>
              <p className="text-body text-white/80 mb-10">
                Join our next batch and learn from industry experts who are passionate about teaching.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <button
                  onClick={() => openModal()}
                  className="btn-primary px-10 py-4 text-small font-semibold shadow-xl"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
                <Link
                  to="/contact"
                  className="btn-secondary px-10 py-4 text-small font-semibold text-white border-white/20"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
