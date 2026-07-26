import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const heroImage =
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600";

  return (
    // 60vh on mobile, 70vh on desktop — leaves a peek of the next section
    <section className="relative h-[65vh] min-h-[400px] w-full overflow-hidden md:h-[75vh]">
      <Image
        src={heroImage}
        alt="Lumière accessories"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center">
        <h1 className="hero-fade font-serif text-4xl text-white drop-shadow md:text-6xl">
          Shine Every Moment
        </h1>

        <div className="hero-fade h-px w-16 bg-white/70" />

        {/* Bigger primary CTA */}
        <Link
          href="/shop"
          className="hero-fade-delayed rounded-xl bg-brown px-10 py-3.5 text-base tracking-wide text-white transition-colors hover:bg-[#6D4638]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}