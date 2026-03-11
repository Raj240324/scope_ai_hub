import React from 'react';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import DesignTestimonial from '../ui/DesignTestimonial';

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
  <section className="section-padding bg-[var(--bg-body)] border-b border-[var(--border-color)]">
    <m.div 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="container-custom"
    >
      <div className="text-center max-w-3xl mx-auto mb-8">
        <m.h2 variants={fadeUp} className="heading-lg font-semibold mb-4 text-[var(--text-heading)]">Success Stories</m.h2>
        <m.p variants={fadeUp} className="text-[var(--text-muted)] text-body-lg">Hear from our students who are now working at top tech companies.</m.p>
      </div>
      <m.div variants={fadeUp}>
        <DesignTestimonial />
      </m.div>
    </m.div>
  </section>
  );
};

export default TestimonialsSection;
