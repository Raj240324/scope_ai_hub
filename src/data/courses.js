import { BRANDING } from './branding';

export const courses = [
  {
    id: "full-stack-web-dev",
    title: "Full Stack Web Development (MERN Stack)",
    slug: "full-stack-web-development",
    category: "Development",
    level: "Beginner to Advanced",
    duration: "24 Weeks",
    mode: "Online / Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master both frontend and backend development to build modern, scalable web applications from scratch using the MERN stack.",
    longDescription: "This comprehensive program is designed to take you from a complete beginner to a job-ready Full Stack Developer. You will master the MERN stack (MongoDB, Express.js, React, and Node.js), which is currently the most in-demand technology stack in the industry. The course focuses on hands-on learning through real-world projects, ensuring you understand not just how to code, but how to architect scalable applications.",
    learningObjectives: [
      "Build dynamic and responsive user interfaces using React and Tailwind CSS.",
      "Develop robust backend services and RESTful APIs using Node.js and Express.",
      "Design and manage NoSQL databases with MongoDB and Mongoose.",
      "Implement secure authentication and authorization using JWT and OAuth.",
      "Deploy applications to cloud platforms like AWS, Vercel, and Heroku.",
      "Master version control with Git and collaborative development workflows."
    ],
    whoIsItFor: [
      "College students looking to gain industry-ready skills.",
      "Fresh graduates aiming to kickstart their career in tech.",
      "Working professionals seeking to transition into web development.",
      "Entrepreneurs wanting to build their own tech products."
    ],
    prerequisites: [
      "Basic understanding of computers and the internet.",
      "No prior coding experience required (we start from scratch).",
      "A laptop with at least 8GB RAM and an i5 processor (recommended)."
    ],
    tools: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git", "Postman", "Docker", "AWS"],
    syllabus: [
      {
        module: "Module 1: Frontend Foundations",
        duration: "4 Weeks",
        topics: [
          "HTML5 Semantic Tags & Web Accessibility",
          "Advanced CSS3: Flexbox, Grid, and Animations",
          "Modern JavaScript (ES6+): Closures, Promises, Async/Await",
          "DOM Manipulation and Browser APIs"
        ]
      },
      {
        module: "Module 2: React Mastery",
        duration: "6 Weeks",
        topics: [
          "React Fundamentals: JSX, Props, and State",
          "Hooks (useState, useEffect, useContext, useMemo)",
          "State Management with Redux Toolkit",
          "React Router for Single Page Applications",
          "Styling with Tailwind CSS and Framer Motion"
        ]
      },
      {
        module: "Module 3: Backend & Database",
        duration: "6 Weeks",
        topics: [
          "Node.js Runtime & Event Loop",
          "Building RESTful APIs with Express.js",
          "MongoDB: Data Modeling & Schema Design",
          "Mongoose ODM: CRUD Operations & Validations",
          "Authentication: JWT, Cookies, and Bcrypt"
        ]
      },
      {
        module: "Module 4: Advanced Concepts & Deployment",
        duration: "8 Weeks",
        topics: [
          "Real-time Communication with Socket.io",
          "Microservices Architecture Basics",
          "Unit Testing with Jest & React Testing Library",
          "CI/CD Pipelines & GitHub Actions",
          "Deployment on AWS (EC2/S3) and Vercel"
        ]
      }
    ],
    projects: [
      {
        title: "E-commerce Ecosystem",
        description: "A full-scale store with product management, shopping cart, stripe payment integration, and admin dashboard."
      },
      {
        title: "Social Media API",
        description: "A complex backend for a social network featuring posts, comments, likes, and follower relationships."
      },
      {
        title: "Real-time Collaboration Tool",
        description: "A Trello-like board with real-time updates using Socket.io and drag-and-drop functionality."
      }
    ],
    certification: {
      title: `Certified Full Stack Developer (Official ${BRANDING.fullName} Certification)`,
      details: `Upon successful completion of the course and capstone projects, you will receive an official certification from ${BRANDING.fullName}. This certification validates your proficiency in the MERN stack and makes you a preferred candidate for top-tier tech roles.`
    },
    instructor: {
      name: "S. Raj",
      role: "Senior Architect & Lead Instructor",
      bio: "S. Raj has over 12 years of experience in the software industry, having worked with top MNCs and startups. He specializes in scalable web architectures and has mentored over 1,000+ students globally.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Fill out the inquiry form on our Contact page.",
        "Attend a free career counseling session with our experts.",
        "Complete the basic aptitude test (optional for beginners).",
        "Secure your seat by paying the admission fee."
      ],
      nextBatch: "Starts Feb 15, 2026"
    },
    faqs: [
      {
        question: "Do I need a technical background to join the Full Stack Web Development course?",
        answer: "No, we start from the absolute basics of HTML and CSS. While a logical mindset helps, no prior coding experience is required."
      },
      {
        question: "Is the MERN stack still relevant in 2026?",
        answer: "Absolutely! The MERN stack (MongoDB, Express, React, Node.js) remains one of the most popular and efficient ways to build modern web applications, with a massive job market and community support."
      },
      {
        question: "Will I get assistance in finding a job?",
        answer: "Yes, we provide dedicated job assistance including resume building, mock interviews, and referrals to our partner companies."
      }
    ]
  },
  {
    id: "data-science-ai",
    title: "Data Science & Artificial Intelligence",
    slug: "data-science-ai",
    category: "Data Science",
    level: "Intermediate",
    duration: "28 Weeks",
    mode: "Online / Offline",
    price: "Request Fee Details",
    shortDescription: "Transform raw data into actionable insights and build intelligent systems using Python, Machine Learning, and Deep Learning.",
    longDescription: "The Data Science & AI program is designed for those who want to dive deep into the world of data. From statistical analysis to building complex neural networks, this course covers the entire spectrum. You will work with real-world datasets, learn how to handle big data, and deploy machine learning models that solve actual business problems.",
    learningObjectives: [
      "Master Python programming for data analysis and visualization.",
      "Apply statistical methods to extract meaning from complex datasets.",
      "Build and evaluate supervised and unsupervised machine learning models.",
      "Develop deep learning models using TensorFlow and PyTorch.",
      "Understand Natural Language Processing (NLP) and Computer Vision basics.",
      "Work with Big Data tools like Spark and Hadoop."
    ],
    whoIsItFor: [
      "Math and Statistics enthusiasts.",
      "Software engineers looking to move into AI/ML roles.",
      "Business analysts wanting to upgrade to Data Science.",
      "Researchers and data-driven decision makers."
    ],
    prerequisites: [
      "Basic knowledge of Mathematics (Linear Algebra & Calculus).",
      "Familiarity with at least one programming language.",
      "High-performance laptop (i7 or above, 16GB RAM recommended for ML)."
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "SQL", "Tableau", "Jupyter"],
    syllabus: [
      {
        module: "Module 1: Data Analysis Foundations",
        duration: "6 Weeks",
        topics: [
          "Python for Data Science: Advanced NumPy & Pandas",
          "Data Visualization with Matplotlib & Seaborn",
          "Exploratory Data Analysis (EDA) Techniques",
          "SQL for Data Retrieval & Manipulation"
        ]
      },
      {
        module: "Module 2: Machine Learning Mastery",
        duration: "8 Weeks",
        topics: [
          "Regression & Classification Algorithms",
          "Clustering & Dimensionality Reduction",
          "Ensemble Methods: Random Forest & XGBoost",
          "Model Evaluation & Hyperparameter Tuning"
        ]
      },
      {
        module: "Module 3: Deep Learning & AI",
        duration: "8 Weeks",
        topics: [
          "Neural Networks Fundamentals",
          "Convolutional Neural Networks (CNN) for Images",
          "Recurrent Neural Networks (RNN) for Sequences",
          "Generative AI & LLM Basics (OpenAI, HuggingFace)"
        ]
      },
      {
        module: "Module 4: Big Data & Deployment",
        duration: "6 Weeks",
        topics: [
          "Big Data Processing with PySpark",
          "Deploying ML Models as APIs (Flask/FastAPI)",
          "Cloud ML Services (AWS SageMaker/Google AI)",
          "Final Capstone: End-to-End AI Project"
        ]
      }
    ],
    projects: [
      {
        title: "Predictive Healthcare System",
        description: "Using ML to predict patient readmission rates based on historical health records."
      },
      {
        title: "Stock Market Sentiment Analyzer",
        description: "Analyzing news and social media trends to predict market movements using NLP."
      },
      {
        title: "Autonomous Object Detection",
        description: "Building a real-time object detection system using YOLO and OpenCV."
      }
    ],
    certification: {
      title: `Data Science & AI Professional (Official ${BRANDING.fullName} Certification)`,
      details: `Earn a professional certification from ${BRANDING.fullName} that validates your expertise in Machine Learning, Deep Learning, and Big Data Analytics, providing a significant advantage in the global AI job market.`
    },
    instructor: {
      name: "Dr. Anitha M.",
      role: "Chief Data Scientist",
      bio: "Dr. Anitha holds a Ph.D. in Machine Learning and has over 8 years of research and industry experience in AI. She has published multiple papers in international journals.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Inquire via our website or visit our campus.",
        "Clear the Data Science Entrance Assessment.",
        "Interview with the lead instructor.",
        "Enrollment confirmation and access to pre-reading material."
      ],
      nextBatch: "Starts March 1, 2026"
    },
    faqs: [
      {
        question: "How much Mathematics is required for this course?",
        answer: "You should have a basic understanding of Linear Algebra, Calculus, and Statistics (High school level). We cover the advanced math required for Machine Learning within the course."
      },
      {
        question: "Do I need to know Python before starting?",
        answer: "Familiarity with any programming language is a plus, but we start with a comprehensive Python module tailored for Data Science."
      },
      {
        question: "What kind of hardware do I need for AI/ML projects?",
        answer: "A laptop with at least 16GB RAM and an i7 processor is recommended. For deep learning, we also teach how to use cloud-based environments like Google Colab."
      }
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Strategy",
    slug: "ui-ux-design",
    category: "Design",
    level: "Beginner",
    duration: "12 Weeks",
    mode: "Online / Offline",
    price: "Request Fee Details",
    shortDescription: "Design intuitive, beautiful, and user-centric digital experiences for web and mobile platforms.",
    longDescription: "Our UI/UX Design Strategy course is more than just learning tools. It's about understanding human psychology, user behavior, and business goals. You will learn the entire design process from user research and wireframing to high-fidelity prototyping and usability testing. By the end of this course, you will have a professional portfolio that stands out.",
    learningObjectives: [
      "Conduct thorough user research and persona development.",
      "Master industry-standard tools like Figma and Adobe XD.",
      "Understand color theory, typography, and layout principles.",
      "Create interactive prototypes and micro-interactions.",
      "Conduct usability testing and iterate based on feedback.",
      "Build a comprehensive design portfolio for job applications."
    ],
    whoIsItFor: [
      "Aspiring designers and creative thinkers.",
      "Frontend developers wanting to improve their design skills.",
      "Product managers who want to understand the design process.",
      "Anyone interested in digital creativity and problem solving."
    ],
    prerequisites: [
      "A creative mindset and eye for detail.",
      "No prior design experience required.",
      "A laptop capable of running Figma (web-based) smoothly."
    ],
    tools: ["Figma", "Adobe XD", "Miro", "Zeplin", "Notion", "Protopie"],
    syllabus: [
      {
        module: "Module 1: UX Research & Strategy",
        duration: "3 Weeks",
        topics: [
          "Introduction to Design Thinking",
          "User Interviews & Surveys",
          "Empathy Maps & User Personas",
          "Information Architecture & User Flows"
        ]
      },
      {
        module: "Module 2: Wireframing & Prototyping",
        duration: "3 Weeks",
        topics: [
          "Low-fidelity Wireframing (Paper & Digital)",
          "Introduction to Figma: Components & Auto-layout",
          "Creating Interactive Prototypes",
          "Design Systems & UI Kits"
        ]
      },
      {
        module: "Module 3: Visual Design Mastery",
        duration: "3 Weeks",
        topics: [
          "Advanced Typography & Color Theory",
          "Grid Systems & Responsive Design",
          "Micro-interactions & Animations",
          "Accessibility (WCAG) in Design"
        ]
      },
      {
        module: "Module 4: Testing & Portfolio",
        duration: "3 Weeks",
        topics: [
          "Usability Testing Methods",
          "Design Handoff to Developers",
          "Building your Case Study",
          "Portfolio Presentation Skills"
        ]
      }
    ],
    projects: [
      {
        title: "FinTech Mobile App",
        description: "Designing a complete mobile banking experience focusing on security and ease of use."
      },
      {
        title: "EdTech Web Platform",
        description: "Creating an end-to-end learning management system for schools."
      },
      {
        title: "E-commerce Redesign",
        description: "Solving conversion issues for a local brand through data-driven design."
      }
    ],
    certification: {
      title: "UI/UX Design Professional (Industry Accredited)",
      details: "Receive an industry-recognized certification upon successful review of your design portfolio. Our certification is valued by top product companies and design agencies, validating your skills in user research, design strategy, and visual excellence."
    },
    instructor: {
      name: "Karthik R.",
      role: "Lead Product Designer",
      bio: "Karthik is a veteran designer with experience at top tech startups. He believes in 'Form follows Function' and focuses on solving real problems through design.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Submit your creative interest via the inquiry form.",
        "Attend a design workshop/demo session.",
        "Personal interview to discuss career goals.",
        "Enroll and start your design journey."
      ],
      nextBatch: "Starts Feb 20, 2026"
    },
    faqs: [
      {
        question: "Do I need to be good at drawing for UI/UX?",
        answer: "No! UI/UX design is about problem-solving and user behavior, not artistic drawing. You'll learn to use design tools to create interfaces."
      },
      {
        question: "Which software will I learn in this course?",
        answer: "We primarily focus on Figma, as it's the industry standard, but we also cover Adobe XD and other collaboration tools like Miro."
      },
      {
        question: "Is this course suitable for complete beginners?",
        answer: "Yes, this course is designed for beginners. We take you through the entire design process from research to prototyping."
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security & Ethical Hacking",
    slug: "cyber-security",
    category: "Security",
    level: "Intermediate",
    duration: "20 Weeks",
    mode: "Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Learn to protect digital assets and network by thinking like a hacker and building defensive strategies.",
    longDescription: "In an era of increasing digital threats, cyber security professionals are more critical than ever. This course takes you through the world of ethical hacking, network security, and digital forensics. You will learn how to identify vulnerabilities, perform penetration testing, and implement robust security protocols to safeguard organizations.",
    learningObjectives: [
      "Understand the fundamentals of networking and OS security.",
      "Perform vulnerability assessment and penetration testing (VAPT).",
      "Learn various attack vectors: Web, Network, and Wireless.",
      "Master tools like Kali Linux, Metasploit, and Wireshark.",
      "Implement defensive security and incident response.",
      "Prepare for global certifications like CEH or CompTIA Security+."
    ],
    whoIsItFor: [
      "IT professionals wanting to specialize in security.",
      "Students interested in ethical hacking.",
      "System administrators looking to enhance their defensive skills.",
      "Security enthusiasts and career switchers."
    ],
    prerequisites: [
      "Basic understanding of Networking (TCP/IP).",
      "Familiarity with Linux command line is a plus.",
      "Laptop with support for virtualization (VT-x/AMD-V)."
    ],
    tools: ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "Burp Suite", "Splunk"],
    syllabus: [
      {
        module: "Module 1: Networking & Linux Security",
        duration: "4 Weeks",
        topics: [
          "Network Protocols & Architecture",
          "Linux Fundamentals for Security",
          "Information Gathering & Reconnaissance",
          "Footprinting & Scanning"
        ]
      },
      {
        module: "Module 2: Vulnerability Analysis",
        duration: "5 Weeks",
        topics: [
          "System Hacking & Privilege Escalation",
          "Malware Threats & Analysis",
          "Sniffing & Social Engineering",
          "Denial of Service (DoS) Attacks"
        ]
      },
      {
        module: "Module 3: Web & Network Hacking",
        duration: "6 Weeks",
        topics: [
          "Web Application Vulnerabilities (OWASP Top 10)",
          "SQL Injection & Cross-Site Scripting (XSS)",
          "Wireless Network Security & Hacking",
          "Mobile Platform Security"
        ]
      },
      {
        module: "Module 4: Defense & Forensics",
        duration: "5 Weeks",
        topics: [
          "IDS, Firewalls & Honeypots",
          "Cryptography & PKI",
          "Cloud Security Fundamentals",
          "Digital Forensics & Incident Response"
        ]
      }
    ],
    projects: [
      {
        title: "Network VAPT Report",
        description: "Conducting a full vulnerability assessment of a corporate network lab and providing a mitigation report."
      },
      {
        title: "Secure Web Application",
        description: "Developing a web app and hardening it against OWASP Top 10 attacks."
      },
      {
        title: "Malware Analysis Lab",
        description: "Setting up a sandbox to analyze and understand the behavior of various malware samples."
      }
    ],
    certification: {
      title: "Certified Ethical Security Specialist (Global Standards)",
      details: "This certification is aligned with global cyber security frameworks and prepares you for recognized industry credentials like CEH and CompTIA Security+. It confirms your ability to defend organizational assets and perform professional penetration testing."
    },
    instructor: {
      name: "Suresh K.",
      role: "Cyber Security Consultant",
      bio: "Suresh is a CEH certified professional with 10+ years in the security domain. He has helped numerous firms secure their infrastructure and is a regular speaker at security conferences.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Inquiry and document verification.",
        "Security mindset assessment interview.",
        "Background check (standard procedure).",
        "Enrollment and lab setup instructions."
      ],
      nextBatch: "Starts March 15, 2026"
    },
    faqs: [
      {
        question: "Is ethical hacking legal to learn?",
        answer: "Yes, ethical hacking is perfectly legal when practiced in a controlled environment or with explicit permission. We teach you how to use these skills for defense and security."
      },
      {
        question: "What hardware do I need for this course?",
        answer: "A laptop with virtualization support (at least 8GB RAM, 16GB preferred) is necessary to run Kali Linux and other security tools in virtual machines."
      },
      {
        question: "Will this course help me get CEH certification?",
        answer: "Yes, the curriculum is aligned with global certifications like CEH (Certified Ethical Hacker) and CompTIA Security+, providing a strong foundation for the exams."
      }
    ]
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing & DevOps",
    slug: "cloud-computing",
    category: "Infrastructure",
    level: "Intermediate",
    duration: "18 Weeks",
    mode: "Online / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master cloud infrastructure and DevOps practices to automate deployment and scale applications globally.",
    longDescription: "Cloud Computing is the backbone of modern tech. This course focuses on AWS and Azure, teaching you how to build scalable, resilient, and cost-effective infrastructure. You will also master DevOps tools like Docker, Kubernetes, and Terraform to automate the software development lifecycle.",
    learningObjectives: [
      "Master AWS and Azure core services (Compute, Storage, Network).",
      "Implement Infrastructure as Code (IaC) using Terraform.",
      "Containerize applications with Docker and manage them with Kubernetes.",
      "Set up robust CI/CD pipelines using GitHub Actions and Jenkins.",
      "Implement cloud security best practices and monitoring.",
      "Prepare for AWS Certified Solutions Architect exam."
    ],
    whoIsItFor: [
      "Developers looking to understand infrastructure.",
      "System administrators transitioning to Cloud/DevOps.",
      "Engineering managers wanting to optimize costs.",
      "Anyone interested in high-availability systems."
    ],
    prerequisites: [
      "Basic understanding of OS and Web Servers.",
      "Familiarity with at least one scripting language (Python/Bash).",
      "An active AWS Free Tier account (guidance provided)."
    ],
    tools: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "Git", "Ansible"],
    syllabus: [
      {
        module: "Module 1: Cloud Fundamentals (AWS/Azure)",
        duration: "4 Weeks",
        topics: [
          "Introduction to Cloud & Shared Responsibility Model",
          "Compute: EC2, Lambda, Virtual Machines",
          "Storage: S3, EBS, Azure Blob Storage",
          "Networking: VPC, Subnets, Load Balancers"
        ]
      },
      {
        module: "Module 2: Containerization & Orchestration",
        duration: "5 Weeks",
        topics: [
          "Docker Fundamentals: Images, Containers, Networks",
          "Kubernetes Architecture & Core Objects",
          "Managing Microservices with K8s",
          "Helm Charts & Package Management"
        ]
      },
      {
        module: "Module 3: Infrastructure as Code & Automation",
        duration: "5 Weeks",
        topics: [
          "Terraform: State Management & Modules",
          "Configuration Management with Ansible",
          "Serverless Architectures",
          "Cloud Cost Optimization Strategies"
        ]
      },
      {
        module: "Module 4: CI/CD & Monitoring",
        duration: "4 Weeks",
        topics: [
          "Building CI/CD Pipelines (Jenkins/GitHub Actions)",
          "Monitoring with Prometheus & Grafana",
          "Logging with ELK Stack",
          "Final Project: Fully Automated Cloud Deployment"
        ]
      }
    ],
    projects: [
      {
        title: "High-Availability Web Cluster",
        description: "Deploying a multi-region web application on AWS with auto-scaling and failover."
      },
      {
        title: "K8s Microservices Deployment",
        description: "Containerizing a complex app and deploying it to an EKS cluster with full monitoring."
      },
      {
        title: "Serverless Image Processor",
        description: "Building an automated pipeline that processes images using Lambda and S3 events."
      }
    ],
    certification: {
      title: "Cloud & DevOps Professional",
      details: "Certification focused on real-world infrastructure management and automation skills."
    },
    instructor: {
      name: "Priya S.",
      role: "Senior DevOps Engineer",
      bio: "Priya is a multi-cloud certified professional with extensive experience in migrating legacy systems to the cloud. She is passionate about automation and site reliability.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Inquire for course roadmap.",
        "Cloud readiness assessment.",
        "Setup of cloud accounts.",
        "Final enrollment and orientation."
      ],
      nextBatch: "Starts April 5, 2026"
    },
    faqs: [
      {
        question: "Do I need to be a developer to learn Cloud Computing?",
        answer: "Not necessarily, but basic coding/scripting knowledge (like Python or Bash) is very helpful for automation and DevOps tasks."
      },
      {
        question: "AWS vs Azure - which one should I learn?",
        answer: "Both are market leaders. Our course covers both, giving you a competitive edge. AWS has a larger market share, while Azure is popular in enterprise environments."
      },
      {
        question: "Will I get hands-on experience with cloud platforms?",
        answer: "Yes, we provide guided lab sessions and help you set up free tier accounts on AWS and Azure to practice real-world scenarios."
      }
    ]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile App Development (Flutter & React Native)",
    slug: "mobile-app-development",
    category: "Development",
    level: "Beginner to Advanced",
    duration: "20 Weeks",
    mode: "Online / Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Build high-performance, cross-platform mobile applications for iOS and Android using Flutter and React Native.",
    longDescription: "The mobile app market is booming, and cross-platform development is leading the charge. This course teaches you how to build beautiful, natively compiled applications from a single codebase. You will master both Flutter (Dart) and React Native (JavaScript/TypeScript), giving you the flexibility to work on any mobile project.",
    learningObjectives: [
      "Master Dart programming and Flutter framework fundamentals.",
      "Build complex UIs with Flutter widgets and animations.",
      "Master React Native components and native module integration.",
      "Implement state management using Provider, Riverpod, or Redux.",
      "Integrate REST APIs, Firebase, and local databases.",
      "Deploy apps to Apple App Store and Google Play Store."
    ],
    whoIsItFor: [
      "Web developers wanting to move into mobile apps.",
      "Aspiring app entrepreneurs.",
      "Students interested in cross-platform development.",
      "Software engineers looking to diversify their skillset."
    ],
    prerequisites: [
      "Basic knowledge of JavaScript or any OOP language.",
      "A laptop with at least 8GB RAM (16GB recommended for emulators).",
      "Access to a macOS machine is required for iOS-specific builds (optional)."
    ],
    tools: ["Flutter", "Dart", "React Native", "JavaScript", "TypeScript", "Firebase", "Xcode", "Android Studio"],
    syllabus: [
      {
        module: "Module 1: Flutter & Dart Foundations",
        duration: "6 Weeks",
        topics: [
          "Dart Programming: Syntax, Collections, and Async",
          "Flutter UI: Stateless vs Stateful Widgets",
          "Layouts, Themes, and Custom Painters",
          "Navigation and Routing in Flutter"
        ]
      },
      {
        module: "Module 2: Advanced Flutter & Integration",
        duration: "4 Weeks",
        topics: [
          "State Management: Provider & Riverpod",
          "Firebase Integration: Auth, Firestore, and Storage",
          "Working with Native Device Features (Camera, GPS)",
          "Animations and Micro-interactions"
        ]
      },
      {
        module: "Module 3: React Native Mastery",
        duration: "6 Weeks",
        topics: [
          "React Native Architecture & Bridge",
          "Styling with Flexbox & Native Components",
          "React Navigation and Redux Toolkit",
          "Native Modules & Third-party Libraries"
        ]
      },
      {
        module: "Module 4: Performance & Deployment",
        duration: "4 Weeks",
        topics: [
          "App Performance Optimization",
          "Unit & Integration Testing for Mobile",
          "CI/CD for Mobile with Codemagic",
          "Store Submission & App Store Optimization (ASO)"
        ]
      }
    ],
    projects: [
      {
        title: "Multi-vendor Food Delivery App",
        description: "A complete Flutter app with real-time tracking, payment gateway, and vendor dashboard."
      },
      {
        title: "Social Networking Platform",
        description: "A React Native app featuring real-time chat, image sharing, and user profiles using Firebase."
      },
      {
        title: "Personal Finance Tracker",
        description: "An offline-first app with complex data visualization and local database synchronization."
      }
    ],
    certification: {
      title: "Certified Mobile App Developer",
      details: "Industry-recognized certification covering both Flutter and React Native ecosystems."
    },
    instructor: {
      name: "Arun V.",
      role: "Lead Mobile Architect",
      bio: "Arun has built over 50+ apps for global clients. He is a contributor to several open-source mobile libraries and a regular speaker at Flutter conferences.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Inquire for the mobile dev roadmap.",
        "Attend a live demo of app building.",
        "Setup of development environment.",
        "Enrollment and batch selection."
      ],
      nextBatch: "Starts March 10, 2026"
    },
    faqs: [
      {
        question: "Flutter vs React Native - which is better?",
        answer: "Both have their strengths. Flutter offers better performance and UI consistency, while React Native is great for web developers. We teach both so you're prepared for any job."
      },
      {
        question: "Do I need a Mac to learn mobile development?",
        answer: "No, you can learn and build for Android on Windows/Linux. However, a Mac is required for building and testing iOS applications."
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth Hacking",
    slug: "digital-marketing-growth",
    category: "Marketing",
    level: "Beginner",
    duration: "12 Weeks",
    mode: "Online / Offline",
    price: "Request Fee Details",
    shortDescription: "Master the art of online brand building, SEO, and performance marketing to drive business growth.",
    longDescription: "In today's digital world, every business needs a strong online presence. This course covers everything from Search Engine Optimization (SEO) and Content Marketing to Paid Ads (SEM) and Social Media Strategy. You will learn how to use data to drive decisions and implement growth hacking techniques used by top startups.",
    learningObjectives: [
      "Master SEO (On-page, Off-page, and Technical).",
      "Run high-converting Google Ads and Meta Ads campaigns.",
      "Develop a comprehensive Content Marketing strategy.",
      "Understand Web Analytics using Google Analytics 4 (GA4).",
      "Implement Email Marketing and Marketing Automation.",
      "Learn Growth Hacking frameworks and A/B testing."
    ],
    whoIsItFor: [
      "Entrepreneurs wanting to grow their business.",
      "Marketing professionals looking to go digital.",
      "Students wanting a career in the creative/data space.",
      "Freelancers looking to offer marketing services."
    ],
    prerequisites: [
      "Basic understanding of social media platforms.",
      "Good communication skills.",
      "No technical background required."
    ],
    tools: ["Google Ads", "Meta Business Suite", "SEMrush", "Google Analytics 4", "Mailchimp", "Canva", "Hotjar"],
    syllabus: [
      {
        module: "Module 1: Marketing Foundations & SEO",
        duration: "3 Weeks",
        topics: [
          "Digital Marketing Landscape in 2026",
          "Keyword Research & Competitor Analysis",
          "On-page & Technical SEO Mastery",
          "Link Building & Content Strategy"
        ]
      },
      {
        module: "Module 2: Performance Marketing (Paid Ads)",
        duration: "3 Weeks",
        topics: [
          "Google Search & Display Ads",
          "Meta Ads: Facebook & Instagram Strategy",
          "LinkedIn & YouTube Advertising",
          "Budgeting & ROI Optimization"
        ]
      },
      {
        module: "Module 3: Social Media & Content",
        duration: "3 Weeks",
        topics: [
          "Social Media Branding & Engagement",
          "Video Marketing & Short-form Content",
          "Influencer Marketing Strategies",
          "Email Marketing Automation"
        ]
      },
      {
        module: "Module 4: Analytics & Growth Hacking",
        duration: "3 Weeks",
        topics: [
          "GA4 & Google Tag Manager (GTM)",
          "Conversion Rate Optimization (CRO)",
          "Growth Hacking Funnels (AARRR)",
          "Building a Digital Marketing Portfolio"
        ]
      }
    ],
    projects: [
      {
        title: "Live E-commerce Campaign",
        description: "Running a complete digital marketing campaign for a real/dummy brand with a focus on ROAS."
      },
      {
        title: "SEO Audit & Strategy",
        description: "Conducting a comprehensive SEO audit for a website and providing a 6-month growth plan."
      },
      {
        title: "Social Media Brand Identity",
        description: "Creating an end-to-end social media presence for a startup, including content calendars and ad copies."
      }
    ],
    certification: {
      title: "Digital Marketing & Growth Professional",
      details: "Certification verified through live campaign performance and strategic project review."
    },
    instructor: {
      name: "Meera R.",
      role: "Growth Strategist",
      bio: "Meera has managed over $2M in ad spend for international brands. She specializes in data-driven marketing and conversion optimization.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Free digital marketing assessment.",
        "Orientation on marketing tools.",
        "Final enrollment and batch selection."
      ],
      nextBatch: "Starts March 5, 2026"
    },
    faqs: [
      {
        question: "Do I need to know coding for digital marketing?",
        answer: "No, but basic knowledge of HTML/CSS is helpful for technical SEO and landing page optimization. We cover the basics you need."
      },
      {
        question: "Will I get practical experience with paid ads?",
        answer: "Yes, we use dummy accounts and small live budgets to show you how real campaigns are structured and optimized."
      }
    ]
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    slug: "data-analytics-bi",
    category: "Data Science",
    level: "Beginner to Intermediate",
    duration: "16 Weeks",
    mode: "Online / Offline",
    price: "Request Fee Details",
    shortDescription: "Learn to visualize data and build interactive dashboards to drive business decisions using SQL, Power BI, and Tableau.",
    longDescription: "Data is the new oil, but only if you know how to refine it. This course focuses on the practical side of data—cleaning it, analyzing it, and presenting it in a way that businesses can understand. You will master SQL for data extraction and industry-standard tools like Power BI and Tableau for visualization.",
    learningObjectives: [
      "Master Advanced SQL for data manipulation and analysis.",
      "Clean and transform messy data using Power Query.",
      "Build interactive and automated dashboards in Power BI.",
      "Create advanced visualizations and stories in Tableau.",
      "Perform exploratory data analysis using Excel and Python.",
      "Communicate data insights effectively to stakeholders."
    ],
    whoIsItFor: [
      "Business analysts and managers.",
      "Fresh graduates looking for data roles.",
      "Finance and operations professionals.",
      "Anyone who works with large amounts of data."
    ],
    prerequisites: [
      "Basic knowledge of Microsoft Excel.",
      "Logical thinking and problem-solving skills.",
      "No prior coding experience required."
    ],
    tools: ["SQL", "Power BI", "Tableau", "Excel", "Python", "Power Query", "Google Data Studio"],
    syllabus: [
      {
        module: "Module 1: SQL & Data Foundations",
        duration: "4 Weeks",
        topics: [
          "Relational Database Concepts",
          "SQL Joins, Subqueries, and Window Functions",
          "Data Cleaning & Preparation with SQL",
          "Introduction to Data Warehousing"
        ]
      },
      {
        module: "Module 2: Power BI Mastery",
        duration: "4 Weeks",
        topics: [
          "Data Modeling & DAX Formulas",
          "Building Interactive Reports",
          "Power BI Service & Gateways",
          "Advanced Visualizations in Power BI"
        ]
      },
      {
        module: "Module 3: Tableau & Storytelling",
        duration: "4 Weeks",
        topics: [
          "Tableau Fundamentals & Data Blending",
          "Calculated Fields & Parameters",
          "Mapping and Spatial Analysis",
          "Data Storytelling & Dashboard Design"
        ]
      },
      {
        module: "Module 4: Python for Analytics & Excel",
        duration: "4 Weeks",
        topics: [
          "Advanced Excel: Pivot Tables & VBA Basics",
          "Python for Data Cleaning (Pandas/NumPy)",
          "Statistical Analysis for Business",
          "Final Capstone: Business Intelligence Project"
        ]
      }
    ],
    projects: [
      {
        title: "Sales Performance Dashboard",
        description: "Creating a real-time sales tracking dashboard in Power BI for a retail chain."
      },
      {
        title: "Customer Churn Analysis",
        description: "Using SQL and Tableau to identify patterns in customer attrition for a telecom company."
      },
      {
        title: "Financial Forecasting Model",
        description: "Building a predictive dashboard in Excel and Python for budget planning."
      }
    ],
    certification: {
      title: "Certified Business Intelligence Professional",
      details: "Focuses on the ability to turn raw data into actionable business insights through visualization."
    },
    instructor: {
      name: "Sanjay T.",
      role: "Senior Data Analyst",
      bio: "Sanjay has over 8 years of experience in BI and has worked with global consulting firms. He is an expert in SQL and Power BI visualization.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Data logic assessment.",
        "Tool setup and orientation.",
        "Final enrollment."
      ],
      nextBatch: "Starts March 20, 2026"
    },
    faqs: [
      {
        question: "Is this course different from Data Science?",
        answer: "Yes, Data Analytics focuses on analyzing historical data to drive decisions, while Data Science often involves building predictive models using Machine Learning."
      },
      {
        question: "Do I need to be good at Math?",
        answer: "Basic statistics and comfort with numbers are important, but you don't need advanced calculus or linear algebra for Data Analytics."
      }
    ]
  },
  {
    id: "software-testing",
    title: "Software Testing & Quality Assurance (QA)",
    slug: "software-testing-qa",
    category: "Development",
    level: "Beginner",
    duration: "14 Weeks",
    mode: "Online / Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master both manual and automation testing to ensure software reliability and performance.",
    longDescription: "Quality is paramount in software development. This course covers the entire testing lifecycle, from manual test cases and bug tracking to automated testing using Selenium and Playwright. You will also learn about API testing, performance testing, and how QA fits into the DevOps pipeline.",
    learningObjectives: [
      "Understand Software Testing Life Cycle (STLC).",
      "Write effective test cases and defect reports.",
      "Master Automation Testing with Selenium and Java/Python.",
      "Perform API testing using Postman and RestAssured.",
      "Learn modern testing tools like Playwright and Cypress.",
      "Implement Performance and Load testing with JMeter."
    ],
    whoIsItFor: [
      "Aspiring QA engineers.",
      "Developers wanting to improve their testing skills.",
      "Freshers looking for a stable entry point into IT.",
      "Manual testers wanting to move into automation."
    ],
    prerequisites: [
      "Basic understanding of how software works.",
      "Logical thinking and attention to detail.",
      "No prior coding experience required for the manual module."
    ],
    tools: ["Selenium", "Playwright", "Postman", "JMeter", "Jira", "TestRail", "GitHub"],
    syllabus: [
      {
        module: "Module 1: Manual Testing Foundations",
        duration: "3 Weeks",
        topics: [
          "SDLC & STLC Methodologies",
          "Types of Testing: Functional, Regression, UAT",
          "Test Case Design Techniques",
          "Defect Management with Jira"
        ]
      },
      {
        module: "Module 2: Automation with Selenium",
        duration: "4 Weeks",
        topics: [
          "Java/Python for Testers",
          "Selenium WebDriver Basics",
          "Page Object Model (POM) Design",
          "TestNG & Maven Integration"
        ]
      },
      {
        module: "Module 3: API & Modern Testing",
        duration: "4 Weeks",
        topics: [
          "REST API Testing with Postman",
          "Automation with Playwright/Cypress",
          "Database Testing with SQL",
          "Mobile App Testing Basics"
        ]
      },
      {
        module: "Module 4: Performance & DevOps QA",
        duration: "3 Weeks",
        topics: [
          "Load Testing with Apache JMeter",
          "Security Testing Fundamentals",
          "Integrating Tests in CI/CD Pipelines",
          "Building a QA Portfolio"
        ]
      }
    ],
    projects: [
      {
        title: "E-commerce Automation Suite",
        description: "Building a complete automation framework for a large-scale e-commerce site."
      },
      {
        title: "API Test Automation Lab",
        description: "Automating 50+ API endpoints for a financial application using Postman and Newman."
      },
      {
        title: "Performance Load Test Report",
        description: "Conducting a stress test on a web application and providing a performance bottleneck report."
      }
    ],
    certification: {
      title: "Certified Quality Assurance Professional",
      details: "Comprehensive certification covering both manual and automated testing proficiencies."
    },
    instructor: {
      name: "Deepa N.",
      role: "QA Lead",
      bio: "Deepa has 12+ years of experience in QA and has led testing teams for major banking applications. She is an expert in test automation and process optimization.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "QA mindset assessment.",
        "Orientation on testing tools.",
        "Final enrollment."
      ],
      nextBatch: "Starts March 25, 2026"
    },
    faqs: [
      {
        question: "Is there a lot of coding in QA?",
        answer: "Manual testing requires no coding. Automation testing requires basic to intermediate coding, which we teach from scratch in this course."
      },
      {
        question: "Can I switch to development later?",
        answer: "Yes! Many successful developers started their careers in QA. It gives you a deep understanding of software quality and architecture."
      }
    ]
  },
  {
    id: "blockchain-dev",
    title: "Blockchain & Web3 Development",
    slug: "blockchain-web3-dev",
    category: "Development",
    level: "Advanced",
    duration: "22 Weeks",
    mode: "Online / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master smart contracts, decentralized apps (dApps), and blockchain architecture using Solidity and Ethereum.",
    longDescription: "The future of the internet is decentralized. This course takes you from the fundamentals of blockchain technology to building complex decentralized applications (dApps). You will master Solidity for smart contracts, learn how to interact with the Ethereum blockchain, and explore the world of NFTs, DeFi, and DAOs.",
    learningObjectives: [
      "Understand Blockchain architecture and consensus mechanisms.",
      "Master Solidity programming for Ethereum Smart Contracts.",
      "Build dApps using React and Ethers.js / Web3.js.",
      "Implement secure Smart Contract patterns and auditing.",
      "Explore Layer 2 solutions and multi-chain development.",
      "Deploy and manage decentralized storage with IPFS."
    ],
    whoIsItFor: [
      "Developers wanting to move into Web3.",
      "Tech entrepreneurs interested in decentralized solutions.",
      "Software architects exploring blockchain integration.",
      "Crypto enthusiasts with a coding background."
    ],
    prerequisites: [
      "Strong foundation in JavaScript and Web Development.",
      "Understanding of basic cryptography is a plus.",
      "Laptop with at least 16GB RAM recommended."
    ],
    tools: ["Solidity", "Ethereum", "Hardhat", "Truffle", "Ethers.js", "Metamask", "IPFS", "Alchemy"],
    syllabus: [
      {
        module: "Module 1: Blockchain Fundamentals",
        duration: "4 Weeks",
        topics: [
          "History of Decentralization & Bitcoin",
          "Cryptography: Hashing, Digital Signatures, PKI",
          "Consensus: PoW, PoS, and Beyond",
          "Ethereum Virtual Machine (EVM) Basics"
        ]
      },
      {
        module: "Module 2: Smart Contract Mastery",
        duration: "6 Weeks",
        topics: [
          "Solidity Syntax & Data Types",
          "Smart Contract Security & Best Practices",
          "ERC-20 & ERC-721 (NFT) Standards",
          "Upgradable Contracts & Proxies"
        ]
      },
      {
        module: "Module 3: Web3 Frontend & Integration",
        duration: "6 Weeks",
        topics: [
          "Connecting React to Blockchain with Ethers.js",
          "Wallet Integration (Metamask/WalletConnect)",
          "Indexing Blockchain Data with The Graph",
          "Decentralized Storage (IPFS/Arweave)"
        ]
      },
      {
        module: "Module 4: Advanced Web3 & DeFi",
        duration: "6 Weeks",
        topics: [
          "Introduction to DeFi Protocols (Uniswap/Aave)",
          "Layer 2 Scaling (Polygon/Arbitrum)",
          "DAO Governance & Tokenomics",
          "Final Project: End-to-End dApp Deployment"
        ]
      }
    ],
    projects: [
      {
        title: "Decentralized NFT Marketplace",
        description: "Building a full-featured marketplace for minting, buying, and selling NFTs."
      },
      {
        title: "DeFi Lending Protocol",
        description: "Creating a simplified lending and borrowing platform with interest rate logic."
      },
      {
        title: "DAO Governance System",
        description: "Developing a decentralized autonomous organization for community voting and treasury management."
      }
    ],
    certification: {
      title: "Certified Web3 Developer",
      details: "Advanced certification focused on smart contract security and full-stack decentralized application development."
    },
    instructor: {
      name: "Vikram A.",
      role: "Blockchain Architect",
      bio: "Vikram is a pioneer in the Indian Web3 space and has audited several high-profile smart contracts. He is a regular contributor to Ethereum improvement proposals.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Technical screening on JS/Web fundamentals.",
        "Blockchain concepts interview.",
        "Final enrollment."
      ],
      nextBatch: "Starts April 1, 2026"
    },
    faqs: [
      {
        question: "Do I need to be a crypto expert to join?",
        answer: "No, but you should have a strong interest in decentralized technologies. We teach you the technical implementation from the ground up."
      },
      {
        question: "Is Solidity the only language for blockchain?",
        answer: "Solidity is the most popular for Ethereum, but we also touch upon the concepts used in other languages like Rust (for Solana) and Go."
      }
    ]
  },
  {
    id: "generative-ai",
    title: "Generative AI & Prompt Engineering",
    slug: "generative-ai-prompt-engineering",
    category: "Data Science",
    level: "Beginner to Advanced",
    duration: "10 Weeks",
    mode: "Online / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master the power of LLMs like GPT-4 and build AI-powered applications using LangChain and Python.",
    longDescription: "Generative AI is transforming how we work. This course teaches you how to move beyond just using ChatGPT to building your own AI applications. You will learn advanced prompt engineering, how to use APIs from OpenAI and Anthropic, and how to build complex AI agents using frameworks like LangChain.",
    learningObjectives: [
      "Master Advanced Prompt Engineering techniques.",
      "Build AI applications using OpenAI and Hugging Face APIs.",
      "Implement Retrieval-Augmented Generation (RAG) with vector databases.",
      "Develop autonomous AI agents using LangChain and AutoGPT.",
      "Learn to fine-tune Large Language Models (LLMs).",
      "Understand AI ethics, safety, and governance."
    ],
    whoIsItFor: [
      "Developers wanting to integrate AI into their apps.",
      "Product managers building AI-first products.",
      "Content creators and marketers looking to automate workflows.",
      "Anyone wanting to stay ahead in the AI revolution."
    ],
    prerequisites: [
      "Basic Python programming knowledge.",
      "Familiarity with web APIs.",
      "An active OpenAI API account (guidance provided)."
    ],
    tools: ["OpenAI API", "LangChain", "Pinecone", "Hugging Face", "Python", "Streamlit", "AutoGPT"],
    syllabus: [
      {
        module: "Module 1: Prompt Engineering Mastery",
        duration: "2 Weeks",
        topics: [
          "Zero-shot, Few-shot, and Chain-of-Thought Prompting",
          "Prompt Templates & Versioning",
          "Reducing Hallucinations & Bias",
          "AI for Content Generation & Summarization"
        ]
      },
      {
        module: "Module 2: Building with LLM APIs",
        duration: "3 Weeks",
        topics: [
          "OpenAI API: Chat, Image, and Audio",
          "Building Chatbots with Streamlit",
          "Working with Open-source Models (Llama 3)",
          "Token Management & Cost Optimization"
        ]
      },
      {
        module: "Module 3: LangChain & RAG",
        duration: "3 Weeks",
        topics: [
          "LangChain Fundamentals: Chains, Memory, and Agents",
          "Vector Databases: Pinecone & ChromaDB",
          "Implementing RAG on Custom Documents",
          "Evaluation Frameworks for AI Apps"
        ]
      },
      {
        module: "Module 4: Advanced AI Agents & Fine-tuning",
        duration: "2 Weeks",
        topics: [
          "Building Autonomous Agents",
          "Fine-tuning LLMs on Custom Datasets",
          "AI Ethics & Deployment Best Practices",
          "Final Project: AI-powered SaaS Application"
        ]
      }
    ],
    projects: [
      {
        title: "Enterprise AI Knowledge Base",
        description: "A RAG-based system that allows employees to query internal company documents using natural language."
      },
      {
        title: "Autonomous Research Agent",
        description: "An AI agent that can browse the web, summarize findings, and write a comprehensive report."
      },
      {
        title: "AI-powered Code Assistant",
        description: "Building a custom VS Code extension that helps developers write and debug code using a specific internal framework."
      }
    ],
    certification: {
      title: "Generative AI Specialist",
      details: "Certification focused on the practical application of LLMs and the development of AI-driven software solutions."
    },
    instructor: {
      name: "Nikhil S.",
      role: "AI Research Engineer",
      bio: "Nikhil is a specialist in LLMs and has built several AI products for startups. He is passionate about the intersection of AI and software engineering.",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "AI aptitude assessment.",
        "Python proficiency check.",
        "Final enrollment."
      ],
      nextBatch: "Starts April 10, 2026"
    },
    faqs: [
      {
        question: "Is this course only for developers?",
        answer: "The first module on Prompt Engineering is suitable for everyone. The later modules require Python knowledge to build actual applications."
      },
      {
        question: "Will I need to pay for API usage?",
        answer: "We provide some initial credits for practice, but for large-scale projects, you might need a small budget for API calls (OpenAI/Pinecone)."
      }
    ]
  },
  {
    id: "iot-embedded",
    title: "IoT & Embedded Systems Engineering",
    slug: "iot-embedded-systems",
    category: "Hardware",
    level: "Intermediate",
    duration: "18 Weeks",
    mode: "Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Build smart, connected devices by mastering microcontrollers, sensors, and IoT cloud platforms.",
    longDescription: "The physical and digital worlds are merging through IoT. This course teaches you how to design and build smart systems from the ground up. You will learn C/C++ for embedded programming, work with Arduino and ESP32 microcontrollers, and connect your devices to the cloud for remote monitoring and control.",
    learningObjectives: [
      "Master Embedded C/C++ programming fundamentals.",
      "Work with microcontrollers (Arduino, ESP32, Raspberry Pi).",
      "Interface various sensors and actuators.",
      "Master IoT protocols: MQTT, HTTP, and LoRaWAN.",
      "Connect devices to IoT clouds (AWS IoT, Adafruit IO).",
      "Design and prototype basic PCBs."
    ],
    whoIsItFor: [
      "Electronics and Electrical engineering students.",
      "Hardware enthusiasts and makers.",
      "Software developers wanting to work with hardware.",
      "Professionals in industrial automation."
    ],
    prerequisites: [
      "Basic understanding of electronics (Voltage, Current, Resistance).",
      "Logical thinking and interest in hardware.",
      "A basic IoT starter kit (guidance on purchasing provided)."
    ],
    tools: ["Arduino IDE", "ESP32", "Raspberry Pi", "PlatformIO", "MQTT", "AWS IoT Core", "KiCad"],
    syllabus: [
      {
        module: "Module 1: Embedded C & Microcontrollers",
        duration: "4 Weeks",
        topics: [
          "C/C++ for Embedded Systems",
          "Arduino Architecture & Programming",
          "GPIO, ADC, PWM, and Timers",
          "Serial Communication: UART, I2C, SPI"
        ]
      },
      {
        module: "Module 2: Sensors & Actuators",
        duration: "4 Weeks",
        topics: [
          "Interfacing Digital & Analog Sensors",
          "Motor Control: DC, Servo, and Stepper",
          "Display Interfacing (OLED/LCD)",
          "Power Management for Portable Devices"
        ]
      },
      {
        module: "Module 3: Wireless & IoT Connectivity",
        duration: "5 Weeks",
        topics: [
          "ESP32: Wi-Fi & Bluetooth (BLE) Programming",
          "Introduction to MQTT & Pub/Sub Model",
          "Building a Local Web Server on ESP32",
          "Introduction to LoRa & Long-range IoT"
        ]
      },
      {
        module: "Module 4: IoT Cloud & Edge Computing",
        duration: "5 Weeks",
        topics: [
          "Connecting to AWS IoT Core & Azure IoT Hub",
          "Data Visualization with Grafana & InfluxDB",
          "Edge AI: Running ML models on Microcontrollers",
          "Final Project: Smart Home/Industrial System"
        ]
      }
    ],
    projects: [
      {
        title: "Smart Agriculture System",
        description: "A solar-powered device that monitors soil moisture, temperature, and automates irrigation via cloud."
      },
      {
        title: "IoT Health Monitor",
        description: "A wearable device that tracks vitals and sends real-time alerts to a mobile app in case of emergencies."
      },
      {
        title: "Home Automation Gateway",
        description: "A centralized hub to control lights, fans, and security cameras using voice commands or a web dashboard."
      }
    ],
    certification: {
      title: "Certified IoT & Embedded Systems Engineer",
      details: "Hardware-focused certification verified through successful prototyping and cloud integration of three IoT systems."
    },
    instructor: {
      name: "Ramesh P.",
      role: "Embedded Systems Expert",
      bio: "Ramesh has designed industrial automation systems for over 15 years. He is an expert in low-power wireless communication and PCB design.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Electronics basics screening.",
        "Project idea discussion.",
        "Final enrollment and kit distribution."
      ],
      nextBatch: "Starts April 15, 2026"
    },
    faqs: [
      {
        question: "Do I need to buy hardware separately?",
        answer: "Yes, we provide a recommended list of components (approx. ₹3000-₹5000) that you'll need for the hands-on projects. We can also help you purchase them."
      },
      {
        question: "Is this course suitable for IT professionals?",
        answer: "Absolutely! The IoT field needs people who can bridge the gap between software and hardware. Your coding skills will be a huge advantage."
      }
    ]
  },
  {
    id: "backend-go",
    title: "Backend Development with Go & Microservices",
    slug: "backend-development-go",
    category: "Development",
    level: "Intermediate to Advanced",
    duration: "16 Weeks",
    mode: "Online / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Master high-performance backend systems and cloud-native microservices using the Go (Golang) programming language.",
    longDescription: "Go is the language of the cloud. This course is designed for developers who want to build incredibly fast, concurrent, and scalable backend systems. You will learn the Go programming language, explore microservices architecture, and master tools like gRPC, Docker, and Kubernetes for modern backend engineering.",
    learningObjectives: [
      "Master Go syntax, concurrency (Goroutines), and error handling.",
      "Build high-performance RESTful APIs and gRPC services.",
      "Implement microservices architecture and service discovery.",
      "Master SQL (Postgres) and NoSQL integration with Go.",
      "Implement secure authentication and rate limiting.",
      "Deploy Go applications using Docker and Kubernetes."
    ],
    whoIsItFor: [
      "Software engineers wanting to learn a high-performance language.",
      "Backend developers moving from Python/Node to Go.",
      "System architects building cloud-native systems.",
      "Students interested in scalable backend engineering."
    ],
    prerequisites: [
      "Solid understanding of at least one backend language (Node/Python/Java).",
      "Basic understanding of SQL and REST APIs.",
      "Laptop with at least 8GB RAM."
    ],
    tools: ["Go (Golang)", "PostgreSQL", "Redis", "gRPC", "Docker", "Kubernetes", "Prometheus", "Kafka"],
    syllabus: [
      {
        module: "Module 1: Go Language Mastery",
        duration: "4 Weeks",
        topics: [
          "Go Fundamentals: Types, Structs, and Interfaces",
          "Concurrency in Go: Goroutines & Channels",
          "Advanced Go: Context, Reflection, and Testing",
          "Building your first CLI tool in Go"
        ]
      },
      {
        module: "Module 2: High-Performance APIs",
        duration: "4 Weeks",
        topics: [
          "Building REST APIs with Gin/Fiber",
          "Working with PostgreSQL using GORM & SQLX",
          "Caching strategies with Redis",
          "Middleware, Logging, and Error Management"
        ]
      },
      {
        module: "Module 3: Microservices & gRPC",
        duration: "4 Weeks",
        topics: [
          "Microservices Architecture Principles",
          "High-performance communication with gRPC & Protobuf",
          "Event-driven systems with Kafka/RabbitMQ",
          "Distributed Tracing & Monitoring"
        ]
      },
      {
        module: "Module 4: Cloud-Native Deployment",
        duration: "4 Weeks",
        topics: [
          "Containerizing Go apps with multi-stage builds",
          "Deploying to Kubernetes with Helm",
          "CI/CD for Go with GitHub Actions",
          "Final Project: Scalable Microservices System"
        ]
      }
    ],
    projects: [
      {
        title: "High-Throughput Messaging Engine",
        description: "A real-time notification system capable of handling millions of concurrent connections using Go and WebSockets."
      },
      {
        title: "Distributed Task Scheduler",
        description: "A system to schedule and execute background tasks across multiple worker nodes with fault tolerance."
      },
      {
        title: "E-commerce Microservices Suite",
        description: "A modular backend featuring separate services for Auth, Catalog, and Orders communicating via gRPC."
      }
    ],
    certification: {
      title: "Certified Go Backend Architect",
      details: "Certification focused on concurrency, performance optimization, and microservices design patterns in Go."
    },
    instructor: {
      name: "Senthil K.",
      role: "Principal Backend Engineer",
      bio: "Senthil has built core infrastructure for several high-growth startups using Go. He is an expert in distributed systems and cloud-native architecture.",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Backend logic assessment.",
        "Go fundamentals interview.",
        "Final enrollment."
      ],
      nextBatch: "Starts April 20, 2026"
    },
    faqs: [
      {
        question: "Why should I learn Go instead of Node.js?",
        answer: "Go offers superior performance, easier concurrency management, and better type safety, making it ideal for high-scale cloud infrastructure."
      },
      {
        question: "Is Go difficult to learn for beginners?",
        answer: "Go has a very simple syntax and few keywords, making it easy to learn the basics. Mastering its concurrency model and best practices takes time."
      }
    ]
  },
  {
    id: "game-dev",
    title: "Game Development with Unity & C#",
    slug: "game-development-unity",
    category: "Development",
    level: "Beginner to Intermediate",
    duration: "24 Weeks",
    mode: "Online / Offline / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Learn to build immersive 2D and 3D games for PC, Mobile, and Web using the Unity game engine and C#.",
    longDescription: "Turn your passion for gaming into a career. This course takes you from the basics of C# programming to building complete, publishable games. You will master the Unity editor, learn game physics, AI, and graphics, and build a portfolio of diverse games to showcase your skills.",
    learningObjectives: [
      "Master C# programming for Game Development.",
      "Understand Unity Editor and 2D/3D Game Engine concepts.",
      "Implement game physics, collisions, and animations.",
      "Build complex Game AI and Pathfinding systems.",
      "Master UI design and sound integration for games.",
      "Publish games to PC, Web, and Mobile platforms."
    ],
    whoIsItFor: [
      "Aspiring game developers and designers.",
      "Creative coders and hobbyists.",
      "Students wanting a career in the gaming industry.",
      "Software engineers looking for a creative outlet."
    ],
    prerequisites: [
      "Basic understanding of programming logic.",
      "A laptop with a dedicated graphics card (recommended for 3D).",
      "Passion for games and creative problem solving."
    ],
    tools: ["Unity 3D", "C#", "Visual Studio", "Blender (Basics)", "GitHub", "Photoshop (Basics)"],
    syllabus: [
      {
        module: "Module 1: C# & 2D Game Basics",
        duration: "6 Weeks",
        topics: [
          "C# for Unity: Variables, Loops, and Classes",
          "Unity Interface & 2D Sprites",
          "Physics 2D: Colliders & Rigidbodies",
          "Building a simple 2D Platformer"
        ]
      },
      {
        module: "Module 2: 3D Game Foundations",
        duration: "6 Weeks",
        topics: [
          "3D Math & Vector Geometry",
          "Lighting, Materials, and Shaders",
          "3D Animation & Animator Controllers",
          "Building a 3D First-Person Explorer"
        ]
      },
      {
        module: "Module 3: Advanced Game Systems",
        duration: "6 Weeks",
        topics: [
          "Game AI & NavMesh Pathfinding",
          "Inventory & Quest Systems",
          "Sound Design & Visual Effects (VFX)",
          "Data Persistence & Saving Games"
        ]
      },
      {
        module: "Module 4: Optimization & Publishing",
        duration: "6 Weeks",
        topics: [
          "Game Optimization: Draw Calls & Memory",
          "Building for Mobile: Touch Controls & Ads",
          "Multiplayer Basics with Mirror/NGO",
          "Final Project: A Complete Publishable Game"
        ]
      }
    ],
    projects: [
      {
        title: "2D Metroidvania Adventure",
        description: "A complex 2D side-scroller with character abilities, enemy AI, and a large interconnected world."
      },
      {
        title: "3D Multiplayer Racing Game",
        description: "A high-speed racing game featuring realistic physics, multiple tracks, and local multiplayer."
      },
      {
        title: "VR Escape Room Experience",
        description: "An immersive VR puzzle game designed for Oculus/Meta Quest using Unity's XR Toolkit."
      }
    ],
    certification: {
      title: "Certified Game Developer",
      details: "Certification focused on technical proficiency in C# and the ability to build and optimize games in Unity."
    },
    instructor: {
      name: "Rahul M.",
      role: "Senior Game Developer",
      bio: "Rahul has worked on several indie titles and has experience in mobile game publishing. He is passionate about game design and immersive storytelling.",
      avatar: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Game design logic assessment.",
        "C# proficiency check.",
        "Final enrollment."
      ],
      nextBatch: "Starts May 1, 2026"
    },
    faqs: [
      {
        question: "Do I need to be an artist to build games?",
        answer: "No, while art is important, our course focuses on the development and programming side. We show you how to use free assets and basic tools to build your games."
      },
      {
        question: "Will I learn how to make money from games?",
        answer: "Yes, we cover basic game monetization strategies like ads and in-app purchases, especially for mobile platforms."
      }
    ]
  },
  {
    id: "ar-vr-metaverse",
    title: "AR/VR Development & Metaverse",
    slug: "ar-vr-metaverse-dev",
    category: "Development",
    level: "Intermediate",
    duration: "20 Weeks",
    mode: "Online / Hybrid",
    price: "Request Fee Details",
    shortDescription: "Build immersive augmented and virtual reality experiences for the next generation of the internet.",
    longDescription: "The Metaverse is the next frontier of digital interaction. This course teaches you how to create immersive AR and VR applications using Unity, Unreal Engine, and WebXR. You will learn about spatial computing, 3D modeling for XR, and how to build interactive environments that bridge the physical and digital worlds.",
    learningObjectives: [
      "Master AR development using ARKit (iOS) and ARCore (Android).",
      "Build VR experiences for Meta Quest and HTC Vive.",
      "Understand Spatial Computing and 3D Interaction Design.",
      "Master WebXR for browser-based immersive experiences.",
      "Learn 3D asset optimization for real-time XR performance.",
      "Explore Metaverse architectures and social VR integration."
    ],
    whoIsItFor: [
      "Game developers wanting to specialize in XR.",
      "Architects and designers interested in spatial visualization.",
      "Tech innovators building for the Metaverse.",
      "Creative technologists and researchers."
    ],
    prerequisites: [
      "Basic knowledge of Unity or any 3D engine.",
      "Familiarity with C# or C++.",
      "A VR-ready PC and a VR headset (recommended for testing)."
    ],
    tools: ["Unity", "ARKit", "ARCore", "WebXR", "Blender", "Unreal Engine 5", "Oculus SDK"],
    syllabus: [
      {
        module: "Module 1: AR Foundations",
        duration: "5 Weeks",
        topics: [
          "Introduction to Augmented Reality & Computer Vision",
          "Building AR apps with Unity & AR Foundation",
          "Image Tracking & Plane Detection",
          "AR Interaction Design & UX Best Practices"
        ]
      },
      {
        module: "Module 2: VR & Immersive Environments",
        duration: "5 Weeks",
        topics: [
          "VR Hardware & Tracking Systems",
          "Designing Immersive 3D Environments",
          "Physics & Interactions in VR (XR Interaction Toolkit)",
          "Building a VR Escape Room"
        ]
      },
      {
        module: "Module 3: WebXR & Cross-platform XR",
        duration: "5 Weeks",
        topics: [
          "Browser-based XR with A-Frame & Three.js",
          "Cross-platform development with Unity",
          "Optimizing 3D Assets for Mobile & Web",
          "Spatial Audio & Immersive Soundscapes"
        ]
      },
      {
        module: "Module 4: The Metaverse & Advanced XR",
        duration: "5 Weeks",
        topics: [
          "Metaverse Concepts: Avatars, Persistence, & Economy",
          "Social VR & Multiplayer XR integration",
          "Hand Tracking & Haptic Feedback",
          "Final Project: A Multi-user Metaverse Space"
        ]
      }
    ],
    projects: [
      {
        title: "AR Furniture Visualizer",
        description: "An app that allows users to place and preview 3D furniture models in their real-world space with realistic lighting."
      },
      {
        title: "VR Training Simulation",
        description: "A virtual reality simulation for hazardous industrial training, focusing on safety procedures and tool handling."
      },
      {
        title: "Web-based Virtual Art Gallery",
        description: "A cross-platform WebXR experience that allows users to walk through a 3D art gallery from any device browser."
      }
    ],
    certification: {
      title: "Certified XR & Metaverse Developer",
      details: "Specialized certification focused on spatial computing, AR/VR interaction design, and multi-user immersive systems."
    },
    instructor: {
      name: "Abhishek G.",
      role: "XR Lead Architect",
      bio: "Abhishek is a pioneer in the Indian AR/VR space with over 10 years of experience building immersive solutions for global brands. He is an expert in spatial computing and real-time 3D.",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "XR logic and spatial awareness assessment.",
        "3D engine fundamentals check.",
        "Final enrollment and hardware guidance."
      ],
      nextBatch: "Starts May 15, 2026"
    },
    faqs: [
      {
        question: "Do I need an expensive VR headset to learn?",
        answer: "While a headset like Meta Quest is recommended for the best experience, we show you how to use simulators and mobile-based AR to learn the core concepts."
      },
      {
        question: "Is AR/VR only for games?",
        answer: "Not at all! AR/VR is being used in healthcare, education, real estate, manufacturing, and remote collaboration. The job market is huge outside of gaming."
      }
    ]
  },
  {
    id: "product-management",
    title: "Product Management for Tech Startups",
    slug: "product-management-startups",
    category: "Business",
    level: "Beginner to Intermediate",
    duration: "12 Weeks",
    mode: "Online / Offline",
    price: "Request Fee Details",
    shortDescription: "Learn to build, launch, and scale successful tech products by mastering product strategy, UX, and data analytics.",
    longDescription: "Product Managers are the CEOs of their products. This course teaches you the end-to-end product lifecycle, from identifying customer pain points and defining product vision to managing development sprints and analyzing post-launch metrics. You will learn the frameworks used by PMs at top tech companies like Google, Meta, and Netflix.",
    learningObjectives: [
      "Define Product Vision, Strategy, and Roadmaps.",
      "Conduct User Research and Market Analysis.",
      "Master Agile Methodologies and Scrum frameworks.",
      "Learn to write PRDs (Product Requirement Documents).",
      "Understand Product Analytics and A/B Testing.",
      "Master Stakeholder Management and Communication."
    ],
    whoIsItFor: [
      "Aspiring Product Managers.",
      "Engineers looking to transition into business roles.",
      "Designers wanting to understand the bigger product picture.",
      "Entrepreneurs building their own tech startups."
    ],
    prerequisites: [
      "Basic understanding of the tech industry.",
      "Strong analytical and communication skills.",
      "No technical background required, but helpful."
    ],
    tools: ["Jira", "Mixpanel", "Amplitude", "Figma (Basics)", "Notion", "Trello", "Google Analytics"],
    syllabus: [
      {
        module: "Module 1: Product Strategy & Discovery",
        duration: "3 Weeks",
        topics: [
          "The Role of a PM in Startups vs Big Tech",
          "Problem Identification & User Pain Points",
          "Market Research & Competitor Analysis",
          "Defining the MVP (Minimum Viable Product)"
        ]
      },
      {
        module: "Module 2: Product Design & Execution",
        duration: "3 Weeks",
        topics: [
          "UX Fundamentals for PMs",
          "Wireframing & Prototyping Basics",
          "Writing Effective PRDs & User Stories",
          "Prioritization Frameworks (RICE, MoSCoW)"
        ]
      },
      {
        module: "Module 3: Agile & Development Management",
        duration: "3 Weeks",
        topics: [
          "Agile, Scrum, and Kanban Methodologies",
          "Working with Engineering & Design Teams",
          "Managing Product Backlogs & Sprints",
          "Release Management & Launch Planning"
        ]
      },
      {
        module: "Module 4: Growth, Analytics & Career",
        duration: "3 Weeks",
        topics: [
          "Product Analytics: Tracking the right KPIs",
          "A/B Testing & Data-driven Decisions",
          "Product Marketing & GTM (Go-to-Market) Strategy",
          "Building a PM Portfolio & Interview Prep"
        ]
      }
    ],
    projects: [
      {
        title: "Product teardown & Redesign",
        description: "Identifying flaws in a popular app and proposing a data-driven feature improvement with a full PRD."
      },
      {
        title: "New Product Launch Plan",
        description: "Creating an end-to-end launch strategy for a new startup idea, including roadmap and GTM plan."
      },
      {
        title: "Analytics Audit",
        description: "Analyzing user behavior data for a mock product and identifying growth opportunities."
      }
    ],
    certification: {
      title: "Certified Product Management Professional",
      details: "Case-study based certification focusing on product strategy, agile execution, and data-driven decision making."
    },
    instructor: {
      name: "Sneha P.",
      role: "Director of Product",
      bio: "Sneha has over 12 years of experience leading product teams at top-tier unicorns. She is an expert in growth product management and zero-to-one product building.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    enrollment: {
      steps: [
        "Product thinking assessment.",
        "Resume and background review.",
        "Final enrollment."
      ],
      nextBatch: "Starts June 1, 2026"
    },
    faqs: [
      {
        question: "Do I need to know how to code to be a PM?",
        answer: "No, but you need to be 'tech-literate'. You should understand how software is built to communicate effectively with engineering teams."
      },
      {
        question: "Is this course suitable for freshers?",
        answer: "Yes, we cover the foundations for entry-level Associate Product Manager (APM) roles, as well as advanced strategies for those with experience."
      }
    ]
  }
];
