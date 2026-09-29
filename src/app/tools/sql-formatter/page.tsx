'use client';

import React, { useState, useEffect } from 'react';
import { formatSQL } from '@/lib/sqlFormatter';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

const sampleSQL = `select u.id, u.username, u.email, count(o.id) as total_orders, sum(o.total_amount) as lifetime_value from users u left join orders o on u.id = o.user_id where u.is_active = 1 and u.created_at >= '2026-01-01' group by u.id, u.username, u.email having count(o.id) > 5 order by lifetime_value desc limit 50;`;

export default function SqlFormatterPage() {
  const [sqlInput, setSqlInput] = useState(sampleSQL);
  const [outputSql, setOutputSql] = useState('');

  useEffect(() => {
    setOutputSql(formatSQL(sqlInput));
  }, [sqlInput]);

  const faqs = [
    {
      question: "Which SQL dialects are supported by this beautifier?",
      answer: "The formatter supports standard ANSI SQL, PostgreSQL, MySQL, SQLite, MariaDB, Snowflake, and Google BigQuery syntax."
    },
    {
      question: "Does the SQL formatter alter query execution logic?",
      answer: "No. The formatting engine strictly normalizes whitespace, adds standard indentation, and capitalizes SQL reserved keywords. Table names, column aliases, and where-clause predicates remain functionally untouched."
    },
    {
      question: "Is it safe to format internal production database queries?",
      answer: "Yes. Processing takes place completely in your client browser via local JavaScript. No queries or schemas are logged or transmitted."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">SQL Formatter</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          SQL Query Formatter & Beautifier
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Format, beautify, and standardize unformatted SQL statements. Automatically align clauses, capitalize keywords, and indent joins for maximum team readability.
        </p>
      </div>

      <AdPlaceholder slotId="4455667788" format="horizontal" />

      {/* Editor Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
          Engine: <span className="text-brand-600 font-semibold">Standard ANSI / PostgreSQL / MySQL</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSqlInput(sampleSQL)}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-brand-600 bg-slate-50 border border-slate-200 rounded-lg"
          >
            Load Sample Query
          </button>
          <button
            onClick={() => setSqlInput('')}
            className="text-xs px-2.5 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Side-by-side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Raw SQL Input
            </span>
          </div>
          <textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Paste your unformatted SQL query here..."
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs sm:text-sm bg-slate-50/50 text-slate-900 border-none outline-none resize-y leading-relaxed focus:bg-white"
            spellCheck={false}
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Formatted & Beautified SQL
            </span>
            <CopyButton textToCopy={outputSql} label="Copy SQL" />
          </div>
          <textarea
            readOnly
            value={outputSql}
            placeholder="Formatted SQL output will appear here..."
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs sm:text-sm bg-slate-900 text-sky-300 border-none outline-none resize-y leading-relaxed custom-scrollbar"
            spellCheck={false}
          />
        </div>
      </div>

      <AdPlaceholder slotId="8877665544" format="horizontal" />

      {/* Technical Documentation */}
      <article className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Why Clean SQL Formatting Matters</h2>
        <p className="text-sm leading-relaxed">
          Unformatted SQL code with mixed casing and inconsistent line breaks is one of the leading contributors to slow code reviews and subtle database query bugs. When multiple developers work on shared repositories, standardizing indentation across <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">JOIN</code> clauses, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">WHERE</code> filters, and subqueries makes performance profiling significantly faster.
        </p>
      </article>

      <SeoFaq items={faqs} />
    </div>
  );
}
