import Link from "next/link";
import ProductCard from "../../components/ProductCard";

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

async function getOnSale(): Promise<ProductSummary[]> {
  try {
    const res = await fetch("http://localhost:8080/api/products/on-sale", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch sale products:", error);
    return [];
  }
}

export default async function SalePage() {
  const products = await getOnSale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-xs text-stone-400">
        <Link href="/" className="hover:text-brown transition-colors">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-brown font-medium">Sale</span>
      </nav>

      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-brown tracking-wide">
          Special Offers
        </h1>
        <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gold/60" />
        <p className="mt-3 text-xs sm:text-sm text-brown-soft">
          Showing {products.length}{" "}
          {products.length === 1 ? "product" : "products"} on offer
        </p>
      </div>

      {/* Product Grid / Empty State */}
      {products.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-stone-200/80 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-stone-500 mb-4">
            No special offers available right now.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-brown px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#4E342E]"
          >
            Explore All Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="mt-16 text-center">
            <p className="text-xs text-stone-500 mb-3">Looking for more styles?</p>
            <Link
              href="/"
              className="inline-block rounded-xl border border-brown/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brown transition-all hover:border-brown hover:bg-brown hover:text-white"
            >
              Explore All Collections
            </Link>
          </div>
        </>
      )}
    </main>
  );
}