import React from 'react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export const metadata = {
  title: 'SQL Formatting Best Practices for Engineering Teams',
  description: 'Discover standard query formatting conventions across SELECT statements, JOIN clauses, and nested subqueries.',
};

export default function BlogPost3() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">SQL Formatting</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-200">
          Database Engineering
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          SQL Formatting Best Practices for Engineering Teams
        </h1>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-3">
          <span>By Database Architects</span>
          <span>•</span>
          <span>September 2026</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      <AdPlaceholder slotId="3004005006" format="horizontal" />

      <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed mt-8">
        <p>
          Maintaining clean database queries is just as vital as clean application code. In complex data migrations and reporting pipelines, unformatted multi-line SQL queries often conceal syntax errors and inefficient join conditions.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Core Principles of Clean SQL</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Uppercase Reserved Keywords:</strong> Always capitalize <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">SELECT</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">FROM</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">WHERE</code>, and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">GROUP BY</code> to separate database commands from identifiers.</li>
          <li><strong>One Column Per Line in SELECT Clauses:</strong> When selecting multiple columns, format each expression on its own line to make Git diffs readable and unambiguous.</li>
          <li><strong>Indent Conditional Predicates:</strong> Indent <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">AND</code> / <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">OR</code> clauses under their parent <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">WHERE</code> statement.</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-base">Format Your SQL Instantly</h3>
          <p className="text-xs text-slate-300 mt-1">Automatic keyword capitalization and join indentation.</p>
        </div>
        <Link href="/tools/sql-formatter" className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition-colors shadow-sm">
          Open SQL Formatter &rarr;
        </Link>
      </div>

      <AdPlaceholder slotId="7008009001" format="horizontal" />
    </article>
  );
}
