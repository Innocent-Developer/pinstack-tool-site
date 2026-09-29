import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Regex Live Tester & Regular Expression Debugger | PinStack',
  description:
    'Test, debug, and explain regular expressions in real-time with syntax matching, flag toggles, capture group inspector, and cheat sheet.',
  keywords: [
    'regex tester',
    'regular expression debugger',
    'test regex online',
    'regex flags',
    'javascript regex tester',
    'regex match highlighter',
    'regex cheat sheet',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/regex-tester`,
  },
  openGraph: {
    title: 'Regex Live Tester & Explainer | PinStack',
    description: 'Interactive real-time regular expression evaluation with capture groups and flags.',
    url: `${siteConfig.url}/tools/regex-tester`,
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack Regex Live Tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Evaluate regular expressions in real-time with capture groups and immediate visual feedback.',
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
