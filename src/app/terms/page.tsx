import React from 'react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for utilizing the free online developer utilities at DevTools Lab.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: September 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevTools Lab at devtools.apitestlab.org, you agree to be bound by these Terms of Service. If you do not agree, you may not use the services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Permitted Use</h2>
          <p>
            Our developer tools are provided free of charge for personal, commercial, and educational use. You may use them to format, convert, and test code, queries, and tokens.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Disclaimer of Warranties</h2>
          <p>
            All tools and content are provided "AS IS" without warranty of any kind. DevTools Lab and API Test Lab make no guarantees regarding accuracy, uptime, or fitness for a particular purpose.
          </p>
        </section>
      </div>
    </div>
  );
}
