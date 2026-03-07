import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { courses, tierMeta } from '../../data/courses';
import { addons } from '../../data/addons';
import { useModal } from '../../context/ModalContext';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';
import { Helmet } from 'react-helmet-async';
import {
  Clock,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Users,
  BookOpen,
  Briefcase,
  ListChecks,
  ArrowUpRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from '../../components/ui/CourseCard';

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { openModal } = useModal();
  const [activeModule, setActiveModule] = useState(-1);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const tier = tierMeta[course.tier] || tierMeta.Beginner;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scopeaihub.com/" },
      { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://scopeaihub.com/courses" },
      { "@type": "ListItem", "position": 3, "name": course.title }
    ]
  };

  return (
    <Layout immersive={true}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <SEO 
        title={`${course.title} Course in Chennai with Placement`} 
        description={course.tagline} 
        canonical={`/courses/${course.slug}`}
        courseSchema={course}
      />
      {/* ── Hero ── */}
      <section className="relative bg-[var(--bg-body)] pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        {/* Ambient gradients – one per side, organic feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.07] blur-3xl blur-layer"
            style={{ background: tier.color }}
          />
          <div
            className="absolute -bottom-30 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl blur-layer"
            style={{ background: tier.color }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-caption font-bold uppercase tracking-wider"
                style={{
                  background: tier.softBg,
                  color: tier.color,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}60` }}
                />
                {course.tier}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 text-caption font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Open for Enrollment
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="heading-hero text-[var(--text-heading)] mb-5 tracking-tight leading-[1.08]"
            >
              {course.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-body sm:text-lg text-[var(--text-muted)] mb-10 leading-relaxed max-w-2xl font-medium"
            >
              {course.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => openModal(course.title)}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white text-small font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                Enroll Now
              </button>
              <button
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-heading)] border border-[var(--border-color)] text-small font-bold uppercase tracking-wider hover:bg-[var(--bg-inverted)] hover:text-[var(--text-on-inverted)] hover:border-transparent transition-all duration-300"
              >
                View Syllabus
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Metrics Bar ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/40">
        <div className="container-custom py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Duration', value: course.duration, icon: <Clock className="h-4 w-4" style={{ color: tier.color }} /> },
              { label: 'Level', value: course.tier, icon: <span className="text-body">{tier.emoji}</span> },
              { label: 'Expected CTC', value: course.salaryRange, icon: <TrendingUp className="h-4 w-4" style={{ color: tier.color }} /> },
              { label: 'Modules', value: `${course.modules.length} Modules`, icon: <BookOpen className="h-4 w-4" style={{ color: tier.color }} /> },
            ].map((m, i) => (
              <div key={i}>
                <div className="text-caption text-[var(--text-muted)] uppercase tracking-[0.15em] font-semibold mb-1.5">{m.label}</div>
                <div className="text-body font-bold text-[var(--text-heading)] flex items-center gap-2">
                  {m.icon}
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content — 2-Column ── */}
      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-20">

              {/* Syllabus Accordion */}
              <div id="syllabus" className="scroll-mt-28">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h2 className="heading-md sm:heading-hero text-[var(--text-heading)] tracking-tight">
                      Syllabus
                    </h2>
                    <p className="text-small text-[var(--text-muted)] mt-1">
                      {course.modules.length} modules · Structured progression
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {course.modules.map((mod, index) => {
                    const isOpen = activeModule === index;
                    return (
                      <motion.div
                        key={mod.code}
                        initial={false}
                        className="rounded-xl overflow-hidden border transition-colors duration-300"
                        style={{
                          borderColor: isOpen ? `${tier.color}40` : 'var(--border-color)',
                          background: isOpen ? `${tier.color}04` : 'var(--bg-card)',
                        }}
                      >
                        <button
                          onClick={() => setActiveModule(isOpen ? -1 : index)}
                          className="w-full flex items-center justify-between p-4 cursor-pointer sm:p-5 text-left group"
                        >
                          <div className="flex gap-4 items-center">
                            <span
                              className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center text-caption font-black transition-all duration-300"
                              style={
                                isOpen
                                  ? { background: tier.color, color: '#fff', boxShadow: `0 4px 12px ${tier.color}30` }
                                  : { background: 'var(--bg-secondary)', color: 'var(--text-muted)' }
                              }
                            >
                              {mod.code}
                            </span>
                            <h4 className="text-small sm:text-body font-bold text-[var(--text-heading)] group-hover:text-primary transition-colors duration-300">
                              {mod.title}
                            </h4>
                          </div>
                          <ChevronDown
                            className="h-4 w-4 text-[var(--text-muted)] shrink-0 ml-4 transition-transform duration-400"
                            style={{
                              transform: isOpen ? 'rotate(180deg)' : 'none',
                              color: isOpen ? tier.color : undefined,
                            }}
                          />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Who Can Learn */}
              <div id="who-can-learn" className="scroll-mt-28">
                <h2 className="heading-md sm:heading-hero text-[var(--text-heading)] tracking-tight mb-2">
                  Who Can Learn
                </h2>
                <p className="text-small text-[var(--text-muted)] mb-8">This program is designed for:</p>
                <div className="flex flex-wrap gap-2.5">
                  {course.whoCanLearn.map((item, i) => (
                    <span
                      key={i}
                      className="text-small font-medium px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:border-primary/20 transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div id="prerequisites" className="scroll-mt-28">
                <h2 className="heading-md sm:heading-hero text-[var(--text-heading)] tracking-tight mb-8">
                  Prerequisites
                </h2>
                <ul className="space-y-4">
                  {course.prerequisites.map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-[var(--text-muted)] text-small leading-relaxed">
                      <ChevronRight
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: tier.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Roles */}
              <div id="job-roles" className="scroll-mt-28">
                <h2 className="heading-md sm:heading-hero text-[var(--text-heading)] tracking-tight mb-2">
                  Career Paths
                </h2>
                <p className="text-small text-[var(--text-muted)] mb-8">Roles you'll be qualified for after completion:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.roles.map((role, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-small font-medium text-[var(--text-heading)] hover:border-primary/20 hover:bg-[var(--bg-card)] transition-all duration-300 group"
                    >
                      <span className="text-body-lg group-hover:scale-110 transition-transform duration-300">{role.icon}</span>
                      {role.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Enrollment Card */}
                <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 shadow-xl shadow-black/[0.04]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-caption font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">Expected CTC</p>
                      <h3 className="heading-md font-extrabold tracking-tight" style={{ color: tier.color }}>{course.salaryRange}</h3>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-md text-caption font-bold uppercase tracking-wider"
                      style={{
                        background: tier.softBg,
                        color: tier.color,
                      }}
                    >
                      {tier.emoji} {course.tier}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => openModal(course.title)}
                      className="w-full btn-primary py-4 rounded-xl text-small font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Enroll Now
                    </button>
                    <button
                      onClick={() => openModal(course.title)}
                      className="w-full py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-heading)] text-small font-bold uppercase tracking-wider hover:bg-[var(--bg-body)] transition-all duration-300"
                    >
                      Talk to Counselor
                    </button>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-[var(--border-color)]/60">
                    {[
                      { label: 'Duration', value: course.duration, icon: <Clock className="h-4 w-4" /> },
                      { label: 'Modules', value: `${course.modules.length} Modules`, icon: <BookOpen className="h-4 w-4" /> },
                      { label: 'Job Roles', value: `${course.roles.length} Roles`, icon: <Briefcase className="h-4 w-4" /> },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-small">
                        <span className="text-[var(--text-muted)] flex items-center gap-2">
                          {item.icon} {item.label}
                        </span>
                        <span className="font-bold text-[var(--text-heading)]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Card */}
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    background: `${tier.color}06`,
                    borderColor: `${tier.color}15`,
                  }}
                >
                  <h4 className="font-bold text-[var(--text-heading)] mb-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" style={{ color: tier.color }} />
                    Need Help?
                  </h4>
                  <p className="text-small text-[var(--text-muted)] mb-4 leading-relaxed">
                    Unsure if this program is right for you? Our career counselors can help.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-small font-bold hover:gap-2.5 transition-all duration-300"
                    style={{ color: tier.color }}
                  >
                    Get Free Counseling
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Included Career Benefits ── */}
      <section className="py-20 sm:py-28 bg-[var(--bg-body)]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-caption font-bold uppercase tracking-[0.2em]"
            >
              <Check className="h-3.5 w-3.5" />
              Included Career Benefits
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="heading-hero tracking-tight"
              style={{ color: 'var(--text-heading)' }}
            >
              Everything You Need to Get Hired
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-body leading-relaxed font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              From resume building to job referrals — comprehensive career support included with this program.
            </motion.p>
          </div>

          {/* Compact Add-ons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-4 p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 heading-md shrink-0">
                  {addon.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-small mb-1 leading-tight" style={{ color: 'var(--text-heading)' }}>
                    {addon.title}
                  </h3>
                  <p className="text-caption leading-relaxed line-clamp-2" style={{ color: 'var(--text-body)' }}>
                    {addon.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Programs ── */}
      <section className="py-20 sm:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="heading-md sm:heading-hero text-[var(--text-heading)] tracking-tight mb-2">
                Explore More Programs
              </h2>
              <p className="text-[var(--text-muted)] text-small">Continue your learning journey</p>
            </div>
            <Link to="/courses" className="text-primary text-small font-bold hover:underline inline-flex items-center gap-1">
              View All Courses <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses
              .filter((c) => c.id !== course.id)
              .slice(0, 3)
              .map((item, i) => (
                <CourseCard key={item.id} course={item} index={i} />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
