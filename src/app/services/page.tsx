import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from './components/ServicesHero';
import PlanetsGrid from './components/PlanetsGrid';
import ServicesCTA from './components/ServicesCTA';

export default function ServicesPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <ServicesHero />
      <PlanetsGrid />
      <ServicesCTA />
      <Footer />
    </main>
  );
}