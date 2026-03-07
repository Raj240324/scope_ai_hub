import React from 'react';
import { PlayCircle, Zap, Award } from 'lucide-react';

const GlobalReachSection = () => (
  <section className="py-20 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="heading-md mb-6">Learn From Anywhere. <span className="text-primary">Compete Everywhere.</span></h2>
        <p className="text-[var(--text-muted)] text-body-lg">
          Can't make it to our Chennai campus? Our immersive live online programs bring the classroom experience directly to you — no compromise on quality, interaction, or mentorship.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Live Interactive Classes", desc: "Real-time engagement with instructors and peers, just like a physical classroom.", icon: <PlayCircle className="h-8 w-8" /> },
          { title: "24/7 LMS Access", desc: "Lifetime access to recorded sessions, study materials, and project files through our portal.", icon: <Zap className="h-8 w-8" /> },
          { title: "Global Certification", desc: "Certificates recognized in USA, UK, Canada, Australia, UAE, and beyond.", icon: <Award className="h-8 w-8" /> },
        ].map((item, i) => (
          <div key={i} className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-xl transition-all group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-8 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h3 className="text-body-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3 sm:mb-4">{item.title}</h3>
            <p className="text-small sm:text-base text-body">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GlobalReachSection;
