import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import { CheckCircle2, Briefcase, TrendingUp, Users, Building2, Quote, ArrowRight, Award } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp, Marquee } from '../components/utils/Animations';
import { BRANDING } from '../data/branding';

const placementStats = [
  { label: 'Grooming Success', value: 'Expert', icon: <Briefcase className="h-6 w-6 text-primary" /> },
  { label: 'Hiring Partners', value: '500+', icon: <Building2 className="h-6 w-6 text-primary" /> },
  { label: 'Highest Package', value: '24 LPA', icon: <TrendingUp className="h-6 w-6 text-primary" /> },
  { label: 'Students Placed', value: '10,000+', icon: <Users className="h-6 w-6 text-primary" /> },
];

const placementProcess = [
  {
    title: "Resume Building",
    description: "Expert guidance on creating professional resumes and LinkedIn profiles that stand out.",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />
  },
  {
    title: "Mock Interviews",
    description: "Regular technical and HR mock interviews with industry experts to build confidence.",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />
  },
  {
    title: "Soft Skills Training",
    description: "Workshops on communication, teamwork, and professional ethics.",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />
  },
  {
    title: "Job Referrals",
    description: "Direct referrals to our network of 50+ hiring partners and alumni connections.",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />
  }
];

const testimonials = [
  {
    name: "Senthil Kumar",
    company: "Zoho",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?u=senthil",
    quote: `The hands-on approach at ${BRANDING.fullName} is what sets them apart. I wasn't just learning syntax; I was building real products that helped me land a job at Zoho.`
  },
  {
    name: "Priya Dharshini",
    company: "Freshworks",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?u=priya",
    quote: "As a career switcher, I was nervous. But the mentors here guided me through every step of building my design portfolio, which Freshworks loved."
  },
  {
    name: "Rahul Verma",
    company: "TCS",
    role: "Systems Engineer",
    image: "https://i.pravatar.cc/150?u=rahul",
    quote: "The mock interviews and soft skills training were life-savers. They gave me the confidence to clear the TCS interview on my first attempt."
  },
  {
    name: "Akash Mehra",
    company: "Google",
    role: "Frontend Developer",
    quote: `The practical training and mock interviews at ${BRANDING.fullName} were instrumental in helping me land my dream job at Google.`
  }
];

