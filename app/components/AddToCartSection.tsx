"use client"; // interactive: the quantity stepper changes a number

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

// Receives whether the product is in stock and how many are available.
export default function AddToCartSection({
  inStock,
  stockQuantity,
}: {
  inStock: boolean;
  stockQuantity: number;
}) {
  // "quantity" remembers how many the customer wants. Starts at 1.
  const [quantity, setQuantity] = useState(1);

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-md bg-sand py-3 text-muted"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Quantity stepper */}
      <div className="flex items-center rounded-md border border-hairline">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="px-3 py-3 text-brown-soft transition-colors hover:text-brown"
        >
          <Minus size={16} />
        </button>
        <span className="border-x border-hairline px-4 py-3 text-sm text-brown">
          {quantity}
        </span>
        <button
          // Don't let quantity go above available stock.
          onClick={() => setQuantity((q) => Math.min(stockQuantity, q + 1))}
          aria-label="Increase quantity"
          className="px-3 py-3 text-brown-soft transition-colors hover:text-brown"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add to cart — darker brown with a hover shade and smooth transition */}
      <button className="flex-1 rounded-md bg-[#5A3B30] py-3 text-white transition-colors duration-200 hover:bg-[#4E342E]">
        Add to Cart
      </button>
    </div>
  );
}