import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Info, HelpCircle, AlertTriangle, Building2 } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const Disclaimer = () => {
  return (
    <Layout>
      <Hero 
        title={<>Legal <span className="text-primary">Disclaimer</span></>}
        subtitle={`Important Disclosures & Representation Standards | Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <Info className="h-6 w-6 text-primary mr-3" />
              1. General Information
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              The information provided by {BRANDING.fullName} on this website is for general educational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or suitability of the course content for specific individual goals.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-primary mr-3" />
              2. Career & Salary Outcomes
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Any mentions of "Placement Guidance" or "Career Success" are illustrative and reflect our commitment to supporting our students. However:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Individual career results depend on various factors including personal aptitude, interview performance, and market conditions.</li>
              <li>Mentioned salary packages (e.g., 24 LPA) are based on the highest historical placements of alumni and are not a guarantee of future salaries for every student.</li>
              <li>We do not provide job guarantees; our role is strictly to provide guidance, grooming, and interview opportunities.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <Building2 className="h-6 w-6 text-primary mr-3" />
              3. Representation of Hiring Partners
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              The use of third-party logos (e.g., Google, Amazon, Zoho, TCS) on this website is intended to represent companies where our alumni have historically been placed or where our students have interviewed.
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>These logos are the intellectual property of their respective owners.</li>
              <li>{BRANDING.fullName} does not claim direct partnership, endorsement, or sponsorship by these companies unless explicitly stated otherwise.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center">
              <HelpCircle className="h-6 w-6 text-primary mr-3" />
              4. External Links Disclaimer
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Our website may contain links to external sites (e.g., Google Maps, WhatsApp, Social Media). We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)]">Legal Compliance Department</p>
            <div className="flex flex-col space-y-2 text-sm font-medium mt-4">
              <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
