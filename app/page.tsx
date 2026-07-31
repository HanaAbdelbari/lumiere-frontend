import Link from "next/link";
import Image from "next/image";
import { Music2 } from "lucide-react";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import InstagramIcon from "./components/InstagramIcon";

type ProductSummary = {
  id: number;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  discountPercent: number | null;
  inStock: boolean;
  stockQuantity?: number;
  mainImageUrl: string | null;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  coverImage: string | null;
};

// Error Handling Safe Fetching
async function getProducts(): Promise<ProductSummary[]> {
  try {
    const res = await fetch("http://localhost:8080/api/products", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch products:", e);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch("http://localhost:8080/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    return [];
  }
}

async function getOnSale(): Promise<ProductSummary[]> {
  try {
    const res = await fetch("http://localhost:8080/api/products/on-sale", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch offers:", e);
    return [];
  }
}

export default async function HomePage() {
  const [products, categories, offers] = await Promise.all([
    getProducts(),
    getCategories(),
    getOnSale(),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-brown tracking-wide">
              Shop by Category
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-gold/60" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals - تم إضافة .slice(0, 4) لعرض 4 منتجات فقط */}
      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-brown tracking-wide">
              New Arrivals
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-gold/60" />
          </div>
          <div
            className={`grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 ${
              products.length < 4 ? "justify-center max-w-3xl mx-auto" : ""
            }`}
          >
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Special Offers Section */}
      {offers.length > 0 && (
        <section className="bg-[#FAF7F2] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-brown tracking-wide">
                Special Offers
              </h2>
              <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-gold/60" />
            </div>

            <div
              className={`grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 ${
                offers.length < 4 ? "justify-center max-w-3xl mx-auto" : ""
              }`}
            >
              {offers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/shop/sale"
                className="inline-block rounded-full border border-brown/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brown transition-all hover:border-brown hover:bg-brown hover:text-white"
              >
                View All Offers
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Lumière */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          
          {/* 4 Images Grid Collage */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="grid grid-cols-2 gap-2 p-2 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm max-w-[420px] w-full">
              
              {/* الصورة الأولى */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://res.cloudinary.com/rpcf6czj/image/upload/v1785497516/%D8%BA%D9%84%D8%A7%D9%81_%D8%A7%D9%84%D8%A7%D8%A8%D9%88%D8%AA_cksfad.jpg"
                  alt="Lumière collection 1"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>

              {/* الصورة الثانية */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://res.cloudinary.com/rpcf6czj/image/upload/v1785499095/WhatsApp_Image_2026-07-31_at_2.02.28_PM_5_grfqqa.jpg"
                  alt="Lumière collection 2"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>

              {/* الصورة الثالثة */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://res.cloudinary.com/rpcf6czj/image/upload/v1785499095/WhatsApp_Image_2026-07-31_at_2.55.31_PM_qtjeqj.jpg"
                  alt="Lumière collection 3"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>

              {/* الصورة الرابعة */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://res.cloudinary.com/rpcf6czj/image/upload/v1785499096/WhatsApp_Image_2026-07-31_at_2.55.31_PM_1_gb8ocq.jpg"
                  alt="Lumière collection 4"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>

            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="font-serif text-3xl text-brown sm:text-4xl">
              About Lumière
            </h2>
            <div className="mx-auto md:mx-0 mt-2 h-0.5 w-12 rounded-full bg-gold/60" />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-600">
              Timeless stainless steel accessories designed to elevate your
              everyday style. Each piece is made to shine with you, every moment.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/shop"
                className="rounded-xl bg-brown px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#4E342E]"
              >
                Explore Collection
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-brown/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brown transition-all hover:border-brown hover:bg-brown hover:text-white"
              >
                Our Story
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Follow Us */}
      <section className="bg-[#FAF7F2] py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-3xl text-brown">Follow Lumière</h2>
          <p className="mt-2 text-xs text-stone-500 sm:text-sm">
            Stay inspired with our latest collections & behind the scenes.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <a
              href="https://instagram.com/lumiereaccessories.lu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brown/40 hover:shadow-md"
            >
              <div className="text-brown transition-transform group-hover:scale-110">
                <InstagramIcon size={26} />
              </div>
              <span className="text-xs font-semibold text-brown">Instagram</span>
              <span className="text-[10px] text-stone-400">@lumiereaccessories.lu</span>
            </a>

            <a
              href="https://tiktok.com/@lumiere_2222"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brown/40 hover:shadow-md"
            >
              <div className="text-brown transition-transform group-hover:scale-110">
                <Music2 size={26} />
              </div>
              <span className="text-xs font-semibold text-brown">TikTok</span>
              <span className="text-[10px] text-stone-400">@lumiere_2222</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-brown">
          Ready to Elevate Your Style?
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-stone-500">
          Explore our timeless stainless steel collection.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-xl bg-brown px-10 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#4E342E] hover:shadow-md hover:-translate-y-0.5"
        >
          Shop Now
        </Link>
      </section>
    </>
  );
}