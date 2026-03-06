import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Mail, Phone, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useModal } from '../../context/ModalContext';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { courses, TIERS, coursesByTier, tierMeta } from '../../data/courses';
import { BRANDING } from '../../data/branding';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { openModal } = useModal();
  const { theme } = useTheme();

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setScrolled(window.scrollY > 20);
        return;
      }
      const heroEl = document.querySelector('section[aria-label="Homepage hero"]');
      if (heroEl) {
        const spacer = heroEl.nextElementSibling;
        const boundary = spacer
          ? spacer.getBoundingClientRect().bottom + window.scrollY
          : heroEl.getBoundingClientRect().bottom + window.scrollY;
        setScrolled(window.scrollY > boundary - window.innerHeight * 0.1);
      } else {
        setScrolled(window.scrollY > window.innerHeight * 0.9);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses', megaDropdown: true },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Career Support', href: '/career-support' },
    {
      name: 'Success',
      href: '/reviews',
      children: [
        { name: 'Student Reviews', href: '/reviews' },
      ],
    },
    {
      name: 'Resources',
      href: '/careers/trainers',
      children: [
        { name: 'Our Trainers', href: '/careers/trainers' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Join as Trainer', href: '/careers/join-as-trainer' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  // Check if any child route is active (for dropdown parent highlighting)
  const isNavActive = (item) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.href);
    }
    if (item.megaDropdown) {
      return location.pathname.startsWith('/courses');
    }
    return location.pathname === item.href;
  };

  return (
    <>
    <header className={clsx(
      "fixed top-0 left-0 w-full z-[999] transition-all duration-300 h-[72px] md:h-[80px] flex items-center",
      isTransparent
        ? "bg-transparent border-b border-transparent"
        : "bg-[var(--bg-header-scrolled)] backdrop-blur-md shadow-md border-b border-[var(--border-header)]"
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
                aria-label="Search programs"
                placeholder="Search programs (e.g. NLP, MLOps, Prompt...)"
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
                    {['Prompt Engineering', 'Python AI', 'NLP', 'MLOps', 'Data Analytics'].map(term => (
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
                      c.tier.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                      c.tagline.toLowerCase().includes(searchQuery.toLowerCase().trim())
                    );

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-12">
                          <div className="bg-[var(--text-heading)]/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-[var(--text-muted)]" />
                          </div>
                          <p className="text-[var(--text-body)] font-bold">No programs found matching &quot;{searchQuery}&quot;</p>
                          <p className="text-sm text-[var(--text-muted)] mt-1">Try searching for NLP, Python, or MLOps</p>
                        </div>
                      );
                    }

                    return filtered.map(course => {
                      const t = tierMeta[course.tier];
                      return (
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
                              <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border"
                                style={{ background: t.softBg, color: t.color, borderColor: t.borderColor }}
                              >
                                {t.emoji} {course.tier}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center">
                              {course.duration} · {course.tier}
                            </p>
                          </div>
                        </Link>
                      );
                    });
                  })()}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Prompt Engineering', 'Machine Learning', 'Computer Vision', 'Data Analytics', 'AI Ethics'].map(tag => (
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
      <div className="container mx-auto max-w-[1320px] px-4 md:px-6">
        <div className="w-full">
          <nav className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src={(isTransparent || theme === 'dark') ? BRANDING.logoLight : BRANDING.logoDark}
                alt={BRANDING.fullName}
                className="h-16 md:h-20 -my-4 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-x-1 flex-nowrap">
              {navigation.map((item) => {
                const hasDropdown = item.children && item.children.length > 0;
                const isMegaCourses = item.megaDropdown;
                const isActive = isNavActive(item);

                return (
                <div
                  key={item.name}
                  className="relative group shrink-0"
                  onMouseEnter={() => {
                    if (isMegaCourses) setShowCourses(true);
                    if (hasDropdown) setActiveDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    if (isMegaCourses) setShowCourses(false);
                    if (hasDropdown) setActiveDropdown(null);
                  }}
                >
                  {(hasDropdown || isMegaCourses) ? (
                    <button
                      className={clsx(
                        'px-3 py-2 text-[14px] font-semibold transition-all rounded-lg relative flex items-center whitespace-nowrap',
                        isTransparent
                          ? 'text-white hover:text-white/80 hover:bg-white/10'
                          : isActive
                            ? 'text-[var(--text-nav-active)] bg-[var(--text-nav)]/10'
                            : 'text-[var(--text-nav)] hover:text-[var(--text-nav-active)] hover:bg-[var(--text-nav)]/5'
                      )}
                      aria-expanded={isMegaCourses ? showCourses : activeDropdown === item.name}
                      aria-controls={`dropdown-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {item.name}
                      <ChevronDown className={clsx(
                        "ml-1 h-3 w-3 transition-transform duration-300",
                        (isMegaCourses ? showCourses : activeDropdown === item.name) && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive: navActive }) => clsx(
                        'px-3 py-2 text-[14px] font-semibold transition-all rounded-lg relative flex items-center whitespace-nowrap',
                        isTransparent
                          ? 'text-white hover:text-white/80 hover:bg-white/10'
                          : navActive
                            ? 'text-[var(--text-nav-active)] bg-[var(--text-nav)]/10'
                            : 'text-[var(--text-nav)] hover:text-[var(--text-nav-active)] hover:bg-[var(--text-nav)]/5'
                      )}
                      end={item.href === '/'}
                    >
                      {item.name}
                    </NavLink>
                  )}

                  {/* Simple Dropdown (Success, Resources) */}
                  {hasDropdown && activeDropdown === item.name && (
                    <div
                      id={`dropdown-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                      className="absolute top-full left-0 w-56 pt-3 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-200 z-[60]"
                    >
                      <div className="bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border-color)] overflow-hidden py-2">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={({ isActive: childActive }) => clsx(
                              'block px-5 py-3 text-sm font-bold transition-all hover:bg-[var(--text-heading)]/5',
                              childActive
                                ? 'text-primary bg-primary/5'
                                : 'text-[var(--text-body)] hover:text-[var(--text-heading)]'
                            )}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Courses Mega Dropdown — Tier-Based */}
                  {isMegaCourses && showCourses && (
                    <div
                      id="dropdown-courses"
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-4 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-300 z-[60]"
                    >
                      <div className="bg-[var(--bg-card)] rounded-[1.5rem] shadow-2xl border border-[var(--border-color)] overflow-hidden">
                        <div className="p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <h3 className="text-xl font-black text-[var(--text-heading)] tracking-tight">Our Programs</h3>
                              <p className="text-sm text-[var(--text-muted)] font-semibold">10 AI programs across 3 tiers</p>
                            </div>
                            <Link to="/courses" className="text-xs font-black text-[var(--text-heading)] hover:opacity-80 transition-all flex items-center bg-[var(--text-heading)]/5 px-3 py-1.5 rounded-full">
                              VIEW ALL
                              <ChevronDown className="ml-1 h-3 w-3 -rotate-90" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                            {TIERS.map((tier) => {
                              const meta = tierMeta[tier];
                              return (
                                <div key={tier} className="space-y-3">
                                  <h4 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-1.5"
                                    style={{ color: meta.color }}
                                  >
                                    {meta.emoji} {tier}
                                  </h4>
                                  <div className="space-y-0.5">
                                    {coursesByTier[tier].map((course) => (
                                      <Link
                                        key={course.id}
                                        to={`/courses/${course.slug}`}
                                        className="group/item flex items-center py-2 px-3 -mx-3 rounded-xl hover:bg-[var(--text-heading)]/5 transition-all"
                                      >
                                        <div
                                          className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] rounded-full shrink-0 group-hover/item:scale-125 transition-all mr-3"
                                          style={{ background: meta.color }}
                                        />
                                        <div>
                                          <p className="text-sm font-bold text-[var(--text-body)] group-hover/item:text-[var(--text-heading)] transition-colors leading-tight">
                                            {course.title}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Bottom CTA bar */}
                        <div className="bg-primary p-5 flex items-center justify-between">
                          <div>
                            <p className="text-white/90 text-sm font-bold">Not sure which program is right for you?</p>
                            <p className="text-white/60 text-xs">Talk to our career counselors</p>
                          </div>
                          <button
                            onClick={() => openModal()}
                            className="px-5 py-2.5 bg-white text-primary rounded-xl text-xs font-black tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95"
                          >
                            Get Guidance
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                );
              })}

              <div className="flex items-center gap-x-2 ml-2">
                <div className="h-6 w-[1px] bg-[var(--border-color)] mx-2" />

                <ThemeToggle className={clsx(isTransparent ? "text-white hover:bg-white/10" : "text-[var(--text-nav)] hover:bg-[var(--text-nav)]/10")} />

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={clsx(
                    "p-2 transition-colors group shrink-0",
                    isTransparent
                      ? "text-white hover:text-white/80"
                      : "text-[var(--text-nav)] hover:text-[var(--text-nav-active)]"
                  )}
                  title="Search Programs"
                >
                  <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={() => openModal()}
                  className="btn-primary px-5 py-2.5 text-[13px] whitespace-nowrap"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle className={clsx(isTransparent ? "text-white hover:bg-white/10" : "text-[var(--text-nav)] hover:bg-[var(--text-nav)]/10")} />
              <button
                onClick={() => setIsSearchOpen(true)}
                className={clsx(
                  "p-2 transition-colors",
                  isTransparent
                    ? "text-white hover:text-white/80"
                    : "text-[var(--text-nav)] hover:text-[var(--text-nav-active)]"
                )}
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className={clsx(
                  "p-2.5 rounded-xl shadow-sm active:scale-95 transition-all",
                  isTransparent
                    ? "text-white bg-white/10 border border-white/20 hover:bg-white/20"
                    : "text-[var(--text-nav)] bg-[var(--text-nav)]/10 border border-[var(--border-color)] hover:bg-[var(--text-nav)]/20"
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-[9999]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-[380px] bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] flex flex-col overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.3)]"
               style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--text-on-inverted)]/10">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{BRANDING.fullName}</p>
                <p className="text-[10px] text-[var(--text-on-inverted)]/40 font-medium mt-1">Navigation Menu</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-[var(--text-on-inverted)]/10 flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-6 px-6">
              <nav className="space-y-1">
                {navigation.map((item, index) => {
                  const hasDropdown = item.children && item.children.length > 0;
                  const isMegaCourses = item.megaDropdown;
                  const isExpanded = mobileExpanded === item.name;
                  const isActive = isNavActive(item);

                  return (
                  <div key={item.name}>
                    {/* Courses mega-expandable */}
                    {isMegaCourses ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                          className={clsx(
                            'w-full flex items-center py-4 group transition-all relative',
                            location.pathname.startsWith('/courses') && 'text-primary'
                          )}
                        >
                          {location.pathname.startsWith('/courses') && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full" />
                          )}
                          <span className="text-[10px] font-black text-[var(--text-on-inverted)]/20 tracking-widest mr-5 ml-3 tabular-nums">
                            0{index + 1}
                          </span>
                          <span className="text-base font-bold flex-1 text-left group-hover:text-primary transition-colors">{item.name}</span>
                          <ChevronDown className={clsx(
                            "h-4 w-4 text-[var(--text-on-inverted)]/30 transition-transform duration-300",
                            isExpanded && "rotate-180 text-primary"
                          )} />
                        </button>

                        {isExpanded && (
                          <div id={`mobile-${item.name.toLowerCase().replace(/\s/g, '-')}`} className="ml-12 mr-2 mb-4 space-y-4">
                            {TIERS.map((tier) => {
                              const meta = tierMeta[tier];
                              return (
                                <div key={tier}>
                                  <p
                                    className="text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"
                                    style={{ color: meta.color }}
                                  >
                                    {meta.emoji} {tier}
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {coursesByTier[tier].map((course) => (
                                      <Link
                                        key={course.id}
                                        to={`/courses/${course.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--text-on-inverted)]/5 text-[var(--text-on-inverted)]/60 hover:bg-primary/20 hover:text-primary transition-all border border-[var(--text-on-inverted)]/5"
                                      >
                                        {course.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                            <Link
                              to="/courses"
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center text-xs font-black text-primary uppercase tracking-widest hover:underline mt-1"
                            >
                              View All <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </>
                    ) : hasDropdown ? (
                      /* Simple dropdown (Success, Resources) */
                      <>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                          className={clsx(
                            'w-full flex items-center py-4 group transition-all relative',
                            isActive && 'text-primary'
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full" />
                          )}
                          <span className="text-[10px] font-black text-[var(--text-on-inverted)]/20 tracking-widest mr-5 ml-3 tabular-nums">
                            0{index + 1}
                          </span>
                          <span className="text-base font-bold flex-1 text-left group-hover:text-primary transition-colors">{item.name}</span>
                          <ChevronDown className={clsx(
                            "h-4 w-4 text-[var(--text-on-inverted)]/30 transition-transform duration-300",
                            isExpanded && "rotate-180 text-primary"
                          )} />
                        </button>

                        {isExpanded && (
                          <div id={`mobile-${item.name.toLowerCase().replace(/\s/g, '-')}`} className="ml-12 mr-2 mb-4 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                  'block py-2.5 text-sm font-semibold transition-colors',
                                  location.pathname === child.href
                                    ? 'text-primary'
                                    : 'text-[var(--text-on-inverted)]/60 hover:text-primary'
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Simple link */
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          'flex items-center py-4 group transition-all relative',
                          location.pathname === item.href ? 'text-primary' : 'text-[var(--text-on-inverted)]/80'
                        )}
                      >
                        {location.pathname === item.href && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full" />
                        )}
                        <span className="text-[10px] font-black text-[var(--text-on-inverted)]/20 tracking-widest mr-5 ml-3 tabular-nums">
                          0{index + 1}
                        </span>
                        <span className="text-base font-bold group-hover:text-primary transition-colors">{item.name}</span>
                      </Link>
                    )}
                  </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 pt-4 border-t border-[var(--text-on-inverted)]/10 space-y-4">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-on-inverted)]/40">
                <a href={`tel:${BRANDING.phone}`} className="flex items-center hover:text-primary transition-colors">
                  <Phone className="h-3 w-3 mr-1.5" /> {BRANDING.phone}
                </a>
                <a href={`mailto:${BRANDING.email}`} className="flex items-center hover:text-primary transition-colors">
                  <Mail className="h-3 w-3 mr-1.5" /> Email Us
                </a>
              </div>
              <button
                onClick={() => { openModal(); setIsOpen(false); }}
                className="w-full py-4 bg-primary text-white font-black text-sm tracking-wider uppercase rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Enroll Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
