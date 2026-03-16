import React from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../Header';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import TawkChat from '../utils/TawkChat';
import DynamicScrollButton from '../ui/DynamicScrollButton';

const Layout = ({ 
  children, 
}) => {
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
