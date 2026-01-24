import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openModal } = useModal();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Institute Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <div className="bg-primary p-1 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none">
                  {BRANDING.name} <span className="text-primary">{BRANDING.suffix}</span>
                </span>
                <span className="text-[8px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  {BRANDING.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              {BRANDING.description}
            </p>
            <div className="flex space-x-4">
              <a href={BRANDING.socials.facebook} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={BRANDING.socials.twitter} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={BRANDING.socials.linkedin} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={BRANDING.socials.instagram} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">About Us</Link></li>
              <li><Link to="/batches" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Upcoming Batches</Link></li>
              <li><Link to="/gallery" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Student Reviews</Link></li>
              <li><Link to="/placement" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Placement Support</Link></li>
              <li><Link to="/faq" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">FAQs</Link></li>
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              Popular Courses
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">Full Stack Development</Link></li>
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">Python Data Science</Link></li>
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">Cloud Computing</Link></li>
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">UI/UX Design</Link></li>
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">Cyber Security</Link></li>
              <li><Link to="/courses" className="hover:text-primary hover:translate-x-1 transition-all">Mobile App Dev</Link></li>
              <li className="pt-2">
                <Link to="/courses" className="text-primary font-bold flex items-center group">
                  View All Courses 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="bg-white/5 p-3 rounded-xl text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="leading-relaxed">{BRANDING.address}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-white/5 p-3 rounded-xl text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-bold">{BRANDING.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-white/5 p-3 rounded-xl text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-bold">{BRANDING.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="bg-primary/10 rounded-3xl p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between border border-primary/20">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-white text-xl font-bold mb-2">Subscribe to our newsletter</h4>
            <p className="text-slate-400 text-sm">Get the latest updates on new batches and scholarship opportunities.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-slate-800 border-none rounded-l-xl px-6 py-4 text-white text-sm focus:ring-2 focus:ring-primary w-full md:w-64"
            />
            <button className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-r-xl transition-all">
              Join
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-xs font-medium">
          <p>© {currentYear} Raj Software Training Institute. All rights reserved.</p>
          <div className="flex items-center space-x-8">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <button 
              onClick={() => openModal()}
              className="text-primary hover:text-white font-bold uppercase tracking-widest transition-colors"
            >
              Enroll Today
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
