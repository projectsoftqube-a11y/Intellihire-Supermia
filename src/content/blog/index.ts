import type { BlogCategorySlug, BlogPost } from "@/content/types";
import interviewScoringRubric from "./posts/interview-scoring-rubric";
import structuredInterviewQuestions from "./posts/structured-interview-questions";
import preventCheating from "./posts/prevent-cheating-in-online-interviews";
import aiHiringLaws from "./posts/ai-hiring-laws";
import recruitmentMetrics from "./posts/recruitment-metrics";
import bestAiRecruitingSoftware from "./posts/best-ai-recruiting-software";

/** Publishing order from the blog briefs (newest last). */
export const BLOG_POSTS: BlogPost[] = [
  interviewScoringRubric,
  structuredInterviewQuestions,
  preventCheating,
  aiHiringLaws,
  recruitmentMetrics,
  bestAiRecruitingSoftware,
];

export type BlogCategory = {
  slug: BlogCategorySlug;
  name: string;
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** 80–150 word intro for the category page. */
  intro: string[];
  /** Section intro on the blog hub (from the approved hub copy). */
  hubIntro: string;
  /** Anchor text for the hub's "Browse" link. */
  browseLabel: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "ai-recruiting",
    name: "AI in Recruiting",
    path: "/blog/category/ai-recruiting",
    h1: "AI in Recruiting Guides",
    metaTitle: "AI in Recruiting Guides | IntelliHire Blog",
    metaDescription:
      "Guides on AI in recruiting: where it helps, where people should stay in charge, and the laws that shape how employers use it.",
    intro: [
      "AI in recruiting now reads applications, ranks candidates and runs first-round interviews for many hiring teams. These guides cover where it genuinely helps, where people should stay in charge, and the rules that shape how employers can use it.",
      "You'll find a plain-English overview of AI hiring laws and an honest comparison of AI recruiting software, with every vendor fact dated and sourced. They are written for the people who make the call: HR and talent leaders, recruiters, and the legal and IT reviewers who sign off on new tools. Nothing here is legal advice, and we say so where it matters.",
    ],
    hubIntro:
      "Where AI helps in hiring, where people should stay in charge, and the laws that shape how employers use it.",
    browseLabel: "Browse AI in recruiting guides",
  },
  {
    slug: "interviews",
    name: "Interviews",
    path: "/blog/category/interviews",
    h1: "Interview Guides",
    metaTitle: "Interview Guides | IntelliHire Blog",
    metaDescription:
      "Guides to better interviews: scoring rubrics, structured interview questions and integrity checks for remote interviews.",
    intro: [
      "Interview best practices start long before the first question. These guides cover the parts of interviewing that make candidates comparable: a scoring rubric every interviewer uses the same way, structured interview questions written for the role, and integrity checks for remote interviews that don't treat candidates as suspects.",
      "Each guide includes examples you can copy, from a rubric template to sample questions for sales, support, engineering and operations roles. They are written for recruiters and hiring managers who run interviews every week and want decisions they can explain.",
    ],
    hubIntro:
      "Scoring rubrics, structured questions and integrity checks for remote interviews.",
    browseLabel: "Browse interview guides",
  },
  {
    slug: "hiring-metrics",
    name: "Hiring Metrics",
    path: "/blog/category/hiring-metrics",
    h1: "Hiring Metrics Guides",
    metaTitle: "Hiring Metrics Guides | IntelliHire Blog",
    metaDescription:
      "Guides to the hiring metrics that show how recruiting is going, from time to hire and funnel conversion to the stage where candidates drop out.",
    intro: [
      "You can't fix a hiring process you can't see. These guides explain the recruiting metrics worth tracking, from time to hire and stage-by-stage funnel conversion to the point where candidates drop out, with the formula for each and what to do when a number moves.",
      "They are written for talent leaders and recruiters who need to explain where hiring slows down and why, without drowning in dashboards. Every metric comes with honest caveats about what it can and cannot tell you.",
    ],
    hubIntro:
      "The numbers that show how hiring is going, from time to hire to the stage where candidates drop out.",
    browseLabel: "Browse hiring metrics guides",
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
