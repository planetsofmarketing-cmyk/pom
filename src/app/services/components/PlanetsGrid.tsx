'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const planets = [
  {
    id: 'seo',
    name: 'SEO & Search Marketing',
    planet: 'Mercury',
    tagline: 'The fastest planet in your orbit.',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #FED7AA 0%, #F97316 35%, #7C2D12 70%, #431407 90%)',
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
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    planet: 'Venus',
    tagline: 'The brightest presence in the sky.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #E9D5FF 0%, #A855F7 35%, #4C1D95 70%, #2E1065 90%)',
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
  },
  {
    id: 'paid',
    name: 'Paid Advertising',
    planet: 'Mars',
    tagline: 'Aggressive. Targeted. Unstoppable.',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #FECACA 0%, #EF4444 35%, #7F1D1D 70%, #450A0A 90%)',
    size: 56,
    desc: 'Google Ads, Meta Ads, and LinkedIn Ads that spend ₹1 to make ₹3+. We build campaigns with ruthless precision targeting — no wasted spend, no guesswork.',
    deliverables: [
      'Campaign architecture & targeting',
      'Ad creative design & copywriting',
      'A/B testing & optimization',
      'Retargeting & lookalike audiences',
      'Weekly ROAS reporting',
    ],
    result: 'Average 4.2x ROAS across all client campaigns.',
    icon: '🚀',
  },
  {
    id: 'brand',
    name: 'Brand Strategy & Identity',
    planet: 'Jupiter',
    tagline: 'The largest gravitational force in your system.',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #FDE68A 0%, #F59E0B 25%, #D97706 50%, #92400E 75%, #451A03 90%)',
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
  },
  {
    id: 'content',
    name: 'Content Marketing',
    planet: 'Saturn',
    tagline: 'Ringed with authority and reach.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #A7F3D0 0%, #10B981 35%, #065F46 70%, #022C22 90%)',
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
  },
  {
    id: 'email',
    name: 'Email Marketing & Automation',
    planet: 'Uranus',
    tagline: 'The silent force multiplier.',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #BAE6FD 0%, #38BDF8 35%, #0369A1 70%, #0C4A6E 90%)',
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
  },
  {
    id: 'web',
    name: 'Website Design & Development',
    planet: 'Neptune',
    tagline: 'The deep blue engine of conversion.',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.6)',
    gradient: 'radial-gradient(circle at 30% 30%, #C7D2FE 0%, #6366F1 35%, #3730A3 70%, #1E1B4B 90%)',
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
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    planet: 'Pluto',
    tagline: 'Small but essential. Nothing escapes its eye.',
    color: '#94A3B8',
    glow: 'rgba(148,163,184,0.4)',
    gradient: 'radial-gradient(circle at 30% 30%, #E2E8F0 0%, #94A3B8 35%, #475569 70%, #1E293B 90%)',
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

  return (
    <section className="relative py-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {planets.map((planet, i) => (
            <div
              key={planet.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  activePlanet === planet.id ? 'border-opacity-60' : 'hover:border-opacity-40'
                }`}
                style={{ borderColor: activePlanet === planet.id ? `${planet.color}60` : undefined }}
                onClick={() => setActivePlanet(activePlanet === planet.id ? null : planet.id)}
              >
                {/* Header row */}
                <div className="flex items-center gap-6 p-6 md:p-8">
                  {/* Planet visual */}
                  <div
                    className="flex-shrink-0 rounded-full transition-transform duration-500 group-hover:scale-110"
                    style={{
                      width: Math.min(planet.size, 72),
                      height: Math.min(planet.size, 72),
                      background: planet.gradient,
                      boxShadow: `0 0 20px ${planet.glow}, 0 0 40px ${planet.glow}40`,
                      animation: activePlanet === planet.id ? 'float 4s ease-in-out infinite' : undefined,
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="section-label" style={{ color: planet.color }}>{planet.planet}</span>
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
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                          style={{ background: `${planet.color}15`, color: planet.color }}
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
          ))}
        </div>
      </div>
    </section>
  );
}