'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const caseStudies = [
{
  client: 'Hyderabad Fashion Co.',
  industry: 'E-Commerce • Apparel',
  challenge: 'Zero digital presence, relying entirely on walk-in traffic and word of mouth.',
  result: '312% revenue growth',
  metric1: { value: 312, suffix: '%', label: 'Revenue Growth' },
  metric2: { value: 4.8, suffix: 'x', label: 'ROAS on Meta Ads' },
  quote: 'Planets of Marketing took us from invisible to undeniable in six months.',
  author: 'Priya Reddy',
  role: 'Founder, Hyderabad Fashion Co.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d53c6670-1767313045322.png",
  alt: 'Modern fashion boutique interior with warm lighting, clothing racks, and minimal dark decor',
  color: '#F97316'
},
{
  client: 'TechVenture Labs',
  industry: 'B2B SaaS • Hyderabad',
  challenge: 'High CAC and poor-quality inbound leads from generic Google campaigns.',
  result: '60% lower CAC',
  metric1: { value: 60, suffix: '%', label: 'Lower Cost Per Lead' },
  metric2: { value: 220, suffix: '+', label: 'Qualified Leads / Month' },
  quote: 'The SEO + paid ads combination they built for us is our biggest lead source now.',
  author: 'Karthik Nambiar',
  role: 'CEO, TechVenture Labs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dce3f628-1772832763694.png",
  alt: 'Tech startup office with dark screens showing analytics dashboards, dim ambient lighting, deep blue tones',
  color: '#A855F7'
}];


function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const isDecimal = target % 1 !== 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function MetricCard({ metric, started }: {metric: {value: number;suffix: string;label: string;};started: boolean;}) {
  const count = useCounter(metric.value, 1800, started);
  return (
    <div className="text-center lg:text-left">
      <div className="text-5xl font-extrabold text-foreground tracking-tight">
        {count}{metric.suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{metric.label}</div>
    </div>);

}

export default function ResultsSection() {
  const [started, setStarted] = useState<boolean[]>([false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(card);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0D0F20] to-background pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-label block mb-4">Proof of Orbit</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Real Brands. Real Results.
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light">
            We don&apos;t celebrate until you do. Here&apos;s what our clients achieved.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {caseStudies.map((study, idx) =>
          <div
            key={study.client}
            ref={(el) => {cardRefs.current[idx] = el;}}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-10 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
              {/* Image + quote — 2 cols */}
              <div className={`lg:col-span-2 flex flex-col sm:flex-row gap-8 items-start ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="w-full sm:w-64 flex-shrink-0 overflow-hidden rounded-2xl aspect-[4/5]">
                  <AppImage
                  src={study.image}
                  alt={study.alt}
                  width={300}
                  height={375}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <span className="section-label mb-3" style={{ color: study.color }}>{study.industry}</span>
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">{study.client}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    <span className="text-foreground font-semibold">The challenge: </span>{study.challenge}
                  </p>
                  <blockquote className="text-base text-foreground/80 italic leading-relaxed border-l-2 pl-4 mb-4" style={{ borderColor: study.color }}>
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{study.author}</span>
                    <span className="text-xs text-muted-foreground block">{study.role}</span>
                  </div>
                </div>
              </div>

              {/* Metrics — 1 col */}
              <div className={`glass-card rounded-2xl p-8 flex flex-col gap-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`} style={{ borderColor: `${study.color}30` }}>
                <MetricCard metric={study.metric1} started={started[idx]} />
                <div className="w-full h-px bg-border" />
                <MetricCard metric={study.metric2} started={started[idx]} />
                <div className="mt-2">
                  <span
                  className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide"
                  style={{ background: `${study.color}20`, color: study.color }}>
                  
                    {study.result}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}