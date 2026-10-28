import type { Metadata } from "next";
import { Check, FileSearch, Lock, Scale } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnswerBlock from "@/components/AnswerBlock";
import PlanCards from "@/components/PlanCards";
import Reveal from "@/components/Reveal";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import { ArrowLink, Eyebrow, JsonLd, PillButton, RichText } from "@/components/ui";
import { getBillingPlans } from "@/lib/billing";
import {
  buildComparison,
  hasPublishedPrices,
  offersNode,
  plansIntro,
  pricingAnswer,
  pricingFaqs,
  pricingH1,
  pricingLead,
  pricingMetaDescription,
  pricingMetaTitle,
} from "@/lib/pricing";
import {
  absoluteUrl,
  breadcrumbNode,
  buildMetadata,
  faqPageNode,
  webPageNode,
  type Crumb,
} from "@/lib/seo";
import { DEMO_URL, PRICING_NOTIFY_MAILTO } from "@/lib/site";

// Prices come from the billing API on every request, like the homepage.
export const dynamic = "force-dynamic";

const PATH = "/pricing";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

export async function generateMetadata(): Promise<Metadata> {
  const plans = await getBillingPlans();
  return buildMetadata({
    title: pricingMetaTitle(plans),
    description: pricingMetaDescription(plans),
    path: PATH,
  });
}

const SAME_ON_EVERY_PLAN = [
  {
    icon: FileSearch,
    title: "Evidence before decisions",
    text: "IntelliHire reads, ranks and drafts scorecards that cite the interview transcript.",
  },
  {
    icon: Scale,
    title: "Your team decides",
    text: "AI outputs are decision support, not decisions. People decide who moves forward.",
  },
  {
    icon: Lock,
    title: "Candidate data protected",
    text: "Encrypted in transit and at rest, role-based access, and no sale of personal information.",
  },
];

