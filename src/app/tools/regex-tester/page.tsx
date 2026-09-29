'use client';

import React, { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    'Contact support at help@apitestlab.org or admin@domain.com for questions regarding order #42981.'
  );

  let matches: string[] = [];
  let errorMsg = '';

  try {
    if (pattern) {
      const reg = new RegExp(pattern, flags);
      const found = testString.match(reg);
      matches = found ? Array.from(found) : [];
    }
  } catch (err: any) {
    errorMsg = err.message || 'Invalid Regular Expression';
  }

  const faqs = [
    {
      question: "How do regex flags work?",
      answer: "`g` enables global search to find all occurrences, `i` ignores case sensitivity, `m` enables multi-line matching, and `s` (dotAll) allows the dot operator to match newlines."
    },
    {
      question: "Can I test regex patterns for Python, JavaScript, and Go?",
      answer: "Yes. JavaScript regular expressions follow the standard ECMAScript regex specifications, which are broadly compatible with Python re, Go regexp, and PCRE engines."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Regex Tester</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Regex Live Tester & Expression Debugger
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Build, test, and debug regular expressions in real-time. Inspect matches, count occurrences, and toggle flags with instant visual feedback.
        </p>
      </div>

      <AdPlaceholder slotId="1029384756" format="horizontal" />

      {/* Regex Input Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-base">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Insert regex pattern..."
              className="w-full pl-8 pr-4 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-base">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags (g, i, m)"
              className="w-24 px-3 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="text-xs text-rose-600 font-mono bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            ⚠️ {errorMsg}
          </div>
        )}
      </div>

      {/* Test String & Live Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Test String</span>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full flex-1 min-h-[250px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none leading-relaxed"
            placeholder="Type or paste sample text to test matches against..."
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Matches Found: <span className="text-emerald-700 font-bold">{matches.length}</span>
            </span>
            <CopyButton textToCopy={matches.join('\n')} label="Copy Matches" />
          </div>
          <div className="p-4 flex-1 min-h-[250px] bg-slate-900 text-slate-200 font-mono text-xs sm:text-sm overflow-y-auto custom-scrollbar">
            {matches.length === 0 ? (
              <span className="text-slate-500">// No matches found</span>
            ) : (
              <ol className="list-decimal pl-5 space-y-1 text-emerald-400">
                {matches.map((m, idx) => (
                  <li key={idx} className="bg-slate-800/60 px-2 py-1 rounded">
                    "{m}"
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="5647382910" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
