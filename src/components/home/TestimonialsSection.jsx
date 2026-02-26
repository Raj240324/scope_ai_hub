import React from 'react';
import DesignTestimonial from '../ui/DesignTestimonial';

const TestimonialsSection = () => (
  <section className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="heading-md mb-4 text-[var(--text-heading)]">Success Stories</h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg">Hear from our students who are now working at top tech companies.</p>
      </div>
      <DesignTestimonial />
    </div>
  </section>
);

export default TestimonialsSection;
