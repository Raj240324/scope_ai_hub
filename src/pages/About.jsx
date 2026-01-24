import React from 'react';
import Layout from '../components/layout/Layout';
import { Target, Eye, Lightbulb, Users, ShieldCheck, Heart, ArrowRight, Award } from 'lucide-react';
import { useModal } from '../context/ModalContext';

import Hero from '../components/ui/Hero';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, ScrollCountUp } from '../components/utils/Animations';

const About = () => {
  const { openModal } = useModal();
  const stats = [
    { label: 'Successful Placements', value: '10,000+' },
    { label: 'Expert Trainers', value: '100+' },
    { label: 'Hiring Partners', value: '500+' },
    { label: 'Years of Excellence', value: '15+' },
  ];

  const locations = [
    { 
      name: "Maraimalai Nagar (Head Office)", 
      address: "1/92, Kannadasan 2nd St, NH3, Maraimalai Nagar - 603209",
      map: "https://goo.gl/maps/placeholder1",
      phone: "+91 63839 80415",
      type: "Main Campus"
    },
    { 
      name: "Chengalpattu Branch", 
      address: "G.S.T Road, Near New Bus Stand, Chengalpattu - 603001",
      map: "https://goo.gl/maps/placeholder2",
      phone: "+91 63839 80415",
      type: "Satellite Center"
    },
    { 
      name: "Online Training Center", 
      address: "Serving Students Globally (USA, UK, Middle East, Australia)",
      map: "#"
    }
  ];

  const values = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Industry Recognized",
      description: "Our courses are aligned with NASSCOM FutureSkills, ensuring you learn what the industry actually needs."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "100% Placement Support",
      description: "Dedicated placement cell with a track record of placing students in top Fortune 500 companies."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Outcome-Driven",
      description: "We focus on project-based learning. You don't just learn theory; you build production-ready applications."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Bilingual Instruction",
      description: "Breaking language barriers by explaining complex tech concepts in both Tamil (தமிழ்) and English."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Lead Instructor",
      bio: "15+ years of experience in Full Stack Development. Ex-Senior Architect at leading tech firms.",
      image: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
      name: "Anjali Devi",
      role: "Co-Founder & Design Head",
      bio: "Award-winning UI/UX designer with a passion for teaching human-centric design principles.",
      image: "https://i.pravatar.cc/150?u=anjali"
    },
    {
      name: "Vikram Singh",
      role: "Head of Placements",
      bio: "Career coach with 10+ years of experience in tech recruitment and corporate relations.",
      image: "https://i.pravatar.cc/150?u=vikram"
    }
  ];

  return (
    <Layout 
      title="About Us | Raj Software Training Institute"
      description="Learn about our mission to bridge the skill gap in the software industry. Meet our expert mentors and understand our teaching philosophy."
    >
      <Hero 
        title={<>Our Story: From a Small Classroom to <span className="text-primary">Chengalpattu's Top Institute</span>.</>}
        subtitle="We started in 2025 with just 10 students in Maraimalai Nagar. Our goal was simple: provide the same quality of training you get in Chennai's biggest institutes, but right here in our neighborhood."
      />

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  <ScrollCountUp end={stat.value} />
                </div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-md">How We Teach</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We don't believe in "reading form slides". Our classes are interactive discussions. We code together, debug together, and build together. We treat you like a junior developer from day one, not just a student.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-slate-700 font-medium">Curriculum updated every 3 months to match industry trends.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-slate-700 font-medium">Project-based learning from day one.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-slate-700 font-medium">Mentors who are active industry professionals.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Students collaborating" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-square bg-primary rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl shadow-primary/20">
                  <Lightbulb className="h-10 w-10 mb-4" />
                  <p className="font-bold text-lg leading-tight text-white">Innovation in every lesson.</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-slate-900 rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl shadow-slate-900/20">
                  <Target className="h-10 w-10 mb-4 text-primary-light" />
                  <p className="font-bold text-lg leading-tight text-white">Goal-oriented training.</p>
                </div>
                <div className="aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" alt="Classroom" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">Meet Our Mentors</h2>
            <p className="text-slate-600">
              Our team consists of industry veterans who are passionate about sharing their knowledge and helping you succeed.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="relative mb-8 inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
                    <img src={member.image} alt={member.name} className="relative h-24 w-24 rounded-full ring-4 ring-white shadow-lg object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-4">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Goal</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                To simplify tech education. We believe anyone can code if they are taught the right way - with patience, practical examples, and in a language they understand.
              </p>
            </div>
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-light" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">What Drivers Us</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Seeing a student from a rural background land a high-paying job in a top MNC. That success story is what motivates us every single day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">The Values We Live By</h2>
            <p className="text-slate-600">
              As a startup, our values define our culture and our commitment to our students.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6">Our <span className="text-primary">Presence</span></h2>
            <p className="text-base md:text-lg text-slate-600">
              We are expanding our reach to provide quality tech education across multiple locations and through our global online platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Target className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{loc.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{loc.address}</p>
                <button 
                  onClick={() => loc.map !== "#" ? window.open(loc.map, '_blank') : openModal()}
                  className="mt-6 text-primary font-bold text-sm flex items-center hover:underline"
                >
                  View on Map <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">Ready to Build Your Future?</h2>
              <p className="text-base md:text-lg text-white/80 mb-10">
                Join our next batch and start your journey towards becoming a skilled software professional with personalized mentorship.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => openModal()}
                  className="px-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => openModal()}
                  className="px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Talk to Counselor
                </button>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
