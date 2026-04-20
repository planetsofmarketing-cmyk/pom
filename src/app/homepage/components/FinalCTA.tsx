'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('opacity-100', 'scale-100');
          sectionRef.current?.classList.remove('opacity-0', 'scale-95');
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 mx-4 md:mx-8 mb-16 rounded-3xl overflow-hidden opacity-0 scale-95 transition-all duration-1000"
      style={{
        background: 'linear-gradient(135deg, #12152A 0%, #1a0a3e 40%, #2D1B00 100%)',
        border: '1px solid rgba(124,58,237,0.3)',
        boxShadow: '0 0 80px rgba(124,58,237,0.2), 0 0 160px rgba(249,115,22,0.1)',
      }}
    >
      {/* Orbital decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        {[300, 500, 700]?.map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-purple-500/10"
            style={{
              width: size,
              height: size,
              animation: `orbit-spin ${25 + i * 10}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
            }}
          />
        ))}
        <div
          className="absolute w-40 h-40 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #7C3AED, transparent)',
            filter: 'blur(40px)',
            top: '10%',
            right: '15%',
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #F97316, transparent)',
            filter: 'blur(40px)',
            bottom: '15%',
            left: '10%',
          }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="section-label block mb-6">Ready for Launch?</span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          Your Brand&apos;s Orbit<br />
          <span className="gradient-text">Starts Today.</span>
        </h2>
        <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Join 50+ brands that found their gravitational pull with Planets of Marketing. Your free strategy call is 20 minutes and zero obligation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-10 py-4 bg-primary text-foreground rounded-full font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_rgba(124,58,237,0.8)]"
          >
            Book Your Free Strategy Call
          </Link>
          <Link
            href="/services"
            className="group flex items-center gap-2 px-8 py-4 text-foreground font-semibold text-base hover:text-primary transition-colors"
          >
            Explore Services
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}