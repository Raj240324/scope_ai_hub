import React from 'react';
import Layout from '../components/layout/Layout';
import { Target, Eye, Lightbulb, Users, ShieldCheck, Heart, ArrowRight, Award, Code2, Zap, MessageSquare, Briefcase } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';

import Hero from '../components/ui/Hero';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Parallax } from '../components/utils/Animations';

const About = () => {
  const { openModal } = useModal();
  const stats = [
    { label: 'Industry Projects', value: '50+' },
    { label: 'Instructor Exp', value: '15+ Years' },
    { label: 'Hiring Partners', value: '50+' },
    { label: 'Practical Focus', value: '100%' },
  ];

  const locations = [
    { 
      name: "Chennai Campus", 
      address: "Chennai Technology Hub, OMR, Chennai - 600119",
      map: "https://goo.gl/maps/placeholder1",
      phone: "+91 63839 80415",
      type: "Main Campus"
    },
    { 
      name: "Online Training Center", 
      address: "Serving Students Globally (USA, UK, Middle East, Australia)",
      map: "#"
    }
  ];

  const values = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: `Official ${BRANDING.fullName} Certification`,
      description: `Receive a professional certificate from ${BRANDING.fullName} that validates your project-based expertise and technical proficiency.`
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Guidance for Placement",
      description: "We guide you for placement to get your dream job through intensive technical and HR grooming sessions."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Outcome-Driven",
      description: "We focus on project-based learning. You don't just learn theory; you build production-ready applications."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Bilingual Instruction",
      description: "Breaking language barriers by explaining complex tech concepts in both Tamil (தமிழ்) and English."
    }
  ];

  const team = [
    {
      name: "S. Raj",
      role: "Founder & Lead Architect",
      bio: "15+ years of experience in Full Stack Development and Cloud Architecture. Former Senior Architect at Silicon Valley firms, dedicated to bringing high-end tech education to Chennai.",
      expertise: ["Architecture", "MERN Stack", "AWS"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Anitha M.",
      role: "Head of Data Science",
      bio: "Ph.D. in Machine Learning with 10+ years of industrial experience in Big Data Analytics. Expert in simplifying complex algorithmic concepts for students.",
      expertise: ["Data Science", "AI/ML", "Python"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Vikram Singh",
      role: "Head of Placements & HR Training",
      bio: "Veteran career coach with 10+ years of experience in tech recruitment. Specialized in interview grooming and strategic placement guidance for top MNCs.",
      expertise: ["HR Grooming", "Placement Strategy", "Soft Skills"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <Layout 
      title={`About Us | ${BRANDING.fullName} Training Institute`}
      description="Learn about our mission to bridge the skill gap in the software industry. Meet our expert mentors and understand our teaching philosophy."
    >
      <Hero 
        title={<>Our Story: <span className="text-primary">New Beginnings</span>, Expert Foundations.</>}
        subtitle="Established in 2026, ScopeAIHub is born from a simple observation: Tech education needed a refresh. We are a new-age institute built by industry veterans to bring Silicon Valley-style practical learning to Tamil Nadu."
      />

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
                desc: "Our syllabus is updated every quarter based on current job market demands and emerging technologies.",
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
                title: "Bilingual Support (தமிழ் + English)",
                desc: "We explain complex technical concepts in both Tamil and English, ensuring no student is left behind due to language barriers.",
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
                  <p className="text-[var(--text-muted)] font-medium">Curriculum updated every 3 months to match industry trends.</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Parallax offset={20}>
                  <div className="aspect-[4/5] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Students collaborating" className="h-full w-full object-cover" />
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
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" alt="Classroom" className="h-full w-full object-cover" />
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">Meet Our Mentors</h2>
            <p className="text-[var(--text-muted)]">
              Our team consists of industry veterans who are passionate about sharing their knowledge and helping you succeed. All our mentors and staff are bound by strict Non-Disclosure Agreements (NDAs) to protect your project data and institutional IP.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="bg-[var(--bg-card)] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all group h-full flex flex-col">
                  <div className="relative mb-6 sm:mb-8 inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
                    <img src={member.image} alt={member.name} className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-4 ring-[var(--bg-body)] shadow-lg object-cover" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-4">{member.role}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[9px] font-black uppercase tracking-wider rounded-md border border-[var(--border-color)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-auto">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-[var(--bg-inverted)] text-[var(--text-on-inverted)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-[var(--bg-body)]/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Goal</h2>
              <p className="text-[var(--text-on-inverted)]/60 text-lg leading-relaxed">
                To simplify tech education. We believe anyone can code if they are taught the right way - with patience, practical examples, and in a language they understand.
              </p>
            </div>
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-[var(--bg-body)]/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">What Drives Us</h2>
              <p className="text-[var(--text-on-inverted)]/60 text-lg leading-relaxed">
                Seeing a student from a rural background land a high-paying job in a top MNC. That success story is what motivates us every single day.
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
              We are expanding our reach to provide quality tech education across multiple locations and through our global online platform.
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
