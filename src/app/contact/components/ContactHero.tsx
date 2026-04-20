import React from 'react';

export default function ContactHero() {
  return (
    <section className="relative pt-40 pb-16 overflow-hidden">
      {/* Constellation dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { x: '10%', y: '20%', size: 3 },
          { x: '25%', y: '60%', size: 2 },
          { x: '40%', y: '30%', size: 4 },
          { x: '60%', y: '70%', size: 2 },
          { x: '75%', y: '25%', size: 3 },
          { x: '85%', y: '55%', size: 2 },
          { x: '90%', y: '80%', size: 4 },
          { x: '15%', y: '85%', size: 2 },
        ]?.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 animate-twinkle"
            style={{
              left: dot?.x,
              top: dot?.y,
              width: dot?.size,
              height: dot?.size,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Constellation lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="10%" y1="20%" x2="25%" y2="60%" stroke="rgba(168,85,247,0.1)" strokeWidth="1" />
          <line x1="25%" y1="60%" x2="40%" y2="30%" stroke="rgba(168,85,247,0.1)" strokeWidth="1" />
          <line x1="75%" y1="25%" x2="85%" y2="55%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
          <line x1="85%" y1="55%" x2="90%" y2="80%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        </svg>

        <div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.8), transparent)',
            top: '-10%',
            right: '10%',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="section-label block mb-6">Mission Control</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.05]">
          Let&apos;s Chart<br />
          <span className="gradient-text">Your Course.</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground font-light leading-relaxed">
          Every great mission starts with a conversation. Tell us where you want to go — we&apos;ll build the rocket to get you there.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {[
            { icon: '⚡', label: 'We respond within 4 hours' },
            { icon: '🎯', label: '20-min free strategy call' },
            { icon: '🔒', label: 'Zero obligation, zero pressure' },
          ]?.map((item) => (
            <div key={item?.label} className="flex items-center gap-2">
              <span className="text-lg">{item?.icon}</span>
              <span className="text-sm text-muted-foreground">{item?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}