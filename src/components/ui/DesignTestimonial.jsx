import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const testimonials = [
  {
    quote: 'The industry-driven approach at Scope AI Hub made all the difference. It wasn\'t just theory — we built real solutions that prepared me for my job from day one.',
    author: 'Nisha K',
    role: 'Cloud Computing',
    company: 'TechData',
  },
  {
    quote: 'What I loved most was the practical exposure. The structured learning path and career support helped me transition smoothly into the tech industry.',
    author: 'Rahul S',
    role: 'Python & AI Foundations',
    company: 'ZOHO',
  },
  {
    quote: 'Scope AI Hub gave me real confidence through hands-on projects and structured mentorship. The practical exposure helped me secure opportunities across leading technology companies.',
    author: 'Arjun R',
    role: 'AI & Machine Learning',
    company: 'Kynhood',
  },
];

export default function DesignTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[activeIndex];

  return (
    <div className="flex items-center justify-center overflow-hidden py-12 md:py-20">
      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-6" onMouseMove={handleMouseMove}>

        {/* Oversized index number */}
        <motion.div
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black text-primary/[0.04] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex">
          {/* Left column — vertical text + progress */}
          <div className="hidden md:flex flex-col items-center justify-center pr-12 lg:pr-16 border-r border-[var(--border-color)]">
            <motion.span
              className="text-caption font-bold text-[var(--text-muted)] tracking-widest uppercase"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Success Stories
            </motion.span>

            {/* Vertical progress */}
            <div className="relative h-24 w-px bg-[var(--border-color)] mt-6">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center — main content */}
          <div className="flex-1 md:pl-12 lg:pl-16 py-4 md:py-8">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 text-caption font-bold text-[var(--text-muted)] uppercase tracking-wider border border-[var(--border-color)] rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Now at {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with word reveal */}
            <div className="relative mb-8 md:mb-10 min-h-[100px] md:min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="heading-sm sm:text-2xl md:heading-hero text-[var(--text-heading)] leading-snug tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  &ldquo;
                  {current.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 15, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.4,
                            delay: i * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -8,
                          transition: { duration: 0.15, delay: i * 0.015 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  &rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author + navigation */}
            <div className="flex items-end justify-between flex-wrap gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="w-6 h-px bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-small font-bold text-[var(--text-heading)]">{current.author}</p>
                    <p className="text-caption text-primary font-bold uppercase tracking-wider">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-[var(--text-muted)]"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-[var(--text-muted)]"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="absolute -bottom-10 left-0 right-0 overflow-hidden opacity-[0.04] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap heading-hero text-[var(--text-heading)]"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-6">
                {testimonials.map((t) => t.company).join(' • ')} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
