"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  // Only show the cart badge after the component has mounted in the browser,
  // so the server and client render the same thing (avoids hydration mismatch).
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

        {/* Logo — wider letter spacing, medium weight for a refined look */}
        <Link
          href="/"
          className="font-logo text-[1.85rem] tracking-[0.32em] text-brown"
        >
          LUMIÈRE
        </Link>

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

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <span className="font-logo text-lg tracking-[0.3em] text-brown">
            LUMIÈRE
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-brown transition-colors hover:text-gold"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="px-5 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm text-brown transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}