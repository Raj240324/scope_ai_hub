import React from 'react';
import Layout from '../components/layout/Layout';
import { 
  ClipboardList, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fadeUp, staggerContainer, staggerItem } from '../utils/motionVariants';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/utils/SEO';
import Hero from '../components/ui/Hero';
import { BRANDING } from '../data/branding';
import { addons } from '../data/addons';
import BatchScheduleSection from '../components/sections/BatchScheduleSection';

const Admissions = () => {
  const { openModal } = useModal();
  const { theme } = useTheme();

  const steps = [
    {
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      title: "Choose Your Course",
      description: "Explore our range of courses and select the one that aligns with your career goals."
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      title: "Free Counseling",
      description: "Speak with our career experts to understand the course roadmap and outcomes."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Enrollment",
      description: "Complete the registration process and secure your seat for the upcoming batch."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Start Learning",
      description: "Join the induction session and begin your journey towards mastering tech skills."
    }
  ];

  // ── Batch data ────────────────────────────────────────────────────────────
  // Moved to src/data/batches.js and used in BatchScheduleSection

  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const { ref: advantagesRef, isVisible: advantagesVisible } = useScrollReveal();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Layout>
      <SEO
        title={`Admissions | Start Your Tech Career with ${BRANDING.fullName}`}
        description={`Easy 4-step admission process at ${BRANDING.fullName} Training Institute. Check eligibility, batch timings, and enroll for upcoming batches.`}
        canonical="/admissions"
      />

      <Hero
        badge="Simple · Transparent · Fast"
        title={<>Your Seat Is <span className="font-extrabold text-primary">Waiting</span>.</>}
      />

      <div className="container-custom section-padding">

        {/* ── How It Works ─────────────────────────────────────────────── */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg font-bold mb-4">How It Works</h2>
            <p className="text-[var(--text-muted)] text-body-lg">
              Your journey to a thriving tech career is simple and transparent.
              Follow these 4 easy steps to get started.
            </p>
          </div>
          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => {
              const titleColors = ['#67e8f9', '#fbbf24', '#6ee7b7', '#f9a8d4'];
              return (
                <m.div key={index} variants={item} className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <span className="step-badge">STEP 0{index + 1}</span>
                      <div className="step-icon">{step.icon}</div>
                      <h3 className="step-title">{step.title}</h3>
                    </div>
                    <div className="flip-card-back">
                      <h3 className="step-title-back" style={{ color: titleColors[index] }}>
                        {step.title}
                      </h3>
                      <p className="step-desc">{step.description}</p>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* ── Eligibility ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="space-y-8">
            <h2 className="heading-lg font-bold text-center mb-0">Eligibility Criteria</h2>
            <div className="space-y-4">
              {[
                "College students (any stream) looking for industry skills.",
                "Fresh graduates wanting to kickstart their IT career.",
                "Working professionals looking to switch to tech roles.",
                "Basic understanding of computers and a passion for learning.",
                "No prior coding experience required for beginner courses.",
              ].map((el, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                  <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
                  <span className="text-[var(--text-muted)] font-medium">{el}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Batch Schedule ────────────────────────────────────────────── */}
        <div className="mt-24">

          <BatchScheduleSection />
        </div>

        {/* ── Scholarships & Financial Aid ─────────────────────────────── */}
        <div className="mb-24 mt-24">
          <h2 className="heading-lg font-bold mb-12 text-center">Financial Assistance Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Early Enrollment", discount: "Fee Benefits",     desc: "Secure your seat well in advance of the batch start date to unlock special fee structures.", color: "from-green-500 to-emerald-600",  icon: "🌟" },
              { title: "Merit-Based Support", discount: "Scholarships",  desc: "Deserving students with strong academic or technical backgrounds may qualify for fee assistance.", color: "from-blue-500 to-cyan-600",   icon: "🎓" },
              { title: "Group Registrations", discount: "Corporate / Peers", desc: "Enrolling as a group of friends or corporate team? Contact us for specialized group pricing.", color: "from-purple-500 to-pink-600", icon: "👥" },
            ].map((scheme, i) => (
              <div key={i} className="bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all">
                <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center mb-5 sm:mb-6 heading-sm sm:text-2xl font-black shadow-lg`}>
                  {scheme.icon}
                </div>
                <h3 className="text-body-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3">{scheme.title}</h3>
                <p className="text-small text-primary font-bold mb-2">{scheme.discount}</p>
                <p className="text-body">{scheme.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
            <h3 className="text-body-lg font-bold text-[var(--text-heading)] mb-4">💳 Flexible Payment Options</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Installment Plans",   desc: "Pay course fees in easy, manageable installments" },
                { title: "Educational Loans",   desc: "Assistance with securing learning loans for long-term programs" },
                { title: "Digital Payments",    desc: "All major UPI, Cards, and Net Banking methods accepted" },
                { title: "Transparent Pricing", desc: "No hidden charges or surprise assessment fees" },
              ].map(({ title, desc }, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[var(--text-heading)] mb-1">{title}</h4>
                    <p className="text-small text-[var(--text-muted)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Programs Overview ─────────────────────────────────────────── */}
        <div className="mt-16 sm:mt-24 p-5 sm:p-8 md:p-12 dark-section text-white rounded-2xl sm:rounded-3xl text-center dark-surface">
          <m.div
            ref={ctaRef}
            variants={fadeUp}
            initial="hidden"
            animate={ctaVisible ? 'visible' : 'hidden'}
          >
            <h2 className="heading-lg font-bold text-primary mb-8 relative z-10">Programs Designed For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className={theme === 'dark' ? 'glass-card p-6 text-left' : 'bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-left'}>
                <h3 className="heading-sm font-semibold mb-2 text-primary">Upskill Courses</h3>
                <p className="text-small text-white mb-2">Targeted training to master specific technologies or tools quickly.</p>
                <p className="text-caption text-white/80 font-bold uppercase tracking-wider">Duration: 1-2 Months</p>
              </div>
              <div className={theme === 'dark' ? 'glass-card p-6 text-left' : 'bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-left'}>
                <h3 className="heading-sm font-semibold mb-2 text-primary">Career Tracks</h3>
                <p className="text-small text-white mb-2">Comprehensive pathways to transform you into a job-ready professional.</p>
                <p className="text-caption text-white/80 font-bold uppercase tracking-wider">Duration: 4-6 Months</p>
              </div>
              <div className={theme === 'dark' ? 'glass-card p-6 text-left' : 'bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-left'}>
                <h3 className="heading-sm font-semibold mb-2 text-primary">Master Programs</h3>
                <p className="text-small text-white mb-2">Deep-dive intensive programs with extensive projects and mentorship.</p>
                <p className="text-caption text-white/80 font-bold uppercase tracking-wider">Duration: 8-12 Months</p>
              </div>
            </div>
            <p className="text-white max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              To maintain high training quality, class sizes are strictly limited. Contact our admission desk for detailed fee structures and availability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
              >
                Enquire About Admissions
              </m.button>
              <Link to="/courses" className="btn-secondary text-[var(--text-on-inverted)] font-bold px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">
                Explore Courses
              </Link>
            </div>
          </m.div>
        </div>

        {/* ── Career Advantages ─────────────────────────────────────────── */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold uppercase tracking-[0.2em]">
              <Award className="h-3.5 w-3.5" />
              Career Advantage
            </div>
            <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-4">
              12 Benefits Included with Every Program
            </h2>
            <p className="text-[var(--text-muted)] text-body-lg">
              From resume building to job referrals — we're invested in your success.
            </p>
          </div>
          <m.div
            ref={advantagesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={advantagesVisible ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {addons.slice(0, 6).map((addon, index) => (
              <m.div variants={staggerItem} key={index} className="flex items-start gap-4 p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 heading-md shrink-0">
                  {addon.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-small mb-1 leading-tight text-[var(--text-heading)]">{addon.title}</h3>
                  <p className="text-caption leading-relaxed line-clamp-2 text-[var(--text-body)]">{addon.description}</p>
                </div>
              </m.div>
            ))}
          </m.div>
          <div className="text-center mt-8">
            <Link to="/courses" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              View all 12 career benefits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Admissions;