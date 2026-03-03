import React from 'react';
import Layout from '../components/layout/Layout';
import { Target, Eye, Lightbulb, Users, ShieldCheck, Heart, ArrowRight, Award, Code2, Zap, MessageSquare, Briefcase } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';

import Hero from '../components/ui/Hero';
import KineticTeamHybrid from '../components/ui/KineticTeamHybrid';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Parallax } from '../components/utils/Animations';

const About = () => {
  const { openModal } = useModal();
  const stats = [
    { label: 'Real-World Projects', value: '100+' },
    { label: 'Avg. Industry Experience', value: '3+ Years' },
    { label: 'Hiring Partners', value: '75+' },
    { label: 'Curriculum in Practice', value: '70%' },
  ];

  const locations = [
    { 
      name: "Chennai Campuses", 
      address: "Nungabakam, Velachery, OMR — Full address to be updated",
      map: "#",
      phone: BRANDING.phone,
      type: "Physical Presence"
    },
    { 
      name: "Global Presence", 
      address: "Offline Presence: Chennai | Coimbatore | Madurai · Pan India Online Programs · International Students Learning from Abroad",
      map: "#",
      type: "Online & Offline"
    }
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Integrity",
      description: "We commit to transparency, honesty, and delivering measurable outcomes — not empty promises."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Accountability",
      description: "We take ownership of learner success and stand by our commitment to real career outcomes."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Leadership",
      description: "We cultivate confidence, discipline, and the mindset required to lead in the AI era."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community",
      description: "Students first, always. We build a supportive ecosystem where every learner thrives together."
    }
  ];

  return (
    <Layout 
      title={`About Us | ${BRANDING.fullName} — Shaping the AI Generation`}
      description="Learn how SCOPE AI HUB was founded in 2019 to challenge outdated learning models. Meet our expert team and understand our mission to create the next generation of AI innovators."
    >
      <Hero 
        badge="Est. 2019 · Chennai, India"
        title={<>Where <span className="text-primary">AI Careers</span> Begin.</>}
      />

      {/* Founding Story Section */}
      <section className="py-12 sm:py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                Our Founding Story
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-6 leading-tight">
                Why We Built <span className="text-primary">SCOPE AI HUB</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                {BRANDING.fullName} was born to challenge outdated learning models and redefine how AI education is delivered. We eliminated theory-heavy, low-impact training and replaced it with execution-focused, industry-grade skill development.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8">
                <p className="text-[var(--text-heading)] italic text-lg leading-relaxed mb-4">
                  "When I started {BRANDING.fullName}, my vision was clear — education must evolve as fast as technology. AI is not the future. It's the present. Yet, many skilled individuals lack access to practical, industry-ready training. {BRANDING.fullName} was built to change that."
                </p>
                <footer className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  — {BRANDING.founder.name}, <span className="text-primary">{BRANDING.founder.title}</span>
                </footer>
              </blockquote>
            </div>
            <div className="space-y-6">
              <div className="p-5 sm:p-8 bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm">
                <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                  "This is more than an institute. It is a movement to build the next generation of AI professionals."
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-heading)]">{BRANDING.founder.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{BRANDING.founder.title}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] text-center">
                  <div className="text-3xl font-black text-primary mb-1">2019</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Year Founded</div>
                </div>
                <div className="p-6 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] text-center">
                  <div className="text-3xl font-black text-primary mb-1">1,000+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Lives Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  <ScrollCountUp end={stat.value} />
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-6">Why a <span className="text-primary">Startup Institute</span>?</h2>
            <p className="text-[var(--text-muted)] text-lg">
              Because we are agile. Unlike traditional institutes with outdated syllabi, we update our curriculum every month. We are small enough to care about every single student, but experienced enough to guide you to top product companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Project-First Learning",
                desc: "Every concept is immediately applied to a real project. You don't just learn syntax—you build products.",
                icon: <Code2 className="h-6 w-6" />
              },
              {
                title: "Industry-Current Curriculum",
                desc: "Our syllabus is updated every month based on current job market demands and emerging technologies.",
                icon: <Zap className="h-6 w-6" />
              },
              {
                title: "Small Batch Sizes",
                desc: "Maximum 20 students per batch ensures personalized attention and mentorship from our expert trainers.",
                icon: <Users className="h-6 w-6" />
              },
              {
                title: "Lifetime Access",
                desc: "Once enrolled, you get lifetime access to our learning portal, recorded sessions, and updated course materials.",
                icon: <Award className="h-6 w-6" />
              },
              {
                title: "Multilingual Support (தமிழ் + తెలుగు + English)",
                desc: "We explain complex technical concepts in Tamil, Telugu, and English, ensuring no student is left behind due to language barriers.",
                icon: <MessageSquare className="h-6 w-6" />
              },
              {
                title: "Career-Ready Focus",
                desc: "From day one, we prepare you for interviews, not just exams. Mock interviews, resume reviews, and placement grooming included.",
                icon: <Briefcase className="h-6 w-6" />
              }
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[var(--bg-inverted)] group-hover:text-[var(--text-on-inverted)] transition-colors text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
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
              <h2 className="heading-md">How We Teach</h2>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                We don't believe in "reading form slides". Our classes are interactive discussions. We code together, debug together, and build together. We treat you like a junior developer from day one, not just a student.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-[var(--text-muted)] font-medium">Curriculum updated every month to match industry trends.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-[var(--text-muted)] font-medium">Project-based learning from day one.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-[var(--text-muted)] font-medium">Mentors who are active industry professionals.</p>
                </div>
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
                  <div className="aspect-square bg-primary rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl shadow-primary/20">
                    <Lightbulb className="h-10 w-10 mb-4" />
                    <p className="font-bold text-lg leading-tight text-[var(--text-on-inverted)]">Innovation in every lesson.</p>
                  </div>
                </Parallax>
              </div>
              <div className="space-y-4 pt-12">
                <Parallax offset={20}>
                  <div className="aspect-square bg-[var(--bg-inverted)] rounded-3xl p-8 flex flex-col justify-end text-[var(--text-on-inverted)] shadow-xl">
                    <Target className="h-10 w-10 mb-4 text-primary-light" />
                    <p className="font-bold text-lg leading-tight text-[var(--text-on-inverted)]">Goal-oriented training.</p>
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
                    <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-[var(--border-color)] shadow-sm">
                      Leadership
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tight leading-tight mb-2">
                      {BRANDING.ceo.name}
                    </h2>
                    <p className="text-primary font-black text-xs sm:text-sm uppercase tracking-widest">
                      {BRANDING.ceo.title}
                    </p>
                  </div>

                  <div className="relative">
                    {/* Decorative large quote mark */}
                    <span className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 text-[5rem] sm:text-[6rem] text-[var(--border-color)] font-serif italic leading-none select-none opacity-40">"</span>
                    <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] leading-relaxed relative z-10 font-medium pb-2">
                      {BRANDING.ceo.bio}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                    {["Strategic Vision", "AI & Tech Leadership", "Academic Excellence", "Industry Alignment"].map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] shadow-sm hover:border-primary/50 hover:text-primary transition-all cursor-default">
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

      {/* Vision & Mission */}
      <section className="section-padding bg-[var(--bg-inverted)] text-[var(--text-on-inverted)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-[var(--bg-body)]/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
              <p className="text-[var(--text-on-inverted)]/70 text-lg leading-relaxed">
                To build a globally recognised AI learning ecosystem that elevates the next generation of intelligent innovators and technology leaders.
              </p>
            </div>
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-[var(--bg-body)]/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
              <p className="text-[var(--text-on-inverted)]/70 text-lg leading-relaxed">
                To provide practical, industry-grade AI education that converts ambition into measurable career outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">The Values We Live By</h2>
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
                  <h3 className="text-xl font-bold text-[var(--text-heading)]">{value.title}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-6">Our <span className="text-primary">Presence</span></h2>
            <p className="text-base md:text-lg text-[var(--text-muted)]">
              On-campus excellence. Borderless online learning. A truly global AI ecosystem — from Tamil Nadu to the world.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((loc, i) => (
              <div key={i} className="p-5 sm:p-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all group">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[var(--bg-inverted)] transition-colors">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-[var(--text-on-inverted)] transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4">{loc.name}</h3>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">{loc.address}</p>
                <button 
                  onClick={() => loc.map !== "#" ? window.open(loc.map, '_blank') : openModal()}
                  className="mt-6 text-primary font-bold text-sm flex items-center hover:underline"
                >
                  View on Map <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center text-[var(--text-on-inverted)] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6">Ready to Build Your <span className="text-primary">Future</span>?</h2>
              <p className="text-base md:text-lg text-[var(--text-on-inverted)]/80 mb-10">
                Join our next batch and start your journey towards becoming a skilled software professional with personalized mentorship.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => openModal()}
                  className="bg-primary text-white hover:opacity-90 px-10 py-4 rounded-2xl text-lg font-black transition-all shadow-xl shadow-primary/20 flex items-center justify-center"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => openModal()}
                  className="bg-primary/10 backdrop-blur-md border border-primary/30 text-[var(--text-on-inverted)] hover:bg-primary/20 px-10 py-4 rounded-2xl text-lg font-black transition-all"
                >
                  Talk to Counselor
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
