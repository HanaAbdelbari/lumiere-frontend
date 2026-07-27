import { notFound } from "next/navigation";
import { Ruler } from "lucide-react";
import ProductGallery from "../../components/ProductGallery";
import AddToCartSection from "../../components/AddToCartSection";
import RelatedProducts from "../../components/RelatedProducts";

type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  discountPercent: number | null;
  material: string | null;
  size: string | null;
  chainLength: string | null;
  stockQuantity: number;
  inStock: boolean;
  categoryName: string;
  categorySlug: string;
  images: string[];
};

async function getProduct(slug: string): Promise<ProductDetail | null> {
  const res = await fetch(`http://localhost:8080/api/products/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // Collect the attributes that exist, so we can show them as cards.
  const attributes = [
    { label: "Material", value: product.material },
    { label: "Size", value: product.size },
    { label: "Chain length", value: product.chainLength },
  ].filter((a) => a.value); // keep only the ones that have a value

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb — slightly larger for readability */}
      <div className="mb-4 text-sm text-muted">
        Home › {product.categoryName} › {product.name}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: image gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Right: product info */}
        <div>
          <h1 className="font-serif text-2xl text-brown">{product.name}</h1>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3">
            {product.onSale ? (
              <>
                <span className="text-2xl font-medium text-brown">
                  EGP {product.salePrice}
                </span>
                <span className="text-lg text-muted line-through">
                  EGP {product.price}
                </span>
                <span className="rounded-full bg-[#8F473A] px-2 py-1 text-xs text-white">
                  -{product.discountPercent}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-medium text-brown">
                EGP {product.price}
              </span>
            )}
          </div>

          {/* Attributes as small cards — only the ones that exist */}
          {attributes.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="rounded-lg bg-[#F8F2EC] p-3"
                >
                  <div className="text-xs text-brown-soft">{attr.label}</div>
                  <div className="mt-1 text-sm text-brown">{attr.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-brown-soft">
              {product.description}
            </p>
          )}

          {/* Size note — shown only for products that have a size (e.g. rings).
              A clear pink box so the customer knows to write their size. */}
          {product.size && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#F8F2EC] p-3">
              <Ruler size={16} className="mt-0.5 flex-shrink-0 text-brown-soft" />
              <p className="text-sm text-brown-soft">
                Available in multiple sizes — write your preferred size in the
                order notes at checkout.
              </p>
            </div>
          )}

          {/* Stock label */}
          <p
            className={`mt-6 mb-3 text-xs ${
              product.inStock ? "text-success" : "text-muted"
            }`}
          >
            {product.inStock ? "● In stock" : "Out of stock"}
          </p>

          {/* Quantity + Add to cart (right after the description) */}
          <AddToCartSection
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.onSale ? product.salePrice! : product.price}
            imageUrl={product.images[0] ?? null}
            attributes={attributes.map((a) => a.value).join(" · ")}
            inStock={product.inStock}
            stockQuantity={product.stockQuantity}
          />
        </div>
      </div>

      <RelatedProducts
        categorySlug={product.categorySlug}
        currentSlug={product.slug}
      />
    </main>
  );
}