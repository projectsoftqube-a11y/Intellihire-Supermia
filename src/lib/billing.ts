/**
 * Billing plans data access.
 *
 * Plans are fetched from the IntelliHire billing API. The base path and API key
 * are read from the server-only `BILLING_API_BASE_URL` and `BILLING_API_KEY`
 * env vars (see `.env.example`). If they are missing or the request fails, we
 * fall back to a static set of plans so the pricing section never renders
 * empty or broken.
 */

import { cache } from "react";

export type BillingPlanFeatures = {
  plan_feature_id: string;
  total_active_job_post: number;
  total_candidate_profile: number;
  total_ai_interview: number;
  total_ai_interview_min: number;
  total_human_interview: number;
  total_human_interview_minutes: number;
  total_question_bank_upload: number;
  total_no_question: number;
  linkedin_post: number;
  career_page_api_access: boolean;
  no_of_user: number;
  interview_call_reminder: boolean;
  resume_screening: boolean;
  plan_features: string[];
};

export type BillingPlan = {
  plan_id: string;
  plan_name: string;
  plan_code: string;
  description: string;
  monthly_cost: number;
  currency: string;
  discount_percentage: number;
  plan_days: number;
  order_no: number;
  is_trial: boolean;
  trial_days: number;
  is_popular: boolean;
  is_active: boolean;
  is_custom_plan: boolean;
  support_type: string | null;
  support_term: string | null;
  features: BillingPlanFeatures;
};

type BillingPlansResponse = {
  data: { plans: BillingPlan[]; total: number };
  message: string;
  status: number;
};

/**
 * A trimmed, display-ready plan used by the pricing UI. Keeping the view model
 * separate from the raw API shape means the component never has to know about
 * the API's field names.
 */
/** One bullet on a pricing card. */
export type PricingPoint = {
  label: string;
  /**
   * Whether the plan includes this feature. `false` renders a cross instead of
   * a tick, e.g. the Free plan's "No Career Page API Access".
   */
  included: boolean;
};

/**
 * Structured plan limits from the API, used for the comparison table on
 * /pricing. Null for the static fallback plans, which only list features.
 */
export type PlanLimits = {
  activeJobPosts: number;
  candidateProfiles: number;
  aiInterviewMinutes: number;
  humanInterviewMinutes: number;
  questionBankUploads: number;
  questionGenerations: number;
  linkedinPosts: number;
  users: number;
  careerPageApi: boolean;
  interviewReminders: boolean;
  resumeScreening: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  blurb: string;
  /** Formatted price label, e.g. "Free", "$49", "Custom". */
  price: string;
  /** Billing cadence shown next to the price, e.g. "/month". Empty when N/A. */
  cadence: string;
  /** Monthly cost as a number, or null when not priced (custom, coming soon). */
  monthlyCost: number | null;
  currency: string;
  /** Free-trial length in days; 0 when the plan is not a trial. */
  trialDays: number;
  featured: boolean;
  isCustom: boolean;
  points: PricingPoint[];
  limits: PlanLimits | null;
  cta: { label: string; href: string };
};

const SIGNUP_URL =
  process.env.NEXT_PUBLIC_APP_SIGNUP_URL ??
  "mailto:hello@supermia.ai?subject=IntelliHire%20pricing";

const SALES_URL =
  process.env.NEXT_PUBLIC_SALES_URL ??
  "mailto:hello@supermia.ai?subject=IntelliHire%20custom%20plan";

/**
 * Build the signup link for a plan, carrying the plan code through as
 * `?plan=<plan_code>` so the app can preselect it. Skipped for `mailto:` links,
 * where a query string would be meaningless.
 */
function signupHref(planCode: string): string {
  if (!planCode || SIGNUP_URL.startsWith("mailto:")) return SIGNUP_URL;
  const separator = SIGNUP_URL.includes("?") ? "&" : "?";
  return `${SIGNUP_URL}${separator}plan=${encodeURIComponent(planCode)}`;
}

