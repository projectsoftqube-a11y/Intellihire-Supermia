import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the large PNG artwork as AVIF/WebP (SEO audit, image section).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
