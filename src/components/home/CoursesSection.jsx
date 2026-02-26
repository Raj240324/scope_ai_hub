import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../utils/Animations';
import CourseCard from '../ui/CourseCard';

const CoursesSection = ({ courses }) => (
  <section id="trending-courses" className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <h2 className="heading-md mb-4 text-[var(--text-heading)]">Top Trending Courses</h2>
          <p className="text-[var(--text-muted)] text-base md:text-lg">
            Choose from our high-demand courses designed to make you industry-ready.
          </p>
        </div>
        <Link to="/courses" className="hidden md:flex items-center text-primary font-bold hover:underline mt-4 md:mt-0 group">
          View all courses <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <StaggerItem key={course.id}>
            <CourseCard course={course} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-12 text-center md:hidden">
        <Link to="/courses" className="btn-secondary w-full py-4 text-lg">
          Explore All Courses
        </Link>
      </div>
    </div>
  </section>
);

export default CoursesSection;
