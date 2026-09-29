'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { TOOLS_DATA, TOOL_CATEGORIES } from '@/lib/toolsData';
import { CommandPalette } from '@/components/CommandPalette';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for global custom open event
  useEffect(() => {
    const handleOpenEvent = () => setPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => window.removeEventListener('open-command-palette', handleOpenEvent);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  const categories = TOOL_CATEGORIES.filter((c) => c !== 'All');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/logo.png"
                alt="PinStack Logo"
                className="w-9 h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-slate-900 tracking-tight text-xl">
                    PinStack
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wide">
                    .cc
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
                  Private Dev Tools
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              {/* Tools Mega Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    toolsDropdownOpen || pathname.startsWith('/tools')
                      ? 'bg-slate-100 text-blue-600 font-semibold'
                      : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>Tools</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      toolsDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {toolsDropdownOpen && (
                  <div
                    onMouseLeave={() => setToolsDropdownOpen(false)}
                    className="absolute left-0 top-full mt-2 w-[540px] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>9 Client-Side Interactive Utilities</span>
                      <Link
                        href="/#tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        View All Tools &rarr;
                      </Link>
                    </div>

                    {TOOLS_DATA.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                          {tool.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {tool.shortTitle}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                            {tool.badge}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/#pinned-stack"
                className="px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5"
              >
                <span>📌</span>
                <span>My Stack</span>
              </Link>

              <Link
                href="/blog"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.startsWith('/blog')
                    ? 'bg-slate-100 text-blue-600 font-semibold'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                Guides & Blog
              </Link>

              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === '/about'
                    ? 'bg-slate-100 text-blue-600 font-semibold'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs font-medium border border-slate-200/60 transition-all shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* External API Test Lab badge */}
            <a
              href={siteConfig.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-xs"
            >
              <span>API Test Lab</span>
              <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
            {/* Search in mobile menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPaletteOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search all developer tools...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Categories & Tool Links */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Developer Utilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {TOOLS_DATA.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span className="text-base">{tool.icon}</span>
                    <span className="text-sm font-medium">{tool.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Static pages */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-1 text-sm font-medium text-slate-700">
              <Link
                href="/#pinned-stack"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                📌 My Pinned Stack
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                📚 Technical Guides & Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                ℹ️ About PinStack
              </Link>
            </div>

            {/* Eco system footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <a
                href={siteConfig.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                apitestlab.org &rarr;
              </a>
              <span>Built by <a href={siteConfig.authorUrl} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-semibold hover:underline">abubakkar.dev</a></span>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
