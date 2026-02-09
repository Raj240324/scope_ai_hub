import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/ui/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useModal } from '../context/ModalContext';

import Hero from '../components/ui/Hero';

import { BRANDING } from '../data/branding';

const Contact = () => {
  const { openModal } = useModal();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') || "General Inquiry";

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      details: BRANDING.phone,
      description: "Mon-Sat from 9am to 7pm."
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      details: BRANDING.email,
      description: "We'll respond within 24 hours."
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Visit Us",
      details: BRANDING.address,
      description: "Our main campus in Chennai."
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex space-x-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{info.title}</h4>
                      <p className="text-slate-900 font-medium">{info.details}</p>
                      <p className="text-sm text-slate-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
              <MessageSquare className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Counseling Session</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">
                Not sure which course is right for you? Book a free 15-minute counseling session with our experts.
              </p>
              <button 
                onClick={() => openModal('Free Counseling')}
                className="text-primary-light font-bold hover:underline relative z-10"
              >
                Book Now →
              </button>
            </div>

            <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Office Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monday - Friday:</span>
                  <span className="font-bold text-slate-900">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Saturday:</span>
                  <span className="font-bold text-slate-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sunday:</span>
                  <span className="font-bold text-accent-error">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-500 mb-10">Fill out the form below and we'll get back to you shortly.</p>
              <ContactForm initialCourse={initialCourse} />
            </div>
          </div>
        </div>
      </div>

      {/* Real Satellite Map */}
      <section className="h-[500px] w-full bg-slate-200 relative overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8765432101!2d80.2250!3d12.9010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5d5d5d5d5d%3A0x5d5d5d5d5d5d5d5d!2sSholinganallur%2C+Chennai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin&maptype=satellite" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
          title={`${BRANDING.fullName} Location`}
        ></iframe>
      </section>
    </Layout>
  );
};

export default Contact;
