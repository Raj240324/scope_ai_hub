import React, { useState, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { Star, Quote, Search, Filter, MessageSquare, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import { BRANDING } from '../data/branding';
import SEO from '../components/utils/SEO';
import Hero from '../components/ui/Hero';
import { m } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fadeUp, staggerContainer, staggerItem } from '../utils/motionVariants';

const reviews = [
  {
    id: 1,
    name:"Senthil Kumar",
    role:"Prompt Engineer",
    course:"Generative AI & Prompt Engineering",
    rating: 5,
    content: `The Prompt Engineering course at ${BRANDING.fullName} was a game-changer. I learned to work with ChatGPT, Claude, and Midjourney like a professional. The hands-on AI workflow projects were exceptional.`,
    image:"https://randomuser.me/api/portraits/men/32.jpg",
    date:"2 weeks ago",
    verified: true
  },
  {
    id: 2,
    name:"Priya Dharshini",
    role:"Data Analyst",
    course:"Data Analytics & AI",
    rating: 5,
    content:"I switched from a non-tech background to data analytics. The Power BI and AI-driven analytics modules were incredible. Landed a data analyst role within a month of completion!",
    image:"https://randomuser.me/api/portraits/women/44.jpg",
    date:"1 month ago",
    verified: true
  },
  {
    id: 3,
    name:"Arun Rajan",
    role:"ML Engineer",
    course:"Machine Learning & Deep Learning",
    rating: 4,
    content:"The ML & Deep Learning course helped me transition from a Python developer to a full ML engineer. The TensorFlow and PyTorch labs were intense and production-grade.",
    image:"https://randomuser.me/api/portraits/men/45.jpg",
    date:"2 months ago",
    verified: true
  },
  {
    id: 4,
    name:"Kavitha Murugan",
    role:"NLP Engineer",
    course:"Natural Language Processing (NLP)",
    rating: 5,
    content:"The NLP program was outstanding! From transformers to building real chatbots with RAG, every module was practical and industry-relevant. The Hugging Face ecosystem training was a highlight.",
    image:"https://randomuser.me/api/portraits/women/65.jpg",
    date:"3 months ago",
    verified: true
  },
  {
    id: 5,
    name:"Rahul Bose",
    role:"Python AI Developer",
    course:"Python for AI & Machine Learning",
    rating: 5,
    content:"As a complete beginner, Python for AI was the perfect starting point. I went from zero to building sentiment analyzers and price predictors in 8 weeks. Truly transformative.",
    image:"https://randomuser.me/api/portraits/men/22.jpg",
    date:"4 months ago",
    verified: true
  },
  {
    id: 6,
    name:"Deepika Raj",
    role:"Computer Vision Engineer",
    course:"Computer Vision & Image AI",
    rating: 5,
    content:"The Computer Vision program is top-notch. From YOLO object detection to medical imaging AI, the modules were incredibly practical. The capstone project gave me a real-world edge.",
    image:"https://randomuser.me/api/portraits/women/28.jpg",
    date:"5 months ago",
    verified: true
  }
];


const Reviews = () => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal } = useModal();

  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const reviewCourseNames = [...new Set(reviews.map(r => r.course))];

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesCourse = selectedCourse === 'All' || review.course === selectedCourse;
      const matchesSearch = review.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           review.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }, [selectedCourse, searchQuery]);

  const stats = [
    { label: 'Average Rating', value: '4.9/5', icon: <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" /> },
    { label: 'Verified Reviews', value: '100+', icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
    { label: 'Student Satisfaction', value: '98%', icon: <ThumbsUp className="h-5 w-5 text-primary" /> },
  ];

  return (
    <Layout>
      <SEO 
        title="Student Reviews & Placements | Success Stories" 
        description="Read what our graduates say about their training experience and successful career transitions after completing programs at Scope AI Hub." 
        canonical="/reviews"
      />
      
      <Hero 
        badge="100+ Verified Reviews · 4.9★ Average"
        title={<>Don't Take Our <span className="text-primary">Word</span> for It.</>}
      />

      {/* Stats Section */}
      <section className="py-12 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
        <div className="container-custom">
          <m.div 
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsVisible ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <m.div variants={staggerItem} key={index} className="flex items-center space-x-4 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                <div className="h-12 w-12 rounded-xl bg-[var(--bg-card)] shadow-sm flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="heading-md font-bold">{stat.value}</div>
                  <div className="text-caption text-[var(--text-muted)]">{stat.label}</div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-[var(--bg-secondary)] min-h-[600px]">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
              <label htmlFor="review_search" className="sr-only">Search reviews</label>
              <input
                type="text"
                id="review_search"
                name="q"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <Filter className="h-5 w-5 text-[var(--text-muted)] shrink-0 hidden md:block" />
              <div className="flex space-x-2">
                {['All', ...reviewCourseNames].map((courseName) => (
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={courseName}
                    onClick={() => setSelectedCourse(courseName)}
                    className={clsx("px-4 py-2 rounded-lg text-small font-medium whitespace-nowrap transition-all",
                      selectedCourse === courseName
                        ?"bg-primary text-[var(--text-on-inverted)] shadow-md shadow-primary/20"
                        :"bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                    )}
                  >
                    {courseName === 'All' ? 'All' : courseName.split(' ').slice(0, 2).join(' ')}
                  </m.button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredReviews.length > 0 ? (
            <m.div 
              ref={gridRef}
              variants={staggerContainer}
              initial="hidden"
              animate={gridVisible ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredReviews.map((review) => (
                <m.div variants={staggerItem} key={review.id} className="bg-[var(--bg-card)] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="h-14 w-14 rounded-2xl object-cover ring-4 ring-[var(--bg-secondary)]"
                      />
                      <div>
                        <h3 className="text-body font-semibold text-[var(--text-heading)] leading-tight">{review.name}</h3>
                        <p className="text-caption text-[var(--text-muted)]">{review.role}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="h-6 w-6 text-accent-success" title="Verified Student">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={clsx("h-4 w-4",
                          i < review.rating ?"text-yellow-400 fill-yellow-400" :"text-[var(--border-color)]"
                        )} 
                      />
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/5 -z-10" />
                    <p className="text-body italic">"{review.content}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--bg-secondary)] flex items-center justify-between">
                    <span className="text-caption font-semibold text-primary px-3 py-1 bg-primary/5 rounded-full uppercase tracking-wider">
                      {review.course.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className="text-caption text-[var(--text-muted)] font-medium">{review.date}</span>
                  </div>
                </m.div>
              ))}
            </m.div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[var(--bg-secondary)] mb-6">
                <MessageSquare className="h-10 w-10 text-[var(--text-muted)]" />
              </div>
              <h3 className="heading-sm font-bold text-[var(--text-heading)] mb-2">No reviews found</h3>
              <p className="text-[var(--text-muted)]">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--bg-inverted)] light-surface overflow-hidden relative text-[var(--text-on-light)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--bg-body)]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <m.div 
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaVisible ? 'visible' : 'hidden'}
          className="container-custom text-center relative z-10"
        >
          <h2 className="heading-lg font-bold text-[var(--text-on-light)] mb-8">
            Ready to be our next success story?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal()}
              className="btn-primary px-10 py-4 text-body-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
            >
              Enroll Now
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal()}
              className="btn-secondary px-10 py-4 text-body-lg text-[var(--text-on-light)] border-[var(--bg-body)]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
            >
              Free Career Counseling
            </m.button>
          </div>
        </m.div>
      </section>
    </Layout>
  );
};

export default Reviews;
