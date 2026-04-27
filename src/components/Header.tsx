'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[rgba(11,13,26,0.92)] backdrop-blur-xl border-b border-[rgba(42,45,69,0.8)] shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent'
      }`}
    >
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <AppLogo size={56} />
        {/* <span className="font-extrabold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
          POM<span className="text-accent">.</span>
        </span> */}
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks?.map((link) => (
          <Link
            key={link?.href}
            href={link?.href}
            className={`text-sm font-medium transition-colors duration-200 relative group ${pathname === link?.href
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {link?.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${pathname === link?.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
            />
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/contact"
          className="relative px-5 py-2.5 text-sm font-semibold text-foreground rounded-full border border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 transition-all duration-300 group overflow-hidden"
        >
          <span className="relative z-10">Get Free Strategy Call</span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </Link>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 z-50"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span
          className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>
    </div>
  {/* Mobile Menu */ }
  <div
    className={`md:hidden fixed inset-0 bg-[rgba(11,13,26,0.97)] backdrop-blur-2xl z-40 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
  >
    {navLinks?.map((link, i) => (
      <Link
        key={link?.href}
        href={link?.href}
        className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200"
        style={{ transitionDelay: `${i * 50}ms` }}
      >
        {link?.label}
      </Link>
    ))}
    <Link
      href="/contact"
      className="mt-4 px-8 py-3 bg-primary text-foreground rounded-full font-semibold text-base hover:bg-primary/80 transition-colors"
    >
      Get Free Strategy Call
    </Link>
  </div>
    </header >
  );
}