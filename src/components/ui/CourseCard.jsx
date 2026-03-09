import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { tierMeta } from '../../data/courses';

const CourseCardComponent = ({ course, index = 0 }) => {
  const tier = tierMeta[course.tier] || tierMeta.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <Link
        to={`/courses/${course.slug}`}
        className="block h-full relative rounded-[20px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-900/8 dark:hover:shadow-black/40 no-underline"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Card Content Container */}
        <div className="relative h-full flex flex-col">
          
          {/* Main Content Area */}
          <div className="flex-1 p-6 sm:p-7">
            
            {/* Header: Tier Badge */}
            <div className="flex items-center mb-5">
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${tier.color}15`,
                  color: tier.color,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tier.color }} />
                {course.tier}
              </div>
            </div>

            {/* Title */}
            <h3 className="heading-sm font-semibold mb-3 transition-colors duration-300">
              {course.title}
            </h3>

            {/* Tagline */}
            <p className="text-body mb-6 line-clamp-2">
              {course.tagline}
            </p>

            {/* Meta Information Grid */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2.5 text-caption font-semibold text-[var(--text-body))]">
                <div 
                  className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <Clock className="h-3.5 w-3.5" style={{ color: tier.color }} />
                </div>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2.5 text-caption font-semibold" style={{ color: tier.color }}>
                <div 
                  className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <span>{course.salaryRange}</span>
              </div>
              <div className="flex items-center gap-2.5 text-caption font-semibold text-[var(--text-body))]">
                <div 
                  className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <BookOpen className="h-3.5 w-3.5" style={{ color: tier.color }} />
                </div>
                <span>{course.modules.length} Modules</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div 
            className="px-6 sm:px-7 py-4"
            style={{
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-caption font-bold uppercase tracking-wider text-[var(--text-muted))]">
                View Course
              </span>
              <div 
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  backgroundColor: tier.color,
                }}
              >
                <ArrowRight className="h-4 w-4 text-[var(--text-on-inverted)] transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CourseCard = React.memo(CourseCardComponent);

export default CourseCard;
