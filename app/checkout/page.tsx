"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

// Egypt governorates for the dropdown.
const GOVERNORATES = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum",
  "Gharbia", "Ismailia", "Menofia", "Minya", "Qalyubia", "New Valley", "Suez",
  "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharqia",
  "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag",
];

const FREE_SHIPPING_THRESHOLD = 800;
const CAIRO_GIZA_FEE = 70;
const OTHER_FEE = 90;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    governorate: "",
    address: "",
    notes: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Estimated shipping for display (backend is the source of truth).
  function estimatedShipping(): number | null {
    if (totalPrice >= FREE_SHIPPING_THRESHOLD) return 0;
    if (!form.governorate) return null; // unknown until governorate chosen
    const g = form.governorate.toLowerCase();
    return g === "cairo" || g === "giza" ? CAIRO_GIZA_FEE : OTHER_FEE;
  }

  const shipping = estimatedShipping();
  const total = shipping === null ? totalPrice : totalPrice + shipping;
  const deposit = Math.round(total * 0.5);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function placeOrder() {
    setError("");
    // Basic validation
    if (!form.fullName || !form.phone || !form.governorate || !form.address) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Store Policy.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          governorate: form.governorate,
          address: form.address,
          notes: form.notes,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const order = await res.json();
      clearCart(); // empty the cart after a successful order
      // Go to the success page with the order number.
      router.push(`/order-success?order=${order.orderNumber}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return <main className="mx-auto max-w-lg px-4 py-20" />;
  }

  // Empty cart — nothing to check out.
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-brown-soft">Your cart is empty.</p>
      </main>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-hairline bg-white px-3 py-2.5 text-sm text-brown focus:border-brown focus:outline-none";

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 font-serif text-3xl text-brown">Checkout</h1>

      {/* Customer info */}
      <section className="rounded-lg border border-hairline p-4">
        <h2 className="mb-4 text-sm font-medium text-brown">Customer Information</h2>

        <label className="block text-xs text-brown-soft">Full Name</label>
        <input className={inputClass} value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)} />

        <label className="mt-4 block text-xs text-brown-soft">Phone Number</label>
        <input className={inputClass} value={form.phone}
          onChange={(e) => update("phone", e.target.value)} />

        <label className="mt-4 block text-xs text-brown-soft">Governorate</label>
        <select className={inputClass} value={form.governorate}
          onChange={(e) => update("governorate", e.target.value)}>
          <option value="">Select governorate</option>
          {GOVERNORATES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label className="mt-4 block text-xs text-brown-soft">Address</label>
        <textarea className={inputClass} rows={2} value={form.address}
          onChange={(e) => update("address", e.target.value)} />

        <label className="mt-4 block text-xs text-brown-soft">Order Notes (optional)</label>
        <input className={inputClass} placeholder="e.g. Ring size 7" value={form.notes}
          onChange={(e) => update("notes", e.target.value)} />
      </section>

      {/* Order summary */}
      <section className="mt-4 rounded-lg border border-hairline p-4">
        <h2 className="mb-3 text-sm font-medium text-brown">Order Summary</h2>
        <div className="flex justify-between py-1 text-sm text-brown-soft">
          <span>Products</span>
          <span>EGP {totalPrice}</span>
        </div>
        <div className="flex justify-between py-1 text-sm text-brown-soft">
          <span>Shipping</span>
          <span>
            {shipping === null ? (
              <span className="italic text-muted">select governorate</span>
            ) : shipping === 0 ? (
              <span className="text-success">FREE</span>
            ) : (
              `EGP ${shipping}`
            )}
          </span>
        </div>
        <div className="mt-2 flex justify-between border-t border-hairline pt-3 text-brown">
          <span className="font-medium">Total</span>
          <span className="font-medium">
            EGP {total}{shipping === null && " + shipping"}
          </span>
        </div>
      </section>

      {/* Deposit box */}
      <section className="mt-4 rounded-lg bg-cream p-4">
        <div className="flex justify-between text-sm text-brown">
          <span>Deposit to confirm (50%)</span>
          <span>EGP {deposit}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-brown">
          <span>Remaining on delivery</span>
          <span>EGP {total - deposit}</span>
        </div>
        <p className="mt-2 text-xs italic text-brown-soft">
          Payment instructions come after you place the order.
        </p>
      </section>

      {/* Agree + place order */}
      <label className="mt-4 flex items-start gap-2 text-sm text-brown-soft">
        <input type="checkbox" checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
        <span>I have read and agree to the Store Policy</span>
      </label>

      {error && <p className="mt-3 text-sm text-[#8F473A]">{error}</p>}

      <button onClick={placeOrder} disabled={submitting}
        className="mt-4 w-full rounded-xl bg-brown py-3.5 text-white transition-colors hover:bg-[#4E342E] disabled:opacity-50">
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </main>
  );
}