import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';
import { useTheme } from '../../context/ThemeContext';
import { MicroExpander } from '../ui/MicroExpander';
import { courses } from '../../data/courses';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openModal } = useModal();
  const { theme } = useTheme();

  return (
    <footer className="bg-[var(--bg-body)] text-[var(--text-body)] pt-20 pb-10 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Institute Info */}
          <div className="space-y-8">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={theme === 'dark' ? BRANDING.logoLight : BRANDING.logoDark} 
                alt={BRANDING.fullName} 
                className="h-16 md:h-20 w-auto object-contain" 
              />
            </Link>
            <p className="text-small leading-relaxed text-[var(--text-muted)]">
              {BRANDING.description}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <MicroExpander 
                  text="Facebook" 
                  icon={<Facebook className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#1877F2] hover:text-[var(--text-on-inverted)]"
                  href={BRANDING.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <MicroExpander 
                  text="Twitter" 
                  icon={<Twitter className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#1DA1F2] hover:text-[var(--text-on-inverted)]"
                  href={BRANDING.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
              <div className="flex gap-3">
                <MicroExpander 
                  text="LinkedIn" 
                  icon={<Linkedin className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#0A66C2] hover:text-[var(--text-on-inverted)]"
                  href={BRANDING.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <MicroExpander 
                  text="Instagram" 
                  icon={<Instagram className="h-5 w-5" />} 
                  className="bg-primary/5 border-none text-primary hover:bg-[#E4405F] hover:text-[var(--text-on-inverted)]"
                  href={BRANDING.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--text-heading)] font-bold text-body-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-small font-medium">
              <li><Link to="/about" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">About Us</Link></li>
              <li><Link to="/courses" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">All Courses</Link></li>
              <li><Link to="/career-support" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Career Support</Link></li>
              <li><Link to="/admissions" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Admissions</Link></li>
              <li><Link to="/reviews" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Student Reviews</Link></li>
              <li><Link to="/contact" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Contact Us</Link></li>
              <li><Link to="/faq" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">FAQs</Link></li>
              <li><Link to="/careers/trainers" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Our Trainers</Link></li>
              <li><Link to="/careers/join-as-trainer" className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all inline-flex items-center">Join as Trainer</Link></li>
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h3 className="text-[var(--text-heading)] font-bold text-body-lg mb-8 relative inline-block">
              Popular Programs
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-small font-medium">
              {courses.slice(0, 6).map(c => (
                <li key={c.id}>
                  <Link to={`/courses/${c.slug}`} className="text-[var(--text-muted)] hover:text-primary hover:translate-x-1 transition-all block">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/courses" className="text-primary font-bold flex items-center group">
                  View All Programs 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[var(--text-heading)] font-bold text-body-lg mb-8 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-6 text-small">
              <li className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-body">{BRANDING.address}</span>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-[var(--text-on-inverted)] transition-all">
                  <Phone className="h-5 w-5" />
                </div>
                <a href={`tel:${BRANDING.phone}`} className="text-[var(--text-heading)] font-bold hover:text-primary transition-colors">{BRANDING.phone}</a>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-[var(--text-on-inverted)] transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <a href={`mailto:${BRANDING.email}`} className="text-[var(--text-heading)] font-bold hover:text-primary transition-colors">{BRANDING.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certification Badge */}
        <div className="pt-10 pb-6 border-t border-[var(--border-color)]">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" />
              Industry-Recognized Certificates
            </div>
            <p className="text-caption text-[var(--text-muted)] text-center max-w-md">
              Verifiable digital certificates recognized by top hiring companies
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-caption font-medium">
          <p className="text-[var(--text-muted)]">© {currentYear} {BRANDING.fullName}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="text-[var(--text-muted)] hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms-conditions" className="text-[var(--text-muted)] hover:text-primary transition-colors">Terms</Link>
              <Link to="/nda-policy" className="text-[var(--text-muted)] hover:text-primary transition-colors">NDA</Link>
              <Link to="/refund-policy" className="text-[var(--text-muted)] hover:text-primary transition-colors">Refunds</Link>
              <Link to="/legal/trainer-conduct" className="text-[var(--text-muted)] hover:text-primary transition-colors">Trainer Conduct</Link>
              <Link to="/disclaimer" className="text-[var(--text-muted)] hover:text-primary transition-colors">Disclaimer</Link>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <span className="text-caption font-bold text-primary tracking-widest uppercase flex items-center bg-primary/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2"></span>
                Next Batch Starting Soon
              </span>
              <button 
                onClick={() => openModal()}
                className="btn-primary px-5 py-2 text-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                aria-label="Enroll Today"
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
