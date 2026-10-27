export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://intellihire.supermia.ai";

export const SITE_NAME = "IntelliHire";

/** Full brand, used where "IntelliHire" alone collides with intellihire.com. */
export const BRAND_NAME = "IntelliHire by SuperMIA";

export const SITE_TAGLINE = "AI recruitment software with human decisions";

export const SITE_TITLE =
  "IntelliHire: AI Recruitment Software With Human Decisions";

export const SITE_DESCRIPTION =
  "IntelliHire is AI recruitment software that screens resumes, ranks candidates and runs first-round voice interviews. Your team makes every hiring decision.";

export const OG_IMAGE_ALT =
  "IntelliHire: AI recruitment software that screens, interviews and leaves the hiring decision to your team";

export const TWITTER_HANDLE = "@supermia_ai";

/** Primary CTA destination: the SuperMIA demo scheduler. */
export const DEMO_URL = "https://supermia.ai/schedule-demo/";

// Login lives in the separate app. Configurable so staging can point
// elsewhere, and always https since credentials are entered there.
export const APP_LOGIN_URL =
  process.env.NEXT_PUBLIC_APP_LOGIN_URL ??
  "https://app.intellihire.supermia.ai/";

export const CONTACT_EMAIL = "hello@supermia.ai";

export const PRICING_NOTIFY_MAILTO =
  "mailto:hello@supermia.ai?subject=IntelliHire%20pricing";

export const SUPERMIA_URL = "https://supermia.ai/";

export const SUPERMIA_PRODUCT_URL = "https://supermia.ai/ai-interview-agent/";

export const LEGAL_NAME = "Botfinity Inc.";

export const ADDRESS = {
  street: "2451 W Grapevine Mills Cir #547",
  locality: "Grapevine",
  region: "TX",
  postalCode: "76051",
  country: "US",
} as const;

export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;

/** Schema.org @id values shared across every page's JSON-LD graph. */
export const ORG_ID = "https://supermia.ai/#organization";
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
