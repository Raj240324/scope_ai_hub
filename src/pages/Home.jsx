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
import CourseCard from '../components/ui/CourseCard';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
          {question}
        </span>
        <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-slate-200 flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'text-slate-400'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

import Hero from '../components/ui/Hero';

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
    { label: "Students Empowered", value: "100,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Career Prep Success", value: "Expert", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Years of Trust", value: "15+", icon: <Star className="h-5 w-5" /> },
    { label: "Hiring Partners", value: "500+", icon: <Building2 className="h-5 w-5" /> },
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
      description: `Get industry-recognized certificates from NASSCOM & ${BRANDING.fullName} to boost your global career prospects.`
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Bilingual Instruction",
      description: "Complex concepts explained in both Tamil and English for better understanding and faster learning."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert-Led Mentorship",
      description: "Learn directly from industry veterans with 10+ years of experience in top-tier tech companies."
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
    <Layout>
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
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students learning" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Live Interactive Sessions</span>
                </div>
                <p className="text-sm font-medium opacity-90">Join our next batch and start your journey towards becoming a professional developer.</p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <Parallax offset={-30} className="absolute -top-6 -right-6 z-20">
              <div className="bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
         
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">ISO Certified</p>
                    <p className="text-sm font-black text-slate-900">Institute</p>
                  </div>
                </div>
              </div>
            </Parallax>
            
            <Parallax offset={40} className="absolute -bottom-10 -left-10 z-20">
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 leading-none">100%</p>
                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">Job Assistance</p>
                  </div>
                </div>
              </div>
            </Parallax>
          </FadeIn>
        }
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/courses" className="btn-primary px-6 py-3.5 flex items-center justify-center font-bold whitespace-nowrap">
            Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <button 
            onClick={() => {
              const el = document.getElementById('trending-courses');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary px-6 py-3.5 flex items-center justify-center border-2 border-primary/20 hover:border-primary transition-all group font-bold whitespace-nowrap"
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            Download Syllabus
          </button>
          <button 
            onClick={() => openModal()}
            className="btn-secondary px-6 py-3.5 flex items-center justify-center border-2 font-bold whitespace-nowrap"
          >
            Book Free Demo
          </button>
        </div>
        
        <div className="mt-12 flex items-center space-x-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                className="inline-block h-12 w-12 rounded-full ring-4 ring-white" 
                src={`https://i.pravatar.cc/100?u=student${i}`} 
                alt="Student" 
              />
            ))}
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 ring-4 ring-white text-xs font-bold text-slate-600">
              +500
            </div>
          </div>
          <div>
            <div className="flex items-center text-yellow-400 mb-1">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Rated <span className="text-slate-900 font-bold">4.9/5</span> by our alumni
            </p>
          </div>
        </div>
      </Hero>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black mb-1">
                  <ScrollCountUp end={stat.value} />
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Learning Partners Grid */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {learningPartners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center transition-all">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className={`max-h-12 md:max-h-16 object-contain ${partner.name === 'MSME' ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'} transition-all duration-500`} 
                    />
                  ) : (
                    <span className="text-xl font-black text-slate-300 group-hover:text-primary transition-colors">{partner.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  Industry Recognized
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight">
                  Get Your <span className="text-primary">Official {BRANDING.fullName} Certificate</span>
                </h2>
                <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                  Our certification is more than just a piece of paper. It is a validation of your practical skills and project-ready expertise, recognized by our 500+ hiring partners across the industry.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Institute-Issued Official Certificate",
                    "Project-Validated Proficiency",
                    "Verified Technical Competencies",
                    "Hiring Partner Recognition"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => openModal()}
                  className="btn-primary"
                >
                  Learn More About Certification
                </button>
              </div>
              <div className="relative">
                <Parallax offset={20}>
                  <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center border border-slate-100">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Award className="h-12 w-12 text-primary" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 mb-2">Authenticated by</div>
                      <div className="text-primary font-bold tracking-widest uppercase text-sm">{BRANDING.fullName}</div>
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-slate-500 text-sm font-medium">Verified Training Provider</p>
                      </div>
                    </div>
                  </div>
                </Parallax>
                {/* Decorative elements */}
                <Parallax offset={-40} className="absolute -bottom-6 -left-6 z-[-1]">
                  <div className="w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                </Parallax>
                <Parallax offset={-60} className="absolute -top-6 -right-6 z-[-1]">
                  <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                </Parallax>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container-custom text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
            Our Students Work At
          </p>
        </div>
        
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <Marquee speed={30} className="py-4">
            <div className="flex items-center gap-16 px-8">
              {companies.map((company) => (
                <div key={company.name} className="h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `<span style="color: ${company.color}" class="font-black text-2xl tracking-tight">${company.name}</span>`;
                      }}
                    />
                  ) : (
                    <span style={{ color: company.color }} className="font-black text-2xl tracking-tight uppercase">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      {/* Regional Excellence Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FadeIn direction="up" delay={0.1}>
                    <div className="aspect-square bg-slate-50 rounded-3xl p-8 flex flex-col justify-end group hover:bg-primary transition-all duration-500">
                      <Globe className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                      <p className="font-bold text-lg leading-tight group-hover:text-white">Global Curriculum, <br />Local Context</p>
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.2}>
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400" alt="Software Development Training" className="h-full w-full object-cover" />
                    </div>
                  </FadeIn>
                </div>
                <div className="space-y-4 pt-12">
                  <FadeIn direction="up" delay={0.3}>
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400" alt="Students Collaborating" className="h-full w-full object-cover" />
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4}>
                    <div className="aspect-square bg-slate-900 rounded-3xl p-8 flex flex-col justify-end group hover:bg-primary transition-all duration-500">
                      <MessageSquare className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                      <p className="font-bold text-lg leading-tight text-white group-hover:text-white">Bilingual <br />Support (தமிழ் & English)</p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                Tamil Nadu's Pride
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Empowering <span className="text-primary">Tamil Nadu's</span> Next-Gen Tech Talent.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We bring top-tier tech education right to the heart of Chennai, with the same quality you'd expect from Silicon Valley. We are a startup focused on quality, personal attention, and real results.
              </p>
              
              <div className="mb-10">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  Key Areas We Serve in Chennai
                </p>
                <div className="flex flex-wrap gap-3">
                  {["OMR", "Thiruvanmiyur", "Adyar", "Velachery", "Tambaram", "Guindy", "T. Nagar", "Anna Nagar", "Porur", "Navallur", "Siruseri"].map((area) => (
                    <span key={area} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Centrally Located in Chennai",
                  "Expert Mentors from Top Tech Companies",
                  "100% Practical Project-Based Learning",
                  "10,000+ Alumni placed in Tamil Nadu's IT corridors"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary inline-flex items-center">
                Our Story in Tamil Nadu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Methodology Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative Background */}
        <Parallax offset={20} className="absolute top-0 right-0 w-1/2 h-full z-0">
            <div className="w-full h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        </Parallax>
        <Parallax offset={-30} className="absolute bottom-0 left-0 w-64 h-64 z-0">
            <div className="w-full h-full bg-blue-500/10 rounded-full blur-[120px]" />
        </Parallax>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              The {BRANDING.fullName} Advantage
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Why We’re the <span className="text-primary">Best Choice</span> for Your IT Career.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Our unique learning ecosystem is designed to provide you with the edge you need. From dedicated lab support to real-time industrial training, we ensure you're ready for the global tech stage.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((item, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative z-10 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=mentor${i}`} alt="Mentor" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold">1:1 Mentorship Available</p>
                <p className="text-slate-500 text-sm">Personal guidance from industry experts</p>
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

      <section id="trending-courses" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="heading-md mb-4">Top Trending Courses</h2>
              <p className="text-slate-600 text-base md:text-lg">
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
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                Learn from the Best
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Our Mentors Come from <span className="text-primary">Global Tech Leaders</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                At {BRANDING.fullName}, you aren't taught by academics. You are mentored by engineers who have built the tools you use every day.
              </p>
            </div>
            <div 
              onClick={() => openModal('Trainer Application', 'trainer')}
              className="group flex flex-col items-center lg:items-end text-center lg:text-right cursor-pointer"
            >
              <div className="flex -space-x-4 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=trainer${i}`} alt="Trainer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-white">+10</span>
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
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-6">
                    <img src={mentor.image} alt={mentor.name} className="h-16 w-16 rounded-2xl object-cover shadow-md" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{mentor.name}</h3>
                      <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">{mentor.role}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-500 mb-4">{mentor.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-100">
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
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="heading-md mb-4">Why Choose {BRANDING.fullName}?</h2>
            <p className="text-slate-600 text-base md:text-lg">
              We don't just teach code; we build careers through a comprehensive learning ecosystem.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFactors.map((factor, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    {factor.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{factor.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">Success Stories</h2>
            <p className="text-slate-600 text-lg">Hear from our students who are now working at top tech companies.</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i} className="h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-6">
                    <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full border-2 border-primary/20" />
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
                  <div className="flex text-yellow-400 mt-6">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Summary */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-md mb-6">Got Questions? <br /> We Have Answers.</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
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
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-white/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-white/5 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-8 backdrop-blur-sm border border-white/20">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Confused About Your Career Path?</h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
                Don't guess your future. Speak to our expert career counselors for a <span className="font-bold text-white border-b-2 border-white/40">free 1:1 session</span>. We'll analyze your skills and suggest the perfect roadmap for 2026.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => openModal('Career Counseling')}
                  className="bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all flex items-center shadow-xl shadow-black/20 text-lg group"
                >
                  Book Free Session <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-left hidden sm:flex items-center space-x-4 bg-white/10 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=counselor${i}`} alt="Counselor" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60">Available Now</p>
                    <p className="text-xs font-bold text-white">3 Counselors Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                For Organizations
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Empower Your Workforce with <span className="text-primary">Corporate Training</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-10 leading-relaxed">
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
                    <h4 className="font-bold text-white flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
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
                  <div className="h-48 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-full opacity-40 grayscale" />
                  </div>
                  <div className="h-64 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-3xl md:text-4xl font-black text-primary mb-2">50+</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Corporates Trained</div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-64 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-3xl md:text-4xl font-black text-white mb-2">10k+</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Employees Upskilled</div>
                  </div>
                  <div className="h-48 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-full opacity-40 grayscale invert" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-6">Global Training & <span className="text-primary">Online Flexibility</span></h2>
            <p className="text-slate-600 text-lg">
              Distance isn't an issue. Can't make it to Maraimalai Nagar? Join our live online classes that feel just like sitting in the classroom.
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
              <div key={i} className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-white/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-white/5 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Start Your Journey Today?</h2>
              <p className="text-base md:text-lg opacity-90 mb-10">
                Join our next batch and learn from industry experts who are passionate about teaching.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => openModal()}
                  className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-full text-lg font-black transition-all shadow-xl"
                >
                  Enroll Now
                </button>
                <Link 
                  to="/contact" 
                  className="bg-primary-dark/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-black transition-all"
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
