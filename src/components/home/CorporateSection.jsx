import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CorporateSection = ({ openModal }) => (
  <section className="py-20 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
    </div>
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-body)]/20 text-[var(--text-on-inverted)] text-xs font-bold uppercase tracking-wider mb-6">
            For Organizations
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Empower Your Workforce with <span className="text-primary">Corporate Training</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-on-inverted)]/70 mb-10 leading-relaxed">
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
                <p className="text-sm text-[var(--text-on-inverted)]/60">{item.desc}</p>
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
              <div className="h-48 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex items-center justify-center p-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={200} height={80} loading="lazy" className="w-full opacity-40 grayscale" />
              </div>
              <div className="h-64 rounded-2xl bg-[var(--bg-body)]/10 border border-[var(--bg-body)]/20 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-3xl md:text-4xl font-black text-[var(--text-on-inverted)] mb-2">25+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Organisations Trained</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="h-64 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-3xl md:text-4xl font-black text-[var(--text-on-inverted)] mb-2">500+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-on-inverted)]/60">Professionals Upskilled</div>
              </div>
              <div className="h-48 rounded-2xl bg-[var(--bg-body)]/5 border border-[var(--bg-body)]/10 flex items-center justify-center p-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" width={200} height={80} loading="lazy" className="w-full opacity-40 grayscale" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CorporateSection;
