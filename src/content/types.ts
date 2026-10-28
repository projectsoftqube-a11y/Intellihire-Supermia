/**
 * Content model for the marketing pages.
 *
 * Copy lives in plain data files under `src/content` so pages stay server
 * rendered and the JSON-LD can be built from the same strings as the visible
 * text (the SEO handoff requires the two to match word for word).
 *
 * `Inline` strings support two lightweight marks, rendered by `RichText`:
 *   - links:  [anchor text](/platform/ai-interviews) or [text](https://…)
 *   - bold:   **text**
 * Nothing else is parsed, so plain prose needs no escaping.
 */
export type Inline = string;

export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FaqItem = {
  question: string;
  /** One standalone paragraph. Keep links out so the answer reads on its own. */
  answer: Inline;
};

export type ListItem = {
  /** Rendered as an H3. */
  title: string;
  text: Inline;
};

export type SectionLayout =
  /** Heading and body on the left, H3 items stacked on the right. */
  | "split"
  /** Heading and body on top, H3 items as a 2–4 card grid. */
  | "cards"
  /** Numbered timeline; use for "A hiring round in practice" style walkthroughs. */
  | "steps"
  /** Dark band with the H3 items as a checked list. */
  | "checklist"
  /** Two-column "IntelliHire does / Your team decides" style table. */
  | "contrast";

export type PageSection = {
  /** Anchor id, kebab-case and unique on the page. */
  id: string;
  /** Short label above the H2, 1–4 words. */
  eyebrow: string;
  /** Rendered as the H2. */
  heading: string;
  body: Inline[];
  layout: SectionLayout;
  items?: ListItem[];
  /** Only for layout "contrast". */
  contrast?: {
    leftLabel: string;
    rightLabel: string;
    rows: { left: string; right: string }[];
  };
  /** Optional small print under the section. */
  note?: Inline;
};

export type HeroPanelRow = {
  label: string;
  detail: string;
  tone: "blue" | "orange" | "green" | "slate";
};

/** A platform, use-case or company page. */
export type MarketingPage = {
  slug: string;
  /** Absolute site path, e.g. "/platform/ai-resume-screening". */
  path: string;
  kind: "platform" | "use-case" | "about";
  /** Menu label, e.g. "AI Resume Screening". */
  navLabel: string;
  /** One-line menu description, e.g. "Every application read and structured". */
  navDescription: string;
  /** Full <title>, used as-is (no suffix is appended). */
  metaTitle: string;
  metaDescription: string;
  /** Small label above the H1. */
  eyebrow: string;
  h1: string;
  /** Opening paragraphs. The primary keyword appears in the first 100 words. */
  lead: Inline[];
  /**
   * Answer-first block: 40–60 words answering the page's core question, read
   * aloud by assistants and lifted by answer engines. Must stand alone, so it
   * opens by naming the subject ("AI resume screening is …") and carries no
   * pronoun or phrase that depends on surrounding copy.
   */
  answer: Inline;
  heroImage: ImageRef;
  /**
   * Illustrative product panel layered over the hero photo. Demo data only:
   * no statistics, customer names or claims.
   */
  heroPanel: {
    title: string;
    caption: string;
    rows: HeroPanelRow[];
  };
  /** Three short proof points shown under the hero buttons. */
  highlights: string[];
  sections: PageSection[];
  /** H2 above the FAQ list, e.g. "Resume Screening FAQs". */
  faqHeading: string;
  faqs: FaqItem[];
  cta: { heading: string; body: Inline };
  /** Paths of 2–3 related pages for the "Keep exploring" cards. */
  related: string[];
  primaryKeyword: string;
  /** ISO date, e.g. "2026-10-27". */
  dateModified: string;
};

export type BlogCategorySlug = "ai-recruiting" | "interviews" | "hiring-metrics";

export type BlogBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: Inline }
  | { type: "ul"; items: Inline[] }
  | { type: "ol"; items: Inline[] }
  | { type: "table"; caption?: string; head: string[]; rows: Inline[][] }
  | {
      type: "callout";
      tone: "tip" | "note" | "warning";
      title: string;
      text: Inline;
    }
  /** A copy-ready template, rendered in a bordered panel. */
  | { type: "template"; title: string; lines: string[] };

export type BlogSource = {
  title: string;
  publisher: string;
  url: string;
  /** ISO date the source was checked. */
  accessed: string;
};

export type BlogPost = {
  slug: string;
  /** Full <title>, used as-is. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: BlogCategorySlug;
  /** One-line summary for cards. */
  excerpt: string;
  datePublished: string;
  dateModified: string;
  image: ImageRef;
  intro: Inline[];
  /**
   * Answer-first block: 40-60 words answering the post's core question, placed
   * above the intro. Must stand alone, so it opens by naming the subject and
   * depends on no surrounding copy.
   */
  answer: Inline;
  takeaways: string[];
  blocks: BlogBlock[];
  faqs?: FaqItem[];
  sources?: BlogSource[];
  /** Path of the page this post supports, used for the in-article CTA card. */
  supports: string;
  /** Optional disclosure shown above the article body. */
  disclosure?: string;
};
