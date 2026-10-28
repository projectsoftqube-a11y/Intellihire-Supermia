import type { Metadata } from "next";
import {
  ADDRESS,
  BRAND_NAME,
  CONTACT_EMAIL,
  IS_PREVIEW,
  LEGAL_NAME,
  OG_IMAGE_ALT,
  ORG_ID,
  SITE_URL,
  SOFTWARE_ID,
  SUPERMIA_URL,
  TWITTER_HANDLE,
  WEBSITE_ID,
} from "@/lib/site";

/** Absolute URL for a site path. "/" maps to the bare origin with a slash. */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

type MetadataInput = {
  /** Full <title>; never suffixed by the layout template. */
  title: string;
  description: string;
  /** Site path for the canonical and og:url, e.g. "/pricing". */
  path: string;
  /** `noindex, follow` (blog hub and thin category pages until they fill up). */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Head tags for one route, following the developer handoffs: self-referencing
 * absolute canonical, matching og:url, the shared OG image and @supermia_ai.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex || IS_PREVIEW
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: BRAND_NAME,
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                    */
/* -------------------------------------------------------------------------- */

export type JsonLdNode = Record<string, unknown>;

/**
 * Breadcrumb trail for BreadcrumbList. The visible trail was removed at the
 * owner's request; the markup stays because Google uses it for the URL line
 * in results.
 */
export type Crumb = { name: string; path: string };

export const ORGANIZATION_NODE: JsonLdNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "SuperMIA",
  legalName: LEGAL_NAME,
  url: SUPERMIA_URL,
  email: CONTACT_EMAIL,
  logo: {
    "@type": "ImageObject",
    url: "https://supermia.ai/images/logo.svg",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  // Only profiles confirmed to belong to SuperMIA (seo-engine/research/
  // brand-presence.md). The old LinkedIn showcase now redirects to a dental
  // product page, so the company page replaces it.
  sameAs: [
    "https://www.linkedin.com/company/supermia",
    "https://www.youtube.com/@MIAMyIntelligentAssistant",
    "https://twitter.com/supermia_ai",
  ],
};

export const WEBSITE_NODE: JsonLdNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: BRAND_NAME,
  alternateName: ["IntelliHire"],
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
};

export const SOFTWARE_NODE: JsonLdNode = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: "IntelliHire",
  url: `${SITE_URL}/`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI recruitment software",
  operatingSystem: "Web browser",
  description:
    "AI recruitment software that parses resumes, ranks candidates against a rubric, runs first-round AI voice interviews, flags interview integrity concerns and writes scorecards that cite the interview transcript, with people making every hiring decision.",
  featureList: [
    "Job description and rubric drafting",
    "Resume parsing",
    "Candidate matching with explainable reasoning",
    "AI voice interviews",
    "AI-assisted human interviews",
    "Interview scheduling",
    "Interview proctoring and integrity scoring",
    "Scorecards that cite the interview transcript",
    "Recruitment analytics and pipeline management",
    "Candidate updates by email and WhatsApp, with SMS depending on plan",
  ],
  image: `${SITE_URL}/opengraph-image`,
  publisher: { "@id": ORG_ID },
  provider: { "@id": ORG_ID },
};

/** Organization, WebSite and SoftwareApplication, output on every page. */
export const SITEWIDE_GRAPH: JsonLdNode[] = [
  ORGANIZATION_NODE,
  WEBSITE_NODE,
  SOFTWARE_NODE,
];

export function breadcrumbNode(path: string, crumbs: Crumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

type WebPageInput = {
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "FAQPage";
  path: string;
  name: string;
  description: string;
  dateModified: string;
  /** Adds `about` → the SoftwareApplication node. */
  aboutSoftware?: boolean;
  hasBreadcrumb?: boolean;
  /** Hero or article image, emitted as `primaryImageOfPage`. */
  primaryImage?: { src: string; width: number; height: number };
  /**
   * CSS selectors for `speakable`. Defaults to the answer block and takeaway
   * region; pass `null` for a page with neither (legal pages).
   */
  speakableSelectors?: string[] | null;
  extra?: JsonLdNode;
};

export function webPageNode({
  type = "WebPage",
  path,
  name,
  description,
  dateModified,
  aboutSoftware = false,
  hasBreadcrumb = true,
  primaryImage,
  speakableSelectors,
  extra,
}: WebPageInput): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(aboutSoftware ? { about: { "@id": SOFTWARE_ID } } : {}),
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}${primaryImage.src}`,
            width: primaryImage.width,
            height: primaryImage.height,
          },
        }
      : {}),
    ...(speakableSelectors === null
      ? {}
      : { speakable: speakable(speakableSelectors ?? undefined) }),
    dateModified,
    ...extra,
  };
}

/**
 * `Question` nodes for a page's FAQ.
 *
 * The answer text is passed through `plainText`, because the rendered answer
 * strips the same inline marks. Google requires the two to match, so both the
 * visible paragraph and this node must come from one content string.
 */
export function faqEntities(items: { question: string; answer: string }[]) {
  return items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: plainText(answer) },
  }));
}

/**
 * A standalone `FAQPage` for a page whose primary type is something else.
 *
 * `/faq` is itself a FAQPage, so it keeps `mainEntity` on its WebPage node.
 * Every other page with visible Q&A gets this as a second node in the graph,
 * linked back to the page by `isPartOf`, which is what makes the Q&A eligible
 * for People Also Ask and AI Overviews without changing the page's own type.
 */
export function faqPageNode(
  path: string,
  items: { question: string; answer: string }[],
  /** Fragment of the page's own node: `#webpage`, or `#article` on a post. */
  parentFragment: "webpage" | "article" = "webpage",
): JsonLdNode | null {
  if (items.length === 0) return null;
  const url = absoluteUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    isPartOf: { "@id": `${url}#${parentFragment}` },
    inLanguage: "en-US",
    mainEntity: faqEntities(items),
  };
}

/**
 * CSS selectors naming the passages an assistant should read aloud: the
 * answer-first block, then the key-takeaway region where a page has one.
 * `AnswerBlock` and the takeaway lists carry these class names.
 */
export function speakable(selectors: string[] = [".ih-answer", ".ih-takeaways"]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: selectors,
  };
}

/** Strip the inline link/bold marks used in content strings. */
export function plainText(inline: string): string {
  return inline
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** Serialize a graph for a <script type="application/ld+json"> tag. */
export function serializeJsonLd(nodes: JsonLdNode[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");
}
