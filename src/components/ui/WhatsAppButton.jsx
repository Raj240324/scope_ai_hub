import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const WhatsAppButton = () => {
  const phoneNumber = BRANDING.phone.replace(/\D/g, ''); 
  const message = `Hi ${BRANDING.fullName}, I'm interested in your courses. Can you please provide more details?`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 hidden md:flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform group animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute left-20 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
