import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AddonsGrid = ({ addons, variant = 'full', showBadge = true }) => {
  // Full variant: 3 columns with full descriptions
  // Compact variant: 2 columns with shorter layout
  const gridCols = variant === 'full' 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
    : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {addons.map((addon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          {/* Free Badge */}
          {showBadge && addon.isFree && (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/20">
              Included
            </div>
          )}

          {/* Icon */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-3xl group-hover:scale-110 transition-transform duration-300">
              {addon.icon}
            </div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--text-heading)' }}>
              {addon.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {addon.description}
          </p>

          {/* Check Icon for Included Items */}
          {addon.isFree && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400">
                <Check className="h-4 w-4" />
                <span>Included with every program</span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AddonsGrid;
