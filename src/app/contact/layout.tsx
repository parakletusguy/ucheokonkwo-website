import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact the Constituency Office | Hon. Uchenna Okonkwo',
  description:
    'Get in touch with the Idemili North and South Federal Constituency office. Submit inquiries, request town hall sessions, and connect with Hon. Uchenna Okonkwo.',
  keywords: ['idemili federal representative office', 'contact Uchenna Okonkwo', 'Idemili constituency office address'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
