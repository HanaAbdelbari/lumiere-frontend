import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const heroImage =
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600";

  return (
    <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden md:h-[75vh]">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Lumière fine jewelry"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Subtle Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/15" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center">
        {/* Main Title */}
        <h1 className="hero-fade font-serif text-3xl font-light tracking-wider text-white drop-shadow-md sm:text-4xl md:text-5xl">
          Shine Every Moment
        </h1>

        {/* Subtitle */}
        <p className="hero-fade text-xs uppercase tracking-[0.25em] text-white/80 sm:text-sm">
          Handcrafted Elegance & Fine Details
        </p>

        {/* Divider */}
        <div className="hero-fade h-0.5 w-12 rounded-full bg-amber-200/70" />

        {/* Premium CTA Button */}
        <Link
          href="/shop"
          className="hero-fade-delayed mt-2 rounded-full border border-white/80 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-brown hover:shadow-lg hover:-translate-y-0.5"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}