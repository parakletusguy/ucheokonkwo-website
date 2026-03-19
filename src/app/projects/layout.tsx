import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Constituency Projects Tracker | Hon. Uchenna Okonkwo',
  description:
    'Monitor the progress of infrastructure, education, and healthcare constituency projects across Idemili North and South Federal Constituency.',
  keywords: ['idemili constituency projects', 'Idemili North projects', 'Idemili South projects', 'Uchenna Okonkwo projects'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
