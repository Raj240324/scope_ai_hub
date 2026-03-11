import React from 'react';
import { m } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/motionVariants';
import { addons } from '../../data/addons';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareerSupportSection = () => {
  // Show featured 4 add-ons for home page
  const featuredAddons = addons.slice(0, 4);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <m.div 
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container-custom"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            12 Career Advantages Included
          </m.div>

          <m.h2
            variants={fadeUp}
            className="heading-lg font-bold tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            Everything You Need to{' '}
            <span className="font-extrabold text-primary">Get Hired</span>
          </m.h2>

          <m.p
            variants={fadeUp}
            className="text-body sm:text-lg leading-relaxed font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            From resume building to job referrals — we support you at every step of your career journey.
          </m.p>
        </div>

        {/* Featured Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredAddons.map((addon, index) => (
            <m.div
              key={index}
              variants={staggerItem}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 heading-hero mb-4 group-hover:scale-110 transition-transform duration-300">
                {addon.icon}
              </div>

              {/* Title */}
              <h3 className="heading-sm font-semibold mb-3 leading-tight" style={{ color: 'var(--text-heading)' }}>
                {addon.title}
              </h3>

              {/* Description */}
              <p className="text-small leading-relaxed line-clamp-3" style={{ color: 'var(--text-body)' }}>
                {addon.description}
              </p>

              {/* Included Badge */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-caption font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                  ✓ Included
                </span>
              </div>
            </m.div>
          ))}
        </div>

        {/* CTA to see all */}
        <m.div
          variants={fadeUp}
          className="text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[var(--text-on-inverted)] rounded-full font-bold text-small uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            View All 12 Benefits
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </m.div>
      </m.div>
    </section>
  );
};

export default CareerSupportSection;
