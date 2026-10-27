import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ChartColumnIncreasing,
  ClipboardCheck,
  FileSearch,
  ListOrdered,
  Mic,
  Rocket,
  ScanEye,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { APP_LOGIN_URL, CONTACT_EMAIL, DEMO_URL, SUPERMIA_PRODUCT_URL } from "@/lib/site";

/**
 * Site navigation, per "00 Site Navigation / Navigation and Menu Spec".
 * Labels are used verbatim as anchor text, so keep them in sync with the spec.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type NavColumn = { heading: string; links: NavLink[] };

export const PLATFORM_COLUMNS: NavColumn[] = [
  {
    heading: "Screen",
    links: [
      {
        label: "AI Resume Screening",
        href: "/platform/ai-resume-screening",
        description: "Every application read and structured",
        icon: FileSearch,
      },
      {
        label: "Candidate Matching",
        href: "/platform/candidate-matching",
        description: "Ranked against your rubric, with reasons",
        icon: ListOrdered,
      },
    ],
  },
  {
    heading: "Interview",
    links: [
      {
        label: "AI Interviews",
        href: "/platform/ai-interviews",
        description: "First-round voice interviews, any hour",
        icon: Mic,
      },
      {
        label: "Interview Proctoring",
        href: "/platform/interview-proctoring",
        description: "Integrity flags for a person to review",
        icon: ScanEye,
      },
    ],
  },
  {
    heading: "Decide",
    links: [
      {
        label: "Interview Scorecards",
        href: "/platform/interview-scorecards",
        description: "Ratings that cite the transcript",
        icon: ClipboardCheck,
      },
      {
        label: "Recruitment Analytics",
        href: "/platform/recruitment-analytics",
        description: "Time-to-hire, funnel and stall points",
        icon: ChartColumnIncreasing,
      },
    ],
  },
];

/** The dropdown's footer row. */
export const PLATFORM_FOOTER: NavLink[] = [
  {
    label: "Human Oversight and Security",
    href: "/platform/human-oversight",
    description: "Where AI helps and where people decide",
    icon: ShieldCheck,
  },
  { label: "How it works", href: "/#how-it-works" },
];

export const USE_CASE_LINKS: NavLink[] = [
  {
    label: "High-Volume Hiring",
    href: "/use-cases/high-volume-hiring",
    description: "Every applicant read and interviewed",
    icon: UsersRound,
  },
  {
    label: "Recruitment Agencies",
    href: "/use-cases/recruitment-agencies",
    description: "First rounds for every client role",
    icon: Building2,
  },
  {
    label: "HR and Talent Teams",
    href: "/use-cases/hr-teams",
    description: "Consistent first rounds, clear evidence",
    icon: ClipboardCheck,
  },
  {
    label: "Startups and SMBs",
    href: "/use-cases/startups",
    description: "Hiring without a recruiting team",
    icon: Rocket,
  },
];

export const TOP_LINKS: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export const PLATFORM_LINKS: NavLink[] = [
  ...PLATFORM_COLUMNS.flatMap((column) => column.links),
  PLATFORM_FOOTER[0],
];

export type FooterLink = NavLink & {
  external?: boolean;
  /** GA4 event fired on click, see `TrackClicks`. */
  track?: string;
};

export const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Platform",
    links: [
      ...PLATFORM_LINKS.map(({ label, href }) => ({ label, href })),
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Use Cases",
    links: USE_CASE_LINKS.map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About IntelliHire", href: "/about" },
      {
        label: "IntelliHire on SuperMIA",
        href: SUPERMIA_PRODUCT_URL,
        external: true,
      },
      {
        label: `Contact: ${CONTACT_EMAIL}`,
        href: `mailto:${CONTACT_EMAIL}`,
        track: "contact_email_click",
      },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      {
        label: "Book a demo",
        href: DEMO_URL,
        external: true,
        track: "book_demo_click",
      },
      {
        label: "Log in",
        href: APP_LOGIN_URL,
        external: true,
        track: "login_click",
      },
    ],
  },
];

/** True when `href` is the current route or (for sections) one of its pages. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href.includes("#") || href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
