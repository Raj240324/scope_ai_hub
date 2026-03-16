import React, { useState, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Hero from '../components/ui/Hero';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/utils/SEO';
import { BRANDING } from '../data/branding';
import { courses } from '../data/courses';
import { m } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fadeUp, staggerContainer, staggerItem } from '../utils/motionVariants';

const faqData = [
  {
    category:"General",
    questions: [
      {
        q: `What makes ${BRANDING.fullName} different from others?`,
        a:"We focus on project-based learning and industrial training. Our curriculum is designed by industry experts, and we provide 100% placement assistance. We prioritize practical skills over theoretical knowledge."
      },
      {
        q:"Do I need any prior coding experience to join?",
        a:"Not necessarily. We have beginner-friendly programs like Generative AI & Prompt Engineering and Python for AI & Machine Learning that start from the basics. For advanced programs like MLOps & AI Deployment, prior Python and ML knowledge is required."
      },
      {
        q:"Are the certificates recognized by companies?",
        a:"Yes, our certificates are well-recognized in the industry. More importantly, the projects you build during the course serve as a portfolio that demonstrates your skills to potential employers."
      }
    ]
  },
  {
    category:"Admissions & Fees",
    questions: [
      {
        q:"How can I enroll in a course?",
        a:"You can enroll by visiting our campus or through our website's admission page. After submitting the application, our counselor will contact you for a brief discussion and guide you through the enrollment process."
      },
      {
        q:"What is the fee structure?",
        a:"To maintain transparency and ensure you get the best value, we discuss our fee structure during the counseling session. Fees vary by course and learning mode. We offer flexible installment options and special discounts. Please click the 'Enquire Now' button to get the latest fee details for your interested course."
      },
      {
        q:"Do you offer any discounts or scholarships?",
        a:"Yes, we offer early-bird discounts and special discounts for group enrollments. Additionally, students who provide a valid student ID card are eligible for an exclusive student discount."
      }
    ]
  },
  {
    category:"Placements & Career Support",
    questions: [
      {
        q:"Do you guarantee a job after completion?",
        a:"We provide dedicated placement assistance, which includes resume building, mock interviews, and job referrals to our 75+ hiring partners. While we don't 'guarantee' a job (as it depends on the student's performance), we support you until you get placed."
      },
      {
        q:"What is the average salary package for freshers?",
        a:"The average package for our freshers ranges from 4 LPA to 8 LPA, depending on the course, skill set, and the hiring company."
      },
      {
        q: `Which companies hire from ${BRANDING.fullName}?`,
        a:"Our students gain opportunities with Top MNCs, Tier-1 and Tier-2 companies, along with some of the most promising startups in the industry. The hiring ecosystem includes global technology leaders, major IT firms, product companies, and rapidly growing startups. Visit our Home or About page to see the full list of recruiters."
      },
      {
        q:"Do you provide resume preparation support?",
        a:"Yes! We provide professionally crafted, ATS-optimized AI-focused resumes. Our career experts tailor it to highlight your projects, skills, and certifications for top employers."
      },
      {
        q:"How many mock interviews will I get?",
        a:"You'll attend 3 rounds of mock technical + HR interviews with real industry experts. You'll get personalized feedback, improvement tips, and confidence for actual placement drives."
      },
      {
        q:"Will you help optimize my LinkedIn profile?",
        a:"Absolutely! We review and optimize your LinkedIn profile — headline, about section, skills, and project showcase — so recruiters find YOU first."
      },
      {
        q:"Do you help with GitHub portfolio setup?",
        a:"Yes, we help you structure and publish all your course projects on GitHub with proper README files, code documentation, and a professional portfolio page recruiters love."
      },
      {
        q:"Will I get a certificate after completion?",
        a:"Yes! You'll receive a verifiable digital certificate from Scope AI Hub upon program completion. It's shareable on LinkedIn with a unique credential ID — recognized by top hiring companies."
      },
      {
        q:"Can I get 1-on-1 mentor sessions?",
        a:"Yes! You can book dedicated sessions with industry mentors who have worked at top AI companies. Get career guidance, code reviews, project mentorship, and real-world advice tailored to you."
      },
      {
        q:"Do you conduct industry expert webinars?",
        a:"Yes, we host monthly live sessions by AI practitioners from top companies like Google, Amazon, and leading startups. Get insider knowledge on hiring, trends, and real projects — ask questions live."
      }
    ]
  },
  {
    category:"Courses & Curriculum",
    questions: [
      {
        q:"What programming languages do you teach?",
        a:"We cover Python, NumPy, Pandas, TensorFlow, PyTorch, Scikit-Learn, OpenCV, Power BI, SQL, and more depending on the program. Our ML & Deep Learning program covers neural networks and model building, while NLP focuses on transformers and chatbot development."
      },
      {
        q:"How long are your courses?",
        a:"Program duration ranges from 5 weeks to 12 weeks depending on the program. For example, AI for Business is 5 weeks, while Machine Learning & Deep Learning is 12 weeks. We offer both weekday and weekend batches to suit working professionals."
      },
      {
        q:"Will I build real projects during the course?",
        a:"Absolutely! Every course includes 3-5 hands-on projects that you build from scratch. These projects go into your portfolio and can be showcased to potential employers. Recent projects include e-commerce platforms, AI chatbots, and cloud-deployed applications."
      },
      {
        q:"Do you teach AI and Machine Learning?",
        a:"Yes! We have dedicated programs for Machine Learning & Deep Learning, Natural Language Processing, Computer Vision, and Generative AI & Prompt Engineering. We use TensorFlow, PyTorch, Hugging Face, and OpenAI APIs."
      },
      {
        q: "Can I switch courses after enrollment?",
        a: "Yes, you can switch to another course within the first week if you feel it is not the right fit. Any fee difference will be adjusted accordingly. Our counselors will also guide you in choosing the right course initially to help avoid this situation."
      }
    ]
  },
  {
    category:"Learning Modes",
    questions: [
      {
        q:"Do you offer online classes?",
        a:"Yes! We offer three modes: Online (live interactive), Offline (in-person at Chennai campus), and Hybrid (combination of both). All modes have the same curriculum and placement support."
      },
      {
        q:"What is the difference between Online and Offline classes?",
        a:"Offline classes are conducted at our Chennai campus with face-to-face interaction. Online classes are live sessions via Zoom/Google Meet with real-time doubt clearing. Both have equal value and the same trainers."
      },
      {
        q:"Will I get recorded sessions?",
        a:"Yes, all live sessions (both online and offline) are recorded and uploaded to our Learning Management System (LMS). You get lifetime access to these recordings even after course completion."
      },
      {
        q:"Can I attend classes if I'm working full-time?",
        a:"Definitely! We have evening batches (6:30 PM - 8:30 PM) and weekend batches (Sat-Sun, 10 AM - 4 PM) specifically designed for working professionals. Many of our students are currently employed."
      }
    ]
  },
  {
    category:"Technical & Support",
    questions: [
      {
        q:"What kind of support do I get after completing the course?",
        a:"You get lifetime access to course materials, ongoing doubt support via dedicated WhatsApp groups, access to alumni network, and continued placement assistance until you land a job. We also invite alumni for advanced workshops."
      },
      {
        q: "Do I need a laptop with specific requirements?",
        a: "For most programs, a laptop running Windows or macOS with at least 8GB RAM and a stable internet connection is sufficient. For advanced programs such as Machine Learning, Deep Learning, and Computer Vision, a system with 16GB RAM is recommended for smoother performance."
      },
      {
        q:"Will I get 1-on-1 mentorship?",
        a:"Yes, each student is assigned a mentor who tracks your progress, reviews your projects, and guides you through challenges. You can also book 1-on-1 sessions with trainers for personalized doubt clearing."
      },
      {
        q:"What if I miss a class?",
        a:"No worries! Since all classes are recorded, you can catch up anytime via the LMS. Additionally, mentors provide catch-up sessions if you're struggling with a concept you missed."
      }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-color)] last:border-0">
      <m.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
      >
        <span className="text-base md:text-lg font-semibold text-[var(--text-heading)] group-hover:text-primary transition-colors pr-6 sm:pr-8">
          {question}
        </span>
        <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'text-[var(--text-muted)]'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </m.button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const { openModal } = useModal();
  const contentRef = useRef(null);
  
  const { ref: sidebarRef, isVisible: sidebarVisible } = useScrollReveal();
  const { ref: mainRef, isVisible: mainVisible } = useScrollReveal();

  // Generate FAQPage JSON-LD Schema
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity": faqData.flatMap(cat => cat.questions).map(q => ({"@type":"Question","name": q.q,"acceptedAnswer": {"@type":"Answer","text": q.a
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <SEO 
        title={`FAQ | Frequently Asked Questions - ${BRANDING.fullName}`} 
        description="Find answers to common questions about our courses, admission process, fees, and placement support." 
        canonical="/faq"
      />
      
      <Hero 
        badge="Everything You Need to Know"
        title={<>You Asked. We <span className="font-extrabold text-primary">Answered</span>.</>}
      />

      <div className="bg-[var(--bg-secondary)] py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Categories */}
            <m.div 
              ref={sidebarRef}
              variants={fadeUp}
              initial="hidden"
              animate={sidebarVisible ? 'visible' : 'hidden'}
              className="lg:col-span-1"
            >
              <div className="bg-[var(--bg-card)] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[var(--border-color)] sticky top-32">
                <h3 className="text-small font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6 px-4">Categories</h3>
                <nav className="space-y-2">
                  {faqData.map((cat) => (
                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={cat.category}
                      onClick={() => {
                        setActiveCategory(cat.category);
                        if (contentRef.current) {
                          contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                        activeCategory === cat.category
                          ? 'bg-primary text-[var(--text-on-inverted)] shadow-lg shadow-primary/25'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {cat.category}
                    </m.button>
                  ))}
                </nav>

                <div className="mt-10 p-6 bg-[var(--bg-inverted)] light-surface text-[var(--text-on-light)] rounded-2xl">
                  <MessageCircle className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-bold mb-2">Still have questions?</h4>
                  <p className="text-[var(--text-on-light)]/60 text-caption mb-6">Can't find what you're looking for? Reach out to our team.</p>
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="w-full btn-primary py-3 text-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  >
                    Contact Support
                  </m.button>
                </div>
              </div>
            </m.div>

            {/* FAQ List */}
            <m.div 
              ref={mainRef}
              variants={staggerContainer}
              initial="hidden"
              animate={mainVisible ? 'visible' : 'hidden'}
              className="lg:col-span-3"
            >
              <div ref={contentRef} className="bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl shadow-sm border border-[var(--border-color)] overflow-hidden">
                <div className="p-5 sm:p-8 md:p-12">
                  <h2 className="heading-md mb-8 flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    {activeCategory} Questions
                  </h2>
                  <div className="divide-y divide-[var(--border-color)]">
                    {faqData
                      .find(cat => cat.category === activeCategory)
                      ?.questions.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                      ))}
                  </div>
                </div>
              </div>

              {/* Course Comparison Table */}
              <m.div variants={staggerItem} className="mt-8 sm:mt-12 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm overflow-hidden">
                <div className="p-5 sm:p-8 bg-primary/5 border-b border-[var(--border-color)]">
                  <h3 className="heading-sm sm:heading-md">📊 Quick Course Comparison</h3>
                  <p className="text-[var(--text-muted)] mt-2">Compare our top courses to find the perfect fit for your career goals.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-small">
                    <thead className="bg-[var(--bg-secondary)]">
                      <tr>
                        <th className="text-left p-4 font-bold text-[var(--text-heading)]">Course</th>
                        <th className="text-left p-4 font-bold text-[var(--text-heading)]">Duration</th>
                        <th className="text-left p-4 font-bold text-[var(--text-heading)]">Difficulty</th>
                        <th className="text-left p-4 font-bold text-[var(--text-heading)]">Prerequisites</th>
                        <th className="text-left p-4 font-bold text-[var(--text-heading)]">Average Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item) => ({
                        course: item.title,
                        duration: item.duration,
                        difficulty: item.tier,
                        prereq: item.prerequisites[0] || 'None',
                        salary: item.salaryRange,
                      })).map((item, i) => (
                        <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 transition-colors">
                          <td className="p-4 font-bold text-primary">{item.course}</td>
                          <td className="p-4 text-[var(--text-muted)]">{item.duration}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-caption font-bold ${
                              item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                              item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="p-4 text-[var(--text-muted)]">{item.prereq}</td>
                          <td className="p-4 font-bold text-[var(--text-heading)]">{item.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </m.div>

              {/* Still Need Help Section */}
              <m.div variants={staggerItem} className="mt-8 sm:mt-12 text-center p-6 sm:p-12 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl border border-[var(--border-color)] shadow-sm">
                <h3 className="heading-sm sm:heading-md mb-4">Didn't find your answer?</h3>
                <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
                  Our team of counselors is available to answer any specific questions you may have about your career path or our training programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+917010230379" className="btn-secondary px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">
                    Call +91 70102 30379
                  </a>
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="btn-primary px-8 py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                  >
                    Send an Inquiry
                  </m.button>
                </div>
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
