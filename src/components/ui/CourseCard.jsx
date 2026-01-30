import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe, ArrowRight, Star, Users, Zap, Download } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { motion } from 'framer-motion';
import { ScaleOnHover } from '../utils/Animations';

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
      
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/95 backdrop-blur text-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-primary/10">
            {course.category}
          </span>
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="flex items-center bg-navy/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/10">
            <Zap className="h-3 w-3 mr-1.5 text-accent fill-current" />
            {course.level}
          </div>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">Premium Course</span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
          {course.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {course.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100">
          <div className="flex items-center text-sm text-slate-600 font-bold">
            <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Clock className="h-4 w-4" />
            </div>
            {course.duration}
          </div>
          <div className="flex items-center text-sm text-slate-600 font-bold">
            <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Globe className="h-4 w-4" />
            </div>
            {course.mode.split('/')[0]}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tuition Fee</span>
              <span className="text-lg font-black text-primary">{course.price}</span>
            </div>
            <ScaleOnHover>
              <button 
                onClick={() => openModal(course.title)}
                className="h-12 px-6 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
              >
                Enquire
              </button>
            </ScaleOnHover>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            <ScaleOnHover scale={1.02}>
              <button
                onClick={() => openModal(`Syllabus: ${course.title}`)}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/btn"
              >
                <Download className="mr-2 h-3.5 w-3.5" />
                Syllabus
              </button>
            </ScaleOnHover>

            <ScaleOnHover scale={1.02}>
              <Link
                to={`/courses/${course.slug}`}
                className="flex items-center justify-center w-full py-3 px-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all duration-300 group/btn shadow-lg shadow-slate-900/10"
              >
                Details
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </ScaleOnHover>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
