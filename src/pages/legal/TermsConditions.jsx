import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { BRANDING } from '../../data/branding';

const TermsConditions = () => {
  return (
    <Layout>
      <Hero 
        title={<>Terms & <span className="text-primary">Conditions</span></>}
        subtitle={`Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--text-muted)] mb-4">
              By enrolling in our career guidance programs at {BRANDING.fullName} (online or offline), you agree to abide by these Terms and Conditions. These terms constitute a binding agreement between the student ("You") and the Institute regarding academic and administrative policies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">2. Admission & Fees</h2>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Registration:</strong> Admission is confirmed only after the payment of the registration fee, which is non-refundable.</li>
              <li><strong>Tuition Fees:</strong> Full course fees must be paid before the commencement of the batch or as per the approved installment schedule (EMI).</li>
              <li><strong>Late Payment:</strong> Failure to pay installments on time may result in suspension of access to classes and the Learning Management System (LMS).</li>
              <li><strong>Refunds:</strong> Course fees are strictly non-refundable once the batch has commenced. Refund requests made 7 days prior to the batch start date may be considered subject to a processing fee.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">3. Academic Policies</h2>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Attendance:</strong> A minimum of 85% attendance is mandatory to be eligible for placement assistance and certification.</li>
              <li><strong>Assignments:</strong> Students must submit all project milestones and assignments on time. Late submissions may impact the final grade.</li>
              <li><strong>Certification:</strong> Official {BRANDING.fullName} Certifications will be issued only after the successful submission and defense of the final capstone project.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">4. Code of Conduct</h2>
            <p className="text-[var(--text-muted)] mb-4">
              We maintain a strict zero-tolerance policy towards:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Harassment or discrimination of any kind towards peers or faculty.</li>
              <li>Plagiarism in code submissions or projects.</li>
              <li>Unauthorized recording or distribution of classroom lectures.</li>
              <li>Damage to institute property or hardware.</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4">Violation of these rules may lead to immediate expulsion without a refund.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">5. Placement Assistance</h2>
            <p className="text-[var(--text-muted)] mb-4">
              Our "Strategic Placement Guidance" includes resume building, mock interviews, and sharing profiles with hiring partners. However:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Placement is not a guarantee of a job offer; it depends on your performance in the actual interviews.</li>
              <li>Students who fail to clear internal assessments or mock interviews will not be forwarded to external companies until they improve.</li>
              <li>Refusing three consecutive interview opportunities may lead to the suspension of placement support.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">6. Intellectual Property</h2>
            <p className="text-[var(--text-muted)] mb-4">
              All learning materials, including source code templates, slide decks, and recorded videos provided by {BRANDING.fullName}, are our exclusive, proprietary content. They are licensed to you for personal educational use only. You are strictly prohibited from redistributing, reselling, or uploading these materials to public platforms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">7. Limitation of Liability</h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} is an educational provider. We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our training services. Our liability is limited to the total fees paid by the student.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">8. Governing Law & Contact</h2>
            <p className="text-[var(--text-muted)] mb-4">
              These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Chennai.
            </p>
            <p className="text-[var(--text-muted)]">
              For legal inquiries, please reach out to us at:
            </p>
            <div className="mt-6 p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
              <p className="font-black text-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
              <p className="text-[var(--text-muted)] mb-4">{BRANDING.address}</p>
              <p className="text-[var(--text-muted)] font-medium">Email: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
