import type { Metadata } from "next";
// Next.js can load Google Fonts in an optimized way, right here.
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Load Cormorant Garamond (our heading font) and expose it as a CSS variable.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

// Load Inter (our body font).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lumière — Timeless Accessories",
  description: "Elegant stainless steel accessories designed for every moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Attach both font variables so they're available site-wide,
          and default the body text to Inter. */}
      <body className={`${cormorant.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}