'use client';

import React, { useEffect } from 'react';
import { siteConfig } from '@/lib/siteConfig';

export const PopunderAd: React.FC = () => {
  useEffect(() => {
    // 1. Inject official Adsterra Popunder script into head/body
    if (typeof document !== 'undefined') {
      const existing = document.getElementById('adsterra-popunder-script');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'adsterra-popunder-script';
        script.type = 'text/javascript';
        script.src = siteConfig.adsterra.popunderScript;
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return null;
};
