import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import CourseCard from '../../components/ui/CourseCard';
import { courses } from '../../data/courses';
import { Search, Filter, X } from 'lucide-react';
import { BRANDING } from '../../data/branding';

import Hero from '../../components/ui/Hero';

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
  };

  return (
    <Layout 
      title={`All Courses | ${BRANDING.fullName} Training Institute`}
      description="Browse our comprehensive list of software training courses. From Web Development to Data Science, find the right program for your career."
      immersive={true}
    >
      <Hero 
        title={<>Explore Our <span className="text-primary">Courses</span></>}
        subtitle="Choose from over 10+ industry-aligned courses designed to help you launch or accelerate your career in tech."
        variant="simple"
        className="pt-32 pb-32 md:pt-48 md:pb-40"
      />

      <div className="container-custom section-padding pt-0">
        {/* Filters & Search - Floating Card */}
        <div className="bg-[var(--bg-card)] rounded-[3rem] p-8 md:p-12 mb-16 -mt-24 relative z-10 shadow-2xl border border-[var(--border-color)] backdrop-blur-xl overflow-hidden">
          {/* Decorative gradients for the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-6">
            <div className="flex-grow relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-5 w-5 group-focus-within:text-primary transition-colors" />
              <label htmlFor="course-search-main" className="sr-only">Search for your future career</label>
              <input
                type="text"
                id="course-search-main"
                name="course-search-main"
                placeholder="Search for your future career..."
                className="w-full pl-14 pr-6 py-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-[var(--text-muted)] font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="relative group">
                <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
                <select
                  id="category-filter"
                  name="category"
                  className="appearance-none pl-6 pr-12 py-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer min-w-[180px] font-medium hover:border-primary/40"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[var(--bg-card)] text-[var(--text-heading)]">{cat}</option>
                  ))}
                </select>
                <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4 pointer-events-none group-hover:text-primary transition-colors" />
              </div>

              <div className="relative group">
                <label htmlFor="level-filter" className="sr-only">Filter by Level</label>
                <select
                  id="level-filter"
                  name="level"
                  className="appearance-none pl-6 pr-12 py-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer min-w-[160px] font-medium hover:border-primary/40"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map(level => (
                    <option key={level} value={level} className="bg-[var(--bg-card)] text-[var(--text-heading)]">{level}</option>
                  ))}
                </select>
                <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4 pointer-events-none group-hover:text-primary transition-colors" />
              </div>

              {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-6 py-5 text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors font-black uppercase tracking-widest text-[10px] bg-[var(--bg-secondary)] hover:bg-primary/10 rounded-2xl border border-[var(--border-color)] hover:border-primary/30"
                >
                  <X className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between border-t border-[var(--border-color)] pt-8">
            <p className="text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
              <span className="text-primary mr-2">●</span>
              Showing <span className="text-[var(--text-heading)]">{filteredCourses.length}</span> programs found
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">Status</span>
              <div className="flex items-center bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Enrollment Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-3xl border border-dashed border-[var(--border-color)]">
            <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">No courses found</h3>
            <p className="text-[var(--text-muted)] mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={clearFilters} className="btn-primary">
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CoursesList;
