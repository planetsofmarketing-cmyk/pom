'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const services = [
  {
    name: 'SEO & Search',
    planet: 'Mercury',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #FED7AA 0%, #F97316 40%, #7C2D12 80%)',
    size: 'w-16 h-16',
    desc: 'Rank #1 on Google with technical SEO and content strategies that compound over time.',
    icon: '🔍',
  },
  {
    name: 'Social Media',
    planet: 'Venus',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #E9D5FF 0%, #A855F7 40%, #4C1D95 80%)',
    size: 'w-20 h-20',
    desc: 'Build communities that convert. Instagram, LinkedIn, and Meta strategies with real engagement.',
    icon: '📡',
  },
  {
    name: 'Paid Advertising',
    planet: 'Mars',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #FECACA 0%, #EF4444 40%, #7F1D1D 80%)',
    size: 'w-14 h-14',
    desc: 'Google, Meta, and LinkedIn ads that spend ₹1 to make ₹3+. Precision targeting.',
    icon: '🚀',
  },
  {
    name: 'Brand Strategy',
    planet: 'Jupiter',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #FDE68A 0%, #F59E0B 30%, #92400E 70%, #451A03 90%)',
    size: 'w-28 h-28',
    desc: 'The largest force in your solar system. Define who you are and why clients choose you.',
    icon: '🪐',
  },
  {
    name: 'Content Marketing',
    planet: 'Saturn',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #A7F3D0 0%, #10B981 40%, #064E3B 80%)',
    size: 'w-22 h-22',
    desc: 'Blogs, videos, and copy that educate, attract, and convert your ideal clients.',
    icon: '✍️',
  },
  {
    name: 'Email Marketing',
    planet: 'Uranus',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #BAE6FD 0%, #38BDF8 40%, #0C4A6E 80%)',
    size: 'w-16 h-16',
    desc: 'Automated sequences and campaigns with open rates that actually open doors.',
    icon: '📧',
  },
  {
    name: 'Web Design',
    planet: 'Neptune',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.6)',
    gradient: 'radial-gradient(circle at 35% 35%, #C7D2FE 0%, #6366F1 40%, #312E81 80%)',
    size: 'w-18 h-18',
    desc: 'Websites that load fast, look stunning, and convert visitors into paying clients.',
    icon: '🌐',
  },
  {
    name: 'Analytics',
    planet: 'Pluto',
    color: '#94A3B8',
    glow: 'rgba(148,163,184,0.4)',
    gradient: 'radial-gradient(circle at 35% 35%, #E2E8F0 0%, #94A3B8 40%, #1E293B 80%)',
    size: 'w-10 h-10',
    desc: 'Real-time dashboards. No surprises, no guesswork — just clear data and clear decisions.',
    icon: '📊',
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label block mb-4">Our Solar System</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            8 Planets. One Mission.
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light leading-relaxed">
            Each service is a planet in your marketing solar system — distinct, powerful, and perfectly aligned to orbit your growth.
          </p>
        </div>

        {/* Bento Grid */}
        {/* STEP 1: 8 cards: SEO, Social Media, Paid Ads, Brand Strategy, Content, Email, Web Design, Analytics */}
        {/* STEP 2: 
          Row 1 (col-span-4): [col-1: SEO cs-1] [col-2: Social Media cs-1] [col-3: Paid Ads cs-1] [col-4: Brand Strategy cs-1 rs-2]
          Row 2 (col-span-4): [col-1: Content cs-2] [col-3: Email cs-1] [col-4: Brand Strategy (continued)]
          Row 3 (col-span-4): [col-1: Web Design cs-2] [col-3: Analytics cs-2]
          STEP 3: Placed 8/8 ✓ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Row 1, col 1: SEO */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group"
            style={{ transitionDelay: '0ms' }}
          >
            <PlanetOrb service={services[0]} />
            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[0].name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{services[0].desc}</p>
          </div>

          {/* Row 1, col 2: Social Media */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group"
            style={{ transitionDelay: '80ms' }}
          >
            <PlanetOrb service={services[1]} />
            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[1].name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{services[1].desc}</p>
          </div>

          {/* Row 1, col 3: Paid Ads */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group"
            style={{ transitionDelay: '160ms' }}
          >
            <PlanetOrb service={services[2]} />
            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[2].name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{services[2].desc}</p>
          </div>

          {/* Brand Strategy — row-span-2 */}
          <div
            ref={(el) => { cardsRef.current[3] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:row-span-2 flex flex-col justify-between"
            style={{
              transitionDelay: '240ms',
              borderColor: `${services[3].color}40`,
              boxShadow: `0 0 40px ${services[3].glow}20`,
            }}
          >
            <div>
              <span className="section-label" style={{ color: services[3].color }}>Flagship Service</span>
              <div className="my-6 flex justify-center">
                <div
                  className="w-28 h-28 rounded-full animate-float"
                  style={{
                    background: services[3].gradient,
                    boxShadow: `0 0 40px ${services[3].glow}, 0 0 80px ${services[3].glow}40`,
                  }}
                />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3">{services[3].name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{services[3].desc}</p>
            </div>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group/link"
              style={{ color: services[3].color }}
            >
              Explore Jupiter
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Content Marketing — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[4] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2"
            style={{ transitionDelay: '320ms' }}
          >
            <div className="flex items-center gap-6">
              <PlanetOrb service={services[4]} large />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{services[4].name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{services[4].desc}</p>
              </div>
            </div>
          </div>

          {/* Email Marketing */}
          <div
            ref={(el) => { cardsRef.current[5] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group"
            style={{ transitionDelay: '400ms' }}
          >
            <PlanetOrb service={services[5]} />
            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[5].name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{services[5].desc}</p>
          </div>

          {/* Web Design — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[6] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2"
            style={{ transitionDelay: '480ms' }}
          >
            <div className="flex items-center gap-6">
              <PlanetOrb service={services[6]} large />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{services[6].name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{services[6].desc}</p>
              </div>
            </div>
          </div>

          {/* Analytics — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[7] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2"
            style={{ transitionDelay: '560ms' }}
          >
            <div className="flex items-center gap-6">
              <PlanetOrb service={services[7]} />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{services[7].name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{services[7].desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/40 text-foreground font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            View All Planets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlanetOrb({ service, large }: { service: typeof services[0]; large?: boolean }) {
  const size = large ? 'w-20 h-20' : 'w-12 h-12';
  return (
    <div
      className={`${size} rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}
      style={{
        background: service.gradient,
        boxShadow: `0 0 20px ${service.glow}, 0 0 40px ${service.glow}40`,
      }}
    />
  );
}