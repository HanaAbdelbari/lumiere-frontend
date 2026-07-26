// A reusable card for one product. Used in shop, new arrivals, offers, related.
// It receives one "product" and returns how that card looks.

import Image from "next/image";
import Link from "next/link";

// The shape of the product this card expects (matches the API).
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

// "{ product }" means this component receives a product to display.
export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link makes the whole card clickable, going to the product page.
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-hairline bg-white">
        {product.mainImageUrl && (
          <Image
            src={product.mainImageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Sale badge — only shows when on sale */}
        {product.onSale && (
          <span className="absolute right-2 top-2 rounded-full bg-rose px-2 py-1 text-xs text-rose-text">
            -{product.discountPercent}%
          </span>
        )}

        {/* Out of stock overlay — only when not in stock */}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs text-muted">
            Out of stock
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-3 font-serif text-lg text-brown">{product.name}</h3>

      {/* Price — if on sale, show sale price + struck-through old price */}
      <div className="mt-1 flex items-center gap-2">
        {product.onSale ? (
          <>
            <span className="text-brown">EGP {product.salePrice}</span>
            <span className="text-sm text-muted line-through">EGP {product.price}</span>
          </>
        ) : (
          <span className="text-brown">EGP {product.price}</span>
        )}
      </div>
    </Link>
  );
}