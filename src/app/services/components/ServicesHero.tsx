import React from 'react';
import PlanetVisual from '@/components/ui/PlanetVisual';

export default function ServicesHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Orbital background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        {[200, 350, 520, 700]?.map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-purple-500/10"
            style={{
              width: size,
              height: size,
              animation: `orbit-spin ${20 + i * 8}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
            }}
          />
        ))}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.8), transparent)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="section-label block mb-6">Our Solar System</span>
        <h1 className="page-title mb-6">
          8 Planets.<br />
          <span className="gradient-text">Infinite Orbits.</span>
        </h1>
        <p className="section-copy max-w-2xl mx-auto">
          Every service we offer is a planet in your marketing solar system — each with its own gravitational force, each perfectly positioned to pull your ideal clients into orbit.
        </p>

        {/* Mini solar system visual */}
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          {['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']?.map((name, i) => {
            const sizes = [28, 36, 24, 52, 44, 32, 38, 20];
            return (
              <PlanetVisual
                key={name}
                name={name}
                size={sizes[i]}
                className="animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}