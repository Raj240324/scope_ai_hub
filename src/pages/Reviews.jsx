import React, { useState, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { Star, Quote, Search, Filter, MessageSquare, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';

const reviews = [
  {
    id: 1,
    name: "Senthil Kumar",
    role: "Full Stack Developer",
    course: "Full Stack Web Development",
    rating: 5,
    content: "The Full Stack course at Raj Institute was a game-changer for me. I went from zero coding knowledge to building a complete e-commerce site. The mentors are always ready to help even after class hours.",
    image: "https://i.pravatar.cc/150?u=senthil",
    date: "2 weeks ago",
    verified: true
  },
  {
    id: 2,
    name: "Priya Dharshini",
    role: "UI/UX Designer",
    course: "UI/UX Design with Figma",
    rating: 5,
    content: "I switched from a non-tech background to UI/UX design. The instructors were patient and the hands-on approach really helped me build a professional portfolio. I landed a job within 1 month of completion!",
    image: "https://i.pravatar.cc/150?u=priya",
    date: "1 month ago",
    verified: true
  },
  {
    id: 3,
    name: "Arun Rajan",
    role: "DevOps Engineer",
    course: "Cloud Computing & DevOps",
    rating: 4,
    content: "The Cloud & DevOps course helped me upskill and land a better position in my current company. The lab sessions were intense and very practical. Highly recommended for working professionals.",
    image: "https://i.pravatar.cc/150?u=arun",
    date: "2 months ago",
    verified: true
  },
  {
    id: 4,
    name: "Kavitha Murugan",
    role: "Data Scientist",
    course: "Data Science & Machine Learning",
    rating: 5,
    content: "Exceptional teaching! The way they explain complex mathematical concepts in simple terms is amazing. The projects on real-world datasets gave me the confidence I needed for interviews.",
    image: "https://i.pravatar.cc/150?u=kavitha",
    date: "3 months ago",
    verified: true
  },
  {
    id: 5,
    name: "Rahul Bose",
    role: "Frontend Developer",
    course: "Full Stack Web Development",
    rating: 5,
    content: "I joined the weekday batch and the progress I made in 3 months is unbelievable. The focus on React and modern CSS frameworks like Tailwind was exactly what I was looking for.",
    image: "https://i.pravatar.cc/150?u=rahul",
    date: "4 months ago",
    verified: true
  },
  {
    id: 6,
    name: "Deepika Raj",
    role: "Cyber Security Analyst",
    course: "Cyber Security & Ethical Hacking",
    rating: 5,
    content: "The best place in Tamil Nadu for Cyber Security training. The lab setup is top-notch and the instructor has real-world experience in penetration testing.",
    image: "https://i.pravatar.cc/150?u=deepika",
    date: "5 months ago",
    verified: true
  }
];

import Hero from '../components/ui/Hero';

const Reviews = () => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal } = useModal();

  const courseNames = ['All', ...courses.map(c => c.title)];

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
      <Hero 
        title={<>Student <span className="text-primary-light">Success</span> Stories</>}
        subtitle="Don't just take our word for it. Hear from our alumni who have transformed their careers with Raj Software Institute."
      />

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <label htmlFor="review_search" className="sr-only">Search reviews</label>
              <input
                type="text"
                id="review_search"
                name="q"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <Filter className="h-5 w-5 text-slate-400 shrink-0 hidden md:block" />
              <div className="flex space-x-2">
                {['All', 'Full Stack', 'UI/UX', 'Data Science', 'Cloud'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCourse(category === 'All' ? 'All' : courses.find(c => c.title.includes(category))?.title || 'All')}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                      (selectedCourse.includes(category) || (category === 'All' && selectedCourse === 'All'))
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="h-14 w-14 rounded-2xl object-cover ring-4 ring-slate-50"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">{review.name}</h3>
                        <p className="text-sm text-slate-500">{review.role}</p>
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
                        className={clsx(
                          "h-4 w-4",
                          i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"
                        )} 
                      />
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/5 -z-10" />
                    <p className="text-slate-600 leading-relaxed italic">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary px-3 py-1 bg-primary/5 rounded-full uppercase tracking-wider">
                      {review.course.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-slate-100 mb-6">
                <MessageSquare className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No reviews found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to be our next success story?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openModal()}
              className="px-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl"
            >
              Enroll Now
            </button>
            <button 
              onClick={() => openModal()}
              className="px-10 py-4 bg-primary-dark text-white font-bold rounded-xl hover:bg-opacity-90 transition-all border border-white/20"
            >
              Free Career Counseling
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
