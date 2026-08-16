import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fitlifebd.com'),
  title: "Fitlife Gym Bangladesh | Train. Transform. Dominate.",
  description:
    "Bangladesh's premier fitness chain with 7 locations across Rajshahi & Dhaka. Expert coaches, premium equipment, and real results since 2017. Join 11,000+ members today.",
  keywords: "gym Bangladesh, fitness Rajshahi, gym Dhaka, personal training Bangladesh, Fitlife gym",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fitlife Gym Bangladesh | Train. Transform. Dominate.",
    description: "7 locations. 30+ coaches. 11,000+ members. Join Bangladesh's premier fitness chain.",
    type: "website",
    locale: "en_BD",
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Fitlife Gym Bangladesh - Premium Fitness Facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitlife Gym Bangladesh',
    description: 'Join Bangladesh\'s premier fitness chain today.',
    images: ['/images/hero-bg.png'],
  },
  verification: {
    google: "Aru-rsVdlkH-zPad_MaKCbMAFg6yN3NL68dY0yuK4Tw",
  },
};

import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              "name": "Fitlife Gym Bangladesh",
              "image": "https://fitlifebd.com/images/hero-bg.png",
              "@id": "https://fitlifebd.com",
              "url": "https://fitlifebd.com",
              "telephone": "+8801632442096",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rajshahi & Dhaka",
                "addressLocality": "Dhaka",
                "addressCountry": "BD"
              },
              "description": "Bangladesh's premier fitness chain with 7 locations. Expert coaches, premium equipment, and real results since 2017."
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: '#080808', color: '#f0f0f0' }}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TMT7B6ZYMM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TMT7B6ZYMM');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
