import React from 'react';
import { motion, useInView, animate } from 'framer-motion';

export const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5, 
  className = "",
  fullWidth = false 
}) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ 
  children, 
  className = "",
  delayChildren = 0,
  staggerChildren = 0.1
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnHover = ({ children, className = "", scale = 1.05 }) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CountUp = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const nodeRef = React.useRef();
  const from = 0;
  const to = parseFloat(end.replace(/,/g, '').replace(suffix, '').replace(prefix, '')) || 0;

  React.useEffect(() => {
    const node = nodeRef.current;
    
    if (!node) return;

    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        node.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
      },
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, prefix]);

  return <span ref={nodeRef} />;
};

export const ScrollCountUp = ({ end, duration = 2.5, suffix = "", prefix = "", className="" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  let targetValue = 0;
  let computedSuffix = suffix;
  let computedPrefix = prefix;

  if (typeof end === 'string') {
    const numberMatch = end.match(/(\d+(?:,\d+)*)/);
    if (numberMatch) {
      targetValue = parseFloat(numberMatch[0].replace(/,/g, ''));
      if (!suffix && !prefix) {
        const parts = end.split(numberMatch[0]);
        computedPrefix = parts[0] || "";
        computedSuffix = parts[1] || "";
      }
    }
  } else {
    targetValue = end;
  }

  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetValue, {
        duration: duration,
        onUpdate: (value) => {
          setDisplayValue(value);
        },
        ease: [0.25, 0.1, 0.25, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, targetValue, duration]);

  return (
    <span 
      ref={ref} 
      className={`tabular-nums tracking-tight ${className}`} 
    >
      {computedPrefix}{Math.floor(displayValue).toLocaleString("en-US")}{computedSuffix}
    </span>
  );
}

export const Marquee = ({ children, speed = 20, className = "" }) => {
  return (
    <div className={`overflow-hidden flex ${className}`}>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex flex-shrink-0"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};
