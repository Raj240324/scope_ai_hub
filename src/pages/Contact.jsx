import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/ui/ContactForm';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useModal } from '../context/ModalContext';

import Hero from '../components/ui/Hero';

import { BRANDING } from '../data/branding';

const Contact = () => {
  const { openModal } = useModal();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') || "General Inquiry";

  return (
    <Layout 
      title={`Contact Us | Reach ${BRANDING.fullName}`}
      description="Get in touch with us for course inquiries, batch details, and career counseling. Located in Chennai."
    >
      <Hero 
        title={<>Get in <span className="text-primary">Touch</span></>}
        subtitle="Have questions about our courses or the admission process? We're here to help you navigate your tech journey."
      />

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Information */}
          <div className="space-y-12">
             <div>
                <h2 className="heading-md mb-6">Contact Information</h2>
                <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
                   We'd love to hear from you. Whether you have a question about courses, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>

                <div className="space-y-6">
                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-[var(--text-heading)] mb-1">Visit Us</h4>
                         <p className="text-[var(--text-muted)] text-lg leading-relaxed">{BRANDING.address}</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-[var(--text-heading)] mb-1">Call Us</h4>
                         <p className="text-[var(--text-heading)] text-lg font-bold">{BRANDING.phone}</p>
                         <p className="text-[var(--text-muted)] text-sm">Mon-Sat from 9am to 7pm.</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                         <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-[var(--text-heading)] mb-1">Email Us</h4>
                         <p className="text-[var(--text-heading)] text-lg font-bold">{BRANDING.email}</p>
                         <p className="text-[var(--text-muted)] text-sm">We'll respond within 24 hours.</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Office Hours Box */}
             <div className="p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-6">
                   <Clock className="h-6 w-6 text-primary" />
                   <h3 className="text-xl font-bold text-[var(--text-heading)]">Office Hours</h3>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                      <span className="text-[var(--text-muted)] font-medium">Monday - Friday</span>
                      <span className="font-bold text-[var(--text-heading)]">9:00 AM - 7:00 PM</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                      <span className="text-[var(--text-muted)] font-medium">Saturday</span>
                      <span className="font-bold text-[var(--text-heading)]">9:00 AM - 5:00 PM</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)] font-medium">Sunday</span>
                      <span className="font-bold text-red-500">Closed</span>
                   </div>
                </div>
             </div>

             {/* Socials */}
             <div>
                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook className="h-5 w-5" />, link: BRANDING.socials.facebook, color: '#1877F2' },
                    { icon: <Twitter className="h-5 w-5" />, link: BRANDING.socials.twitter, color: '#1DA1F2' },
                    { icon: <Linkedin className="h-5 w-5" />, link: BRANDING.socials.linkedin, color: '#0A66C2' },
                    { icon: <Instagram className="h-5 w-5" />, link: BRANDING.socials.instagram, color: '#E4405F' }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                      style={{ '--hover-color': social.color }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
             </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <div className="bg-[var(--bg-card)] rounded-[2rem] shadow-2xl shadow-primary/5 border border-[var(--border-color)] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
              <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Send us a message</h3>
                 <p className="text-[var(--text-muted)] mb-8">Fill out the form below and we'll get back to you shortly.</p>
                 <ContactForm initialCourse={initialCourse} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Width Map */}
      <section className="h-[450px] w-full bg-[var(--bg-secondary)] relative overflow-hidden border-t border-[var(--border-color)]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8765432101!2d80.2250!3d12.9010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5d5d5d5d5d%3A0x5d5d5d5d5d5d5d5d!2sSholinganallur%2C+Chennai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin&maptype=satellite" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
          title={`${BRANDING.fullName} Location`}
        ></iframe>
      </section>
    </Layout>
  );
};

export default Contact;
