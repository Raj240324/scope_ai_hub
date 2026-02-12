import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { RefreshCw, Clock, AlertCircle, FileCheck } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const RefundPolicy = () => {
  return (
    <Layout>
      <Hero 
        title={<>Refund <span className="text-primary">Policy</span></>}
        subtitle={`Fee Cancellation & Refund Standards | Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <RefreshCw className="h-6 w-6 text-primary mr-3" />
              1. General Refund Principles
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              At {BRANDING.fullName}, we strive to provide high-quality technical education. Our refund policy is designed to be fair to both the students and the institute, ensuring that administrative costs are covered while providing flexibility where possible.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 text-primary mr-3" />
              2. Non-Refundable Items
            </h2>
            <p className="text-[var(--text-muted)] mb-4">The following fees are strictly non-refundable under any circumstances:</p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Registration Fees:</strong> The initial seat booking or registration fee is non-refundable.</li>
              <li><strong>Learning Materials:</strong> Any fees paid for physical books, software licenses, or digital access codes already issued.</li>
              <li><strong>Prorated Tuition:</strong> Fees for classes already attended or modules already completed.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <Clock className="h-6 w-6 text-primary mr-3" />
              3. Refund Eligibility & Timelines
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-[var(--border-color)] text-sm">
                <thead>
                  <tr className="bg-[var(--bg-secondary)]">
                    <th className="border border-[var(--border-color)] px-4 py-2 text-left">Request Timeline</th>
                    <th className="border border-[var(--border-color)] px-4 py-2 text-left">Refund Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-2">7+ days before batch starts</td>
                    <td className="border border-[var(--border-color)] px-4 py-2">100% of Tuition Fee (minus registration)</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-2">Less than 7 days before batch starts</td>
                    <td className="border border-[var(--border-color)] px-4 py-2">50% of Tuition Fee</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-2">After batch has commenced</td>
                    <td className="border border-[var(--border-color)] px-4 py-2">Strictly No Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <FileCheck className="h-6 w-6 text-primary mr-3" />
              4. Refund Request Process
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              To request a refund, students must submit a formal written application via email to <span className="text-primary font-bold">{BRANDING.email}</span>. The request must include:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Full Student Name & Enrollment ID</li>
              <li>Copy of the original payment receipt</li>
              <li>Detailed reason for the refund request</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4">Approved refunds will be processed within 15-20 working days via the original payment method.</p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)] mb-4">Accounts & Finance Department</p>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
