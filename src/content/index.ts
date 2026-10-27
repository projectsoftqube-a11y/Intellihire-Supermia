import type { MarketingPage } from "@/content/types";
import { PLATFORM_PAGES } from "@/content/platform";
import { USE_CASE_PAGES } from "@/content/use-cases";
import { ABOUT_PAGE } from "@/content/about";
import { BLOG_POSTS, getCategory, postPath } from "@/content/blog";

export const MARKETING_PAGES: MarketingPage[] = [
  ...PLATFORM_PAGES,
  ...USE_CASE_PAGES,
  ABOUT_PAGE,
];

export function getPlatformPage(slug: string) {
  return PLATFORM_PAGES.find((page) => page.slug === slug);
}

export function getUseCasePage(slug: string) {
  return USE_CASE_PAGES.find((page) => page.slug === slug);
}

export type LinkSummary = {
  path: string;
  kicker: string;
  title: string;
  description: string;
};

const STATIC_SUMMARIES: LinkSummary[] = [
  {
    path: "/",
    kicker: "Overview",
    title: "IntelliHire: AI recruitment software",
    description: "How IntelliHire screens, interviews and leaves every hiring decision to your team.",
  },
  {
    path: "/pricing",
    kicker: "Pricing",
    title: "Compare IntelliHire plans",
    description: "What each plan includes, from the free trial to Enterprise.",
  },
  {
    path: "/faq",
    kicker: "FAQ",
    title: "IntelliHire FAQ",
    description: "Straight answers on screening, AI interviews, pricing and candidate data.",
  },
  {
    path: "/blog",
    kicker: "Blog",
    title: "AI recruiting guides",
    description: "Scoring rubrics, structured interviews, hiring laws and recruitment metrics.",
  },
];

/** Title and description for an internal path, for "Keep exploring" cards. */
export function linkSummary(path: string): LinkSummary | null {
  const page = MARKETING_PAGES.find((p) => p.path === path);
  if (page) {
    return {
      path,
      kicker: page.kind === "platform" ? "Platform" : page.kind === "use-case" ? "Use case" : "Company",
      title: page.navLabel,
      description: page.navDescription,
    };
  }

  const post = BLOG_POSTS.find((p) => postPath(p) === path);
  if (post) {
    return {
      path,
      kicker: `Guide · ${getCategory(post.category)?.name ?? "Blog"}`,
      title: post.h1,
      description: post.excerpt,
    };
  }

  return STATIC_SUMMARIES.find((s) => s.path === path) ?? null;
}
