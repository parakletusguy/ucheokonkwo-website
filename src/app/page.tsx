import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TerritoryTracker from '@/components/TerritoryTracker';
import LegislativeAgenda from '@/components/LegislativeAgenda';
import TownHall from '@/components/TownHall';
import Footer from '@/components/Footer';

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
