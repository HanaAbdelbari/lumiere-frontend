// Contact page — reach out via WhatsApp / Instagram / TikTok.
import InstagramIcon from "../components/InstagramIcon";
import { MessageCircle, Music2 } from "lucide-react";

export default function ContactPage() {
  const channels = [
    {
      label: "WhatsApp",
      value: "010 6682 6143",
      href: "https://wa.me/201066826143",
      icon: MessageCircle,
    },
    {
      label: "Instagram",
      value: "@lumiereaccessories.lu",
      href: "https://instagram.com/lumiereaccessories.lu",
      icon: InstagramIcon,
    },
    {
      label: "TikTok",
      value: "@lumiere_2222",
      href: "https://tiktok.com/@lumiere_2222",
      icon: Music2,
    },
  ];

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-brown">Contact Us</h1>
        <div className="mx-auto mt-2 h-px w-16 bg-gold" />
        <p className="mt-3 text-sm text-brown-soft">
          We&apos;d love to hear from you. Reach out any time.
        </p>
      </div>

      <div className="space-y-3">
        {channels.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-hairline bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon size={22} />
              <div>
                <div className="text-sm text-brown">{c.label}</div>
                <div className="text-xs text-brown-soft">{c.value}</div>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}