'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PlanetVisual from '@/components/ui/PlanetVisual';

const makeServiceBackground = (variant: 'growth' | 'seo' | 'social' | 'ads' | 'brand' | 'content' | 'email' | 'web' | 'analytics', colors: [string, string]) => {
  const motifs: Record<typeof variant, string> = {
    growth: `
      <circle cx="320" cy="250" r="200" fill="url(#g)" opacity="0.22"/>
      <circle cx="1260" cy="680" r="240" fill="url(#g)" opacity="0.12"/>
      <path d="M170 665 L420 560 L660 585 L890 410 L1125 440 L1420 220" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="420" cy="560" r="12" fill="${colors[0]}"/>
      <circle cx="890" cy="410" r="12" fill="${colors[0]}"/>
      <circle cx="1420" cy="220" r="12" fill="${colors[0]}"/>
      <path d="M260 250 L395 230 L455 210 L520 260" stroke="rgba(255,255,255,0.9)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="935" y="240" width="320" height="142" rx="22" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)"/>
      <rect x="970" y="280" width="220" height="16" rx="8" fill="rgba(255,255,255,0.16)"/>
      <rect x="970" y="312" width="164" height="16" rx="8" fill="rgba(255,255,255,0.11)"/>
      <path d="M1000 500 L1140 440 L1220 470 L1315 360" stroke="rgba(255,255,255,0.7)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    seo: `
      <rect x="200" y="170" width="1180" height="560" rx="30" fill="rgba(15,23,42,0.58)" stroke="rgba(255,255,255,0.1)"/>
      <circle cx="590" cy="380" r="160" fill="none" stroke="${colors[0]}" stroke-width="11" opacity="0.78"/>
      <circle cx="590" cy="380" r="94" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="7"/>
      <path d="M700 500 L845 640" stroke="${colors[0]}" stroke-width="18" stroke-linecap="round"/>
      <path d="M1030 260 L1235 260" stroke="rgba(255,255,255,0.18)" stroke-width="12" stroke-linecap="round"/>
      <path d="M1030 320 L1196 320" stroke="rgba(255,255,255,0.12)" stroke-width="12" stroke-linecap="round"/>
      <path d="M1030 380 L1160 380" stroke="rgba(255,255,255,0.12)" stroke-width="12" stroke-linecap="round"/>
      <path d="M990 560 L1068 492 L1148 534 L1230 430" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="930" y="220" width="340" height="68" rx="18" fill="rgba(255,255,255,0.04)"/>
    `,
    social: `
      <rect x="430" y="170" width="620" height="560" rx="38" fill="rgba(15,23,42,0.68)" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="710" cy="260" r="135" fill="url(#g)" opacity="0.18"/>
      <circle cx="590" cy="320" r="44" fill="${colors[0]}" opacity="0.4"/>
      <circle cx="830" cy="320" r="44" fill="${colors[1]}" opacity="0.45"/>
      <circle cx="710" cy="420" r="50" fill="rgba(255,255,255,0.08)"/>
      <path d="M530 580 C575 520, 630 500, 710 500 C790 500, 845 520, 890 580" stroke="rgba(255,255,255,0.86)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M1080 250 C1170 230, 1230 305, 1248 410" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.75"/>
      <path d="M1160 560 C1210 490, 1260 468, 1322 485" stroke="${colors[1]}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.75"/>
      <rect x="1088" y="214" width="165" height="88" rx="18" fill="rgba(255,255,255,0.04)"/>
    `,
    ads: `
      <rect x="200" y="190" width="1180" height="480" rx="30" fill="rgba(15,23,42,0.62)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="260" y="260" width="200" height="146" rx="18" fill="${colors[0]}" opacity="0.18"/>
      <rect x="500" y="260" width="200" height="146" rx="18" fill="${colors[1]}" opacity="0.2"/>
      <rect x="740" y="260" width="200" height="146" rx="18" fill="${colors[0]}" opacity="0.14"/>
      <rect x="980" y="260" width="200" height="146" rx="18" fill="rgba(255,255,255,0.06)"/>
      <path d="M280 610 L480 520 L630 560 L840 430 L1035 498 L1275 340" stroke="rgba(255,255,255,0.88)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="280" cy="610" r="12" fill="${colors[0]}"/>
      <circle cx="630" cy="560" r="12" fill="${colors[0]}"/>
      <circle cx="1035" cy="498" r="12" fill="${colors[0]}"/>
      <path d="M1080 610 L1240 540" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
    `,
    brand: `
      <circle cx="360" cy="260" r="170" fill="url(#g)" opacity="0.18"/>
      <rect x="260" y="180" width="1060" height="470" rx="34" fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.1)"/>
      <rect x="420" y="290" width="270" height="150" rx="26" fill="rgba(255,255,255,0.05)"/>
      <rect x="720" y="290" width="270" height="150" rx="26" fill="rgba(255,255,255,0.05)"/>
      <rect x="1020" y="290" width="180" height="150" rx="26" fill="rgba(255,255,255,0.05)"/>
      <circle cx="555" cy="420" r="54" fill="${colors[0]}" opacity="0.55"/>
      <circle cx="855" cy="420" r="54" fill="${colors[1]}" opacity="0.6"/>
      <path d="M1090 500 L1160 320" stroke="rgba(255,255,255,0.85)" stroke-width="10" stroke-linecap="round"/>
      <path d="M1160 320 L1230 500" stroke="rgba(255,255,255,0.85)" stroke-width="10" stroke-linecap="round"/>
      <path d="M290 660 L1280 660" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    `,
    content: `
      <rect x="180" y="180" width="1220" height="520" rx="30" fill="rgba(15,23,42,0.62)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="250" y="248" width="740" height="56" rx="14" fill="rgba(255,255,255,0.06)"/>
      <rect x="250" y="332" width="700" height="16" rx="8" fill="rgba(255,255,255,0.09)"/>
      <rect x="250" y="370" width="740" height="16" rx="8" fill="rgba(255,255,255,0.09)"/>
      <rect x="250" y="440" width="260" height="170" rx="18" fill="${colors[0]}" opacity="0.18"/>
      <rect x="550" y="440" width="260" height="170" rx="18" fill="${colors[1]}" opacity="0.2"/>
      <rect x="850" y="440" width="260" height="170" rx="18" fill="rgba(255,255,255,0.05)"/>
      <path d="M1190 355 L1300 355" stroke="rgba(255,255,255,0.84)" stroke-width="10" stroke-linecap="round"/>
      <path d="M1160 540 L1310 540" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
    `,
    email: `
      <rect x="240" y="180" width="1120" height="500" rx="28" fill="rgba(15,23,42,0.62)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="430" y="260" width="760" height="120" rx="24" fill="rgba(255,255,255,0.05)"/>
      <path d="M430 300 L800 515 L1170 300" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="430" cy="300" r="16" fill="${colors[0]}" opacity="0.44"/>
      <circle cx="800" cy="515" r="16" fill="${colors[1]}" opacity="0.48"/>
      <circle cx="1170" cy="300" r="16" fill="${colors[0]}" opacity="0.44"/>
      <rect x="530" y="475" width="540" height="82" rx="18" fill="rgba(255,255,255,0.04)"/>
      <rect x="250" y="535" width="180" height="46" rx="14" fill="rgba(255,255,255,0.04)"/>
    `,
    web: `
      <rect x="220" y="160" width="1160" height="560" rx="34" fill="rgba(15,23,42,0.64)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="300" y="230" width="1000" height="390" rx="20" fill="rgba(255,255,255,0.04)"/>
      <rect x="350" y="280" width="360" height="220" rx="18" fill="rgba(255,255,255,0.05)"/>
      <rect x="760" y="278" width="440" height="54" rx="12" fill="rgba(255,255,255,0.08)"/>
      <rect x="760" y="350" width="410" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="760" y="390" width="376" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="760" y="430" width="342" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <path d="M420 590 L530 490 L620 560" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round"/>
    `,
    analytics: `
      <rect x="180" y="180" width="1240" height="520" rx="30" fill="rgba(15,23,42,0.62)" stroke="rgba(255,255,255,0.08)"/>
      <path d="M250 620 L470 540 L630 560 L860 390 L1090 470 L1400 240" stroke="${colors[0]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="250" cy="620" r="12" fill="${colors[0]}"/>
      <circle cx="630" cy="560" r="12" fill="${colors[0]}"/>
      <circle cx="860" cy="390" r="12" fill="${colors[0]}"/>
      <circle cx="1400" cy="240" r="12" fill="${colors[0]}"/>
      <rect x="250" y="215" width="180" height="140" rx="18" fill="rgba(255,255,255,0.05)"/>
      <rect x="500" y="215" width="220" height="140" rx="18" fill="rgba(255,255,255,0.05)"/>
      <rect x="790" y="215" width="210" height="140" rx="18" fill="rgba(255,255,255,0.05)"/>
      <path d="M1220 260 L1325 260" stroke="rgba(255,255,255,0.2)" stroke-width="10" stroke-linecap="round"/>
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="#070d18"/>
      <rect width="1600" height="900" fill="url(#g)" opacity="0.12"/>
      <path d="M0 0 L1600 0 L1600 900 L0 900 Z" fill="rgba(9,16,28,0.18)"/>
      ${motifs[variant]}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const planets = [
  {
    id: 'strategy',
    name: 'Growth Strategy',
    planet: 'The Sun',
    tagline: 'The centre of every growth system.',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.6)',
    size: 112,
    desc: 'Every channel starts with a clear plan. We align audience research, commercial goals, and measurable priorities before launch.',
    deliverables: [
      'Audience and market research',
      'Growth roadmap and channel priorities',
      'Goals, KPIs, and measurement plan',
      'Positioning and opportunity review',
      'Ongoing strategy sessions',
    ],
    result: 'A connected growth plan for every marketing channel.',
    icon: '🎯',
    background: '/assets/images/growth_strategy_sun.jpg',
  },
  {
    id: 'seo',
    name: 'SEO & Organic Growth',
    planet: 'Mercury',
    tagline: 'The fastest planet in your orbit.',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.6)',
    size: 64,
    desc: 'Dominate Google search results with technical SEO, keyword strategy, and content that compounds. We build organic visibility that doesn\'t disappear when you stop spending.',
    deliverables: [
      'Technical SEO audit & fixes',
      'Keyword research & content strategy',
      'On-page & off-page optimization',
      'Local SEO for Hyderabad businesses',
      'Monthly ranking reports',
    ],
    result: 'Clients see first-page rankings within 90 days on average.',
    icon: '🔍',
    background: '/assets/images/seo_mercury.png',
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    planet: 'Venus',
    tagline: 'The brightest presence in the sky.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.6)',
    size: 80,
    desc: 'Build communities that convert. We manage Instagram, LinkedIn, Facebook, and X — creating content that stops the scroll and starts conversations with your ideal clients.',
    deliverables: [
      'Platform strategy & content calendar',
      'Daily content creation & posting',
      'Community management & engagement',
      'Influencer collaboration management',
      'Monthly growth & engagement reports',
    ],
    result: 'Average 340% follower growth in the first 6 months.',
    icon: '📡',
    background: 'https://images.unsplash.com/photo-1590769398823-a62d7ecc25e6?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    planet: 'Earth',
    tagline: 'The ground truth beneath every growth decision.',
    color: '#94A3B8',
    glow: 'rgba(148,163,184,0.4)',
    size: 40,
    desc: 'Real-time dashboards, monthly strategy reviews, and data-driven optimizations. You always know exactly where your marketing stands and where every rupee is going.',
    deliverables: [
      'GA4 & Search Console setup',
      'Custom reporting dashboards',
      'Monthly performance reviews',
      'Competitor benchmarking',
      'Attribution modeling',
    ],
    result: 'Full visibility into every channel, every campaign, every rupee.',
    icon: '📊',
    background: '/assets/images/analytics_earth.jpeg',
  },
  {
    id: 'paid',
    name: 'Paid & AI Search Marketing',
    planet: 'Mars',
    tagline: 'Aggressive. Targeted. Unstoppable.',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.6)',
    size: 56,
    desc: 'Google Ads, Meta Ads, LinkedIn Ads, and AI-driven discovery strategies designed to capture demand across both classic search and new AI-powered journeys.',
    deliverables: [
      'Campaign architecture & targeting',
      'Ad creative design & copywriting',
      'A/B testing & optimization',
      'AI search visibility strategy',
      'Retargeting & audience expansion',
      'Weekly ROAS reporting',
    ],
    result: 'Average 4.2x ROAS across all client campaigns.',
    icon: '🚀',
    background:  '/assets/images/paid&ai.jpg',
  },
  {
    id: 'brand',
    name: 'Brand Strategy & Identity',
    planet: 'Jupiter',
    tagline: 'The largest gravitational force in your system.',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.6)',
    size: 112,
    desc: 'Your brand is your gravitational field — it determines which clients orbit you and which drift away. We define your positioning, voice, visual identity, and messaging system.',
    deliverables: [
      'Brand positioning & messaging framework',
      'Visual identity system (logo, colors, typography)',
      'Brand voice & tone guidelines',
      'Competitor differentiation strategy',
      'Brand style guide & asset library',
    ],
    result: 'Clients with clear brand strategy close 60% more deals.',
    icon: '🪐',
    background: '/assets/images/brand_jupiter.jpg',
  },
  {
    id: 'content',
    name: 'Content Marketing',
    planet: 'Saturn',
    tagline: 'Ringed with authority and reach.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.6)',
    size: 88,
    desc: 'Blogs, videos, case studies, and copy that educate your audience and pull them through the funnel. Content that ranks, resonates, and converts.',
    deliverables: [
      'Content strategy & editorial calendar',
      'SEO blog posts (2-4 per month)',
      'Video scripts & production guidance',
      'Case study writing & design',
      'Email newsletter content',
    ],
    result: 'Content clients generate 3x more inbound leads.',
    icon: '✍️',
    background: '/assets/images/content_saturn.jpg',
  },
  {
    id: 'email',
    name: 'Email Marketing & Automation',
    planet: 'Uranus',
    tagline: 'The silent force multiplier.',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.6)',
    size: 64,
    desc: 'Automated sequences that nurture leads while you sleep. Welcome flows, abandoned cart recovery, re-engagement campaigns — all designed to maximize lifetime value.',
    deliverables: [
      'Email strategy & sequence architecture',
      'Automated welcome & nurture flows',
      'Newsletter design & management',
      'List segmentation & personalization',
      'Open rate & conversion optimization',
    ],
    result: 'Average 38% open rate vs industry benchmark of 21%.',
    icon: '📧',
    background: '/assets/images/email_uranus.jpg',
  },
  {
    id: 'web',
    name: 'Website Design & Development',
    planet: 'Neptune',
    tagline: 'The deep blue engine of conversion.',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.6)',
    size: 72,
    desc: 'Websites that load in under 2 seconds, look stunning on every device, and convert visitors into leads. We build on Next.js, WordPress, and Webflow.',
    deliverables: [
      'UX/UI design & prototyping',
      'Responsive development',
      'CMS integration & training',
      'Speed & Core Web Vitals optimization',
      'Analytics & heatmap setup',
    ],
    result: 'Our websites average a 4.2% conversion rate vs 2.1% industry average.',
    icon: '🌐',
    background: '/assets/images/web_neptune.jpg',
  },
];

