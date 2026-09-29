'use client';

import React, { useEffect } from 'react';
import { siteConfig } from '@/lib/siteConfig';

export const PopunderAd: React.FC = () => {
  useEffect(() => {
    // Inject Popunder script directly into document body on client mount
    if (typeof document !== 'undefined') {
      const existingScript = document.getElementById('adsterra-popunder-script');
      if (!existingScript) {
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
