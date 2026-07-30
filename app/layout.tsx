import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-custom",
});

// Bodoni Moda — used ONLY for the LUMIÈRE logo (fashion-house feel).
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-logo",
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
      <body className={`${cormorant.variable} ${jakarta.variable} ${bodoni.variable} font-sans`}>
        {/* These appear on every page, above the page content. */}
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}