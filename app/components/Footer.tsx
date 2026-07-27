// Footer — appears on every page (added in layout).
import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Logo */}
        <div className="mb-8 text-center font-serif text-xl font-medium tracking-[0.3em] text-brown">
          LUMIÈRE
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-medium text-brown">Quick Links</h3>
            <ul className="space-y-2 text-sm text-brown-soft">
              <li><Link href="/shop" className="transition-colors hover:text-gold">Shop</Link></li>
              <li><Link href="/shop/sale" className="transition-colors hover:text-gold">Sale</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-gold">About</Link></li>
              <li><Link href="/policy" className="transition-colors hover:text-gold">Policy</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-brown">Follow Us</h3>
            <ul className="space-y-2 text-sm text-brown-soft">
              <li>
                <a href="https://instagram.com/lumiereaccessories.lu" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@lumiere_2222" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-brown">Support</h3>
            <ul className="space-y-2 text-sm text-brown-soft">
              <li>
                <a href="https://wa.me/2010XXXXXXXX" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-hairline pt-6 text-center text-xs text-muted">
          © 2026 Lumière. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}