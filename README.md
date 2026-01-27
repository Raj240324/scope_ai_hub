# AiTechHub 🚀

A modern, high-performance React-based website for a startup software training institute in Tamil Nadu. This project is built with a focus on skill-driven education, transparency, and production-grade architecture.

## ✨ Key Features

- **🚀 High Performance**: Built with Vite and React for lightning-fast load times.
- **📱 Fully Responsive**: Mobile-first design using Tailwind CSS v4.
- **🔍 SEO Optimized**: Dynamic meta tags and titles for every page using `react-helmet-async`.
- **🛠 Robust Architecture**: 
  - **Lazy Loading**: Code-splitting for optimized bundle sizes.
  - **Error Boundaries**: Graceful error handling to prevent full-page crashes.
  - **Scroll Management**: Automatic scroll-to-top on route changes.
- **✨ Smooth Animations**: Professional transitions and reveal effects using `framer-motion`.
- **💎 Premium UI**: 
  - Modern, clean aesthetic with a focus on readability.
  - Interactive course filtering and search.
  - Collapsible FAQ sections.
  - Verified student reviews system.
- **📄 Legal Compliance**: Comprehensive Privacy Policy and Terms & Conditions pages.
- **📩 Lead Generation**: Validated contact form ready for EmailJS integration.

## 🛠 Tech Stack

- **Frontend**: React.js (Hooks, Context API)
- **Styling**: Tailwind CSS v4 (Modern, CSS-first configuration)
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **SEO**: React Helmet Async
- **Build Tool**: Vite

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/       # Layout, Header, Footer, ErrorBoundary
│   ├── ui/           # Reusable UI components (CourseCard, ContactForm)
│   └── utils/        # Utility components (ScrollToTop)
├── data/             # Centralized data (Courses, Reviews)
├── pages/            # Page components
│   ├── courses/      # Course-related pages
│   ├── legal/        # Legal compliance pages
│   └── ...           # Core pages (Home, About, Contact, etc.)
└── App.jsx           # Main application logic and routing
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up EmailJS (Optional)**:
   - Create an account at [EmailJS](https://www.emailjs.com/).
   - Replace the placeholders in `src/components/ui/ContactForm.jsx` with your `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY`.

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 License

This project is licensed under the MIT License.

---
Built with ❤️ for AiTechHub.
