// The hero section — first thing visitors see.
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const heroImage =
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600";
  const badge = "New Collection";

  return (
    // Shorter on mobile (65vh), taller on desktop (75vh)
    <section className="relative h-[65vh] min-h-[400px] w-full overflow-hidden md:h-[75vh]">
      <Image
        src={heroImage}
        alt="Lumière accessories"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay — darker at the bottom so text stays readable
          on any image, without flattening the whole photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/10" />

      {/* Centered content with a gentle fade-up animation on load */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center">
        {/* Badge now sits ABOVE the headline */}
        <span className="hero-fade rounded-full bg-white/90 px-4 py-1 text-xs tracking-wide text-brown">
          {badge}
        </span>

        <h1 className="hero-fade font-serif text-4xl text-white drop-shadow md:text-6xl">
          Shine Every Moment
        </h1>

        <div className="hero-fade h-px w-16 bg-white/70" />

        {/* Bigger, more premium button */}
        <Link
          href="/shop"
          className="hero-fade-delayed rounded-md bg-brown px-12 py-4 text-base tracking-wide text-white transition-colors hover:bg-[#6D4638]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}