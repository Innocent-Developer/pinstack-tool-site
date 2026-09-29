'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
  if (format === 'horizontal' || format === 'responsive') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        {/* Desktop / Tablet: 728x90 */}
        <div className="hidden md:flex flex-col items-center">
          <AdFrame keyId={AD_CONFIGS['728x90'].key} width={728} height={90} />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
            Sponsored Advertisement (728x90)
          </span>
        </div>

        {/* Mobile: 320x50 */}
        <div className="flex md:hidden flex-col items-center">
          <AdFrame keyId={AD_CONFIGS['320x50'].key} width={320} height={50} />
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
        <AdFrame keyId={AD_CONFIGS['300x250'].key} width={300} height={250} />
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
        <AdFrame keyId={AD_CONFIGS['160x600'].key} width={160} height={600} />
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
        <AdFrame keyId={AD_CONFIGS['160x300'].key} width={160} height={300} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x300)
        </span>
      </div>
    );
  }

  const selected = AD_CONFIGS[format] || AD_CONFIGS['728x90'];

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <AdFrame keyId={selected.key} width={selected.width} height={selected.height} />
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
        Sponsored Advertisement
      </span>
    </div>
  );
};

// Route-Aware & Reload-Fresh Ad Frame
const AdFrame: React.FC<{ keyId: string; width: number; height: number }> = ({
  keyId,
  width,
  height,
}) => {
  const pathname = usePathname();
  const [frameKey, setFrameKey] = useState(() => `${keyId}-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    // Generate fresh key on route change or reload to force fresh iframe recreation
    setFrameKey(`${keyId}-${pathname}-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  }, [pathname, keyId]);

  const adHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <style>
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${keyId}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/${keyId}/invoke.js"></script>
  </body>
</html>`;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
      }}
      className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 shadow-2xs bg-slate-50"
    >
      <iframe
        key={frameKey}
        srcDoc={adHtml}
        width={width}
        height={height}
        title={`Adsterra ${width}x${height}`}
        style={{
          border: 'none',
          overflow: 'hidden',
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
        }}
        scrolling="no"
      />
    </div>
  );
};
