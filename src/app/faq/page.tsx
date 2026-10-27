import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import { ArrowLink, JsonLd, PillButton, RichText } from "@/components/ui";
import { faqGroups, type FaqGroup } from "@/content/faq";
import { getBillingPlans } from "@/lib/billing";
import { hasPublishedPrices } from "@/lib/pricing";
import {
  breadcrumbNode,
  buildMetadata,
  faqEntities,
  webPageNode,
  type Crumb,
} from "@/lib/seo";
import { DEMO_URL, PRICING_NOTIFY_MAILTO } from "@/lib/site";

// The pricing answer is built from the billing API, so render per request
// like /pricing and the homepage.
export const dynamic = "force-dynamic";

const PATH = "/faq";
const TITLE = "IntelliHire FAQ: AI Screening, Interviews and Your Data";
const DESCRIPTION =
  "Answers about IntelliHire: how resume screening and matching work, how AI voice interviews run, who makes decisions, pricing status and candidate data.";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: PATH },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

function Group({ group, index }: { group: FaqGroup; index: number }) {
  return (
    <section
      id={group.id}
      className="relative scroll-mt-24 px-4 py-14 sm:px-5 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="font-display text-[clamp(40px,4vw,64px)] leading-none text-[#071a3d]/10">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-4 font-display text-[clamp(26px,2.6vw,40px)] leading-[1.1] font-normal tracking-[-0.02em] text-[#071a3d]">
              {group.title}
            </h2>
            <p className="m-0 mt-4 max-w-[420px] text-[15px] leading-[1.7] text-[#5b6575] md:text-[16px]">
              <RichText text={group.intro} />
            </p>
          </div>
        </div>
        <div data-reveal className="lg:col-span-8">
          <FaqAccordion items={group.items} openFirst={index === 0} />
        </div>
      </div>
    </section>
  );
}

export default async function FaqPage() {
  const plans = await getBillingPlans();
  const groups = faqGroups(plans);
  const published = hasPublishedPrices(plans);
  const beforeBand = groups.slice(0, 5);
  const afterBand = groups.slice(5);

  const graph = [
    webPageNode({
      type: "FAQPage",
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      dateModified: "2026-10-27",
      aboutSoftware: true,
      extra: {
        mainEntity: faqEntities(groups.flatMap((group) => group.items)),
      },
    }),
    breadcrumbNode(PATH, CRUMBS),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <PageHero
          crumbs={CRUMBS}
          eyebrow="FAQ"
          title="IntelliHire FAQ: Screening, AI Interviews, Pricing, Privacy and Oversight"
          lead={[
            "IntelliHire is AI recruitment software from SuperMIA. AI does the reading, ranking and first-round interviews, and your team makes every hiring decision. Here are straight answers on screening, interviews, pricing and candidate data.",
          ]}
          actions={
            <>
              <PillButton href={DEMO_URL}>Book a demo</PillButton>
              <ArrowLink href="/#how-it-works" tone="light">
                See how it works
              </ArrowLink>
            </>
          }
          aside={
            <nav
              aria-label="FAQ topics"
              className="rounded-[24px] border border-[#ffffff]/12 bg-[#ffffff]/[0.05] p-5 backdrop-blur sm:p-6"
            >
              <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/45">
                Jump to a topic
              </p>
              <ol className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0">
                {groups.map((group, i) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-[#ffffff] transition-colors duration-200 hover:bg-[#ffffff]/[0.08]"
                    >
                      <span className="flex min-w-0 items-baseline gap-3">
                        <span className="font-display text-[12px] text-[#087ef5]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-[15px] font-semibold">{group.title}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-[12px] text-[#ffffff]/45">
                        {group.items.length}
                        <ArrowDown
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          }
        />

        <Reveal>
          <div className="pt-8 md:pt-12">
            {beforeBand.map((group, i) => (
              <Group key={group.id} group={group} index={i} />
            ))}
          </div>

          {/* Full-width band between the oversight and pricing groups. */}
          <section className="relative px-4 py-6 sm:px-5 md:px-10" aria-label="Book a demo">
            <div
              data-reveal
              className="relative mx-auto flex max-w-[1920px] flex-col items-start gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#071a3d] via-[#0b2552] to-[#071a3d] px-6 py-12 sm:rounded-[34px] sm:px-8 md:flex-row md:items-center md:justify-between md:px-14 md:py-14"
            >
              <span
                className="pointer-events-none absolute -top-24 left-1/3 h-[340px] w-[340px] rounded-full bg-[#087ef5]/25 blur-[120px]"
                aria-hidden="true"
              />
              <p className="relative m-0 max-w-[760px] font-display text-[clamp(22px,2.4vw,36px)] leading-[1.25] text-[#ffffff]">
                AI does the reading. Your team makes the call.{" "}
                <span className="text-[#ffffff]/60">See it on a role you are hiring for now.</span>
              </p>
              <PillButton href={DEMO_URL} className="relative shrink-0">
                Book a demo
              </PillButton>
            </div>
          </section>

          {afterBand.map((group, i) => (
            <div key={group.id}>
              <Group group={group} index={beforeBand.length + i} />
              {group.id === "pricing" && !published && (
                <div className="-mt-8 px-4 pb-10 sm:px-5 md:px-10">
                  <div className="mx-auto max-w-[1920px] lg:grid lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-8 lg:col-start-5">
                      <ArrowLink href={PRICING_NOTIFY_MAILTO}>
                        Get notified when prices are published
                      </ArrowLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <CtaBand
            eyebrow="Still have a question?"
            heading="Bring a Real Role to Your Demo"
            body="See how IntelliHire would screen, interview and score a role you are hiring for now, and where your team stays in control."
            secondary={{
              label: "Email us your question",
              href: "mailto:hello@supermia.ai?subject=IntelliHire%20question",
            }}
            footnote={null}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
