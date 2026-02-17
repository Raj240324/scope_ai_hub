import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import { BRANDING } from '../../data/branding';

const Layout = ({ 
  children, 
  title = `${BRANDING.fullName} | Master Tech Skills in Tamil Nadu`,
  description = `Join ${BRANDING.fullName} for industry-aligned software training in Full Stack, Data Science, UI/UX, and more. Honest, skill-driven education in Tamil Nadu.`,
  keywords = "software training, coding institute, tamil nadu, chennai, full stack development, data science, ui ux design, cloud computing, devops, ethical hacking",
  immersive = false
}) => {
  // ... (Tawk.to code)

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        {/* ... (Helmet code) */}
      </Helmet>

      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
