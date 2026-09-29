import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Cron Expression Schedule Generator & Crontab Descriptor | PinStack',
  description:
    'Translate cryptic 5-part cron schedules into natural English sentences and calculate future execution timelines in your browser.',
  keywords: [
    'cron expression generator',
    'crontab generator',
    'cron schedule builder',
    'cron translator',
    'linux crontab syntax',
    'crontab guru alternative',
    'cron job descriptor',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/cron-generator`,
  },
  openGraph: {
    title: 'Cron Expression Schedule Generator | PinStack',
    description: 'Translate cryptic cron schedules into human-readable English and calculate upcoming runs.',
    url: `${siteConfig.url}/tools/cron-generator`,
  },
};

export default function CronGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinStack Cron Generator',
    applicationCategory: 'DevOpsApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Build, validate, and convert crontab expressions into natural language schedules.',
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
