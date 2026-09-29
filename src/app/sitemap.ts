import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/tools/json-to-typescript', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/curl-to-code', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/sql-formatter', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/jwt-debugger', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/hash-generator', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/json-diff', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/regex-tester', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/cron-generator', priority: 0.9, freq: 'weekly' as const },
    { path: '/tools/base64-encoder', priority: 0.9, freq: 'weekly' as const },
    { path: '/blog', priority: 0.8, freq: 'daily' as const },
    { path: '/blog/how-to-convert-json-to-typescript-interfaces', priority: 0.8, freq: 'monthly' as const },
    { path: '/blog/debugging-jwt-tokens-safely', priority: 0.8, freq: 'monthly' as const },
    { path: '/blog/sql-formatting-best-practices', priority: 0.8, freq: 'monthly' as const },
    { path: '/blog/master-crontab-syntax-guide', priority: 0.8, freq: 'monthly' as const },
    { path: '/blog/regex-cheat-sheet-and-real-world-patterns', priority: 0.8, freq: 'monthly' as const },
    { path: '/about', priority: 0.6, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.5, freq: 'monthly' as const },
    { path: '/terms', priority: 0.5, freq: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
