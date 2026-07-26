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
      className="group relative block h-28 overflow-hidden rounded-lg border border-hairline transition-shadow duration-300 hover:shadow-md"
    >
      {category.coverImage && (
        <Image
          src={category.coverImage}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}

      {/* Gradient from the bottom — keeps the name readable on any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-70" />

      {/* Name — rises slightly on hover */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3">
        <span className="font-serif text-lg text-white drop-shadow transition-transform duration-300 group-hover:-translate-y-0.5">
          {category.name}
        </span>
      </div>
    </Link>
  );
}