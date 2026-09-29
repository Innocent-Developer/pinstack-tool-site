'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ToolCard } from '@/components/ToolCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SeoFaq } from '@/components/SeoFaq';
import { siteConfig } from '@/lib/siteConfig';
import { TOOLS_DATA, TOOL_CATEGORIES, ToolItem } from '@/lib/toolsData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pinnedToolIds, setPinnedToolIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
    setIsLoaded(true);
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

  const resetDefaultPinned = () => {
    const defaults = ['json-to-ts', 'curl-to-code', 'sql-fmt', 'jwt-dbg'];
    setPinnedToolIds(defaults);
    try {
      localStorage.setItem('pinstack_pinned', JSON.stringify(defaults));
    } catch (e) {}
  };

  const clearAllPinned = () => {
    setPinnedToolIds([]);
    try {
      localStorage.setItem('pinstack_pinned', JSON.stringify([]));
    } catch (e) {}
  };

  // Filter tools based on search and category
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

  const pinnedTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => pinnedToolIds.includes(t.id));
  }, [pinnedToolIds]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: TOOLS_DATA.length };
    TOOLS_DATA.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const homeFaqs = [
    {
      question: "What is PinStack and who created it?",
      answer:
        "PinStack (pinstack.cc) is a high-speed, private developer utility platform engineered by Abubakkar Sajid (abubakkar.dev) and part of the apitestlab.org ecosystem. It provides 9 essential client-side tools designed for software engineers, API developers, and backend architects."
    },
    {
      question: "Why are client-side developer tools better than traditional cloud converters?",
      answer:
        "Client-side tools run directly on your machine inside the browser via Web Crypto, V8, and Web APIs. That means sub-millisecond response times, zero server latency, and absolute privacy since your private API tokens, database queries, and credentials are never transmitted over the internet."
    },
    {
      question: "How does the 'My Pinned Stack' feature work?",
      answer:
        "Click the pin icon (📌) on any tool card to pin it to your personal quick-access dashboard. Your configuration is remembered across sessions via local browser storage (localStorage) without requiring account creation or logins."
    },
    {
      question: "Is PinStack completely free to use?",
      answer:
        "Yes, 100% free with no rate limits, no account signups, and zero usage fees. All utilities run client-side for maximum developer convenience."
    }
  ];

  return (
    <div className="relative overflow-hidden pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent pointer-events-none -z-10 blur-3xl" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-10 text-center relative">
        {/* Ecosystem Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-700 text-xs font-semibold mb-6 hover:border-blue-300 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>A Free Utility Suite by</span>
          <a
            href={siteConfig.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-bold"
          >
            apitestlab.org
          </a>
          <span className="text-slate-300">•</span>
          <span>Built by</span>
          <a
            href={siteConfig.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800 hover:text-blue-600 hover:underline font-bold"
          >
            abubakkar.dev
          </a>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Pin Your Daily{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Developer Tool Stack.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Ultra-fast, 100% client-side converters, formatters, and debuggers. Pin your essential tools to the top for instant sub-millisecond execution with complete local privacy.
        </p>

        {/* Search Bar with Keyboard Shortcut */}
        <div className="mt-8 max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 rounded-2xl blur-md group-hover:blur-lg transition-all opacity-70" />
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all overflow-hidden">
            <svg
              className="w-5 h-5 text-slate-400 ml-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 9 developer tools (e.g. JSON to TypeScript, cURL, SQL, JWT, Hash)..."
              className="w-full px-4 py-3.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Clear search"
              >
                ✕
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const evt = new CustomEvent('open-command-palette');
                  window.dispatchEvent(evt);
                }}
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-2 py-1 text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/60"
                title="Open Command Palette"
              >
                <span>⌘K</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {TOOL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Value Prop Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10 text-left">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-xl">🔒</span>
            <div>
              <div className="text-xs font-bold text-slate-900">100% In-Browser</div>
              <div className="text-[11px] text-slate-500">Zero data leaves device</div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <div className="text-xs font-bold text-slate-900">0ms Cloud Latency</div>
              <div className="text-[11px] text-slate-500">Sub-millisecond runtime</div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-xl">📌</span>
            <div>
              <div className="text-xs font-bold text-slate-900">Personal Stack</div>
              <div className="text-[11px] text-slate-500">Persistent quick dock</div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-xl">💻</span>
            <div>
              <div className="text-xs font-bold text-slate-900">Polyglot Generators</div>
              <div className="text-[11px] text-slate-500">TS, Go, Python, cURL</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <AdPlaceholder slotId="1122334455" format="horizontal" />

        {/* Pinned Stack Section */}
        <section
          id="pinned-stack"
          className="relative bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm">
                📌
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    My Pinned Stack
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                    {pinnedTools.length} Pinned
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your customized high-frequency developer toolbar (stored in local browser)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium self-end sm:self-auto">
              <button
                type="button"
                onClick={resetDefaultPinned}
                className="px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                title="Reset to default 4 tools"
              >
                Reset Default
              </button>
              {pinnedTools.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllPinned}
                  className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Clear all pinned tools"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {pinnedTools.length === 0 ? (
            <div className="bg-white/80 rounded-2xl border border-dashed border-blue-300 p-8 text-center">
              <span className="text-3xl block mb-2">📌</span>
              <p className="text-sm font-semibold text-slate-800">No utilities currently pinned</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the 📌 icon on any tool card below to add it to your quick-access stack.
              </p>
              <button
                type="button"
                onClick={resetDefaultPinned}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition-all"
              >
                <span>Pin Popular Defaults</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pinnedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="relative group bg-white p-4 rounded-2xl border border-blue-200/80 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all flex items-center justify-between"
                >
                  <Link href={tool.href} className="flex items-center gap-3 min-w-0 pr-8 flex-1">
                    <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                      {tool.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                        {tool.shortTitle}
                      </h3>
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block truncate">
                        {tool.badge}
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => togglePin(tool.id, e)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Unpin from stack"
                  >
                    📌
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Tools Grid Section */}
        <section id="tools" className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Available Developer Utilities</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Click 📌 on any utility to pin or unpin from your top toolbar
              </p>
            </div>

            {searchQuery && (
              <div className="text-xs text-slate-500">
                Filtered by: <strong className="text-slate-800">"{searchQuery}"</strong>
              </div>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <span className="text-4xl block mb-3">🔎</span>
              <h3 className="text-base font-bold text-slate-900">No matching developer tools</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query or switching the category filter.
              </p>
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

                    {/* Pin button inside card top right */}
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

        <AdPlaceholder slotId="5544332211" format="horizontal" />

        {/* SEO FAQs */}
        <SeoFaq
          title="Frequently Asked Questions About PinStack"
          description="Learn more about our client-side developer utility architecture, privacy standards, and API Test Lab foundation."
          items={homeFaqs}
        />
      </div>
    </div>
  );
}
