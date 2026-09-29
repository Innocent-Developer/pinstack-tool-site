'use client';

import React, { useState, useEffect } from 'react';
import { compareJSON, DiffItem } from '@/lib/jsonDiff';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

const sampleA = `{
  "api_version": "v1.2",
  "status": "success",
  "user": {
    "id": 402,
    "name": "Alex Mercer",
    "tier": "free",
    "roles": ["member"]
  }
}`;

const sampleB = `{
  "api_version": "v2.0",
  "status": "success",
  "user": {
    "id": 402,
    "name": "Alex Mercer",
    "tier": "enterprise",
    "roles": ["member", "admin"],
    "credits": 5000
  }
}`;

export default function JsonDiffPage() {
  const [jsonA, setJsonA] = useState(sampleA);
  const [jsonB, setJsonB] = useState(sampleB);
  const [diffs, setDiffs] = useState<DiffItem[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      if (!jsonA.trim() || !jsonB.trim()) {
        setDiffs([]);
        setErrorMsg('');
        return;
      }
      const parsedA = JSON.parse(jsonA);
      const parsedB = JSON.parse(jsonB);
      const result = compareJSON(parsedA, parsedB);
      setDiffs(result);
      setErrorMsg('');
    } catch (e: any) {
      setErrorMsg('Invalid JSON format: ' + e.message);
    }
  }, [jsonA, jsonB]);

  const changesCount = diffs.filter(d => d.type !== 'identical').length;

  const faqs = [
    {
      question: "How does this JSON Diff comparator work?",
      answer: "The tool recursively traverses both JSON objects key-by-key, detecting added properties, deleted properties, and value mutations, highlighting the exact path of each divergence."
    },
    {
      question: "Is it suitable for comparing staging vs. production API responses?",
      answer: "Yes! Paste the response from staging into Left and production into Right to immediately audit schema changes, newly added fields, or broken response types."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">JSON Diff & Comparator</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          JSON Diff & API Response Comparator
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Compare two JSON payloads side-by-side. Spot added keys, removed fields, and value modifications across staging and production API responses.
        </p>
      </div>

      <AdPlaceholder slotId="3344556677" format="horizontal" />

      {/* Status */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Detected Discrepancies: <span className="text-blue-600 font-mono text-sm">{changesCount}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setJsonA(sampleA); setJsonB(sampleB); }}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-blue-600 bg-slate-50 border border-slate-200 rounded-lg"
          >
            Load Sample Payloads
          </button>
        </div>
      </div>

      {/* Side-by-side Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Payload A (Original / Staging)</span>
          </div>
          <textarea
            value={jsonA}
            onChange={(e) => setJsonA(e.target.value)}
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Payload B (New / Production)</span>
          </div>
          <textarea
            value={jsonB}
            onChange={(e) => setJsonB(e.target.value)}
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono rounded-xl mb-6">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Differences List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Detailed Path Differences</h2>
        {diffs.filter(d => d.type !== 'identical').length === 0 ? (
          <p className="text-xs text-slate-500">// Both JSON payloads are identical.</p>
        ) : (
          <div className="space-y-3">
            {diffs.filter(d => d.type !== 'identical').map((d, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  d.type === 'added' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                  d.type === 'removed' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                  'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-white/80">
                    {d.type}
                  </span>
                  <span className="font-bold">{d.path}</span>
                </div>
                <div className="text-[11px]">
                  {d.type === 'modified' && (
                    <span>Was: <code className="bg-white/60 px-1 py-0.5 rounded">{JSON.stringify(d.oldValue)}</code> &rarr; Now: <code className="bg-white/60 px-1 py-0.5 rounded">{JSON.stringify(d.newValue)}</code></span>
                  )}
                  {d.type === 'added' && (
                    <span>Added: <code className="bg-white/60 px-1 py-0.5 rounded">{JSON.stringify(d.newValue)}</code></span>
                  )}
                  {d.type === 'removed' && (
                    <span>Removed: <code className="bg-white/60 px-1 py-0.5 rounded">{JSON.stringify(d.oldValue)}</code></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdPlaceholder slotId="4455667788" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
