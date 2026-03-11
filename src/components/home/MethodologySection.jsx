import React from 'react';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '../../utils/motionVariants';
import { Cpu, Code2, Users, GraduationCap } from 'lucide-react';
import { StackingCards } from '../utils/StackingCards';
import { Parallax } from '../utils/Animations';
import { BRANDING } from '../../data/branding';

const methodology = [
  { step:"01", title:"Master the Foundations", desc:"Expert-led, industry-aligned sessions that build deep understanding of AI and Cloud technologies.", icon: <Cpu className="h-6 w-6" />, color:"bg-blue-500" },
  { step:"02", title:"Practice with Real Systems", desc:"Hands-on labs and real-world projects designed to simulate industry environments.", icon: <Code2 className="h-6 w-6" />, color:"bg-purple-500" },
  { step:"03", title:"Create Industry-Grade Solutions", desc:"Develop advanced capstone projects that demonstrate your real-world problem-solving ability.", icon: <Users className="h-6 w-6" />, color:"bg-orange-500" },
  { step:"04", title:"Accelerate Your Career", desc:"End-to-end career support including mentorship, portfolio building, and placement guidance.", icon: <GraduationCap className="h-6 w-6" />, color:"bg-green-500" },
];

const MethodologySection = ({ openModal }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
  <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden border-b border-[var(--border-color)]">
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Parallax offset={20} className="absolute top-0 right-0 w-1/2 h-full z-0">
        <div className="w-full h-full bg-[var(--bg-secondary)]/50 -skew-x-12 translate-x-1/2" />
      </Parallax>
      <Parallax offset={-30} className="absolute bottom-0 left-0 w-64 h-64 z-0">
        <div className="w-full h-full bg-primary/10 rounded-full blur-3xl blur-layer" />
      </Parallax>
    </div>

    <div className="container-custom relative z-10">
      <m.div 
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="max-w-3xl mb-16"
      >
        <m.div variants={fadeUp} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
          The {BRANDING.fullName} Advantage
        </m.div>
        <m.h2 variants={fadeUp} className="heading-lg font-bold text-[var(--text-heading)] mb-6 leading-tight">
          Why We're the <span className="font-extrabold text-primary">Best Choice</span> for Your IT Career.
        </m.h2>
        <m.p variants={fadeUp} className="text-body-lg text-body">
          Our unique learning ecosystem is designed to provide you with the edge you need. From dedicated lab support to real-time industrial training, we ensure you're ready for the global tech stage.
        </m.p>
      </m.div>

      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <StackingCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodology.map((item, index) => (
            <m.div key={index} variants={index % 2 === 0 ? fadeLeft : fadeRight} className="h-full">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] relative z-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group">
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.color} flex items-center justify-center text-[var(--text-on-inverted)] shadow-lg shadow-black/20`}>
                  {item.icon}
                </div>
                <span className="heading-md font-bold text-[var(--text-muted)] opacity-30 group-hover:opacity-50 transition-opacity">
                  {item.step}
                </span>
              </div>
              <h3 className="heading-sm font-semibold text-[var(--text-heading)] mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] text-small leading-relaxed transition-colors">
                {item.desc}
              </p>
            </div>
            </m.div>
          ))}
        </StackingCards>
      </m.div>

      <div className="mt-16 pt-16 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-12 h-12 mx-auto rounded-full border border-[rgba(214,79,217,0.4)] bg-[rgba(214,79,217,0.1)] backdrop-blur-md flex items-center justify-center overflow-hidden shadow-sm"
              >
                <span className="text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#d24bd5] to-[#b833bb]" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  {['SM', 'RA', 'SA'][i-1]}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[var(--text-heading)] font-bold">1:1 Mentorship Available</p>
            <p className="text-[var(--text-muted)] text-small">Personal guidance from industry experts</p>
          </div>
        </div>
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="btn-primary px-10 py-4 shadow-xl shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
        >
          Start Your Transformation
        </m.button>
      </div>
    </div>
  </section>
  );
};

export default MethodologySection;
