import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: string;
  category?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  href,
  badge,
  icon,
  category,
}) => {
  return (
    <Link
      href={href}
      className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:border-blue-400/80 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
            {icon}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-600 border border-slate-200/50 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200/60 transition-colors">
            {badge}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
          {title}
        </h3>
        <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
        <span className="flex items-center gap-1.5">
          <span>Open Tool</span>
        </span>
        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
          &rarr;
        </span>
      </div>
    </Link>
  );
};
