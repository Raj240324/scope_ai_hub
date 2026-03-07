import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CorporateSection = ({ openModal }) => (
  <section className="py-20 dark-section text-[var(--text-on-inverted)]">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl blur-layer" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl blur-layer" />
    </div>
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex glass-card items-center space-x-2 px-3 py-1 rounded-full text-[var(--text-on-inverted)] text-caption font-bold uppercase tracking-wider mb-6">
            For Organizations
          </div>
          <h2 className="heading-lg font-bold text-[var(--text-on-inverted)] mb-6 leading-tight">
            Empower Your Workforce with <span className="font-extrabold text-primary">Corporate Training</span>
          </h2>
          <p className="text-body md:text-lg text-[var(--text-on-inverted)]/70 mb-10 leading-relaxed">
            We provide customized training solutions for corporate teams to stay ahead in the rapidly evolving tech landscape. From upskilling in AI/ML to Cloud transformations.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            {[
              { title: "Customized Curriculum", desc: "Tailored to your business needs." },
              { title: "Expert Instructors", desc: "Industry veterans with deep expertise." },
              { title: "Flexible Delivery", desc: "On-site, remote, or hybrid options." },
              { title: "Scalable Solutions", desc: "For teams of 10 to 1000+ employees." }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-[var(--text-on-inverted)] flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-[var(--text-on-inverted)]/80 mr-2" />
                  {item.title}
                </h4>
                <p className="text-small text-[var(--text-on-inverted)]/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => openModal('Corporate Training')}
            className="btn-primary px-10 py-4"
          >
            Inquire for Corporate Training
          </button>
        </div>
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="glass-card h-48 flex items-center justify-center p-8">
                <img src="https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1731911497387" alt="Google" width={200} height={80} loading="lazy" className="w-full opacity-90 dark:opacity-100" />
              </div>
              <div className="glass-card h-64 flex flex-col items-center justify-center p-8 text-center">
                <div className="heading-md font-bold text-[var(--text-on-inverted)] mb-2">25+</div>
                <div className="text-small font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/70">Organisations Trained</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="glass-card h-64 flex flex-col items-center justify-center p-8 text-center">
                <div className="heading-md font-bold text-[var(--text-on-inverted)] mb-2">500+</div>
                <div className="text-small font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/70">Professionals Upskilled</div>
              </div>
              <div className="glass-card h-48 flex items-center justify-center p-8">
                <img src="https://cdn.brandfetch.io/idawOgYOsG/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1747149760488" alt="Amazon" width={200} height={80} loading="lazy" className="w-full opacity-90 dark:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CorporateSection;
