'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const STARS_COUNT = 180;

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    starsRef.current = Array.from({ length: STARS_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      starsRef.current.forEach((star, i) => {
        const twinkle = 0.4 + 0.6 * Math.sin(t * star.speed + i * 0.3);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${star.opacity * twinkle})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Star field canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Nebula blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="nebula-blob absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
            top: '10%',
            left: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="nebula-blob-2 absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
            bottom: '5%',
            right: '-5%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)',
            top: '40%',
            right: '20%',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[280, 420, 560, 700].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-purple-500/10"
            style={{
              width: size,
              height: size,
              transform: `rotate(${i * 15}deg)`,
              animation: `orbit-spin ${20 + i * 8}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          >
            {/* Orbiting dot */}
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? '#A855F7' : '#F97316',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: `0 0 8px ${i % 2 === 0 ? '#A855F7' : '#F97316'}`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Central planet */}
      <div className="absolute right-[8%] top-[20%] w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 z-10 animate-float pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #F97316 0%, #7C3AED 45%, #1a0a3e 80%)',
            boxShadow: '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(249,115,22,0.2), inset -20px -20px 60px rgba(0,0,0,0.5)',
          }}
        />
        {/* Ring around planet */}
        <div
          className="absolute inset-[-20%] rounded-full border-[3px] border-purple-400/30"
          style={{ transform: 'rotateX(75deg)', borderRadius: '50%' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="section-label">Full-Funnel Digital Marketing Agency</span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="block text-foreground">Every Brand</span>
          <span className="block gradient-text">Has Its Orbit.</span>
          <span className="block text-foreground">We Find Yours.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          We map your brand&apos;s gravitational pull, align your digital planets, and launch campaigns that bring clients into your orbit — and keep them there.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/contact"
            className="cosmic-btn relative px-8 py-4 bg-primary text-foreground rounded-full font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)]"
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="/services"
            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:border-primary/50 transition-all duration-300"
          >
            Explore Our Planets
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '50+', label: 'Brands Launched' },
            { value: '3x', label: 'Average ROI' },
            { value: '₹12Cr+', label: 'Revenue Generated' },
            { value: '5★', label: 'Google Rated' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}