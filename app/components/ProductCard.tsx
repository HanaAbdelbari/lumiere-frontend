import Image from "next/image";
import Link from "next/link";

type Product = {
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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-hairline bg-white transition-shadow duration-300 group-hover:shadow-md">
        {product.mainImageUrl && (
          <Image
            src={product.mainImageUrl}
            alt={product.name}
            fill
            // Out-of-stock products look muted (grayscale + dimmed)
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              !product.inStock ? "grayscale opacity-70" : ""
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {product.onSale && (
          <span className="absolute right-2 top-2 rounded-full bg-[#8F473A] px-2.5 py-1 text-xs text-white">
            -{product.discountPercent}%
          </span>
        )}

        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs text-muted">
            Out of stock
          </span>
        )}

        {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brown/90 py-2 text-center text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Product
          </div>
        )}
      </div>

      {/* More breathing room above the name */}
      <h3 className="mt-4 font-serif text-lg font-semibold text-brown">
        {product.name}
      </h3>

      {/* Current price bolder; old price dimmed */}
      <div className="mt-2 flex items-center gap-2">
        {product.onSale ? (
          <>
            <span className="font-bold text-brown">EGP {product.salePrice}</span>
            <span className="text-sm text-brown-soft opacity-60 line-through">
              EGP {product.price}
            </span>
          </>
        ) : (
          <span className="font-bold text-brown">EGP {product.price}</span>
        )}
      </div>
    </Link>
  );
}