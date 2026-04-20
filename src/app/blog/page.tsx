'use client';

import React, { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Strategy', 'Case Studies'];

const posts = [
  {
    slug: 'how-to-choose-right-marketing-agency',
    title: 'How to Choose the Right Marketing Agency for Your Business in 2026',
    excerpt: 'Not all agencies are built the same. Here is the exact framework we recommend to every founder evaluating their first agency partnership — and the red flags that should make you walk away.',
    category: 'Strategy',
    readTime: '7 min read',
    date: 'Apr 15, 2026',
    featured: true,
    planet: '🪐',
    color: '#A855F7',
    tags: ['Agency Selection', 'Strategy', 'Growth'],
  },
  {
    slug: 'top-digital-marketing-trends-india-2026',
    title: 'Top 5 Digital Marketing Trends Reshaping India in 2026',
    excerpt: 'From AI-generated content to hyperlocal targeting, the Indian digital landscape is evolving faster than ever. Here is what is actually working right now.',
    category: 'Strategy',
    readTime: '6 min read',
    date: 'Apr 10, 2026',
    featured: true,
    planet: '🌍',
    color: '#38BDF8',
    tags: ['Trends', 'India', '2026'],
  },
  {
    slug: 'what-is-roi-digital-marketing',
    title: 'What is ROI in Digital Marketing? A No-Nonsense Guide',
    excerpt: 'Most agencies throw around ROI numbers without explaining what they actually mean. This guide breaks down how to calculate, track, and improve your real marketing ROI.',
    category: 'Strategy',
    readTime: '5 min read',
    date: 'Apr 5, 2026',
    featured: false,
    planet: '💫',
    color: '#F97316',
    tags: ['ROI', 'Analytics', 'Beginners'],
  },
  {
    slug: 'case-study-local-business-3x-sales',
    title: 'Case Study: How We Helped a Hyderabad Restaurant 3x Their Monthly Bookings',
    excerpt: 'From 20 bookings a month to 200+. Here is the exact strategy — channels, budget, creative approach, and timeline — that transformed The Saffron Table\'s online presence.',
    category: 'Case Studies',
    readTime: '9 min read',
    date: 'Mar 28, 2026',
    featured: false,
    planet: '🔴',
    color: '#EF4444',
    tags: ['Case Study', 'Restaurant', 'Instagram'],
  },
  {
    slug: 'seo-vs-paid-ads-which-is-right',
    title: 'SEO vs Paid Ads: Which Channel Should You Invest In First?',
    excerpt: 'The eternal debate. The honest answer depends on your timeline, budget, and business model. Here is how to make the right call for your specific situation.',
    category: 'SEO',
    readTime: '8 min read',
    date: 'Mar 20, 2026',
    featured: false,
    planet: '🟣',
    color: '#A855F7',
    tags: ['SEO', 'Paid Ads', 'Strategy'],
  },
  {
    slug: 'instagram-marketing-strategy-india',
    title: 'Instagram Marketing Strategy for Indian Small Businesses in 2026',
    excerpt: 'Reels, carousels, stories, or DMs? We break down what is actually driving growth for Indian SMBs on Instagram right now — with real data from our client accounts.',
    category: 'Social Media',
    readTime: '7 min read',
    date: 'Mar 12, 2026',
    featured: false,
    planet: '🟠',
    color: '#F97316',
    tags: ['Instagram', 'Social Media', 'India'],
  },
  {
    slug: 'google-ads-first-campaign-guide',
    title: 'How to Run Your First Google Ads Campaign Without Wasting Money',
    excerpt: 'Most first-time Google Ads campaigns burn budget in the first 2 weeks. Here is the setup checklist, bidding strategy, and targeting approach we use for every new client.',
    category: 'Paid Ads',
    readTime: '10 min read',
    date: 'Mar 5, 2026',
    featured: false,
    planet: '🔵',
    color: '#38BDF8',
    tags: ['Google Ads', 'Paid Ads', 'Beginners'],
  },
  {
    slug: 'content-marketing-b2b-india',
    title: 'Content Marketing for B2B Brands in India: What Actually Works',
    excerpt: 'LinkedIn thought leadership, long-form SEO content, or email newsletters? Here is what the data says about B2B content ROI in the Indian market.',
    category: 'SEO',
    readTime: '6 min read',
    date: 'Feb 25, 2026',
    featured: false,
    planet: '⭐',
    color: '#10B981',
    tags: ['Content', 'B2B', 'LinkedIn'],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? posts : posts?.filter((p) => p?.category === activeCategory);
  const featured = posts?.filter((p) => p?.featured);
  const regular = filtered?.filter((p) => !p?.featured);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="nebula-blob absolute w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)', top: '-20%', left: '-10%', filter: 'blur(80px)' }} />
          <div className="nebula-blob-2 absolute w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)', bottom: '0%', right: '0%', filter: 'blur(80px)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="section-label block mb-4">Transmission Log</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-foreground">The</span>{' '}
            <span className="gradient-text">Signal</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Marketing insights, case studies, and growth strategies from the Planets of Marketing crew. No fluff — just signals that move the needle.
          </p>
        </div>
      </section>
      {/* Featured Posts */}
      {activeCategory === 'All' && (
        <section className="relative py-8">
          <div className="max-w-7xl mx-auto px-6">
            <span className="section-label block mb-6">Featured Transmissions</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured?.map((post) => (
                <article
                  key={post?.slug}
                  className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Planet visual header */}
                  <div
                    className="relative h-48 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${post?.color}15 0%, rgba(11,13,26,0.8) 100%)` }}
                  >
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                      <div className="absolute w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, ${post?.color}40, transparent)`, top: '10%', right: '15%', filter: 'blur(20px)' }} />
                    </div>
                    <div
                      className="w-24 h-24 rounded-full animate-float"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${post?.color} 0%, rgba(11,13,26,0.9) 80%)`,
                        boxShadow: `0 0 40px ${post?.color}50`,
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `${post?.color}20`, color: post?.color, border: `1px solid ${post?.color}40` }}
                      >
                        {post?.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span>{post?.date}</span>
                      <span>·</span>
                      <span>{post?.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
                      {post?.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">{post?.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post?.tags?.slice(0, 2)?.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs text-muted-foreground bg-white/5 border border-border/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200" style={{ color: post?.color }}>
                        Read More
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Category Filter */}
      <section className="relative py-6 sticky top-[72px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary/20 text-primary border border-primary/50' :'text-muted-foreground hover:text-foreground border border-transparent hover:border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* All Posts Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          {activeCategory !== 'All' && (
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-foreground">{activeCategory}</h2>
              <p className="text-sm text-muted-foreground mt-1">{filtered?.length} articles</p>
            </div>
          )}
          {activeCategory === 'All' && (
            <span className="section-label block mb-6">All Transmissions</span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(activeCategory === 'All' ? regular : filtered)?.map((post) => (
              <article
                key={post?.slug}
                className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Mini planet header */}
                <div
                  className="relative h-32 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${post?.color}10 0%, rgba(11,13,26,0.9) 100%)` }}
                >
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${post?.color} 0%, rgba(11,13,26,0.9) 80%)`,
                      boxShadow: `0 0 25px ${post?.color}40`,
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${post?.color}20`, color: post?.color, border: `1px solid ${post?.color}40` }}
                    >
                      {post?.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <span>{post?.date}</span>
                    <span>·</span>
                    <span>{post?.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200 flex-1">
                    {post?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4 line-clamp-3">{post?.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                    <div className="flex flex-wrap gap-1.5">
                      {post?.tags?.slice(0, 2)?.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs text-muted-foreground bg-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200" style={{ color: post?.color }}>
                      Read
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered?.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🌌</div>
              <p className="text-muted-foreground">No articles in this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
      {/* Newsletter CTA */}
      <section className="relative py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', top: '-20%', right: '-10%', filter: 'blur(50px)' }} />
              <div className="absolute w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F97316, transparent)', bottom: '-10%', left: '-5%', filter: 'blur(50px)' }} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">📡</div>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">Stay in the Signal</h2>
              <p className="text-muted-foreground font-light mb-7 max-w-md mx-auto">
                Get our best marketing insights delivered to your inbox. No spam — just actionable strategies, case studies, and growth ideas.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 w-full px-5 py-3 rounded-full bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="flex-shrink-0 px-6 py-3 bg-primary text-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Join 1,200+ marketers and founders. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
