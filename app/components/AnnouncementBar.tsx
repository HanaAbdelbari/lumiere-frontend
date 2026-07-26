// The thin bar at the top. Messages separated by a spaced dot, seamless loop.
export default function AnnouncementBar() {
  const messages = [
    "✨ Free shipping on orders over EGP 800",
    "🚚 Delivery all over Egypt",
  ];

  // Wider gap between messages using non-breaking spaces around the dot.
  const line = messages.join("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0");

  const half = (prefix: string) =>
    Array.from({ length: 3 }).map((_, i) => (
      <span key={`${prefix}-${i}`} className="mx-10 text-xs tracking-wide">
        {line}
      </span>
    ));

  return (
    <div className="overflow-hidden bg-brown py-2 text-white">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        <div className="flex shrink-0">{half("a")}</div>
        <div className="flex shrink-0" aria-hidden="true">{half("b")}</div>
      </div>
    </div>
  );
}