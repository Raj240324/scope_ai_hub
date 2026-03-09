import React from 'react';
import { Code2, Users, Building2, CheckCircle2, Briefcase } from 'lucide-react';
import { ScaleOnHover } from '../utils/Animations';

const PlacementSection = ({ openModal }) => (
  <section className="py-20 bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl blur-layer" />
    <div className="container-custom relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
          <Briefcase className="h-3 w-3" />
          <span>100% Placement Support</span>
        </div>
        <h2 className="heading-lg font-semibold text-[var(--text-heading)] mb-6 leading-tight">
          Your Success is <span className="text-primary">Our Commitment</span>
        </h2>
        <p className="text-body-lg">
          We don't just train you—we prepare you for the real world. Our comprehensive placement support ensures you're completely job-ready when you complete your course.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {[
          { phase: "Phase 1", title: "Technical Grooming", icon: <Code2 className="h-6 w-6" />, items: ["Advanced DSA & problem-solving sessions", "System design fundamentals", "Live coding practice with real-time feedback", "Code review and optimization techniques", "Portfolio project development"], color: "from-blue-500 to-cyan-600" },
          { phase: "Phase 2", title: "Interview Preparation", icon: <Users className="h-6 w-6" />, items: ["Mock interviews (Technical + HR rounds)", "Resume building & LinkedIn profile optimization", "Communication & soft skills training", "Salary negotiation strategies", "Company-specific interview patterns"], color: "from-purple-500 to-pink-600" },
          { phase: "Phase 3", title: "Job Connections", icon: <Building2 className="h-6 w-6" />, items: ["Direct referrals to 75+ recruitment partners", "Exclusive campus placement drives", "Job portal guidance (Naukri, LinkedIn)", "Startup & MNC connections", "Ongoing support until placement"], color: "from-orange-500 to-red-600" },
        ].map((phase, i) => (
          <ScaleOnHover key={i}>
            <div className="bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border-color)] hover:shadow-2xl transition-all h-full">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-5 sm:mb-6 text-white shadow-lg`}>
                {phase.icon}
              </div>
              <div className="text-caption sm:text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">{phase.phase}</div>
              <h3 className="heading-sm font-semibold mb-4 sm:mb-6">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
                    <span className="text-[var(--text-muted)] text-small leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScaleOnHover>
        ))}
      </div>

      <div className="bg-[var(--bg-inverted)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-[var(--text-on-inverted)]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="heading-md font-semibold text-[var(--text-on-inverted)] mb-6">
              What Does <span className="text-primary">"100% Placement Support"</span> Mean?
            </h3>
            <div className="space-y-4">
              {[
                { title: "Complete Job Readiness", desc: "We ensure you have all the technical and soft skills needed to crack interviews." },
                { title: "Continuous Support", desc: "We don't stop until you land your dream role—unlimited mock interviews and resume iterations." },
                { title: "Direct Company Connections", desc: "Access to exclusive job opportunities through our recruitment partnerships." },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-on-inverted)] mb-1">{item.title}</h4>
                    <p className="text-[var(--text-on-inverted)]/75 text-small">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {[
              { value: "8L+ Avg", label: "Average salary package of placed students" },
              { value: "90%+", label: "Placement success rate across all batches" },
              { value: "75+", label: "Active hiring partner companies across India" },
            ].map((stat, i) => (
              <div key={i} className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6">
                <div className="heading-md font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-caption text-[var(--text-on-inverted)]/75 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-10 border-t border-primary/10 text-center">
          <p className="text-[var(--text-on-inverted)]/75 text-small mb-6">
            <span className="text-primary font-bold">Important Note:</span> While we provide comprehensive placement assistance, final selection depends on your performance in interviews and company requirements. We prepare you thoroughly to maximize your success rate.
          </p>
          <button
            onClick={() => openModal('Placement Inquiry')}
            className="btn-primary text-small px-6 sm:px-10 py-3 sm:py-4 shadow-xl"
          >
            Learn More About Placement Support
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default PlacementSection;
