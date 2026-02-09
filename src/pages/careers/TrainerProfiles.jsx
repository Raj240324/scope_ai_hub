import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Github, Linkedin, Mail, Award, Briefcase } from 'lucide-react';
import { BRANDING } from '../../data/branding';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/utils/Animations';

const TrainerProfiles = () => {
  const trainers = [
    {
      name: "Rajesh Kumar",
      role: "Lead Trainer - Full Stack Development",
      image: "https://i.pravatar.cc/300?img=12",
      expertise: ["React.js", "Node.js", "MongoDB", "AWS", "System Design"],
      experience: "8+ years",
      companies: ["Amazon", "Flipkart"],
      bio: "Rajesh is a full-stack engineer with extensive experience in building scalable web applications. He has worked on multiple high-traffic platforms at Amazon and led engineering teams at Flipkart. His teaching style focuses on real-world problem-solving and industry best practices.",
      education: "B.Tech in Computer Science, IIT Madras",
      achievements: [
        "Built microservices handling 10M+ daily requests",
        "Speaker at React Conf India 2023",
        "Mentored 500+ students to successful placements"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "rajesh@scopeaihub.com"
    },
    {
      name: "Priya Sharma",
      role: "Senior Trainer - Data Science & AI/ML",
      image: "https://i.pravatar.cc/300?img=47",
      expertise: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
      experience: "10+ years",
      companies: ["Google", "Microsoft"],
      bio: "Priya is an AI/ML expert who has worked on cutting-edge machine learning projects at Google and Microsoft. She specializes in Natural Language Processing and has published multiple research papers. Her courses blend theoretical rigor with hands-on implementation.",
      education: "M.S. in Artificial Intelligence, Stanford University",
      achievements: [
        "Published 12 research papers in AI conferences",
        "Developed ML models used by 100M+ users",
        "AWS Certified Machine Learning Specialist"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "priya@scopeaihub.com"
    },
    {
      name: "Arun Venkatesh",
      role: "Trainer - Cloud Computing & DevOps",
      image: "https://i.pravatar.cc/300?img=33",
      expertise: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
      experience: "7+ years",
      companies: ["Infosys", "TCS"],
      bio: "Arun is a certified cloud architect with hands-on experience in deploying and managing large-scale infrastructure on AWS and Azure. He has helped organizations migrate legacy systems to cloud-native architectures. His training emphasizes cost optimization and security best practices.",
      education: "B.E in Electronics, Anna University",
      achievements: [
        "AWS Certified Solutions Architect Professional",
        "Managed cloud infrastructure costing $2M+/year",
        "Trainer of the Year 2024 (Internal Award)"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "arun@scopeaihub.com"
    },
    {
      name: "Kavya Reddy",
      role: "Trainer - UI/UX Design",
      image: "https://i.pravatar.cc/300?img=44",
      expertise: ["Figma", "Adobe XD", "Design Systems", "User Research", "Prototyping"],
      experience: "6+ years",
      companies: ["Swiggy", "Zomato"],
      bio: "Kavya is a product designer who has shaped user experiences for millions of users at Swiggy and Zomato. She believes design is not just about aesthetics but solving real user problems. Her courses cover the entire design thinking process from research to final handoff.",
      education: "B.Des in Interaction Design, NID Ahmadabad",
      achievements: [
        "Redesigned Swiggy's checkout flow increasing conversion by 18%",
        "Mentor at Google UX Design Certificate Program",
        "Featured in 'Top 50 Designers in India' list"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "kavya@scopeaihub.com"
    },
    {
      name: "Vikram Singh",
      role: "Trainer - Cyber Security",
      image: "https://i.pravatar.cc/300?img=51",
      expertise: ["Ethical Hacking", "Penetration Testing", "Network Security", "SIEM", "Incident Response"],
      experience: "9+ years",
      companies: ["Deloitte", "PwC"],
      bio: "Vikram is a certified ethical hacker (CEH) with extensive experience in vulnerability assessment and penetration testing for Fortune 500 companies. He has identified critical security flaws in major financial institutions. His teaching approach makes complex security concepts accessible to beginners.",
      education: "M.Tech in Cyber Security, IIT Delhi",
      achievements: [
        "CEH, OSCP, CISSP certified",
        "Discovered vulnerabilities in 50+ enterprise systems",
        "Guest lecturer at IIT Delhi and NIT Trichy"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "vikram@scopeaihub.com"
    },
    {
      name: "Sneha Patel",
      role: "Trainer - Mobile App Development",
      image: "https://i.pravatar.cc/300?img=32",
      expertise: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Firebase"],
      experience: "5+ years",
      companies: ["Paytm", "PhonePe"],
      bio: "Sneha is a mobile engineer who has built fintech applications used by millions. She specializes in cross-platform development with React Native and Flutter. Her courses emphasize performance optimization, offline-first architecture, and app store deployment strategies.",
      education: "B.Tech in Information Technology, VIT Vellore",
      achievements: [
        "Built mobile apps with 10M+ downloads",
        "React Native conference speaker",
        "Published 5 apps on App Store and Play Store"
      ],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "sneha@scopeaihub.com"
    }
  ];

  return (
    <Layout 
      title={`Meet Our Trainers | Expert Mentors at ${BRANDING.fullName}`}
      description="Learn from industry veterans at ScopeAIHub. Our trainers have worked at Google, Amazon, Microsoft, and top Indian startups. Get mentored by the best."
    >
      <Hero 
        title={<>Learn from <span className="text-primary">Industry Experts</span></>}
        subtitle="Our trainers aren't just teachers—they're active industry professionals who bring real-world experience to the classroom. Get mentored by engineers, designers, and architects from top tech companies."
      />

      <div className="container-custom section-padding">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { value: "15+", label: "Expert Trainers" },
            { value: "120+", label: "Combined Years Experience" },
            { value: "500+", label: "Students Mentored" },
            { value: "95%", label: "Student Satisfaction" }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Trainer Profiles */}
        <StaggerContainer className="space-y-16">
          {trainers.map((trainer, index) => (
            <StaggerItem key={index}>
              <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row`}>
                {/* Image Section */}
                <div className="lg:w-1/3 relative bg-gradient-to-br from-primary/10 to-blue-100 p-12 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                    <img 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="relative h-48 w-48 rounded-full object-cover ring-8 ring-white shadow-2xl"
                    />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 text-center mb-2">{trainer.name}</h3>
                  <p className="text-primary font-bold text-center mb-6">{trainer.role}</p>
                  <div className="flex space-x-4">
                    <a href={trainer.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors text-slate-600">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={trainer.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors text-slate-600">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${trainer.email}`} className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors text-slate-600">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-8 md:p-12">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-bold text-slate-900">{trainer.experience}</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-slate-600">{trainer.education}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6">{trainer.bio}</p>

                  {/* Companies */}
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Previous Companies</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.companies.map((company, i) => (
                        <span key={i} className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-lg">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Notable Achievements</h4>
                    <ul className="space-y-2">
                      {trainer.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-slate-600">
                          <span className="text-accent-success mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 bg-gradient-to-br from-navy to-primary-dark rounded-3xl text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Want to Learn from These Experts?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join our next batch and get personalized mentorship from industry veterans who are passionate about teaching.
          </p>
          <a href="/admissions" className="inline-block px-10 py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl transition-all shadow-xl shadow-primary/30">
            Enroll Now
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerProfiles;
