import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import CourseCard from '../../components/ui/CourseCard';
import { courses, TIERS, tierMeta } from '../../data/courses';
import { Search, X, Sparkles, GraduationCap } from 'lucide-react';
import { BRANDING } from '../../data/branding';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.programNumber.toLowerCase().includes(searchTerm.toLowerCase());
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
    <Layout
      title={`All Programs | ${BRANDING.fullName}`}
      description="Browse our 10 industry-aligned AI programs across Beginner, Intermediate, and Advanced tiers."
      immersive={true}
    >
      {/* Hero — Editorial Lead-in */}
      <section className="relative bg-[var(--bg-body)] pt-36 md:pt-44 pb-28 md:pb-36 overflow-hidden">
        {/* Ambient texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            10 Industry-Aligned Programs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-heading)] tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6"
          >
            Choose Your
            <span className="relative inline-block ml-3">
              <span className="text-primary">Path</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 9" fill="none">
                <path d="M2 7C30 2 130 -3 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From your first prompt to production-grade ML pipelines — programs engineered 
            for every stage of your AI career.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar — Elevated floating panel */}
      <div className="container-custom -mt-16 sm:-mt-20 relative z-20 mb-16 sm:mb-20">
        <div className="bg-[var(--bg-card)] rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-8 shadow-2xl shadow-black/[0.06] border border-[var(--border-color)]">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4.5 w-4.5 group-focus-within:text-primary transition-colors duration-300" />
              <label htmlFor="course-search-main" className="sr-only">Search programs</label>
              <input
                type="text"
                id="course-search-main"
                name="course-search-main"
                placeholder="Search by name, topic, or program number..."
                className="w-full pl-12 pr-5 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-[var(--text-muted)]/60 font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tier Tabs — Personality bubbles */}
            <div className="flex flex-wrap items-center gap-2">
              {tierTabs.map((tier) => {
                const isActive = selectedTier === tier;
                const meta = tier !== 'All' ? tierMeta[tier] : null;

                return (
                  <motion.button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    whileTap={{ scale: 0.97 }}
                    className={`relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      isActive
                        ? 'shadow-md'
                        : 'bg-transparent border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-secondary)]'
                    }`}
                    style={
                      isActive && meta
                        ? {
                            background: meta.softBg,
                            color: meta.color,
                            borderColor: meta.borderColor,
                            boxShadow: `0 4px 16px ${meta.color}15`,
                          }
                        : isActive
                        ? {
                            background: 'var(--bg-inverted)',
                            color: 'var(--text-on-inverted)',
                            borderColor: 'var(--bg-inverted)',
                          }
                        : undefined
                    }
                  >
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        layoutId="tier-indicator"
                        className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-card)]"
                        style={{ background: meta?.color || 'var(--bg-inverted)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {meta && <span className="mr-1.5">{meta.emoji}</span>}
                    {tier}
                    <span className="ml-1.5 opacity-50 font-semibold">
                      {tier === 'All' ? courses.length : courses.filter(c => c.tier === tier).length}
                    </span>
                  </motion.button>
                );
              })}

              {(searchTerm || selectedTier !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[var(--text-muted)] hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-wider rounded-xl border border-[var(--border-color)] hover:border-red-500/20 hover:bg-red-500/5"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/60">
              <p className="text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-[0.15em]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 align-middle" />
                {filteredCourses.length} program{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Enrollment Open
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid — Staggered masonry-inspired layout */}
      <div className="container-custom pb-24 sm:pb-32">
        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div
              key={selectedTier + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
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
              <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">No programs found</h3>
              <p className="text-[var(--text-muted)] mb-8 text-sm">Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="btn-primary text-sm px-8 py-3 rounded-xl">
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default CoursesList;
