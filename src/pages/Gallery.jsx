import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import { motion } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from '../components/utils/Animations';
import { BRANDING } from '../data/branding';

// Gallery data
const galleryCategories = ['All', 'Campus', 'Classrooms', 'Placements', 'Workshops'];

const galleryItems = [
  {
    id: 1,
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    title: 'Main Campus Building',
    description: 'Our state-of-the-art campus in Chennai'
  },
  {
    id: 2,
    category: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    title: 'Modern Computer Lab',
    description: 'Fully equipped computer lab with latest hardware'
  },
  {
    id: 3,
    category: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    title: 'Interactive Classroom',
    description: 'Smart classroom with projector and whiteboard'
  },
  {
    id: 4,
    category: 'Placements',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80&w=800',
    title: 'Campus Placement Drive',
    description: 'Students attending placement interviews'
  },
  {
    id: 5,
    category: 'Placements',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    title: 'Placed Students Celebration',
    description: 'Celebrating successful placements'
  },
  {
    id: 6,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    title: 'Annual Tech Fest 2025',
    description: 'Students participating in tech competitions'
  },
  {
    id: 7,
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=800',
    title: 'React Workshop',
    description: 'Hands-on workshop on React.js fundamentals'
  },
  {
    id: 8,
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    title: 'Team Collaboration Session',
    description: 'Students working on group projects'
  },
  {
    id: 9,
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    title: 'Reception Area',
    description: 'Welcoming reception and lobby area'
  },
  {
    id: 10,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
    title: 'Guest Lecture Session',
    description: 'Industry expert sharing insights'
  },
  {
    id: 11,
    category: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    title: 'Student Practice Session',
    description: 'Students coding during practice hours'
  },
  {
    id: 12,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
    title: 'Certificate Distribution',
    description: 'Students receiving completion certificates'
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <Layout 
      title={`Campus Gallery | ${BRANDING.fullName} Training Institute`}
      description={`Explore photos from our campus, classrooms, placement drives, and events. See the ${BRANDING.fullName} experience in pictures.`}
    >
      <Hero
        badge={
          <div className="flex items-center space-x-2">
            <Camera className="h-3 w-3" />
            <span>Our Campus Life</span>
          </div>
        }
        title={<>Explore <span className="text-primary">Our World</span></>}
        subtitle={`Take a visual tour of our campus, classrooms, and the vibrant community at ${BRANDING.fullName}.`}
      />

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <StaggerItem key={item.id}>
                <ScaleOnHover 
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-black text-primary bg-white px-2 py-1 rounded-full uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold mt-2">{item.title}</h3>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  Coming Soon
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  360° Virtual <span className="text-primary">Campus Tour</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Can't visit us in person? Take an immersive virtual tour of our campus, labs, and classrooms right from your home.
                </p>
                <button className="btn-primary flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Notify Me When Ready
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-video rounded-2xl overflow-hidden border-4 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
                    alt="Virtual Tour Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh]">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-slate-400 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
