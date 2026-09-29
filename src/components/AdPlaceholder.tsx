'use client';

import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

export type AdFormat = 'horizontal' | '728x90' | '300x250' | '320x50' | '160x600' | '160x300' | 'responsive' | 'rectangle' | 'vertical';

interface AdPlaceholderProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
}

const AD_CONFIGS: Record<string, { key: string; width: number; height: number }> = {
  '728x90': {
    key: siteConfig.adsterra.units.leaderboard728x90.key,
    width: siteConfig.adsterra.units.leaderboard728x90.width,
    height: siteConfig.adsterra.units.leaderboard728x90.height,
  },
  '320x50': {
    key: siteConfig.adsterra.units.mobile320x50.key,
    width: siteConfig.adsterra.units.mobile320x50.width,
    height: siteConfig.adsterra.units.mobile320x50.height,
  },
  '300x250': {
    key: siteConfig.adsterra.units.rectangle300x250.key,
    width: siteConfig.adsterra.units.rectangle300x250.width,
    height: siteConfig.adsterra.units.rectangle300x250.height,
  },
  '160x600': {
    key: siteConfig.adsterra.units.skyscraper160x600.key,
    width: siteConfig.adsterra.units.skyscraper160x600.width,
    height: siteConfig.adsterra.units.skyscraper160x600.height,
  },
  '160x300': {
    key: siteConfig.adsterra.units.vertical160x300.key,
    width: siteConfig.adsterra.units.vertical160x300.width,
    height: siteConfig.adsterra.units.vertical160x300.height,
  },
};

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'horizontal',
  className = '',
}) => {
  // If format is horizontal or responsive:
  if (format === 'horizontal' || format === 'responsive') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        {/* Desktop / Tablet: 728x90 */}
        <div className="hidden md:flex flex-col items-center">
          <AdDirectScript config={AD_CONFIGS['728x90']} />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
            Sponsored Advertisement (728x90)
          </span>
        </div>

        {/* Mobile: 320x50 */}
        <div className="flex md:hidden flex-col items-center">
          <AdDirectScript config={AD_CONFIGS['320x50']} />
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
        <AdDirectScript config={AD_CONFIGS['300x250']} />
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
        <AdDirectScript config={AD_CONFIGS['160x600']} />
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
        <AdDirectScript config={AD_CONFIGS['160x300']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x300)
        </span>
      </div>
    );
  }

  const selectedConfig = AD_CONFIGS[format] || AD_CONFIGS['728x90'];

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <AdDirectScript config={selectedConfig} />
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
        Sponsored Advertisement
      </span>
    </div>
  );
};

// Direct Page-Context Script Loader (Adsterra verified domain pinstack.cc)
const AdDirectScript: React.FC<{ config: { key: string; width: number; height: number } }> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset container
    container.innerHTML = '';

    // Create wrapper div
    const adWrapper = document.createElement('div');
    adWrapper.id = `ad-container-${config.key}-${Math.random().toString(36).substring(7)}`;
    adWrapper.style.width = `${config.width}px`;
    adWrapper.style.height = `${config.height}px`;
    adWrapper.style.maxWidth = '100%';
    adWrapper.style.display = 'flex';
    adWrapper.style.justifyContent = 'center';
    adWrapper.style.alignItems = 'center';

    // Script 1: Config
    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : '${config.key}',
        'format' : 'iframe',
        'height' : ${config.height},
        'width' : ${config.width},
        'params' : {}
      };
    `;

    // Script 2: Invoke
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highrevenueformat.com/${config.key}/invoke.js`;
    invokeScript.async = true;

    adWrapper.appendChild(confScript);
    adWrapper.appendChild(invokeScript);
    container.appendChild(adWrapper);

    setLoaded(true);
  }, [config.key, config.width, config.height]);

  return (
    <div className="relative group cursor-pointer">
      {/* Ad Container with minimum dimensions matching ad */}
      <div
        ref={containerRef}
        style={{
          minWidth: `${Math.min(config.width, 320)}px`,
          minHeight: `${config.height}px`,
          width: `${config.width}px`,
          height: `${config.height}px`,
          maxWidth: '100%',
        }}
        className="rounded-xl overflow-hidden flex items-center justify-center bg-slate-100/60 border border-slate-200/80 shadow-2xs transition-all"
      />
    </div>
  );
};
