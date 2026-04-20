'use client';

import React, { useRef, useEffect } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    desc: 'We map your brand\'s current orbit — goals, competitors, and growth blockers. 20 minutes, zero fluff.',
    icon: '🔭',
    color: '#F97316',
  },
  {
    number: '02',
    title: 'Strategy & Audit',
    desc: 'Deep-dive into your market, keywords, and audience. We build your custom solar system strategy.',
    icon: '🗺️',
    color: '#A855F7',
  },
  {
    number: '03',
    title: 'Campaign Launch',
    desc: 'Precision execution across your chosen planets — SEO, ads, content, social. All aligned, all live.',
    icon: '🚀',
    color: '#38BDF8',
  },
  {
    number: '04',
    title: 'Optimize & Scale',
    desc: 'Every week we analyze signals, cut what drifts, and accelerate what orbits. Data drives every decision.',
    icon: '⚡',
    color: '#10B981',
  },
  {
    number: '05',
    title: 'Report & Grow',
    desc: 'Real-time dashboards, monthly reviews. You always know exactly where your brand stands in the universe.',
    icon: '📈',
    color: '#F59E0B',
  },
];

export default function ProcessSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', '-translate-x-8');
          }
        });
      },
      { threshold: 0.15 }
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-label block mb-4">The Launch Sequence</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            How We Launch Brands Into Orbit
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light">
            Five mission-critical phases. Zero guesswork.
          </p>
        </div>

        {/* Orbital timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.4), rgba(249,115,22,0.4), transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`relative flex flex-col lg:flex-row items-center gap-6 opacity-0 -translate-x-8 transition-all duration-700 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Content card */}
                <div className="w-full lg:w-5/12 glass-card rounded-2xl p-7 group hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${step.color}20` }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold tracking-widest" style={{ color: step.color }}>{step.number}</span>
                        <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center node */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-extrabold z-10"
                    style={{
                      borderColor: step.color,
                      background: `${step.color}20`,
                      color: step.color,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Empty spacer */}
                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}