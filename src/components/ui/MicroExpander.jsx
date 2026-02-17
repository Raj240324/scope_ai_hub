'use client';

import React from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * A micro-interaction button that expands from a circular icon to a pill shape
 * containing text upon hover. It handles loading states by reverting to the
 * circular shape and displaying a spinner.
 */
const MicroExpander = React.forwardRef(
  (
    {
      text,
      icon,
      variant = 'default',
      isLoading = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants = {
      initial: { width: '48px' },
      hover: { width: 'auto' },
      loading: { width: '48px' },
    };

    const textVariants = {
      initial: { opacity: 0, x: -10 },
      hover: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.3, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        x: -5,
        transition: { duration: 0.1, ease: 'linear' },
      },
    };

    const variantStyles = {
      default: 'bg-primary text-primary-foreground border border-primary',
      outline:
        'bg-transparent border border-input text-foreground hover:border-primary',
      ghost:
        'bg-accent/50 border border-transparent text-accent-foreground hover:bg-accent',
      destructive:
        'bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90',
    };

    const handleClick = (e) => {
      if (isLoading) return;
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          'relative flex h-12 items-center rounded-full transition-all duration-300', // Use standard CSS transition for background/border
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isLoading && 'cursor-not-allowed',
          variantStyles[variant],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={handleClick}
        disabled={isLoading}
        {...props}
        aria-label={text}
      >
        <div className='grid h-12 w-12 place-items-center shrink-0 z-10'>
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              <motion.div
                key='spinner'
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : (
              <motion.div
                key='icon'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {icon || <Plus className='h-5 w-5' />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: isHovered && !isLoading ? 'auto' : 0, 
            opacity: isHovered && !isLoading ? 1 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30, 
            mass: 0.5 
          }}
          className='overflow-hidden'
        >
          <div className='whitespace-nowrap font-medium text-sm uppercase tracking-wide pr-6 pl-0'>
            {text}
          </div>
        </motion.div>
      </button>
    );
  }
);

MicroExpander.displayName = 'MicroExpander';

export { MicroExpander };
