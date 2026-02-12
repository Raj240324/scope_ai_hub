import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { ShieldCheck, Lock, FileText, Users } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const NDAPolicy = () => {
  return (
    <Layout>
      <Hero 
        title={<>NDA <span className="text-primary">Policy</span></>}
        subtitle={`Non-Disclosure Agreement & Confidentiality Standards | Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <ShieldCheck className="h-6 w-6 text-primary mr-3" />
              1. Institutional Commitment
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              At {BRANDING.fullName}, we handle sensitive intellectual property, proprietary curriculum, and student data with the highest level of confidentiality. This Non-Disclosure Agreement (NDA) policy ensures that all parties involved in our educational ecosystem—including trainers, staff, and students—are legally bound to protect confidential information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <Users className="h-6 w-6 text-primary mr-3" />
              2. Trainer & Staff Obligations
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              All trainers, mentors, and administrative staff at {BRANDING.fullName} are required to sign a comprehensive Non-Disclosure Agreement upon joining. This agreement stipulates that:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Trainers shall not disclose student progress, personal data, or project ideas to third parties without explicit authorization.</li>
              <li>Trainers are prohibited from using or sharing the institute's proprietary training methodologies and curriculum for personal gain or external commercial use.</li>
              <li>Confidentiality remains in effect both during and after the period of employment or association with the institute.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <FileText className="h-6 w-6 text-primary mr-3" />
              3. Definition of Confidential Information
            </h2>
            <p className="text-[var(--text-muted)] mb-4">Confidential information includes, but is not limited to:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Academic IP:</strong> Custom code snippets, internal project repositories, and specialized course material.</li>
              <li><strong>Student Data:</strong> Resumes, assessment scores, and placement-related grooming data.</li>
              <li><strong>Business Intelligence:</strong> Hiring partner lists, internal placement strategies, and operational workflows.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <Lock className="h-6 w-6 text-primary mr-3" />
              4. Data Protection Standards
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Access to confidential data is strictly controlled on a "need-to-know" basis. We employ secure internal systems to manage student records and project repositories. Any data breach or unauthorized disclosure is taken seriously and may lead to legal action in accordance with Indian IT laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">5. Enforcement</h2>
            <p className="text-[var(--text-muted)]">
              Any violation of this NDA policy by staff or students will result in immediate termination of the association and may incur legal penalties under the jurisdiction of the courts in Chennai.
            </p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)] mb-4">Legal & Compliance Department</p>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <p className="text-[var(--text-muted)]">Inquiries: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default NDAPolicy;
