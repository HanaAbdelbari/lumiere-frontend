import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Link from "next/link";
import Image from "next/image";

type ProductSummary = {
  id: number;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  discountPercent: number | null;
  inStock: boolean;
  mainImageUrl: string | null;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  coverImage: string | null;
};

async function getProducts(): Promise<ProductSummary[]> {
  const res = await fetch("http://localhost:8080/api/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:8080/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

async function getOnSale(): Promise<ProductSummary[]> {
  const res = await fetch("http://localhost:8080/api/products/on-sale", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
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
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl text-brown">Shop by Category</h2>
          <div className="mx-auto mt-2 h-px w-16 bg-gold" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl text-brown">New Arrivals</h2>
          <div className="mx-auto mt-2 h-px w-16 bg-gold" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Current Offers — only shows if there are any offers */}
      {offers.length > 0 && (
        <section className="bg-[#F8F2EC] py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-4xl text-brown">Current Offers</h2>
              <div className="mx-auto mt-2 h-px w-16 bg-gold" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {offers.map((product) => (
                <div key={product.id} className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/shop/sale"
                className="text-sm text-rose underline underline-offset-4"
              >
                View All Offers
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Lumière */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="relative h-56 w-full overflow-hidden rounded-lg border border-hairline md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800"
              alt="About Lumière"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-serif text-3xl text-brown">About Lumière</h2>
            <div className="mt-2 h-px w-16 bg-gold" />
            <p className="mt-4 text-sm leading-relaxed text-brown-soft">
              Timeless stainless steel accessories designed to elevate your
              everyday style. Each piece is made to shine with you, every moment.
            </p>
            <Link href="/about" className="mt-5 inline-block text-sm text-brown transition-colors hover:text-gold">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Follow Us */}
      <section className="bg-[#F8F2EC] py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          <h2 className="font-serif text-3xl text-brown">Follow Lumière</h2>
          <p className="mt-2 text-sm text-brown-soft">Stay inspired with our latest collections.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href="https://instagram.com/lumiereaccessories.lu" target="_blank" rel="noopener noreferrer" className="rounded-md border border-brown py-3 text-sm text-brown transition-colors hover:bg-brown hover:text-white">
              Follow us on Instagram
            </a>
            <a href="https://tiktok.com/@lumiere_2222" target="_blank" rel="noopener noreferrer" className="rounded-md border border-brown py-3 text-sm text-brown transition-colors hover:bg-brown hover:text-white">
              Follow us on TikTok
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-serif text-4xl text-brown">Ready to shine? ✨</h2>
        <p className="mt-3 text-sm text-brown-soft">
          Discover timeless accessories designed for every moment.
        </p>
        <Link href="/shop" className="mt-6 inline-block rounded-xl bg-brown px-10 py-3.5 text-base tracking-wide text-white transition-colors hover:bg-[#4E342E]">
          Shop Now
        </Link>
      </section>
    </>
  );
}