import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Towns in Idemili North & South | Constituency Map',
  description:
    'Explore the development tracking, ongoing projects, and local updates for every town in Idemili North and South Federal Constituency.',
  keywords: ['towns in Idemili', 'Idemili North towns', 'Idemili South towns', 'Anambra State towns'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/towns',
  },
};

export default function TownsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
