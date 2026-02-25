import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Github, Linkedin, Mail, Award, Briefcase } from 'lucide-react';
import { BRANDING } from '../../data/branding';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/utils/Animations';

const TrainerProfiles = () => {
  const trainers = [
    {
      name: "Sanjula",
      role: "Head of Academics",
      image: "https://i.pravatar.cc/300?u=sanjula_hoa",
      expertise: ["AI & Data Science", "Curriculum Design", "Academic Leadership", "Machine Learning"],
      experience: "8+ years",
      companies: ["Industry", "Academia"],
      bio: "8+ years of AI & Data Science industry experience, leading curriculum design aligned with global tech standards. Dedicated to building structured, outcome-driven learning pathways that bridge real-world industry demands with learner growth.",
      education: "AI & Data Science — Industry Specialist",
      achievements: [
        "Designed AI & Cloud curriculum aligned with global tech standards",
        "Led academic programmes producing 1,000+ career-ready graduates",
        "Spearheaded outcome-driven curriculum reform at SCOPE AI HUB"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "academics@scopeaihub.com"
    },
    {
      name: "Raghavi",
      role: "Head – Placements & Corporate Relations",
      image: "https://i.pravatar.cc/300?u=ragavireddy",
      expertise: ["Corporate Relations", "Placements", "Enterprise HR", "Career Coaching"],
      experience: "Industry Expert",
      companies: ["Enterprise Organizations", "Tech Industry"],
      bio: "Former HR professional with experience in enterprise hiring, building strong industry partnerships for student career acceleration. Strategically connects graduates with top tech companies across India and beyond.",
      education: "HR & Corporate Relations — Enterprise Specialist",
      achievements: [
        "Built a network of 75+ active hiring partners across India",
        "Managed placement drives placing 500+ students into tech roles",
        "Developed structured interview grooming and career readiness programmes"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "placements@scopeaihub.com"
    },
    {
      name: "Suresh M",
      role: "Principal AI Consultant & Lead Trainer",
      image: "https://i.pravatar.cc/300?u=sureshm",
      expertise: ["AI Consulting", "Machine Learning", "Deep Learning", "Applied AI"],
      experience: "Enterprise AI Practitioner",
      companies: ["Enterprise Clients", "Tech Industry"],
      bio: "Enterprise AI practitioner transforming complex technologies into practical, career-ready skillsets. Brings real-world AI consulting experience into every session, ensuring students learn by building — not just watching.",
      education: "AI & Machine Learning — Enterprise Consultant",
      achievements: [
        "Delivered AI consulting to enterprise clients across multiple industries",
        "Designed hands-on AI and ML labs used in live industry-grade projects",
        "Trained professionals from 25+ organisations in applied AI techniques"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "training@scopeaihub.com"
    }
  ];

  return (
    <Layout 
      title={`Meet Our Trainers | Expert Mentors at ${BRANDING.fullName}`}
      description="Learn from industry veterans at ScopeAIHub. Our trainers have worked at Google, Amazon, Microsoft, and top Indian startups. Get mentored by the best."
    >
      <Hero 
        title={<>Learn from <span className="text-primary">Industry Experts</span></>}
        subtitle="Our trainers aren't just teachers—they're active industry professionals who bring real-world experience to the classroom. Get mentored by engineers, designers, and architects from top tech companies."
      />

      <div className="container-custom section-padding">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { value: "15+", label: "Expert Trainers" },
            { value: "120+", label: "Combined Years Experience" },
            { value: "500+", label: "Students Mentored" },
            { value: "95%", label: "Student Satisfaction" }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-[var(--text-muted)]">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Trainer Profiles */}
        <StaggerContainer className="space-y-16">
          {trainers.map((trainer, index) => (
            <StaggerItem key={index}>
              <div className={`bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all overflow-hidden ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row`}>
                {/* Image Section */}
                <div className="lg:w-1/3 relative bg-gradient-to-br from-primary/10 to-blue-100 p-6 sm:p-12 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                    <img 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="relative h-32 w-32 sm:h-48 sm:w-48 rounded-full object-cover ring-8 ring-[var(--bg-card)] shadow-2xl"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-heading)] text-center mb-2">{trainer.name}</h3>
                  <p className="text-primary font-bold text-center mb-6">{trainer.role}</p>
                  <div className="flex space-x-4">
                    <a href={trainer.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-white transition-colors text-[var(--text-muted)]">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={trainer.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-white transition-colors text-[var(--text-muted)]">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${trainer.email}`} className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-white transition-colors text-[var(--text-muted)]">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-5 sm:p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 sm:space-x-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-bold text-[var(--text-heading)]">{trainer.experience}</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-[var(--border-color)]"></div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-[var(--text-muted)]">{trainer.education}</span>
                    </div>
                  </div>

                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">{trainer.bio}</p>

                  {/* Companies */}
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Previous Companies</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.companies.map((company, i) => (
                        <span key={i} className="px-4 py-2 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] text-xs font-bold rounded-lg">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Notable Achievements</h4>
                    <ul className="space-y-2">
                      {trainer.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-[var(--text-muted)]">
                          <span className="text-accent-success mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-20 text-center p-6 sm:p-12 bg-[var(--bg-inverted)] rounded-2xl sm:rounded-3xl text-[var(--text-on-inverted)]">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Want to Learn from These Experts?</h2>
          <p className="text-lg text-[var(--text-on-inverted)]/60 mb-10 max-w-2xl mx-auto">
            Join our next batch and get personalized mentorship from industry veterans who are passionate about teaching.
          </p>
          <a href="/admissions" className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl transition-all shadow-xl shadow-primary/30">
            Enroll Now
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerProfiles;
