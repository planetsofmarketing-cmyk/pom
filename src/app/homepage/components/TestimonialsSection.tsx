'use client';

import React, { useRef, useEffect } from 'react';

const testimonials = [
  {
    quote: 'Planets of Marketing transformed our Hyderabad restaurant&apos;s online presence completely. We went from 20 bookings a month to 200+ through Instagram and Google.',
    name: 'Anjali Sharma',
    role: 'Owner, The Saffron Table',
    rating: 5,
    planet: '🪐',
    color: '#F97316',
  },
  {
    quote: 'Their paid ads team is exceptional. Every rupee we spent returned at least ₹4. The transparency in reporting alone is worth the partnership.',
    name: 'Venkat Rao',
    role: 'Director, Rao Constructions',
    rating: 5,
    planet: '🔵',
    color: '#A855F7',
  },
  {
    quote: 'In 4 months, our LinkedIn generated 3 enterprise clients. The content strategy they designed for us is genuinely world-class.',
    name: 'Meera Krishnan',
    role: 'Co-Founder, HealthStack India',
    rating: 5,
    planet: '🟠',
    color: '#38BDF8',
  },
  {
    quote: 'From zero to 50,000 Instagram followers in 8 months. Our brand now competes with national players because of their strategy.',
    name: 'Rohan Mehta',
    role: 'CEO, FitLife Hyderabad',
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
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
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
                  <svg key={j} className="w-4 h-4" style={{ color: t.color }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-base text-foreground/80 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: `${t.color}20`, color: t.color }}
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