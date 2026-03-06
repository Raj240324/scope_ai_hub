import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const CTASection = ({ openModal }) => (
  <section className="py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <div className="bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 text-[var(--text-on-inverted)] text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-3xl blur-layer" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl blur-layer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-8 backdrop-blur-sm border border-primary/20">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 text-[var(--text-on-inverted)]">Confused About Your <span className="text-primary">Career Path</span>?</h2>
          <p className="text-base sm:text-xl text-[var(--text-on-inverted)]/80 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Don't guess your future. Speak to our expert career counselors for a <span className="font-bold text-primary border-b-2 border-primary/40">free 1:1 session</span>. We'll analyze your skills and suggest the perfect roadmap for 2026.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => openModal('Career Counseling')}
              className="bg-primary text-white font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-2xl hover:opacity-90 transition-all flex items-center shadow-xl text-base sm:text-lg group w-full sm:w-auto justify-center"
            >
              Book Free Session <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-left hidden sm:flex items-center space-x-4 bg-primary/10 px-6 py-3 rounded-xl border border-primary/20 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-body)]/50 overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 70}.jpg`} alt="Counselor" width={32} height={32} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Available Now</p>
                <p className="text-xs font-bold text-[var(--text-on-inverted)]">3 Counselors Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
