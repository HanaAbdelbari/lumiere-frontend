import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js only loads images from domains you allow here (for security).
    // Unsplash = temporary test images. Cloudinary = your real product images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;