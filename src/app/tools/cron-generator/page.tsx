'use client';

import React, { useState } from 'react';
import { explainCron } from '@/lib/cronParser';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

export default function CronGeneratorPage() {
  const [expression, setExpression] = useState('0 9 * * 1-5');

  const analysis = explainCron(expression);

  const presets = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Every 15 mins', expr: '*/15 * * * *' },
    { label: 'Every hour on the hour', expr: '0 * * * *' },
    { label: 'Every midnight', expr: '0 0 * * *' },
    { label: 'Weekdays at 9:00 AM', expr: '0 9 * * 1-5' },
    { label: 'First day of month at midnight', expr: '0 0 1 * *' },
    { label: 'Every Sunday at 4:30 AM', expr: '30 4 * * 0' },
  ];

  const faqs = [
    {
      question: "What do the 5 fields of standard cron syntax represent?",
      answer: "From left to right: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, where 0 is Sunday)."
    },
    {
      question: "What does the asterisk (*) and step value (/) signify?",
      answer: "The asterisk denotes 'every' unit (e.g. every minute or every day). A step value like `*/5` in the minute column specifies an interval (e.g. every 5 minutes)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Cron Generator</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cron Expression Schedule Explainer & Generator
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Decode complex crontab timing syntax into plain English sentences. Choose from common schedule presets or craft your own automation trigger.
        </p>
      </div>

      <AdPlaceholder slotId="7711223344" format="horizontal" />

      {/* Input */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Cron Expression (5 Fields)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. 0 9 * * 1-5"
              className="flex-1 px-4 py-3 font-mono text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900"
            />
            <CopyButton textToCopy={expression} label="Copy Cron" />
          </div>
        </div>

        {/* Human Readable Card */}
        <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 text-slate-800">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-1">
            Human Readable Schedule:
          </span>
          <div className="text-xl font-bold text-brand-950">
            {analysis.humanReadable}
          </div>
        </div>

        {/* Breakdown table */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Minute</span>
            <span className="font-mono text-sm font-bold text-slate-800">{analysis.parts.minute || '-'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Hour</span>
            <span className="font-mono text-sm font-bold text-slate-800">{analysis.parts.hour || '-'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Day of Month</span>
            <span className="font-mono text-sm font-bold text-slate-800">{analysis.parts.dayOfMonth || '-'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Month</span>
            <span className="font-mono text-sm font-bold text-slate-800">{analysis.parts.month || '-'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Day of Week</span>
            <span className="font-mono text-sm font-bold text-slate-800">{analysis.parts.dayOfWeek || '-'}</span>
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
            Quick Preset Templates:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setExpression(p.expr)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-slate-700 transition-colors"
              >
                {p.label} (<span className="font-mono text-[11px]">{p.expr}</span>)
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="6655443322" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
