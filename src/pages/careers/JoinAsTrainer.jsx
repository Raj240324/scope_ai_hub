import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Briefcase, GraduationCap, Globe, Zap, CheckCircle2, Users } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';

const JoinAsTrainer = () => {
  const { openModal } = useModal();

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Flexibility",
      description: "Choose between weekday, evening, or weekend batches to suit your professional schedule."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Pedagogical Support",
      description: "Access our pre-built course materials, slide decks, and project repositories."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Reach",
      description: "Train students from across the world in our remote-first online hybrid classrooms."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Industry Networking",
      description: "Connect with other expert mentors and lead workshops for our 500+ hiring partners."
    }
  ];

  return (
    <Layout>
      <Hero 
        title={<>Empower the Next Generation of <span className="text-primary">Tech Leaders</span></>}
        subtitle={`Join ${BRANDING.fullName} as a Mentor. Share your expertise, guide students through real-world projects, and help bridge the industry-academia gap.`}
      />

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4 text-slate-900">Why Teach at {BRANDING.fullName}?</h2>
            <p className="text-slate-600">We are more than just a training institute; we are an innovation hub where industry veterans shape the future of tech talent.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all hover:shadow-lg">
                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">Who we are <span className="text-primary">looking for.</span></h2>
              <div className="space-y-6">
                {[
                  "Industry experience of at least 5+ years in your specialization.",
                  "A passion for mentoring and simplifying complex technical concepts.",
                  "Experience with real-world production-scale projects.",
                  "Ability to commit to at least 4-6 hours per week.",
                  "Strong communication skills in English (Tamil is a plus for local batches)."
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <p className="text-slate-300 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6">Apply to be a Mentor</h3>
              <p className="text-slate-400 mb-8">Tell us about your expertise and we'll reach out to schedule a technical discussion.</p>
              <button 
                onClick={() => openModal('Trainer Application', 'trainer')}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-black tracking-widest uppercase transition-all shadow-xl shadow-primary/20"
              >
                Submit Application
              </button>
              <p className="text-center text-slate-500 text-xs mt-6">All mentors are required to sign a professional NDA upon joining.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JoinAsTrainer;
