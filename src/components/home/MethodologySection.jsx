import React from 'react';
import { Cpu, Code2, Users, GraduationCap } from 'lucide-react';
import { StaggerItem, Parallax } from '../utils/Animations';
import { StackingCards } from '../utils/StackingCards';
import { BRANDING } from '../../data/branding';

const methodology = [
  { step: "01", title: "Master the Foundations", desc: "Expert-led, industry-aligned sessions that build deep understanding of AI and Cloud technologies.", icon: <Cpu className="h-6 w-6" />, color: "bg-blue-500" },
  { step: "02", title: "Practice with Real Systems", desc: "Hands-on labs and real-world projects designed to simulate industry environments.", icon: <Code2 className="h-6 w-6" />, color: "bg-purple-500" },
  { step: "03", title: "Create Industry-Grade Solutions", desc: "Develop advanced capstone projects that demonstrate your real-world problem-solving ability.", icon: <Users className="h-6 w-6" />, color: "bg-orange-500" },
  { step: "04", title: "Accelerate Your Career", desc: "End-to-end career support including mentorship, portfolio building, and placement guidance.", icon: <GraduationCap className="h-6 w-6" />, color: "bg-green-500" },
];

const MethodologySection = ({ openModal }) => (
  <section className="py-24 bg-[var(--bg-body)] relative border-b border-[var(--border-color)]">
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Parallax offset={20} className="absolute top-0 right-0 w-1/2 h-full z-0">
        <div className="w-full h-full bg-[var(--bg-secondary)]/50 -skew-x-12 translate-x-1/2" />
      </Parallax>
      <Parallax offset={-30} className="absolute bottom-0 left-0 w-64 h-64 z-0">
        <div className="w-full h-full bg-primary/10 rounded-full blur-[120px]" />
      </Parallax>
    </div>

    <div className="container-custom relative z-10">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
          The {BRANDING.fullName} Advantage
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-6 leading-tight">
          Why We're the <span className="text-primary">Best Choice</span> for Your IT Career.
        </h2>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          Our unique learning ecosystem is designed to provide you with the edge you need. From dedicated lab support to real-time industrial training, we ensure you're ready for the global tech stage.
        </p>
      </div>

      <StackingCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {methodology.map((item, index) => (
          <StaggerItem key={index} className="h-full">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] relative z-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group">
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                  {item.icon}
                </div>
                <span className="text-2xl sm:text-4xl font-black text-[var(--text-muted)] opacity-20 group-hover:opacity-40 transition-opacity">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed transition-colors">
                {item.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StackingCards>

      <div className="mt-16 pt-16 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--bg-card)] overflow-hidden">
                <img src={`https://randomuser.me/api/portraits/men/${i + 50}.jpg`} alt="Mentor" width={48} height={48} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-[var(--text-heading)] font-bold">1:1 Mentorship Available</p>
            <p className="text-[var(--text-muted)] text-sm">Personal guidance from industry experts</p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary px-10 py-4 shadow-xl shadow-primary/20"
        >
          Start Your Transformation
        </button>
      </div>
    </div>
  </section>
);

export default MethodologySection;
