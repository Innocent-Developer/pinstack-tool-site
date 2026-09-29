import React from 'react';
import { siteConfig } from '@/lib/siteConfig';

interface ReferralBannerProps {
  variant?: 'full' | 'compact' | 'simple';
  className?: string;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'simple') {
    return (
      <div className={`my-8 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-300 ${className}`}>
        <span className="font-semibold text-white">Monetize Your Web Traffic: </span>
        <span>Join Adsterra Publisher Network & earn 5% lifetime referral revenue! </span>
        <a
          href={siteConfig.adsterra.referralLink}
          target="_blank"
          rel="nofollow"
          className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
        >
          <span>Get Invite Link</span> &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className={`my-8 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}>
      <div className="space-y-2 text-center md:text-left flex-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Monetize Your Website
        </span>
        <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-tight">
          Adsterra Publisher Network — Earn 5% Lifetime Revenue
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
          Refer publishers to Adsterra Network and earn 5% lifetime income! The more people you refer, the more revenue you get. High CPM rates, 100% fill rates, and fast payouts.
        </p>
        <div className="pt-1">
          <a
            href={siteConfig.adsterra.referralLink}
            target="_blank"
            rel="nofollow"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Claim Your Referral Link</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center w-full md:w-auto">
        <a
          href={siteConfig.adsterra.referralLink}
          target="_blank"
          rel="nofollow"
          className="group block overflow-hidden rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md"
        >
          <img
            src={siteConfig.adsterra.referralBanner}
            alt="Adsterra Monetize Your Traffic Easily"
            className="max-w-full h-auto rounded-2xl group-hover:scale-[1.01] transition-transform"
          />
        </a>
      </div>
    </div>
  );
};
