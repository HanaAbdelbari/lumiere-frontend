import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover the story behind Lumière — crafting timeless, premium accessories designed to elevate your everyday style.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Timeless Design",
      desc: "Delicate pieces crafted to elevate your daily style for years to come.",
    },
    {
      title: "Premium Materials",
      desc: "Finished with care to retain their shine and beauty wear after wear.",
    },
    {
      title: "Full Transparency",
      desc: "Every piece has its material marked on the underside so you always know.",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-brown tracking-wide">
          About Lumière
        </h1>
        <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gold/60" />
      </div>

      <div className="mb-10 rounded-2xl border border-stone-200/80 bg-[#FAF7F2] p-8 text-center shadow-sm">
        <p className="font-serif text-xl italic text-brown sm:text-2xl leading-relaxed">
          &ldquo;We believe elegance lives in the details.&rdquo;
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 text-sm leading-relaxed text-stone-600 shadow-sm">
        <p>
          <strong className="font-serif text-base text-brown">Lumière</strong> is an
          online accessories brand crafting timeless pieces designed to shine with
          you, every moment. Each piece is made from premium materials and
          finished with utmost care, so it stays beautiful wear after wear.
        </p>

        <p>
          Our collections are curated to be delicate yet lasting — jewelry you can wear
          every day and treasure for years. To guarantee complete authenticity and trust,
          the material of every piece is marked clearly on its underside, so you
          always know exactly what you&apos;re wearing.
        </p>

        <p className="pt-2 font-serif text-base text-brown italic">
          Thank you for letting Lumière be part of your story. ✨
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-xl border border-stone-200/80 bg-white p-5 text-center shadow-sm"
          >
            <h3 className="font-serif text-base font-medium text-brown mb-1.5">
              {v.title}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block rounded-xl bg-brown px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#4E342E] active:scale-[0.99]"
        >
          Explore Our Collection
        </Link>
      </div>
    </main>
  );
}