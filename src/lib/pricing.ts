import type { PlanLimits, PricingPlan } from "@/lib/billing";
import { absoluteUrl, type JsonLdNode } from "@/lib/seo";
import { SOFTWARE_ID } from "@/lib/site";

/*
 * Pricing copy derived from the billing API.
 *
 * The approved pricing and FAQ copy (23 Oct 2026) was written while every plan
 * was "Coming soon". The handoff says that once prices are public the page and
 * schema must render from one data source, so every sentence that names a plan
 * or a price is generated here from the same plans as the cards. When the API
 * is unavailable and the static fallback plans show, the approved wording is
 * used unchanged.
 */

/** True when at least one plan shows a real price (free or paid). */
export function hasPublishedPrices(plans: PricingPlan[]): boolean {
  return plans.some((plan) => plan.monthlyCost !== null);
}

/** "A, B, C and D" */
export function listNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const count = (n: number) => NUMBER_WORDS[n] ?? String(n);

function formatMoney(plan: PricingPlan): string {
  if (plan.monthlyCost === null) return plan.price;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: plan.currency,
      minimumFractionDigits: Number.isInteger(plan.monthlyCost) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(plan.monthlyCost) ? 0 : 2,
    }).format(plan.monthlyCost);
  } catch {
    return plan.price;
  }
}

/** Short price phrase for prose, e.g. "free for 7 days", "$49 a month". */
function pricePhrase(plan: PricingPlan): string {
  if (plan.isCustom) return "has custom pricing";
  if (plan.monthlyCost === null) return "is coming soon";
  if (plan.monthlyCost === 0) {
    return plan.trialDays > 0 ? `is free for ${plan.trialDays} days` : "is free";
  }
  return `is ${formatMoney(plan)} a month`;
}

/** Price cell for the comparison table. */
function priceCell(plan: PricingPlan): string {
  if (plan.isCustom) return "Custom pricing";
  if (plan.monthlyCost === null) return plan.price;
  if (plan.monthlyCost === 0) {
    return plan.trialDays > 0 ? `Free for ${plan.trialDays} days` : "Free";
  }
  return `${formatMoney(plan)}/month`;
}

const trialPlan = (plans: PricingPlan[]) =>
  plans.find((plan) => plan.monthlyCost === 0 && plan.trialDays > 0);

/* ------------------------------------------------------------------ copy */

export function pricingH1(plans: PricingPlan[]): string {
  return `IntelliHire Pricing: ${listNames(plans.map((p) => p.name))}`;
}

export function pricingMetaTitle(plans: PricingPlan[]): string {
  const title = `IntelliHire Pricing: ${listNames(plans.map((p) => p.name))} Plans`;
  // Keep within ~60 characters so search results don't truncate it.
  return title.length > 60 ? title.replace(/ Plans$/, "") : title;
}

export function pricingMetaDescription(plans: PricingPlan[]): string {
  const names = listNames(plans.map((p) => p.name));
  if (!hasPublishedPrices(plans)) {
    return `Compare IntelliHire ${names} plans: resume parsing, AI voice interviews, proctoring, analytics, integrations, SSO and support.`;
  }
  return `Compare IntelliHire ${names} plans: monthly prices, job posts, candidate profiles, AI interview minutes and users.`;
}

/** The pricing page's opening paragraph. */
export function pricingLead(plans: PricingPlan[]): string {
  if (!hasPublishedPrices(plans)) {
    return "IntelliHire pricing is being finalized ahead of launch. Here is what each plan includes, so you can compare plans before prices are published.";
  }
  const trial = trialPlan(plans);
  const custom = plans.find((p) => p.isCustom);
  const start = trial
    ? `IntelliHire pricing starts with a free ${trial.trialDays}-day trial`
    : "IntelliHire pricing starts with a monthly plan";
  const end = custom
    ? ` and runs to ${custom.name}, priced to your hiring volume`
    : "";
  return `${start}${end}. Here is what each plan includes, so you can compare them side by side.`;
}

/** The homepage pricing section intro. */
export function homePricingIntro(plans: PricingPlan[]): string {
  if (!hasPublishedPrices(plans)) {
    return "Pricing is being finalized ahead of launch. Here is what each plan includes.";
  }
  return trialPlan(plans)
    ? "Start free and scale as your hiring grows. Every plan includes resume screening, AI interviews and evidence-backed scorecards."
    : "Choose the plan that fits how you hire. Every plan includes resume screening, AI interviews and evidence-backed scorecards.";
}

/** The plans section intro. */
export function plansIntro(plans: PricingPlan[]): string {
  if (!hasPublishedPrices(plans)) {
    return "Choose a plan and select Notify me. It opens an email to the team with the plan name already in the subject line, so we know which plan you want prices for.";
  }
  const custom = plans.find((p) => p.isCustom);
  return `Pick the plan that fits how many roles you hire for at once${
    custom ? `, or contact sales to scope ${custom.name}` : ""
  }.`;
}

