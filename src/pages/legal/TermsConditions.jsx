import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';

const TermsConditions = () => {
  return (
    <Layout>
      <SEO 
        title={`Terms & Conditions | ${BRANDING.fullName}`} 
        description="Read the terms and conditions governing enrollment and academic policies at Scope AI Hub." 
        canonical="/terms-conditions"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms-conditions' },
        ]}
      />
      <Hero 
        title={<>Terms & <span className="text-primary">Conditions</span></>}
        subtitle="Last Updated: April 26, 2026"
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="heading-md mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--text-muted)] mb-4">
              By enrolling in our career guidance programs at {BRANDING.fullName} (online or offline), you agree to abide by these Terms and Conditions. These terms constitute a binding agreement between the student ("You") and the Institute regarding academic and administrative policies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">2. Website Use Terms</h2>
            <p className="text-[var(--text-muted)] mb-4">
              These Terms and Conditions apply to all visitors and users of the {BRANDING.fullName} website, not solely to enrolled students. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, you must discontinue use of our website immediately.
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this website by any third party.</li>
              <li>You must not misuse our website by knowingly introducing viruses, trojans, or other material that is malicious or technologically harmful.</li>
              <li>Unauthorized attempts to access restricted areas of the website, server, or connected databases are strictly prohibited.</li>
              <li>All enquiries and form submissions must contain accurate and truthful information. Submitting false or misleading data may result in your enquiry being discarded and your access being restricted.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">3. Admission & Fees</h2>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Registration:</strong> Admission is confirmed only after the payment of the registration fee, which is non-refundable.</li>
              <li><strong>Tuition Fees:</strong> Full course fees must be paid before the commencement of the batch or as per the approved installment schedule (EMI).</li>
              <li><strong>Late Payment:</strong> Failure to pay installments on time may result in suspension of access to classes and the Learning Management System (LMS).</li>
              <li><strong>Refunds:</strong> Course fees are strictly non-refundable once the batch has commenced. Refund requests made 7 days prior to the batch start date may be considered subject to a processing fee.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">4. Academic Policies</h2>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Attendance:</strong> A minimum of 85% attendance is mandatory to be eligible for placement assistance and certification.</li>
              <li><strong>Assignments:</strong> Students must submit all project milestones and assignments on time. Late submissions may impact the final grade.</li>
              <li><strong>Certification:</strong> Official {BRANDING.fullName} Certifications will be issued only after the successful submission and defense of the final capstone project.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">5. Code of Conduct</h2>
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
            <h2 className="heading-md mb-4">6. Placement Assistance</h2>
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
            <h2 className="heading-md mb-4">7. Intellectual Property</h2>
            <p className="text-[var(--text-muted)] mb-4">
              All learning materials, including source code templates, slide decks, and recorded videos provided by {BRANDING.fullName}, are our exclusive, proprietary content. They are licensed to you for personal educational use only. You are strictly prohibited from redistributing, reselling, or uploading these materials to public platforms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">8. Limitation of Liability</h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} is an educational provider. We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our training services. Our liability is limited to the total fees paid by the student.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">9. Modifications to These Terms</h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} reserves the right to amend, update, or modify these Terms and Conditions at any time. Any material changes will be communicated via our website with a revised "Last Updated" date. Your continued use of our website or services after any modifications constitutes your acceptance of the updated terms.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              We encourage you to review these terms periodically to stay informed about your rights and obligations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">10. Severability</h2>
            <p className="text-[var(--text-muted)] mb-4">
              If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">11. Entire Agreement</h2>
            <p className="text-[var(--text-muted)] mb-4">
              These Terms and Conditions, together with our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, <a href="/refund-policy" className="text-primary hover:underline">Refund Policy</a>, and <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>, constitute the entire agreement between you and {BRANDING.fullName} with respect to your use of our website and services. They supersede all prior or contemporaneous communications and proposals, whether oral or written.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4">12. Force Majeure</h2>
            <p className="text-[var(--text-muted)] mb-4">
              Neither {BRANDING.fullName} nor its students shall be liable for any failure or delay in performance resulting from causes beyond their reasonable control. This includes, but is not limited to, natural disasters, pandemics, government actions, internet outages, power failures, or any other event that could not have been reasonably foreseen or prevented.
            </p>
          </section>

          <section>
            <h2 className="heading-md mb-4">13. Governing Law & Contact</h2>
            <p className="text-[var(--text-muted)] mb-4">
              These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Chennai.
            </p>
            <p className="text-[var(--text-muted)]">
              For legal inquiries, please reach out to us at:
            </p>
            <div className="mt-6 p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
              <p className="font-black text-body-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
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
