import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/motionVariants';
import { ArrowRight, Star } from 'lucide-react';

const mentors = [
  {
    name:"Sanjula",
    role:"Head of Academics",
    company:"8+ Years in AI & Data Science",
    image:"https://randomuser.me/api/portraits/women/75.jpg"
  },
  {
    name:"Raghavi",
    role:"Head – Placements & Corporate Relations",
    company:"Former Enterprise HR Professional",
    image:"https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name:"Suresh M",
    role:"Principal AI Consultant",
    company:"Enterprise AI Practitioner",
    image:"https://randomuser.me/api/portraits/men/36.jpg"
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
              to="/careers/trainers"
              className="group flex items-center gap-2 text-small font-bold text-primary hover:text-[var(--text-heading)] transition-colors no-underline"
            >
              Meet All Trainers
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
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={trainer.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}`}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-bold text-[var(--text-heading)] text-lg mb-0.5">{trainer.name}</h3>
                  <p className="text-caption font-semibold text-primary">{trainer.role}</p>
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
