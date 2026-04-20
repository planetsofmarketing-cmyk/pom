import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  );
}