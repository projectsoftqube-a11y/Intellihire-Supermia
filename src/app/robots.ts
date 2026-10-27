import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Per the launch kit: no non-standard "Host:" line. The app host
// (app.intellihire.supermia.ai) sends X-Robots-Tag: noindex itself rather
// than being blocked here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
