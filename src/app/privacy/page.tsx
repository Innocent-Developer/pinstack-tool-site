import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for DevTools Lab by API Test Lab, detailing client-side computing and Google AdSense cookie usage.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: September 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Client-Side Data Architecture</h2>
          <p>
            At DevTools Lab (a service by API Test Lab accessible at devtools.apitestlab.org), we prioritize user privacy. All developer utilities—including the JSON to TypeScript converter, SQL formatter, JWT debugger, Regex tester, and Base64 encoder—execute entirely in your browser using client-side JavaScript. We do not transmit, log, or store your inputs on remote servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Google AdSense & Third-Party Cookies</h2>
          <p>
            We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies (such as the DoubleClick cookie) to serve ads to users based on their visits to this and other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Server Logs & Analytics</h2>
          <p>
            Our web servers automatically record standard HTTP request information (such as your IP address, browser type, referring page, and timestamp) for diagnostic, security, and traffic monitoring purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, you can reach out via email at contact@apitestlab.org or visit our main portal at apitestlab.org.
          </p>
        </section>
      </div>
    </div>
  );
}
