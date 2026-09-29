'use client';

import React, { useState, useEffect } from 'react';
import { decodeJWT, DecodedJWT } from '@/lib/jwtDecoder';
import { CopyButton } from '@/components/CopyButton';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';

const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFidWJha2thciBTYWppZCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDebuggerPage() {
  const [tokenInput, setTokenInput] = useState(sampleJWT);
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!tokenInput.trim()) {
      setDecoded(null);
      setErrorMsg('');
      return;
    }
    try {
      const res = decodeJWT(tokenInput);
      setDecoded(res);
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to decode token');
      setDecoded(null);
    }
  }, [tokenInput]);

  const faqs = [
    {
      question: "Is it safe to paste my production JWT token into this debugger?",
      answer: "Yes, because DevTools Lab decodes tokens entirely in your browser using client-side JavaScript. Unlike conventional online debuggers, your token is never transmitted over the network or saved in server logs."
    },
    {
      question: "Can this tool verify the cryptographic signature?",
      answer: "This tool inspects the token structure, header algorithm, expiration timestamps, and payload claims. Cryptographic verification requires your private key or HMAC secret, which should always be kept secure in your private backend."
    },
    {
      question: "What are the common JWT claims like sub, exp, and iat?",
      answer: "`sub` stands for Subject (e.g. User ID), `exp` is the Expiration timestamp in seconds since Unix epoch, and `iat` is the Issued At timestamp."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-2">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">JWT Debugger</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          JSON Web Token (JWT) Inspector & Debugger
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Decode encoded JWTs safely in your browser. Inspect header parameters, payload claims, expiration times, and signature status without exposing sensitive credentials.
        </p>
      </div>

      <AdPlaceholder slotId="3322119988" format="horizontal" />

      {/* Editor & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Token Input (Left Column) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Encoded Token
            </span>
            <button
              onClick={() => setTokenInput(sampleJWT)}
              className="text-xs text-brand-600 hover:underline font-medium"
            >
              Reset Sample
            </button>
          </div>
          <textarea
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Paste encoded JWT here (header.payload.signature)..."
            className="w-full flex-1 min-h-[350px] p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 border-none outline-none resize-y leading-relaxed focus:bg-white"
            spellCheck={false}
          />
          {errorMsg && (
            <div className="p-3 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        {/* Decoded Inspection (Right Column) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Status Badge */}
          {decoded && (
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              decoded.isExpired ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${decoded.isExpired ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                <span className="font-bold text-sm">
                  {decoded.isExpired ? 'Token Expired' : 'Token Valid & Active'}
                </span>
              </div>
              <span className="text-xs font-mono">
                {decoded.expiresAt ? `Expires: ${decoded.expiresAt}` : 'No Expiry Set'}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Header: Algorithm & Token Type
              </span>
              {decoded && <CopyButton textToCopy={JSON.stringify(decoded.header, null, 2)} label="Copy Header" />}
            </div>
            <pre className="p-4 font-mono text-xs text-rose-700 bg-rose-50/20 overflow-x-auto">
              {decoded ? JSON.stringify(decoded.header, null, 2) : '// Decoded header will appear here'}
            </pre>
          </div>

          {/* Payload */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Payload: Claims & User Data
              </span>
              {decoded && <CopyButton textToCopy={JSON.stringify(decoded.payload, null, 2)} label="Copy Payload" />}
            </div>
            <pre className="p-4 font-mono text-xs text-indigo-700 bg-indigo-50/20 overflow-x-auto min-h-[140px]">
              {decoded ? JSON.stringify(decoded.payload, null, 2) : '// Decoded payload claims will appear here'}
            </pre>
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="7766554433" format="horizontal" />

      <SeoFaq items={faqs} />
    </div>
  );
}
