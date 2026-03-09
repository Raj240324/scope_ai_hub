import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CourseCard from '../../components/ui/CourseCard';
import AddonsGrid from '../../components/ui/AddonsGrid';
import { courses, TIERS, tierMeta } from '../../data/courses';
import { addons } from '../../data/addons';
import { Search, X, Sparkles, GraduationCap, Award } from 'lucide-react';
import SEO from '../../components/utils/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  // Scroll to courses grid with header offset
  const scrollToCourses = () => {
    const element = document.getElementById("courses-grid");
    if (element) {
      const headerOffset = 100; // Adjust to match navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior:"smooth"
      });
    }
  };

  // Trigger scroll whenever filters change
  useEffect(() => {
    if (selectedTier !== 'All' || searchTerm !== '') {
      scrollToCourses();
    }
  }, [selectedTier, searchTerm]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = selectedTier === 'All' || course.tier === selectedTier;
      return matchesSearch && matchesTier;
    });
  }, [searchTerm, selectedTier]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTier('All');
  };

  const tierTabs = ['All', ...TIERS];

  return (
    <Layout immersive={true}>
      <SEO 
        title="AI & Machine Learning Courses in Chennai" 
        description="Explore our comprehensive range of AI, Machine Learning, Data Science, and Full Stack Development programs." 
        canonical="/courses"
      />
      {/* Hero — Editorial Lead-in */}
      <section className="relative bg-[var(--bg-body)] pt-36 md:pt-44 pb-28 md:pb-36 overflow-hidden">
        {/* Ambient texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl blur-layer" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl blur-layer" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            10 Industry-Aligned Programs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="heading-hero text-[var(--text-heading)] tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6"
          >
            Choose Your
            <span className="relative inline-block ml-3">
              <span className="font-extrabold text-primary">Path</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 9" fill="none">
                <path d="M2 7C30 2 130 -3 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-body sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From your first prompt to production-grade ML pipelines — programs engineered 
            for every stage of your AI career.
          </motion.p>
        </div>
      </section>

      {/* Main Content: Sidebar + Courses Grid */}
      <div className="container-custom pb-24 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-[28%] xl:w-[25%]">
            <div className="lg:sticky lg:top-24">
              <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-lg shadow-black/[0.04] border border-[var(--border-color)]">
                
                {/* Filter Header */}
                <div className="mb-6">
                  <h2 className="heading-sm font-semibold mb-1 text-[var(--text-heading)]">
                    Filter Programs
                  </h2>
                  <p className="text-caption text-[var(--text-muted)]">
                    Find your perfect AI course
                  </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="course-search-sidebar" className="block text-caption font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
                    Search
                  </label>
                  <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4 group-focus-within:text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      id="course-search-sidebar"
                      name="course-search-sidebar"
                      placeholder="Search programs..."
                      className="w-full pl-10 pr-3.5 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-[var(--text-muted)]/60 font-medium text-small text-[var(--text-on-light)] dark:text-[var(--text-on-dark)]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tier Filter */}
                <div className="mb-6">
                  <label className="block text-caption font-bold uppercase tracking-wider mb-3 text-[var(--text-muted)]">
                    Level
                  </label>
                  <div className="space-y-2">
                    {tierTabs.map((tier) => {
                      const isActive = selectedTier === tier;
                      const meta = tier !== 'All' ? tierMeta[tier] : null;
                      const count = tier === 'All' ? courses.length : courses.filter(c => c.tier === tier).length;

                      return (
                        <button
                          key={tier}
                          onClick={() => setSelectedTier(tier)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-small font-semibold transition-all duration-200 border cursor-pointer ${
                            isActive
                              ? 'shadow-sm'
                              : 'border-transparent text-[var(--text-body)] hover:bg-[var(--bg-body)] hover:border-[var(--border-color)] hover:text-[var(--text-heading)]'
                          }`}
                          style={
                            isActive && meta
                              ? {
                                  background: meta.softBg,
                                  color: meta.color,
                                  borderColor: meta.borderColor,
                                }
                              : isActive
                              ? {
                                  background: 'var(--bg-inverted)',
                                  color: 'var(--text-on-light)',
                                  borderColor: 'var(--bg-inverted)',
                                }
                              : {}
                          }
                        >
                          <span className="flex items-center gap-2">
                            {meta && <span className="text-body">{meta.emoji}</span>}
                            <span>{tier}</span>
                          </span>
                          <span className={`text-caption font-bold px-2 py-0.5 rounded-full transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center justify-between text-caption">
                    <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Results
                    </span>
                    <span className="font-bold text-[var(--text-heading)]">
                      {filteredCourses.length} program{filteredCourses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedTier !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 text-red-500 hover:text-red-600 transition-colors text-caption font-bold uppercase tracking-wider rounded-lg border border-red-500/20 hover:bg-red-500/5"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear All Filters
                  </button>
                )}

                {/* Enrollment Status */}
                <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Enrollment Open
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content - Courses Grid */}
          <main id="courses-grid" className="flex-1 lg:w-[72%] xl:w-[75%]">
            <AnimatePresence mode="wait">
              {filteredCourses.length > 0 ? (
                <motion.div
                  key={selectedTier + searchTerm}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                  {filteredCourses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-color)]"
                >
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] mb-6">
                    <GraduationCap className="h-7 w-7 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="heading-sm font-semibold text-[var(--text-heading)] mb-2">No programs found</h3>
                  <p className="text-[var(--text-muted)] mb-8 text-small">Try adjusting your search or filters.</p>
                  <button onClick={clearFilters} className="btn-primary text-small px-8 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Career Advantages Section */}
      <section id="career-benefits" className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-20 md:py-28">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold uppercase tracking-[0.2em]"
            >
              <Award className="h-3.5 w-3.5" />
              Included with Every Program
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="heading-lg font-bold tracking-tight text-[var(--text-heading)]"
            >
              12 Career Advantages{' '}
              <span className="font-extrabold text-primary">Included</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-body sm:text-lg leading-relaxed font-medium text-[var(--text-muted)]"
            >
              Every program comes with comprehensive career support — from resume preparation to job referrals. We're invested in your success.
            </motion.p>
          </div>

          {/* Add-ons Grid */}
          <AddonsGrid addons={addons} variant="full" showBadge={true} />
        </div>
      </section>
    </Layout>
  );
};

export default CoursesList;
