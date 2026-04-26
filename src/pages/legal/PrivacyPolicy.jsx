import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO 
        title={`Privacy Policy | ${BRANDING.fullName}`} 
        description="Our commitment to protecting your personal data and privacy at Scope AI Hub." 
        canonical="/privacy-policy"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
      />
      <Hero 
        title={<>Privacy <span className="text-primary">Policy</span></>}
        subtitle="Last Updated: April 26, 2026"
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="heading-md mb-4">1. Introduction</h2>
            <p className="text-[var(--text-muted)] mb-4">
              Welcome to {BRANDING.fullName}. We are committed to protecting your personal data and ensuring transparency in how we handle it. This Privacy Policy details the types of information we collect when you enroll in our career guidance programs, visit our campus, or use our digital platforms.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              While {BRANDING.fullName} is headquartered in Chennai, India, our website is accessible globally. We strive to handle personal data in accordance with applicable Indian data protection laws, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023. For visitors from other jurisdictions, we endeavor to follow internationally recognized data protection principles.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">2. Information Collection</h2>
            <p className="text-[var(--text-muted)] mb-4">We collect data necessary to provide educational and placement services:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Personal Identity:</strong> Name, Date of Birth, and Government ID (for certification).</li>
              <li><strong>Contact Details:</strong> Phone Number, Email Address, and Residential Address.</li>
              <li><strong>Academic Records:</strong> Educational qualifications, mark sheets, and portfolio projects.</li>
              <li><strong>Attendance & Performance:</strong> Daily attendance logs, assessment scores, and project submissions.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">3. Website Data Collection</h2>
            <p className="text-[var(--text-muted)] mb-4">
              When you visit our website or interact with our online services, we may automatically collect additional technical information:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>IP Address:</strong> Your IP address is recorded when you submit enquiry or application forms. This is used for security purposes, including rate limiting and fraud prevention.</li>
              <li><strong>Device & Browser Information:</strong> We collect user-agent strings (browser type, operating system) to ensure compatibility and for security monitoring.</li>
              <li><strong>reCAPTCHA Interaction Data:</strong> Our forms use Google reCAPTCHA v2, which may collect browser interaction data and cookies to distinguish legitimate users from bots. This data is processed by Google in accordance with their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.</li>
              <li><strong>Live Chat Data:</strong> If you use our Tawk.to live chat widget, your chat messages, browser information, and interaction data may be collected and processed by Tawk.to in accordance with their privacy policy.</li>
              <li><strong>Error Monitoring:</strong> We use Sentry for error monitoring to improve website reliability. Sentry may collect error traces and browser information; however, all personally identifiable information (PII) is scrubbed before transmission.</li>
              <li><strong>Font Delivery:</strong> Our website loads fonts from Google Fonts, which may result in your IP address being transmitted to Google servers.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">4. Utilization of Data</h2>
            <p className="text-[var(--text-muted)] mb-4">Your information is strictly used for:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Academic Administration:</strong> Creating student profiles, tracking progress, and issuing course completion certificates.</li>
              <li><strong>Placement Services:</strong> We share your resume and technical portfolio with our hiring partners (MNCs and Startups) for recruitment purposes.</li>
              <li><strong>Communication:</strong> Sharing class schedules, holiday alerts, and workshop notifications via WhatsApp or Email.</li>
              <li><strong>Certification:</strong> Submitting necessary internal evaluation data for the issuance of the Official {BRANDING.fullName} Certification.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">5. Automated Data Processing</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We use certain automated processes to ensure the security and integrity of our platform:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Bot Detection:</strong> Google reCAPTCHA v2 is used on all forms to distinguish legitimate submissions from automated spam. This involves automated analysis of your browser interaction.</li>
              <li><strong>Rate Limiting:</strong> We implement IP-based rate limiting on our servers to prevent abuse of our enquiry and application systems.</li>
              <li><strong>Automated Email Responses:</strong> Upon successful form submission, automated acknowledgement emails are sent via our email service provider (Brevo/Sendinblue). These are transactional emails only — we do not send unsolicited marketing communications.</li>
              <li><strong>Input Sanitization:</strong> All data submitted through our forms is automatically sanitized to prevent malicious content injection and to protect data integrity.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">6. Data Sharing & Third Parties</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We do not sell your personal data. However, we may share specific information with:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Hiring Partners:</strong> To facilitate interview scheduling and job offers.</li>
              <li><strong>Payment Gateways:</strong> For processing tuition fees securely (e.g., Razorpay, Stripe).</li>
              <li><strong>Legal Authorities:</strong> If required by law or to protect our rights and safety.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">7. International Data Transfers</h2>
            <p className="text-[var(--text-muted)] mb-4">
              To provide our services, your data may be processed by third-party service providers located outside of India. These transfers are necessary for the following services:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Brevo (Sendinblue):</strong> Our email service provider, which processes contact data on servers located in the European Union.</li>
              <li><strong>Google (reCAPTCHA & Fonts):</strong> Bot protection and font delivery services operated by Google, with data processed on servers in the United States.</li>
              <li><strong>Sentry:</strong> Our error monitoring service, which may process anonymized technical data on servers in the United States.</li>
              <li><strong>Supabase:</strong> Our database provider, which stores enquiry and application data on cloud infrastructure.</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4">
              We select service providers who maintain appropriate data protection standards. By using our website and submitting your information, you acknowledge that your data may be transferred to and processed in countries other than India.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">8. Cookies & Tracking Technologies</h2>
            <p className="text-[var(--text-muted)] mb-4">
              Our website uses cookies and similar technologies for security, functionality, and performance purposes. For detailed information about the specific cookies we use and how to control them, please refer to our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              In summary, we use the following categories of cookies and local storage:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Strictly Necessary:</strong> Google reCAPTCHA cookies for form security.</li>
              <li><strong>Functional:</strong> Local storage for theme preference (dark/light mode).</li>
              <li><strong>Performance:</strong> Sentry error monitoring for website reliability.</li>
              <li><strong>Third-Party:</strong> Tawk.to live chat widget cookies and Google Fonts delivery.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">9. Student Rights</h2>
            <p className="text-[var(--text-muted)] mb-4">
              As a student, you have the right to request access to your academic records, correct any inaccuracies in your profile, and request the deletion of your data post-completion (subject to retention required for official verification purposes).
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              Additionally, in accordance with applicable data protection laws, you may exercise the following rights by contacting us via email:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Right to Data Portability:</strong> Request a copy of your data in a commonly used, machine-readable format.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw it at any time by contacting our administrative office.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">10. Data Retention</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required by law:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Website Enquiries:</strong> Retained for up to 2 years from the date of submission.</li>
              <li><strong>Trainer Applications:</strong> Retained for up to 1 year from the date of submission.</li>
              <li><strong>Academic Records:</strong> Retained for 5 years after course completion for certification verification purposes.</li>
              <li><strong>Financial Records:</strong> Retained as required by applicable tax and accounting regulations.</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4">
              After the applicable retention period, personal data is securely deleted or anonymized.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">11. Data Security</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We implement a range of technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is encrypted using HTTPS with HTTP Strict Transport Security (HSTS).</li>
              <li><strong>Content Security Policy:</strong> We enforce a strict Content Security Policy (CSP) to prevent cross-site scripting and other code injection attacks.</li>
              <li><strong>Input Sanitization:</strong> All user-submitted data is sanitized server-side to prevent injection attacks and ensure data integrity.</li>
              <li><strong>PII Protection:</strong> Personally identifiable information is automatically scrubbed from error monitoring data before it is transmitted to third-party services.</li>
              <li><strong>Rate Limiting:</strong> Server-side rate limiting protects against brute-force attacks and spam submissions.</li>
              <li><strong>Access Controls:</strong> Access to personal data within our systems is restricted to authorized personnel on a need-to-know basis.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">12. Media & Testimonials</h2>
            <p className="text-[var(--text-muted)] mb-4">
              During events, workshops, or classes, we may capture photographs or videos. We reserve the right to use these visuals for marketing purposes on our website and social media. If you wish to opt-out, please notify the management in writing during enrollment.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">13. Changes to This Policy</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically. Your continued use of our website and services after any changes constitutes your acceptance of the updated policy.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              For material changes that significantly affect how your personal data is processed, we will make reasonable efforts to notify you via email or through a prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="heading-md mb-4">14. Contact & Grievance Officer</h2>
            <p className="text-[var(--text-muted)]">
              For any privacy-related queries or to exercise your data rights, please contact our administrative office:
            </p>
            <div className="mt-6 p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
              <p className="font-black text-body-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
              <p className="text-[var(--text-muted)] mb-1">Grievance Officer: {BRANDING.founder.name}</p>
              <p className="text-[var(--text-muted)] mb-4">{BRANDING.address}</p>
              
              <div className="flex flex-col space-y-2 text-small font-medium">
                <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
                <p className="text-[var(--text-muted)]">Phone: <span className="text-primary">{BRANDING.phone}</span></p>
              </div>
              <p className="text-[var(--text-muted)] text-caption mt-4">
                We aim to respond to all data-related requests within 30 days of receipt.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
