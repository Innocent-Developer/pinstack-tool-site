'use client';

import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

export type AdFormat = 'horizontal' | '728x90' | '300x250' | '320x50' | '160x600' | '160x300' | 'responsive' | 'rectangle' | 'vertical';

interface AdPlaceholderProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
}

const AD_CONFIGS: Record<string, { key: string; width: number; height: number; title: string }> = {
  '728x90': {
    key: siteConfig.adsterra.units.leaderboard728x90.key,
    width: siteConfig.adsterra.units.leaderboard728x90.width,
    height: siteConfig.adsterra.units.leaderboard728x90.height,
    title: 'Recommended Developer Cloud & API Stack',
  },
  '320x50': {
    key: siteConfig.adsterra.units.mobile320x50.key,
    width: siteConfig.adsterra.units.mobile320x50.width,
    height: siteConfig.adsterra.units.mobile320x50.height,
    title: 'Dev Cloud Deals',
  },
  '300x250': {
    key: siteConfig.adsterra.units.rectangle300x250.key,
    width: siteConfig.adsterra.units.rectangle300x250.width,
    height: siteConfig.adsterra.units.rectangle300x250.height,
    title: 'Top Backend & Cloud Tools',
  },
  '160x600': {
    key: siteConfig.adsterra.units.skyscraper160x600.key,
    width: siteConfig.adsterra.units.skyscraper160x600.width,
    height: siteConfig.adsterra.units.skyscraper160x600.height,
    title: 'Special Developer Offers',
  },
  '160x300': {
    key: siteConfig.adsterra.units.vertical160x300.key,
    width: siteConfig.adsterra.units.vertical160x300.width,
    height: siteConfig.adsterra.units.vertical160x300.height,
    title: 'Cloud Credits',
  },
};

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'horizontal',
  className = '',
}) => {
  if (format === 'horizontal' || format === 'responsive') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        {/* Desktop / Tablet: 728x90 */}
        <div className="hidden md:flex flex-col items-center">
          <AdBannerBox config={AD_CONFIGS['728x90']} />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
            Sponsored Advertisement (728x90)
          </span>
        </div>

        {/* Mobile: 320x50 */}
        <div className="flex md:hidden flex-col items-center">
          <AdBannerBox config={AD_CONFIGS['320x50']} />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
            Sponsored Advertisement (320x50)
          </span>
        </div>
      </div>
    );
  }

  // Rectangle: 300x250
  if (format === '300x250' || format === 'rectangle') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        <AdBannerBox config={AD_CONFIGS['300x250']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (300x250)
        </span>
      </div>
    );
  }

  // Vertical: 160x600
  if (format === '160x600' || format === 'vertical') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        <AdBannerBox config={AD_CONFIGS['160x600']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x600)
        </span>
      </div>
    );
  }

  // 160x300
  if (format === '160x300') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        <AdBannerBox config={AD_CONFIGS['160x300']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x300)
        </span>
      </div>
    );
  }

  const selectedConfig = AD_CONFIGS[format] || AD_CONFIGS['728x90'];

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <AdBannerBox config={selectedConfig} />
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
        Sponsored Advertisement
      </span>
    </div>
  );
};

// High-Converting Interactive Banner with Fallback & Adsterra Execution
const AdBannerBox: React.FC<{ config: { key: string; width: number; height: number; title: string } }> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      // Set global atOptions explicitly on window object
      (window as any).atOptions = {
        key: config.key,
        format: 'iframe',
        height: config.height,
        width: config.width,
        params: {},
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highrevenueformat.com/${config.key}/invoke.js`;
      script.async = true;

      script.onload = () => {
        setAdLoaded(true);
      };

      container.innerHTML = '';
      container.appendChild(script);
    } catch (e) {
      console.error('Ad load error', e);
    }
  }, [config.key, config.width, config.height]);

  const handleBannerClick = () => {
    window.open(siteConfig.adsterra.smartlink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleBannerClick}
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-blue-200/80 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-center"
      style={{
        width: `${config.width}px`,
        height: `${config.height}px`,
        maxWidth: '100%',
      }}
      title="Click to explore sponsored developer partner offers"
    >
      {/* Visual Rich Fallback / Sponsor Banner Layer (Always visible, guaranteed never blank) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900/90 hover:from-blue-800 hover:to-indigo-900 transition-colors z-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-lg shrink-0">
            ⚡
          </span>
          <div className="truncate text-left">
            <div className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-2 truncate">
              <span>{config.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-200 font-mono font-semibold uppercase">
                Partner
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80 truncate mt-0.5">
              Claim exclusive credits, cloud APIs, and developer tools &rarr;
            </p>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 ml-3 px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold shadow-sm transition-all group-hover:scale-105 flex items-center gap-1"
        >
          <span>Claim Deal</span>
          <span className="text-sm">&rarr;</span>
        </button>
      </div>

      {/* Adsterra Dynamic Script Container (Overlays on top when ad creative is available) */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          maxWidth: '100%',
        }}
      />
    </div>
  );
};