/**
 * The API hands us pre-rendered bullet strings, phrasing an excluded feature as
 * a negative sentence (e.g. the Free plan's "No Career Page API Access", which
 * corresponds to `career_page_api_access: false`). Detect that wording so the
 * UI can show a cross rather than a tick.
 */
function toPoint(label: string): PricingPoint {
  const normalised = label.trim().toLowerCase();
  const excluded =
    /^(no|not included|none)\b/.test(normalised) ||
    normalised.endsWith("not included");

  return { label: label.trim(), included: !excluded };
}

/** Convenience for the static fallback list, where every bullet is included. */
const included = (label: string): PricingPoint => ({ label, included: true });

/** Static plans shown if the billing API is unavailable. */
const FALLBACK_PLANS: PricingPlan[] = [
  {
    id: "fallback-starter",
    name: "Starter",
    blurb: "For small teams running their first AI-assisted hires.",
    price: "Coming soon",
    cadence: "",
    monthlyCost: null,
    currency: "USD",
    trialDays: 0,
    featured: false,
    isCustom: false,
    limits: null,
    points: [
      included("Resume parsing and candidate matching"),
      included("AI voice interviews"),
      included("Automated scorecards"),
      included("Email and WhatsApp notifications"),
    ],
    cta: { label: "Notify me", href: SIGNUP_URL },
  },
  {
    id: "fallback-growth",
    name: "Growth",
    blurb: "For scaling teams hiring across multiple roles at once.",
    price: "Coming soon",
    cadence: "",
    monthlyCost: null,
    currency: "USD",
    trialDays: 0,
    featured: true,
    isCustom: false,
    limits: null,
    points: [
      included("Everything in Starter"),
      included("AI-assisted human interviews"),
      included("Interview proctoring and integrity scoring"),
      included("Pipeline management and analytics"),
      included("ATS and calendar integrations"),
    ],
    cta: { label: "Notify me", href: SIGNUP_URL },
  },
  {
    id: "fallback-enterprise",
    name: "Enterprise",
    blurb: "For organizations with compliance and scale requirements.",
    price: "Let's talk",
    cadence: "custom pricing",
    monthlyCost: null,
    currency: "USD",
    trialDays: 0,
    featured: false,
    isCustom: true,
    limits: null,
    points: [
      included("Everything in Growth"),
      included("Multi-tenant isolation and SSO"),
      included("Custom retention and audit logging"),
      included("Dedicated interviewer portal"),
      included("Priority support and onboarding"),
    ],
    cta: { label: "Contact Sales", href: SALES_URL },
  },
];

/**
 * Whether a plan is a "contact sales" tier.
 *
 * The API currently returns `is_custom_plan: false` for the Custom plan, so we
 * also treat a CUSTOM-prefixed code or name as custom.
 */
function isCustomPlan(plan: BillingPlan): boolean {
  return (
    plan.is_custom_plan ||
    plan.plan_code?.toUpperCase().startsWith("CUSTOM") ||
    plan.plan_name?.trim().toLowerCase() === "custom"
  );
}

/** Abort the upstream request if it has not responded in this many ms. */
const REQUEST_TIMEOUT_MS = 8000;

/** Reject a response body larger than this (the real payload is ~6 KB). */
const MAX_RESPONSE_BYTES = 512 * 1024;

/** Upper bound on plans rendered, so a runaway payload cannot flood the page. */
const MAX_PLANS = 12;

/** Longest text accepted from the API for a single field. */
const MAX_TEXT_LENGTH = 400;

/** Feature bullets rendered per card. */
const MAX_POINTS = 30;

/**
 * Validate and clamp a string coming from the API.
 *
 * React escapes interpolated text, so this is not an XSS guard; it stops
 * absurdly long or non-string values from breaking the layout. Control
 * characters are stripped so they cannot corrupt the rendered markup.
 */
function safeText(value: unknown, maxLength = MAX_TEXT_LENGTH): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Coerce an API number into a finite, non-negative value. */
function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : 0;
}

