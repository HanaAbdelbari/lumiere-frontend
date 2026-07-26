// A small strip of trust points under the hero.
import { Heart, Truck } from "lucide-react";

export default function TrustBar() {
  const items = [
    { icon: Heart, label: "Premium Quality" },
    { icon: Truck, label: "Free Shipping over EGP 800" },
  ];

  return (
    <section className="border-b border-hairline bg-[#F8F2EC]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-5 sm:flex-row sm:gap-12">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-2 text-brown">
              <Icon size={18} className="text-gold" />
              <span className="text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}