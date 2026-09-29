import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'SQL Formatter & Beautifier Online (PostgreSQL, MySQL, SQLite) | PinStack',
  description:
    'Format, indent, and prettify messy SQL queries online. Uppercase SQL keywords and clean clause indentation instantly in your browser.',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'format sql query',
    'postgresql formatter',
    'mysql formatter',
    'sqlite formatter',
    'online sql prettifier',
    'sql keyword uppercase',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/sql-formatter`,
  },
  openGraph: {
    title: 'SQL Formatter & Beautifier Online | PinStack',
    description: 'Format, indent, and prettify complex SQL queries across PostgreSQL, MySQL, and BigQuery.',
    url: `${siteConfig.url}/tools/sql-formatter`,
  },
};

export default function SqlFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack SQL Query Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Beautify and format complex SQL statements locally with zero database leak risks.',
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
