import { PLATFORM_PAGES } from "@/content/platform";
import { USE_CASE_PAGES } from "@/content/use-cases";
import { BLOG_POSTS, postPath } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";
import { APP_LOGIN_URL, CONTACT_EMAIL, DEMO_URL, SUPERMIA_PRODUCT_URL, SUPERMIA_URL } from "@/lib/site";

// Built from the same content as the pages, so every link is live.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# IntelliHire by SuperMIA",
    "",
    "> IntelliHire is AI recruitment software from SuperMIA, with Botfinity Inc. credited on the site, based in Grapevine, Texas. It parses resumes, ranks candidates against a rubric the hiring team sets, runs first-round AI voice interviews around the clock, flags interview integrity concerns for human review and writes scorecards that cite the interview transcript. People make every hiring decision: no candidate is ever rejected by a machine.",
    "",
    "## Product",
    "",
    `- [IntelliHire home](${absoluteUrl("/")}): AI recruitment software with human decisions.`,
    `- [Pricing](${absoluteUrl("/pricing")}): IntelliHire plans and what each one includes.`,
    `- [FAQ](${absoluteUrl("/faq")}): screening, AI interviews, oversight, candidate data and pricing.`,
    `- [Log in](${APP_LOGIN_URL}): the IntelliHire web app.`,
    `- [Book a demo](${DEMO_URL})`,
    "",
    "## Platform",
    "",
    ...PLATFORM_PAGES.map((page) => `- [${page.navLabel}](${absoluteUrl(page.path)}): ${page.navDescription}.`),
    "",
    "## Use cases",
    "",
    ...USE_CASE_PAGES.map((page) => `- [${page.navLabel}](${absoluteUrl(page.path)}): ${page.navDescription}.`),
    "",
    "## Blog",
    "",
    `- [Blog](${absoluteUrl("/blog")}): AI in recruiting, interviews and hiring metrics.`,
    ...BLOG_POSTS.map((post) => `- [${post.h1}](${absoluteUrl(postPath(post))})`),
    "",
    "## Key facts",
    "",
    "- Stages: attract, screen, assess, interview, hire; every stage ends with a handoff to a person.",
    "- AI voice interviews with natural turn-taking; AI can join human-led interviews on selected plans.",
    "- Scorecards cite the interview transcript; proctoring flags concerns for review, never an automatic rejection.",
    "- Recruitment analytics: time-to-hire, funnel conversion, stall points.",
    "- Candidate updates by email and WhatsApp, plus SMS depending on the plan; candidate portal with device checks.",
    "- Data: encryption in transit and at rest, role-based access, audit logging, configurable retention; personal information is not sold.",
    `- Contact: ${CONTACT_EMAIL}`,
    "",
    "## Company",
    "",
    `- [About IntelliHire](${absoluteUrl("/about")})`,
    `- [SuperMIA](${SUPERMIA_URL})`,
    `- [IntelliHire on SuperMIA](${SUPERMIA_PRODUCT_URL})`,
    "",
    "## Legal",
    "",
    `- [Privacy Policy](${absoluteUrl("/privacy")})`,
    `- [Terms & Conditions](${absoluteUrl("/terms")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
