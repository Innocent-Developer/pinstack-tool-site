'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ToolCard } from '@/components/ToolCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { ReferralBanner } from '@/components/ReferralBanner';
import { SeoFaq } from '@/components/SeoFaq';
import { siteConfig } from '@/lib/siteConfig';
import { TOOLS_DATA, TOOL_CATEGORIES } from '@/lib/toolsData';

export default function DeveloperToolsCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pinnedToolIds, setPinnedToolIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pinstack_pinned');
      if (saved) {
        setPinnedToolIds(JSON.parse(saved));
      } else {
        setPinnedToolIds(['json-to-ts', 'curl-to-code', 'sql-fmt', 'jwt-dbg']);
      }
    } catch (e) {
      setPinnedToolIds(['json-to-ts', 'curl-to-code', 'sql-fmt', 'jwt-dbg']);
    }
  }, []);

  const togglePin = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let updated: string[];
    if (pinnedToolIds.includes(id)) {
      updated = pinnedToolIds.filter((item) => item !== id);
    } else {
      updated = [...pinnedToolIds, id];
    }
    setPinnedToolIds(updated);
    try {
      localStorage.setItem('pinstack_pinned', JSON.stringify(updated));
    } catch (err) {}
  };

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TOOLS_DATA.filter((tool) => {
      const matchesQuery =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.shortTitle.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: TOOLS_DATA.length };
    TOOLS_DATA.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categoryFaqs = [
    {
      question: "What are Client-Side Developer Tools?",
      answer:
        "Client-side developer tools execute 100% inside your web browser engine using native Web APIs (V8, WebCrypto, WebAssembly). Unlike cloud-based tools, no source code, credentials, SQL queries, or JWT tokens are sent over the network to external servers."
    },
    {
      question: "Why should software engineers use zero-exposure dev tools?",
      answer:
        "Enterprise compliance frameworks like US SOC 2 Type II, European GDPR, and UAE PDPL penalize copying sensitive production data or API keys into third-party web tools. Zero-exposure utilities process data locally in memory and discard state upon tab closure."
    },
    {
      question: "Which developer utilities are included in this suite?",
      answer:
        "The suite features 9 core engineering utilities: JSON to TypeScript/Go/Python, cURL to Fetch/Axios/Go, SQL Formatter, JWT Token Debugger, Hash & HMAC Signature Generator, JSON Diff Comparator, Regex Live Tester, Cron Schedule Generator, and Base64 & URL Encoder."
    },
    {
      question: "Are these developer tools completely free without rate limits?",
      answer:
        "Yes, 100% free with unlimited local usage, zero daily caps, and no user registration required. It is maintained by API Test Lab and engineered by Abubakkar Sajid."
    }
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Developer Tools Suite — PinStack',
    url: `${siteConfig.url}/category/developer-tools`,
    description: 'Explore 9+ free client-side developer tools for JSON to TypeScript, cURL to Code, SQL formatting, JWT debugging, Regex testing, and Hash generation with 0ms latency.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: TOOLS_DATA.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.title,
        url: `${siteConfig.url}${tool.href}`,
        description: tool.description,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${siteConfig.url}/#tools` },
      { '@type': 'ListItem', position: 3, name: 'Developer Tools', item: `${siteConfig.url}/category/developer-tools` },
    ],
  };

  return (
    <div className="relative overflow-hidden pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-slate-200">Categories</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Developer Tools</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Complete Client-Side Developer Suite
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                High-Speed Client-Side <span className="text-blue-400">Developer Tools</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Comprehensive suite of 9+ zero-exposure developer utilities. Convert JSON payloads, format SQL queries, debug JWT bearer tokens, parse cURL commands, and compute HMAC hashes with $0 cloud latency and absolute data privacy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 text-left">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="block text-xl font-bold text-white mb-0.5">0ms</span>
                <span className="text-slate-400 text-[11px]">Network Latency</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="block text-xl font-bold text-emerald-400 mb-0.5">100%</span>
                <span className="text-slate-400 text-[11px]">In-Browser Execution</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="block text-xl font-bold text-blue-400 mb-0.5">SOC 2</span>
                <span className="text-slate-400 text-[11px]">Audit Compliant</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="block text-xl font-bold text-violet-400 mb-0.5">GDPR</span>
                <span className="text-slate-400 text-[11px]">Data Sovereignty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <AdPlaceholder slotId="cat-top-ad" format="horizontal" />

        {/* Search & Category Tabs Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search developer tools..."
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 font-medium"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {TOOL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Cards Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>All Interactive Utilities</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                {filteredTools.length} Available
              </span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <span className="text-4xl block mb-3">🔎</span>
              <h3 className="text-base font-bold text-slate-900">No matching developer tools found</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or switching categories.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const isPinned = pinnedToolIds.includes(tool.id);
                return (
                  <div key={tool.id} className="relative group">
                    <ToolCard
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      badge={tool.badge}
                      icon={tool.icon}
                      category={tool.category}
                    />

                    <button
                      type="button"
                      onClick={(e) => togglePin(tool.id, e)}
                      className={`absolute top-6 right-6 p-2 rounded-xl border transition-all duration-150 ${
                        isPinned
                          ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs scale-105'
                          : 'bg-white/90 text-slate-300 border-slate-200 hover:text-blue-600 hover:border-blue-300 hover:scale-105'
                      }`}
                      title={isPinned ? 'Unpin from your stack' : 'Pin to your stack'}
                    >
                      📌
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <ReferralBanner />

        {/* Featured Technical Guides Section */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Engineering Knowledge Hub
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Popular Technical Guides & Documentation</h2>
            <p className="text-xs text-slate-400 mt-1">
              Learn how to implement strict type architectures, decode bearer tokens safely, and optimize cloud API performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/blog/how-to-convert-json-to-typescript-interfaces"
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500 transition-all group"
            >
              <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">TypeScript Architecture</span>
              <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                JSON to TypeScript & Go Struct Guide
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                Translate dynamic API payloads into compile-time type definitions automatically.
              </p>
            </Link>

            <Link
              href="/blog/client-side-jwt-debugging-enterprise-security-guide"
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500 transition-all group"
            >
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Security & Compliance</span>
              <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                Client-Side JWT Debugging Best Practices
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                Inspect OAuth bearer tokens offline without exposing authorization claims in third-party logs.
              </p>
            </Link>

            <Link
              href="/blog/curl-command-to-python-requests-fetch-golang-guide"
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500 transition-all group"
            >
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">API Client Generation</span>
              <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                cURL to Python, JS Fetch & Golang Guide
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                Convert raw cURL terminal commands into production-ready client code across frameworks.
              </p>
            </Link>
          </div>
        </section>

        {/* Category SEO FAQ */}
        <SeoFaq
          title="Frequently Asked Questions About PinStack Developer Tools"
          description="Learn more about our zero-exposure client-side architecture, local execution benefits, and enterprise compliance standards."
          items={categoryFaqs}
        />

        <AdPlaceholder slotId="cat-bottom-ad" format="horizontal" />
      </div>
    </div>
  );
}
