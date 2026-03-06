import React from 'react';
import Layout from '../components/layout/Layout';
import { 
  ClipboardList, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import SEO from '../components/utils/SEO';
import Hero from '../components/ui/Hero';
import { BRANDING } from '../data/branding';
import { addons } from '../data/addons';

const Admissions = () => {
  const { openModal } = useModal();
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

  const batches = [
    {
      title: "Weekday Morning",
      days: "Mon – Fri",
      time: "Before 10:00 AM",
      desc: "Pick your preferred 2-hour slot",
      mode: "Online",
      status: "Admissions Open"
    },
    {
      title: "Weekday Evening",
      days: "Mon – Fri",
      time: "After 5:00 PM",
      desc: "Perfect after office hours",
      mode: "Online",
      status: "Filling Fast"
    },
    {
      title: "Weekend Batch",
      days: "Sat – Sun",
      time: "Any Time — 3 hr session",
      desc: "1.5 hrs · Break · 1.5 hrs",
      mode: "At Center",
      status: "Admissions Open"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
        title={<>Your Seat Is <span className="text-primary">Waiting</span>.</>}
      />

      <div className="container-custom section-padding">
        {/* How It Works - Premium Flip Cards */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">How It Works</h2>
            <p className="text-[var(--text-muted)] text-lg">
              Your journey to a thriving tech career is simple and transparent.
              Follow these 4 easy steps to get started.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => {
              const titleColors = ['#67e8f9', '#fbbf24', '#6ee7b7', '#f9a8d4'];
              return (
              <motion.div
                key={index}
                variants={item}
                className="flip-card"
              >
                <div className="flip-card-inner">
                  {/* FRONT */}
                  <div className="flip-card-front">
                    <span className="step-badge">
                      STEP 0{index + 1}
                    </span>
                    <div className="step-icon">
                      {step.icon}
                    </div>
                    <h3 className="step-title">
                      {step.title}
                    </h3>
                  </div>

                  {/* BACK */}
                  <div className="flip-card-back">
                    <h3 className="step-title-back" style={{ color: titleColors[index] }}>
                      {step.title}
                    </h3>
                    <p className="step-desc">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          {/* Eligibility */}
          <div className="space-y-8">
            <h2 className="heading-md text-center">Eligibility Criteria</h2>
            <div className="space-y-4">
              {[
                "College students (any stream) looking for industry skills.",
                "Fresh graduates wanting to kickstart their IT career.",
                "Working professionals looking to switch to tech roles.",
                "Basic understanding of computers and a passion for learning.",
                "No prior coding experience required for beginner courses."
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                  <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
                  <span className="text-[var(--text-muted)] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Batch Section */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-wider">
              Flexible Scheduling
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] mb-4">
              Batch Schedules Built for Professionals
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Our trainers are working IT professionals — so we schedule around real lives, not the other way around.
            </p>
          </div>

          {/* Hybrid Training Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] mb-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl blur-layer"></div>
            <h3 className="text-xl font-bold text-[var(--text-heading)] mb-4 relative z-10">
              🇮🇳 India's First Hybrid AI Training — Online Meets In-Person
            </h3>
            <p className="text-[var(--text-muted)] max-w-2xl mb-6 relative z-10">
              Train online on weekdays from home. Walk into our center on alternate weekends for hands-on sessions with your trainer.
              No other institute in India offers this model.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium relative z-10">
              <span>📻 Weekdays Online</span>
              <span className="text-primary animate-pulse">⇄</span>
              <span>🏢 Alternate Weekends In-Person</span>
            </div>
          </motion.div>

          {/* Batch Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {batches.map((batch, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -12 }}
                className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 overflow-hidden transition-all duration-500"
              >
                {/* Glow border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl blur-layer"></div>

                {/* Status badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 mb-5 text-xs font-bold rounded-full relative z-10 ${
                    batch.status === "Filling Fast"
                      ? "bg-orange-500/10 text-orange-500 animate-pulse"
                      : "bg-green-500/10 text-green-500"
                  }`}
                >
                  🔥 {batch.status}
                </span>

                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 relative z-10">
                  {batch.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-6 relative z-10">
                  {batch.days}
                </p>

                <div className="space-y-3 text-sm relative z-10">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Time</span>
                    <span className="font-semibold">{batch.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Mode</span>
                    <span className="font-semibold">{batch.mode}</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-[var(--text-muted)] relative z-10">
                  {batch.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="text-center mt-14">
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Book Your Free Counseling Session
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Scholarships & Financial Aid */}
        <div className="mb-24 mt-12">
          <h2 className="heading-md mb-12  text-center">Financial Assistance Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Early Enrollment",
                discount: "Fee Benefits",
                desc: "Secure your seat well in advance of the batch start date to unlock special fee structures.",
                color: "from-green-500 to-emerald-600",
                icon: "🌟"
              },
              {
                title: "Merit-Based Support",
                discount: "Scholarships",
                desc: "Deserving students with strong academic or technical backgrounds may qualify for fee assistance.",
                color: "from-blue-500 to-cyan-600",
                icon: "🎓"
              },
              {
                title: "Group Registrations",
                discount: "Corporate / Peers",
                desc: "Enrolling as a group of friends or corporate team? Contact us for specialized group pricing.",
                color: "from-purple-500 to-pink-600",
                icon: "👥"
              }
            ].map((scheme, i) => (
              <div key={i} className="bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all">
                <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center mb-5 sm:mb-6 text-white text-xl sm:text-2xl font-black shadow-lg`}>
                  {scheme.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-3">{scheme.title}</h3>
                <p className="text-sm text-primary font-bold mb-2">{scheme.discount}</p>
                <p className="text-[var(--text-muted)] leading-relaxed text-sm">{scheme.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4">💳 Flexible Payment Options</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--text-heading)] mb-1">Installment Plans</h4>
                  <p className="text-sm text-[var(--text-muted)]">Pay course fees in easy, manageable installments</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--text-heading)] mb-1">Educational Loans</h4>
                  <p className="text-sm text-[var(--text-muted)]">Assistance with securing learning loans for long-term programs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--text-heading)] mb-1">Digital Payments</h4>
                  <p className="text-sm text-[var(--text-muted)]">All major UPI, Cards, and Net Banking methods accepted</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--text-heading)] mb-1">Transparent Pricing</h4>
                  <p className="text-sm text-[var(--text-muted)]">No hidden charges or surprise assessment fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure Note */}
        {/* Course Programs Overview */}
        <div className="mt-16 sm:mt-24 p-5 sm:p-8 md:p-12 bg-[var(--bg-inverted)] text-[var(--text-on-inverted)] rounded-2xl sm:rounded-3xl relative overflow-hidden text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">Programs Designed For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
             <div className="bg-[var(--bg-body)]/10 p-6 rounded-2xl border border-[var(--bg-body)]/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Upskill Courses</h3>
                <p className="text-sm text-[var(--text-on-inverted)]/80 mb-2">Targeted training to master specific technologies or tools quickly.</p>
                <p className="text-xs text-[var(--text-on-inverted)]/60 font-bold uppercase tracking-wider">Duration: 1-2 Months</p>
             </div>
             <div className="bg-[var(--bg-body)]/10 p-6 rounded-2xl border border-[var(--bg-body)]/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Career Tracks</h3>
                <p className="text-sm text-[var(--text-on-inverted)]/80 mb-2">Comprehensive pathways to transform you into a job-ready professional.</p>
                <p className="text-xs text-[var(--text-on-inverted)]/60 font-bold uppercase tracking-wider">Duration: 4-6 Months</p>
             </div>
             <div className="bg-[var(--bg-body)]/10 p-6 rounded-2xl border border-[var(--bg-body)]/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Master Programs</h3>
                <p className="text-sm text-[var(--text-on-inverted)]/80 mb-2">Deep-dive intensive programs with extensive projects and mentorship.</p>
                <p className="text-xs text-[var(--text-on-inverted)]/60 font-bold uppercase tracking-wider">Duration: 8-12 Months</p>
             </div>
          </div>
          <p className="text-[var(--text-on-inverted)]/80 max-w-2xl mx-auto mb-10 relative z-10 font-medium">To maintain high training quality, class sizes are strictly limited. Contact our admission desk for detailed fee structures and availability.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
            <button 
              onClick={() => openModal()}
              className="btn-primary"
            >
              Enquire About Admissions
            </button>
            <Link to="/courses" className="bg-[var(--bg-body)]/10 hover:bg-[var(--bg-body)]/20 text-[var(--text-on-inverted)] font-bold px-8 py-4 rounded-xl transition-colors border border-[var(--bg-body)]/10">
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Career Advantages Block */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              <Award className="h-3.5 w-3.5" />
              Career Advantage
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] mb-4">
              12 Benefits Included with Every Program
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              From resume building to job referrals — we're invested in your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {addons.slice(0, 6).map((addon, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-2xl shrink-0">
                  {addon.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 leading-tight text-[var(--text-heading)]">
                    {addon.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 text-[var(--text-body)]">
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
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
