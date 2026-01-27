import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { BRANDING } from '../../data/branding';

const Layout = ({ 
  children, 
  title = `${BRANDING.fullName} | Master Tech Skills in Tamil Nadu`,
  description = `Join ${BRANDING.fullName} for industry-aligned software training in Full Stack, Data Science, UI/UX, and more. Honest, skill-driven education in Tamil Nadu.`,
  keywords = "software training, coding institute, tamil nadu, chennai, full stack development, data science, ui ux design, cloud computing, devops, ethical hacking"
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow pt-[128px] md:pt-[112px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
