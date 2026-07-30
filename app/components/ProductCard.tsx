"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  discountPercent: number | null;
  inStock: boolean;
  stockQuantity: number;
  mainImageUrl: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault(); // don't navigate to the product page
    if (!product.inStock) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.onSale && product.salePrice ? product.salePrice : product.price,
        imageUrl: product.mainImageUrl,
        attributes: "",
      },
      1
    );
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-md bg-white">
        {product.mainImageUrl && (
          <Image
            src={product.mainImageUrl}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              !product.inStock ? "grayscale opacity-70" : ""
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Small discount badge */}
        {product.onSale && (
          <span className="absolute right-2 top-2 rounded-full bg-brown px-2 py-0.5 text-[10px] font-medium text-white">
            -{product.discountPercent}%
          </span>
        )}

        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] text-muted">
            Sold out
          </span>
        )}

        {/* Add to Cart bar slides up on hover (in-stock only) — Zara style */}
        {product.inStock && (
          <button
            onClick={quickAdd}
            className="absolute inset-x-0 bottom-0 translate-y-full bg-brown py-2.5 text-center text-xs tracking-wide text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-3 text-sm font-medium text-brown">{product.name}</h3>

      {/* Price */}
      <div className="mt-1 flex items-center gap-2">
        {product.onSale ? (
          <>
            <span className="text-sm font-semibold text-brown">EGP {product.salePrice}</span>
            <span className="text-xs text-muted line-through">EGP {product.price}</span>
          </>
        ) : (
          <span className="text-sm font-semibold text-brown">EGP {product.price}</span>
        )}
      </div>

      {/* Stock status */}
      {!product.inStock ? (
        <p className="mt-1 text-xs text-muted">Out of stock</p>
      ) : product.stockQuantity <= 3 ? (
        <p className="mt-1 text-xs text-error">Only {product.stockQuantity} left</p>
      ) : (
        <p className="mt-1 text-xs text-success">In stock</p>
      )}
    </Link>
  );
}