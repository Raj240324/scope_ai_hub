import React from 'react';
import { motion } from 'framer-motion';
import { addons } from '../../data/addons';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareerSupportSection = () => {
  // Show featured 4 add-ons for home page
  const featuredAddons = addons.slice(0, 4);

  return (
    <section className="section-padding bg-[var(--bg-body)] border-y border-[var(--border-color)]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            12 Career Advantages Included
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            Everything You Need to{' '}
            <span className="text-primary">Get Hired</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg leading-relaxed font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            From resume building to job referrals — we support you at every step of your career journey.
          </motion.p>
        </div>

        {/* Featured Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredAddons.map((addon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {addon.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg mb-3 leading-tight" style={{ color: 'var(--text-heading)' }}>
                {addon.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-body)' }}>
                {addon.description}
              </p>

              {/* Included Badge */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                  ✓ Included
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to see all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            View All 12 Benefits
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSupportSection;
