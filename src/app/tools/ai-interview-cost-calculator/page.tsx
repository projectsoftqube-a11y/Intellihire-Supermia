import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnswerBlock from "@/components/AnswerBlock";
import FaqSection from "@/components/FaqSection";
import CostCalculator, { type CalculatorPlan } from "@/components/tools/CostCalculator";
import { Eyebrow, JsonLd, RichText } from "@/components/ui";
import { getBillingPlans } from "@/lib/billing";
import {
  absoluteUrl,
  breadcrumbNode,
  buildMetadata,
  faqPageNode,
  webPageNode,
  type Crumb,
} from "@/lib/seo";
import { ORG_ID } from "@/lib/site";

// Prices and limits come from the billing API, refreshed at most once a
// minute, like /pricing.
export const revalidate = 60;

const PATH = "/tools/ai-interview-cost-calculator";
const TITLE = "AI Interview Cost Calculator: Cost per Interview";
const DESCRIPTION =
  "Free calculator: enter interviews per month, interview length and team size to see which IntelliHire plan fits and what each AI interview costs.";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "AI interview cost calculator", path: PATH },
];

const ANSWER =
  "The AI interview cost calculator works out what each first-round AI interview costs on IntelliHire's current plans. Enter how many interviews you run a month, how long each lasts and how many people need access; it shows which plan fits and divides that plan's monthly price by your interviews.";

const STEPS = [
  "Interviews per month multiplied by minutes per interview gives the AI interview minutes you need.",
  "A plan fits when its included minutes, users and candidate profiles all cover your inputs.",
  "The cheapest plan that fits is divided by your monthly interviews to give the cost per interview.",
  "When no published plan fits, Enterprise sets custom limits; book a demo for a quote.",
];

const FAQS = [
  {
    question: "Where do the calculator's prices come from?",
    answer:
      "The calculator reads IntelliHire's current plans, prices and limits from the same billing system as the [pricing page](/pricing), so its numbers change when the plans do. Nothing is estimated except the inputs you enter.",
  },
  {
    question: "How long should a first-round AI interview be?",
    answer:
      "Most first rounds cover a few core questions for the role, so 10 to 20 minutes is a common range. Set the length to what the role needs; shorter interviews let a plan's minutes cover more candidates.",
  },
  {
    question: "Can I compare IntelliHire with other AI interview tools?",
    answer:
      "Yes. Our guide to [AI interview software pricing](/blog/ai-interview-software-pricing) explains how other vendors count minutes, credits and interviews, and how to convert any plan into cost per interviewed candidate.",
  },
];

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default async function CostCalculatorPage() {
  const plans = await getBillingPlans();
  const calculatorPlans: CalculatorPlan[] = plans.map(
    ({ id, name, monthlyCost, currency, trialDays, isCustom, limits }) => ({
      id,
      name,
      monthlyCost,
      currency,
      trialDays,
      isCustom,
      limits,
    }),
  );

  const url = absoluteUrl(PATH);
  const graph = [
    webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, dateModified: "2026-10-28", aboutSoftware: true }),
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "AI Interview Cost Calculator",
      url,
      description: DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": `${url}#webpage` },
    },
    breadcrumbNode(PATH, CRUMBS),
    ...[faqPageNode(PATH, FAQS)].filter((node) => node !== null),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <section className="relative px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
          <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-5 py-10 shadow-[0_30px_80px_-60px_rgba(7,26,61,0.5)] sm:rounded-[34px] sm:px-8 md:px-12 md:py-14 xl:px-16">
            <span
              className="pointer-events-none absolute -top-56 -left-40 h-[520px] w-[760px] rounded-full bg-[#087ef5]/10 blur-[140px]"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:sticky lg:top-28 lg:col-span-5">
                <Eyebrow>Free tool</Eyebrow>
                <h1 className="mt-5 font-display text-[clamp(30px,3.4vw,54px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#071a3d]">
                  AI Interview Cost Calculator
                </h1>
                <div className="mt-5 [&>p]:text-[16px]">
                  <AnswerBlock text={ANSWER} tone="onLight" plain />
                </div>
                <div className="mt-8 rounded-[22px] border border-[#e5eaf0] bg-[#f7fafd] p-6">
                  <h2 className="m-0 text-[13px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/70">
                    How the calculation works
                  </h2>
                  <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                    {STEPS.map((step, i) => (
                      <li key={step} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-[#071a3d]">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#087ef5]/10 font-display text-[12px] text-[#066bd4]">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="m-0 mt-6 text-[14px] leading-[1.7] text-[#5b6575]">
                  <RichText text="Comparing vendors? Read [how AI interview software is priced](/blog/ai-interview-software-pricing) or the [HireVue alternatives](/blog/hirevue-alternatives) comparison." />
                </p>
              </div>

              <div className="min-w-0 lg:col-span-7">
                <CostCalculator plans={calculatorPlans} />
              </div>
            </div>
          </div>
        </section>

        <FaqSection heading="Cost Calculator FAQs" items={FAQS} link={{ label: "See all IntelliHire FAQs", href: "/faq" }} />
      </main>
      <SiteFooter />
    </>
  );
}
