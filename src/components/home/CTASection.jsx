import React from 'react';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp } from '../../utils/motionVariants';
import { ArrowRight, Users } from 'lucide-react';

const CTASection = ({ openModal }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
  <section className="py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <m.div 
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="bg-[var(--bg-inverted)] light-surface rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-8 backdrop-blur-sm border border-primary/20">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <h2 className="heading-lg font-bold text-[var(--text-on-light)] mb-6">
            Confused About Your <span className="text-primary">Career Path</span>?
          </h2>
          <p className="text-body text-[var(--text-on-light)]/80 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Don't guess your future. Speak to our expert career counselors for a <strong className="text-primary border-b-2 border-primary/40">free 1:1 session</strong>. We'll analyze your skills and suggest the perfect roadmap for 2026.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <m.button
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('Career Counseling')}
              className="btn-primary text-small px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto shadow-xl flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
            >
              Book Free Session <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </m.button>
            <div className="text-left hidden sm:flex items-center space-x-4 bg-primary/10 px-6 py-3 rounded-xl border border-primary/20 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-body)]/50 overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 70}.jpg`} alt="Counselor" width={32} height={32} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-caption font-bold uppercase tracking-widest text-[var(--text-on-light)]/60">Available Now</p>
                <p className="text-caption font-bold text-[var(--text-on-light)]">3 Counselors Online</p>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  </section>
  );
};

export default CTASection;
