import React from 'react';
import Link from 'next/link';

export default function ServicesCTA() {
  return (
    <section className="py-16 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className="glass-card rounded-3xl p-12 md:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(249,115,22,0.1) 100%)',
            borderColor: 'rgba(124,58,237,0.3)',
            boxShadow: '0 0 60px rgba(124,58,237,0.15)',
          }}
        >
          <span className="section-label block mb-4">Ready to Launch?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Not sure which planets<br />
            <span className="gradient-text">your brand needs?</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Book a free 20-minute strategy call. We&apos;ll map your brand&apos;s current orbit and recommend exactly which services will generate the highest ROI for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-primary text-foreground rounded-full font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(124,58,237,0.4)]"
            >
              Book Your Free Strategy Call
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 text-muted-foreground font-medium text-base hover:text-foreground transition-colors"
            >
              Or send us a message
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}