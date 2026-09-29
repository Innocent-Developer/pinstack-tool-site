'use client';

import React, { useState, useEffect } from 'react';
import { generateTypeScript, generateGoStruct, generatePythonClass } from '@/lib/jsonToTypes';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

const sampleJSON = `{
  "id": 1042,
  "name": "Acme API Gateway",
  "isActive": true,
  "rateLimit": {
    "requestsPerMinute": 1200,
    "burstAllowance": 100
  },
  "endpoints": [
    {
      "path": "/api/v1/auth",
      "method": "POST",
      "secured": true
    },
    {
      "path": "/api/v1/status",
      "method": "GET",
      "secured": false
    }
  ]
}`;

export default function JsonToTypesPage() {
  const [jsonInput, setJsonInput] = useState(sampleJSON);
  const [rootName, setRootName] = useState('GatewayConfig');
  const [language, setLanguage] = useState<'ts' | 'go' | 'py'>('ts');
  const [outputCode, setOutputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!jsonInput.trim()) {
      setOutputCode('');
      setErrorMsg('');
      return;
    }
    try {
      if (language === 'ts') {
        setOutputCode(generateTypeScript(jsonInput, rootName || 'RootObject'));
      } else if (language === 'go') {
        setOutputCode(generateGoStruct(jsonInput, rootName || 'DataModel'));
      } else {
        setOutputCode(generatePythonClass(jsonInput, rootName || 'DataModel'));
      }
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON syntax');
    }
  }, [jsonInput, rootName, language]);

  const faqs = [
    {
      question: "How does the JSON to TypeScript interface converter work?",
      answer: "The tool recursively traverses the key-value pairs of your JSON object, deduces runtime primitive types (string, number, boolean, array, object), and generates strict, strongly typed interfaces with PascalCase naming."
    },
    {
      question: "Is my JSON payload uploaded to an external server?",
      answer: "No. All conversion logic runs entirely in your browser using pure JavaScript. Your private API responses, user records, and payloads never leave your local machine."
    },
    {
      question: "Can I convert JSON to Go structs or Python dataclasses?",
      answer: "Yes! Switch between the TypeScript, Go, and Python tabs above. Go output includes standard `json:\"fieldName\"` struct tags, and Python output generates modern `@dataclass` definitions."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">JSON to TypeScript</span>
      </nav>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          JSON to TypeScript, Go & Python Converter
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Instantly convert raw JSON payloads into strongly typed TypeScript interfaces, Go structs with JSON tags, or Python dataclasses. Zero latency, 100% client-side privacy.
        </p>
      </div>

      <AdPlaceholder slotId="9988776655" format="horizontal" />

      {/* Editor Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Target Language:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setLanguage('ts')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${language === 'ts' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setLanguage('go')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${language === 'go' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Go Struct
            </button>
            <button
              onClick={() => setLanguage('py')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${language === 'py' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Python Class
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
            Root Name:
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-brand-500 outline-none w-36"
              placeholder="RootModel"
            />
          </label>

          <button
            onClick={() => setJsonInput(sampleJSON)}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-brand-600 bg-slate-50 border border-slate-200 rounded-lg"
          >
            Load Sample
          </button>
          <button
            onClick={() => setJsonInput('')}
            className="text-xs px-2.5 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Side-by-side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> JSON Input
            </span>
            <span className="text-[11px] text-slate-500 font-mono">UTF-8 String</span>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON object or array here..."
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs sm:text-sm bg-slate-50/50 text-slate-900 border-none outline-none resize-y leading-relaxed focus:bg-white"
            spellCheck={false}
          />
          {errorMsg && (
            <div className="p-3 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Generated {language === 'ts' ? 'TypeScript' : language === 'go' ? 'Go' : 'Python'} Types
            </span>
            <CopyButton textToCopy={outputCode} label="Copy Code" />
          </div>
          <textarea
            readOnly
            value={outputCode}
            placeholder="Generated types will appear here in real-time..."
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 border-none outline-none resize-y leading-relaxed custom-scrollbar"
            spellCheck={false}
          />
        </div>
      </div>

      <AdPlaceholder slotId="1234567890" format="horizontal" />

      {/* In-depth Article / Technical Documentation for SEO & AdSense */}
      <article className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Why Generate Static Types from JSON?</h2>
        <p className="text-sm leading-relaxed">
          Modern web applications rely heavily on REST and GraphQL APIs returning dynamic JSON payloads. In dynamically typed environments, accessing undefined nested properties frequently results in runtime exceptions such as <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-mono text-xs">Cannot read properties of undefined</code>.
        </p>
        <p className="text-sm leading-relaxed">
          By converting live API responses directly into compile-time contracts like <strong>TypeScript Interfaces</strong>, <strong>Go Structs</strong>, or <strong>Python Dataclasses</strong>, engineering teams eliminate runtime type mismatches, gain rich IDE autocompletion, and accelerate frontend and backend integration.
        </p>

        <h3 className="text-lg font-bold text-slate-900 pt-2">Key Benefits of Browser-Based Conversion</h3>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li><strong>Zero Sensitive Data Leakage:</strong> Internal authorization tokens, customer PII, and staging database payloads never leave your workstation.</li>
          <li><strong>Deep Object Recursion:</strong> Handles arbitrarily deep arrays, nested dictionaries, and mixed-type collections effortlessly.</li>
          <li><strong>Polyglot Output:</strong> Instant one-click translation between full-stack frameworks (Next.js/React frontend with Go or Python backend).</li>
        </ul>
      </article>

      {/* SEO FAQs */}
      <SeoFaq items={faqs} />
    </div>
  );
}
