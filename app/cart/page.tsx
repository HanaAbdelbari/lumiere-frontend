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
  const progressPercent = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="mb-6 font-serif text-2xl sm:text-3xl text-brown">
        Your Cart ({totalItems})
      </h1>

      {/* Grid Layout */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 sm:gap-5 rounded-2xl border border-hairline bg-white p-4 sm:p-5 shadow-sm"
              >
                {/* 1. صورة متجاوبة: h-24 w-24 على الموبايل و h-28 w-28 على الشاشات الأكبر */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-md bg-[#F8F2EC]">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  )}
                </div>

                {/* Details Column */}
                <div className="flex flex-1 flex-col justify-between">
                  {/* Top Row: Name, Clear Attributes, Trash Icon */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-brown leading-snug">
                        {item.name}
                      </h3>
                      {/* توضيح الـ Attributes بشكل أوضح بدل أرقام مجردة */}
                      {item.attributes && (
                        <div className="mt-1 text-xs sm:text-sm text-brown-soft space-y-0.5">
                          {item.attributes.includes("•") ? (
                            item.attributes.split("•").map((attr, idx) => (
                              <p key={idx}>{attr.trim()}</p>
                            ))
                          ) : (
                            <p>{item.attributes}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* زرار الحذف فوق ع اليمين */}
                    <button
                      onClick={() => setConfirmId(item.id)}
                      aria-label="Remove item"
                      className="text-muted transition-colors hover:text-[#8F473A] p-1"
                    >
                      <Trash2 size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* 3 & 6. الترتيب العمودي المباشر: الكمية وتحتها السعر بمسافة 12px */}
                  <div className="mt-3 flex flex-col items-start gap-3">
                    {/* 2. Quantity Box أضيق (px-3 py-2) */}
                    <div className="flex items-center rounded-md border border-hairline bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease"
                        className="px-3 py-2 text-brown-soft hover:text-brown"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="border-x border-hairline px-3 py-1.5 text-sm text-brown font-medium min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase"
                        className="px-3 py-2 text-brown-soft hover:text-brown"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* السعر تحت الـ Quantity مباشرة */}
                    <span className="whitespace-nowrap text-lg sm:text-xl font-semibold text-brown">
                      EGP {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Free shipping progress: مسافة أكبر فوق الـ Bar (mt-5) */}
          <div className="rounded-2xl border border-hairline bg-cream p-5 text-center shadow-sm">
            {freeShipping ? (
              <span className="text-success font-medium text-sm sm:text-base">🎁 You&apos;ve unlocked free shipping!</span>
            ) : (
              <span className="text-brown-soft text-xs sm:text-sm">
                Add EGP {remaining} more to get free shipping
              </span>
            )}
            
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E8DDD4]">
              <div
                className="h-full rounded-full bg-brown transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="sticky top-24 h-fit space-y-4">
          {/* 5. Order summary: تقليل البادنج العلوي لتفادي الفراغ الكبير */}
          <div className="rounded-2xl border border-hairline p-5 sm:p-6 bg-white shadow-sm">
            <h2 className="mb-3 font-serif text-xl sm:text-2xl text-brown">Order Summary</h2>
            <div className="flex justify-between py-1.5 text-sm text-brown-soft">
              <span>Products</span>
              <span>EGP {totalPrice}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm text-brown-soft">
              <span>Shipping</span>
              <span>
                {freeShipping ? (
                  <span className="text-success font-medium">FREE</span>
                ) : (
                  "Calculated at checkout"
                )}
              </span>
            </div>
            
            <div className="mt-3 flex justify-between border-t border-hairline pt-3 text-brown">
              <span className="text-lg sm:text-xl font-semibold">Total</span>
              <span className="text-lg sm:text-xl font-semibold">
                EGP {totalPrice}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <Link
            href="/checkout"
            className="block rounded-2xl bg-[#5B3A2E] py-3.5 sm:py-4 text-center text-base sm:text-lg font-medium text-white transition-colors hover:bg-[#4E342E] shadow-sm"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block rounded-2xl border border-brown py-3 text-center text-sm font-medium text-brown transition-colors hover:bg-brown hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>

      </div>

      {/* Remove confirmation dialog */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <Trash2 size={32} className="mx-auto text-[#A55B4B]" />
            <h3 className="mt-4 font-serif text-xl text-brown">Remove this item?</h3>
            <p className="mt-2 text-sm text-brown-soft">
              Remove {itemToRemove.name} from your cart?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-full border border-brown py-2.5 text-sm font-medium text-brown transition-colors hover:bg-[#F8F2EC]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeItem(itemToRemove.id);
                  setConfirmId(null);
                }}
                className="flex-1 rounded-full bg-[#8F473A] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7a3d31]"
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