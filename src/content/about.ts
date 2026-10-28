import type { MarketingPage } from "@/content/types";

/**
 * About page (/about). Facts only: SuperMIA, Botfinity Inc., the Grapevine,
 * TX office and hello@supermia.ai. No team bios, founding dates, headcount,
 * investors or customers until SuperMIA supplies them.
 */
export const ABOUT_PAGE: MarketingPage = {
  slug: "about",
  path: "/about",
  kind: "about",
  navLabel: "About IntelliHire",
  navDescription: "Who builds IntelliHire",
  metaTitle: "About IntelliHire | Built by SuperMIA",
  metaDescription:
    "IntelliHire is AI recruitment software from SuperMIA, built on one rule: AI does the reading, people make the hiring decision. Learn who we are.",
  eyebrow: "IntelliHire by SuperMIA",
  h1: "About IntelliHire",
  lead: [
    "IntelliHire is AI recruitment software from SuperMIA. It reads and ranks applications against your rubric, runs first-round AI voice interviews around the clock and writes scorecards that cite the interview transcript. This page is about IntelliHire: why we built it, who builds it and how to reach us.",
    "Everything in the product follows one rule: AI does the reading, and people make the hiring decision.",
  ],
  answer:
    "IntelliHire is AI recruitment software built by SuperMIA, with Botfinity Inc. credited on the site and an office in Grapevine, Texas. It reads and ranks applications against your rubric, runs first-round AI voice interviews and writes scorecards citing the transcript. It follows one rule: AI does the reading, and people make the hiring decision.",
  heroImage: {
    src: "/images/heroes/hero-about-intellihire.webp",
    width: 1369,
    height: 1149,
    alt: "Product team sketching together around a long table in a sunlit studio office",
  },
  heroPanel: {
    title: "How IntelliHire works",
    caption: "No candidate is ever rejected by a machine",
    rows: [
      { label: "Reads", detail: "Every application, against your rubric", tone: "blue" },
      { label: "Interviews", detail: "First rounds, around the clock", tone: "orange" },
      { label: "Cites", detail: "Transcript evidence in each scorecard", tone: "green" },
      { label: "Decides", detail: "Your team, every time", tone: "slate" },
    ],
  },
  highlights: [
    "Built by SuperMIA",
    "Office in Grapevine, Texas",
    "People make every hiring decision",
  ],
  sections: [
    {
      id: "why-we-built-intellihire",
      eyebrow: "Why it exists",
      heading: "Why We Built IntelliHire",
      layout: "split",
      body: [
        "Good candidates apply. The trouble is what happens next. Applications pile up, recruiters spend their week on first-pass review, and momentum disappears between calendars and follow-ups. By the time interviews are arranged, some of the people you wanted may have taken other offers.",
        "We built IntelliHire to take the reading, ranking and first-round interviews off your recruiters' desks, so their hours go to the conversations that matter. See the [five stages from application to offer](/) on the home page.",
      ],
      items: [
        {
          title: "Too many applications",
          text: "When a role draws hundreds of applicants, the strongest one can be the application nobody opened.",
        },
        {
          title: "Too much manual screening",
          text: "Every hour on first-pass review is an hour not spent talking to the people you want to hire.",
        },
        {
          title: "Great candidates get missed",
          text: "Strong potential can sit behind an unusual resume. A rushed first pass rarely finds it.",
        },
      ],
    },
    {
      id: "one-rule",
      eyebrow: "Our principle",
      heading: "One Rule: AI Does the Reading, People Decide",
      layout: "contrast",
      body: [
        "Every stage in IntelliHire ends with a handoff to a person. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. Read how [human oversight and data security](/platform/human-oversight) work in IntelliHire.",
      ],
      contrast: {
        leftLabel: "IntelliHire does",
        rightLabel: "Your team decides",
        rows: [
          { left: "Reads and structures every application", right: "What the role actually needs" },
          { left: "Ranks candidates against your rubric", right: "Which signals carry weight" },
          { left: "Runs first-round interviews around the clock", right: "Who moves forward" },
          { left: "Drafts scorecards with transcript evidence", right: "What the evidence means" },
          { left: "Flags integrity concerns for review", right: "The final offer, every time" },
        ],
      },
    },
    {
      id: "built-by-supermia",
      eyebrow: "Who we are",
      heading: "Built by SuperMIA",
      layout: "cards",
      body: [
        "IntelliHire is built by SuperMIA (supermia.ai), with Botfinity Inc. credited on the site. You can also read about [IntelliHire on SuperMIA](https://supermia.ai/ai-interview-agent/).",
      ],
      items: [
        {
          title: "SuperMIA",
          text: "The team that builds IntelliHire. Find SuperMIA at supermia.ai.",
        },
        {
          title: "Botfinity Inc.",
          text: "The company credited on the IntelliHire site.",
        },
        {
          title: "Grapevine, Texas",
          text: "Our office is at 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051.",
        },
      ],
    },
    {
      id: "contact",
      eyebrow: "Contact",
      heading: "Contact the IntelliHire Team",
      layout: "split",
      body: [
        "The quickest way to see IntelliHire is to book a demo and bring a role you are hiring for now. We'll walk through how IntelliHire would screen, interview and score it, and show where your team stays in control. IntelliHire is built by SuperMIA, so you'll pick a time on the SuperMIA demo calendar.",
        "To see what each plan includes, visit the [IntelliHire pricing page](/pricing).",
      ],
      items: [
        {
          title: "Book a demo",
          text: "Bring a real role and see how it would be screened, interviewed and scored.",
        },
        {
          title: "Email the team",
          text: "Questions about IntelliHire go to hello@supermia.ai.",
        },
      ],
    },
  ],
  faqHeading: "About IntelliHire: Quick Answers",
  faqs: [
    {
      question: "Who makes IntelliHire?",
      answer:
        "IntelliHire is built by SuperMIA (supermia.ai), with Botfinity Inc. credited on the site. The office is at 2451 W Grapevine Mills Cir #547, Grapevine, Texas, and you can reach the team at hello@supermia.ai.",
    },
    {
      question: "What is IntelliHire?",
      answer:
        "IntelliHire is AI recruitment software from SuperMIA. It parses resumes, ranks candidates against your rubric, runs first-round AI voice interviews and writes scorecards that cite the interview transcript. Your team reviews the evidence and makes every hiring decision.",
    },
    {
      question: "Does IntelliHire make hiring decisions?",
      answer:
        "No. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. Your team reads the evidence and makes the final offer decision.",
    },
  ],
  cta: {
    heading: "See IntelliHire on Your Next Open Role",
    body: "AI does the reading. Your team makes the call. See it on a role you are hiring for now.",
  },
  related: ["/platform/human-oversight", "/pricing", "/faq"],
  primaryKeyword: "about intellihire",
  dateModified: "2026-10-27",
};
