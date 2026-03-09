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

import visionAnimation from '../assets/animations/Vision Eye.json';
import missionAnimation from '../assets/animations/Mission.json';

import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Parallax } from '../components/utils/Animations';

const About = () => {
  const { openModal } = useModal();
  const stats = [
    { label: 'Year Founded', value: 2019, suffix: '' },
    { label: 'Students Trained', value: 1200, suffix: '+' },
    { label: 'Real Projects Built', value: 157, suffix: '+' },
    { label: 'Hiring Partners', value: 75, suffix: '+' },
    { label: 'Avg Trainer Experience', value: 8, suffix: '+ Years' },
    { label: 'Max Batch Size', value: 20, suffix: '' },
    { label: 'Chennai Campuses', value: 3, suffix: '' },
    { label: 'Placement Rate', value: 90, suffix: '%+' },
  ];

  const locations = [
    { 
      name:"Nungambakkam Campus", 
      address:"No. 12, Wallace Garden, 2nd Street, Nungambakkam, Chennai — 600006",
      map:"https://maps.google.com/?q=Scope+AI+Hub+Nungambakkam+Chennai",
      phone: BRANDING.phone,
      type:"Flagship Campus"
    },
    { 
      name:"Velachery Campus", 
      address:"No. 45, Velachery Main Road, Near Phoenix Mall, Velachery, Chennai — 600042",
      map:"https://maps.google.com/?q=Scope+AI+Hub+Velachery+Chennai",
      phone: BRANDING.phone,
      type:"South Chennai Hub"
    },
    { 
      name:"OMR Campus", 
      address:"3rd Floor, Tech Park, Rajiv Gandhi Salai (OMR), Sholinganallur, Chennai — 600119",
      map:"https://maps.google.com/?q=Scope+AI+Hub+OMR+Sholinganallur+Chennai",
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
          <button onClick={() => openModal()} className="btn-secondary text-body-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]" aria-label="Apply for AI course admission">
            Apply Now
          </button>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] text-center">
                  <div className="heading-hero text-primary mb-1">2019</div>
                  <div className="text-caption font-bold uppercase tracking-widest text-[var(--text-muted)]">Year Founded</div>
                </div>
                <div className="p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] text-center">
                  <div className="heading-hero text-primary mb-1">1,200+</div>
                  <div className="text-caption font-bold uppercase tracking-widest text-[var(--text-muted)]">Students Trained</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="heading-md md:heading-hero text-primary mb-1">
                  <ScrollCountUp end={stat.value} />{stat.suffix}
                </div>
                <div className="text-small text-[var(--text-muted)] font-medium uppercase tracking-wider">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-lg font-bold">How We Teach</h2>
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
                <Parallax offset={20}>
                  <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Students collaborating" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Parallax>
                <Parallax offset={-20}>
                  <div className="aspect-square bg-primary rounded-3xl p-8 flex flex-col justify-end text-[var(--text-on-inverted)] shadow-xl shadow-primary/20">
                    <Lightbulb className="h-10 w-10 mb-4" />
                    <p className="font-bold text-body-lg leading-tight text-[var(--text-on-inverted)]">Innovation in every lesson.</p>
                  </div>
                </Parallax>
              </div>
              <div className="space-y-4 pt-12">
                <Parallax offset={20}>
                  <div className="aspect-square bg-[var(--bg-inverted)] light-surface rounded-3xl p-8 flex flex-col justify-end text-[var(--text-on-light)] shadow-xl">
                    <Target className="h-10 w-10 mb-4 text-primary-light" />
                    <p className="font-bold text-body-lg leading-tight text-[var(--text-on-light)]">
                      Goal-oriented training.
                    </p>
                  </div>
                </Parallax>
                <Parallax offset={-20}>
                  <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" alt="Classroom" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Parallax>
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
              <StaggerItem key={i}>
                <div className="flex flex-col items-center text-center p-5 sm:p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-[var(--bg-inverted)] group-hover:text-[var(--text-on-light)] transition-colors text-primary">
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
                
                {/* Left: Minimalist Avatar/Graphic */}
                <div className="w-full lg:w-5/12 flex justify-center lg:justify-end shrink-0">
                  <div className="relative group w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                    {/* Decorative geometric background elements */}
                    <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-6 scale-105 transition-transform duration-700 ease-out group-hover:-rotate-3" />
                    <div className="absolute inset-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3rem] rotate-3 scale-100 transition-transform duration-700 ease-out group-hover:rotate-1 shadow-sm" />
                    
                    {/* Main Avatar Container */}
                    <div className="absolute inset-0 bg-[var(--bg-inverted)] rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl overflow-hidden border border-[var(--border-color)] z-10 transition-transform duration-700 ease-out group-hover:scale-105">
                       <span className="text-8xl sm:text-9xl font-black text-[var(--text-on-inverted)] tracking-tighter opacity-90 transition-transform duration-700 group-hover:scale-110">
                         PR
                       </span>
                       {/* Subtle inner gradient */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
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
                logo: 'https://logo.clearbit.com/zoho.com',
                quote: 'SCOPE AI HUB transformed my career. The hands-on projects gave me the confidence to crack my interview at Zoho.',
              },
              {
                name: 'Priya Sharma',
                beforeRole: 'IT Support Analyst',
                afterRole: 'Data Scientist',
                company: 'Freshworks',
                logo: 'https://logo.clearbit.com/freshworks.com',
                quote:"The mentors at SCOPE AI HUB don't just teach — they build with you. That changed everything for me.",
              },
              {
                name: 'Karthik Rajan',
                beforeRole: 'BCA Graduate',
                afterRole: 'AI Developer',
                company: 'Infosys',
                logo: 'https://logo.clearbit.com/infosys.com',
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
                      <img src={student.logo} alt={student.company} className="h-6 w-6 object-contain rounded-sm" />
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
                <button 
                  onClick={() => loc.map !=="#" ? window.open(loc.map, '_blank', 'noopener,noreferrer') : openModal()}
                  className="mt-6 text-primary font-bold text-small flex items-center hover:underline"
                >
                  {loc.map !=="#" ? 'View on Google Maps' : 'Contact Us'} <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="dark-section rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-[var(--text-on-inverted)] shadow-2xl dark-surface">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
                <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
              </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-lg font-bold mb-6">Your Next Batch Starts Soon. <span className="font-extrabold text-primary">Seats Fill Fast.</span></h2>
              <p className="text-body md:text-lg text-[var(--text-on-inverted)]/80 mb-10">
                Join 1,200+ graduates building AI careers across India and beyond.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => openModal()}
                  className="btn-primary px-10 py-4 text-body-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="Apply for AI course admission"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/courses"
                  className="btn-secondary text-[var(--text-on-inverted)] border-white/20 px-10 py-4 text-body-lg text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="View all AI training programs"
                >
                  View Programs
                </Link>
                <button 
                  onClick={() => openModal()}
                  className="btn-secondary text-[var(--text-on-inverted)] border-white/20 px-10 py-4 text-body-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  aria-label="Talk to a career mentor"
                >
                  Talk to a Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
