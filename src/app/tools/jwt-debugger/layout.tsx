import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'JWT Debugger & Token Inspector Online (Safe & Private) | PinStack',
  description:
    'Decode, inspect, and verify JSON Web Tokens (JWT) in real-time. View headers, payload claims, and expiration timestamps locally without server transmission.',
  keywords: [
    'jwt debugger',
    'decode jwt',
    'jwt inspector',
    'jwt token decoder',
    'verify jwt claims',
    'check jwt expiration',
    'safe jwt decoder',
    'client side jwt viewer',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/jwt-debugger`,
  },
  openGraph: {
    title: 'JWT Token Debugger & Inspector | PinStack',
    description: 'Inspect JSON Web Tokens in the browser with full header, claim, and expiration validation.',
    url: `${siteConfig.url}/tools/jwt-debugger`,
  },
};

export default function JwtDebuggerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack JWT Debugger',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Safely parse, inspect claims, and check expiry of JSON Web Tokens without leaking secrets.',
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
