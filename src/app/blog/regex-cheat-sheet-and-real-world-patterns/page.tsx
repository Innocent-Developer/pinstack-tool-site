import React from 'react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Regular Expressions Cheat Sheet & Top 10 Production Regex Patterns',
  description: 'A comprehensive developer regex cheat sheet covering character classes, quantifiers, lookaheads, and copy-paste production patterns.',
};

export default function BlogRegex() {
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
    datePublished: '2026-09-22',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Regex Cheat Sheet</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-200">
          Developer Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Regular Expressions Cheat Sheet & Top 10 Production Regex Patterns
        </h1>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-3">
          <span>By {siteConfig.authorName} (<a href={siteConfig.authorUrl} className="underline text-blue-600">abubakkar.dev</a>)</span>
          <span>•</span>
          <span>September 2026</span>
          <span>•</span>
          <span>9 min read</span>
        </div>
      </header>

      <AdPlaceholder slotId="5566778899" format="horizontal" />

      <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed mt-8">
        <p>
          Regular expressions (regex) are ubiquitous in input validation, text scraping, and log parsing. However, due to their compact syntax, crafting error-free patterns can be intimidating. Here is your reference guide to production-tested regex patterns.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Essential Common Patterns</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
            <span className="font-bold text-xs uppercase text-slate-600 block mb-1">1. RFC-5322 Email Validation</span>
            <code className="text-xs font-mono text-blue-700 select-all">[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{'{'}2,{'}'}</code>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
            <span className="font-bold text-xs uppercase text-slate-600 block mb-1">2. HTTPS URL Validator</span>
            <code className="text-xs font-mono text-blue-700 select-all">https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{'{'}1,256{'}'}\.[a-zA-Z0-9()]{'{'}1,6{'}'}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)</code>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
            <span className="font-bold text-xs uppercase text-slate-600 block mb-1">3. UUID v4 Pattern</span>
            <code className="text-xs font-mono text-blue-700 select-all">[0-9a-f]{'{'}8{'}'}-[0-9a-f]{'{'}4{'}'}-4[0-9a-f]{'{'}3{'}'}-[89ab][0-9a-f]{'{'}3{'}'}-[0-9a-f]{'{'}12{'}'}</code>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-base">Test Your Regex in Real-Time</h3>
          <p className="text-xs text-slate-300 mt-1">Instant match highlighting and capture group inspection.</p>
        </div>
        <Link href="/tools/regex-tester" className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm">
          Open Regex Tester &rarr;
        </Link>
      </div>

      <AdPlaceholder slotId="1122446688" format="horizontal" />
    </article>
  );
}
