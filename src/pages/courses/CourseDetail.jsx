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
    >
      <section className="relative bg-slate-900 pt-10 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 pt-4">
              <nav className="flex items-center space-x-2 mb-6 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <Link to="/courses" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Courses</Link>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">{course.title}</span>
              </nav>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                {course.title}
              </h1>

              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl font-medium">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                  <span className="text-[11px] font-black uppercase tracking-widest text-primary-light">{course.category}</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-white/5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">{course.level}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                <div className="flex items-center space-x-3 group">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <Clock className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Duration</p>
                    <p className="text-white font-bold">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <Globe className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Mode</p>
                    <p className="text-white font-bold">{course.mode.split('/')[0]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group col-span-2 sm:col-span-1">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <Tag className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Course Fee</p>
                    <p className="text-white font-bold text-lg">{course.price}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => openModal(course.title)}
                  className="group relative px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-primary-dark transition-all shadow-2xl shadow-primary/40 overflow-hidden flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                <button 
                  onClick={() => openModal(course.title)}
                  className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all"
                >
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Right Content - Visual Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/20 rounded-[4rem] blur-[80px] opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[3.5rem] p-12 shadow-2xl overflow-hidden group">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 p-8">
                    <div className="h-20 w-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                  </div>
                  <Terminal className="absolute -bottom-10 -right-10 h-64 w-64 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                  
                  <div className="relative z-10 text-center">
                    <div className="h-32 w-32 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      <Terminal className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">Industry Ready</h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                      Master <span className="text-white">{course.title}</span> through intensive <span className="text-primary-light font-bold">hands-on</span> projects and real-world scenarios.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-bold text-slate-300">500+ Students Enrolled</p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl animate-bounce duration-[4000ms]">
                    <Award className="h-6 w-6 text-primary-light" />
                  </div>
                  <div className="absolute bottom-20 left-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl animate-pulse">
                    <Code2 className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Navigation (Sticky) */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 hidden md:block">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex space-x-10">
              {['Overview', 'Curriculum', 'Projects', 'Instructor', 'FAQ'].map(tab => (
                <a 
                  key={tab} 
                  href={`#${tab.toLowerCase()}`}
                  className={`py-5 text-[11px] font-black transition-all border-b-2 relative uppercase tracking-[0.2em] ${
                    activeTab === tab.toLowerCase() 
                      ? 'text-primary border-primary' 
                      : 'text-slate-400 border-transparent hover:text-primary hover:border-primary/30'
                  }`}
                >
                  {tab}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Next Batch</span>
                <div className="flex items-center text-slate-900 font-bold text-sm">
                  <Calendar className="h-3.5 w-3.5 text-primary mr-2" />
                  {course.enrollment?.nextBatch || 'TBA'}
                </div>
              </div>
              <button 
                onClick={() => openModal(course.title)}
                className="group bg-slate-900 text-white px-7 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 flex items-center"
              >
                Inquire Now
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full">
          <div 
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <div className="container-custom py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-24">
            
            {/* Overview */}
            <div id="overview" className="scroll-mt-32">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Course Overview</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight leading-[1.2]">
                Master <span className="text-primary">{course.title}</span> with Expert Guidance
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">
                {course.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    What you'll learn
                  </h3>
                  <ul className="space-y-5">
                    {course.learningObjectives?.map((item, i) => (
                      <li key={i} className="flex items-start space-x-4 group/item">
                        <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-emerald-500 transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 group-hover/item:text-white transition-colors" />
                        </div>
                        <span className="text-slate-700 text-[15px] font-bold leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      Prerequisites
                    </h3>
                    <ul className="space-y-4">
                      {course.prerequisites?.map((item, i) => (
                        <li key={i} className="flex items-start space-x-4 text-slate-600">
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2.5 group-hover:scale-150 transition-transform"></div>
                          <span className="text-[15px] font-bold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                        <FileCheck className="h-5 w-5 text-primary" />
                      </div>
                      Tools & Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {course.tools?.map((tool, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-2xl text-xs font-black border border-slate-200 uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all cursor-default shadow-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div id="curriculum" className="scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Learning Path</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">Course Curriculum</h2>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{course.syllabus?.length || 0} Modules</span>
                    <span className="text-lg font-black text-slate-900">{course.duration} Total</span>
                  </div>
                  <div className="h-12 w-px bg-slate-200 hidden md:block"></div>
                  <div className="hidden md:block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Access</span>
                    <span className="text-lg font-black text-primary">Lifetime</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {course.syllabus?.map((item, index) => (
                  <div 
                    key={index}
                    className={`group border rounded-[2.5rem] overflow-hidden transition-all duration-700 ${activeModule === index ? 'border-primary shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl'}`}
                  >
                    <button 
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-8 lg:p-10 text-left transition-colors"
                    >
                      <div className="flex items-center space-x-8">
                        <div className={`h-16 w-16 rounded-3xl flex items-center justify-center font-black text-2xl transition-all duration-700 ${activeModule === index ? 'bg-primary text-white scale-110 rotate-6 shadow-2xl shadow-primary/40' : 'bg-white text-slate-300 border border-slate-100 group-hover:border-primary/30 group-hover:scale-105 group-hover:text-primary/50'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{item.duration}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.topics?.length || 0} Lessons</span>
                          </div>
                          <h4 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors leading-tight">{item.module}</h4>
                        </div>
                      </div>
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${activeModule === index ? 'bg-primary/10 rotate-180 shadow-inner' : 'bg-white border border-slate-100 group-hover:border-primary/20'}`}>
                        <ChevronDown className={`h-6 w-6 transition-colors ${activeModule === index ? 'text-primary' : 'text-slate-400'}`} />
                      </div>
                    </button>
                    {activeModule === index && (
                      <div className="px-10 pb-10 lg:px-16 lg:pb-16 animate-in fade-in slide-in-from-top-6 duration-700">
                        <div className="h-px bg-slate-100 mb-10" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                          {item.topics?.map((topic, i) => (
                            <div key={i} className="flex items-start text-slate-600 group/topic">
                              <div className="h-7 w-7 rounded-xl bg-primary/5 flex items-center justify-center mr-5 group-hover/topic:bg-primary group-hover/topic:scale-110 transition-all mt-0.5">
                                <CheckCircle2 className="h-4 w-4 text-primary group-hover/topic:text-white" />
                              </div>
                              <span className="text-[15px] font-bold text-slate-700 group-hover/topic:text-primary transition-colors leading-relaxed">{topic}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Module Footer/CTA */}
                        <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-500 italic">
                            Want to see detailed syllabus?
                          </p>
                          <button 
                            onClick={() => openModal(course.title)}
                            className="text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center"
                          >
                            Download PDF <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div id="projects" className="scroll-mt-32">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Real World Experience</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
                Hands-on Capstone Projects
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {course.projects?.map((project, i) => (
                  <div key={i} className="group p-10 lg:p-12 bg-white rounded-[3rem] border border-slate-100 hover:border-primary/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 group-hover:bg-primary/5 transition-colors duration-700"></div>
                    
                    <div className="h-24 w-24 shrink-0 bg-slate-50 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 shadow-inner relative z-10">
                      <Zap className="h-10 w-10 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">Project {i + 1}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Standard</span>
                      </div>
                      <h4 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{project.title}</h4>
                      <p className="text-slate-500 text-base leading-relaxed font-medium">
                        {project.description}
                      </p>
                      
                      <div className="mt-8 flex flex-wrap gap-2">
                        {course.tools?.slice(0, 3).map((tool, idx) => (
                          <span key={idx} className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-lg">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="hidden lg:block">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-primary" />
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-10 tracking-tight leading-tight">
                Learn from the Experts
              </h2>
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 p-10 lg:p-16 bg-slate-900 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />
                
                <div className="relative h-64 w-64 shrink-0 mx-auto md:mx-0">
                  <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-700 opacity-20 blur-xl"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-[3rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-700"></div>
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img 
                      src={course.instructor?.avatar || 'https://via.placeholder.com/400x400?text=Instructor'} 
                      alt={course.instructor?.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-white h-14 w-14 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center animate-bounce duration-[3000ms] border-4 border-slate-900">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="text-center md:text-left flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center space-x-2 text-primary font-black text-sm uppercase tracking-[0.3em] mb-4">
                    <span className="h-1 w-8 bg-primary rounded-full"></span>
                    <span>Chief Instructor</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 tracking-tight">{course.instructor?.name}</h4>
                  <p className="text-primary-light font-bold text-lg mb-8 leading-relaxed">{course.instructor?.role}</p>
                  <div className="relative">
                    <span className="absolute -top-6 -left-6 text-6xl text-white/5 font-serif">"</span>
                    <p className="text-slate-300 leading-relaxed text-lg font-medium italic relative z-10">
                      {course.instructor?.bio}
                    </p>
                    <span className="absolute -bottom-10 -right-6 text-6xl text-white/5 font-serif">"</span>
                  </div>
                  
                  <div className="mt-12 flex items-center justify-center md:justify-start space-x-8">
                    <div className="text-center md:text-left">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Experience</span>
                      <span className="text-xl font-black text-white">10+ Years</span>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div className="text-center md:text-left">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Students</span>
                      <span className="text-xl font-black text-white">5000+</span>
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
                Common Questions
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {course.faqs?.map((faq, index) => (
                  <div 
                    key={index}
                    className={`group border rounded-[2rem] transition-all duration-700 ${activeFaq === index ? 'border-primary shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] bg-white' : 'border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200'}`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-8 lg:p-10 text-left transition-all group/faqbtn"
                    >
                      <span className={`text-xl font-black tracking-tight transition-all duration-500 ${activeFaq === index ? 'text-primary translate-x-2' : 'text-slate-900 group-hover/faqbtn:text-primary'}`}>
                        {faq.question}
                      </span>
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-700 shrink-0 ${activeFaq === index ? 'bg-primary text-white rotate-180 shadow-2xl shadow-primary/40' : 'bg-white border border-slate-100 group-hover/faqbtn:border-primary/20 group-hover/faqbtn:scale-110'}`}>
                        <ChevronDown className="h-6 w-6" />
                      </div>
                    </button>
                    {activeFaq === index && (
                      <div className="px-8 pb-8 lg:px-12 lg:pb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="h-px bg-slate-100 mb-8" />
                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Still have questions? */}
              <div className="mt-16 p-10 bg-primary rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-2xl font-black mb-2">Still have questions?</h3>
                  <p className="text-white/80 font-medium">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                </div>
                <button 
                  onClick={() => openModal(course.title)}
                  className="bg-white text-primary font-black px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors relative z-10 shadow-xl whitespace-nowrap"
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
              <div className="bg-white rounded-[3rem] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Next Batch</span>
                      <div className="flex items-center text-slate-900 font-black">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        {course.enrollment?.nextBatch || 'TBA'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Course Fee</span>
                      <div className="text-2xl font-black text-primary tracking-tight">{course.price}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-slate-600">Duration</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-slate-600">Format</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{course.mode}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm font-bold text-slate-600">Level</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{course.level}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => openModal(course.title)}
                      className="w-full py-5 bg-primary text-white rounded-2xl text-[13px] font-black tracking-widest uppercase hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] group/btn"
                    >
                      <span className="flex items-center justify-center">
                        Secure Your Seat
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                    <button 
                      onClick={() => openModal(course.title)}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[13px] font-black tracking-widest uppercase hover:bg-slate-800 transition-all active:scale-[0.98] border border-white/5"
                    >
                      Request Callback
                    </button>
                  </div>
                </div>

                {/* Integrated Certification Info */}
                <div className="bg-slate-900 p-8 lg:p-10 relative overflow-hidden group">
                  <Award className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">{course.certification?.title || 'Industry Certified'}</h3>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                      {course.certification?.details || 'Get a dual certification aligned with industry standards and NASSCOM FutureSkills.'}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Recognition</span>
                      <span className="text-[10px] font-black text-primary uppercase">NASSCOM ALIGNED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Card */}
              <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                  Enrollment Journey
                </h4>
                <ul className="space-y-5">
                  {course.enrollment?.steps?.map((step, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <span className="h-6 w-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[10px] font-black text-slate-400 shadow-sm">{i + 1}</span>
                      <span className="text-xs font-bold text-slate-600 leading-normal">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses CTA */}
      <section className="section-padding bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="container-custom text-center">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-8">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Ready to begin?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">Start your transformation <span className="text-primary">today</span></h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Join 1,000+ successful graduates who have accelerated their careers with {BRANDING.fullName}.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/courses" className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-transform">
              Browse All Courses
            </Link>
            <Link to="/reviews" className="group flex items-center text-lg font-black text-slate-900 hover:text-primary transition-colors">
              Read Success Stories 
              <div className="ml-3 h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
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
