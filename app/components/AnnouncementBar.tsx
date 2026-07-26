// The thin brown bar at the top. Two messages repeated enough times to fill
// the screen, scrolling in a seamless circular loop.
export default function AnnouncementBar() {
  const messages = [
    "✨ Free shipping on orders over EGP 800",
    "🚚 Delivery all over Egypt",
  ];

  // One "set" = the two messages once.
  const oneSet = (keyPrefix: string) =>
    messages.map((msg, i) => (
      <span key={`${keyPrefix}-${i}`} className="mx-8 text-xs tracking-wide">
        {msg}
      </span>
    ));

  return (
    <div className="overflow-hidden bg-brown py-2 text-white">
      {/* The track holds TWO identical halves.
          Each half = the set repeated a few times so it's wide enough to
          fill the screen. The animation shifts the track by exactly one half
          (-50%), so it loops seamlessly. */}
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {/* First half */}
        <div className="flex shrink-0">
          {oneSet("a1")}
          {oneSet("a2")}
          {oneSet("a3")}
          {oneSet("a4")}
        </div>
        {/* Second half (identical) */}
        <div className="flex shrink-0" aria-hidden="true">
          {oneSet("b1")}
          {oneSet("b2")}
          {oneSet("b3")}
          {oneSet("b4")}
        </div>
      </div>
    </div>
  );
}