import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import { BRANDING } from '../data/branding';
import { courses } from '../data/courses';
import {
  Home, BookOpen, ArrowRight, Scale, Globe,
  Briefcase
} from 'lucide-react';

const SitemapSection = ({ icon: Icon, title, color, links }) => (
  <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden">
    {/* Section header */}
    <div className={`px-6 py-5 border-b border-[var(--border-color)] flex items-center gap-3 bg-gradient-to-r ${color}`}>
      <div className="p-2 bg-white/20 rounded-xl">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h2 className="text-white font-black text-base tracking-wide">{title}</h2>
      <span className="ml-auto text-white/60 text-xs font-bold">{links.length} page{links.length !== 1 ? 's' : ''}</span>
    </div>
    {/* Links */}
    <ul className="divide-y divide-[var(--border-color)]">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            to={link.href}
            className="flex items-center justify-between px-6 py-4 group hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <div>
              <p className="font-bold text-[var(--text-heading)] group-hover:text-primary transition-colors text-sm">
                {link.label}
              </p>
              {link.description && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{link.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded-lg hidden sm:block">
                {link.href}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Sitemap = () => {
  const sections = [
    {
      icon: Home,
      title: 'Core Pages',
      color: 'from-blue-600 to-blue-500',
      links: [
        { href: '/', label: 'Home', description: 'Welcome page — hero, features, and quick overview' },
        { href: '/about', label: 'About Us', description: 'Our story, mission, values, and team' },
        { href: '/contact', label: 'Contact', description: 'Get in touch with our team' },
        { href: '/faq', label: 'Frequently Asked Questions', description: 'Answers to common questions' },
        { href: '/reviews', label: 'Student Reviews', description: 'Testimonials and success stories' },
        { href: '/admissions', label: 'Admissions', description: 'How to apply and enrollment process' },
      ],
    },
    {
      icon: BookOpen,
      title: 'Courses',
      color: 'from-primary to-cyan-500',
      links: [
        { href: '/courses', label: 'All Courses', description: 'Browse our full course catalogue' },
        ...courses.map(c => ({
          href: `/courses/${c.slug}`,
          label: c.title,
          description: `${c.duration} · ${c.level} · ${c.category}`,
        })),
      ],
    },
    {
      icon: Briefcase,
      title: 'Careers',
      color: 'from-orange-500 to-amber-500',
      links: [
        { href: '/careers/join-as-trainer', label: 'Join as Trainer', description: 'Apply to teach at ScopeAIHub' },
        { href: '/careers/trainers', label: 'Trainer Profiles', description: 'Meet our expert instructors' },
      ],
    },
    {
      icon: Scale,
      title: 'Legal & Policies',
      color: 'from-slate-600 to-slate-500',
      links: [
        { href: '/privacy-policy', label: 'Privacy Policy', description: 'How we handle your personal data' },
        { href: '/terms-conditions', label: 'Terms & Conditions', description: 'Rules governing use of our services' },
        { href: '/nda-policy', label: 'NDA Policy', description: 'Non-disclosure agreement terms' },
        { href: '/refund-policy', label: 'Refund Policy', description: 'Our fee refund and cancellation policy' },
        { href: '/disclaimer', label: 'Disclaimer', description: 'Liability and content disclaimers' },
        { href: '/legal/trainer-conduct', label: 'Trainer Code of Conduct', description: 'Standards for our teaching staff' },
      ],
    },
  ];

  const totalPages = sections.reduce((sum, s) => sum + s.links.length, 0);

  return (
    <Layout
      title={`Sitemap | All Pages - ${BRANDING.fullName}`}
      description={`Complete sitemap for ${BRANDING.fullName}. Find all pages including courses, admissions, legal documents, and more.`}
    >
      <Hero
        title={<>Website <span className="text-primary">Sitemap</span></>}
        subtitle={`A complete directory of all ${totalPages} pages on ${BRANDING.fullName}. Navigate directly to any section quickly.`}
      />

      <div className="bg-[var(--bg-secondary)] py-20">
        <div className="container-custom">

          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {sections.map((s) => (
              <div
                key={s.title}
                className="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--text-heading)]">{s.links.length}</p>
                  <p className="text-xs font-bold text-[var(--text-muted)] leading-tight">{s.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sections grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sections.map((section) => (
              <SitemapSection key={section.title} {...section} />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-12 text-center p-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-black text-[var(--text-heading)] mb-2">Can't find what you're looking for?</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto">
              This sitemap lists all publicly available pages. If you're looking for something specific, use our search or contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] font-bold rounded-xl hover:opacity-90 transition-all text-sm"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-primary/25"
              >
                View FAQs
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
