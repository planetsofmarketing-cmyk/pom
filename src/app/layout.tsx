import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4028'),
  title: {
    default: 'Best Digital Marketing Agency in Hyderabad | SEO & PPC - Planets of Marketing',
    template: '%s | Planets of Marketing',
  },
  description: 'Planets of Marketing is the premier digital marketing agency in Hyderabad. We drive explosive business growth with SEO, Google Ads, Meta Ads, and Brand Strategy. Book a free consultation!',
  keywords: ['digital marketing agency', 'SEO company Hyderabad', 'Google Ads management', 'social media marketing', 'brand strategy', 'web development', 'performance marketing', 'PPC advertising', 'online marketing', 'marketing agency India'],
  authors: [{ name: 'Planets of Marketing' }],
  creator: 'Planets of Marketing',
  publisher: 'Planets of Marketing',
  openGraph: {
    title: 'Best Digital Marketing Agency in Hyderabad | Planets of Marketing',
    description: 'Premier digital marketing agency in Hyderabad. SEO, paid ads, social media, and brand strategy that drives real results.',
    url: 'https://planetsofmarketing.com',
    siteName: 'Planets of Marketing',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planets of Marketing | Digital Marketing Agency',
    description: 'Premier digital marketing agency in Hyderabad. SEO, paid ads, social media, and brand strategy.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NH9K55KW');`}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '991419507291062');
          fbq('track', 'PageView');`}
        </Script>
      </head>
      <body className={plusJakartaSans.className}>
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=991419507291062&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NH9K55KW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}