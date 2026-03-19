import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2027 General Elections | Idemili Voter Guide',
  description:
    'Stay updated on the 2027 general elections in Idemili North and South. Find voter registration guides, key dates, and Hon. Uchenna Okonkwo\'s re-election campaign updates.',
  keywords: ['2027 general elections idemili', 'Idemili 2027 elections', 'Uchenna Okonkwo 2027', 'Anambra 2027 elections'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/2027-elections',
  },
};

export default function ElectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
