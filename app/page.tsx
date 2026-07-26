import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";

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

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Hero />

      {/* Trust points strip */}
      <TrustBar />

      {/* Shop by Category */}
      <section className="mx-auto max-w-5xl px-4 py-12">
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
      <section className="mx-auto max-w-5xl px-4 pb-12">
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
    </>
  );
}