/** "How much does IntelliHire cost?" on /pricing and /faq. */
export function costAnswer(plans: PricingPlan[]): string {
  if (!hasPublishedPrices(plans)) {
    const soon = plans.filter((p) => p.monthlyCost === null && !p.isCustom);
    if (soon.length === plans.length) {
      return `Pricing has not been published yet. All ${count(plans.length)} plans, ${listNames(
        plans.map((p) => p.name),
      )}, are marked coming soon while pricing is finalized ahead of launch. Book a demo or ask to be notified when prices are published.`;
    }
    return "Pricing has not been published yet. Plans are marked coming soon while pricing is finalized ahead of launch. Book a demo or ask to be notified when prices are published.";
  }

  const parts = plans.map((plan) => `${plan.name} ${pricePhrase(plan)}`);
  const withLimits = plans.filter((p) => p.limits);
  const everyScreens =
    withLimits.length === plans.length && withLimits.every((p) => p.limits!.resumeScreening);

  return `IntelliHire has ${count(plans.length)} plans: ${listNames(parts)}. ${
    everyScreens ? "Every plan includes resume screening. " : ""
  }Plans differ in limits such as active job posts, candidate profiles, interview minutes and users. Book a demo to see IntelliHire on a role you are hiring for now.`;
}

function plural(n: number, one: string, many: string) {
  return `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;
}

/** "Which plan fits our team?" on /pricing. */
export function planFitAnswer(plans: PricingPlan[]): string {
  const custom = plans.find((p) => p.isCustom);
  const sized = plans.filter((p) => !p.isCustom && p.limits);

  if (sized.length === 0) {
    return "Starter is for small teams running their first AI-assisted hires. Choose Growth if you hire across several roles at once or need AI-assisted human interviews, proctoring, pipeline analytics, or ATS and calendar integrations. Choose Enterprise if you need SSO, custom retention and audit logging, a dedicated interviewer portal, or priority support and onboarding.";
  }

  const sizes = sized.map((plan) => {
    const l = plan.limits!;
    const trial = plan.monthlyCost === 0 && plan.trialDays > 0 ? ` for ${plan.trialDays} days` : "";
    return `${plan.name} covers ${plural(l.activeJobPosts, "active job post", "active job posts")} and ${plural(
      l.users,
      "user",
      "users",
    )}${trial}`;
  });

  return `Start with how many roles you hire for at once and how many people on your team need access. ${listNames(
    sizes,
  )}.${
    custom
      ? ` Choose ${custom.name} if you need custom limits, SSO, custom retention and audit logging, a dedicated interviewer portal, or priority support and onboarding.`
      : ""
  }`;
}

/** Trial question, or null when there is no trial plan. */
export function trialAnswer(plans: PricingPlan[]): string | null {
  const trial = trialPlan(plans);
  if (!trial?.limits) return null;
  const l = trial.limits;
  return `Yes. The ${trial.name} plan runs for ${trial.trialDays} days with ${plural(
    l.activeJobPosts,
    "active job post",
    "active job posts",
  )}, ${plural(l.candidateProfiles, "candidate profile", "candidate profiles")} and ${plural(
    l.aiInterviewMinutes,
    "minute",
    "minutes",
  )} of AI interviews, so you can run a real role start to finish before you pay anything.`;
}

export function enterpriseAnswer(plans: PricingPlan[]): string {
  const custom = plans.find((p) => p.isCustom);
  if (!custom || !hasPublishedPrices(plans)) {
    return "Enterprise adds multi-tenant isolation and SSO, custom retention and audit logging, a dedicated interviewer portal, and priority support and onboarding to everything in Growth.";
  }
  return `${custom.name} is priced to your hiring volume, with custom limits on job posts, candidate profiles, interview minutes and user seats. It also adds multi-tenant isolation and SSO, custom retention and audit logging, a dedicated interviewer portal, and priority support and onboarding.`;
}

export const FEES_ANSWER =
  "Fees will be set out in your order form or subscription agreement. Under the current terms, unless stated otherwise, fees are non-refundable and exclusive of applicable taxes.";

export type PricingFaq = { question: string; answer: string };

export function pricingFaqs(plans: PricingPlan[]): PricingFaq[] {
  const trial = trialAnswer(plans);
  const custom = plans.find((p) => p.isCustom);

  return [
    { question: "How much does IntelliHire cost?", answer: costAnswer(plans) },
    { question: "Which plan fits our team?", answer: planFitAnswer(plans) },
    trial
      ? { question: "Can we try IntelliHire before we pay?", answer: trial }
      : {
          question: "Which plans include AI-assisted human interviews and proctoring?",
          answer:
            "Growth and Enterprise. Both include AI-assisted human interviews and interview proctoring and integrity scoring; Starter does not list them.",
        },
    {
      question: `What does ${custom?.name ?? "Enterprise"} add?`,
      answer: enterpriseAnswer(plans),
    },
    { question: "How are fees billed?", answer: FEES_ANSWER },
  ];
}

/* ------------------------------------------------------------ comparison */

export type ComparisonCell = { text: string; muted?: boolean };
export type ComparisonRow = { label: string; cells: ComparisonCell[] };
export type Comparison = { rows: ComparisonRow[]; note: string };

type LimitRow = {
  label: string;
  value: (l: PlanLimits) => number | boolean;
  /** Text for a custom (Enterprise) plan, whose API limits are zero. */
  custom: string;
};

const LIMIT_ROWS: LimitRow[] = [
  { label: "Active job posts", value: (l) => l.activeJobPosts, custom: "Custom" },
  { label: "Candidate profiles", value: (l) => l.candidateProfiles, custom: "Custom" },
  { label: "AI interview minutes", value: (l) => l.aiInterviewMinutes, custom: "Custom" },
  { label: "Human interview minutes", value: (l) => l.humanInterviewMinutes, custom: "Custom" },
  { label: "Question bank uploads", value: (l) => l.questionBankUploads, custom: "Custom" },
  { label: "Question generations", value: (l) => l.questionGenerations, custom: "Custom" },
  { label: "LinkedIn posts", value: (l) => l.linkedinPosts, custom: "Custom" },
  { label: "Users", value: (l) => l.users, custom: "Custom seats" },
  { label: "Resume screening", value: (l) => l.resumeScreening, custom: "Included" },
  { label: "Career page API access", value: (l) => l.careerPageApi, custom: "On request" },
  { label: "Interview call reminders", value: (l) => l.interviewReminders, custom: "On request" },
];

/** The approved "Compare Plans" table, used with the static fallback plans. */
const FEATURE_ROWS: { label: string; plans: string[] }[] = [
  { label: "Resume parsing and candidate matching", plans: ["Starter", "Growth", "Enterprise"] },
  { label: "AI voice interviews", plans: ["Starter", "Growth", "Enterprise"] },
  { label: "Automated scorecards", plans: ["Starter", "Growth", "Enterprise"] },
  { label: "Email and WhatsApp notifications", plans: ["Starter", "Growth", "Enterprise"] },
  { label: "AI-assisted human interviews", plans: ["Growth", "Enterprise"] },
  { label: "Interview proctoring and integrity scoring", plans: ["Growth", "Enterprise"] },
  { label: "Pipeline management and analytics", plans: ["Growth", "Enterprise"] },
  { label: "ATS and calendar integrations", plans: ["Growth", "Enterprise"] },
  { label: "Multi-tenant isolation and SSO", plans: ["Enterprise"] },
  { label: "Custom retention and audit logging", plans: ["Enterprise"] },
  { label: "Dedicated interviewer portal", plans: ["Enterprise"] },
  { label: "Priority support and onboarding", plans: ["Enterprise"] },
];

export function buildComparison(plans: PricingPlan[]): Comparison {
  const allHaveLimits = plans.every((plan) => plan.limits || plan.isCustom);

  if (allHaveLimits && plans.some((plan) => plan.limits)) {
    const rows: ComparisonRow[] = [
      { label: "Price", cells: plans.map((plan) => ({ text: priceCell(plan) })) },
      ...LIMIT_ROWS.map(({ label, value, custom }) => ({
        label,
        cells: plans.map((plan): ComparisonCell => {
          if (plan.isCustom || !plan.limits) return { text: custom };
          const v = value(plan.limits);
          if (typeof v === "boolean") {
            return v ? { text: "Included" } : { text: "Not included", muted: true };
          }
          return v > 0
            ? { text: v.toLocaleString("en-US") }
            : { text: "Not included", muted: true };
        }),
      })),
    ];

    const custom = plans.find((p) => p.isCustom);
    return {
      rows,
      note: `${
        custom ? `${custom.name} limits, security and onboarding are scoped to your hiring volume. ` : ""
      }If you need something on a smaller plan, ask in your demo.`,
    };
  }

  return {
    rows: FEATURE_ROWS.map(({ label, plans: includedIn }) => ({
      label,
      cells: plans.map((plan) =>
        includedIn.includes(plan.name) ? { text: "Yes" } : { text: "Not listed", muted: true },
      ),
    })),
    note: "“Not listed” means the plan description does not include that feature today. If you need it on a smaller plan, ask in your demo.",
  };
}

/* --------------------------------------------------------------- JSON-LD */

/**
 * Offers on the SoftwareApplication node, built from the same plans as the
 * cards. Empty until at least one plan has a public price.
 */
export function offersNode(plans: PricingPlan[]): JsonLdNode | null {
  const priced = plans.filter((plan) => plan.monthlyCost !== null && !plan.isCustom);
  if (priced.length === 0) return null;

  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "IntelliHire",
    offers: priced.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.blurb,
      price: String(plan.monthlyCost),
      priceCurrency: plan.currency,
      url: absoluteUrl("/pricing"),
      ...(plan.monthlyCost && plan.monthlyCost > 0
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(plan.monthlyCost),
              priceCurrency: plan.currency,
              billingDuration: "P1M",
              unitText: "month",
            },
          }
        : {}),
    })),
  };
}
