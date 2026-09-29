'use client';

import React, { useState, useEffect } from 'react';
import { computeHash, computeHmac, generateUUIDs } from '@/lib/hashUtils';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState('Verify-Webhook-Payload-Data');
  const [secretKey, setSecretKey] = useState('my-api-secret-key');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');
  const [hmacSha256, setHmacSha256] = useState('');
  const [uuidBatch, setUuidBatch] = useState<string[]>([]);

  useEffect(() => {
    computeHash(inputText, 'SHA-256').then(setSha256Hash);
    computeHash(inputText, 'SHA-512').then(setSha512Hash);
    if (secretKey) {
      computeHmac(secretKey, inputText).then(setHmacSha256);
    }
  }, [inputText, secretKey]);

  useEffect(() => {
    setUuidBatch(generateUUIDs(5));
  }, []);

  const refreshUUIDs = () => {
    setUuidBatch(generateUUIDs(5));
  };

  const faqs = [
    {
      question: "What is HMAC-SHA256 used for in web APIs?",
      answer: "HMAC-SHA256 is the cryptographic gold standard for signing webhook events (such as Stripe, GitHub, Shopify, and AWS). It allows the recipient to verify that the payload has not been tampered with in transit."
    },
    {
      question: "Are these hashes generated securely?",
      answer: "Yes. PinStack leverages the browser's native Web Cryptography API (`window.crypto.subtle`), ensuring hardware-accelerated, cryptographically secure randomness and hashing with zero server calls."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Hash & Signature Generator</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          API Signature, SHA-256, HMAC & UUID v4 Generator
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Hardware-accelerated cryptographic utilities running 100% in your browser. Calculate SHA-256 digests, generate HMAC webhook signatures, and batch-create UUIDs.
        </p>
      </div>

      <AdPlaceholder slotId="8899001122" format="horizontal" />

      {/* Main Section */}
      <div className="space-y-6">
        {/* Input Text & Secret */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Payload String / Text to Hash
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              HMAC Secret Key (Optional for HMAC-SHA256)
            </label>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase">SHA-256 Hash</span>
              <CopyButton textToCopy={sha256Hash} label="Copy" />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-blue-700 break-all border border-slate-200">
              {sha256Hash}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase">HMAC-SHA256 Webhook Signature</span>
              <CopyButton textToCopy={hmacSha256} label="Copy" />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-emerald-700 break-all border border-slate-200">
              {hmacSha256}
            </div>
          </div>
        </div>

        {/* UUID Generator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Batch UUID v4 Generator
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={refreshUUIDs}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold"
              >
                Generate New Batch 🔄
              </button>
              <CopyButton textToCopy={uuidBatch.join('\n')} label="Copy All" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {uuidBatch.map((u, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 flex items-center justify-between">
                <span>{u}</span>
                <CopyButton textToCopy={u} label="" className="p-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="1100229933" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
