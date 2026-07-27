"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, Clock } from "lucide-react";

// Your Vodafone Cash number and WhatsApp number — change these to the real ones.
const VODAFONE_NUMBER = "010 6682 6143";
const WHATSAPP_NUMBER = "201066826143"; // no + or spaces

type OrderResponse = {
  orderNumber: string;
  status: string;
  productsTotal: number;
  shippingFee: number;
  totalAmount: number;
  depositAmount: number;
};

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) return;
    fetch(`http://localhost:8080/api/orders/${orderNumber}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setOrder)
      .catch(() => setOrder(null));
  }, [orderNumber]);

  function copyNumber() {
    navigator.clipboard.writeText(VODAFONE_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Pre-filled WhatsApp message with the order number.
  const waMessage = encodeURIComponent(
    `Hello Lumière!\nOrder Number: ${orderNumber}\nI have transferred the deposit and I'm attaching the payment screenshot.`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      {/* Success */}
      <div className="rounded-lg border border-hairline p-6 text-center">
        <CheckCircle size={44} className="mx-auto text-success" />
        <h1 className="mt-4 font-serif text-2xl text-brown">
          Order placed successfully
        </h1>
        <p className="mt-2 text-sm text-brown-soft">
          Your order has been created. Complete the deposit to confirm it.
        </p>
        <div className="mt-4 rounded-lg bg-cream p-3">
          <div className="text-xs text-brown-soft">Order Number</div>
          <div className="text-lg tracking-wide text-brown">{orderNumber}</div>
        </div>
      </div>

      {/* Payment instructions */}
      <div className="mt-4 rounded-lg border border-hairline p-5">
        <h2 className="mb-4 text-sm font-medium text-brown">Payment Instructions</h2>

        {/* Step 1 */}
        <div className="flex gap-3">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cream text-xs text-brown">1</span>
          <div className="flex-1">
            <p className="mb-2 text-sm text-brown">Transfer the deposit</p>
            <div className="rounded-lg bg-cream p-3">
              <div className="flex justify-between text-sm text-brown-soft">
                <span>Deposit (50%)</span>
                <span className="text-brown">
                  EGP {order ? order.depositAmount : "…"}
                </span>
              </div>
              <div className="mt-2 text-xs text-brown-soft">Vodafone Cash</div>
              <div className="flex items-center justify-between">
                <span className="text-brown">{VODAFONE_NUMBER}</span>
                <button onClick={copyNumber}
                  className="flex items-center gap-1 rounded-md border border-hairline px-2 py-1 text-xs text-brown hover:border-brown">
                  <Copy size={12} />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mt-4 flex gap-3">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cream text-xs text-brown">2</span>
          <div className="flex-1">
            <p className="mb-2 text-sm text-brown">
              Send your payment screenshot on WhatsApp
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="block rounded-md bg-brown py-3 text-center text-sm text-white transition-colors hover:bg-[#4E342E]">
              Open WhatsApp
            </a>
            <p className="mt-2 text-xs italic text-muted">
              Message pre-filled with order number {orderNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Reserved note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#F5E9D0] p-3">
        <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#9A7B3F]" />
        <p className="text-sm text-[#7A6230]">
          Your order is reserved. It will be confirmed once we review your transfer.
        </p>
      </div>

      {/* Continue */}
      <Link href="/shop"
        className="mt-4 block rounded-xl border border-brown py-3 text-center text-sm text-brown transition-colors hover:bg-brown hover:text-white">
        Continue Shopping
      </Link>
    </main>
  );
}