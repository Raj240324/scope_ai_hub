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
      {/* 1. Redesigned Hero Section */}
      <section className="relative bg-[var(--bg-body)] pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Subtle Background Glows (New System) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--color-brand-purple-deep)_0%,transparent_70%)] opacity-10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-brand-cyan-deep)_0%,transparent_70%)] opacity-10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                 {course.category}
               </span>
               <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                 <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-wider">New Batch: {course.enrollment?.nextBatch}</span>
               </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text-heading)] mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {course.title}
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 leading-relaxed max-w-2xl font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <button 
                onClick={() => openModal(course.title)}
                className="btn-primary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
              >
                Enroll Now
              </button>
              <button 
                onClick={() => document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full bg-[var(--bg-secondary)] text-[var(--text-heading)] border border-[var(--border-color)] text-sm font-bold uppercase tracking-widest hover:bg-[var(--bg-inverted)] hover:text-[var(--text-on-inverted)] transition-all"
              >
                View Syllabus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Nav (Restored & Refined) */}
      <div className={`sticky top-[64px] md:top-[72px] z-40 bg-[var(--bg-body)]/80 backdrop-blur-xl border-y border-[var(--border-color)] transition-all duration-300 ${scrollProgress > 5 ? 'shadow-md translate-y-0' : ''}`}>
        <div className="container-custom">
           <div className="flex items-center justify-between h-14 md:h-16">
              <h2 className={`font-bold text-[var(--text-heading)] transition-opacity duration-300 ${scrollProgress > 10 ? 'opacity-100' : 'opacity-0'} hidden md:block`}>
                {course.title}
              </h2>
              <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar mask-gradient-x w-full md:w-auto">
                 {['Overview', 'Curriculum', 'Instructor', 'FAQ'].map((item) => {
                    const id = item.toLowerCase();
                    const isActive = activeTab === id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setActiveTab(id);
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${isActive ? 'bg-[var(--text-heading)] text-[var(--bg-body)]' : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-secondary)]'}`}
                      >
                        {item}
                      </button>
                    )
                 })}
                 <button 
                   onClick={() => openModal(course.title)}
                   className="ml-2 md:ml-4 px-5 py-2 rounded-full bg-primary text-white text-xs md:text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all whitespace-nowrap md:hidden"
                 >
                   Enroll
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Main Content - 2 Column Layout */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Overview Section */}
              <div id="overview" className="space-y-8 scroll-mt-24">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">About this Course</h2>
                  <p className="text-[var(--text-muted)] text-lg leading-relaxed">{course.longDescription}</p>
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[var(--border-color)]">
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Duration</div>
                    <div className="text-lg font-bold text-[var(--text-heading)] flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {course.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Level</div>
                    <div className="text-lg font-bold text-[var(--text-heading)] flex items-center gap-2">
                       <Target className="h-4 w-4 text-primary" />
                       {course.level}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Format</div>
                    <div className="text-lg font-bold text-[var(--text-heading)] flex items-center gap-2">
                       <Globe className="h-4 w-4 text-primary" />
                       {course.mode}
                    </div>
                  </div>
                   <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Certification</div>
                    <div className="text-lg font-bold text-[var(--text-heading)] flex items-center gap-2">
                       <Award className="h-4 w-4 text-primary" />
                       Yes
                    </div>
                  </div>
                </div>

                {/* What you'll learn */}
                <div className="bg-[var(--bg-secondary)] p-8 rounded-3xl border border-[var(--border-color)]">
                   <h3 className="text-xl font-bold text-[var(--text-heading)] mb-6 flex items-center gap-2">
                     <CheckCircle2 className="h-5 w-5 text-primary" />
                     What you will learn
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {course.learningObjectives?.map((item, i) => (
                       <li key={i} className="flex items-start gap-3 list-none">
                         <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                         <span className="text-[var(--text-muted)] font-medium text-sm leading-relaxed">{item}</span>
                       </li>
                     ))}
                   </div>
                </div>
                
                {/* Tools */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-3">
                     {course.tools?.map((tool, i) => (
                       <span key={i} className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] text-sm font-semibold shadow-sm">
                         {tool}
                       </span>
                     ))}
                  </div>
                </div>
              </div>


              {/* Curriculum Section */}
              <div id="curriculum" className="scroll-mt-24">
                <div className="flex items-end justify-between mb-8">
                   <h2 className="text-2xl font-bold text-[var(--text-heading)]">Curriculum</h2>
                   <span className="text-sm font-medium text-[var(--text-muted)]">{course.syllabus?.length} Modules</span>
                </div>
                
                <div className="space-y-4">
                   {course.syllabus?.map((item, index) => (
                     <div key={index} className="group border border-[var(--border-color)] rounded-2xl overflow-hidden bg-[var(--bg-card)] hover:border-primary/30 transition-all duration-300">
                        <button 
                          onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <div className="flex gap-4 md:gap-6 items-center">
                             <span className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${activeModule === index ? 'bg-primary text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] group-hover:text-primary'}`}>
                                {index + 1}
                             </span>
                             <div>
                                <h4 className="text-lg font-bold text-[var(--text-heading)]">{item.module}</h4>
                                <p className="text-sm text-[var(--text-muted)]">{item.duration} • {item.topics?.length} Topics</p>
                             </div>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-[var(--text-muted)] transition-transform duration-300 ${activeModule === index ? 'rotate-180 text-primary' : ''}`} />
                        </button>
                        
                        <div className={`grid transition-all duration-300 ease-in-out ${activeModule === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                           <div className="overflow-hidden">
                              <div className="p-6 pt-0 pl-16 md:pl-20 border-t border-[var(--border-color)]/50 bg-[var(--bg-secondary)]/30">
                                 <ul className="space-y-3">
                                   {item.topics?.map((topic, i) => (
                                     <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-medium">
                                       <div className="h-1.5 w-1.5 rounded-full bg-[var(--border-color)]" />
                                       {topic}
                                     </li>
                                   ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              
              {/* Instructor Section */}
              <div id="instructor" className="scroll-mt-24">
                 <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-8">Your Mentor</h2>
                 <div className="flex flex-col md:flex-row gap-8 items-start bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-color)]">
                    <div className="shrink-0 relative">
                       <img 
                         src={course.instructor?.avatar} 
                         alt={course.instructor?.name} 
                         className="h-32 w-32 rounded-2xl object-cover shadow-lg"
                       />
                       <div className="absolute -bottom-3 -right-3 bg-primary text-white p-2 rounded-lg shadow-lg">
                          <BookOpen className="h-5 w-5" />
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-[var(--text-heading)]">{course.instructor?.name}</h3>
                       <p className="text-primary font-medium mb-4">{course.instructor?.role}</p>
                       <p className="text-[var(--text-muted)] leading-relaxed text-sm mb-6">{course.instructor?.bio}</p>
                       <div className="flex gap-6 text-sm">
                          <div>
                            <span className="block font-bold text-[var(--text-heading)]">10+ Years</span>
                            <span className="text-[var(--text-muted)] text-xs">Experience</span>
                          </div>
                          <div>
                            <span className="block font-bold text-[var(--text-heading)]">5000+</span>
                            <span className="text-[var(--text-muted)] text-xs">Students</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="scroll-mt-24">
                 <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-8">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                   {course.faqs?.map((faq, index) => (
                     <div 
                       key={index} 
                       className={`border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === index ? 'bg-[var(--bg-secondary)] border-primary/30' : 'bg-[var(--bg-card)]'}`}
                     >
                       <button
                         onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                         className="w-full flex items-center justify-between p-6 text-left"
                       >
                         <span className={`font-bold text-lg ${activeFaq === index ? 'text-[var(--text-heading)]' : 'text-[var(--text-muted)]'}`}>
                           {faq.question}
                         </span>
                         {activeFaq === index ? (
                           <ChevronUp className="h-5 w-5 text-primary shrink-0 ml-4" />
                         ) : (
                           <ChevronDown className="h-5 w-5 text-[var(--text-muted)] shrink-0 ml-4" />
                         )}
                       </button>
                       <div 
                         className={`grid transition-all duration-300 ease-in-out ${activeFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                       >
                         <div className="overflow-hidden">
                           <div className="p-6 pt-0 text-[var(--text-muted)] leading-relaxed">
                             {faq.answer}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sticky Sidebar */}
            <div className="lg:col-span-1">
               <div className="sticky top-32 space-y-6">
                  {/* Enrollment Card */}
                  <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-6 shadow-xl shadow-black/5">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Course Fee</p>
                          <h3 className="text-2xl font-black text-primary">{course.price}</h3>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-heading)]">
                          Next: {course.enrollment?.nextBatch}
                        </div>
                     </div>
                     
                     <div className="space-y-3 mb-6">
                        <button 
                          onClick={() => openModal(course.title)}
                          className="w-full btn-primary py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-primary/30 transition-all"
                        >
                          Enroll Now
                        </button>
                        <button 
                          onClick={() => openModal(course.title)}
                          className="w-full py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] text-sm font-bold uppercase tracking-wider hover:bg-[var(--bg-body)] transition-all"
                        >
                          Talk to Counselor
                        </button>
                     </div>

                     <div className="space-y-4 pt-6 border-t border-[var(--border-color)]">
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-[var(--text-muted)] flex items-center gap-2">
                             <User className="h-4 w-4" /> Enrolled
                           </span>
                           <span className="font-bold text-[var(--text-heading)]">1,240+ Students</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-[var(--text-muted)] flex items-center gap-2">
                             <Clock className="h-4 w-4" /> Duration
                           </span>
                           <span className="font-bold text-[var(--text-heading)]">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-[var(--text-muted)] flex items-center gap-2">
                             <FileCheck className="h-4 w-4" /> Certificate
                           </span>
                           <span className="font-bold text-[var(--text-heading)]">Included</span>
                        </div>
                     </div>
                  </div>

                  {/* Help Card */}
                  <div className="bg-primary/5 rounded-3xl border border-primary/10 p-6">
                     <h4 className="font-bold text-[var(--text-heading)] mb-2 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Need Help?
                     </h4>
                     <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
                       Unsure if this course is right for you? Our career counselors can help you decide.
                     </p>
                     <a href="/contact" className="text-sm font-bold text-primary hover:underline">
                        Get Free Counseling &rarr;
                     </a>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Related Courses (Simplified) */}
      <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-custom">
           <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-2">Explore More</h2>
                <p className="text-[var(--text-muted)]">Similar courses you might be interested in</p>
              </div>
              <Link to="/courses" className="text-primary font-bold hover:underline hidden md:block">View All Courses</Link>
           </div>
           
           {/* Simple Grid of 3 Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.filter(c => c.id !== course.id).slice(0, 3).map((item) => (
                 <Link key={item.id} to={`/courses/${item.slug}`} className="group bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                       <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{item.category}</span>
                       <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                       <p className="text-sm text-[var(--text-muted)] line-clamp-2">{item.shortDescription}</p>
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </section>

    </Layout>
  );
};

export default CourseDetail;
