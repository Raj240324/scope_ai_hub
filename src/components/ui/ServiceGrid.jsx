import React, { forwardRef } from"react";
import { motion } from"framer-motion";
import { cn } from"../../lib/utils"; 

const ServiceGrid = forwardRef(({ title, subtitle, services, className, ...props }, ref) => {
  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the animation of children by 0.1s
      },
    },
  };

  // Animation variants for each grid item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type:"spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn("w-full py-12 md:py-16 lg:py-20", className)}
      {...props}
    >
      <div className="container-custom">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h2 className="heading-lg font-semibold text-[var(--text-heading)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[var(--text-muted)] text-body-lg md:text-xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Animated Grid Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin:"-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center justify-start gap-4 text-center p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm cursor-default"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }} // Hover animation
              transition={{ type:"spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/5 mb-2 group-hover:bg-primary/10 transition-colors">
                <img
                  src={service.imageUrl}
                  alt={`${service.name} skill icon`}
                  width={48}
                  height={48}
                  className="object-contain rounded-md transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                />
              </div>
              
              <div className="flex flex-col gap-1 items-center">
                <span className="text-body sm:text-lg font-bold text-[var(--text-heading)] transition-colors duration-300 group-hover:text-primary">
                  {service.name}
                </span>
                
                {/* Custom Demand Pill */}
                {service.demand && (
                  <span className={`text-caption font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mt-1 ${
                    service.demand === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    service.demand === 'Very High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    service.demand === 'High' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    service.demand === 'Growing' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {service.demand}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

ServiceGrid.displayName ="ServiceGrid";

export { ServiceGrid };
