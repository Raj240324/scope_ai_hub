import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Target, Eye, Lightbulb, Users, ShieldCheck, Heart, ArrowRight, Award, Code2, Zap, MessageSquare, Briefcase, Brain, Database, Cloud, Cpu, BarChart3, Bot, GraduationCap, MapPin, Phone, ExternalLink, BookOpen } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';

import SEO from '../components/utils/SEO';
import Hero from '../components/ui/Hero';
import KineticTeamHybrid from '../components/ui/KineticTeamHybrid';
import HiringPartners from '../components/home/HiringPartners';
import LottieAnimation from '../components/ui/LottieAnimation';
import NeuralCareerGraph from '../components/ui/NeuralCareerGraph';

import visionAnimation from '../assets/animations/Vision Eye.json';
import missionAnimation from '../assets/animations/Mission.json';

import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp } from '../components/utils/Animations';
import { m, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fadeUp } from '../utils/motionVariants';

const About = () => {
  const { openModal } = useModal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const locations = [
    { 
      name:"Nungambakkam Campus", 
      address:"Address to be updated",
      map:"#",
      phone: BRANDING.phone,
      type:"Flagship Campus"
    },
    { 
      name:"Velachery Campus", 
      address:"Address to be updated",
      map:"#",
      phone: BRANDING.phone,
      type:"South Chennai Hub"
    },
    { 
      name:"OMR Campus", 
      address:"Address to be updated",
      map:"#",
      phone: BRANDING.phone,
      type:"IT Corridor Center"
    },
    { 
      name:"Online & Pan-India Programs", 
      address:"Live online batches available for students across India and abroad. Flexible weekend and weekday schedules.",
      map:"#",
      type:"Online & Offline"
    }
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title:"Integrity",
      description:"We commit to transparency, honesty, and delivering measurable outcomes — not empty promises."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title:"Accountability",
      description:"We take ownership of learner success and stand by our commitment to real career outcomes."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title:"Leadership",
      description:"We cultivate confidence, discipline, and the mindset required to lead in the AI era."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title:"Community",
      description:"Students first, always. We build a supportive ecosystem where every learner thrives together."
    }
  ];

  return (
    <Layout>
      <SEO 
        title={`About Us | ${BRANDING.fullName} — Shaping the AI Generation`} 
        description="Scope AI Hub is Chennai's leading AI and Machine Learning training institute offering hands-on projects, industry mentorship, and career-ready programs since 2019." 
        canonical="/about"
      />
      <Hero 
        badge="Est. 2019 · Chennai, India"
        title={<>Where <span className="font-extrabold text-primary">AI Careers</span> Are Built — One Real Project at a Time</>}
        subtitle="Scope AI Hub is Chennai's leading AI & Machine Learning training institute empowering students and professionals with hands-on industry skills since 2019. Online and offline programs available."
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link to="/courses" className="btn-primary text-body-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]" aria-label="Explore AI training programs">
            Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="btn-secondary text-body-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
            aria-label="Apply for AI course admission"
          >
            Apply Now
          </m.button>
        </div>
      </Hero>

      {/* Vision & Mission */}
      <section className="section-padding bg-[var(--bg-inverted)] light-surface text-[var(--text-on-light)] relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl blur-layer pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl blur-layer pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6 p-6 md:p-8 rounded-3xl bg-[var(--bg-inverted)] light-surface border border-[var(--border-color)] transition-all duration-500 group shadow-xl h-full flex flex-col">
                <div className="h-16 w-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out">
                  <LottieAnimation animationData={visionAnimation} className="w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h2 className="heading-md font-bold text-[var(--text-on-light)] mb-3 flex items-center gap-3">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    Our Vision
                  </h2>
                  <p className="text-body md:text-lg leading-relaxed text-[var(--text-on-light)]/80">
                    To build a globally recognised AI learning ecosystem that elevates the next generation of intelligent innovators and technology leaders.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="space-y-6 p-6 md:p-8 rounded-3xl bg-[var(--bg-inverted)] light-surface border border-[var(--border-color)] transition-all duration-500 group shadow-xl h-full flex flex-col">
                <div className="h-16 w-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out">
                  <LottieAnimation animationData={missionAnimation} className="w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h2 className="heading-md font-bold text-[var(--text-on-light)] mb-3 flex items-center gap-3">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    Our Mission
                  </h2>
                  <p className="text-body md:text-lg leading-relaxed text-[var(--text-on-light)]/80">
                    To provide practical, industry-grade AI education that converts ambition into measurable career outcomes.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="py-12 sm:py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
                Our Founding Story
              </div>
              <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-6 leading-tight">
                Why We Built <span className="font-extrabold text-primary">SCOPE AI HUB</span>
              </h2>
              <p className="text-body md:text-lg text-body mb-4">
                Scope AI Hub was founded in 2019 with a single conviction: AI education in India was broken.
              </p>
              <p className="text-body md:text-lg text-body mb-4">
                Institutions were teaching theory while the industry demanded engineers who could build and deploy real AI systems.
              </p>
              <p className="text-body md:text-lg text-body mb-6">
                We replaced passive lectures with project execution, mentor-led code reviews, and real engineering simulations.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8">
                <p className="text-[var(--text-heading)] italic text-body-lg leading-relaxed mb-4">"I watched brilliant students spend years studying AI theory, only to fail their first real deployment. That's when I knew — the system had to change. {BRANDING.fullName} exists because I refused to let another batch of students graduate unprepared."
                </p>
                <footer className="text-small font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  — {BRANDING.founder.name}, <span className="text-primary">{BRANDING.founder.title}</span>
                </footer>
              </blockquote>
            </div>
            <div className="space-y-6">
              <div className="p-5 sm:p-8 bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm">
                <p className="text-body-lg">"This is more than an institute. It is a movement to build the next generation of AI professionals."
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-heading)]">{BRANDING.founder.name}</p>
                    <p className="text-small text-[var(--text-muted)]">{BRANDING.founder.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Career Graph Pipeline */}
      <NeuralCareerGraph />


      {/* Why We're Different */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg font-bold mb-6">The <span className="font-extrabold text-primary">Scope Advantage</span></h2>
            <p className="text-[var(--text-muted)] text-body-lg">
              Six reasons our graduates outperform the competition — and why 75+ companies trust us to build their AI talent pipeline.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title:"Project-First Learning",
                desc:"Every module is anchored around a real AI project. Students graduate with 10+ deployable projects in their portfolio.",
                icon: <Code2 className="h-6 w-6" />
              },
              {
                title:"Industry-Current Curriculum",
                desc:"Our syllabus is updated monthly by active AI practitioners to match real job market demands and emerging technologies.",
                icon: <Zap className="h-6 w-6" />
              },
              {
                title:"Small Batch Sizes",
                desc:"Each batch is capped at 20 students to ensure direct mentor interaction, personalized feedback, and no student is left behind.",
                icon: <Users className="h-6 w-6" />
              },
              {
                title:"Lifetime Learning Access",
                desc:"Once enrolled, you get lifetime access to our learning portal, recorded sessions, and every future curriculum update.",
                icon: <Award className="h-6 w-6" />
              },
              {
                title:"Multilingual Support (தமிழ் + తెలుగు + English)",
                desc:"Complex AI concepts explained in Tamil, Telugu, and English — ensuring no student is left behind due to language barriers.",
                icon: <MessageSquare className="h-6 w-6" />
              },
              {
                title:"Career-Ready Focus",
                desc:"Weekly mock interviews, resume reviews, and direct referrals to 75+ hiring partners. We prepare you for the job, not just the exam.",
                icon: <Briefcase className="h-6 w-6" />
              }
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[var(--bg-inverted)] group-hover:text-[var(--text-on-light)] transition-colors text-primary">
                  {item.icon}
                </div>
                <h3 className="heading-sm font-semibold text-[var(--text-heading)] mb-3">{item.title}</h3>
                <p className="text-small sm:text-base text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-[var(--bg-card)] overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-lg font-bold">How We <span style={{ color: "#d64fd9" }}>Teach</span></h2>
              <p className="text-[var(--text-muted)] text-body-lg leading-relaxed">
                Every class at Scope AI Hub is a collaborative engineering session.
              </p>
              <p className="text-[var(--text-muted)] text-body-lg leading-relaxed">
                Our trainers open their code editor and solve real problems alongside students.
                You debug, build, and deploy systems in real time — just like a real AI engineering team.
              </p>
              <div className="space-y-4">
                {[
                  'Curriculum updated every month by active industry practitioners.',
                  'Project-based learning from day one — 10+ deployable projects by graduation.',
                  'Mentors with 8+ years of industry experience who code with you, not at you.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-[var(--text-muted)] font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-4">
                <m.div className="parallax-item" style={{ y: y1 }} layout="position">
                  <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Students collaborating" loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ aspectRatio: "4/5" }} />
                  </div>
                </m.div>
                <div className="aspect-square bg-primary rounded-3xl p-8 flex flex-col justify-end text-[var(--text-on-inverted)] shadow-xl shadow-primary/20">
                  <Lightbulb className="h-10 w-10 mb-4" />
                  <p className="font-bold text-body-lg leading-tight text-[var(--text-on-inverted)]">Innovation in every lesson.</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <m.div className="parallax-item" style={{ y: y2 }} layout="position">
                  <div className="aspect-square bg-[var(--bg-inverted)] light-surface rounded-3xl p-8 flex flex-col justify-end text-[var(--text-on-light)] shadow-xl">
                    <Target className="h-10 w-10 mb-4 text-primary-light" />
                    <p className="font-bold text-body-lg leading-tight text-[var(--text-on-light)]">
                      Goal-oriented training.
                    </p>
                  </div>
                </m.div>
                <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" alt="Classroom" loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ aspectRatio: "4/5" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Cover */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
              Curriculum Stack
            </div>
            <h2 className="heading-lg font-bold mb-4">Technologies We <span className="font-extrabold text-primary">Cover</span></h2>
            <p className="text-[var(--text-muted)] text-body-lg">
              Industry-standard tools and frameworks taught through hands-on projects and live deployments.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: 'Python', icon: <Code2 className="h-7 w-7" /> },
              { name: 'Machine Learning', icon: <Brain className="h-7 w-7" /> },
              { name: 'Deep Learning', icon: <Cpu className="h-7 w-7" /> },
              { name: 'NLP', icon: <MessageSquare className="h-7 w-7" /> },
              { name: 'Computer Vision', icon: <Eye className="h-7 w-7" /> },
              { name: 'Generative AI', icon: <Bot className="h-7 w-7" /> },
              { name: 'Large Language Models', icon: <BookOpen className="h-7 w-7" /> },
              { name: 'Prompt Engineering', icon: <Lightbulb className="h-7 w-7" /> },
              { name: 'Data Analytics', icon: <BarChart3 className="h-7 w-7" /> },
              { name: 'Cloud AI (AWS / GCP / Azure)', icon: <Cloud className="h-7 w-7" /> },
            ].map((tech, i) => (
              <StaggerItem key={i} className="h-full">
                <div className="flex flex-col items-center text-center p-5 sm:p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-[var(--bg-inverted)] group-hover:text-[var(--text-on-light)] transition-colors text-primary shrink-0">
                    {tech.icon}
                  </div>
                  <p className="text-small font-bold text-[var(--text-heading)]">{tech.name}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Hiring Partners */}
      <HiringPartners />

      {/* CEO Leadership Section */}
      <section className="py-20 md:py-32 bg-[var(--bg-card)] border-y border-[var(--border-color)] overflow-hidden">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                
                {/* Left: Glassmorphism Identity Card */}
                <div className="w-full lg:w-5/12 flex justify-center lg:justify-end shrink-0">
                  <div 
                    className="relative group w-full max-w-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
                    style={{
                      background: 'rgba(214,79,217,0.06)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(214,79,217,0.2)',
                      boxShadow: '0 8px 32px rgba(214,79,217,0.1), inset 0 1px 0 rgba(255,255,255,0.06)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(214,79,217,0.45)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(214,79,217,0.2)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Large Stylized Initials */}
                    <div className="mb-6">
                      <span 
                        className="text-6xl font-black tracking-tighter"
                        style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          background: 'linear-gradient(135deg, #d24bd5 0%, #b833bb 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}
                      >
                        PR
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-1">
                      {BRANDING.ceo.name}
                    </h3>
                    
                    {/* Role */}
                    <p className="text-sm uppercase tracking-widest font-mono mb-6" style={{ color: '#d24bd5' }}>
                      Founder & CEO
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {['AI Strategy', 'Leadership', 'EdTech'].map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            border: '1px solid rgba(214,79,217,0.3)',
                            color: 'rgba(214,79,217,0.8)',
                            background: 'rgba(214,79,217,0.05)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Editorial Typography */}
                <div className="w-full lg:w-7/12 flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left relative z-20">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] text-caption sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-[var(--border-color)] shadow-sm">
                      Leadership
                    </div>
                    <h2 className="heading-lg font-bold text-[var(--text-heading)] tracking-tight leading-tight mb-2">
                      {BRANDING.ceo.name}
                    </h2>
                    <p className="text-primary font-black text-caption sm:text-sm uppercase tracking-widest">
                      {BRANDING.ceo.title}
                    </p>
                  </div>

                  <div className="relative">
                    {/* Decorative large quote mark */}
                    <span className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 text-[5rem] sm:text-[6rem] text-[var(--border-color)] font-serif italic leading-none select-none opacity-40">"</span>
                    <p className="text-body sm:text-lg md:text-xl text-body relative z-10 font-medium pb-2">
                      {BRANDING.ceo.bio}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                    {["Strategic Vision","AI & Tech Leadership","Academic Excellence","Industry Alignment"].map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-full text-caption font-bold uppercase tracking-wider bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] shadow-sm hover:border-primary/50 hover:text-primary transition-all cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section — Interactive Kinetic List */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <KineticTeamHybrid />
      </section>

      {/* Student Success */}
      <section className="section-padding bg-[var(--bg-body)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
              <GraduationCap className="h-3 w-3" />
              <span>Student Success</span>
            </div>
            <h2 className="heading-lg font-bold mb-4">From Beginners to <span className="font-extrabold text-primary">AI Engineers</span></h2>
            <p className="text-[var(--text-muted)] text-body-lg">
              Real career transformations from our graduates — not marketing claims, but verified outcomes.
            </p>
          </div>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arun Kumar',
                beforeRole: 'Mechanical Graduate',
                afterRole: 'ML Engineer',
                company: 'Zoho',
                quote: 'SCOPE AI HUB transformed my career. The hands-on projects gave me the confidence to crack my interview at Zoho.',
              },
              {
                name: 'Priya Sharma',
                beforeRole: 'IT Support Analyst',
                afterRole: 'Data Scientist',
                company: 'Freshworks',
                quote:"The mentors at SCOPE AI HUB don't just teach — they build with you. That changed everything for me.",
              },
              {
                name: 'Karthik Rajan',
                beforeRole: 'BCA Graduate',
                afterRole: 'AI Developer',
                company: 'Infosys',
                quote: 'From zero coding experience to deploying AI models in production. The curriculum is intense and industry-ready.',
              },
            ].map((student, i) => (
              <StaggerItem key={i}>
                <div className="p-6 sm:p-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-body-lg">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-heading)]">{student.name}</p>
                      <p className="text-caption text-[var(--text-muted)]">
                        <span className="line-through opacity-60">{student.beforeRole}</span>
                        <span className="mx-2">→</span>
                        <span className="text-primary font-bold">{student.afterRole}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-body italic flex-1">"{student.quote}"</p>
                  <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center space-x-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-small font-bold text-[var(--text-heading)]">{student.company}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* Core Values */}
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg font-bold mb-4">The Values We Live By</h2>
            <p className="text-[var(--text-muted)]">
              As a startup, our values define our culture and our commitment to our students.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="heading-sm font-semibold text-[var(--text-heading)]">{value.title}</h3>
                  <p className="text-body">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-6">Our <span className="font-extrabold text-primary">Presence</span></h2>
            <p className="text-body md:text-lg text-[var(--text-muted)]">
              On-campus excellence. Borderless online learning. A truly global AI ecosystem — from Tamil Nadu to the world.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((loc, i) => (
              <div key={i} className="p-5 sm:p-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all group">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[var(--bg-inverted)] transition-colors">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-[var(--text-on-light)] transition-colors" />
                  </div>
                  <span className="text-caption font-bold uppercase tracking-widest text-[var(--text-muted)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)]">{loc.type}</span>
                </div>
                <h3 className="text-body-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4">{loc.name}</h3>
                <p className="text-small sm:text-base text-body">{loc.address}</p>
                {loc.phone && (
                  <p className="mt-3 text-small text-[var(--text-muted)] flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2" />
                    {loc.phone}
                  </p>
                )}
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => loc.map !=="#" ? window.open(loc.map, '_blank', 'noopener,noreferrer') : openModal()}
                  className="mt-6 text-primary font-bold text-small flex items-center hover:underline"
                >
                  {loc.map !=="#" ? 'View on Google Maps' : 'Contact Us'} <ExternalLink className="ml-2 h-4 w-4" />
                </m.button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <m.div 
            ref={ctaRef}
            variants={fadeUp}
            initial="hidden"
            animate={ctaVisible ? 'visible' : 'hidden'}
            className="dark-section rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-[var(--text-on-inverted)] shadow-2xl dark-surface"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
                <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
              </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-lg font-bold mb-6 text-white">Your Next Batch Starts Soon. <span className="font-extrabold" style={{ color: "#d24bd5" }}>Seats Fill Fast.</span></h2>
              <p className="text-body md:text-lg text-[var(--text-on-inverted)]/80 mb-10">
                Join 1,200+ graduates building AI careers across India and beyond.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal()}
                  className="btn-primary px-10 py-4 text-body-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="Apply for AI course admission"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </m.button>
                <Link
                  to="/courses"
                  className="btn-secondary text-[var(--text-on-inverted)] border-white/20 px-10 py-4 text-body-lg text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="View all AI training programs"
                >
                  View Programs
                </Link>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal()}
                  className="btn-secondary text-[var(--text-on-inverted)] border-white/20 px-10 py-4 text-body-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="Talk to a career mentor"
                >
                  Talk to a Mentor
                </m.button>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
