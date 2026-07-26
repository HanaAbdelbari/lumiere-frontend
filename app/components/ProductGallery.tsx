"use client"; // interactive: clicking a thumbnail changes the big image

import Image from "next/image";
import { useState } from "react";

// Receives the list of image URLs and the product name (for alt text).
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  // "selected" remembers which image is the big one right now.
  // It starts at 0 (the first/main image).
  const [selected, setSelected] = useState(0);

  // If there are no images, show nothing.
  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg border border-hairline bg-white text-muted">
        No image
      </div>
    );
  }

  return (
    <div>
      {/* Big image — shows whichever thumbnail is selected */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-hairline bg-white">
        <Image
          src={images[selected]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails row — only show if there's more than one image */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)} // clicking sets this as the big image
              className={`relative h-16 w-16 overflow-hidden rounded-md border ${
                selected === i ? "border-brown" : "border-hairline"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}