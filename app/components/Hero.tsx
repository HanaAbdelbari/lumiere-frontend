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

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="hero-fade font-serif text-4xl font-light text-white drop-shadow md:text-5xl">
          Shine Every Moment
        </h1>

        <div className="hero-fade h-px w-16 bg-white/70" />

        {/* Bigger primary CTA */}
        <Link
          href="/shop"
          className="hero-fade-delayed rounded-md bg-brown px-8 py-3 text-sm tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-[#5A3E36]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}