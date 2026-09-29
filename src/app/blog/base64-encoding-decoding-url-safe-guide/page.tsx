import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { ReferralBanner } from '@/components/ReferralBanner';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Base64 Encoding & URL-Safe Encoding: Complete Engineering Guide',
  description: 'Master Base64 binary encoding, base64url padding rules, data URIs, basic auth headers, and web string handling across JavaScript, Python, and Go.',
  keywords: ['base64 encoder', 'base64 decoder online', 'base64url encoding', 'data uri generator', 'url encoding guide'],
  alternates: {
    canonical: `${siteConfig.url}/blog/base64-encoding-decoding-url-safe-guide`,
  },
};

export default function BlogPostBase64() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Base64 Encoding & URL-Safe Encoding: Complete Engineering Guide',
    description: 'Master Base64 binary encoding, base64url padding rules, data URIs, basic auth headers, and web string handling across JavaScript, Python, and Go.',
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: '2026-09-29',
    mainEntityOfPage: `${siteConfig.url}/blog/base64-encoding-decoding-url-safe-guide`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Base64 & URL Encoding Guide', item: `${siteConfig.url}/blog/base64-encoding-decoding-url-safe-guide` },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2 font-medium">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Base64 & URL Encoding</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold mb-4 border border-indigo-200">
          Data Encoding & Web Protocols
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Base64 Encoding & URL-Safe Encoding: Complete Engineering Guide
        </h1>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-3">
          <span>By {siteConfig.authorName}</span>
          <span>•</span>
          <span>September 2026</span>
          <span>•</span>
          <span>6 min read</span>
        </div>
      </header>

      <AdPlaceholder slotId="base64-blog-top" format="horizontal" />

      <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed mt-8">
        <p>
          Base64 encoding is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating 24 bits of data into four 6-bit Base64 characters. It is fundamental in HTTP Basic Authentication, JWT tokens, image Data URIs, and email MIME attachments.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Standard Base64 vs Base64URL Encoding</h2>
        <p>
          Standard Base64 uses the character set <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">A-Z, a-z, 0-9, +, /</code> with <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">=</code> padding. However, because <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">+</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">/</code> have special semantic meanings in URLs, RFC 4648 defined <strong>Base64URL</strong>:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Replaces <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-mono text-xs">+</code> with <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-600 font-mono text-xs">-</code> (hyphen).</li>
          <li>Replaces <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-mono text-xs">/</code> with <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-600 font-mono text-xs">_</code> (underscore).</li>
          <li>Omits trailing <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">=</code> padding characters in JWT headers & signatures.</li>
        </ul>

        <div className="p-4 bg-slate-900 text-indigo-300 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <pre>{`// JavaScript Base64 & Base64URL Encoding
const text = "Hello PinStack & API Test Lab!";
const standardBase64 = btoa(text);
const base64Url = standardBase64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');`}</pre>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Instant In-Browser Encoding & Decoding</h2>
        <p>
          Encode and decode strings, binary arrays, and Data URIs safely without server side-effects using our client-side <Link href="/tools/base64-encoder" className="text-indigo-600 font-semibold underline">Base64 & URL Encoder</Link>.
        </p>
      </div>

      <ReferralBanner variant="full" />

      <div className="mt-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Encode & Decode Base64 Online</h3>
          <p className="text-xs text-slate-600 mt-1">Convert strings to Base64, Base64URL, and URL component encoding instantly.</p>
        </div>
        <Link href="/tools/base64-encoder" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm shrink-0">
          Open Base64 Tool &rarr;
        </Link>
      </div>

      <AdPlaceholder slotId="base64-blog-bottom" format="horizontal" />
    </article>
  );
}
