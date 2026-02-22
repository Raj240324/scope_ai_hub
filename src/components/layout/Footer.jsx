import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';
import { useTheme } from '../../context/ThemeContext';
import { MicroExpander } from '../ui/MicroExpander';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openModal } = useModal();
  const { theme } = useTheme();

  return (
    <footer className="bg-[var(--bg-footer)] text-[var(--text-footer-muted)] pt-20 pb-10 border-t border-[var(--border-color)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Institute Info */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src={theme === 'dark' ? BRANDING.logoDark : BRANDING.logoLight} 
                alt={BRANDING.fullName} 
                className="h-28 md:h-36 -my-4 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {BRANDING.description}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <MicroExpander 
                  text="Facebook" 
                  icon={<Facebook className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#1877F2] hover:text-white"
                  onClick={() => window.open(BRANDING.socials.facebook, '_blank')}
                />
                <MicroExpander 
                  text="Twitter" 
                  icon={<Twitter className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#1DA1F2] hover:text-white"
                  onClick={() => window.open(BRANDING.socials.twitter, '_blank')}
                />
              </div>
              <div className="flex gap-3">
                <MicroExpander 
                  text="LinkedIn" 
                  icon={<Linkedin className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#0A66C2] hover:text-white"
                  onClick={() => window.open(BRANDING.socials.linkedin, '_blank')}
                />
                <MicroExpander 
                  text="Instagram" 
                  icon={<Instagram className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#E4405F] hover:text-white"
                  onClick={() => window.open(BRANDING.socials.instagram, '_blank')}
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--text-footer)] font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">About Us</Link></li>
              <li><Link to="/careers/join-as-trainer" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Join as Trainer</Link></li>
              <li><Link to="/reviews" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Student Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">FAQs</Link></li>
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h3 className="text-[var(--text-footer)] font-bold text-lg mb-8 relative inline-block">
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
            <h3 className="text-[var(--text-footer)] font-bold text-lg mb-8 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="leading-relaxed">{BRANDING.address}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-bold">{BRANDING.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-bold">{BRANDING.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="bg-primary/5 rounded-3xl p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between border border-primary/20">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-[var(--text-footer)] text-xl font-bold mb-2">Subscribe to our newsletter</h4>
            <p className="text-[var(--text-footer-muted)] text-sm">Get the latest updates on new batches and scholarship opportunities.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <label htmlFor="newsletter_email" className="sr-only">Newsletter Email</label>
            <input 
              type="email" 
              id="newsletter_email"
              name="newsletter_email"
              placeholder="Your email address" 
              className="bg-[var(--text-footer)]/5 border border-primary/20 rounded-l-xl px-6 py-4 text-[var(--text-footer)] text-sm focus:ring-2 focus:ring-primary w-full md:w-64 placeholder:text-[var(--text-footer-muted)]"
            />
            <button className="bg-primary hover:opacity-90 text-white font-bold px-8 py-4 rounded-r-xl transition-all">
              Join
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-xs font-medium">
          <p>© {currentYear} {BRANDING.fullName}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms-conditions" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/nda-policy" className="hover:text-primary transition-colors">NDA</Link>
              <Link to="/refund-policy" className="hover:text-primary transition-colors">Refunds</Link>
              <Link to="/legal/trainer-conduct" className="hover:text-primary transition-colors">Trainer Conduct</Link>
              <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
              <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
            <button 
              onClick={() => openModal()}
              className="text-primary hover:opacity-80 font-bold uppercase tracking-widest transition-colors"
            >
              Enroll Today
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
