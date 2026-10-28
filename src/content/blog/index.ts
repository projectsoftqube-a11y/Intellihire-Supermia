import type { BlogCategorySlug, BlogPost } from "@/content/types";
import interviewScoringRubric from "./posts/interview-scoring-rubric";
import structuredInterviewQuestions from "./posts/structured-interview-questions";
import preventCheating from "./posts/prevent-cheating-in-online-interviews";
import aiHiringLaws from "./posts/ai-hiring-laws";
import recruitmentMetrics from "./posts/recruitment-metrics";
import bestAiRecruitingSoftware from "./posts/best-ai-recruiting-software";
import reduceTimeToHire from "./posts/reduce-time-to-hire";
import hirevueAlternatives from "./posts/hirevue-alternatives";
import aiInterviewSoftwarePricing from "./posts/ai-interview-software-pricing";
import ribbonAlternatives from "./posts/ribbon-alternatives";
import paradoxAlternatives from "./posts/paradox-alternatives";

/** Publishing order from the blog briefs (newest last). */
export const BLOG_POSTS: BlogPost[] = [
  interviewScoringRubric,
  structuredInterviewQuestions,
  preventCheating,
  aiHiringLaws,
  recruitmentMetrics,
  bestAiRecruitingSoftware,
  reduceTimeToHire,
  hirevueAlternatives,
  aiInterviewSoftwarePricing,
  ribbonAlternatives,
  paradoxAlternatives,
];

/**
 * A topic label for posts. Categories have no pages or URLs of their own:
 * every post lives at /blog/<slug>, and the label only groups posts on the
 * blog hub and names the article section in schema.
 */
export type BlogCategory = {
  slug: BlogCategorySlug;
  name: string;
  /** Section intro on the blog hub (from the approved hub copy). */
  hubIntro: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "ai-recruiting",
    name: "AI in Recruiting",
    hubIntro:
      "Where AI helps in hiring, where people should stay in charge, and the laws that shape how employers use it.",
  },
  {
    slug: "interviews",
    name: "Interviews",
    hubIntro:
      "Scoring rubrics, structured questions and integrity checks for remote interviews.",
  },
  {
    slug: "hiring-metrics",
    name: "Hiring Metrics",
    hubIntro:
      "The numbers that show how hiring is going, from time to hire to the stage where candidates drop out.",
  },
];

/** Posts per page on the hub and category pages (handoff: paginate at 12). */
export const POSTS_PER_PAGE = 12;

/** Index threshold from the handoff: noindex, follow until 3 posts are live. */
export const INDEX_THRESHOLD = 3;

/** Newest first; posts published the same day keep their publishing order. */
export function sortedPosts(posts: BlogPost[] = BLOG_POSTS): BlogPost[] {
  return posts
    .map((post, i) => ({ post, i }))
    .sort(
      (a, b) =>
        b.post.datePublished.localeCompare(a.post.datePublished) || a.i - b.i,
    )
    .map(({ post }) => post);
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function postsInCategory(slug: BlogCategorySlug): BlogPost[] {
  return sortedPosts(BLOG_POSTS.filter((post) => post.category === slug));
}

/** Categories that have at least one post (the hub hides empty ones). */
export function liveCategories(): BlogCategory[] {
  return BLOG_CATEGORIES.filter((c) => postsInCategory(c.slug).length > 0);
}

export function postPath(post: BlogPost): string {
  return `/blog/${post.slug}`;
}

function blockWords(post: BlogPost): string[] {
  const text: string[] = [...post.intro, ...post.takeaways];
  for (const block of post.blocks) {
    switch (block.type) {
      case "h2":
      case "h3":
      case "p":
        text.push(block.text);
        break;
      case "ul":
      case "ol":
        text.push(...block.items);
        break;
      case "table":
        text.push(...block.head, ...block.rows.flat());
        break;
      case "callout":
        text.push(block.title, block.text);
        break;
      case "template":
        text.push(block.title, ...block.lines);
        break;
    }
  }
  for (const faq of post.faqs ?? []) text.push(faq.question, faq.answer);
  return text.join(" ").split(/\s+/).filter(Boolean);
}

export function wordCount(post: BlogPost): number {
  return blockWords(post).length;
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
