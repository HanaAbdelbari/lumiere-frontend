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
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Sale badge — softer brownish red that fits the theme */}
        {product.onSale && (
          <span className="absolute right-2 top-2 rounded-full bg-[#A55B4B] px-2 py-1 text-xs text-white">
            -{product.discountPercent}%
          </span>
        )}

        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs text-muted">
            Out of stock
          </span>
        )}
      </div>

      {/* Name — semibold, with a little breathing room above the price */}
      <h3 className="mt-3 font-serif text-lg font-semibold text-brown">
        {product.name}
      </h3>

      {/* Price — old price a touch darker for readability */}
      <div className="mt-2 flex items-center gap-2">
        {product.onSale ? (
          <>
            <span className="font-medium text-brown">EGP {product.salePrice}</span>
            <span className="text-sm text-brown-soft line-through">
              EGP {product.price}
            </span>
          </>
        ) : (
          <span className="font-medium text-brown">EGP {product.price}</span>
        )}
      </div>
    </Link>
  );
}