/**
 * Build the plans URL from the configured base, rejecting anything that is not
 * a well-formed http(s) origin so a bad env value cannot redirect the request
 * to an unexpected scheme or host.
 */
function buildEndpoint(baseUrl: string | undefined): string | null {
  const trimmed = baseUrl?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return new URL("/api/v1/web/billing/plans", url.origin).toString();
  } catch {
    return null;
  }
}

/** Reject entries that are not usable plan objects before mapping them. */
function isValidPlan(plan: unknown): plan is BillingPlan {
  if (!plan || typeof plan !== "object") return false;
  const candidate = plan as Partial<BillingPlan>;
  return (
    typeof candidate.plan_id === "string" &&
    candidate.plan_id.length > 0 &&
    typeof candidate.plan_name === "string" &&
    candidate.is_active === true
  );
}

/** Trial length in whole days, or 0 when the API gives nothing usable. */
function trialDays(plan: BillingPlan): number {
  const days = safeNumber(plan.trial_days) || safeNumber(plan.plan_days);
  return Math.floor(Math.min(days, 365));
}

function formatPrice(plan: BillingPlan): { price: string; cadence: string } {
  // A custom tier has no list price, so the slot names the next step instead
  // of showing a number.
  if (isCustomPlan(plan)) {
    return { price: "Let's talk", cadence: "custom pricing" };
  }

  const cost = safeNumber(plan.monthly_cost);

  if (cost <= 0) {
    // A free plan is time-limited, so show its length rather than implying
    // it is free forever.
    const days = trialDays(plan);
    return {
      price: "Free",
      cadence: plan.is_trial === true && days > 0 ? `for ${days} days` : "",
    };
  }

  // An unrecognised currency code would make Intl throw, so fall back to USD.
  const currency = /^[A-Z]{3}$/.test(plan.currency ?? "")
    ? plan.currency
    : "USD";

  // A whole number stays clean ($49); a fractional one always shows exactly
  // two decimals, so 49.5 reads as $49.50 and 99.555 rounds to $99.56.
  const decimals = Number.isInteger(cost) ? 0 : 2;

  let formatted: string;
  try {
    formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(cost);
  } catch {
    formatted = `$${cost.toFixed(decimals)}`;
  }

  return { price: formatted, cadence: "/month" };
}

/**
 * CTA label for a non-custom plan. A trial plan names its length when the API
 * provides one, e.g. "Start 7 Day Free Trial".
 */
function ctaLabel(plan: BillingPlan): string {
  if (plan.is_trial !== true) return "Get Started";

  const days = trialDays(plan);
  return days > 0 ? `Start ${days} Day Free Trial` : "Start Free Trial";
}

/** Pull the structured limits out of the API feature block. */
function toLimits(features: BillingPlanFeatures | undefined): PlanLimits | null {
  if (!features || typeof features !== "object") return null;
  return {
    activeJobPosts: safeNumber(features.total_active_job_post),
    candidateProfiles: safeNumber(features.total_candidate_profile),
    aiInterviewMinutes: safeNumber(features.total_ai_interview_min),
    humanInterviewMinutes: safeNumber(features.total_human_interview_minutes),
    questionBankUploads: safeNumber(features.total_question_bank_upload),
    questionGenerations: safeNumber(features.total_no_question),
    linkedinPosts: safeNumber(features.linkedin_post),
    users: safeNumber(features.no_of_user),
    careerPageApi: features.career_page_api_access === true,
    interviewReminders: features.interview_call_reminder === true,
    resumeScreening: features.resume_screening === true,
  };
}

