import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the large PNG artwork as AVIF/WebP (SEO audit, image section).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Category pages were removed; posts live at /blog/<slug>. The old
      // category URLs were indexed, so send them to the blog hub permanently.
      {
        source: "/blog/category/:category*",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
