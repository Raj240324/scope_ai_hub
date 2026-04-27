import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Info, HelpCircle, AlertTriangle, Building2, Globe, MessageSquare, Cpu, FileWarning } from 'lucide-react';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';

const Disclaimer = () => {
  return (
    <Layout>
      <SEO 
        title={`Legal Disclaimer | ${BRANDING.fullName}`} 
        description="Important disclosures regarding educational content, career outcomes, and placement assistance." 
        canonical="/disclaimer"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Disclaimer', path: '/disclaimer' },
        ]}
      />
      <Hero 
        title={<>Legal <span className="text-primary">Disclaimer</span></>}
        subtitle="Important Disclosures & Representation Standards | Last Updated: April 26, 2026"
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Info className="h-6 w-6 text-primary mr-3" />
              1. General Information
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              The information provided by {BRANDING.fullName} on this website is for general educational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or suitability of the course content for specific individual goals.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
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
            <h2 className="heading-md mb-4 flex items-center">
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
            <h2 className="heading-md mb-4 flex items-center">
              <HelpCircle className="h-6 w-6 text-primary mr-3" />
              4. External Links Disclaimer
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Our website may include links to third-party platforms such as Google Maps, WhatsApp, and social media channels for your convenience and ease of access. While we strive to provide only relevant and reliable links, these platforms are operated independently and may have their own terms and policies.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              We encourage users to review the privacy policies and terms of use of any external websites they visit through our links.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Globe className="h-6 w-6 text-primary mr-3" />
              5. Website Availability
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} does not guarantee that the website will be available at all times or that access will be uninterrupted or error-free. We may temporarily suspend access to the website for maintenance, updates, or unforeseen technical issues without prior notice.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              We shall not be liable for any loss or damage arising from the unavailability of the website, including but not limited to missed application deadlines or inability to access course information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <MessageSquare className="h-6 w-6 text-primary mr-3" />
              6. Testimonials & Reviews
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Testimonials and reviews displayed on our website reflect the individual experiences and opinions of specific students. These experiences are personal and may not be representative of every student's outcome. Results vary based on individual effort, aptitude, prior experience, and market conditions.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              {BRANDING.fullName} does not guarantee that any student will achieve similar results as described in testimonials.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Cpu className="h-6 w-6 text-primary mr-3" />
              7. AI & Technology Content
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              The field of Artificial Intelligence, Machine Learning, and related technologies evolves rapidly. While {BRANDING.fullName} makes every effort to ensure our course content reflects the latest industry practices and tools, we cannot guarantee that all information on this website or in our curriculum will remain current at all times.
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>Technology frameworks, libraries, and best practices referenced in our courses may change or become deprecated after the course material was developed.</li>
              <li>Students are encouraged to supplement their learning with the latest industry documentation and community resources.</li>
              <li>Course curricula may be updated periodically to reflect industry changes, which may result in differences from the syllabus originally displayed at the time of enrollment.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <FileWarning className="h-6 w-6 text-primary mr-3" />
              8. Errors & Omissions
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              While we take reasonable care to ensure the accuracy of the information on this website, {BRANDING.fullName} does not warrant that the content is free of errors, omissions, or inaccuracies. We reserve the right to make corrections, modifications, or updates to any information — including course details, pricing, batch schedules, and program descriptions — at any time without prior notice.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              In the event of a pricing error or discrepancy, {BRANDING.fullName} reserves the right to cancel any affected enrollment and offer a full refund at its sole discretion.
            </p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-body-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)]">Legal Compliance Department</p>
            <div className="flex flex-col space-y-2 text-small font-medium mt-4">
              <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
