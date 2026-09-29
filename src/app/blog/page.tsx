import React from 'react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Engineering Blog & Technical Guides',
  description: 'Deep-dives into TypeScript data modeling, SQL query formatting, JWT token security, regular expressions, and DevOps scheduling by Abubakkar Sajid and API Test Lab.',
};

const posts = [
  {
    slug: 'how-to-convert-json-to-typescript-interfaces',
    title: 'How to Convert JSON to TypeScript Interfaces, Go Structs & Python Classes',
    description: 'Learn how to automatically translate dynamic REST API payloads into compile-time type definitions to eliminate runtime type mismatches and accelerate development velocity.',
    date: 'September 2026',
    readTime: '6 min read',
    category: 'TypeScript & Go',
  },
  {
    slug: 'debugging-jwt-tokens-safely',
    title: 'How to Inspect and Debug JWT Tokens Without Leaking Sensitive Secrets',
    description: 'A deep-dive into JSON Web Token architecture. Learn how to verify expiration timestamps, inspect payload claims, and prevent token exposure in remote server logs.',
    date: 'September 2026',
    readTime: '7 min read',
    category: 'API Security',
  },
  {
    slug: 'sql-formatting-best-practices',
    title: 'SQL Formatting & Indentation Standards for High-Velocity Engineering Teams',
    description: 'Why standardizing SQL keyword capitalization, clause indentation, and join ordering streamlines code reviews and prevents subtle database regression bugs.',
    date: 'September 2026',
    readTime: '5 min read',
    category: 'Databases',
  },
  {
    slug: 'master-crontab-syntax-guide',
    title: 'Mastering Crontab Syntax: The Complete 5-Part Cron Schedule Reference',
    description: 'A comprehensive visual reference for Linux crontab expressions, intervals, day-of-week gotchas, and automated task scheduling best practices.',
    date: 'September 2026',
    readTime: '8 min read',
    category: 'DevOps & Cloud',
  },
  {
    slug: 'regex-cheat-sheet-and-real-world-patterns',
    title: 'Regular Expressions Cheat Sheet & Top 10 Production Regex Patterns',
    description: 'A developer cheat sheet covering email validation, URL parsing, alphanumeric bounds, lookaheads, and capture groups across JavaScript, Python, and Go.',
    date: 'September 2026',
    readTime: '9 min read',
    category: 'Development Utilities',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-3 border border-blue-200">
          Engineering Knowledge Hub
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Engineering Guides & Best Practices</h1>
        <p className="mt-2 text-slate-600 text-sm">
          Technical deep-dives, developer utilities tutorials, and API architecture guides curated by <a href={siteConfig.authorUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">{siteConfig.authorName}</a> and the <a href={siteConfig.parentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">apitestlab.org</a> team.
        </p>
      </div>

      <AdPlaceholder slotId="1144778899" format="horizontal" />

      <div className="space-y-6 mt-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {post.description}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <Link href={`/blog/${post.slug}`} className="hover:underline flex items-center gap-1">
                Read Full Guide <span>&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
