import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "De18MiljoensteBondscoach",
  description: "Maak jouw ideale Oranje-opstelling en deel hem met vrienden.",

  openGraph: {
    title: "De18MiljoensteBondscoach",
    description: "Maak jouw ideale Oranje-opstelling en deel hem met vrienden.",
    url: "https://de18miljoenstebondscoach.nl",
    siteName: "De18MiljoensteBondscoach.nl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "nl_NL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "De18MiljoensteBondscoach",
    description: "Maak jouw ideale Oranje-opstelling en deel hem met vrienden.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
