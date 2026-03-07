import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScaleOnHover } from '../utils/Animations';
import { BRANDING } from '../../data/branding';

const mentors = [
  {
    name: "Sanjula",
    role: "Head of Academics",
    company: "8+ Years in AI & Data Science",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    expertise: ["Curriculum Design", "AI & Data Science"]
  },
  {
    name: "Raghavi",
    role: "Head – Placements & Corporate Relations",
    company: "Former Enterprise HR Professional",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    expertise: ["Placements", "Industry Partnerships"]
  },
  {
    name: "Suresh M",
    role: "Principal AI Consultant & Lead Trainer",
    company: "Enterprise AI Practitioner",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    expertise: ["AI Consulting", "Machine Learning"]
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--bg-body)] overflow-hidden shadow-lg">
                <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 60}.jpg`} alt="Trainer" width={48} height={48} />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-[var(--bg-body)] bg-[var(--bg-inverted)] flex items-center justify-center shadow-lg">
              <span className="text-caption font-bold text-[var(--text-on-inverted)]">+10</span>
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
              <div className="flex items-center space-x-4 mb-5 sm:mb-6">
                <img src={mentor.image} alt={mentor.name} width={64} height={64} loading="lazy" className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl object-cover shadow-md" />
                <div>
                  <h3 className="text-body-lg sm:text-xl font-bold text-[var(--text-heading)] leading-tight">{mentor.name}</h3>
                  <p className="text-primary font-bold text-caption uppercase tracking-wider mt-1">{mentor.role}</p>
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