export default function PlanetsGrid() {
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.08 }
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const planetId = new URLSearchParams(window.location.search).get('planet');
    if (!planetId || !planets.some((planet) => planet.id === planetId)) return;

    setActivePlanet(planetId);
    const cardIndex = planets.findIndex((planet) => planet.id === planetId);
    const card = cardsRef.current[cardIndex];
    if (card) {
      window.requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, []);

  return (
    <section className="relative py-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {planets.map((planet, i) => {
            return (
            <div
              key={planet.id}
              id={`service-${planet.id}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className={`glass-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  activePlanet === planet.id ? 'border-opacity-60' : 'hover:border-opacity-40'
                }`}
                style={{
                  borderColor: activePlanet === planet.id ? `${planet.color}60` : undefined,
                  backgroundImage: `linear-gradient(135deg, rgba(6,10,18,0.85), rgba(8,13,24,0.78)), url("${planet.background}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => setActivePlanet(activePlanet === planet.id ? null : planet.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/75" aria-hidden="true" />
                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-center gap-6 p-6 md:p-8">
                  {/* Planet visual */}
                  <PlanetVisual
                    name={planet.planet}
                    size={Math.min(planet.size, 72)}
                    className={activePlanet === planet.id ? 'animate-float' : ''}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="section-label">{planet.planet}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{planet.tagline}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-foreground">{planet.name}</h2>
                  </div>

                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: `${planet.color}40`,
                      background: activePlanet === planet.id ? `${planet.color}20` : 'transparent',
                      color: planet.color,
                    }}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${activePlanet === planet.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activePlanet === planet.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-border/30 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Description */}
                      <div className="lg:col-span-2">
                        <p className="text-base text-muted-foreground leading-relaxed mb-6">{planet.desc}</p>
                        <div
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-primary/10 text-primary"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {planet.result}
                        </div>
                        <Link
                          href="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-foreground transition-all duration-300 hover:shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${planet.color}, ${planet.color}aa)`,
                            boxShadow: `0 0 20px ${planet.glow}40`,
                          }}
                        >
                          Get a Free Consultation
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">What&apos;s Included</h3>
                        <ul className="space-y-3">
                          {planet.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ background: planet.color }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}