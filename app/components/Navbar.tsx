"use client"; // has interaction (opening/closing the menu), so it runs in the browser

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Shop", href: "/shop" },
    { label: "Sale", href: "/shop/sale" },
    { label: "About", href: "/about" },
    { label: "Policy", href: "/policy" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Left: hamburger button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-brown"
        >
          <Menu size={22} />
        </button>

        {/* Center: logo */}
        <Link href="/" className="font-serif text-xl tracking-[0.2em] text-brown">
          LUMIÈRE
        </Link>

        {/* Right: instagram + cart */}
        <div className="flex items-center gap-4 text-brown">
          <a
            href="https://instagram.com/lumiereaccessories.lu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon size={19} />
          </a>
          <Link href="/cart" aria-label="Cart">
            <ShoppingBag size={19} />
          </Link>
        </div>
      </div>

      {/* Dark overlay behind the drawer — clicking it closes the menu. */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
          aria-hidden="true"
        />
      )}

      {/* Side drawer that slides in from the LEFT. */}
      <nav
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <span className="font-serif text-lg tracking-[0.2em] text-brown">
            LUMIÈRE
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-brown"
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
                className="block py-3 text-sm text-brown"
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