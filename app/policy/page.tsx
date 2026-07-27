// Store Policy — built from your actual policies.
export default function PolicyPage() {
  const sections = [
    {
      title: "Payment",
      body: "Orders are confirmed with a 50% deposit via Vodafone Cash. The remaining amount is paid on delivery (Cash on Delivery). After placing your order, you'll receive payment instructions and send your transfer screenshot on WhatsApp.",
    },
    {
      title: "Shipping",
      body: "We deliver all over Egypt within 3–5 business days. Shipping is free on orders over EGP 800.",
    },
    {
      title: "Exchange & Returns",
      body: "We do not offer returns or exchanges, except when there is an error on our side or a defect in the piece. In that case, we'll gladly exchange it for you.",
    },
    {
      title: "Order Cancellation",
      body: "You may cancel your order within 24 hours of confirmation, and your deposit will be fully refunded. After 24 hours, the order cannot be cancelled.",
    },
    {
      title: "Materials",
      body: "The material of each piece is marked on its underside, so you always know exactly what you're wearing.",
    },
  ];

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-brown">Store Policy</h1>
        <div className="mx-auto mt-2 h-px w-16 bg-gold" />
      </div>

      <div className="space-y-6">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-serif text-lg text-brown">{s.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-brown-soft">{s.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}