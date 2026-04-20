import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import ResultsSection from './components/ResultsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import FinalCTA from './components/FinalCTA';

export default function HomepagePage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <HeroSection />
      <ServicesPreview />
      <ResultsSection />
      <TestimonialsSection />
      <ProcessSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}