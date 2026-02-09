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
  },
  {
    category: "Courses & Curriculum",
    questions: [
      {
        q: "What programming languages do you teach?",
        a: "We cover Python, JavaScript (React, Node.js), Java, C++, SQL, and more depending on the course. Our Full Stack course focuses on MERN stack (MongoDB, Express, React, Node.js), while Data Science courses emphasize Python libraries like NumPy, Pandas, and TensorFlow."
      },
      {
        q: "How long are your courses?",
        a: "Course duration varies from 8 weeks to 24 weeks depending on the program. For example, Full Stack Web Development is 24 weeks, while UI/UX Design is 12 weeks. We offer both weekday and weekend batches to suit working professionals."
      },
      {
        q: "Will I build real projects during the course?",
        a: "Absolutely! Every course includes 3-5 hands-on projects that you build from scratch. These projects go into your portfolio and can be showcased to potential employers. Recent projects include e-commerce platforms, AI chatbots, and cloud-deployed applications."
      },
      {
        q: "Do you teach AI and Machine Learning?",
        a: "Yes! Our 'Data Science with AI & ML' course covers supervised/unsupervised learning, neural networks, deep learning, NLP, computer vision, and Generative AI fundamentals. We use TensorFlow, PyTorch, and OpenAI APIs."
      },
      {
        q: "Can I switch courses after enrollment?",
        a: "Yes, you can switch to another course within the first 2 weeks if you feel it's not the right fit. We'll adjust the fee difference accordingly. Our counselors also help you choose the right course initially to avoid this situation."
      }
    ]
  },
  {
    category: "Learning Modes",
    questions: [
      {
        q: "Do you offer online classes?",
        a: "Yes! We offer three modes: Online (live interactive), Offline (in-person at Chennai campus), and Hybrid (combination of both). All modes have the same curriculum and placement support."
      },
      {
        q: "What is the difference between Online and Offline classes?",
        a: "Offline classes are conducted at our Chennai campus with face-to-face interaction. Online classes are live sessions via Zoom/Google Meet with real-time doubt clearing. Both have equal value and the same trainers."
      },
      {
        q: "Will I get recorded sessions?",
        a: "Yes, all live sessions (both online and offline) are recorded and uploaded to our Learning Management System (LMS). You get lifetime access to these recordings even after course completion."
      },
      {
        q: "Can I attend classes if I'm working full-time?",
        a: "Definitely! We have evening batches (6:30 PM - 8:30 PM) and weekend batches (Sat-Sun, 10 AM - 4 PM) specifically designed for working professionals. Many of our students are currently employed."
      }
    ]
  },
  {
    category: "Technical & Support",
    questions: [
      {
        q: "What kind of support do I get after completing the course?",
        a: "You get lifetime access to course materials, ongoing doubt support via dedicated WhatsApp groups, access to alumni network, and continued placement assistance until you land a job. We also invite alumni for advanced workshops."
      },
      {
        q: "Do I need a laptop with specific requirements?",
        a: "For most courses, a laptop with Windows/macOS, 8GB RAM, and stable internet is sufficient. For Data Science and AI courses, 16GB RAM is recommended. If you don't have a laptop, we provide computer lab access at our campus."
      },
      {
        q: "Will I get 1-on-1 mentorship?",
        a: "Yes, each student is assigned a mentor who tracks your progress, reviews your projects, and guides you through challenges. You can also book 1-on-1 sessions with trainers for personalized doubt clearing."
      },
      {
        q: "What if I miss a class?",
        a: "No worries! Since all classes are recorded, you can catch up anytime via the LMS. Additionally, mentors provide catch-up sessions if you're struggling with a concept you missed."
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

              {/* Course Comparison Table */}
              <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 bg-primary/5 border-b border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900">📊 Quick Course Comparison</h3>
                  <p className="text-slate-600 mt-2">Compare our top courses to find the perfect fit for your career goals.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-bold text-slate-900">Course</th>
                        <th className="text-left p-4 font-bold text-slate-900">Duration</th>
                        <th className="text-left p-4 font-bold text-slate-900">Difficulty</th>
                        <th className="text-left p-4 font-bold text-slate-900">Prerequisites</th>
                        <th className="text-left p-4 font-bold text-slate-900">Average Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { course: "Full Stack Web Development", duration: "24 Weeks", difficulty: "Beginner", prereq: "None", salary: "5-10 LPA" },
                        { course: "Data Science & AI/ML", duration: "24 Weeks", difficulty: "Intermediate", prereq: "Basic Programming", salary: "8-15 LPA" },
                        { course: "UI/UX Design", duration: "12 Weeks", difficulty: "Beginner", prereq: "Design Interest", salary: "4-8 LPA" },
                        { course: "Cyber Security", duration: "16 Weeks", difficulty: "Intermediate", prereq: "Networking Basics", salary: "6-12 LPA" },
                        { course: "Cloud Computing (AWS)", duration: "16 Weeks", difficulty: "Intermediate", prereq: "Linux, Networking", salary: "7-14 LPA" },
                        { course: "Mobile App Development", duration: "20 Weeks", difficulty: "Beginner-Int", prereq: "Programming Basics", salary: "5-11 LPA" },
                        { course: "Digital Marketing", duration: "8 Weeks", difficulty: "Beginner", prereq: "None", salary: "3-7 LPA" }
                      ].map((item, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-primary">{item.course}</td>
                          <td className="p-4 text-slate-600">{item.duration}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                              item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">{item.prereq}</td>
                          <td className="p-4 font-bold text-slate-900">{item.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
