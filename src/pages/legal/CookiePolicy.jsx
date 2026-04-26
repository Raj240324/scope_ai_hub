import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { Cookie, Shield, Database, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import SEO from '../../components/utils/SEO';
import { BRANDING } from '../../data/branding';

const CookiePolicy = () => {
  return (
    <Layout>
      <SEO 
        title={`Cookie Policy | ${BRANDING.fullName}`} 
        description="Learn how Scope AI Hub uses cookies, local storage, and tracking technologies on our website." 
        canonical="/cookie-policy"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cookie Policy', path: '/cookie-policy' },
        ]}
      />
      <Hero 
        title={<>Cookie <span className="text-primary">Policy</span></>}
        subtitle="How We Use Cookies & Tracking Technologies | Last Updated: April 26, 2026"
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Cookie className="h-6 w-6 text-primary mr-3" />
              1. What Are Cookies
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website operators information about how users interact with their site.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              Cookies can be classified in several ways:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser.</li>
              <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you manually delete them.</li>
              <li><strong>First-Party Cookies:</strong> Cookies set by the website you are visiting (in this case, {BRANDING.fullName}).</li>
              <li><strong>Third-Party Cookies:</strong> Cookies set by external services integrated into the website (e.g., Google, Tawk.to).</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Shield className="h-6 w-6 text-primary mr-3" />
              2. Cookies We Use
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              The {BRANDING.fullName} website uses a limited number of cookies and similar technologies, primarily for security and functional purposes. We do not use cookies for advertising or behavioral tracking.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-[var(--border-color)] text-small">
                <thead>
                  <tr className="bg-[var(--bg-secondary)]">
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Category</th>
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Service</th>
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Purpose</th>
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Type</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-muted)]">
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-semibold">Strictly Necessary</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Google reCAPTCHA v2</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Bot detection and spam prevention on enquiry and application forms. Required for form submission.</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Third-Party</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-semibold">Functional</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Theme Preference</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Remembers your dark/light mode preference across visits using browser local storage.</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">First-Party (Local Storage)</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-semibold">Performance</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Sentry</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Error monitoring and website performance tracking. All personally identifiable information is scrubbed before transmission.</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Third-Party</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-semibold">Third-Party</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Tawk.to Live Chat</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Enables live chat support. Tawk.to may set its own cookies to maintain chat sessions and visitor identification.</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Third-Party</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-semibold">Third-Party</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Google Fonts</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Font delivery service. When fonts are loaded, your IP address is transmitted to Google servers. Google may use this data in accordance with their privacy policy.</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Third-Party</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Database className="h-6 w-6 text-primary mr-3" />
              3. Local Storage Usage
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              In addition to cookies, our website uses your browser's local storage mechanism to store certain non-personal data:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-[var(--border-color)] text-small">
                <thead>
                  <tr className="bg-[var(--bg-secondary)]">
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Key</th>
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Purpose</th>
                    <th className="border border-[var(--border-color)] px-4 py-3 text-left font-bold">Data Stored</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-muted)]">
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-mono text-caption">theme</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Stores your preferred color scheme (dark or light mode)</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">"light" or "dark"</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border-color)] px-4 py-3 font-mono text-caption">enquiry_rate_limit</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Security measure to prevent rapid repeated form submissions</td>
                    <td className="border border-[var(--border-color)] px-4 py-3">Timestamps of recent submissions (no personal data)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <Settings className="h-6 w-6 text-primary mr-3" />
              4. How to Control Cookies
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li>View which cookies are stored on your device</li>
              <li>Delete individual cookies or clear all cookies</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies (though this may affect website functionality)</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4 mb-4">
              For instructions on managing cookies in your specific browser, please refer to your browser's help documentation:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 text-primary mr-3" />
              5. Impact of Disabling Cookies
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              If you choose to disable or block certain cookies, please be aware that some features of our website may not function as intended:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
              <li><strong>reCAPTCHA:</strong> Blocking Google reCAPTCHA cookies will prevent you from submitting enquiry and application forms, as reCAPTCHA is required for form security verification.</li>
              <li><strong>Tawk.to:</strong> Blocking Tawk.to cookies will disable the live chat support feature.</li>
              <li><strong>Theme Preference:</strong> Clearing local storage will reset your dark/light mode preference to the system default on your next visit.</li>
            </ul>
            <p className="text-[var(--text-muted)] mt-4">
              General website browsing, course information, and page navigation will continue to function normally even with cookies disabled.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="heading-md mb-4 flex items-center">
              <RefreshCw className="h-6 w-6 text-primary mr-3" />
              6. Updates to This Policy
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              We may update this Cookie Policy from time to time to reflect changes in the technologies we use or for operational, legal, or regulatory reasons. Any changes will be posted on this page with a revised "Last Updated" date.
            </p>
            <p className="text-[var(--text-muted)] mb-4">
              We encourage you to check this page periodically to stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl">
            <p className="font-black text-body-lg text-[var(--text-heading)] mb-2">{BRANDING.fullName}</p>
            <p className="text-[var(--text-muted)] mb-4">For questions about our use of cookies, contact us at:</p>
            <div className="flex flex-col space-y-2 text-small font-medium">
              <p className="text-[var(--text-muted)]">Email: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
