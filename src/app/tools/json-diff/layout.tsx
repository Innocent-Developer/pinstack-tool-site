import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'JSON Diff & API Response Comparator Online | PinStack',
  description:
    'Compare two API JSON responses side-by-side. Spot added keys, removed fields, and mutated values across staging and production in real time.',
  keywords: [
    'json diff',
    'compare json',
    'json comparator',
    'api response diff',
    'json visual diff tool',
    'json difference checker',
    'rest api comparison',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/json-diff`,
  },
  openGraph: {
    title: 'JSON Diff & API Response Comparator | PinStack',
    description: 'Compare two JSON objects side-by-side with visual change detection and key-level highlighting.',
    url: `${siteConfig.url}/tools/json-diff`,
  },
};

export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack JSON Diff Tool',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Compare complex API JSON payloads side-by-side with instantaneous client-side diffing.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
