import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Base64 & URL Encoder / Decoder Online (UTF-8 Unicode) | PinStack',
  description:
    'Encode and decode Base64 strings, URL components, and binary tokens with full multi-byte UTF-8 Unicode support. Zero data transmission.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'url encoder',
    'url decoder',
    'online base64 converter',
    'utf8 base64',
    'url component encode',
    'base64 binary decoder',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/base64-encoder`,
  },
  openGraph: {
    title: 'Base64 & URL Encoder / Decoder | PinStack',
    description: 'Multi-format encoder and decoder for Base64 and URL components with UTF-8 Unicode support.',
    url: `${siteConfig.url}/tools/base64-encoder`,
  },
};

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack Base64 & URL Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Encode and decode Base64 and URL components directly in your browser.',
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
