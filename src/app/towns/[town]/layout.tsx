import type { Metadata } from 'next';

type Props = {
  params: { town: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const townName = params.town.charAt(0).toUpperCase() + params.town.slice(1);

  return {
    title: `${townName} Town Updates | Hon. Uchenna Okonkwo`,
    description: `Development projects, news, and updates for ${townName} from Hon. Uchenna 'Harris' Okonkwo, Federal Representative for Idemili.`,
    keywords: [`${townName} Idemili`, `${townName} constituency projects`, `${townName} reprsentative`],
    alternates: {
      canonical: `https://www.uchennaokonkwo.com/towns/${params.town}`,
    },
  };
}

export default function TownLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
