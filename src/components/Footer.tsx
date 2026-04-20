import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[#080A15]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/homepage" className="flex items-center gap-3">
              <AppLogo size={32} />
              <span className="font-extrabold text-base tracking-tight text-foreground">
                Planets of Marketing
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Your orbit around growth starts here. Full-funnel digital marketing from Hyderabad.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <Link href="/homepage" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Free Audit</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {['Instagram', 'LinkedIn', 'Twitter']?.map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
              >
                <span className="text-xs font-bold">{s?.[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Planets of Marketing. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}