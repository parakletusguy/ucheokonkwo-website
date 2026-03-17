import Header from '@/components/Header';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const TerritoryTracker = dynamic(() => import('@/components/TerritoryTracker'));
const LegislativeAgenda = dynamic(() => import('@/components/LegislativeAgenda'));
const TownHall = dynamic(() => import('@/components/TownHall'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main>
        <Hero />
        <TerritoryTracker />
        <LegislativeAgenda />
        <TownHall />
      </main>
      <Footer />
    </>
  );
}
