import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Hon. Uchenna Okonkwo | Biography & Family',
  description:
    "Learn about the life, career, and track record of Hon. Uchenna 'Harris' Okonkwo, ADC Federal Representative for Idemili North & South, alongside his wife Annie Okonkwo.",
  keywords: ['Uchenna Okonkwo biography', 'Harris Okonkwo', 'Annie Okonkwo', 'Idemili reps track record'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
