'use client';

import React, { useEffect } from 'react';
import { siteConfig } from '@/lib/siteConfig';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'responsive';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = '0000000000',
  format = 'responsive',
  className = '',
}) => {
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // AdSense push error catcher
    }
  }, []);

  let formatClass = 'min-h-[90px] w-full';
  if (format === 'rectangle') formatClass = 'min-h-[250px] w-full max-w-[300px] mx-auto';
  if (format === 'vertical') formatClass = 'min-h-[600px] w-[300px]';

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-100/70 text-center flex flex-col items-center justify-center p-3 text-slate-400 ${formatClass} ${className}`}>
      {/* Production Google AdSense Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={siteConfig.adsensePublisherId}
        data-ad-slot={slotId}
        data-ad-format={format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-600 mt-1">
        Sponsored Advertisement
      </div>
    </div>
  );
};
