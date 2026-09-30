import React from 'react';
import { siteConfig } from '@/lib/siteConfig';

interface ReferralBannerProps {
  className?: string;
  variant?: 'full' | 'compact' | 'simple';
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ className = '' }) => {
  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center max-w-full">
        <a
          href={siteConfig.adsterra.referralLink}
          target="_blank"
          rel="nofollow"
          className="group block overflow-hidden rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all bg-white"
          title="Monetize Your Website — Join Adsterra Publisher Network"
        >
          <img
            src={siteConfig.adsterra.referralBanner}
            alt="Monetize Your Traffic Easily — Adsterra Network"
            className="w-[728px] max-w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform"
          />
        </a>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span>Adsterra Publisher Partner Link</span>
          <span>•</span>
          <a
            href={siteConfig.adsterra.referralLink}
            target="_blank"
            rel="nofollow"
            className="text-blue-600 hover:underline font-bold"
          >
            Earn 5% Lifetime Revenue &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
