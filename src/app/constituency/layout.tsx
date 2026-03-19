import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Idemili North & South Constituency Tracker',
  description:
    'Track ongoing grassroots development projects, see town hall schedules, and monitor the progress of Hon. Uchenna Okonkwo in the Idemili Federal Constituency.',
  keywords: ['Idemili North and South Federal Constituency', 'idemili constituency projects', 'Idemili towns'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/constituency',
  },
};

export default function ConstituencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
