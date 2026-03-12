import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../Header';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import TawkChat from '../utils/TawkChat';
import DynamicScrollButton from '../ui/DynamicScrollButton';
import { BRANDING } from '../../data/branding';

const Layout = ({ 
  children, 
  title = `${BRANDING.fullName} | Master Tech Skills in Tamil Nadu`,
  description = `Join ${BRANDING.fullName} for industry-aligned AI training programs — from Generative AI to MLOps. Practical, skill-driven education in Tamil Nadu.`,
  keywords ="AI training institute, prompt engineering course, machine learning, NLP training, data analytics, MLOps, computer vision, Python AI course, Chennai, Tamil Nadu",
  immersive = false
}) => {
  // ... (Tawk.to code)

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        {/* ... (Helmet code) */}
      </Helmet>

      <Header />
      
      <main className="flex-grow" style={{ position: 'relative', overflow: 'visible' }}>
        {children}
      </main>

      <Footer />
      <TawkChat />
      <WhatsAppButton />
      <DynamicScrollButton />
    </div>
  );
};

export default Layout;
