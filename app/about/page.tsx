// About page — static content. Edit the text freely with your own words.
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-brown">About Lumière</h1>
        <div className="mx-auto mt-2 h-px w-16 bg-gold" />
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-brown-soft">
        <p>
          Lumière is an online accessories brand crafting timeless pieces
          designed to shine with you, every moment. Each piece is made from
          premium Material and finished with care, so it stays beautiful
          wear after wear.
        </p>
        <p>
          We believe elegance lives in the details. Our collections are curated
          to be delicate yet lasting — jewelry you can wear every day and treasure
          for years. The material of every piece is marked on its underside, so
          you always know exactly what you&apos;re wearing.
        </p>
        <p>
          Thank you for letting Lumière be part of your story. ✨
        </p>
      </div>
    </main>
  );
}