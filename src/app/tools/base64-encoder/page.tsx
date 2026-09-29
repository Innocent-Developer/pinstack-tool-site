'use client';

import React, { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

export default function Base64EncoderPage() {
  const [inputText, setInputText] = useState('Hello, API Test Lab!');
  const [mode, setMode] = useState<'base64' | 'url'>('base64');
  const [operation, setOperation] = useState<'encode' | 'decode'>('encode');

  let outputText = '';
  let errorMsg = '';

  try {
    if (mode === 'base64') {
      if (operation === 'encode') {
        outputText = btoa(unescape(encodeURIComponent(inputText)));
      } else {
        outputText = decodeURIComponent(escape(atob(inputText)));
      }
    } else {
      if (operation === 'encode') {
        outputText = encodeURIComponent(inputText);
      } else {
        outputText = decodeURIComponent(inputText);
      }
    }
  } catch (err: any) {
    errorMsg = err.message || 'Error processing string';
  }

  const faqs = [
    {
      question: "What is the difference between Base64 and URL encoding?",
      answer: "Base64 encodes binary or text data into a 64-character ASCII representation for email, headers, or data URLs. URL encoding replaces reserved characters (like spaces, slashes, ampersands) with percent-encoded equivalents (%20, %2F) so they can be safely passed in web addresses."
    },
    {
      question: "Does this tool support international Unicode / UTF-8 characters?",
      answer: "Yes, this tool properly normalizes multi-byte Unicode strings prior to Base64 conversion, ensuring emojis and non-English scripts are encoded and restored without corruption."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Base64 & URL Encoder</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Base64 & URL Encoder / Decoder
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Quickly encode and decode strings and tokens between Plain Text, Base64, and URL percent-encoding with full UTF-8 Unicode character support.
        </p>
      </div>

      <AdPlaceholder slotId="1199228833" format="horizontal" />

      {/* Mode Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setMode('base64')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'base64' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600'}`}
            >
              Base64
            </button>
            <button
              onClick={() => setMode('url')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${mode === 'url' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600'}`}
            >
              URL Encoding
            </button>
          </div>

          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setOperation('encode')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${operation === 'encode' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600'}`}
            >
              Encode
            </button>
            <button
              onClick={() => setOperation('decode')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${operation === 'decode' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-600'}`}
            >
              Decode
            </button>
          </div>
        </div>

        <button
          onClick={() => setInputText('')}
          className="text-xs px-3 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg"
        >
          Clear Input
        </button>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {operation === 'encode' ? 'Input Text' : `Encoded ${mode === 'base64' ? 'Base64' : 'URL'} String`}
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none leading-relaxed"
            placeholder="Type or paste text..."
          />
          {errorMsg && (
            <div className="p-3 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {operation === 'encode' ? `Encoded ${mode === 'base64' ? 'Base64' : 'URL'} Result` : 'Decoded Text'}
            </span>
            <CopyButton textToCopy={outputText} label="Copy Result" />
          </div>
          <textarea
            readOnly
            value={outputText}
            placeholder="Result will appear here..."
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 border-none outline-none leading-relaxed custom-scrollbar"
          />
        </div>
      </div>

      <AdPlaceholder slotId="9911882233" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
