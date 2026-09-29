import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Hash Generator & HMAC Webhook Signer (SHA-256, SHA-512, MD5, UUID) | PinStack',
  description:
    'Hardware-accelerated SHA-256, SHA-512, MD5 hashing, HMAC webhook signature generation, and batch UUID v4 creation directly via Web Crypto API.',
  keywords: [
    'sha256 generator',
    'hmac generator',
    'sha512 online',
    'uuid v4 generator',
    'md5 hash online',
    'web crypto hash',
    'webhook signature signer',
    'hash calculator',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/hash-generator`,
  },
  openGraph: {
    title: 'Hash Generator & HMAC Signer | PinStack',
    description: 'Hardware-accelerated cryptographic digests, HMAC signatures, and UUID generator.',
    url: `${siteConfig.url}/tools/hash-generator`,
  },
};

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack Hash & HMAC Generator',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate high-performance cryptographic hashes, HMAC signatures, and UUIDs locally.',
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
