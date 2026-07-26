"use client";

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
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-brown transition-colors hover:text-brown-soft"
        >
          <Menu size={22} />
        </button>

        {/* Logo — larger for a stronger brand presence */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.2em] text-brown"
        >
          LUMIÈRE
        </Link>

        {/* Icons — hover turns brown-soft to keep the identity consistent */}
        <div className="flex items-center gap-4 text-brown">
          <a
            href="https://instagram.com/lumiereaccessories.lu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-brown-soft"
          >
            <InstagramIcon size={19} />
          </a>
          <Link
            href="/cart"
            aria-label="Cart"
            className="transition-colors hover:text-brown-soft"
          >
            <ShoppingBag size={19} />
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
          <span className="font-serif text-lg tracking-[0.2em] text-brown">
            LUMIÈRE
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-brown transition-colors hover:text-brown-soft"
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
                className="block py-3 text-sm text-brown transition-colors hover:text-brown-soft"
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