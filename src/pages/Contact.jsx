import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/ui/ContactForm';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram } from 'lucide-react';

import { m } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem } from '../utils/motionVariants';
import SEO from '../components/utils/SEO';
import Hero from '../components/ui/Hero';

import { BRANDING } from '../data/branding';

const Contact = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') ||"General Inquiry";

  return (
    <Layout>
      <SEO 
        title={`Contact Us | Reach ${BRANDING.fullName}`} 
        description="Get in touch with us for course inquiries, batch details, and career counseling. Located in Chennai." 
        canonical="/contact"
      />
      
      <Hero 
        badge="We Respond Within 24 Hours"
        title={<>Let's <span className="font-extrabold text-primary">Talk</span>.</>}
      />

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Information */}
          <m.div 
            ref={leftRef}
            variants={staggerContainer}
            initial="hidden"
            animate={leftVisible ? 'visible' : 'hidden'}
            className="space-y-12"
          >
             <m.div variants={staggerItem}>
                <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-6">Contact Information</h2>
                <p className="text-[var(--text-muted)] text-body-lg mb-8 leading-relaxed">
                   We'd love to hear from you. Whether you have a question about courses, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>

                <div className="space-y-6">
                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-body-lg sm:text-xl font-bold text-[#a73fd0] dark:text-[#d64fd9] mb-1">Visit Us</h4>
                         <p className="text-[var(--text-muted)] text-body sm:text-lg leading-relaxed">{BRANDING.address}</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-body-lg sm:text-xl font-bold text-[#a73fd0] dark:text-[#d64fd9] mb-1">Call Us</h4>
                         <p className="text-[var(--text-heading)] text-body-lg font-bold">{BRANDING.phone}</p>
                         <p className="text-[var(--text-muted)] text-small">Mon–Sun, 9:00 AM – 7:00 PM</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-body-lg sm:text-xl font-bold text-[#a73fd0] dark:text-[#d64fd9] mb-1">Email Us</h4>
                         <p className="text-[var(--text-heading)] text-body-lg font-bold">{BRANDING.email}</p>
                         <p className="text-[var(--text-muted)] text-small">We'll respond within 24 hours.</p>
                      </div>
                   </div>
                </div>
             </m.div>

             {/* Office Hours Box */}
             <m.div variants={staggerItem} className="p-5 sm:p-8 bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-6">
                   <Clock className="h-6 w-6 text-primary" />
                   <h3 className="heading-sm font-semibold text-[var(--text-heading)]">Office Hours</h3>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                      <span className="text-[var(--text-muted)] font-medium">Monday - Friday</span>
                      <span className="font-bold text-[var(--text-heading)]">9:00 AM – 7:00 PM</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                      <span className="text-[var(--text-muted)] font-medium">Saturday</span>
                      <span className="font-bold text-[var(--text-heading)]">9:00 AM – 5:00 PM</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)] font-medium">Sunday</span>
                      <span className="font-bold text-[var(--text-heading)]">9:00 AM – 5:00 PM</span>
                   </div>
                </div>
             </m.div>

             {/* Socials */}
             <m.div variants={staggerItem}>
                <h3 className="heading-sm font-semibold text-[var(--text-heading)] mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Linkedin className="h-5 w-5" />, link: BRANDING.socials.linkedin, color: '#0A66C2' },
                    { icon: <Instagram className="h-5 w-5" />, link: BRANDING.socials.instagram, color: '#E4405F' }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-on-inverted)] hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                      style={{ '--hover-color': social.color }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
             </m.div>
          </m.div>

          {/* Right Column: Contact Form */}
          <m.div 
            ref={rightRef}
            variants={staggerContainer}
            initial="hidden"
            animate={rightVisible ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <m.div variants={staggerItem} className="bg-[var(--bg-card)] rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-primary/5 border border-[var(--border-color)] p-5 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
              <div className="relative z-10">
                 <h3 className="heading-lg font-bold text-[var(--text-heading)] mb-2">Send us a message</h3>
                 <p className="text-[var(--text-muted)] mb-8">Fill out the form below and we'll get back to you shortly.</p>
                 <ContactForm initialCourse={initialCourse} />
              </div>
            </m.div>

            {/* Quick FAQs */}
            <m.div variants={staggerItem} className="bg-[var(--bg-secondary)] rounded-2xl sm:rounded-[2rem] border border-[var(--border-color)] p-5 sm:p-8">
               <h3 className="heading-sm font-semibold text-[var(--text-heading)] mb-4">Quick Answers</h3>
               <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[var(--text-heading)] text-small mb-1">Do you offer weekend batches?</h4>
                    <p className="text-[var(--text-muted)] text-small">Yes, we have dedicated weekend batches designed specifically for working professionals.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-heading)] text-small mb-1">Is job placement guaranteed?</h4>
                    <p className="text-[var(--text-muted)] text-small">We provide extensive placement assistance, portfolio building, and mock interviews to ensure you are job-ready.</p>
                  </div>
               </div>
            </m.div>
          </m.div>

        </div>
      </div>

    </Layout>
  );
};

export default Contact;
