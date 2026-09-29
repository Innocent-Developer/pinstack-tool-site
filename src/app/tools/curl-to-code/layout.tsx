import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'cURL to Code Converter (JavaScript, Fetch, Axios, Python, Go) | PinStack',
  description:
    'Convert cURL commands to JavaScript Fetch, Axios, Python Requests, and Go net/http code online. Zero server transmission with instant client-side generation.',
  keywords: [
    'curl to code',
    'curl to python',
    'curl to fetch',
    'curl to axios',
    'curl to javascript',
    'curl to go',
    'curl command converter',
    'api client generator',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/curl-to-code`,
  },
  openGraph: {
    title: 'cURL to Code Converter | PinStack',
    description: 'Transform cURL commands into production-ready API client code across JavaScript, Python, and Go.',
    url: `${siteConfig.url}/tools/curl-to-code`,
  },
};

export default function CurlToCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack cURL to Code Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Convert cURL requests into production-grade Python, Node.js, Axios, Fetch, and Go code.',
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
