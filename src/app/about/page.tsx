'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STARS_COUNT = 120;

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
}

const values = [
  {
    icon: '🔭',
    title: 'Data-Driven Decisions',
    desc: 'Every strategy is backed by analytics, competitor research, and real market signals — never guesswork.',
    color: '#A855F7',
  },
  {
    icon: '🚀',
    title: 'Full-Funnel Focus',
    desc: 'From first impression to loyal customer, we manage the entire gravitational journey of your brand.',
    color: '#F97316',
  },
  {
    icon: '🌌',
    title: 'Radical Transparency',
    desc: 'Real-time dashboards, honest reporting, and zero hidden fees. You always know exactly where your budget goes.',
    color: '#38BDF8',
  },
  {
    icon: '⭐',
    title: 'Results-First Culture',
    desc: 'We measure success by your growth metrics — leads, revenue, and ROI — not vanity numbers.',
    color: '#10B981',
  },
];

const team = [
  {
    name: 'Sandeep Singh Gurhar',
    role: 'Co-Founder & Growth Lead',
    bio: 'Shapes growth strategy across acquisition channels, bringing business goals, positioning, and campaign priorities into one focused plan.',
    focus: 'Growth roadmaps, channel mix, and campaign priorities.',
    initial: 'S',
    color: '#A855F7',
  },
  {
    name: 'Ramest Gupta',
    role: 'Co-Founder & Market Research Lead',
    bio: 'Studies customer needs, category trends, and competitor positioning to help brands find the right audience and opportunity.',
    focus: 'Customer insights, competitor research, and market opportunities.',
    initial: 'R',
    color: '#F97316',
  },
  {
    name: 'Tushar Maheshwari',
    role: 'CTO & Analytics Lead',
    bio: 'Leads the technology and analytics behind client growth, connecting websites, tracking, and reporting so teams can measure performance and make confident optimization decisions.',
    focus: 'Web systems, analytics implementation, tracking, and reporting.',
    initial: 'T',
    color: '#38BDF8',
  },
];

const milestones = [
  { year: '2025', event: 'Founded Planets of Marketing to help ambitious brands build focused, full-funnel digital growth.' },
  { year: '2026', event: 'Partnering with 7+ brands across India to grow visibility, audiences, and revenue.' },
];

export default function AboutPage() {
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

    starsRef.current = Array.from({ length: STARS_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.4 + 0.1,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;
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
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div
            className="nebula-blob absolute w-[500px] h-[500px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)', top: '-10%', left: '-5%', filter: 'blur(70px)' }}
          />
          <div
            className="nebula-blob-2 absolute w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)', bottom: '0%', right: '5%', filter: 'blur(80px)' }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="section-label block mb-4">Our Story</span>
          <h1 className="page-title mb-6">
            <span className="text-foreground">We Orbit Around</span>
            <br />
            <span className="gradient-text">Your Growth.</span>
          </h1>
          <p className="section-copy max-w-2xl mx-auto">
            Planets of Marketing was born from a simple belief: every brand has a gravitational force waiting to be unleashed. We find it, amplify it, and put it to work.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label block mb-4">Why We Exist</span>
              <h2 className="section-heading mb-6">
                Built for Brands That Refuse to Stay Small
              </h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  In 2025, we watched too many great Hyderabad & Gurugram businesses get outspent by mediocre competitors with bigger budgets. The problem wasn&apos;t money — it was strategy.
                </p>
                <p>
                  We founded Planets of Marketing to level the playing field. Our mission: give every ambitious brand access to the kind of data-driven, full-funnel marketing that was previously reserved for enterprise companies with massive budgets.
                </p>
                <p>
                  Today, we&apos;ve helped 7+ brands across India find their orbit — from local restaurants to funded startups to established enterprises.
                </p>
              </div>
            </div>

            {/* Milestone timeline — horizontal cards, not vertical numbered list */}
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="glass-card rounded-xl p-4 group hover:border-primary/40 transition-all duration-300"
                  style={{ borderLeft: '2px solid var(--accent)' }}
                >
                  <div className="text-xs font-bold mb-1 text-accent">{m.year}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #38BDF8, transparent)', top: '30%', right: '15%', filter: 'blur(80px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-10 relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #A855F7, transparent)', filter: 'blur(30px)' }} />
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                To make world-class digital marketing accessible to every ambitious Indian brand — delivering measurable growth through strategy, creativity, and relentless execution.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-10 relative overflow-hidden group hover:border-accent/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F97316, transparent)', filter: 'blur(30px)' }} />
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                To become India&apos;s most trusted growth partner for brands that want to compete globally — building a constellation of success stories from Hyderabad to the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label block mb-4">What Drives Us</span>
            <h2 className="section-heading">
              Our Core Principles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card rounded-2xl p-7 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{v.desc}</p>
                <div className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16" style={{ background: v.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', bottom: '10%', left: '5%', filter: 'blur(90px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label block mb-4">The Crew</span>
            <h2 className="section-heading">
              Meet the Navigators
            </h2>
            <p className="mt-4 text-muted-foreground font-light max-w-xl mx-auto">
              A tight-knit team of specialists who live and breathe growth marketing.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass-card flex h-full flex-col rounded-2xl p-8 group hover:border-primary/30 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold mb-5 bg-primary/10 text-primary"
                >
                  {member.initial}
                </div>
                <h3 className="min-h-7 text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="min-h-5 text-xs font-semibold mb-3 text-accent">{member.role}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{member.bio}</p>
                <div className="mt-auto flex min-h-16 items-start gap-2 rounded-lg bg-white/5 p-3">
                  <span className="text-base">✨</span>
                  <p className="text-xs text-muted-foreground italic">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', top: '-20%', right: '-10%', filter: 'blur(50px)' }} />
              <div className="absolute w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F97316, transparent)', bottom: '-10%', left: '-5%', filter: 'blur(50px)' }} />
            </div>
            <div className="relative z-10">
              <span className="section-label block mb-4">Ready to Launch?</span>
              <h2 className="section-heading mb-4">
                Let&apos;s Build Your Orbit Together
              </h2>
              <p className="text-muted-foreground font-light mb-8 max-w-lg mx-auto">
                Book a free 20-minute strategy call. No pitch, no pressure — just an honest conversation about your growth goals.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-foreground rounded-full font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)]"
              >
                Book a Free Strategy Call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
