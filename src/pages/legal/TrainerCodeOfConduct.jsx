import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { BookOpen, ShieldCheck, ShieldAlert, Star, Heart, Scale, LogOut, EyeOff } from 'lucide-react';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';

const TrainerCodeOfConduct = () => {
  return (
    <Layout>
      <SEO 
        title={`Trainer Code of Conduct | ${BRANDING.fullName}`} 
        description="Professional standards, ethical conduct, and pedagogical excellence required from our mentoring staff." 
        canonical="/legal/trainer-conduct"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Trainer Code of Conduct', path: '/legal/trainer-conduct' },
        ]}
      />
      <Hero 
        title={<>Trainer <span className="text-primary">Code of Conduct</span></>}
        subtitle="Professional Standards & Pedagogical Ethics | Last Updated: April 26, 2026"
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Star className="h-6 w-6 text-primary mr-3" />
              1. Pedagogical Excellence
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Trainers at {BRANDING.fullName} are committed to delivering the highest quality of technical education. This includes staying updated with latest industry standards and ensuring that all project-based learning is relevant to current market demands.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <ShieldCheck className="h-6 w-6 text-primary mr-3" />
              2. Data Ethics & Confidentiality
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              In accordance with our NDA Policy, trainers must protect all student data and intellectual property. Unauthorized sharing of student projects, resumes, or performance metrics is strictly prohibited.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Heart className="h-6 w-6 text-primary mr-3" />
              3. Inclusive Learning Environment
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} maintains a Zero-Tolerance policy towards discrimination. Trainers must foster a supportive, inclusive, and respectful environment for all students, regardless of their background or current technical proficiency.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Scale className="h-6 w-6 text-primary mr-3" />
              4. Professional Integrity
            </h2>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Trainers must provide honest, constructive feedback that helps students grow.</li>
              <li>Plagiarism or the use of unlicensed materials in teaching is strictly forbidden.</li>
              <li>Trainers must clearly distinguish between institute-provided curriculum and their personal opinions or external consulting work.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-3" />
              5. Grievance & Reporting Mechanism
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Students, staff, or other stakeholders who witness or experience conduct that violates this Code are encouraged to report it through the following channels:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Email Report:</strong> Send a detailed account of the incident to <span className="text-primary font-bold">{BRANDING.email}</span> with the subject line "Trainer Conduct Report."</li>
              <li><strong>In-Person Report:</strong> Speak directly with the institute's administrative office during office hours.</li>
              <li><strong>Confidentiality:</strong> All reports are treated with strict confidentiality. The identity of the reporter will not be disclosed without their explicit consent, except where required by law.</li>
              <li><strong>Investigation:</strong> All reported incidents will be reviewed by the institute's Educational Quality Assurance Team. A written response will be provided within 15 working days of receipt.</li>
              <li><strong>Non-Retaliation:</strong> {BRANDING.fullName} maintains a strict non-retaliation policy. No adverse action will be taken against any individual for reporting a good-faith concern.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <ShieldAlert className="h-6 w-6 text-primary mr-3" />
              6. Prevention of Sexual Harassment (POSH)
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              We are committed to maintaining a safe, respectful, and inclusive environment for everyone — including students, trainers, employees, and visitors.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              Any form of sexual harassment, inappropriate behavior, or misconduct — whether verbal, non-verbal, physical, or online — is <strong className="text-[var(--text-heading)]">strictly prohibited</strong>.
            </p>
            <p className="text-[var(--text-muted)] mb-2">
              This includes (but is not limited to):
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2 mb-4">
              <li>Unwelcome messages, comments, or advances</li>
              <li>Sharing inappropriate content</li>
              <li>Any behavior that makes others feel uncomfortable or unsafe</li>
            </ul>
            <p className="text-[var(--text-muted)] mb-4">
              We follow a <strong className="text-[var(--text-heading)]">zero-tolerance policy</strong> towards such actions.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              If anyone experiences or witnesses inappropriate behavior, they are encouraged to report it immediately. All complaints will be handled with seriousness, confidentiality, and fairness. Appropriate action will be taken based on the nature of the complaint.
            </p>
            <p className="text-[var(--text-muted)]">
              For reporting concerns, please contact us at: <span className="text-primary font-bold">{BRANDING.email}</span>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <LogOut className="h-6 w-6 text-primary mr-3" />
              7. Trainer Exit & Notice Policy
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Trainers intending to discontinue their association with {BRANDING.fullName} are required to adhere to the following:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>A minimum notice period of <strong className="text-[var(--text-heading)]">15 days</strong> must be provided in advance.</li>
              <li>Trainers are expected to complete all ongoing batches and commitments during the notice period to ensure continuity for students.</li>
              <li>A formal resignation email must be submitted to <span className="text-primary font-bold">{BRANDING.email}</span>.</li>
              <li>Final settlement (F&F) will be processed within <strong className="text-[var(--text-heading)]">7–15 working days</strong> from the completion of the notice period and handover of responsibilities.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <EyeOff className="h-6 w-6 text-primary mr-3" />
              8. Trainer Confidentiality & Privacy
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} respects the privacy of its trainers and is committed to protecting their personal information. We do not disclose or share any personal or professional details of trainers — such as their current workplace, employment status (full-time or part-time), or other personal information — with students or third parties.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              Trainers are also advised to maintain their own privacy and are strongly encouraged not to share personal or sensitive information with students or candidates during or outside the training process.
            </p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-body-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)]">Educational Quality Assurance Team</p>
            <div className="flex flex-col space-y-2 text-small font-medium mt-4">
              <p className="text-[var(--text-muted)]">Inquiries: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerCodeOfConduct;