export default async function PricingPage() {
  const plans = await getBillingPlans();
  const published = hasPublishedPrices(plans);
  const comparison = buildComparison(plans);
  const faqs = pricingFaqs(plans);
  const featuredIndex = plans.findIndex((plan) => plan.featured);

  const graph = [
    webPageNode({
      path: PATH,
      name: pricingMetaTitle(plans),
      description: pricingMetaDescription(plans),
      dateModified: "2026-10-27",
      aboutSoftware: true,
      extra: { mainEntityOfPage: { "@id": `${absoluteUrl(PATH)}#faq` } },
    }),
    breadcrumbNode(PATH, CRUMBS),
    ...[offersNode(plans), faqPageNode(PATH, faqs)].filter((node) => node !== null),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        {/* Plans first: the heading and short answer sit directly above the
            cards, so prices are the first thing on the page. */}
        <section id="plans" className="relative scroll-mt-24 px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
          <div className="mx-auto max-w-[1920px]">
            <div className="relative overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-3 pt-12 pb-8 shadow-[0_30px_80px_-60px_rgba(7,26,61,0.5)] sm:rounded-[34px] sm:px-8 md:px-12 md:pt-16 md:pb-12 xl:px-14">
              <span
                className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[#087ef5]/10 blur-[140px]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.5] [background-image:linear-gradient(#e5eaf0_1px,transparent_1px),linear-gradient(90deg,#e5eaf0_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
                aria-hidden="true"
              />

              <div className="relative mx-auto flex max-w-[860px] flex-col items-center px-2 text-center sm:px-0">
                <Eyebrow>Pricing</Eyebrow>
                <h1 className="mt-6 font-display text-[clamp(30px,4vw,60px)] leading-[1.05] font-normal tracking-[-0.02em] text-[#071a3d]">
                  {pricingH1(plans)}
                </h1>
                <div className="mt-6 [&>p]:mx-auto [&>p]:max-w-[720px]">
                  <AnswerBlock text={pricingAnswer(plans)} tone="onLight" plain />
                </div>
              </div>

              <PlanCards plans={plans} headingLevel="h2" className="relative mt-12 pt-4 md:mt-14 xl:pt-6" />

              <div className="relative mt-10 flex flex-col items-center gap-4 border-t border-[#e5eaf0] px-2 pt-8 text-center sm:px-0 md:flex-row md:justify-between md:text-left">
                <p className="m-0 max-w-[620px] text-[14.5px] leading-[1.65] text-[#5b6575]">{plansIntro(plans)}</p>
                <p className="m-0 flex items-center gap-2.5 text-[13.5px] font-medium text-[#071a3d]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]" aria-hidden="true" />
                  No candidate is ever rejected by a machine, on any plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          {/* The explanation follows the plans. */}
          <section id="choosing" className="relative px-4 pt-20 sm:px-5 md:px-10 md:pt-28">
            <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              <div data-reveal className="lg:col-span-5">
                <Eyebrow>Choosing a plan</Eyebrow>
                <h2 className="mt-7 font-display text-[clamp(28px,3.2vw,50px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#071a3d]">
                  How to Choose an IntelliHire Plan
                </h2>
              </div>
              <div data-reveal className="flex flex-col gap-5 lg:col-span-7 lg:border-l lg:border-[#e5eaf0] lg:pl-16">
                <p className="m-0 text-[clamp(16px,1.25vw,19px)] leading-[1.7] text-[#071a3d]">
                  {pricingLead(plans)}
                </p>
                <p className="m-0 text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-[#5b6575]">
                  Comparing AI recruitment software pricing? Start with how many roles you hire for at once. Every plan includes resume screening, AI interviews and evidence-backed scorecards. Want to see it work first? Book a demo and bring a role you are hiring for now.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <PillButton href={DEMO_URL} tone="dark">
                    Book a demo
                  </PillButton>
                  <ArrowLink href="#compare">Compare the plans</ArrowLink>
                  <ArrowLink href="/tools/ai-interview-cost-calculator">Work out cost per interview</ArrowLink>
                </div>
              </div>
            </div>
          </section>

          <section id="compare" className="relative scroll-mt-24 px-4 py-20 sm:px-5 md:px-10 md:py-28">
            <div className="mx-auto max-w-[1920px]">
              <div data-reveal className="max-w-[760px]">
                <Eyebrow>Side by side</Eyebrow>
                <h2 className="mt-7 font-display text-[clamp(30px,3.6vw,56px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
                  Compare Plans
                </h2>
              </div>

              <div
                data-reveal
                className="mt-10 overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_24px_60px_-36px_rgba(7,26,61,0.35)] md:mt-12"
              >
                <p className="m-0 border-b border-[#e5eaf0] px-5 py-3 text-[12px] text-[#5b6575] md:hidden">
                  Scroll sideways to see every plan.
                </p>
                <div className="table-scroll">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    <caption className="sr-only">Compare IntelliHire plans</caption>
                    <thead>
                      <tr className="border-b border-[#e5eaf0]">
                        <th
                          scope="col"
                          className="sticky left-0 z-10 w-[30%] bg-[#ffffff] px-5 py-5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/45 md:px-8"
                        >
                          Feature
                        </th>
                        {plans.map((plan, i) => (
                          <th
                            key={plan.id}
                            scope="col"
                            className={`px-4 py-5 text-[16px] font-semibold text-[#071a3d] md:px-6 ${
                              i === featuredIndex ? "bg-[#087ef5]/[0.06]" : ""
                            }`}
                          >
                            <span className="block font-display text-[clamp(17px,1.4vw,21px)] font-normal">
                              {plan.name}
                            </span>
                            {i === featuredIndex && (
                              <span className="mt-1.5 inline-block rounded-full bg-[#ff6b00] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-[#071a3d]">
                                Most popular
                              </span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="group border-b border-[#e5eaf0] last:border-b-0 hover:bg-[#f2f8fd]/70"
                        >
                          <th
                            scope="row"
                            className="sticky left-0 z-10 bg-[#ffffff] px-5 py-4 text-[14px] leading-snug font-semibold text-[#071a3d] group-hover:bg-[#f7fbfe] md:px-8 md:text-[15px]"
                          >
                            {row.label}
                          </th>
                          {row.cells.map((cell, i) => (
                            <td
                              key={`${row.label}-${plans[i]?.id ?? i}`}
                              className={`px-4 py-4 text-[14px] leading-snug md:px-6 md:text-[15px] ${
                                i === featuredIndex ? "bg-[#087ef5]/[0.04]" : ""
                              } ${cell.muted ? "text-[#9aa3b2]" : "text-[#071a3d]"}`}
                            >
                              {cell.text === "Included" || cell.text === "Yes" ? (
                                <span className="inline-flex items-center gap-2">
                                  <Check className="h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                                  {cell.text}
                                </span>
                              ) : (
                                cell.text
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p data-reveal className="m-0 mt-6 max-w-[760px] text-[14px] leading-[1.65] text-[#5b6575]">
                {comparison.note}
              </p>
            </div>
          </section>

          <section id="every-plan" className="relative px-4 sm:px-5 md:px-10">
            <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-14 sm:rounded-[34px] sm:px-8 md:px-14 md:py-20">
              <span
                className="pointer-events-none absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#087ef5]/16 blur-[130px]"
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div data-reveal className="lg:col-span-6">
                  <Eyebrow tone="onDark">On every plan</Eyebrow>
                  <h2 className="mt-7 font-display text-[clamp(28px,3.4vw,52px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#ffffff]">
                    What Every Plan Keeps the Same
                  </h2>
                  <p className="m-0 mt-6 max-w-[620px] text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-[#ffffff]/70">
                    <RichText
                      text="On every plan, IntelliHire reads, ranks and drafts scorecards that cite the interview transcript, and your team decides who moves forward. AI outputs are decision support, not decisions. The privacy policy applies to every customer too: candidate data is encrypted in transit and at rest, access is role-based, and IntelliHire does not sell personal information. Read how [human oversight works](/platform/human-oversight)."
                      linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
                    />
                  </p>
                </div>
                <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:col-span-6 lg:gap-4">
                  {SAME_ON_EVERY_PLAN.map(({ icon: Icon, title, text }) => (
                    <li
                      data-reveal
                      key={title}
                      className="flex flex-col items-start gap-4 rounded-[20px] border border-[#ffffff]/10 bg-[#ffffff]/[0.04] p-5 sm:flex-row sm:gap-5 sm:p-6"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#087ef5] text-[#ffffff]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[17px] font-semibold text-[#ffffff]">{title}</span>
                        <span className="mt-1.5 block text-[14.5px] leading-[1.65] text-[#ffffff]/60">
                          {text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <FaqSection
            heading="Pricing FAQs"
            intro="More answers are on the [IntelliHire FAQ page](/faq). To see what candidates go through in the AI voice interviews included on every plan, read [how AI interviews work](/platform/ai-interviews)."
            items={faqs}
            link={null}
            image={{
              src: "/images/sections/faq-pricing.webp",
              width: 1122,
              height: 1402,
              alt: "Two colleagues reading one printed page together, one pointing to a section",
            }}
          />

          <CtaBand
            eyebrow="Before you choose a plan"
            heading="Plan Your First Hiring Round With IntelliHire"
            body="Bring a live role to the demo and see how IntelliHire would screen, interview and score it before you choose a plan."
            secondary={
              published
                ? { label: "Compare the plans", href: "#plans" }
                : { label: "Get notified when prices are published", href: PRICING_NOTIFY_MAILTO }
            }
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
