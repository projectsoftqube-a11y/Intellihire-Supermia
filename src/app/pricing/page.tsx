import type { Metadata } from "next";
import { Check, FileSearch, Lock, Scale } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
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
  pricingFaqs,
  pricingH1,
  pricingLead,
  pricingMetaDescription,
  pricingMetaTitle,
} from "@/lib/pricing";
import { breadcrumbNode, buildMetadata, webPageNode, type Crumb } from "@/lib/seo";
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
    }),
    breadcrumbNode(PATH, CRUMBS),
    ...[offersNode(plans)].filter((node) => node !== null),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <PageHero
          crumbs={CRUMBS}
          eyebrow="Pricing"
          title={pricingH1(plans)}
          lead={[
            pricingLead(plans),
            "Comparing AI recruitment software pricing? Start with how many roles you hire for at once. Every plan includes resume screening, AI interviews and evidence-backed scorecards. Want to see it work first? Book a demo and bring a role you are hiring for now.",
          ]}
          actions={
            <>
              <PillButton href={DEMO_URL}>Book a demo</PillButton>
              <ArrowLink href="#plans" tone="light">
                Compare the plans
              </ArrowLink>
            </>
          }
          footnote="No candidate is ever rejected by a machine, on any plan."
          aside={
            <div className="rounded-[24px] border border-[#ffffff]/12 bg-[#ffffff]/[0.05] p-5 backdrop-blur sm:p-6">
              <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/45">
                Plans at a glance
              </p>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                {plans.map((plan) => (
                  <li
                    key={plan.id}
                    className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 ${
                      plan.featured
                        ? "bg-[#ffffff] text-[#071a3d] shadow-[0_18px_40px_-18px_rgba(8,126,245,0.8)]"
                        : "bg-[#ffffff]/[0.06] text-[#ffffff]"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          plan.featured ? "bg-[#ff6b00]" : plan.isCustom ? "bg-[#ffffff]/40" : "bg-[#087ef5]"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="truncate text-[15px] font-semibold">{plan.name}</span>
                      {plan.featured && (
                        <span className="hidden rounded-full bg-[#ff6b00]/12 px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-[#d45a00] min-[380px]:inline">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-1.5">
                      <span className="font-display text-[20px] leading-none">{plan.price}</span>
                      {plan.cadence && (
                        <span className={`text-[12px] ${plan.featured ? "text-[#5b6575]" : "text-[#ffffff]/50"}`}>
                          {plan.cadence}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-5 flex items-start gap-2.5 border-t border-[#ffffff]/10 pt-4 text-[13px] leading-[1.6] text-[#ffffff]/60">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                Every plan includes resume screening, AI interviews and evidence-backed scorecards.
              </p>
            </div>
          }
        />

        <Reveal>
          <section id="plans" className="relative scroll-mt-24 px-4 pt-20 sm:px-5 md:px-10 md:pt-28">
            <div className="mx-auto max-w-[1920px]">
              <div data-reveal className="max-w-[760px]">
                <Eyebrow>Plans</Eyebrow>
                <h2 className="mt-7 font-display text-[clamp(30px,3.6vw,56px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
                  Plans
                </h2>
                <p className="m-0 mt-5 max-w-[620px] text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-[#5b6575]">
                  {plansIntro(plans)}
                </p>
              </div>
              <PlanCards plans={plans} headingLevel="h3" />
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
                              <span className="mt-1.5 inline-block rounded-full bg-[#ff6b00] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-[#ffffff]">
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
                      className="flex items-start gap-5 rounded-[20px] border border-[#ffffff]/10 bg-[#ffffff]/[0.04] p-6"
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