const hiringPartners = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#4285F4" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", color: "#FF9900" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", color: "#737373" },
  { name: "Zoho", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Zoho-logo.svg", color: "#1F4591" },
  { name: "Freshworks", logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Freshworks-vector-logo.svg", color: "#00EEBD" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", color: "#004B8D" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", color: "#007CC3" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg", color: "#000000" }
];

const Placement = () => {
  const { openModal } = useModal();
  return (
    <Layout 
      title={`Placements | ${BRANDING.fullName} Training Institute`}
      description="Check our placement grooming process, hiring partners, and student success stories. We offer comprehensive placement guidance to all our students."
    >
      <Hero 
        badge={
          <div className="flex items-center space-x-2">
            <Award className="h-3 w-3" />
            <span>No.1 Placement Institute in Tamil Nadu</span>
          </div>
        }
        title={<>Guidance for Placement to <span className="text-primary">Get Your Job</span></>}
        subtitle="Launch your tech career with Tamil Nadu's most trusted mentor-led institute. We guide you for placement to help you get hired by top companies across Tamil Nadu's IT corridors."
      />

      {/* Regional Placement Success */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  Tamil Nadu IT Hubs
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">Dominating the <span className="text-primary">Regional</span> Tech Corridor.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  With 70% of our alumni working in the SIPCOT and IT parks across Tamil Nadu, we have established ourselves as the preferred talent partner for the state's tech giants.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="text-3xl font-black text-primary mb-1">7,000+</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Placed in OMR</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="text-3xl font-black text-white mb-1">200+</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hiring Partners in TN</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:bg-primary transition-all duration-500">
                  <Building2 className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                  <p className="font-bold text-sm">SIPCOT Siruseri Partnerships</p>
                </div>
                <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:bg-primary transition-all duration-500">
                  <Users className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                  <p className="font-bold text-sm">Tamil-English Interview Prep</p>
                </div>
                <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:bg-primary transition-all duration-500">
                  <Award className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                  <p className="font-bold text-sm">Regional Hiring Events</p>
                </div>
                <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:bg-primary transition-all duration-500">
                  <Briefcase className="h-10 w-10 text-primary mb-4 group-hover:text-white" />
                  <p className="font-bold text-sm">Direct Referrals to Zoho/TCS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {placementStats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    <ScrollCountUp end={stat.value} />
                  </div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Career Grooming Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container-custom">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest mb-8 shadow-lg shadow-primary/30">
                <Award className="h-4 w-4" />
                <span>Expert Career Grooming Program</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Your Path to a <span className="text-primary">Global Career.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-12 leading-relaxed">
                We offer specialized career grooming programs designed to make you industry-ready. Whether you are a fresh graduate, have a career gap, or are looking to switch from Non-IT to IT, we provide the preparation you need.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
                {[
                  "Intensive Career Prep",
                  "MNC Mock Interviews",
                  "Soft Skills Excellence",
                  "Resume Architecture",
                  "Hiring Partner Access",
                  "Technical Grooming",
                  "Portfolio Building",
                  "Post-Training Mentorship"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-slate-700 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => openModal()}
                className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/40"
              >
                Join Career Grooming Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Cell Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Dedicated <span className="text-primary">Placement Cell</span></h2>
              <p className="text-lg text-slate-600 mb-8">
                Our specialized placement cell acts as a bridge between our students and the corporate world. We don't just provide job leads; we prepare you to excel in every stage of the recruitment process.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Placement Guidance", desc: "Expert guidance for placement to help you get hired." },
                  { title: "Industry Connections", desc: "Direct access to 500+ hiring partners." },
                  { title: "Life-long Support", desc: "Career guidance even after your first placement." },
                  { title: "Global Opportunities", desc: "Referrals to international tech hubs." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" 
                  alt="Placement Cell" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-2xl md:text-3xl font-black text-primary">500+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our 4-Step Placement Process</h2>
            <p className="text-slate-400 text-lg">
              We provide end-to-end support to ensure you are fully prepared for the competitive job market.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {placementProcess.map((step, index) => (
              <StaggerItem key={index}>
                <div className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Our Hiring Partners</h2>
            <p className="text-slate-500">Our students are working in some of the most innovative companies worldwide.</p>
          </div>
        </div>
          
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <Marquee speed={30} className="py-4">
            <div className="flex items-center gap-16 px-8">
              {hiringPartners.map((partner) => (
                <div key={partner.name} className="h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `<span style="color: ${partner.color}" class="font-black text-2xl tracking-tight">${partner.name}</span>`;
                      }}
                    />
                  ) : (
                    <span style={{ color: partner.color }} className="font-black text-2xl tracking-tight uppercase">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Student Success Stories</h2>
            <p className="text-slate-600 text-lg">
              Hear directly from our alumni who have successfully transitioned into high-paying tech roles.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((story, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative">
                  <Quote className="absolute top-8 right-10 h-12 w-12 text-slate-100" />
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <img src={story.image} alt={story.name} className="h-20 w-20 rounded-2xl object-cover shadow-lg" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                      <p className="text-primary font-semibold text-sm">{story.role}</p>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{story.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed text-lg">
                    "{story.quote}"
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-12 text-center">
            <a href="/reviews" className="inline-flex items-center text-primary font-bold hover:underline">
              Read more student reviews <TrendingUp className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-primary/30">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">Ready to Start Your Success Story?</h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
              Join our next batch and get the training and support you need to land your dream job in tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => openModal()}
                className="px-10 py-5 bg-white text-primary font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl"
              >
                Enroll Now
              </button>
              <button 
                onClick={() => openModal()}
                className="px-10 py-5 bg-primary-dark border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
              >
                Get Free Counseling
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Placement;
