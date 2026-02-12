import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none ${className}`}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? -30 : 0,
            opacity: theme === 'dark' ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-500" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? 0 : 30,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400" />
        </motion.div>
      </div>
    </button>
  );
};

export default ThemeToggle;
