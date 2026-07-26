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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}

      {/* Overlay darkens a touch on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-colors duration-300 group-hover:from-black/70" />

      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3">
        <span className="font-serif text-lg text-white drop-shadow transition-transform duration-300 group-hover:-translate-y-1">
          {category.name}
        </span>
      </div>
    </Link>
  );
}