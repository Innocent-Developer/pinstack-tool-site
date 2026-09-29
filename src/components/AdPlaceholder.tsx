'use client';

import React, { useEffect, useRef } from 'react';

export type AdFormat = 'horizontal' | '728x90' | '300x250' | '320x50' | '160x600' | '160x300' | 'responsive' | 'rectangle' | 'vertical';

interface AdPlaceholderProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
}

const AD_CONFIGS: Record<string, { key: string; width: number; height: number }> = {
  '728x90': {
    key: '0a00d6b56f9b8618fe81f5f63f235768',
    width: 728,
    height: 90,
  },
  '320x50': {
    key: 'f538953f8e3bbbaeaf159ea570774579',
    width: 320,
    height: 50,
  },
  '300x250': {
    key: '1dd1cf307abd2fa36b9e06a4b8095fb3',
    width: 300,
    height: 250,
  },
  '160x600': {
    key: 'b9056214d244c9d2a46b58b4496d38da',
    width: 160,
    height: 600,
  },
  '160x300': {
    key: 'e3b0ce43f0bd3bf56b6c64a6eb70f532',
    width: 160,
    height: 300,
  },
};

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'horizontal',
  className = '',
}) => {
  // If format is horizontal or responsive:
  // Render 728x90 on md/lg screens, and 320x50 on mobile screens
  if (format === 'horizontal' || format === 'responsive') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        {/* Desktop / Tablet: 728x90 */}
        <div className="hidden md:flex flex-col items-center">
          <AdIframe config={AD_CONFIGS['728x90']} />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
            Sponsored Advertisement (728x90)
          </span>
        </div>

        {/* Mobile: 320x50 */}
        <div className="flex md:hidden flex-col items-center">
          <AdIframe config={AD_CONFIGS['320x50']} />
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
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <AdIframe config={AD_CONFIGS['300x250']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (300x250)
        </span>
      </div>
    );
  }

  // Vertical: 160x600
  if (format === '160x600' || format === 'vertical') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <AdIframe config={AD_CONFIGS['160x600']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x600)
        </span>
      </div>
    );
  }

  // 160x300
  if (format === '160x300') {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <AdIframe config={AD_CONFIGS['160x300']} />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
          Sponsored Advertisement (160x300)
        </span>
      </div>
    );
  }

  const selectedConfig = AD_CONFIGS[format] || AD_CONFIGS['728x90'];

  return (
    <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <AdIframe config={selectedConfig} />
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
        Sponsored Advertisement
      </span>
    </div>
  );
};

// Isolated IFrame Loader to prevent script conflicts
const AdIframe: React.FC<{ config: { key: string; width: number; height: number } }> = ({ config }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body, html { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; height: 100%; width: 100%; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${config.key}',
              'format' : 'iframe',
              'height' : ${config.height},
              'width' : ${config.width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highrevenueformat.com/${config.key}/invoke.js"></script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();
  }, [config.key, config.width, config.height]);

  return (
    <iframe
      ref={iframeRef}
      title={`Ad ${config.width}x${config.height}`}
      width={config.width}
      height={config.height}
      style={{
        border: 'none',
        overflow: 'hidden',
        width: `${config.width}px`,
        height: `${config.height}px`,
        maxWidth: '100%',
      }}
      scrolling="no"
    />
  );
};
