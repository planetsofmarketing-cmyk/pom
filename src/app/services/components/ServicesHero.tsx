import React from 'react';

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
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.05]">
          8 Planets.<br />
          <span className="gradient-text">Infinite Orbits.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          Every service we offer is a planet in your marketing solar system — each with its own gravitational force, each perfectly positioned to pull your ideal clients into orbit.
        </p>

        {/* Mini solar system visual */}
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          {['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']?.map((name, i) => {
            const colors = ['#F97316', '#A855F7', '#EF4444', '#F59E0B', '#10B981', '#38BDF8', '#6366F1', '#94A3B8'];
            const sizes = [28, 36, 24, 52, 44, 32, 38, 20];
            return (
              <div
                key={name}
                className="rounded-full flex-shrink-0 animate-float"
                style={{
                  width: sizes?.[i],
                  height: sizes?.[i],
                  background: `radial-gradient(circle at 35% 35%, white, ${colors?.[i]}, #0B0D1A)`,
                  boxShadow: `0 0 12px ${colors?.[i]}60`,
                  animationDelay: `${i * 0.4}s`,
                }}
                title={name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}