import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the large PNG artwork as AVIF/WebP (SEO audit, image section).
    formats: ["image/avif", "image/webp"],
  },
  // Baseline security headers. HSTS is already sent by Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
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
