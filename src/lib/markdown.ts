/**
 * Clean-Markdown rendering of the content model, for `/llms-full.txt`.
 *
 * Built from the same `src/content` data the pages render, so the Markdown
 * cannot drift from the visible copy: adding a page or editing a paragraph
 * updates both. `Inline` marks are flattened to plain text, since an engine
 * ingesting one document wants the prose, not the link syntax.
 */

import type { BlogPost, MarketingPage, PageSection } from "@/content/types";
import { postPath, sortedPosts } from "@/content/blog";
import { MARKETING_PAGES } from "@/content";
import { absoluteUrl, plainText } from "@/lib/seo";
import { ADDRESS_LINE, CONTACT_EMAIL, LEGAL_NAME, SITE_DESCRIPTION } from "@/lib/site";

/** Blank line between blocks, with no trailing whitespace anywhere. */
function join(blocks: (string | null | undefined | false)[]): string {
  return blocks.filter(Boolean).join("\n\n");
}

function sectionMarkdown(section: PageSection): string {
  return join([
    `### ${section.heading}`,
    ...section.body.map(plainText),
    section.items?.length
      ? section.items.map((item) => `- **${item.title}**: ${plainText(item.text)}`).join("\n")
      : null,
    section.contrast
      ? [
          `| ${section.contrast.leftLabel} | ${section.contrast.rightLabel} |`,
          "| --- | --- |",
          ...section.contrast.rows.map((row) => `| ${row.left} | ${row.right} |`),
        ].join("\n")
      : null,
    section.note ? `_${plainText(section.note)}_` : null,
  ]);
}

function marketingMarkdown(page: MarketingPage): string {
  return join([
    `## ${page.h1}`,
    `URL: ${absoluteUrl(page.path)}  \nLast updated: ${page.dateModified}`,
    ...page.lead.map(plainText),
    page.highlights.length ? page.highlights.map((h) => `- ${h}`).join("\n") : null,
    ...page.sections.map(sectionMarkdown),
    page.faqs.length
      ? join([
          `### ${page.faqHeading}`,
          page.faqs
            .map(({ question, answer }) => `**${question}**  \n${plainText(answer)}`)
            .join("\n\n"),
        ])
      : null,
  ]);
}

/** Article body blocks, flattened to Markdown. */
function blogBlocks(post: BlogPost): string {
  return post.blocks
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `### ${block.text}`;
        case "h3":
          return `#### ${block.text}`;
        case "p":
          return plainText(block.text);
        case "ul":
          return block.items.map((item) => `- ${plainText(item)}`).join("\n");
        case "ol":
          return block.items.map((item, i) => `${i + 1}. ${plainText(item)}`).join("\n");
        case "table":
          return join([
            block.caption ? `_${block.caption}_` : null,
            [
              `| ${block.head.join(" | ")} |`,
              `| ${block.head.map(() => "---").join(" | ")} |`,
              ...block.rows.map((row) => `| ${row.map(plainText).join(" | ")} |`),
            ].join("\n"),
          ]);
        case "callout":
          return `> **${block.title}**  \n> ${plainText(block.text)}`;
        case "template":
          return join([`**${block.title}**`, "```", block.lines.join("\n"), "```"]);
      }
    })
    .join("\n\n");
}

function blogMarkdown(post: BlogPost): string {
  return join([
    `## ${post.h1}`,
    `URL: ${absoluteUrl(postPath(post))}  \nPublished: ${post.datePublished}  \nLast updated: ${post.dateModified}`,
    post.disclosure ? `_${post.disclosure}_` : null,
    ...post.intro.map(plainText),
    post.takeaways.length
      ? join(["### Key takeaways", post.takeaways.map((t) => `- ${t}`).join("\n")])
      : null,
    blogBlocks(post),
    post.faqs?.length
      ? join([
          "### Frequently asked questions",
          post.faqs
            .map(({ question, answer }) => `**${question}**  \n${plainText(answer)}`)
            .join("\n\n"),
        ])
      : null,
    post.sources?.length
      ? join([
          "### Sources",
          post.sources
            .map((s) => `- ${s.title} — ${s.publisher}. ${s.url} (checked ${s.accessed})`)
            .join("\n"),
        ])
      : null,
  ]);
}

/**
 * The whole site as one Markdown document, for engines that ingest a single
 * file rather than crawling. Ordered the way a reader would want it: what the
 * product is, then the pages, then the guides.
 */
export function llmsFullMarkdown(): string {
  const byKind = (kind: MarketingPage["kind"]) =>
    MARKETING_PAGES.filter((page) => page.kind === kind);

  return `${join([
    "# IntelliHire by SuperMIA — full site content",
    `> ${SITE_DESCRIPTION}`,
    [
      `Built by SuperMIA, with ${LEGAL_NAME} credited on the site.`,
      `Office: ${ADDRESS_LINE}.`,
      `Contact: ${CONTACT_EMAIL}.`,
      "People make every hiring decision: no candidate is ever rejected by a machine.",
    ].join(" "),

    "# Platform",
    ...byKind("platform").map(marketingMarkdown),

    "# Use cases",
    ...byKind("use-case").map(marketingMarkdown),

    "# Company",
    ...byKind("about").map(marketingMarkdown),

    "# Guides",
    ...sortedPosts().map(blogMarkdown),
  ])}\n`;
}
