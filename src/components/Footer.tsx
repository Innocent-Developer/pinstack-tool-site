import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { TOOLS_DATA } from '@/lib/toolsData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Adsterra Referral Invite Banner Section (Last on Web) */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <a
            href={siteConfig.adsterra.referralLink}
            target="_blank"
            rel="nofollow"
            className="group block overflow-hidden rounded-xl border border-slate-800 shadow-md hover:border-emerald-500/60 transition-all bg-slate-900"
            title="Monetize Your Traffic Easily — Adsterra Publisher Network"
          >
            <img
              src={siteConfig.adsterra.referralBanner}
              alt="Monetize Your Traffic Easily — Adsterra Publisher Network"
              className="w-[728px] max-w-full h-auto rounded-xl group-hover:scale-[1.01] transition-transform"
            />
          </a>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>Refer publishers to Adsterra Network & earn 5% lifetime revenue</span>
            <span>•</span>
            <a
              href={siteConfig.adsterra.referralLink}
              target="_blank"
              rel="nofollow"
              className="text-emerald-400 hover:underline font-bold"
            >
              Get Referral Link &rarr;
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-white font-extrabold text-xl">
              <img
                src="/logo.png"
                alt="PinStack Logo"
                className="w-8 h-8 rounded-xl object-contain shadow-xs"
              />
              <span>PinStack<span className="text-blue-500">.cc</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An ultra-fast client-side utility suite by{' '}
              <a
                href={siteConfig.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-semibold"
              >
                apitestlab.org
              </a>
              . Built with care by{' '}
              <a
                href={siteConfig.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline font-semibold"
              >
                {siteConfig.authorName} (abubakkar.dev)
              </a>
              .
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-[11px] text-emerald-400 border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                100% In-Browser Execution • $0 Latency
              </span>
            </div>
          </div>

          {/* Column 2: All 9 Interactive Utilities */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Developer Utilities</h4>
            <ul className="space-y-2 text-xs">
              {TOOLS_DATA.map((tool) => (
                <li key={tool.id}>
                  <Link href={tool.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-slate-500">{tool.icon}</span>
                    <span>{tool.shortTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engineering Guides */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Engineering Guides</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="hover:text-white transition-colors">All Technical Guides</Link></li>
              <li><Link href="/blog/how-to-convert-json-to-typescript-interfaces" className="hover:text-white transition-colors">JSON to TypeScript Guide</Link></li>
              <li><Link href="/blog/debugging-jwt-tokens-safely" className="hover:text-white transition-colors">JWT Token Security Guide</Link></li>
              <li><Link href="/blog/sql-formatting-best-practices" className="hover:text-white transition-colors">SQL Formatting Standards</Link></li>
              <li><Link href="/blog/master-crontab-syntax-guide" className="hover:text-white transition-colors">Mastering Crontab Expressions</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-and-real-world-patterns" className="hover:text-white transition-colors">Regex Cheat Sheet & Patterns</Link></li>
            </ul>
          </div>

          {/* Column 4: Platform & Legal */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Platform & Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About PinStack</Link></li>
              <li>
                <a href={siteConfig.parentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>API Test Lab Portal</span>
                  <span className="text-slate-500">&rarr;</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.authorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Abubakkar Sajid (abubakkar.dev)</span>
                  <span className="text-slate-500">&rarr;</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.adsterra.referralLink}
                  target="_blank"
                  rel="nofollow"
                  className="hover:text-emerald-400 text-emerald-400/90 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Adsterra Partner (5% Earnings)</span>
                  <span className="text-emerald-500 text-xs">&rarr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} PinStack.cc. A free utility suite by{' '}
            <a href="https://apitestlab.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              apitestlab.org
            </a>
            , engineered by{' '}
            <a href="https://abubakkar.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Abubakkar Sajid
            </a>
            .
          </p>
          <p className="mt-2 sm:mt-0">Private & Local In-Browser Computation</p>
        </div>
      </div>
    </footer>
  );
};
