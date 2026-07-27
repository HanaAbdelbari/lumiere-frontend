"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 800;

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  // Wait until mounted in the browser before rendering cart contents,
  // since the cart comes from localStorage (avoids hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Which item is pending removal (shows the confirm dialog). null = none.
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const itemToRemove = items.find((i) => i.id === confirmId);

  // Before mount, render nothing (prevents a flash / mismatch)
  if (!mounted) {
    return <main className="mx-auto max-w-2xl px-4 py-20" />;
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-md px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted" />
        <h1 className="mt-6 font-serif text-3xl text-brown">Your cart is empty</h1>
        <p className="mt-2 text-sm text-brown-soft">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-xl bg-brown px-10 py-3.5 text-white transition-colors hover:bg-[#4E342E]"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const freeShipping = remaining <= 0;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl text-brown">
        Your Cart ({totalItems})
      </h1>

      {/* Cart items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-lg border border-hairline bg-white p-3"
          >
            {/* Image */}
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-[#F8F2EC]">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg text-brown">{item.name}</h3>
                  {item.attributes && (
                    <p className="text-xs text-brown-soft">{item.attributes}</p>
                  )}
                </div>
                <button
                  onClick={() => setConfirmId(item.id)}
                  aria-label="Remove item"
                  className="text-muted transition-colors hover:text-[#A55B4B]"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between">
                {/* Quantity */}
                <div className="flex items-center rounded-md border border-hairline">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease"
                    className="px-2 py-1.5 text-brown-soft hover:text-brown"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="border-x border-hairline px-3 py-1.5 text-sm text-brown">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase"
                    className="px-2 py-1.5 text-brown-soft hover:text-brown"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Line total */}
                <span className="font-medium text-brown">
                  EGP {item.price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free shipping progress */}
      <div className="mt-4 rounded-lg bg-[#F8F2EC] p-4 text-center text-sm">
        {freeShipping ? (
          <span className="text-green-700">🎁 You&apos;ve unlocked free shipping!</span>
        ) : (
          <span className="text-brown-soft">
            Add EGP {remaining} more to get free shipping
          </span>
        )}
      </div>

      {/* Order summary */}
      <div className="mt-4 rounded-lg border border-hairline p-4">
        <h2 className="mb-3 font-serif text-lg text-brown">Order Summary</h2>
        <div className="flex justify-between py-1 text-sm text-brown-soft">
          <span>Products</span>
          <span>EGP {totalPrice}</span>
        </div>
        <div className="flex justify-between py-1 text-sm text-brown-soft">
          <span>Shipping</span>
          <span>
            {freeShipping ? (
              <span className="text-green-700">FREE</span>
            ) : (
              "Calculated at checkout"
            )}
          </span>
        </div>
        <div className="mt-2 flex justify-between border-t border-hairline pt-3 text-brown">
          <span className="font-medium">Total</span>
          <span className="font-medium">EGP {totalPrice}{!freeShipping && " + shipping"}</span>
        </div>
      </div>

      {/* Actions */}
      <Link
        href="/checkout"
        className="mt-4 block rounded-xl bg-brown py-3.5 text-center text-white transition-colors hover:bg-[#4E342E]"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/shop"
        className="mt-3 block text-center text-sm text-brown-soft transition-colors hover:text-gold"
      >
        ← Continue Shopping
      </Link>

      {/* Remove confirmation dialog */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
            <Trash2 size={32} className="mx-auto text-[#A55B4B]" />
            <h3 className="mt-4 font-serif text-xl text-brown">Remove this item?</h3>
            <p className="mt-2 text-sm text-brown-soft">
              Remove {itemToRemove.name} from your cart?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-md border border-brown py-2.5 text-sm text-brown transition-colors hover:bg-[#F8F2EC]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeItem(itemToRemove.id);
                  setConfirmId(null);
                }}
                className="flex-1 rounded-md bg-[#A55B4B] py-2.5 text-sm text-white transition-colors hover:bg-[#8f4d3f]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}