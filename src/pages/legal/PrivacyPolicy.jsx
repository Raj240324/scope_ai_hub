import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { BRANDING } from '../../data/branding';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Hero 
        title={<>Privacy <span className="text-primary">Policy</span></>}
        subtitle={`Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">1. Introduction</h2>
            <p className="text-[var(--text-muted)] mb-4">
              Welcome to {BRANDING.fullName}. We are committed to protecting your personal data and ensuring transparency in how we handle it. This Privacy Policy details the types of information we collect when you enroll in our career guidance programs, visit our campus, or use our digital platforms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">2. Information Collection</h2>
            <p className="text-[var(--text-muted)] mb-4">We collect data necessary to provide educational and placement services:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Personal Identity:</strong> Name, Date of Birth, and Government ID (for certification).</li>
              <li><strong>Contact Details:</strong> Phone Number, Email Address, and Residential Address.</li>
              <li><strong>Academic Records:</strong> Educational qualifications, mark sheets, and portfolio projects.</li>
              <li><strong>Attendance & Performance:</strong> Daily attendance logs, assessment scores, and project submissions.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">3. Utilization of Data</h2>
            <p className="text-[var(--text-muted)] mb-4">Your information is strictly used for:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Academic Administration:</strong> Creating student profiles, tracking progress, and issuing course completion certificates.</li>
              <li><strong>Placement Services:</strong> We share your resume and technical portfolio with our hiring partners (MNCs and Startups) for recruitment purposes.</li>
              <li><strong>Communication:</strong> Sharing class schedules, holiday alerts, and workshop notifications via WhatsApp or Email.</li>
              <li><strong>Certification:</strong> Submitting necessary internal evaluation data for the issuance of the Official {BRANDING.fullName} Certification.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">4. Data Sharing & Third Parties</h2>
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
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">5. Student Rights</h2>
            <p className="text-[var(--text-muted)] mb-4">
              As a student, you have the right to request access to your academic records, correct any inaccuracies in your profile, and request the deletion of your data post-completion (subject to retention required for official verification purposes).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">6. Media & Testimonials</h2>
            <p className="text-[var(--text-muted)] mb-4">
              During events, workshops, or classes, we may capture photographs or videos. We reserve the right to use these visuals for marketing purposes on our website and social media. If you wish to opt-out, please notify the management in writing during enrollment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">7. Contact & Grievance Officer</h2>
            <p className="text-[var(--text-muted)]">
              For any privacy-related queries or to exercise your data rights, please contact our administrative office:
            </p>
            <div className="mt-6 p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
              <p className="font-black text-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
              <p className="text-[var(--text-muted)] mb-4">{BRANDING.address}</p>
              
              <div className="flex flex-col space-y-2 text-sm font-medium">
                <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
                <p className="text-[var(--text-muted)]">Phone: <span className="text-primary">{BRANDING.phone}</span></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
