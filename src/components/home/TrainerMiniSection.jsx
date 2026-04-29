import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import { ArrowRight, Star } from 'lucide-react';

const mentors = [
  {
    name:"Sanjula",
    role:"Head of Academics",
    company:"8+ Years in AI & Data Science",
    image:"/sanjula_portrait_1777431268737.webp"
  },
  {
    name:"Raghavi",
    role:"Head – Placements & Corporate Relations",
    company:"Former Enterprise HR Professional",
    image:"/raghavi_portrait_1777431285644.webp"
  },
  {
    name:"Suresh M",
    role:"Principal AI Consultant",
    company:"Enterprise AI Practitioner",
    image:"/suresh_portrait_1777431303877.webp"
  }
];

const TrainerMiniSection = () => {
  // Take top 3 trainers
  const topTrainers = mentors.slice(0, 3);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-[var(--bg-body)] border-y border-[var(--border-color)]">
      <m.div 
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <m.h2 variants={fadeUp} className="heading-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight">
              Learn from <span className="text-primary">Industry Experts</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-body text-[var(--text-muted)]">
              Our mentors have 8+ years of experience building scalable AI solutions at top tech companies.
            </m.p>
          </div>
          <m.div variants={fadeUp}>
            <Link
              to="/careers/join-as-trainer"
              className="group flex items-center gap-2 text-small font-bold text-primary hover:text-[var(--text-heading)] transition-colors no-underline"
            >
              Become a Trainer
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </m.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTrainers.map((trainer, index) => (
            <m.div
              key={index}
              variants={fadeUp}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div 
                className="w-full flex justify-center mb-6"
              >
                <div 
                  className="relative group w-full rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
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
                  <div className="mb-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[rgba(214,79,217,0.2)]">
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-heading)] mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-mono mb-4" style={{ color: '#d24bd5' }}>
                    {trainer.role}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {['AI Expert', 'Mentor'].map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap"
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
              <p className="text-small text-[var(--text-muted)] mb-4 line-clamp-3">
                {trainer.bio ||"Passionate AI educator dedicated to building the next generation of engineers."}
              </p>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-caption font-bold text-[var(--text-heading)]">4.9/5 Average Rating</span>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default TrainerMiniSection;
