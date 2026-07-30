import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  coverImage: string | null;
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop/category/${category.slug}`}
      className="group relative block h-32 overflow-hidden rounded-sm"
    >
      {category.coverImage && (
        <Image
          src={category.coverImage}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}

      {/* Calm, even overlay */}
      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

      {/* Name — uppercase, centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-white">
          {category.name}
        </span>
      </div>
    </Link>
  );
}