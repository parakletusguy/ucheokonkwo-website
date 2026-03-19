import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legislative Agenda | Best 10th Assembly Rep',
  description:
    'Review the legislative tracker, sponsored bills, and committee activities of Hon. Uchenna Okonkwo in the 10th National Assembly of Nigeria.',
  keywords: ['idemili reps legislation', 'best 10th assembly rep', '10th assembly bills Nigeria'],
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com/agenda',
  },
};

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
