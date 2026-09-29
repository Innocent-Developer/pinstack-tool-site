import React from 'react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Mastering Crontab Syntax: The Complete 5-Part Cron Schedule Reference',
  description: 'Understand the 5 fields of Linux crontab expressions, special step characters, and automated schedule workflows.',
};

export default function BlogCrontab() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: '2026-09-20',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Crontab Guide</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-200">
          DevOps & Automation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Mastering Crontab Syntax: The Complete 5-Part Cron Schedule Reference
        </h1>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-3">
          <span>By {siteConfig.authorName} (<a href={siteConfig.authorUrl} className="underline text-blue-600">abubakkar.dev</a>)</span>
          <span>•</span>
          <span>September 2026</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <AdPlaceholder slotId="4433221100" format="horizontal" />

      <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed mt-8">
        <p>
          Cron is one of the most reliable and battle-tested background scheduling engines in software engineering. Whether you are running nightly database backups, synchronizing third-party APIs, or dispatching customer notification batches, understanding crontab syntax is essential.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">The 5 Core Crontab Fields</h2>
        <p>
          A standard UNIX cron expression consists of exactly five space-separated fields:
        </p>

        <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto leading-loose">
          ┌───────────── Minute (0 - 59)<br />
          │ ┌─────────── Hour (0 - 23)<br />
          │ │ ┌───────── Day of Month (1 - 31)<br />
          │ │ │ ┌─────── Month (1 - 12)<br />
          │ │ │ │ ┌───── Day of Week (0 - 6, 0 = Sunday)<br />
          * * * * *
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Understanding Special Operators</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Asterisk (*):</strong> Matches every possible value within that field.</li>
          <li><strong>Comma (,):</strong> Specifies a discrete list of values, e.g., <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">1,15,30</code>.</li>
          <li><strong>Hyphen (-):</strong> Defines an inclusive numerical range, e.g., <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">1-5</code> (Monday through Friday).</li>
          <li><strong>Slash (/):</strong> Defines step values or recurring intervals, e.g., <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">*/15</code> (every 15 minutes).</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-blue-950 text-base">Test & Generate Cron Schedules</h3>
          <p className="text-xs text-blue-800 mt-1">Translate any cron string into plain English instantly.</p>
        </div>
        <Link href="/tools/cron-generator" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
          Launch Generator &rarr;
        </Link>
      </div>

      <AdPlaceholder slotId="9900112233" format="horizontal" />
    </article>
  );
}
