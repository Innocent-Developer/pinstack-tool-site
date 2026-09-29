import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { ReferralBanner } from '@/components/ReferralBanner';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'SHA-256, MD5 & HMAC Hashing: Developer Security & Best Practices',
  description: 'Understand cryptographic hash functions, MD5 collision vulnerabilities, SHA-256 integrity verification, and HMAC secret signatures for API security.',
  keywords: ['sha256 generator', 'md5 hash online', 'hmac generator', 'crypto hashing guide', 'api signatures', 'checksum verification'],
  alternates: {
    canonical: `${siteConfig.url}/blog/sha256-md5-hmac-hashing-security-guide`,
  },
};

export default function BlogPostHashing() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'SHA-256, MD5 & HMAC Hashing: Developer Security & Best Practices',
    description: 'Understand cryptographic hash functions, MD5 collision vulnerabilities, SHA-256 integrity verification, and HMAC secret signatures for API security.',
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
    mainEntityOfPage: `${siteConfig.url}/blog/sha256-md5-hmac-hashing-security-guide`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Hashing & HMAC Security', item: `${siteConfig.url}/blog/sha256-md5-hmac-hashing-security-guide` },
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
        <span className="text-slate-800 font-semibold">Cryptographic Hashing & HMAC</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-4 border border-emerald-200">
          Cryptography & API Authentication
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          SHA-256, MD5 & HMAC Hashing: Developer Security & Best Practices
        </h1>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-3">
          <span>By {siteConfig.authorName}</span>
          <span>•</span>
          <span>September 2026</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <AdPlaceholder slotId="hash-blog-top" format="horizontal" />

      <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed mt-8">
        <p>
          Cryptographic hash functions are deterministic algorithms that compress arbitrary binary data into a fixed-length string of hex characters. In modern backend engineering, hashes are used for file checksum verification, database record deduplication, password storage (with salt), and webhook signature validation (HMAC).
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">MD5 vs SHA-256: Security Comparison</h2>
        <p>
          While MD5 (128-bit) was widely used historically, collision vulnerabilities make it unsafe for password storage or cryptographic security. SHA-256 (part of the SHA-2 family) remains the industry gold standard for cryptographic integrity:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Algorithm</th>
                <th className="p-3">Digest Length</th>
                <th className="p-3">Security Level</th>
                <th className="p-3">Primary Use Cases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">MD5</td>
                <td className="p-3">128 bits (32 hex chars)</td>
                <td className="p-3 text-rose-600 font-bold">Broken / Deprecated</td>
                <td className="p-3">Legacy checksums, cache keys</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">SHA-1</td>
                <td className="p-3">160 bits (40 hex chars)</td>
                <td className="p-3 text-amber-600 font-bold">Vulnerable</td>
                <td className="p-3">Git commit IDs (migrating to SHA-256)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">SHA-256</td>
                <td className="p-3">256 bits (64 hex chars)</td>
                <td className="p-3 text-emerald-600 font-bold">Secure (Industry Standard)</td>
                <td className="p-3">TLS certificates, Bitcoin, Webhooks</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">SHA-512</td>
                <td className="p-3">512 bits (128 hex chars)</td>
                <td className="p-3 text-emerald-600 font-bold">Ultra High Security</td>
                <td className="p-3">Financial systems, key derivation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4">HMAC Authentication for Webhooks (Stripe, GitHub, Shopify)</h2>
        <p>
          Hash-based Message Authentication Code (HMAC) combines a cryptographic hash function with a secret key shared between client and server. When a webhook fires, the server calculates <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">HMAC-SHA256(payload, secret_key)</code> and attaches the signature in headers like <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">X-Hub-Signature-256</code>.
        </p>

        <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <pre>{`// Node.js Webhook Signature Verification
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const expectedSignature = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}`}</pre>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Zero-Server In-Browser Hashing</h2>
        <p>
          Calculate SHA-256, SHA-512, MD5, and HMAC signatures safely without sending secret keys or payload data to third-party cloud servers using our client-side <Link href="/tools/hash-generator" className="text-emerald-600 font-semibold underline">Hash & HMAC Generator</Link>.
        </p>
      </div>

      <ReferralBanner variant="full" />

      <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Generate Hashes & HMAC Signatures</h3>
          <p className="text-xs text-slate-600 mt-1">Compute SHA-256, MD5, SHA-512, and secret HMAC signatures in browser.</p>
        </div>
        <Link href="/tools/hash-generator" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm shrink-0">
          Open Hash Generator &rarr;
        </Link>
      </div>

      <AdPlaceholder slotId="hash-blog-bottom" format="horizontal" />
    </article>
  );
}
