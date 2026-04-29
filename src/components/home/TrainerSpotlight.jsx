import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScaleOnHover } from '../utils/Animations';
import { BRANDING } from '../../data/branding';

const mentors = [
  {
    name:"Sanjula",
    role:"Head of Academics",
    company:"8+ Years in AI & Data Science",
    image:"/sanjula_portrait_1777431268737.webp",
    expertise: ["Curriculum Design","AI & Data Science"]
  },
  {
    name:"Raghavi",
    role:"Head – Placements & Corporate Relations",
    company:"Former Enterprise HR Professional",
    image:"/raghavi_portrait_1777431285644.webp",
    expertise: ["Placements","Industry Partnerships"]
  },
  {
    name:"Suresh M",
    role:"Principal AI Consultant & Lead Trainer",
    company:"Enterprise AI Practitioner",
    image:"/suresh_portrait_1777431303877.webp",
    expertise: ["AI Consulting","Machine Learning"]
  }
];

const TrainerSpotlight = ({ openModal }) => (
  <section className="section-padding bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8 text-center lg:text-left">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6">
            Learn from the Best
          </div>
          <h2 className="heading-md md:text-3xl lg:heading-hero text-[var(--text-heading)] mb-6 leading-tight">
            Our Mentors Come from <span className="text-primary">Global Tech Leaders</span>
          </h2>
          <p className="text-body md:text-lg text-body">
            At {BRANDING.fullName}, you aren't taught by academics. You are mentored by engineers who have built the tools you use every day.
          </p>
        </div>
        <div
          onClick={() => openModal('Trainer Application', 'trainer')}
          className="group flex flex-col items-center lg:items-end text-center lg:text-right cursor-pointer"
        >
            <div className="flex -space-x-4 mb-4">
              {mentors.map((m, i) => (
                <div 
                  key={i} 
                  className="w-12 h-12 rounded-full border-2 border-[rgba(214,79,217,0.4)] overflow-hidden shadow-lg z-10"
                >
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            <div className="w-12 h-12 rounded-full border-4 border-[var(--bg-body)] bg-[var(--bg-inverted)] flex items-center justify-center shadow-lg">
              <span className="text-caption font-bold text-[var(--text-on-light)]">+10</span>
            </div>
          </div>
          <div className="flex items-center text-primary font-black uppercase tracking-widest text-small hover:underline">
            Join our teaching faculty <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mentors.map((mentor, index) => (
          <ScaleOnHover key={index}>
            <div className="bg-[var(--bg-card)] p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
              <div 
                className="w-full flex justify-center mb-6"
              >
                <div 
                  className="relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
                  style={{
                    background: 'rgba(214,79,217,0.06)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(214,79,217,0.2)',
                    boxShadow: '0 8px 32px rgba(214,79,217,0.1), inset 0 1px 0 rgba(255,255,255,0.06)'
                  }}
                >
                  <div className="mb-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[rgba(214,79,217,0.2)]">
                      <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest font-mono" style={{ color: '#d24bd5' }}>
                    {mentor.role}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-small font-bold text-[var(--text-muted)] mb-4">{mentor.company}</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-caption font-black uppercase tracking-wider rounded-lg border border-[var(--border-color)]">
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
);

export default TrainerSpotlight;
