import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Zap } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { motion } from 'framer-motion';

const categoryColors = {
  'Development': 'from-blue-600 to-indigo-600',
  'Data Science': 'from-violet-600 to-purple-600',
  'Design': 'from-pink-500 to-rose-500',
  'Security': 'from-emerald-600 to-teal-600',
  'Infrastructure': 'from-cyan-500 to-blue-500',
  'Marketing': 'from-orange-500 to-amber-500',
  'default': 'from-primary to-primary',
};

const categoryImages = {
  'Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
  'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
  'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
  'Security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
  'Infrastructure': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
  'Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
};

const CourseCard = ({ course, index = 0 }) => {
  const { openModal } = useModal();
  const imageUrl = categoryImages[course.category] || categoryImages.default;
  const gradient = categoryColors[course.category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col h-full"
    >
      <Link
        to={`/courses/${course.slug}`}
        className="flex flex-col h-full bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Top-left: Category pill */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${gradient} text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg`}>
              {course.category}
            </span>
          </div>

          {/* Bottom row: Level + Duration on the image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-white/90 text-xs font-bold">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              {course.level}
            </span>
            <span className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-[var(--text-heading)] leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2 mb-5">
            {course.shortDescription}
          </p>

          {/* Tools/Tech tags */}
          {course.tools && course.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {course.tools.slice(0, 4).map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-md border border-[var(--border-color)] uppercase tracking-wider"
                >
                  {tool}
                </span>
              ))}
              {course.tools.length > 4 && (
                <span className="px-2.5 py-1 text-[10px] font-bold text-primary bg-primary/5 rounded-md border border-primary/15 uppercase tracking-wider">
                  +{course.tools.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Footer: Price + CTA */}
          <div className="mt-auto pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Fee</span>
              <span className="text-lg font-black text-primary leading-none">{course.price}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-heading)] group-hover:text-primary transition-colors">
              Explore
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>

      {/* Floating Enquire button — appears on hover */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal(course.title);
        }}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white active:scale-95"
      >
        Enquire
      </button>
    </motion.div>
  );
};

export default CourseCard;
