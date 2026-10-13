'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import PlanetVisual from '@/components/ui/PlanetVisual';

const makeServiceBackground = (variant: 'seo' | 'social' | 'paid' | 'brand' | 'content' | 'email' | 'web' | 'analytics', colors: [string, string]) => {
  const motifs: Record<typeof variant, string> = {
    seo: `
      <rect x="0" y="0" width="1200" height="760" fill="#0b1120"/>
      <circle cx="255" cy="220" r="180" fill="url(#g)" opacity="0.18"/>
      <circle cx="700" cy="420" r="150" fill="none" stroke="${colors[0]}" stroke-width="10" opacity="0.82"/>
      <circle cx="700" cy="420" r="86" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="8"/>
      <path d="M790 540 L980 690" stroke="${colors[0]}" stroke-width="18" stroke-linecap="round"/>
      <path d="M980 185 L1030 185" stroke="rgba(255,255,255,0.18)" stroke-width="12" stroke-linecap="round"/>
      <path d="M980 240 L1110 240" stroke="rgba(255,255,255,0.12)" stroke-width="12" stroke-linecap="round"/>
      <path d="M980 295 L1085 295" stroke="rgba(255,255,255,0.12)" stroke-width="12" stroke-linecap="round"/>
      <path d="M890 560 L980 475 L1048 520 L1145 420" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    social: `
      <rect x="0" y="0" width="1200" height="760" fill="#0d1422"/>
      <circle cx="620" cy="260" r="150" fill="url(#g)" opacity="0.16"/>
      <rect x="425" y="165" width="400" height="420" rx="38" fill="rgba(15,23,42,0.72)" stroke="rgba(255,255,255,0.12)"/>
      <circle cx="560" cy="290" r="42" fill="${colors[0]}" opacity="0.42"/>
      <circle cx="700" cy="290" r="42" fill="${colors[1]}" opacity="0.48"/>
      <circle cx="630" cy="390" r="48" fill="rgba(255,255,255,0.08)"/>
      <path d="M500 520 C535 470, 590 440, 630 440 C680 440, 740 470, 785 520" stroke="rgba(255,255,255,0.82)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M915 240 C1015 235, 1080 295, 1088 392" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
      <path d="M970 525 C1030 455, 1080 440, 1140 455" stroke="${colors[1]}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
    `,
    paid: `
      <rect x="0" y="0" width="1200" height="760" fill="#0d1320"/>
      <rect x="150" y="210" width="180" height="120" rx="18" fill="${colors[0]}" opacity="0.18"/>
      <rect x="370" y="210" width="180" height="120" rx="18" fill="${colors[1]}" opacity="0.2"/>
      <rect x="590" y="210" width="180" height="120" rx="18" fill="${colors[0]}" opacity="0.12"/>
      <rect x="810" y="210" width="180" height="120" rx="18" fill="rgba(255,255,255,0.06)"/>
      <path d="M160 565 L350 485 L500 520 L700 405 L920 470 L1058 320" stroke="rgba(255,255,255,0.9)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="160" cy="565" r="12" fill="${colors[0]}"/>
      <circle cx="500" cy="520" r="12" fill="${colors[0]}"/>
      <circle cx="920" cy="470" r="12" fill="${colors[0]}"/>
      <path d="M870 585 L1040 510" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
    `,
    brand: `
      <rect x="0" y="0" width="1200" height="760" fill="#0a1220"/>
      <circle cx="260" cy="230" r="180" fill="url(#g)" opacity="0.16"/>
      <rect x="150" y="160" width="900" height="430" rx="32" fill="rgba(15,23,42,0.66)" stroke="rgba(255,255,255,0.12)"/>
      <rect x="280" y="260" width="200" height="120" rx="24" fill="rgba(255,255,255,0.06)"/>
      <rect x="510" y="260" width="200" height="120" rx="24" fill="rgba(255,255,255,0.06)"/>
      <rect x="740" y="260" width="180" height="120" rx="24" fill="rgba(255,255,255,0.06)"/>
      <circle cx="380" cy="370" r="50" fill="${colors[0]}" opacity="0.56"/>
      <circle cx="610" cy="370" r="50" fill="${colors[1]}" opacity="0.56"/>
      <path d="M835 480 L885 285" stroke="rgba(255,255,255,0.86)" stroke-width="10" stroke-linecap="round"/>
      <path d="M885 285 L935 480" stroke="rgba(255,255,255,0.86)" stroke-width="10" stroke-linecap="round"/>
      <path d="M120 600 L1080 600" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    `,
    content: `
      <rect x="0" y="0" width="1200" height="760" fill="#0a1220"/>
      <rect x="140" y="190" width="930" height="410" rx="28" fill="rgba(15,23,42,0.7)"/>
      <rect x="190" y="250" width="570" height="50" rx="14" fill="rgba(255,255,255,0.06)"/>
      <rect x="190" y="330" width="520" height="14" rx="7" fill="rgba(255,255,255,0.09)"/>
      <rect x="190" y="360" width="580" height="14" rx="7" fill="rgba(255,255,255,0.09)"/>
      <rect x="190" y="440" width="200" height="120" rx="18" fill="${colors[0]}" opacity="0.18"/>
      <rect x="430" y="440" width="200" height="120" rx="18" fill="${colors[1]}" opacity="0.18"/>
      <rect x="670" y="440" width="200" height="120" rx="18" fill="rgba(255,255,255,0.05)"/>
      <path d="M890 300 L1025 300" stroke="rgba(255,255,255,0.8)" stroke-width="10" stroke-linecap="round"/>
      <path d="M865 505 L1015 505" stroke="rgba(255,255,255,0.16)" stroke-width="10" stroke-linecap="round"/>
    `,
    email: `
      <rect x="0" y="0" width="1200" height="760" fill="#071220"/>
      <rect x="210" y="175" width="780" height="420" rx="25" fill="rgba(15,23,42,0.72)" stroke="rgba(255,255,255,0.12)"/>
      <rect x="320" y="240" width="560" height="112" rx="22" fill="rgba(255,255,255,0.05)"/>
      <path d="M320 285 L600 470 L880 285" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="320" cy="285" r="16" fill="${colors[0]}" opacity="0.45"/>
      <circle cx="600" cy="470" r="16" fill="${colors[1]}" opacity="0.5"/>
      <circle cx="880" cy="285" r="16" fill="${colors[0]}" opacity="0.45"/>
      <rect x="390" y="440" width="430" height="72" rx="16" fill="rgba(255,255,255,0.04)"/>
      <rect x="120" y="510" width="130" height="46" rx="14" fill="rgba(255,255,255,0.04)"/>
    `,
    web: `
      <rect x="0" y="0" width="1200" height="760" fill="#081320"/>
      <rect x="130" y="160" width="940" height="420" rx="28" fill="rgba(15,23,42,0.7)" stroke="rgba(255,255,255,0.12)"/>
      <rect x="200" y="220" width="300" height="230" rx="18" fill="rgba(255,255,255,0.05)"/>
      <rect x="560" y="220" width="400" height="48" rx="12" fill="rgba(255,255,255,0.08)"/>
      <rect x="560" y="300" width="360" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="560" y="340" width="320" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="560" y="380" width="280" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <path d="M300 540 L410 450 L510 520" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round"/>
    `,
    analytics: `
      <rect x="0" y="0" width="1200" height="760" fill="#07131d"/>
      <path d="M150 560 L370 475 L530 500 L700 330 L900 420 L1050 220" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="150" cy="560" r="12" fill="${colors[0]}"/>
      <circle cx="530" cy="500" r="12" fill="${colors[0]}"/>
      <circle cx="700" cy="330" r="12" fill="${colors[0]}"/>
      <circle cx="1050" cy="220" r="12" fill="${colors[0]}"/>
      <rect x="170" y="190" width="170" height="140" rx="16" fill="rgba(255,255,255,0.05)"/>
      <rect x="400" y="190" width="200" height="140" rx="16" fill="rgba(255,255,255,0.05)"/>
      <rect x="660" y="190" width="180" height="140" rx="16" fill="rgba(255,255,255,0.05)"/>
      <path d="M940 240 L1030 240" stroke="rgba(255,255,255,0.2)" stroke-width="10" stroke-linecap="round"/>
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="760" fill="#070d18"/>
      <rect width="1200" height="760" fill="url(#g)" opacity="0.1"/>
      ${motifs[variant]}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const services = [
  {
    name: 'SEO & Organic Growth',
    planet: 'Mercury',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.6)',
    size: 'w-16 h-16',
    desc: 'Rank #1 on Google with technical SEO and content strategies that compound over time.',
    icon: '🔍',
    background: '/assets/images/seo_mercury.png',
  },
  {
    name: 'Social Media',
    planet: 'Venus',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.6)',
    size: 'w-20 h-20',
    desc: 'Build communities that convert. Instagram, LinkedIn, and Meta strategies with real engagement.',
    icon: '📡',
    background: 'https://images.unsplash.com/photo-1590769398823-a62d7ecc25e6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Paid and AI Search Marketing',
    planet: 'Mars',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.6)',
    size: 'w-14 h-14',
    desc: 'Google, Meta, and LinkedIn ads that spend ₹1 to make ₹3+. Precision targeting.',
    icon: '🚀',
    background: '/assets/images/paid&ai.jpg',
  },
  {
    name: 'Brand Strategy',
    planet: 'Jupiter',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.6)',
    size: 'w-28 h-28',
    desc: 'The largest force in your solar system. Define who you are and why clients choose you.',
    icon: '🪐',
    background: '/assets/images/brand_jupiter.jpg',
  },
  {
    name: 'Content Marketing',
    planet: 'Saturn',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.6)',
    size: 'w-22 h-22',
    desc: 'Blogs, videos, and copy that educate, attract, and convert your ideal clients. Built to keep your pipeline full long after publishing.',
    icon: '✍️',
    background: '/assets/images/content_saturn.jpg',
  },
  {
    name: 'Email Marketing',
    planet: 'Uranus',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.6)',
    size: 'w-16 h-16',
    desc: 'Automated sequences and campaigns with open rates that actually open doors.',
    icon: '📧',
    background: '/assets/images/email_uranus.jpg',
  },
  {
    name: 'Web Design',
    planet: 'Neptune',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.6)',
    size: 'w-18 h-18',
    desc: 'Websites that load fast, look stunning, and convert visitors into paying clients. Built to turn attention into action across every device.',
    icon: '🌐',
    background: '/assets/images/web_neptune.jpg',
  },
  {
    name: 'Analytics',
    planet: 'Earth',
    color: '#94A3B8',
    glow: 'rgba(148,163,184,0.4)',
    size: 'w-10 h-10',
    desc: 'Real-time dashboards. No surprises, no guesswork — just clear data and clear decisions. Every campaign is tied to measurable performance.',
    icon: '📊',
    background: '/assets/images/analytics_earth.jpeg',
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
          <h2 className="section-heading mb-4">
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
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group overflow-hidden relative"
            style={{
              transitionDelay: '0ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.77), rgba(9,14,24,0.9)), url("${services[0].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10">
              <PlanetOrb service={services[0]} />
              <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[0].name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{services[0].desc}</p>
            </div>
          </div>

          {/* Row 1, col 2: Social Media */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group overflow-hidden relative"
            style={{
              transitionDelay: '80ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.34), rgba(9,14,24,0.58)), url("${services[1].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/35" aria-hidden="true" />
            <div className="relative z-10">
              <PlanetOrb service={services[1]} />
              <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[1].name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{services[1].desc}</p>
            </div>
          </div>

          {/* Row 1, col 3: Paid Ads */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group overflow-hidden relative"
            style={{
              transitionDelay: '160ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.77), rgba(9,14,24,0.9)), url("${services[2].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10">
              <PlanetOrb service={services[2]} />
              <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[2].name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{services[2].desc}</p>
            </div>
          </div>

          {/* Brand Strategy — row-span-2 */}
          <div
            ref={(el) => { cardsRef.current[3] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:row-span-2 flex flex-col justify-between overflow-hidden relative"
            style={{
              transitionDelay: '240ms',
              borderColor: `${services[3].color}40`,
              boxShadow: `0 0 40px ${services[3].glow}20`,
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.8), rgba(9,14,24,0.9)), url("${services[3].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/65" aria-hidden="true" />
            <div className="relative z-10">
              <div>
                <span className="section-label">Flagship Service</span>
                <div className="my-6 flex justify-center">
                  <PlanetVisual name={services[3].planet} size={112} className="animate-float my-6 mx-auto" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-3">{services[3].name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{services[3].desc}</p>
              </div>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group/link"
              >
                Explore Jupiter
                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Content Marketing — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[4] = el; }}
            className="planet-card glass-card rounded-2xl p-7 md:p-8 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2 overflow-hidden relative min-h-[220px]"
            style={{
              transitionDelay: '320ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.75), rgba(9,14,24,0.9)), url("${services[4].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-6 md:gap-8 min-h-[170px]">
              <PlanetOrb service={services[4]} large />
              <div className="max-w-[72%]">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">{services[4].name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-[520px]">{services[4].desc}</p>
              </div>
            </div>
          </div>

          {/* Email Marketing */}
          <div
            ref={(el) => { cardsRef.current[5] = el; }}
            className="planet-card glass-card rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group overflow-hidden relative"
            style={{
              transitionDelay: '400ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.75), rgba(9,14,24,0.9)), url("${services[5].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10">
              <PlanetOrb service={services[5]} />
              <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{services[5].name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{services[5].desc}</p>
            </div>
          </div>

          {/* Web Design — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[6] = el; }}
            className="planet-card glass-card rounded-2xl p-7 md:p-8 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2 overflow-hidden relative min-h-[220px]"
            style={{
              transitionDelay: '480ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.75), rgba(9,14,24,0.9)), url("${services[6].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-6 md:gap-8 min-h-[170px]">
              <PlanetOrb service={services[6]} large />
              <div className="max-w-[72%]">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">{services[6].name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-[520px]">{services[6].desc}</p>
              </div>
            </div>
          </div>

          {/* Analytics — col-span-2 */}
          <div
            ref={(el) => { cardsRef.current[7] = el; }}
            className="planet-card glass-card rounded-2xl p-7 md:p-8 opacity-0 translate-y-8 transition-all duration-700 cursor-pointer group lg:col-span-2 overflow-hidden relative min-h-[220px]"
            style={{
              transitionDelay: '560ms',
              backgroundImage: `linear-gradient(180deg, rgba(6,10,18,0.75), rgba(9,14,24,0.9)), url("${services[7].background}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-6 md:gap-8 min-h-[170px]">
              <PlanetOrb service={services[7]} />
              <div className="max-w-[72%]">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">{services[7].name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-[520px]">{services[7].desc}</p>
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
  return <PlanetVisual name={service.planet} size={large ? 80 : 48} className="transition-transform duration-500 group-hover:scale-110" />;
}