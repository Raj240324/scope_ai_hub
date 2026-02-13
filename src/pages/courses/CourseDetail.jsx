import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { courses } from '../../data/courses';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';
import { 
  Clock, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  CheckCircle2, 
  Award, 
  Terminal,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Target,
  FileCheck,
  Zap,
  Tag,
  HelpCircle,
  Code2
} from 'lucide-react';



const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find(c => c.slug === slug);
  const { openModal } = useModal();
  const [activeModule, setActiveModule] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll to update active tab and progress
  useEffect(() => {
    const handleScroll = () => {
      // Update active tab
      const sections = ['overview', 'curriculum', 'projects', 'instructor', 'faq'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveTab(current);

      // Update scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <Layout 
      title={`${course.title} | ${BRANDING.fullName}`}
      description={course.shortDescription}
      immersive={true}
    >
      <section className="relative bg-[var(--bg-inverted)] pt-32 md:pt-40 pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 bg-[var(--bg-inverted)]">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[150px] animate-pulse duration-700" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[150px] animate-pulse delay-1000 duration-700" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            <div className="inline-flex items-center space-x-2 bg-[var(--bg-body)]/5 backdrop-blur-md border border-[var(--bg-body)]/10 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[var(--text-on-inverted)] uppercase tracking-widest">New Batch: Feb 15, 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[var(--text-on-inverted)] mb-8 tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {course.title}
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-[var(--text-on-inverted)]/60 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
               <div className="px-6 py-3 bg-[var(--bg-body)]/5 backdrop-blur-sm border border-[var(--bg-body)]/10 rounded-2xl flex flex-col items-center min-w-[120px]">
                  <span className="text-xs text-[var(--text-on-inverted)]/60 uppercase tracking-widest font-bold mb-1">Duration</span>
                  <span className="text-lg font-black text-[var(--text-on-inverted)]">{course.duration}</span>
               </div>
               <div className="px-6 py-3 bg-[var(--bg-body)]/5 backdrop-blur-sm border border-[var(--bg-body)]/10 rounded-2xl flex flex-col items-center min-w-[120px]">
                  <span className="text-xs text-[var(--text-on-inverted)]/60 uppercase tracking-widest font-bold mb-1">Method</span>
                  <span className="text-lg font-black text-[var(--text-on-inverted)]">{course.mode}</span>
               </div>
               <div className="px-6 py-3 bg-[var(--bg-body)]/5 backdrop-blur-sm border border-[var(--bg-body)]/10 rounded-2xl flex flex-col items-center min-w-[120px]">
                  <span className="text-xs text-[var(--text-on-inverted)]/60 uppercase tracking-widest font-bold mb-1">Level</span>
                  <span className="text-lg font-black text-[var(--text-on-inverted)]">{course.level}</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
              <button 
                onClick={() => openModal(course.title)}
                className="group relative px-12 py-5 bg-[var(--bg-body)] text-[var(--text-heading)] rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[var(--bg-body)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              
              <button 
                onClick={() => document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-transparent hover:bg-[var(--bg-body)]/5 text-[var(--text-on-inverted)] border border-[var(--bg-body)]/20 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95"
              >
                View Syllabus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Sticky Header - Adjusted top for fixed main header */}
      <div className={`sticky top-[64px] md:top-[72px] z-40 transition-all duration-300 ${scrollProgress > 5 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-[var(--bg-body)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-lg">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-[var(--text-heading)] hidden md:block truncate">{course.title}</h2>
              <div className="flex-1 md:flex-none flex items-center space-x-4 md:space-x-6 overflow-x-auto no-scrollbar">
                {['Overview', 'Curriculum', 'Projects', 'Instructor', 'FAQ'].map(tab => (
                  <a 
                    key={tab} 
                    href={`#${tab.toLowerCase()}`}
                    className={`text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                      activeTab === tab.toLowerCase() ? 'text-primary' : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                    }`}
                  >
                    {tab}
                  </a>
                ))}
              </div>
              <button
                onClick={() => openModal(course.title)}
                className="hidden sm:block bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                Enroll Now
              </button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--border-color)] w-full">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="container-custom py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-24">
            
            {/* Overview - Bento Grid Layout */}
            <div id="overview" className="scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Main Value Prop - Span 2 cols */}
                <div className="md:col-span-2 bg-[var(--bg-card)] p-8 lg:p-10 rounded-[2.5rem] border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-[var(--text-heading)] mb-6 tracking-tight">
                       Why learn <span className="text-primary">{course.title}?</span>
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed font-medium">
                      {course.longDescription}
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                </div>

                {/* Salary/Stats Card */}
                <div className="bg-[var(--bg-inverted)] p-8 lg:p-10 rounded-[2.5rem] text-[var(--text-on-inverted)] flex flex-col justify-center relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest">High Demand</span>
                      </div>
                      <p className="text-4xl lg:text-5xl font-black mb-2">₹12 LPA</p>
                      <p className="text-[var(--text-on-inverted)]/60 font-medium">Avg. Salary Potential</p>
                   </div>
                </div>

                {/* Prerequisites Card */}
                <div className="bg-[var(--bg-card)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-sm flex flex-col justify-center group hover:border-primary/20 transition-colors">
                   <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                      <Zap className="h-5 w-5" />
                   </div>
                   <h3 className="text-lg font-black text-[var(--text-heading)] mb-4">Prerequisites</h3>
                   <ul className="space-y-2">
                      {course.prerequisites?.map((item, i) => (
                        <li key={i} className="flex items-start text-sm font-bold text-[var(--text-muted)]">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                   </ul>
                </div>

                {/* Tools Stack - Span 2 cols */}
                <div className="md:col-span-2 bg-[var(--bg-secondary)] p-8 lg:p-10 rounded-[2.5rem] border border-[var(--border-color)] relative overflow-hidden group">
                   <h3 className="text-xl font-black text-[var(--text-heading)] mb-6 flex items-center relative z-10">
                      <FileCheck className="h-5 w-5 text-primary mr-3" />
                      Tools You Will Master
                   </h3>
                   <div className="flex flex-wrap gap-3 relative z-10">
                      {course.tools?.map((tool, i) => (
                        <span key={i} className="px-5 py-3 bg-[var(--bg-card)] text-[var(--text-muted)] rounded-xl text-xs font-black border border-[var(--border-color)] uppercase tracking-wider hover:bg-[var(--bg-inverted)] hover:text-[var(--text-on-inverted)] hover:border-[var(--text-heading)] hover:-translate-y-1 transition-all cursor-default shadow-sm">
                          {tool}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Curriculum - Modern Accordion */}
            <div id="curriculum" className="scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                   <h2 className="text-3xl md:text-4xl font-black text-[var(--text-heading)] mb-4 tracking-tight">Structured <span className="text-primary">Curriculum</span></h2>
                   <p className="text-[var(--text-muted)] font-medium">Designed for absolute beginners to advanced pros.</p>
                </div>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg text-xs font-bold text-[var(--text-muted)]">
                      {course.syllabus?.length || 0} Modules
                   </div>
                   <div className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg text-xs font-bold text-[var(--text-muted)]">
                      {course.duration}
                   </div>
                </div>
              </div>

              <div className="relative border-l-2 border-[var(--border-color)] ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
                {course.syllabus?.map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[41px] md:-left-[59px] top-6 h-6 w-6 rounded-full border-4 border-[var(--bg-body)] transition-all duration-500 ${activeModule === index ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-[var(--border-color)] group-hover:bg-primary/50'}`}></div>
                    
                    <div 
                      className={`cursor-pointer rounded-[2rem] border transition-all duration-500 overflow-hidden ${activeModule === index ? 'bg-[var(--bg-card)] border-primary/20 shadow-xl' : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--text-muted)]/30 hover:shadow-lg'}`}
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                    >
                      <div className="p-6 md:p-8 flex items-center justify-between">
                         <div>
                            <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">Module 0{index + 1}</span>
                            <h4 className="text-xl font-bold text-[var(--text-heading)] group-hover:text-primary transition-colors">{item.module}</h4>
                            <p className="text-sm text-[var(--text-muted)] font-medium mt-1">{item.duration} • {item.topics?.length} Lessons</p>
                         </div>
                         <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-transform duration-500 ${activeModule === index ? 'rotate-180 bg-primary/10 text-primary' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}`}>
                            <ChevronDown className="h-5 w-5" />
                         </div>
                      </div>
                      
                      {activeModule === index && (
                          <div className="px-6 pb-8 md:px-8 md:pb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                             <div className="h-px bg-[var(--border-color)] mb-6"></div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.topics?.map((topic, i) => (
                                   <div key={i} className="flex items-start">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 mt-1 shrink-0" />
                                      <span className="text-sm font-medium text-[var(--text-muted)]">{topic}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div id="projects" className="scroll-mt-32">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Real World Experience</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-12 tracking-tight leading-tight">
                Hands-on Capstone Projects
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {course.projects?.map((project, i) => (
                  <div key={i} className="group p-6 md:p-10 lg:p-12 bg-[var(--bg-card)] rounded-2xl md:rounded-[3rem] border border-[var(--border-color)] hover:border-primary/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--bg-secondary)] rounded-full -mr-32 -mt-32 group-hover:bg-primary/5 transition-colors duration-700"></div>
                    
                    <div className="h-16 w-16 md:h-24 md:w-24 shrink-0 bg-[var(--bg-secondary)] rounded-2xl md:rounded-[2rem] flex items-center justify-center group-hover:bg-[var(--bg-inverted)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 shadow-inner relative z-10">
                      <Zap className="h-6 w-6 md:h-10 md:w-10 text-[var(--text-muted)] group-hover:text-[var(--text-on-inverted)] transition-colors" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">Project {i + 1}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Industry Standard</span>
                      </div>
                      <h4 className="text-xl lg:text-2xl font-black text-[var(--text-heading)] mb-4 tracking-tight group-hover:text-primary transition-colors">{project.title}</h4>
                      <p className="text-[var(--text-muted)] text-base leading-relaxed font-medium">
                        {project.description}
                      </p>
                      
                      <div className="mt-8 flex flex-wrap gap-2">
                        {course.tools?.slice(0, 3).map((tool, idx) => (
                          <span key={idx} className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border border-[var(--border-color)] px-3 py-1 rounded-lg">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="hidden lg:block">
                      <div className="h-12 w-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ArrowRight className="h-6 w-6 text-[var(--text-muted)] group-hover:text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div id="instructor" className="scroll-mt-32">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Your Mentor</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-10 tracking-tight leading-tight">
                Learn from the Experts
              </h2>
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12 p-6 md:p-10 lg:p-16 bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3.5rem] text-[var(--text-on-inverted)] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />
                
                <div className="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto md:mx-0">
                  <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-700 opacity-20 blur-xl"></div>
                  <div className="absolute inset-0 bg-[var(--bg-body)]/10 rounded-[3rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-700"></div>
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-2 border-[var(--bg-body)]/20 shadow-2xl">
                    <img 
                      src={course.instructor?.avatar || 'https://via.placeholder.com/400x400?text=Instructor'} 
                      alt={course.instructor?.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-[var(--text-on-inverted)] h-14 w-14 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center animate-bounce duration-[3000ms] border-4 border-[var(--text-heading)]">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="text-center md:text-left flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center space-x-2 text-primary font-black text-sm uppercase tracking-[0.3em] mb-4">
                    <span className="h-1 w-8 bg-primary rounded-full"></span>
                    <span>Chief Instructor</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 tracking-tight">{course.instructor?.name}</h4>
                  <p className="text-primary font-bold text-lg mb-8 leading-relaxed">{course.instructor?.role}</p>
                  <div className="relative">
                    <span className="absolute -top-6 -left-6 text-6xl text-[var(--text-on-inverted)]/5 font-serif">"</span>
                    <p className="text-[var(--text-on-inverted)]/70 leading-relaxed text-lg font-medium italic relative z-10">
                      {course.instructor?.bio}
                    </p>
                    <span className="absolute -bottom-10 -right-6 text-6xl text-[var(--text-on-inverted)]/5 font-serif">"</span>
                  </div>
                  
                  <div className="mt-12 flex items-center justify-center md:justify-start space-x-8">
                    <div className="text-center md:text-left">
                      <span className="text-[10px] font-black text-[var(--text-on-inverted)]/40 uppercase tracking-widest block mb-1">Experience</span>
                      <span className="text-xl font-black text-[var(--text-on-inverted)]">10+ Years</span>
                    </div>
                    <div className="h-8 w-px bg-[var(--bg-body)]/10"></div>
                    <div className="text-center md:text-left">
                      <span className="text-[10px] font-black text-[var(--text-on-inverted)]/40 uppercase tracking-widest block mb-1">Students</span>
                      <span className="text-xl font-black text-[var(--text-on-inverted)]">5000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="scroll-mt-32">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Support</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-12 tracking-tight leading-tight">
                Common Questions
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {course.faqs?.map((faq, index) => (
                  <div 
                    key={index}
                    className={`group border rounded-[2rem] transition-all duration-700 ${activeFaq === index ? 'border-primary shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] bg-[var(--bg-card)]' : 'border-[var(--border-color)] bg-[var(--bg-secondary)]/30 hover:bg-[var(--bg-card)] hover:border-[var(--border-color)]'}`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-5 md:p-8 lg:p-10 text-left transition-all group/faqbtn"
                    >
                      <span className={`text-base md:text-xl font-black tracking-tight transition-all duration-500 ${activeFaq === index ? 'text-primary md:translate-x-2' : 'text-[var(--text-heading)] group-hover/faqbtn:text-primary'}`}>
                        {faq.question}
                      </span>
                      <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-700 shrink-0 ${activeFaq === index ? 'bg-primary text-[var(--text-on-inverted)] rotate-180 shadow-2xl shadow-primary/40' : 'bg-[var(--bg-card)] border border-[var(--border-color)] group-hover/faqbtn:border-primary/20 group-hover/faqbtn:scale-110'}`}>
                        <ChevronDown className="h-6 w-6" />
                      </div>
                    </button>
                    {activeFaq === index && (
                      <div className="px-5 pb-5 md:px-8 md:pb-8 lg:px-12 lg:pb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="h-px bg-[var(--border-color)] mb-8" />
                        <p className="text-[var(--text-muted)] text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Still have questions? */}
              <div className="mt-12 md:mt-16 p-6 md:p-10 bg-[var(--bg-inverted)] rounded-2xl md:rounded-[3rem] text-[var(--text-on-inverted)] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--bg-body)]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-2xl font-black mb-2">Still have questions?</h3>
                  <p className="text-[var(--text-on-inverted)]/80 font-medium">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                </div>
                <button 
                  onClick={() => openModal(course.title)}
                  className="bg-[var(--bg-body)] text-[var(--text-heading)] font-black px-8 py-4 rounded-2xl hover:opacity-90 transition-colors relative z-10 shadow-xl whitespace-nowrap"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              {/* Main Pricing/Action Card */}
              <div className="bg-[var(--bg-card)] rounded-[3rem] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.1)] border border-[var(--border-color)] overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Next Batch</span>
                      <div className="flex items-center text-[var(--text-heading)] font-black">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        {course.enrollment?.nextBatch || 'TBA'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Course Fee</span>
                      <div className="text-2xl font-black text-primary tracking-tight">{course.price}</div>
                      <div className="text-[10px] text-[var(--text-muted)] font-bold mt-1">EMI Options Available</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-[var(--text-muted)]">Duration</span>
                      </div>
                      <span className="text-sm font-black text-[var(--text-heading)]">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-[var(--text-muted)]">Format</span>
                      </div>
                      <span className="text-sm font-black text-[var(--text-heading)]">{course.mode}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-[var(--text-muted)]">Level</span>
                      </div>
                      <span className="text-sm font-black text-[var(--text-heading)]">{course.level}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => openModal(course.title)}
                      className="w-full py-5 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] rounded-2xl text-[13px] font-black tracking-widest uppercase hover:opacity-90 transition-all shadow-xl active:scale-[0.98] group/btn"
                    >
                      <span className="flex items-center justify-center">
                        Secure Your Seat
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                    <button 
                      onClick={() => openModal(course.title)}
                      className="w-full py-5 bg-[var(--bg-secondary)] text-[var(--text-heading)] rounded-2xl text-[13px] font-black tracking-widest uppercase hover:opacity-80 transition-all active:scale-[0.98] border border-[var(--border-color)]"
                    >
                      Request Callback
                    </button>
                  </div>
                </div>

                {/* Integrated Certification Info */}
                <div className="bg-[var(--bg-inverted)] p-8 lg:p-10 relative overflow-hidden group">
                  <Award className="absolute -bottom-4 -right-4 h-24 w-24 text-[var(--text-on-inverted)]/5 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-sm font-black text-[var(--text-on-inverted)] uppercase tracking-wider">{course.certification?.title || 'Industry Certified'}</h3>
                    </div>
                    <p className="text-xs text-[var(--text-on-inverted)]/60 font-medium leading-relaxed mb-6">
                      {course.certification?.details || 'Get a dual certification aligned with industry standards and NASSCOM FutureSkills.'}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--bg-body)]/10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-on-inverted)]/40">Recognition</span>
                      <span className="text-[10px] font-black text-primary uppercase">NASSCOM ALIGNED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Card */}
              <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-color)] p-8">
                <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-6 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                  Enrollment Journey
                </h4>
                <ul className="space-y-5">
                  {course.enrollment?.steps?.map((step, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <span className="h-6 w-6 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shrink-0 text-[10px] font-black text-[var(--text-muted)] shadow-sm">{i + 1}</span>
                      <span className="text-xs font-bold text-[var(--text-muted)] leading-normal">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses CTA */}
      <section className="section-padding bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="container-custom text-center">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-8">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Ready to begin?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] mb-8 tracking-tight">Start your transformation <span className="text-primary">today</span></h2>
          <p className="text-[var(--text-muted)] text-lg mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Join 1,000+ successful graduates who have accelerated their careers with {BRANDING.fullName}.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/courses" className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-transform">
              Browse All Courses
            </Link>
            <Link to="/reviews" className="group flex items-center text-lg font-black text-[var(--text-heading)] hover:text-primary transition-colors">
              Read Success Stories 
              <div className="ml-3 h-10 w-10 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-[var(--text-on-inverted)] transition-all">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
