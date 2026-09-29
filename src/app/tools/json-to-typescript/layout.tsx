import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'JSON to TypeScript, Go & Python Converter Online | PinStack',
  description:
    'Free online tool to instantly convert JSON payloads into TypeScript interfaces, Go structs with json tags, and Python dataclasses. 100% private in-browser execution.',
  keywords: [
    'json to typescript',
    'json to go',
    'json to python',
    'json to type interface',
    'typescript interface generator',
    'convert json to ts',
    'json to go struct',
    'json to dataclass',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/json-to-typescript`,
  },
  openGraph: {
    title: 'JSON to TypeScript, Go & Python Converter | PinStack',
    description: 'Instantly convert nested JSON into strongly typed TypeScript, Go, and Python models.',
    url: `${siteConfig.url}/tools/json-to-typescript`,
  },
};

export default function JsonToTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack JSON to TypeScript Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Instantly convert dynamic JSON into TypeScript, Go structs, and Python classes in your browser.',
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