/** Map a raw API plan into the display-ready view model. */
function toPricingPlan(plan: BillingPlan): PricingPlan {
  const { price, cadence } = formatPrice(plan);
  const custom = isCustomPlan(plan);
  const cost = safeNumber(plan.monthly_cost);

  const rawPoints = Array.isArray(plan.features?.plan_features)
    ? plan.features.plan_features
    : [];

  return {
    id: safeText(plan.plan_id, 64),
    name: safeText(plan.plan_name, 60),
    blurb: safeText(plan.description),
    price,
    cadence,
    monthlyCost: custom ? null : cost,
    currency: /^[A-Z]{3}$/.test(plan.currency ?? "") ? plan.currency : "USD",
    trialDays: plan.is_trial === true ? trialDays(plan) : 0,
    limits: toLimits(plan.features),
    // A custom plan is never the highlighted tier.
    featured: plan.is_popular === true && !custom,
    isCustom: custom,
    points: rawPoints
      .map((label) => safeText(label, 120))
      .filter((label) => label.length > 0)
      .slice(0, MAX_POINTS)
      .map(toPoint),
    cta: custom
      ? { label: "Contact Sales", href: SALES_URL }
      : {
          label: ctaLabel(plan),
          href: signupHref(plan.plan_code),
        },
  };
}

/**
 * Fetch active billing plans for the pricing section (server-side).
 *
 * Returns display-ready plans sorted by `order_no`. Falls back to a static set
 * on any failure (missing base URL, network error, non-OK status, bad payload).
 */
async function fetchBillingPlans(): Promise<PricingPlan[]> {
  const baseUrl = process.env.BILLING_API_BASE_URL;

  const endpoint = buildEndpoint(baseUrl);
  if (!endpoint) return FALLBACK_PLANS;

  // This endpoint is public: it serves the marketing pricing table and needs
  // no credentials. Set BILLING_API_KEY only if the backend starts requiring
  // an `X-API-Key` header.
  const apiKey = process.env.BILLING_API_KEY?.trim();

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      // Never follow a redirect: it could point the request at an unintended
      // host, and this endpoint is not expected to redirect.
      redirect: "error",
      // Abort a hung upstream so a slow API cannot stall page rendering.
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      // Reuse the response for a minute. The API takes 1-2 s to answer, and
      // fetching it on every visit made each page that shows prices slow to
      // open. A plan change in the database still shows within a minute.
      next: { revalidate: 60 },
    });

    if (!res.ok) return FALLBACK_PLANS;

    // Reject an oversized body before parsing it, so a malformed or hostile
    // upstream cannot exhaust memory.
    const declaredLength = Number(res.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_RESPONSE_BYTES) return FALLBACK_PLANS;

    const raw = await res.text();
    if (raw.length > MAX_RESPONSE_BYTES) return FALLBACK_PLANS;

    let json: BillingPlansResponse;
    try {
      json = JSON.parse(raw) as BillingPlansResponse;
    } catch {
      return FALLBACK_PLANS;
    }

    // The API signals success with `status: 1`; `status: 0` means a backend error.
    if (json?.status !== 1) return FALLBACK_PLANS;

    const plans = json?.data?.plans;
    if (!Array.isArray(plans)) return FALLBACK_PLANS;

    const mapped = plans
      .filter(isValidPlan)
      .slice(0, MAX_PLANS)
      .sort((a, b) => safeNumber(a.order_no) - safeNumber(b.order_no))
      .map(toPricingPlan)
      .filter((plan) => plan.name.length > 0);

    if (mapped.length === 0) return FALLBACK_PLANS;

    // The API can flag several plans as popular; highlight only the first so
    // the "Popular" badge stays meaningful.
    let highlighted = false;
    return mapped.map((plan) => {
      if (!plan.featured) return plan;
      if (highlighted) return { ...plan, featured: false };
      highlighted = true;
      return plan;
    });
  } catch {
    // Network error, timeout, unexpected redirect or malformed body: the
    // pricing section degrades to the static plans rather than failing the
    // page render. Details are deliberately not logged, since the upstream
    // error can echo the endpoint and request headers.
    return FALLBACK_PLANS;
  }
}

/**
 * Request-scoped: generateMetadata and the page share one API call per
 * request (both need the plans on /pricing and /faq).
 */
export const getBillingPlans = cache(fetchBillingPlans);
