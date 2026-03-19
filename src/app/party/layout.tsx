import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'African Democratic Congress (ADC) | Our Values',
  description:
    'Learn about the Action Democratic Congress (ADC) and how Hon. Uchenna Okonkwo is advancing the party\'s philosophy in Idemili North and South.',
  keywords: ['ADC', 'Action Democratic Congress Nigeria', 'ADC Anambra', 'ADC Idemili'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/party',
  },
};

export default function PartyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
