import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * A responsive stacking cards container.
 * On mobile (< 768px), cards become sticky and stack on top of each other.
 * On desktop (>= 768px), it acts as a pass-through wrapper.
 */
export const StackingCards = ({ children, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  // On mobile, discard the passed `className` (which usually contains desktop grid classes)
  // because Grid tracks constrain the sticky items to their exactly-sized cells, breaking stickiness.
  return (
    <div className="flex flex-col relative w-full">
      {React.Children.map(children, (child, index) => (
        <StackingCard key={index} index={index} total={React.Children.count(children)}>
          {child}
        </StackingCard>
      ))}
      {/* 
        This spacer is crucial. It gives the sticky container extra height
        so the final card has room to stay stuck for a moment before the 
        entire section scrolls up and away, preventing it from clipping into
        the content of the next section.
      */}
      <div className="h-[40vh] w-full" aria-hidden="true" />
    </div>
  );
};

const StackingCard = ({ children, index, total }) => {
  const containerRef = useRef(null);
  
  // Basic sticky config
  const headerHeight = 84; // Account for navbar height
  const offset = index * 24; // Distance between stacked cards
  const stickyTop = headerHeight + offset;

  // Track the scroll of this specific card's relative viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start " + stickyTop + "px", "end " + (stickyTop - 150) + "px"]
  });

  // Calculate scaling and dimming based on scroll progress
  // Don't scale/dim the very last card
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 1 - (total - index) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.6 + (index * 0.1)]);

  return (
    <div 
      ref={containerRef}
      className="sticky z-10 w-full transition-transform duration-300 ease-out"
      style={{ 
        top: stickyTop,
        height: "max-content",
        zIndex: index + 10,
        // Provide standard spacing between cards before they stick
        marginTop: index === 0 ? "0" : "1.5rem" 
      }}
    >
      <motion.div style={{ scale, opacity }} className="origin-top w-full shadow-2xl rounded-[2.5rem]">
        {children}
      </motion.div>
    </div>
  );
};
