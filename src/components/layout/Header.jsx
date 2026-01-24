import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Search, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useModal } from '../../context/ModalContext';
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
      setScrolled(window.scrollY > 50);
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
    { name: 'Gallery', href: '/gallery' },
    { name: 'Placement', href: '/placement' },
    { name: 'Contact', href: '/contact' },

  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-sm lg:shadow-none lg:backdrop-blur-none",
      scrolled ? "lg:bg-white lg:shadow-lg lg:shadow-slate-200/50" : "lg:bg-transparent"
    )}>
      {/* Top Bar */}
      <div className={clsx(
        "bg-slate-900 text-white transition-all duration-500 overflow-hidden border-b border-white/5",
        scrolled ? "max-h-0 opacity-0 invisible" : "max-h-20 opacity-100 visible py-2.5"
      )}>
        <div className="container-custom flex flex-col md:flex-row justify-between items-center text-[11px] font-semibold tracking-wide uppercase">
          <div className="flex items-center space-x-8">
            <a href={`mailto:${BRANDING.email}`} className="flex items-center hover:text-primary-light transition-colors group">
              <Mail className="h-3.5 w-3.5 mr-2 text-primary-light group-hover:scale-110 transition-transform" />
              {BRANDING.email}
            </a>
            <a href={`tel:${BRANDING.phone.replace(/\s/g, '')}`} className="flex items-center hover:text-primary-light transition-colors group">
              <Phone className="h-3.5 w-3.5 mr-2 text-primary-light group-hover:scale-110 transition-transform" />
              {BRANDING.phone}
            </a>
          </div>
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <div className="flex items-center space-x-4 border-r border-white/10 pr-6 mr-2">
              <a href={BRANDING.socials.facebook} className="hover:text-primary-light transition-all hover:-translate-y-0.5"><Facebook className="h-3.5 w-3.5" /></a>
              <a href={BRANDING.socials.twitter} className="hover:text-primary-light transition-all hover:-translate-y-0.5"><Twitter className="h-3.5 w-3.5" /></a>
              <a href={BRANDING.socials.instagram} className="hover:text-primary-light transition-all hover:-translate-y-0.5"><Instagram className="h-3.5 w-3.5" /></a>
              <a href={BRANDING.socials.linkedin} className="hover:text-primary-light transition-all hover:-translate-y-0.5"><Linkedin className="h-3.5 w-3.5" /></a>
            </div>
            <span className="hidden lg:flex items-center text-slate-400">
              <MapPin className="h-3 w-3 mr-1.5 text-primary-light" />
              {BRANDING.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={clsx(
          'transition-all duration-500',
          scrolled ? 'py-2.5' : 'py-5'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none flex items-center">
                  {BRANDING.name} <span className="text-primary ml-1">{BRANDING.suffix}</span>
                </span>
                <span className="text-[9px] font-black text-slate-400 tracking-[0.25em] uppercase mt-1">
                  {BRANDING.tagline}
                </span>
              </div>
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
                      'px-4 py-2 text-[13px] font-bold transition-all rounded-lg relative flex items-center',
                      location.pathname === item.href 
                        ? 'text-primary bg-primary/5' 
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    )}
                  >
                    {item.name}
                    {item.name === 'Courses' && <ChevronDown className={clsx("ml-1 h-3 w-3 transition-transform duration-300", showCourses && "rotate-180")} />}
                  </Link>

                  {item.name === 'Courses' && showCourses && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-4 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-300 z-[60]">
                      <div className="bg-white rounded-[2rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden flex">
                        {/* Left Side: Course Grid */}
                        <div className="flex-1 p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <h3 className="text-xl font-black text-slate-900 tracking-tight">Our Programs</h3>
                              <p className="text-[12px] text-slate-500 font-semibold">Expert-led technical training</p>
                            </div>
                            <Link to="/courses" className="text-[10px] font-black text-primary hover:text-primary-dark transition-all flex items-center bg-primary/5 px-3 py-1.5 rounded-full">
                              VIEW ALL
                              <ChevronDown className="ml-1 h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {Object.entries(courseCategories).map(([category, items]) => (
                              <div key={category} className="space-y-3">
                                <h4 className="text-[9px] font-black text-primary/40 uppercase tracking-[0.25em] flex items-center">
                                  {category}
                                </h4>
                                <div className="space-y-0.5">
                                  {items.map((course) => (
                                    <Link
                                      key={course.id}
                                      to={`/courses/${course.slug}`}
                                      className="group/item flex items-center py-2 px-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-primary group-hover/item:scale-150 transition-all mr-3" />
                                      <div>
                                        <p className="text-[13px] font-bold text-slate-700 group-hover/item:text-primary transition-colors leading-tight">
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
                        <div className="w-64 bg-slate-900 p-8 flex flex-col justify-between relative overflow-hidden">
                          {/* Background Decoration */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -ml-12 -mb-12" />
                          
                          <div className="relative z-10">
                            <div className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-lg inline-block mb-4 tracking-widest uppercase shadow-lg shadow-primary/20">
                              Trending
                            </div>
                            <h4 className="text-lg font-black text-white leading-tight mb-3">
                              Master <span className="text-primary">MERN</span> Stack
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                              The most complete full-stack roadmap in Tamil Nadu.
                            </p>
                            
                            <div className="space-y-3">
                              {['Placement Assist', 'Real Projects', 'Live Mentoring'].map((feature) => (
                                <div key={feature} className="flex items-center text-[10px] font-bold text-slate-300">
                                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                  </div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => openModal()}
                            className="relative z-10 mt-8 w-full py-3.5 bg-white text-slate-900 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95"
                          >
                            Get Syllabus
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="h-6 w-[1px] bg-slate-200 mx-4" />

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-400 hover:text-primary transition-colors mr-2 group"
                title="Search Courses"
              >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => openModal()}
                className="bg-primary hover:bg-primary-dark text-white px-7 py-2.5 rounded-xl text-[13px] font-black transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                ENROLL NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="text-slate-900 p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm active:scale-95 transition-all"
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
        <div className="lg:hidden fixed inset-x-0 top-[100%] bg-white border-t border-slate-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container-custom py-10 space-y-6 max-h-[80vh] overflow-y-auto">
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
                            ? 'text-primary bg-primary/5' 
                            : 'text-slate-600 hover:bg-slate-50'
                        )}
                      >
                        {item.name}
                        <ChevronDown className={clsx("h-5 w-5 transition-transform duration-300", showMobileCourses && "rotate-180")} />
                      </button>
                      
                      {showMobileCourses && (
                        <div className="mx-6 p-4 bg-slate-50 rounded-[2rem] mt-2 space-y-4 animate-in slide-in-from-top-2 duration-300">
                          {Object.entries(courseCategories).map(([category, items]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 gap-1">
                                {items.map((course) => (
                                  <Link
                                    key={course.id}
                                    to={`/courses/${course.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                                      <GraduationCap className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{course.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Link
                            to="/courses"
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-4 bg-primary text-white text-center rounded-xl text-xs font-black tracking-widest uppercase"
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
                          ? 'text-primary bg-primary/5' 
                          : 'text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-5 w-5 opacity-30" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100">
              <button 
                onClick={() => openModal()}
                className="w-full py-5 bg-primary text-white rounded-2xl text-lg font-black shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all"
              >
                ENROLL NOW
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center">
              <Search className="h-6 w-6 text-primary mr-4" />
              <input
                autoFocus
                type="text"
                name="header_search"
                id="header_search"
                aria-label="Search courses"
                placeholder="Search for courses (e.g. MERN, Python, Java...)"
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ChevronDown className="h-6 w-6 text-slate-400 rotate-90" />
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {!searchQuery.trim() && (
                <div className="p-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {['MERN', 'Python', 'Java', 'Full Stack', 'Web Development'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-slate-50 hover:bg-primary/10 hover:text-primary rounded-xl text-sm font-bold text-slate-600 border border-slate-100 transition-all"
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
                          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-slate-300" />
                          </div>
                          <p className="text-slate-500 font-bold">No courses found matching "{searchQuery}"</p>
                          <p className="text-sm text-slate-400 mt-1">Try searching for MERN, Python, or Java</p>
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
                        className="flex items-center p-4 hover:bg-primary/5 rounded-2xl transition-all group border border-transparent hover:border-primary/10"
                      >
                        <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary transition-all duration-300">
                          <GraduationCap className="h-5 w-5 text-primary group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{course.title}</h4>
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {course.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 flex items-center">
                            {course.duration} • {course.level}
                          </p>
                        </div>
                      </Link>
                    ));
                  })()}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['MERN Stack', 'Python', 'Java', 'Web Design', 'AWS'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-full text-sm font-bold text-slate-600 transition-all"
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
    </header>
  );
};

export default Header;
