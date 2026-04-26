import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { BookOpen, ShieldCheck, Star, Heart, Scale } from 'lucide-react';
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
