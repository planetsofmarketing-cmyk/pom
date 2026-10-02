'use client';

import React, { useRef, useEffect } from 'react';

const testimonials = [
  {
    quote: 'Planets of Marketing helped us reach the right clients for our tax and audit services. Their focused campaign brought in relevant inquiries and turned them into real business opportunities.',
    name: 'Clifford Charles',
    role: 'Founder, Clifford Charles & Co.',
    rating: 5,
    planet: '🪐',
    color: '#F97316',
  },
  {
    quote: 'Planets of Marketing helped us reach more farmers with our products and machinery. Their SEO, YouTube, social media, and influencer marketing built a stronger audience and made our brand more visible.',
    name: 'Chetan Kimothi',
    role: 'Chief Marketing Officer, AgroVista',
    rating: 5,
    planet: '🔵',
    color: '#A855F7',
  },
  {
    quote: 'Planets of Marketing understood the oversized streetwear style we wanted OGCrew to represent. Their creative and marketing support helped us present our T-shirts consistently and connect with people who share our laid-back look.',
    name: 'SriHarsha M',
    role: 'Co-Founder, OGCrew',
    rating: 5,
    planet: '🟠',
    color: '#38BDF8',
  },
  {
    quote: 'Planets of Marketing helped us show customers that Scientista offers premium fragrances at accessible prices. Their work made our products’ value easier to communicate and gave our brand a clearer, more consistent presence online.',
    name: 'Raghav Gupta',
    role: 'Co-Founder, Scientista',
    rating: 5,
    planet: '⭐',
    color: '#10B981',
  },
];

export default function TestimonialsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #7C3AED, transparent)',
            top: '20%',
            right: '10%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-label block mb-4">Gravitational Pull</span>
          <h2 className="section-heading mb-4">
            Brands That Found Their Orbit
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light">
            When your marketing aligns, growth becomes inevitable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card rounded-2xl p-8 opacity-0 translate-y-6 transition-all duration-700 group hover:border-primary/30"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-base text-foreground/80 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-primary/10 text-primary"
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}