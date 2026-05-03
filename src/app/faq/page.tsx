'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  {
    label: 'General',
    icon: '🌌',
    color: '#A855F7',
    faqs: [
      {
        q: 'What exactly does Planets of Marketing do?',
        a: 'We are a full-funnel digital marketing agency based in Hyderabad. We handle everything from SEO and paid ads to social media, content, brand strategy, and email marketing. Think of us as your outsourced growth team — we plug in, align your digital planets, and drive measurable results.',
      },
      {
        q: 'Who do you typically work with?',
        a: 'We work with ambitious brands across all stages — from local Hyderabad businesses looking to grow their online presence, to funded startups scaling aggressively, to established enterprises wanting to dominate their category. If you want real growth, we are the right fit.',
      },
      {
        q: 'How is Planets of Marketing different from other agencies?',
        a: 'Three things set us apart: (1) We are obsessively data-driven — every decision is backed by analytics. (2) We are full-funnel — we do not just run ads, we manage the entire customer journey. (3) We are radically transparent — you get real-time dashboards and honest reporting, no smoke and mirrors.',
      },
    ],
  },
  {
    label: 'Services',
    icon: '🪐',
    color: '#F97316',
    faqs: [
      {
        q: 'Do I need to hire you for all services or can I pick one?',
        a: 'You can absolutely start with a single service. Many clients begin with SEO or paid ads, then expand as they see results. We will recommend the right starting point based on your goals and budget during our free strategy call.',
      },
      {
        q: 'How long before I see results from SEO?',
        a: 'SEO is a long-term investment. Most clients see meaningful movement in rankings within 3-4 months, with significant traffic and lead growth by month 6. Paid ads, on the other hand, can generate leads within the first week of launch.',
      },
      {
        q: 'Do you work with businesses outside Hyderabad?',
        a: 'Yes. While we are based in Hyderabad and have deep expertise in the local market, we work with clients across India and internationally. Digital marketing has no borders — your growth should not either.',
      },
      {
        q: 'Can you help with website design and development?',
        a: 'Yes. Website design and development is one of our core service planets. We build fast, conversion-optimized websites that are designed to rank on Google and turn visitors into leads.',
      },
    ],
  },
  {
    label: 'Pricing',
    icon: '💫',
    color: '#38BDF8',
    faqs: [
      {
        q: 'How much does it cost to work with you?',
        a: 'Our pricing depends on the scope of work, services selected, and your growth goals. We offer flexible monthly retainers starting from ₹25,000/month for focused single-service engagements, up to full-funnel packages for brands ready to scale aggressively. Book a free call and we will give you a transparent quote.',
      },
      {
        q: 'Do you require long-term contracts?',
        a: 'We offer both monthly rolling agreements and 6-month/12-month contracts. Longer commitments come with better rates. We are confident in our results, so we do not lock you in — we earn your business every month.',
      },
      {
        q: 'Is there a setup or onboarding fee?',
        a: 'For most services, there is a one-time onboarding fee that covers account audits, strategy development, and campaign setup. This is disclosed upfront — no hidden charges, ever.',
      },
    ],
  },
  {
    label: 'Working Together',
    icon: '🚀',
    color: '#10B981',
    faqs: [
      {
        q: 'What does the onboarding process look like?',
        a: 'After signing, we kick off with a deep-dive discovery session to understand your business, competitors, and goals. We then deliver a 90-day strategy roadmap within 5 business days. Campaigns go live within 2 weeks of onboarding.',
      },
      {
        q: 'How do you report results and how often?',
        a: 'You get access to a live dashboard from day one. We also send weekly performance snapshots and hold monthly strategy calls to review results, discuss learnings, and plan the next phase.',
      },
      {
        q: 'Who will be my point of contact?',
        a: 'You will have a dedicated account manager who is your single point of contact. Behind them is a team of specialists — paid media, SEO, content, design — all working on your account. You get a team, not a freelancer.',
      },
      {
        q: 'What do you need from us to get started?',
        a: 'Primarily: access to your existing accounts (Google Ads, Meta, website analytics), your brand guidelines, and a clear brief on your goals. We handle the rest. We are designed to be low-friction for busy founders and marketing teams.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-primary/40' : 'hover:border-primary/20'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-foreground leading-snug">{q}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${open ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary/50'}`}
        >
          <svg className="w-3 h-3 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-6 text-sm text-muted-foreground font-light leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="nebula-blob absolute w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)', top: '-15%', right: '-5%', filter: 'blur(80px)' }} />
          <div className="nebula-blob-2 absolute w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)', bottom: '0%', left: '-5%', filter: 'blur(80px)' }} />
          {/* Decorative stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="section-label block mb-4">Got Questions?</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-foreground">Mission</span>{' '}
            <span className="gradient-text">Briefing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know before launching your brand into orbit with us. No jargon, no fluff — just straight answers.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="relative py-4 sticky top-[72px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === i
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground bg-transparent'
                  }`}
                style={activeCategory === i ? { background: `${cat.color}20`, border: `1px solid ${cat.color}50`, color: cat.color } : { border: '1px solid transparent' }}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-3xl">{categories[activeCategory].icon}</span>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">{categories[activeCategory].label}</h2>
              <p className="text-sm text-muted-foreground">{categories[activeCategory].faqs.length} questions</p>
            </div>
          </div>
          <div className="space-y-3">
            {categories[activeCategory].faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="relative py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute w-48 h-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', top: '-20%', right: '-5%', filter: 'blur(40px)' }} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🛸</div>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">Still Have Questions?</h2>
              <p className="text-muted-foreground font-light mb-7 max-w-md mx-auto">
                Book a free 20-minute call with our team. We will answer every question and give you a clear picture of what working together looks like.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 bg-primary text-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                >
                  Book a Free Strategy Call
                </Link>
                <a
                  href="mailto:@planetsofmarketing@gmail.com"
                  className="px-7 py-3.5 rounded-full border border-border text-muted-foreground font-semibold text-sm hover:border-primary/50 hover:text-foreground transition-all duration-300"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
