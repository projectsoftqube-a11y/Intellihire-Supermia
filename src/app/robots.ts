import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Crawlers that read the site to answer questions or to ground a model.
 *
 * Named explicitly rather than left to the `*` rule so the stance is on the
 * record: IntelliHire wants to be retrieved and cited by answer engines.
 * `Google-Extended` and `Applebot-Extended` govern AI training and grounding
 * only, not indexing, so allowing them keeps the site eligible for AI answers
 * without changing its search listing.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
];

// Per the launch kit: no non-standard "Host:" line. The app host
// (app.intellihire.supermia.ai) sends X-Robots-Tag: noindex itself rather
// than being blocked here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
