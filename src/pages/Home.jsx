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
import HeroScroll from '../components/sections/HeroScroll';
import CourseCard from '../components/ui/CourseCard';
import DesignTestimonial from '../components/ui/DesignTestimonial';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';
import SEO from '../components/utils/SEO';
import { StackingCards } from '../components/utils/StackingCards';
import { ServiceGrid } from '../components/ui/ServiceGrid';

// Section components
import StatsSection from '../components/home/StatsSection';
import HiringPartners from '../components/home/HiringPartners';
import MethodologySection from '../components/home/MethodologySection';
import CoursesSection from '../components/home/CoursesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PlacementSection from '../components/home/PlacementSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import CorporateSection from '../components/home/CorporateSection';
import GlobalReachSection from '../components/home/GlobalReachSection';
import TrainerSpotlight from '../components/home/TrainerSpotlight';
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
      <HeroScroll
        badge={
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-light" />
            <span className="text-primary-light">Built for the AI Era.</span>
          </div>
        }
        title={
          <>
            <span className="whitespace-nowrap">Dominate with Intelligence.</span> <br className="hidden sm:block" />
            <span className="text-white relative inline-block">
              Lead Without Limits.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.49994 132.5 -3.50004 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>
          </>
        }
        subtitle="Advanced AI and Cloud programs engineered to create fearless innovators ready to compete on a global stage."
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/courses"
            className="group relative px-8 py-4 bg-primary text-white rounded-full flex items-center justify-center font-bold text-body shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              Explore Courses <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <button
            onClick={() => openModal()}
            className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 hover:border-primary/50 rounded-full flex items-center justify-center font-bold text-body hover:bg-white/10 transition-all duration-300 group"
            aria-label="Book Free Demo"
          >
            <PlayCircle className="mr-2 h-5 w-5 opacity-70 group-hover:opacity-100 text-primary-light transition-all" />
            Book Free Demo
          </button>
        </div>
      </HeroScroll>

      <StatsSection />
      <HiringPartners />
      <CoursesSection courses={flagshipCourses} />
      <MethodologySection openModal={openModal} />
      <TestimonialsSection />
      <CareerSupportSection />
      <PlacementSection openModal={openModal} />

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

      <TrainerSpotlight openModal={openModal} />

      <ServiceGrid
        className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative"
        title={<>Why <span className="text-primary">AI & Software Skills</span> Are the Future</>}
        subtitle="The technology sector is experiencing unprecedented growth. Here's why 2026 is the perfect time to start your journey."
        services={[
          { name: "Generative AI", demand: "Critical", imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "Prompt Engineering", demand: "Very High", imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "Python for AI", demand: "Critical", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "Machine Learning", demand: "Very High", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "Data Analytics", demand: "High", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "NLP & LLMs", demand: "Very High", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "Computer Vision", demand: "High", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "MLOps", demand: "Very High", imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "AI Ethics", demand: "Growing", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=300&h=300" },
          { name: "AI in Marketing", demand: "Emerging", imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=300&h=300" }
        ]}
      />

      <GlobalReachSection />
      <CorporateSection openModal={openModal} />
      <FAQSection />
      <CTASection openModal={openModal} />

      {/* Final CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-[var(--text-on-inverted)] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
              <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-md md:text-3xl lg:heading-hero">Ready to Build Your <span className="text-primary">Future</span>?</h2>
              <p className="text-body md:text-lg text-[var(--text-on-inverted)]/80 mb-10">
                Join our next batch and learn from industry experts who are passionate about teaching.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <button
                  onClick={() => openModal()}
                  className="bg-primary text-white hover:opacity-90 px-10 py-4 rounded-full text-body-lg font-black transition-all shadow-xl shadow-primary/20"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
                <Link
                  to="/contact"
                  className="bg-primary/10 backdrop-blur-md border border-primary/30 text-[var(--text-on-inverted)] hover:bg-primary/20 px-10 py-4 rounded-full text-body-lg font-black transition-all"
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
