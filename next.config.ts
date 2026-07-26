import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js only loads images from domains you allow here (for security).
    // Our test images come from Unsplash. Later, add your Cloudinary domain too.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;