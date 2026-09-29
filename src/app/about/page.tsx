import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'About PinStack - Built by Abubakkar Sajid & API Test Lab',
  description: 'Learn about PinStack, the private client-side developer utility platform created by Abubakkar Sajid (abubakkar.dev) and powered by apitestlab.org.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">About PinStack</h1>
      <p className="text-base text-slate-600 mb-8">
        A free utility suite by <a href={siteConfig.parentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">apitestlab.org</a>. Engineered by <a href={siteConfig.authorUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">{siteConfig.authorName} ({siteConfig.authorUrl})</a>.
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          Software engineers, API architects, and developers perform hundreds of micro-tasks every day: beautifying a messy SQL query, generating TypeScript types from an API response, inspecting a JSON Web Token (JWT) expiration date, or decoding a Base64 string.
        </p>
        <p>
          Unfortunately, many existing online tools are filled with popups, require server-side requests that compromise sensitive API keys, or have sluggish page reloads.
        </p>
        <p>
          <strong>PinStack.cc</strong> was created to solve this problem by providing a modern, lightning-fast developer workspace where you can "pin" your daily tool stack with <strong>100% in-browser client-side privacy</strong>.
        </p>

        <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Our Core Commitments</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Strict Local Privacy:</strong> We never transmit, store, or log your code, SQL queries, or JWT credentials.</li>
            <li><strong>Sub-Millisecond Execution:</strong> Built with Next.js 14 and pure client-side algorithms for instantaneous output.</li>
            <li><strong>Always Free:</strong> Zero paywalls, hidden limits, or forced registration.</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-slate-900 text-slate-300 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-2">Platform Credits & Ecosystem</h2>
          <p className="text-xs leading-relaxed text-slate-400">
            PinStack is proudly maintained as part of the <a href={siteConfig.parentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">API Test Lab</a> ecosystem and designed by full-stack engineer <a href={siteConfig.authorUrl} target="_blank" rel="noopener noreferrer" className="text-white underline font-semibold">Abubakkar Sajid</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
