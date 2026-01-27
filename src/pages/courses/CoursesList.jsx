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
    >
      <Hero 
        title={<>Explore Our <span className="text-primary">Courses</span></>}
        subtitle="Choose from over 10+ industry-aligned courses designed to help you launch or accelerate your career in tech."
      />

      <div className="container-custom section-padding pt-0">
        {/* Filters & Search */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 mb-16 -mt-24 relative z-10 shadow-2xl border border-white/5 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5 group-focus-within:text-primary transition-colors" />
              <label htmlFor="course-search-main" className="sr-only">Search for your future career</label>
              <input
                type="text"
                id="course-search-main"
                name="course-search-main"
                placeholder="Search for your future career..."
                className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-600 font-medium"
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
                  className="appearance-none pl-6 pr-12 py-5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer min-w-[180px] font-medium"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                  ))}
                </select>
                <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none group-hover:text-primary transition-colors" />
              </div>

              <div className="relative group">
                <label htmlFor="level-filter" className="sr-only">Filter by Level</label>
                <select
                  id="level-filter"
                  name="level"
                  className="appearance-none pl-6 pr-12 py-5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer min-w-[160px] font-medium"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map(level => (
                    <option key={level} value={level} className="bg-slate-900 text-white">{level}</option>
                  ))}
                </select>
                <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none group-hover:text-primary transition-colors" />
              </div>

              {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-6 py-5 text-slate-500 hover:text-white transition-colors font-black uppercase tracking-widest text-[10px]"
                >
                  <X className="h-4 w-4" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">
              <span className="text-primary mr-2">●</span>
              Showing <span className="text-white">{filteredCourses.length}</span> programs found
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Status</span>
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
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
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
