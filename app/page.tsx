import ProductCard from "./components/ProductCard";

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

async function getProducts(): Promise<ProductSummary[]> {
  const res = await fetch("http://localhost:8080/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Section title with the signature gold accent line */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-brown">New Arrivals</h1>
        <div className="mx-auto mt-2 h-px w-9 bg-gold" />
      </div>

      {/* Product grid — 2 columns on mobile, 4 on larger screens */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}