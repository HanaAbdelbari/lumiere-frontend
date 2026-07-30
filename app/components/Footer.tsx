import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import { Music2, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Logo centered */}
        <div className="text-center font-logo text-2xl tracking-[0.4em] text-brown">
          LUMIÈRE
        </div>

        {/* Social icons only */}
        <div className="mt-5 flex items-center justify-center gap-5 text-brown">
          <a href="https://instagram.com/lumiereaccessories.lu" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-60">
            <InstagramIcon size={18} />
          </a>
          <a href="https://tiktok.com/@lumiere_2222" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-opacity hover:opacity-60">
            <Music2 size={18} />
          </a>
          <a href="https://wa.me/201066826143" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-opacity hover:opacity-60">
            <MessageCircle size={18} />
          </a>
        </div>

        {/* Two simple link columns */}
        <div className="mx-auto mt-8 flex max-w-md justify-center gap-16 text-sm">
          <div className="text-center">
            <h3 className="mb-3 text-xs uppercase tracking-widest text-muted">Shop</h3>
            <ul className="space-y-2 text-brown">
              <li><Link href="/shop" className="transition-opacity hover:opacity-60">All</Link></li>
              <li><Link href="/shop/sale" className="transition-opacity hover:opacity-60">Sale</Link></li>
              <li><Link href="/about" className="transition-opacity hover:opacity-60">About</Link></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="mb-3 text-xs uppercase tracking-widest text-muted">Support</h3>
            <ul className="space-y-2 text-brown">
              <li><a href="https://wa.me/201066826143" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">WhatsApp</a></li>
              <li><a href="https://instagram.com/lumiereaccessories.lu" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">Instagram</a></li>
              <li><Link href="/policy" className="transition-opacity hover:opacity-60">Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-muted">
          Designed by Hana Abdelbari
        </div>
      </div>
    </footer>
  );
}