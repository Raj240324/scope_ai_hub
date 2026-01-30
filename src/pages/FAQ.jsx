import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Hero from '../components/ui/Hero';
import { BRANDING } from '../data/branding';

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: `What makes ${BRANDING.fullName} different from others?`,
        a: "We focus on project-based learning and industrial training. Our curriculum is designed by industry experts, and we provide 100% placement assistance. We prioritize practical skills over theoretical knowledge."
      },
      {
        q: "Do I need any prior coding experience to join?",
        a: "Not necessarily. We have beginner-friendly courses like Full Stack Web Development and Python that start from the basics. However, for advanced courses like Data Science or Cloud Computing, some prior knowledge is beneficial."
      },
      {
        q: "Are the certificates recognized by companies?",
        a: "Yes, our certificates are well-recognized in the industry. More importantly, the projects you build during the course serve as a portfolio that demonstrates your skills to potential employers."
      }
    ]
  },
  {
    category: "Admissions & Fees",
    questions: [
      {
        q: "How can I enroll in a course?",
        a: "You can enroll by visiting our campus or through our website's admission page. After submitting the application, our counselor will contact you for a brief discussion and guide you through the enrollment process."
      },
      {
        q: "What is the fee structure?",
        a: "To maintain transparency and ensure you get the best value, we discuss our fee structure during the counseling session. Fees vary by course and learning mode. We offer flexible installment options and special discounts. Please click the 'Enquire Now' button to get the latest fee details for your interested course."
      },
      {
        q: "Do you offer any discounts or scholarships?",
        a: "Yes, we offer early-bird discounts and merit-based scholarships for deserving candidates. We also have special discounts for group enrollments."
      }
    ]
  },
  {
    category: "Placements",
    questions: [
      {
        q: "Do you guarantee a job after completion?",
        a: "We provide dedicated placement assistance, which includes resume building, mock interviews, and job referrals to our 50+ hiring partners. While we don't 'guarantee' a job (as it depends on the student's performance), we support you until you get placed."
      },
      {
        q: "What is the average salary package for freshers?",
        a: "The average package for our freshers ranges from 4 LPA to 8 LPA, depending on the course, skill set, and the hiring company."
      },
      {
        q: `Which companies hire from ${BRANDING.fullName}?`,
        a: "Our students are placed in top MNCs and startups like Google, Amazon, TCS, Infosys, Wipro, and many others. Check our Placement page for a more comprehensive list."
      }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-slate-300 flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'text-slate-400'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const { openModal } = useModal();

  return (
    <Layout 
      title={`FAQ | Frequently Asked Questions - ${BRANDING.fullName}`}
      description="Find answers to common questions about our courses, admission process, fees, and placement support."
    >
      <Hero 
        title={<>Frequently Asked <span className="text-primary">Questions</span></>}
        subtitle="Find answers to common questions about our courses, admission process, and career support."
      />

      <div className="bg-slate-50 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-32">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">Categories</h3>
                <nav className="space-y-2">
                  {faqData.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => setActiveCategory(cat.category)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                        activeCategory === cat.category
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </nav>

                <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white">
                  <MessageCircle className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-bold mb-2">Still have questions?</h4>
                  <p className="text-slate-400 text-xs mb-6">Can't find what you're looking for? Reach out to our team.</p>
                  <button 
                    onClick={() => openModal()}
                    className="w-full text-center py-3 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    {activeCategory} Questions
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {faqData
                      .find(cat => cat.category === activeCategory)
                      ?.questions.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                      ))}
                  </div>
                </div>
              </div>

              {/* Still Need Help Section */}
              <div className="mt-12 text-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Didn't find your answer?</h3>
                <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                  Our team of counselors is available to answer any specific questions you may have about your career path or our training programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+916383980415" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                    Call +91 63839 80415
                  </a>
                  <button 
                    onClick={() => openModal()}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
                  >
                    Send an Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
