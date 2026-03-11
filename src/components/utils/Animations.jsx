import React, { useRef } from 'react';
import { m, useInView, animate, useScroll, useTransform, useSpring } from 'framer-motion';

export const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5, 
  className ="",
  fullWidth = false,
  viewportMargin ="-50px" // Expose margin as prop for flexibility
}) => {
  const directions = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
    none: { x: 0, y: 0 }
  };

  return (
    <m.div
      initial={{ 
        opacity: 0, 
        scale: 0.95,
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ 
        type:"spring",
        stiffness: 70,
        damping: 20,
        delay: delay,
        duration: duration
      }}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </m.div>
  );
};

export const StaggerContainer = ({ 
  children, 
  className ="",
  delayChildren = 0.1,
  staggerChildren = 0.15
}) => {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin:"-50px" }}
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
    </m.div>
  );
};

export const StaggerItem = ({ children, className ="" }) => {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type:"spring", stiffness: 80, damping: 20 } 
        }
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export const ScaleOnHover = ({ children, className ="", scale = 1.05 }) => {
  return (
    <m.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type:"spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export const Parallax = ({ children, offset = 50, className ="" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end","end start"]
  });

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [offset, -offset]),
    springConfig
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'visible' }}>
      <m.div style={{ y }}>
        {children}
      </m.div>
    </div>
  );
};

export const CountUp = ({ end, duration = 2, suffix ="", prefix ="" }) => {
  const nodeRef = useRef();
  const from = 0;
  const to = parseFloat(end.replace(/,/g, '').replace(suffix, '').replace(prefix, '')) || 0;

  React.useEffect(() => {
    const node = nodeRef.current;
    
    if (!node) return;

    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        node.textContent = `${prefix}${to === 2019 || to === '2019' ? Math.floor(value) : Math.floor(value).toLocaleString()}${suffix}`;
      },
      ease:"easeOut"
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, prefix]);

  return <span ref={nodeRef} />;
};

export const ScrollCountUp = ({ end, duration = 2.5, suffix ="", prefix ="", className="" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin:"-50px" });
  
  let targetValue = 0;
  let computedSuffix = suffix;
  let computedPrefix = prefix;

  if (typeof end === 'string') {
    const numberMatch = end.match(/(\d+(?:,\d+)*)/);
    if (numberMatch) {
      targetValue = parseFloat(numberMatch[0].replace(/,/g, ''));
      if (!suffix && !prefix) {
        const parts = end.split(numberMatch[0]);
        computedPrefix = parts[0] ||"";
        computedSuffix = parts[1] ||"";
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
      {computedPrefix}{targetValue === 2019 || targetValue === '2019' ? Math.floor(displayValue) : Math.floor(displayValue).toLocaleString("en-US")}{computedSuffix}
    </span>
  );
}

export const Marquee = ({ children, speed = 20, className ="" }) => {
  return (
    <div className={`overflow-hidden flex ${className}`}>
      <m.div
        initial={{ x: 0 }}
        animate={{ x:"-50%" }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease:"linear" 
        }}
        className="flex flex-shrink-0"
      >
        {children}
        {children}
      </m.div>
    </div>
  );
};
