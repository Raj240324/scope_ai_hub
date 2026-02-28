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
import { useModal } from '../context/ModalContext';
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
    { name: 'Weekday Batch', time: '10:00 AM - 1:00 PM', days: 'Mon - Fri', status: 'Admissions Open' },
    { name: 'Evening Batch', time: '6:30 PM - 8:30 PM', days: 'Mon - Fri', status: 'Filling Fast' },
    { name: 'Weekend Batch', time: '10:00 AM - 4:00 PM', days: 'Sat - Sun', status: 'Admissions Open' },
  ];

  return (
    <Layout 
      title={`Admissions | Start Your Tech Career with ${BRANDING.fullName}`}
      description={`Easy 4-step admission process at ${BRANDING.fullName} Training Institute. Check eligibility, batch timings, and enroll for upcoming batches.`}
    >
      <Hero 
        badge="Simple · Transparent · Fast"
        title={<>Your Seat Is <span className="text-primary">Waiting</span>.</>}
      />

      <div className="container-custom section-padding">
        {/* Admission Steps - Connected Visual Pathway */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-md mb-4">How It Works</h2>
            <p className="text-[var(--text-muted)] text-lg">
              Your journey to a thriving tech career is simple and transparent. Follow these 4 easy steps to get started.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-[var(--border-color)] z-0 rounded-full" />
            
            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute top-8 bottom-8 left-[2.25rem] w-1 bg-[var(--border-color)] z-0 rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-row lg:flex-col items-start lg:items-center relative group">
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 left-4 lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 bg-[var(--bg-body)] px-3 text-[10px] font-black text-primary uppercase tracking-widest border border-[var(--border-color)] rounded-full z-20 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Step 0{index + 1}
                  </div>

                  {/* Icon Node */}
                  <div className="shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] group-hover:border-primary shadow-sm group-hover:shadow-xl transition-all duration-300 flex items-center justify-center relative z-10 mb-0 lg:mb-8 ml-4 lg:ml-0 group-hover:-translate-y-2">
                    <div className="bg-primary/10 h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 lg:ml-0 flex-1 lg:text-center mt-2 lg:mt-0">
                    <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base text-[var(--text-muted)] leading-relaxed lg:max-w-[280px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Eligibility */}
          <div className="space-y-8">
            <h2 className="heading-md">Eligibility Criteria</h2>
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

          {/* Batch Schedules */}
          <div className="space-y-8">
            <h2 className="heading-md">Batch Schedules</h2>
            <div className="bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-[var(--text-heading)] uppercase tracking-wider">Batch</th>
                      <th className="px-6 py-4 text-sm font-bold text-[var(--text-heading)] uppercase tracking-wider">Timings</th>
                      <th className="px-6 py-4 text-sm font-bold text-[var(--text-heading)] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {batches.map((batch, i) => (
                      <tr key={i} className="hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-6 py-6">
                          <div className="font-bold text-[var(--text-heading)]">{batch.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">{batch.days}</div>
                        </td>
                        <td className="px-6 py-6 text-sm text-[var(--text-muted)] font-medium">
                          {batch.time}
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            batch.status === 'Filling Fast' ? 'bg-accent-warning/10 text-accent-warning' : 'bg-accent-success/10 text-accent-success'
                          }`}>
                            {batch.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
          <CreditCard className="absolute -top-4 -left-4 h-32 w-32 text-[var(--text-on-inverted)]/5" />
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
