import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Search, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useModal } from '../../context/ModalContext';
import ThemeToggle from '../ui/ThemeToggle';
import { courses } from '../../data/courses';
import { BRANDING } from '../../data/branding';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showMobileCourses, setShowMobileCourses] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen || isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, isOpen]);

  // Group courses by category for the mega menu
  const courseCategories = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    if (acc[course.category].length < 3) { // Limit to 3 per category in dropdown
      acc[course.category].push(course);
    }
    return acc;
  }, {});

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Join as Trainer', href: '/careers/join-as-trainer' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-[var(--bg-header-scrolled)] backdrop-blur-md shadow-md py-3 border-b border-[var(--border-header)]" 
        : "bg-[var(--bg-header)] py-4 border-b border-[var(--border-header)]"
    )}>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
          <div className="absolute inset-0 bg-[var(--bg-body)]/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[var(--border-color)]">
            <div className="p-6 border-b border-[var(--border-color)] flex items-center">
              <Search className="h-6 w-6 text-[var(--text-heading)] mr-4" />
              <input
                autoFocus
                type="text"
                name="header_search"
                id="header_search"
                aria-label="Search courses"
                placeholder="Search for courses (e.g. MERN, Python, Java...)"
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-[var(--text-heading)] placeholder:text-[var(--text-muted)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-2 hover:bg-[var(--text-heading)]/10 rounded-full transition-colors mr-2"
                >
                  <X className="h-4 w-4 text-[var(--text-muted)]" />
                </button>
              )}
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-[var(--text-heading)]/10 rounded-full transition-colors"
              >
                <ChevronDown className="h-6 w-6 text-[var(--text-muted)] rotate-90" />
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {!searchQuery.trim() && (
                <div className="p-4">
                  <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {['MERN', 'Python', 'Java', 'Full Stack', 'Web Development'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-[var(--text-heading)]/5 hover:bg-[var(--text-heading)]/15 rounded-xl text-sm font-bold text-[var(--text-body)] border border-[var(--border-color)] transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchQuery.trim().length > 0 ? (
                <div className="space-y-2">
                  {(() => {
                    const filtered = courses.filter(c => 
                      c.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
                      c.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                      (c.tools && c.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase().trim())))
                    );
                    
                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-12">
                          <div className="bg-[var(--text-heading)]/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-[var(--text-muted)]" />
                          </div>
                          <p className="text-[var(--text-body)] font-bold">No courses found matching "{searchQuery}"</p>
                          <p className="text-sm text-[var(--text-muted)] mt-1">Try searching for MERN, Python, or Java</p>
                        </div>
                      );
                    }

                    return filtered.map(course => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center p-4 hover:bg-[var(--text-heading)]/5 rounded-2xl transition-all group border border-transparent hover:border-[var(--border-color)]"
                      >
                        <div className="bg-[var(--text-heading)]/10 p-3 rounded-xl mr-4 group-hover:bg-[var(--bg-inverted)] transition-all duration-300">
                          <GraduationCap className="h-5 w-5 text-[var(--text-heading)] group-hover:text-[var(--text-on-inverted)]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-[var(--text-heading)] group-hover:text-[var(--text-body)] transition-colors">{course.title}</h4>
                            <span className="text-[10px] font-black text-[var(--text-heading)] bg-[var(--text-heading)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {course.category}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center">
                            {course.duration} • {course.level}
                          </p>
                        </div>
                      </Link>
                    ));
                  })()}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['MERN Stack', 'Python', 'Java', 'Web Design', 'AWS'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 bg-[var(--text-heading)]/10 hover:bg-[var(--bg-inverted)] hover:text-[var(--text-on-inverted)] rounded-full text-sm font-bold text-[var(--text-body)] transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Header Content */}
      <div className="container-custom">
        <div className="w-full">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/scope-logo.png" 
                alt="ScopeAIHub" 
                className="h-28 md:h-36 -my-8 md:-my-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.name === 'Courses' && setShowCourses(true)}
                  onMouseLeave={() => item.name === 'Courses' && setShowCourses(false)}
                >
                  <Link
                    to={item.href}
                    className={clsx(
                      'px-4 py-2 text-[14px] font-bold transition-all rounded-lg relative flex items-center',
                      location.pathname === item.href 
                        ? 'text-[var(--text-nav-active)] bg-[var(--text-nav)]/10' 
                        : 'text-[var(--text-nav)] hover:text-[var(--text-nav-active)] hover:bg-[var(--text-nav)]/5'
                    )}
                  >
                    {item.name}
                    {item.name === 'Courses' && <ChevronDown className={clsx("ml-1 h-3 w-3 transition-transform duration-300", showCourses && "rotate-180")} />}
                  </Link>

                  {item.name === 'Courses' && showCourses && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-4 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-300 z-[60]">
                      <div className="bg-[var(--bg-card)] rounded-[1.5rem] shadow-2xl border border-[var(--border-color)] overflow-hidden flex">
                        {/* Left Side: Course Grid */}
                        <div className="flex-1 p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <h3 className="text-xl font-black text-[var(--text-heading)] tracking-tight">Our Programs</h3>
                              <p className="text-[12px] text-[var(--text-muted)] font-semibold">Expert-led technical training</p>
                            </div>
                            <Link to="/courses" className="text-[10px] font-black text-[var(--text-heading)] hover:opacity-80 transition-all flex items-center bg-[var(--text-heading)]/5 px-3 py-1.5 rounded-full">
                              VIEW ALL
                              <ChevronDown className="ml-1 h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {Object.entries(courseCategories).map(([category, items]) => (
                              <div key={category} className="space-y-3">
                                <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] flex items-center">
                                  {category}
                                </h4>
                                <div className="space-y-0.5">
                                  {items.map((course) => (
                                    <Link
                                      key={course.id}
                                      to={`/courses/${course.slug}`}
                                      className="group/item flex items-center py-2 px-3 -mx-3 rounded-xl hover:bg-[var(--text-heading)]/5 transition-all"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-[var(--border-color)] group-hover/item:bg-[var(--bg-inverted)] group-hover/item:scale-150 transition-all mr-3" />
                                      <div>
                                        <p className="text-[13px] font-bold text-[var(--text-body)] group-hover/item:text-[var(--text-heading)] transition-colors leading-tight">
                                          {course.title}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Modern Promo Section */}
                        <div className="w-64 bg-primary p-8 flex flex-col justify-between relative overflow-hidden">
                          {/* Background Decoration */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -ml-12 -mb-12" />
                          
                          <div className="relative z-10">
                            <div className="bg-white/20 text-white text-[9px] font-black px-2.5 py-1 rounded-lg inline-block mb-4 tracking-widest uppercase">
                              Trending
                            </div>
                            <h4 className="text-lg font-black text-white leading-tight mb-3">
                              Master <span className="text-white/80">MERN</span> Stack
                            </h4>
                            <p className="text-[11px] text-white/70 font-medium leading-relaxed mb-6">
                              The most complete full-stack roadmap in Tamil Nadu.
                            </p>
                            
                            <div className="space-y-3">
                              {['Placement Assist', 'Real Projects', 'Live Mentoring'].map((feature) => (
                                <div key={feature} className="flex items-center text-[10px] font-bold text-white/70">
                                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center mr-2">
                                    <div className="w-1 h-1 rounded-full bg-white" />
                                  </div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => openModal()}
                            className="relative z-10 mt-8 w-full py-3.5 bg-white text-primary rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-white/90 transition-all shadow-xl active:scale-95"
                          >
                            Get Syllabus
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="h-6 w-[1px] bg-[var(--border-color)] mx-4" />

              <ThemeToggle className="mr-2 text-[var(--text-nav)] hover:bg-[var(--text-nav)]/10" />

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[var(--text-nav)] hover:text-[var(--text-nav-active)] transition-colors mr-2 group"
                title="Search Courses"
              >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => openModal()}
                className="btn-primary"
              >
                ENROLL NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle className="text-[var(--text-nav)] hover:bg-[var(--text-nav)]/10" />
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[var(--text-nav)] hover:text-[var(--text-nav-active)] transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="text-[var(--text-nav)] p-2.5 bg-[var(--text-nav)]/10 border border-[var(--border-color)] rounded-xl shadow-sm active:scale-95 transition-all hover:bg-[var(--text-nav)]/20"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100%] bg-[var(--bg-card)] border-t border-[var(--border-color)] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container-custom py-10 space-y-6">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.name === 'Courses' ? (
                    <>
                      <button
                        onClick={() => setShowMobileCourses(!showMobileCourses)}
                        className={clsx(
                          'flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all',
                          location.pathname.startsWith('/courses')
                            ? 'text-[var(--text-heading)] bg-[var(--text-heading)]/5' 
                            : 'text-[var(--text-body)] hover:bg-[var(--text-heading)]/5'
                        )}
                      >
                        {item.name}
                        <ChevronDown className={clsx("h-5 w-5 transition-transform duration-300", showMobileCourses && "rotate-180")} />
                      </button>
                      
                      {showMobileCourses && (
                        <div className="mx-6 p-4 bg-[var(--text-heading)]/5 rounded-[2rem] mt-2 space-y-4 animate-in slide-in-from-top-2 duration-300">
                          {Object.entries(courseCategories).map(([category, items]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest pl-2">
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 gap-1">
                                {items.map((course) => (
                                  <Link
                                    key={course.id}
                                    to={`/courses/${course.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center p-3 bg-[var(--bg-card)] rounded-xl shadow-sm border border-[var(--border-color)]"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-[var(--text-heading)]/10 flex items-center justify-center mr-3">
                                      <GraduationCap className="h-4 w-4 text-[var(--text-heading)]" />
                                    </div>
                                    <span className="text-sm font-bold text-[var(--text-body)]">{course.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Link
                            to="/courses"
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-4 btn-primary text-center text-xs font-black tracking-widest uppercase"
                          >
                            Explore All Courses
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        'flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all',
                        location.pathname === item.href 
                          ? 'text-[var(--text-heading)] bg-[var(--text-heading)]/5' 
                          : 'text-[var(--text-body)] hover:bg-[var(--text-heading)]/5'
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-5 w-5 opacity-30" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-[var(--border-color)]">
              <button 
                onClick={() => openModal()}
                className="btn-primary w-full py-5 shadow-2xl"
              >
                ENROLL NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
