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
  title: "Fitlife Gym Bangladesh | Train. Transform. Dominate.",
  description:
    "Bangladesh's premier fitness chain with 7 locations across Rajshahi & Dhaka. Expert coaches, premium equipment, and real results since 2017. Join 1,000+ members today.",
  keywords: "gym Bangladesh, fitness Rajshahi, gym Dhaka, personal training Bangladesh, Fitlife gym",
  openGraph: {
    title: "Fitlife Gym Bangladesh | Train. Transform. Dominate.",
    description: "7 locations. 30+ coaches. 1,000+ members. Join Bangladesh's premier fitness chain.",
    type: "website",
    locale: "en_BD",
  },
  verification: {
    google: "Aru-rsVdlkH-zPad_MaKCbMAFg6yN3NL68dY0yuK4Tw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col" style={{ background: '#080808', color: '#f0f0f0' }}>
        {children}
      </body>
    </html>
  );
}
