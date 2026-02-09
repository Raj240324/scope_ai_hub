import React from 'react';
import Layout from '../components/layout/Layout';
import { 
  ClipboardList, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import Hero from '../components/ui/Hero';
import { BRANDING } from '../data/branding';

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
      description: "Complete the registration process and secure your seat. Fees start from ₹25,000 depending on the course."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Start Learning",
      description: "Join the induction session and begin your journey towards mastering tech skills."
    }
  ];

  const batches = [
    { name: 'Weekday Batch', time: '10:00 AM - 1:00 PM', days: 'Mon - Fri', status: 'Starts Feb 15th' },
    { name: 'Evening Batch', time: '6:30 PM - 8:30 PM', days: 'Mon - Fri', status: 'Available' },
    { name: 'Weekend Batch', time: '10:00 AM - 4:00 PM', days: 'Sat - Sun', status: 'Starts Feb 20th' },
  ];

  return (
    <Layout 
      title={`Admissions | Start Your Tech Career with ${BRANDING.fullName}`}
      description={`Easy 4-step admission process at ${BRANDING.fullName} Training Institute. Check eligibility, batch timings, and enroll for upcoming batches.`}
    >
      <Hero 
        title={<>Your Journey to <span className="text-primary">Tech Excellence</span> Starts Here.</>}
        subtitle="Our admission process is designed to be simple and transparent. Follow these steps to secure your future in the software industry."
      />

      <div className="container-custom section-padding">
        {/* Admission Steps */}
        <div className="mb-24">
          <h2 className="heading-md mb-12 text-center">How to Enroll</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
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
                <div key={i} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Batch Schedules */}
          <div className="space-y-8">
            <h2 className="heading-md">Batch Schedules</h2>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Batch</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Timings</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {batches.map((batch, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-6">
                          <div className="font-bold text-slate-900">{batch.name}</div>
                          <div className="text-xs text-slate-500">{batch.days}</div>
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-600 font-medium">
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
        <div className="mb-24">
          <h2 className="heading-md mb-12  text-center">Scholarships & Financial Aid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Early Bird Discount",
                discount: "Up to 15% Off",
                desc: "Enroll 2 weeks before batch starts and save significantly on course fees.",
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Merit-Based Scholarship",
                discount: "10-20% Off",
                desc: "Top performers in our entrance assessment qualify for merit scholarships.",
                color: "from-blue-500 to-cyan-600"
              },
              {
                title: "Group Enrollment",
                discount: "₹2000/student Off",
                desc: "Bring 3+ friends and everyone gets a special group discount.",
                color: "from-purple-500 to-pink-600"
              }
            ].map((scheme, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center mb-6 text-white text-2xl font-black shadow-lg`}>
                  {scheme.discount.includes('%') ? scheme.discount.replace(' Off', '') : '₹'}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{scheme.title}</h3>
                <p className="text-sm text-primary font-bold mb-2">{scheme.discount}</p>
                <p className="text-slate-600 leading-relaxed text-sm">{scheme.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">💳 Flexible Payment Options</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">EMI Available</h4>
                  <p className="text-sm text-slate-600">Pay in easy installments - 0% interest for 3 months</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Pay After Placement</h4>
                  <p className="text-sm text-slate-600">Select courses offer deferred payment options</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">UPI & Net Banking</h4>
                  <p className="text-sm text-slate-600">All major payment methods accepted</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-success shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">No Hidden Charges</h4>
                  <p className="text-sm text-slate-600">What you see is what you pay - completely transparent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure Note */}
        <div className="mt-24 p-8 md:p-12 bg-slate-900 text-white rounded-3xl relative overflow-hidden text-center">
          <CreditCard className="absolute -top-4 -left-4 h-32 w-32 text-white/5" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">Transparent Fee Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
             <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Short Courses</h3>
                <p className="text-2xl font-black mb-1">₹15k - ₹25k</p>
                <p className="text-xs text-slate-400">Duration: 1-2 Months</p>
             </div>
             <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Career Programs</h3>
                <p className="text-2xl font-black mb-1">₹35k - ₹55k</p>
                <p className="text-xs text-slate-400">Duration: 4-6 Months</p>
             </div>
             <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-lg mb-2 text-primary-light">Masters Program</h3>
                <p className="text-2xl font-black mb-1">₹65k - ₹85k</p>
                <p className="text-xs text-slate-400">Duration: 8-12 Months</p>
             </div>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 relative z-10"></p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
            <button 
              onClick={() => openModal()}
              className="btn-primary"
            >
              Enquire About Fees
            </button>
            <Link to="/courses" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl transition-colors border border-white/10">
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admissions;
