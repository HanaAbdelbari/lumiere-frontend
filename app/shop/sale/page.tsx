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
  mainImageUrl: string | null;
};

async function getOnSale(): Promise<ProductSummary[]> {
  const res = await fetch("http://localhost:8080/api/products/on-sale", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
}

export default async function SalePage() {
  const products = await getOnSale();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-4 text-sm text-muted">Home › Sale</div>

      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-brown">Sale</h1>
        <div className="mx-auto mt-2 h-px w-16 bg-gold" />
        <p className="mt-3 text-sm text-brown-soft">
          Showing {products.length}{" "}
          {products.length === 1 ? "product" : "products"} on offer
        </p>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-muted">
          No offers available right now. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}