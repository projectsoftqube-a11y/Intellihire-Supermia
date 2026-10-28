import type { MetadataRoute } from "next";
import { MARKETING_PAGES } from "@/content";
import {
  BLOG_POSTS,
  INDEX_THRESHOLD,
  postPath,
} from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

/** Content date of the October 2026 SEO release. */
const RELEASED = "2026-10-27";

/**
 * Live, indexable pages only (launch kit rule): noindex pages such as a blog
 * hub stay out until they qualify.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    lastModified: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  const blogIndexed = BLOG_POSTS.length >= INDEX_THRESHOLD;

  return [
    entry("/", RELEASED, "weekly", 1),
    entry("/pricing", RELEASED, "weekly", 0.9),
    entry("/faq", RELEASED, "monthly", 0.8),
    entry("/book-a-demo", "2026-10-28", "monthly", 0.7),
    entry("/tools/ai-interview-cost-calculator", "2026-10-28", "monthly", 0.7),
    ...MARKETING_PAGES.map((page) =>
      entry(page.path, page.dateModified, "monthly", page.kind === "about" ? 0.5 : 0.8),
    ),
    ...(blogIndexed ? [entry("/blog", RELEASED, "weekly", 0.7)] : []),
    ...BLOG_POSTS.map((post) => entry(postPath(post), post.dateModified, "monthly", 0.6)),
    entry("/privacy", RELEASED, "yearly", 0.3),
    entry("/terms", RELEASED, "yearly", 0.3),
  ];
}
