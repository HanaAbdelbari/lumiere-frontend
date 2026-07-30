"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Music2 } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: "Shop", href: "/shop" },
    { label: "Sale", href: "/shop/sale" },
    { label: "About", href: "/about" },
    { label: "Policy", href: "/policy" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-brown transition-colors hover:text-gold"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="font-logo text-[1.85rem] tracking-[0.32em] text-brown"
        >
          LUMIÈRE
        </Link>

        {/* Header Right Icons */}
        <div className="flex items-center gap-5 text-brown">
          <a
            href="https://instagram.com/lumiereaccessories.lu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-gold"
          >
            <InstagramIcon size={22} />
          </a>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative transition-colors hover:text-gold"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brown px-1 text-[10px] font-semibold text-white leading-none z-10">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
<nav
  className={`fixed left-0 top-0 z-50 flex h-full w-1/2 sm:w-64 flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
        {/* Top Header & Navigation */}
        <div>
          <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
            <span className="font-logo text-lg tracking-[0.3em] text-brown">
              LUMIÈRE
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-1 text-brown transition-colors hover:bg-[#FAF7F2] hover:text-gold"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-[#FAF7F2] hover:text-gold ${
                    link.label === "Sale" ? "text-rose-700" : "text-brown"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.label === "Sale" && (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      Offers
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Socials & Brand Statement */}
        <div className="border-t border-hairline px-6 py-6">
          <p className="text-[11px] font-medium tracking-wider text-stone-400 uppercase">
            Follow Us
          </p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://instagram.com/lumiereaccessories.lu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-brown transition-colors hover:bg-brown hover:text-white"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://tiktok.com/@lumiere_2222"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-brown transition-colors hover:bg-brown hover:text-white"
            >
              <Music2 size={18} />
            </a>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-stone-400">
            Timeless Stainless Steel Accessories
          </p>
        </div>
      </nav>
    </header>
  );
}