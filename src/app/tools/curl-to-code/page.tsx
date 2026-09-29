'use client';

import React, { useState, useEffect } from 'react';
import { parseCurl, curlToFetch, curlToAxios, curlToPython, curlToGo } from '@/lib/curlParser';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

const sampleCurl = `curl -X POST https://api.apitestlab.org/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sec_tok_991823" \
  -d '{"email":"developer@pinstack.cc","remember":true}'`;

export default function CurlToCodePage() {
  const [curlInput, setCurlInput] = useState(sampleCurl);
  const [lang, setLang] = useState<'fetch' | 'axios' | 'python' | 'go'>('fetch');
  const [generatedCode, setGeneratedCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!curlInput.trim()) {
      setGeneratedCode('');
      setErrorMsg('');
      return;
    }
    try {
      const parsed = parseCurl(curlInput);
      if (lang === 'fetch') setGeneratedCode(curlToFetch(parsed));
      else if (lang === 'axios') setGeneratedCode(curlToAxios(parsed));
      else if (lang === 'python') setGeneratedCode(curlToPython(parsed));
      else if (lang === 'go') setGeneratedCode(curlToGo(parsed));
      setErrorMsg('');
    } catch (e: any) {
      setErrorMsg(e.message || 'Failed to parse cURL command');
    }
  }, [curlInput, lang]);

  const faqs = [
    {
      question: "How does the cURL to Code converter handle headers and payloads?",
      answer: "The parser extracts HTTP methods, query parameters, request headers (-H), and JSON bodies (-d/--data), then formats them using native idiom patterns across JavaScript fetch, Axios, Python requests, or Go net/http."
    },
    {
      question: "Are authorization headers or API keys transmitted remotely?",
      answer: "No. PinStack performs all cURL parsing directly in your web browser. Your private API keys, bearer tokens, and internal endpoints are never transmitted over the internet."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">cURL to Code Converter</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          cURL to Fetch, Axios, Python & Go Code Converter
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Instantly convert raw cURL commands into ready-to-use API client code across JavaScript, TypeScript, Python, and Go. 100% private, client-side execution.
        </p>
      </div>

      <AdPlaceholder slotId="1928374650" format="horizontal" />

      {/* Language Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Target Language:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setLang('fetch')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'fetch' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
            >
              Fetch (JS/TS)
            </button>
            <button
              onClick={() => setLang('axios')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'axios' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
            >
              Axios
            </button>
            <button
              onClick={() => setLang('python')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'python' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
            >
              Python (Requests)
            </button>
            <button
              onClick={() => setLang('go')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${lang === 'go' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
            >
              Go (net/http)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurlInput(sampleCurl)}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-blue-600 bg-slate-50 border border-slate-200 rounded-lg"
          >
            Load Sample
          </button>
          <button
            onClick={() => setCurlInput('')}
            className="text-xs px-2.5 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> cURL Command
            </span>
          </div>
          <textarea
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            placeholder="Paste your cURL command here (curl -X POST https://...)"
            className="w-full flex-1 min-h-[360px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none leading-relaxed"
            spellCheck={false}
          />
          {errorMsg && (
            <div className="p-3 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Generated Code ({lang.toUpperCase()})
            </span>
            <CopyButton textToCopy={generatedCode} label="Copy Code" />
          </div>
          <textarea
            readOnly
            value={generatedCode}
            placeholder="Generated client code will appear here..."
            className="w-full flex-1 min-h-[360px] p-4 font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 border-none outline-none leading-relaxed custom-scrollbar"
            spellCheck={false}
          />
        </div>
      </div>

      <AdPlaceholder slotId="9876543210" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
