import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Marquee, Parallax } from '../components/utils/Animations';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  PlayCircle,
  Code2,
  Cpu,
  ShieldCheck,
  Smartphone,
  Figma,
  Search,
  Star,
  Zap,
  Briefcase,
  GraduationCap,
  Building2,
  Plus,
  Minus,
  MessageSquare,
  Globe,
  Download,
  Rocket,
  MapPin
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import CourseCard from '../components/ui/CourseCard';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-color)] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base md:text-lg font-bold text-[var(--text-heading)] group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center transition-all ${isOpen ? 'bg-[var(--bg-inverted)] border-[var(--text-heading)] text-[var(--text-on-inverted)] rotate-180' : 'text-[var(--text-muted)]'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-[var(--text-muted)] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const learningPartners = [
    { name: "NASSCOM", logo: "/nasscom-logo.webp" },
    { name: "ISO Certified", logo: "/ISO.webp" },
    { name: "FutureSkills", logo: "/future-skills.webp" },
    { name: "MSME", logo: "/msme-logo.webp" }
  ];

  const Home = () => {
  const { openModal } = useModal();
  // Flagship courses for the home page
  const flagshipCourses = courses.slice(0, 6);

  const stats = [
    { label: "Practical Projects", value: "50+", icon: <Users className="h-5 w-5" /> },
    { label: "Instructor Experience", value: "15+ Years", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Curriculum Rating", value: "4.9/5", icon: <Star className="h-5 w-5" /> },
    { label: "Hiring Partners", value: "100+", icon: <Building2 className="h-5 w-5" /> },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#4285F4" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", color: "#FF9900" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", color: "#737373" },
    { name: "Zoho", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Zoho-logo.svg", color: "#1F4591" },
    { name: "Freshworks", logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Freshworks-vector-logo.svg", color: "#00EEBD" },
    { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", color: "#004B8D" },
    { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", color: "#007CC3" },
    { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg", color: "#000000" }
  ];

  const trustFactors = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "NASSCOM Certification",
      description: `Get a valid course completion certificate from ${BRANDING.fullName} to validate your skills to employers.`,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-500/10"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Bilingual Instruction",
      description: "Complex concepts explained in both Tamil and English for better understanding and faster learning.",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert-Led Mentorship",
      description: "Learn directly from industry veterans with 10+ years of experience in top-tier tech companies.",
      iconColor: "text-sky-500",
      iconBg: "bg-sky-50 dark:bg-sky-500/10"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Dedicated Lab Support",
      desc: "Our high-tech labs are open 12 hours a day. Get hands-on practice with mentors always available to clear your doubts.",
      icon: <Cpu className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      step: "02",
      title: "Real-time Training",
      desc: "Learn through industrial projects and case studies. We bridge the gap between academic theory and corporate reality.",
      icon: <Code2 className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      step: "03",
      title: "1:1 Expert Mentorship",
      desc: "Get personalized guidance from industry veterans who have worked in top MNCs like Zoho, TCS, and Amazon.",
      icon: <Users className="h-6 w-6" />,
      color: "bg-orange-500"
    },
    {
      step: "04",
      title: "Placement Guidance to Get Hired",
      desc: "We guide you for placement through intense interview grooming, resume building, and mock sessions until you are fully ready to get your dream job.",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-green-500"
    }
  ];

  const testimonials = [
    {
      name: "Senthil Kumar",
      role: "Full Stack Developer @ Zoho",
      content: "I came from a non-IT background and was really worried. But the trainers here explained everything in simple Tamil and English. The mock interviews really helped me crack the Zoho interview.",
      image: "https://i.pravatar.cc/150?u=senthil"
    },
    {
      name: "Priya Dharshini",
      role: "UI/UX Designer @ Freshworks",
      content: `Best place to learn in Chennai. They helped me build a proper portfolio, which is exactly what companies asked for. Thank you ${BRANDING.fullName} sir!`,
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      name: "Arun Rajan",
      role: "DevOps Engineer @ Accenture",
      content: "Practical training is the key. We worked on live AWS servers, not just theory. That experience made all the difference during my placements.",
      image: "https://i.pravatar.cc/150?u=arun"
    }
  ];

  const faqs = [
    {
      q: "Do you provide placement support?",
      a: "We provide an intensive career-ready ecosystem. This includes technical grooming, resume building, and mock interviews, while connecting you with our 500+ hiring partners to help you secure the right role."
    },
    {
      q: "Are your trainers industry experts?",
      a: "Absolutely! All our mentors are industry veterans with 10+ years of experience in top tech companies like Zoho, Freshworks, and MNCs."
    },
    {
      q: "Is the curriculum updated for 2026 standards?",
      a: "Yes, our syllabus is regularly updated and aligned with current industrial requirements to ensure you learn the most in-demand technologies."
    },
    {
      q: "Do you offer bilingual support for local students?",
      a: "Yes, we explain complex technical concepts in both Tamil and English to ensure every student understands the fundamentals clearly."
    },
    {
      q: "Is the certification officially recognized?",
      a: `Yes, you will receive an official certification from ${BRANDING.fullName} upon successful completion of your projects. This certificate is recognized by our extensive network of hiring partners as a mark of technical proficiency.`
    },
    {
      q: "Is my project data and idea protected?",
      a: "Absolutely. We maintain a strict NDA (Non-Disclosure Agreement) policy. All our trainers and staff are legally bound to protect student project data and intellectual property."
    }
  ];

  return (
    <Layout immersive={true}>
      <Hero
        variant="home"
        badge={
          <>
            <ShieldCheck className="h-3 w-3" />
            <span>No.1 Software Training & Placement Institute in Chennai</span>
          </>
        }
        title={
          <>
            Best Software Training Institute in <span className="text-primary">Chennai</span> with Expert Career Guidance.
          </>
        }
        subtitle="Practical, hands-on software training in Chennai. We guide you through every step of your placement journey to help you secure your first job in the tech industry."
        rightContent={
          <FadeIn 
            direction="left"
            delay={0.2}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students learning software development at Scope AI Hub institute in Chennai" 
                className="w-full h-auto"
                loading="eager"
                width="800"
                height="534"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-body)]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Live Interactive Sessions</span>
                </div>
                <p className="text-sm font-medium opacity-90">New batches starting every month — join now!</p>
              </div>
            </div>
            
            {/* Floating Cards — positioned inside the padding zone */}
            <Parallax offset={-20} className="absolute -top-4 -right-4 z-20 hidden sm:block">
              <div className="bg-[var(--bg-card)] p-3 rounded-2xl shadow-xl border border-[var(--border-color)]">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">ISO Certified</p>
                    <p className="text-sm font-black text-[var(--text-heading)]">Institute</p>
                  </div>
                </div>
              </div>
            </Parallax>
            
            <Parallax offset={30} className="absolute -bottom-4 -left-4 z-20 hidden sm:block">
              <div className="bg-[var(--bg-card)] p-4 rounded-2xl shadow-xl border border-[var(--border-color)]">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2.5 rounded-xl">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[var(--text-heading)] leading-none">100%</p>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mt-1">Practical Focus</p>
                  </div>
                </div>
              </div>
            </Parallax>
          </FadeIn>
        }
      >
        {/* CTA Buttons — 2 primary actions, clean layout */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/courses" className="btn-primary px-8 py-4 flex items-center justify-center font-bold text-base">
            Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <button 
            onClick={() => openModal()}
            className="btn-secondary px-8 py-4 flex items-center justify-center font-bold text-base"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Book Free Demo
          </button>
        </div>
        
        {/* Social Proof Strip */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                className="inline-block h-11 w-11 rounded-full ring-4 ring-[var(--bg-body)] object-cover" 
                src={`https://i.pravatar.cc/100?u=student${i}`} 
                alt={`Student ${i} testimonial`}
                loading="lazy" 
              />
            ))}
            <div className="flex items-center justify-center h-11 w-11 rounded-full bg-primary/10 ring-4 ring-[var(--bg-body)] text-xs font-bold text-primary">
              +1k
            </div>
          </div>
          <div>
            <div className="flex items-center text-yellow-400 mb-1">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium">
              Rated <span className="text-[var(--text-heading)] font-bold">4.9/5</span> by our alumni
            </p>
          </div>
        </div>
      </Hero>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/5 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black mb-1 text-[var(--text-heading)]">
                  {/* If value starts with a number, try to count it, otherwise just show it */}
                  {/^\d/.test(stat.value) ? <ScrollCountUp end={stat.value} /> : stat.value}
                </div>
                <div className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications & Recognitions */}
      <section className="py-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <p className="text-center text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-8">Recognized &amp; Certified By</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {learningPartners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="h-20 w-36 md:h-24 md:w-44 flex items-center justify-center transition-all">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-16 md:max-h-20 object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <span className="text-xl font-black text-[var(--text-muted)] group-hover:text-[var(--text-heading)] transition-colors">{partner.name}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Industry Insights Section */}
      <section className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden border-b border-[var(--border-color)]">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Rocket className="h-3 w-3" />
              <span>Industry Insights 2026</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight text-[var(--text-heading)]">
              Why <span className="text-primary">AI & Software Skills</span> Are the Future
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
              The technology sector is experiencing unprecedented growth. Here's why 2026 is the perfect time to start your journey.
            </p>
          </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { skill: "Generative AI", demand: "Critical" },
                { skill: "React/Node.js", demand: "Very High" },
                { skill: "Python/ML", demand: "Critical" },
                { skill: "Cloud (AWS/Azure)", demand: "Very High" },
                { skill: "Data Science", demand: "High" },
                { skill: "Cyber Security", demand: "High" },
                { skill: "UI/UX Design", demand: "Growing" },
                { skill: "DevOps", demand: "Very High" },
                { skill: "Mobile Dev", demand: "High" },
                { skill: "Blockchain", demand: "Emerging" }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all text-center group cursor-default">
                  <div className="font-bold text-[var(--text-heading)] mb-1 group-hover:text-primary transition-colors">{item.skill}</div>
                  <div className={`text-xs font-black uppercase tracking-wider ${
                    item.demand === 'Critical' ? 'text-red-500' :
                    item.demand === 'Very High' ? 'text-orange-500' :
                    item.demand === 'High' ? 'text-yellow-500' :
                    item.demand === 'Growing' ? 'text-green-500' :
                    'text-blue-500'
                  }`}>
                    {item.demand}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* Learning Methodology Section */}
      <section className="py-24 bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
        {/* Decorative Background */}
        <Parallax offset={20} className="absolute top-0 right-0 w-1/2 h-full z-0">
            <div className="w-full h-full bg-[var(--bg-secondary)]/50 -skew-x-12 translate-x-1/2" />
        </Parallax>
        <Parallax offset={-30} className="absolute bottom-0 left-0 w-64 h-64 z-0">
            <div className="w-full h-full bg-primary/10 rounded-full blur-[120px]" />
        </Parallax>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
              The {BRANDING.fullName} Advantage
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-6 leading-tight">
              Why We’re the <span className="text-primary">Best Choice</span> for Your IT Career.
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              Our unique learning ecosystem is designed to provide you with the edge you need. From dedicated lab support to real-time industrial training, we ensure you're ready for the global tech stage.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((item, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] relative z-10 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                      {item.icon}
                    </div>
                    <span className="text-2xl sm:text-4xl font-black text-[var(--text-muted)] opacity-20 group-hover:opacity-40 transition-opacity">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-16 pt-16 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--bg-card)] overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=mentor${i}`} alt="Mentor" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[var(--text-heading)] font-bold">1:1 Mentorship Available</p>
                <p className="text-[var(--text-muted)] text-sm">Personal guidance from industry experts</p>
              </div>
            </div>
            <button 
              onClick={() => openModal()}
              className="btn-primary px-10 py-4 shadow-xl shadow-primary/20"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </section>

      {/* Flagship Courses */}

      <section id="trending-courses" className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="heading-md mb-4 text-[var(--text-heading)]">Top Trending Courses</h2>
              <p className="text-[var(--text-muted)] text-base md:text-lg">
                Choose from our high-demand courses designed to make you industry-ready.
              </p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center text-primary font-bold hover:underline mt-4 md:mt-0 group">
              View all courses <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flagshipCourses.map((course, index) => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/courses" className="btn-secondary w-full py-4 text-lg">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Trainer Spotlight Section */}
      <section className="section-padding bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                Learn from the Best
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-6 leading-tight">
                Our Mentors Come from <span className="text-primary">Global Tech Leaders</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
                At {BRANDING.fullName}, you aren't taught by academics. You are mentored by engineers who have built the tools you use every day.
              </p>
            </div>
            <div 
              onClick={() => openModal('Trainer Application', 'trainer')}
              className="group flex flex-col items-center lg:items-end text-center lg:text-right cursor-pointer"
            >
              <div className="flex -space-x-4 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--bg-body)] overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=trainer${i}`} alt="Trainer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[var(--bg-body)] bg-[var(--bg-inverted)] flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-[var(--text-on-inverted)]">+10</span>
                </div>
              </div>
              <div className="flex items-center text-primary font-black uppercase tracking-widest text-sm hover:underline">
                Join our teaching faculty <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "S. Raj",
                role: "Senior Architect & MERN Expert",
                company: "Ex-Silicon Valley Architect",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
                expertise: ["System Design", "Cloud Architecture"]
              },
              {
                name: "Dr. Anitha M.",
                role: "Lead Data Scientist",
                company: "Ph.D. in Machine Learning",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
                expertise: ["Predictive Analytics", "Deep Learning"]
              },
              {
                name: "Vikram Singh",
                role: "Head of Tech Recruitment",
                company: "10+ Years in Tech HR",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
                expertise: ["Interview Grooming", "Career Strategy"]
              }
            ].map((mentor, index) => (
              <ScaleOnHover key={index}>
                <div className="bg-[var(--bg-card)] p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-5 sm:mb-6">
                    <img src={mentor.image} alt={mentor.name} className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl object-cover shadow-md" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] leading-tight">{mentor.name}</h3>
                      <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">{mentor.role}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[var(--text-muted)] mb-4">{mentor.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-wider rounded-lg border border-[var(--border-color)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScaleOnHover>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Trust Factors */}
      <section className="section-padding bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="heading-md mb-4 text-[var(--text-heading)]">Why Choose {BRANDING.fullName}?</h2>
            <p className="text-[var(--text-muted)] text-base md:text-lg">
              We don't just teach code; we build careers through a comprehensive learning ecosystem.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFactors.map((factor, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="bg-[var(--bg-secondary)] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border-color)] hover:border-primary/20 hover:shadow-xl transition-all group h-full flex flex-col">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${factor.iconBg} shadow-sm flex items-center justify-center mb-5 sm:mb-6 ${factor.iconColor} group-hover:bg-[var(--bg-inverted)] group-hover:text-[var(--text-on-inverted)] transition-colors`}>
                    {factor.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4">{factor.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4 text-[var(--text-heading)]">Success Stories</h2>
            <p className="text-[var(--text-muted)] text-lg">Hear from our students who are now working at top tech companies.</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i} className="h-full">
                <div className="bg-[var(--bg-card)] p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[var(--border-color)] h-full flex flex-col">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-5 sm:mb-6">
                    <img src={t.image} alt={t.name} className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-primary/20" />
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">{t.name}</h4>
                      <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] italic leading-relaxed">"{t.content}"</p>
                  <div className="flex text-yellow-400 mt-6">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Placement Support Methodology */}
      <section className="py-20 bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
              <Briefcase className="h-3 w-3" />
              <span>100% Placement Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] mb-6 leading-tight">
              Your Success is <span className="text-primary">Our Commitment</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              We don't just train you—we prepare you for the real world. Our comprehensive placement support ensures you're completely job-ready when you complete your course.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {[
              {
                phase: "Phase 1",
                title: "Technical Grooming",
                icon: <Code2 className="h-6 w-6" />,
                items: [
                  "Advanced DSA & problem-solving sessions",
                  "System design fundamentals",
                  "Live coding practice with real-time feedback",
                  "Code review and optimization techniques",
                  "Portfolio project development"
                ],
                color: "from-blue-500 to-cyan-600"
              },
              {
                phase: "Phase 2",
                title: "Interview Preparation",
                icon: <Users className="h-6 w-6" />,
                items: [
                  "Mock interviews (Technical + HR rounds)",
                  "Resume building & LinkedIn profile optimization",
                  "Communication & soft skills training",
                  "Salary negotiation strategies",
                  "Company-specific interview patterns"
                ],
                color: "from-purple-500 to-pink-600"
              },
              {
                phase: "Phase 3",
                title: "Job Connections",
                icon: <Building2 className="h-6 w-6" />,
                items: [
                  "Direct referrals to 50+ recruitment partners",
                  "Exclusive campus placement drives",
                  "Job portal guidance (Naukri, LinkedIn)",
                  "Startup & MNC connections",
                  "Ongoing support until placement"
                ],
                color: "from-orange-500 to-red-600"
              }
            ].map((phase, i) => (
              <ScaleOnHover key={i}>
                <div className="bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border-color)] hover:shadow-2xl transition-all h-full">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-5 sm:mb-6 text-white shadow-lg`}>
                    {phase.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">{phase.phase}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-4 sm:mb-6">{phase.title}</h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
                        <span className="text-[var(--text-muted)] text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScaleOnHover>
            ))}
          </div>

          <div className="bg-[var(--bg-inverted)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-[var(--text-on-inverted)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-on-inverted)] mb-6">
                  What Does <span className="text-primary">"100% Placement Support"</span> Mean?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-on-inverted)] mb-1">Complete Job Readiness</h4>
                      <p className="text-[var(--text-on-inverted)]/60 text-sm">We ensure you have all the technical and soft skills needed to crack interviews.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-on-inverted)] mb-1">Continuous Support</h4>
                      <p className="text-[var(--text-on-inverted)]/60 text-sm">We don't stop until you land your dream role—unlimited mock interviews and resume iterations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-on-inverted)] mb-1">Direct Company Connections</h4>
                      <p className="text-[var(--text-on-inverted)]/60 text-sm">Access to exclusive job opportunities through our recruitment partnerships.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-primary mb-2">4-8 LPA</div>
                  <div className="text-sm text-[var(--text-on-inverted)]/60 font-medium">Average starting package for our freshers</div>
                </div>
                <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-primary mb-2">90%</div>
                  <div className="text-sm text-[var(--text-on-inverted)]/60 font-medium">Students placed within 6 months of course completion</div>
                </div>
                <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-primary mb-2">50+</div>
                  <div className="text-sm text-[var(--text-on-inverted)]/60 font-medium">Active recruitment partners across India</div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-primary/10 text-center">
              <p className="text-[var(--text-on-inverted)]/60 text-sm mb-6">
                <span className="text-primary font-bold">Important Note:</span> While we provide comprehensive placement assistance, final selection depends on your performance in interviews and company requirements. We prepare you thoroughly to maximize your success rate.
              </p>
              <button
                onClick={() => openModal('Placement Inquiry')}
                className="bg-primary text-white font-bold px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl"
              >
                Learn More About Placement Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Summary */}
      <section className="section-padding bg-[var(--bg-body)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-md mb-6">Got Questions? <br /> We Have Answers.</h2>
              <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
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

      {/* Career Counseling CTA */}
      <section className="py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 text-[var(--text-on-inverted)] text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-8 backdrop-blur-sm border border-primary/20">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 text-[var(--text-on-inverted)]">Confused About Your <span className="text-primary">Career Path</span>?</h2>
              <p className="text-base sm:text-xl text-[var(--text-on-inverted)]/80 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
                Don't guess your future. Speak to our expert career counselors for a <span className="font-bold text-primary border-b-2 border-primary/40">free 1:1 session</span>. We'll analyze your skills and suggest the perfect roadmap for 2026.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => openModal('Career Counseling')}
                  className="bg-primary text-white font-bold px-10 py-5 rounded-2xl hover:opacity-90 transition-all flex items-center shadow-xl text-lg group"
                >
                  Book Free Session <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-left hidden sm:flex items-center space-x-4 bg-primary/10 px-6 py-3 rounded-xl border border-primary/20 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-body)]/50 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=counselor${i}`} alt="Counselor" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Available Now</p>
                    <p className="text-xs font-bold text-[var(--text-on-inverted)]">3 Counselors Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-20 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-body)]/20 text-[var(--text-on-inverted)] text-xs font-bold uppercase tracking-wider mb-6">
                For Organizations
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Empower Your Workforce with <span className="text-primary">Corporate Training</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-on-inverted)]/70 mb-10 leading-relaxed">
                We provide customized training solutions for corporate teams to stay ahead in the rapidly evolving tech landscape. From upskilling in AI/ML to Cloud transformations.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                {[
                  { title: "Customized Curriculum", desc: "Tailored to your business needs." },
                  { title: "Expert Instructors", desc: "Industry veterans with deep expertise." },
                  { title: "Flexible Delivery", desc: "On-site, remote, or hybrid options." },
                  { title: "Scalable Solutions", desc: "For teams of 10 to 1000+ employees." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-bold text-[var(--text-on-inverted)] flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-[var(--text-on-inverted)]/80 mr-2" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--text-on-inverted)]/60">{item.desc}</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => openModal('Corporate Training')}
                className="btn-primary px-10 py-4"
              >
                Inquire for Corporate Training
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex items-center justify-center p-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-full opacity-40 grayscale" />
                  </div>
                  <div className="h-64 rounded-2xl bg-[var(--bg-body)]/10 border border-[var(--bg-body)]/20 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-3xl md:text-4xl font-black text-[var(--text-on-inverted)] mb-2">50+</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Corporates Trained</div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-64 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-3xl md:text-4xl font-black text-[var(--text-on-inverted)] mb-2">10k+</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Employees Upskilled</div>
                  </div>
                  <div className="h-48 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex items-center justify-center p-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-full opacity-40 grayscale" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-6">Global Training & <span className="text-primary">Online Flexibility</span></h2>
            <p className="text-[var(--text-muted)] text-lg">
              Distance isn't an issue. Can't make it to our Chennai campus? Join our live online classes that feel just like sitting in the classroom.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Interactive Classes",
                desc: "Real-time engagement with instructors and peers, just like a physical classroom.",
                icon: <PlayCircle className="h-8 w-8" />
              },
              {
                title: "24/7 LMS Access",
                desc: "Lifetime access to recorded sessions, study materials, and project files through our portal.",
                icon: <Zap className="h-8 w-8" />
              },
              {
                title: "Global Certification",
                desc: "Certificates recognized in USA, UK, Canada, Australia, UAE, and beyond.",
                icon: <Award className="h-8 w-8" />
              }
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-xl transition-all group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-8 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-[var(--text-on-inverted)] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6">Ready to Build Your <span className="text-primary">Future</span>?</h2>
              <p className="text-base md:text-lg text-[var(--text-on-inverted)]/80 mb-10">
                Join our next batch and learn from industry experts who are passionate about teaching.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => openModal()}
                  className="bg-primary text-white hover:opacity-90 px-10 py-4 rounded-full text-lg font-black transition-all shadow-xl shadow-primary/20"
                >
                  Enroll Now
                </button>
                <Link 
                  to="/contact" 
                  className="bg-primary/10 backdrop-blur-md border border-primary/30 text-[var(--text-on-inverted)] hover:bg-primary/20 px-10 py-4 rounded-full text-lg font-black transition-all"
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
