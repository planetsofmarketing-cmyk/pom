'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Metric {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  campaign?: string;
  result: string;
  metrics: Metric[];
  quote: string;
  author: string;
  role: string;
  image: string | null;
  alt: string;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    client: 'Clifford Charles & Co.',
    industry: 'ACCOUNTING & TAX • NEW YORK',
    challenge: 'Clifford Charles & Co. wanted to generate relevant inquiries for its tax and audit services and turn digital demand into real business opportunities.',
    campaign: 'With a focused $500 advertising campaign, we generated 6 tracked inquiries, with 3 converting into clients.',
    result: '$500 AD SPEND • $90K REVENUE • 180× ROAS',
    metrics: [
      { value: 50, suffix: '%', label: 'Lead-to-client conversion rate' },
      { value: 90, prefix: '$', suffix: 'K', label: 'Client revenue generated' },
      { value: 180, suffix: '×', label: 'ROAS' },
      { value: 17900, suffix: '%', label: 'ROI' },
    ],
    quote: 'The campaign turned a focused advertising investment into measurable client acquisition and significant business revenue.',
    author: 'Clifford Charles & Co.',
    role: 'New York, USA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d53c6670-1767313045322.png",
    alt: '',
    color: '#F97316',
  },
  {
    client: 'AgroVista',
    industry: 'AGRI-TECH • INDIA',
    challenge: 'Building stronger visibility and engagement across the digital agriculture audience.',
    campaign: 'We paired product-led agriculture content with SEO, YouTube, social media, and influencer marketing to put AgroVista products and machinery in front of a wider farming audience.',
    result: 'SEO YOUTUBE • SOCIAL MEDIA • INFLUENCER MARKETING',
    metrics: [
      { value: 130, suffix: 'K+', label: 'YouTube subscribers' },
      { value: 40, suffix: 'M+', label: 'Total impressions' },
    ],
    quote: 'We turned agricultural content into a consistent growth engine through SEO, social media and creator-led marketing.',
    author: 'AgroVista',
    role: 'Agricultural products & machinery · India',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=85',
    alt: 'Green-and-white agricultural tractor working in a green field',
    color: '#F97316',
  },
];


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

function MetricCard({ metric, started }: { metric: Metric; started: boolean }) {
  const count = useCounter(metric.value, 1800, started);
  return (
    <div className="min-w-0 text-left">
      <div className="whitespace-nowrap text-3xl font-extrabold text-foreground sm:text-4xl">
        {metric.prefix}{new Intl.NumberFormat('en-US').format(count)}{metric.suffix}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase leading-snug text-muted-foreground sm:text-xs">{metric.label}</div>
    </div>
  );
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
          <h2 className="section-heading mb-4">
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
                {study.image ? (
                  <div className="aspect-[4/5] w-full flex-shrink-0 overflow-hidden rounded-2xl sm:w-64">
                    <AppImage
                      src={study.image}
                      alt={study.alt}
                      width={300}
                      height={375}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-[4/5] w-full flex-shrink-0 flex-col justify-between overflow-hidden border border-border bg-[#111214] p-6 sm:w-64">
                    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(249,115,22,0.2), transparent 65%)' }} aria-hidden="true" />
                    <span className="relative section-label">Campaign snapshot</span>
                    <div className="relative">
                      <span className="text-xs uppercase text-muted-foreground">Advertising spend</span>
                      <p className="mt-1 text-5xl font-extrabold text-foreground">$500</p>
                    </div>
                    <div className="relative grid grid-cols-2 gap-4 border-t border-border pt-4">
                      <div>
                        <p className="text-2xl font-bold text-accent">6</p>
                        <span className="text-[10px] uppercase text-muted-foreground">Tracked inquiries</span>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">3</p>
                        <span className="text-[10px] uppercase text-muted-foreground">New clients</span>
                      </div>
                    </div>
                    <span className="relative text-xs text-muted-foreground">Tax &amp; audit · New York</span>
                  </div>
                )}
                <div className="flex flex-col justify-center flex-1">
                  <span className="section-label mb-3">{study.industry}</span>
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">{study.client}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    <span className="text-foreground font-semibold">The brief: </span>{study.challenge}
                  </p>
                  {study.campaign && (
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">The campaign: </span>{study.campaign}
                    </p>
                  )}
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
              <div className={`glass-card rounded-2xl p-6 sm:p-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`} style={{ borderColor: `${study.color}30` }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-7">
                  {study.metrics.map((metric) => (
                    <MetricCard key={metric.label} metric={metric} started={started[idx]} />
                  ))}
                </div>
                <div className="mt-7 border-t border-border pt-5">
                  <span
                    className="inline-block text-xs font-bold leading-relaxed text-accent sm:text-sm"
                  >
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