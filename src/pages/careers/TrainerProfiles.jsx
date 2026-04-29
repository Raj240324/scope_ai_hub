import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Github, Linkedin, Mail, Award, Briefcase } from 'lucide-react';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/utils/Animations';

const TrainerProfiles = () => {
  const trainers = [
    {
      name:"Sanjula",
      role:"Head of Academics",
      image:"/sanjula_portrait_1777431268737.webp",
      expertise: ["AI & Data Science","Curriculum Design","Academic Leadership","Machine Learning"],
      experience:"8+ years",
      companies: ["Industry","Academia"],
      bio:"8+ years of AI & Data Science industry experience, leading curriculum design aligned with global tech standards. Dedicated to building structured, outcome-driven learning pathways that bridge real-world industry demands with learner growth.",
      education:"AI & Data Science — Industry Specialist",
      achievements: ["Designed AI & Cloud curriculum aligned with global tech standards","Led academic programmes producing 1,000+ career-ready graduates","Spearheaded outcome-driven curriculum reform at SCOPE AI HUB"
      ],
      linkedin:"https://linkedin.com",
      github:"https://github.com",
      email: BRANDING.email
    },
    {
      name:"Raghavi",
      role:"Head – Placements & Corporate Relations",
      image:"/raghavi_portrait_1777431285644.webp",
      expertise: ["Corporate Relations","Placements","Enterprise HR","Career Coaching"],
      experience:"Industry Expert",
      companies: ["Enterprise Organizations","Tech Industry"],
      bio:"Former HR professional with experience in enterprise hiring, building strong industry partnerships for student career acceleration. Strategically connects graduates with top tech companies across India and beyond.",
      education:"HR & Corporate Relations — Enterprise Specialist",
      achievements: ["Built a network of 75+ active hiring partners across India","Managed placement drives placing 500+ students into tech roles","Developed structured interview grooming and career readiness programmes"
      ],
      linkedin:"https://linkedin.com",
      github:"https://github.com",
      email: BRANDING.email
    },
    {
      name:"Suresh M",
      role:"Principal AI Consultant & Lead Trainer",
      image:"/suresh_portrait_1777431303877.webp",
      expertise: ["AI Consulting","Machine Learning","Deep Learning","Applied AI"],
      experience:"Enterprise AI Practitioner",
      companies: ["Enterprise Clients","Tech Industry"],
      bio:"Enterprise AI practitioner transforming complex technologies into practical, career-ready skillsets. Brings real-world AI consulting experience into every session, ensuring students learn by building — not just watching.",
      education:"AI & Machine Learning — Enterprise Consultant",
      achievements: ["Delivered AI consulting to enterprise clients across multiple industries","Designed hands-on AI and ML labs used in live industry-grade projects","Trained professionals from 25+ organisations in applied AI techniques"
      ],
      linkedin:"https://linkedin.com",
      github:"https://github.com",
      email: BRANDING.email
    }
  ];

  return (
    <Layout>
      <SEO 
        title={`Meet Our Mentors | Expert AI Trainers at ${BRANDING.fullName}`} 
        description="Learn from industry veterans at Scope AI Hub. Our trainers have worked at top enterprise companies and bring real-world AI consulting experience into every session." 
        canonical="/careers/trainers"
      />
      <Hero 
        badge="15+ Expert Mentors · 120+ Years Combined Experience"
        title={<>The People Behind Your <span className="font-extrabold text-primary">Growth</span>.</>}
      />

      <div className="container-custom section-padding">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { value:"15+", label:"Expert Trainers" },
            { value:"120+", label:"Combined Years Experience" },
            { value:"500+", label:"Students Mentored" },
            { value:"95%", label:"Student Satisfaction" }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                <div className="heading-md font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-small font-medium text-[var(--text-muted)]">{stat.label}</div>
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
                  <div 
                    className="relative mb-6 w-48 h-48 sm:w-64 sm:h-64 rounded-[2.5rem] overflow-hidden transition-all duration-500 ease-out z-10 mx-auto"
                    style={{
                      border: '1px solid rgba(214,79,217,0.2)',
                      boxShadow: '0 8px 32px rgba(214,79,217,0.1), inset 0 1px 0 rgba(255,255,255,0.06)'
                    }}
                  >
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="heading-sm font-semibold text-[var(--text-heading)] text-center mb-2">{trainer.name}</h3>
                  <p className="text-primary font-bold text-center mb-6">{trainer.role}</p>
                  <div className="flex space-x-4">
                    <a href={trainer.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-[var(--text-on-inverted)] transition-colors text-[var(--text-muted)]">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={trainer.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-[var(--text-on-inverted)] transition-colors text-[var(--text-muted)]">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${trainer.email}`} className="p-2 bg-[var(--bg-card)] rounded-lg hover:bg-primary hover:text-[var(--text-on-inverted)] transition-colors text-[var(--text-muted)]">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-5 sm:p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 sm:space-x-4 mb-6">
                    <div className="flex items-center space-x-2 text-small">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-bold text-[var(--text-heading)]">{trainer.experience}</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-[var(--border-color)]"></div>
                    <div className="flex items-center space-x-2 text-small">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-[var(--text-muted)]">{trainer.education}</span>
                    </div>
                  </div>

                  <p className="text-body mb-6">{trainer.bio}</p>

                  {/* Companies */}
                  <div className="mb-6">
                    <h4 className="text-caption font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Previous Companies</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.companies.map((company, i) => (
                      <span key={i} className="px-4 py-2 bg-[var(--bg-inverted)] text-[var(--text-on-light)] text-caption font-bold rounded-lg">
                        {company}
                      </span>
                    ))}
                  </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-caption font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-caption font-bold rounded-full border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-caption font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">Notable Achievements</h4>
                    <ul className="space-y-2">
                      {trainer.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2 text-small text-[var(--text-muted)]">
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
        <div className="mt-12 sm:mt-20 text-center p-6 sm:p-12 bg-[var(--bg-inverted)] light-surface text-[var(--text-on-light)] rounded-2xl sm:rounded-3xl">
          <h2 className="heading-lg font-bold text-[var(--text-on-light)]">Want to Learn from These <span style={{ color: "#d64fd9" }}>Experts?</span></h2>          
          <p className="text-body-lg text-[var(--text-on-light)]/60 mb-10 max-w-2xl mx-auto">
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
