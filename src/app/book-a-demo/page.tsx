import type { Metadata } from "next";
import { Briefcase, Check, Clock, Mail, Video } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnswerBlock from "@/components/AnswerBlock";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { Eyebrow, JsonLd } from "@/components/ui";
import { breadcrumbNode, buildMetadata, webPageNode, type Crumb } from "@/lib/seo";
import { CONTACT_EMAIL, DEMO_URL } from "@/lib/site";

const PATH = DEMO_URL;
const TITLE = "Book an IntelliHire Demo: See AI Recruiting on Your Role";
const DESCRIPTION =
  "Pick a time for a 30-minute IntelliHire demo. Bring a live role and see AI resume screening, first-round voice interviews and evidence-backed scorecards.";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Book a demo", path: PATH },
];

/** SuperMIA's demo event, the same one supermia.ai/schedule-demo books into. */
const CALENDLY_URL = "https://calendly.com/hello-supermia/30min?hide_event_type_details=1&primary_color=087ef5";

const ANSWER =
  "Book a 30-minute IntelliHire demo by picking a time in the scheduler on this page. Bring a role you are hiring for now, and we will show how IntelliHire would screen its applicants, run first-round AI voice interviews and write scorecards that cite the transcript, and where your team makes every decision.";

const MEETING = [
  { icon: Clock, label: "30 minutes" },
  { icon: Video, label: "Online video call" },
  { icon: Briefcase, label: "Bring a live role" },
];

const COVERED = [
  "Every application for your role read and ranked against your rubric",
  "A first-round AI voice interview and the transcript it produces",
  "A scorecard whose ratings cite that transcript",
  "Where your team reviews the evidence and makes every decision",
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function BookDemoPage() {
  const graph = [
    webPageNode({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      dateModified: "2026-10-28",
      aboutSoftware: true,
    }),
    breadcrumbNode(PATH, CRUMBS),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <section className="relative px-4 pt-24 pb-16 sm:px-5 sm:pt-28 md:px-10 md:pb-24">
          <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-5 py-10 shadow-[0_30px_80px_-60px_rgba(7,26,61,0.5)] sm:rounded-[34px] sm:px-8 md:px-12 md:py-14 xl:px-16">
            <span
              className="pointer-events-none absolute -top-56 -left-40 h-[520px] w-[760px] rounded-full bg-[#087ef5]/10 blur-[140px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -right-24 -bottom-40 h-[360px] w-[360px] rounded-full bg-[#ff6b00]/[0.07] blur-[120px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(#e5eaf0_1px,transparent_1px),linear-gradient(90deg,#e5eaf0_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_15%_0%,black,transparent_60%)]"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Pitch */}
              <div className="lg:sticky lg:top-28 lg:col-span-5">
                <Eyebrow>Book a demo</Eyebrow>
                <h1 className="mt-5 font-display text-[clamp(30px,3.4vw,54px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#071a3d]">
                  Book an IntelliHire Demo
                </h1>
                <div className="mt-5 [&>p]:text-[16px]">
                  <AnswerBlock text={ANSWER} tone="onLight" plain />
                </div>

                <ul className="m-0 mt-7 flex list-none flex-wrap gap-2.5 p-0">
                  {MEETING.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-[#e5eaf0] bg-[#ffffff] px-4 text-[13px] font-semibold text-[#071a3d]"
                    >
                      <Icon className="h-4 w-4 text-[#087ef5]" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[22px] border border-[#e5eaf0] bg-[#f7fafd] p-6">
                  <h2 className="m-0 text-[13px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/70">
                    What you will see
                  </h2>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                    {COVERED.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#071a3d]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17b26a]/12 text-[#0f8a52]">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="m-0 mt-6 flex items-center gap-2.5 text-[14px] text-[#5b6575]">
                  <Mail className="h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                  <span>
                    Prefer email?{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=IntelliHire%20demo`}
                      data-track="contact_email_click"
                      className="font-semibold text-[#087ef5] underline decoration-[#087ef5]/30 underline-offset-4 hover:decoration-[#087ef5]"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </span>
                </p>
              </div>

              {/* Scheduler */}
              <div className="min-w-0 lg:col-span-7">
                <div className="overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_24px_60px_-36px_rgba(7,26,61,0.35)]">
                  <CalendlyEmbed
                    url={CALENDLY_URL}
                    redirectTo="/book-a-demo/booked"
                    className="h-[820px] sm:h-[760px] lg:h-[700px]"
                  />
                </div>
                <noscript>
                  <p className="m-0 mt-4 text-[14px] text-[#5b6575]">
                    The scheduler needs JavaScript.{" "}
                    <a href={CALENDLY_URL} className="font-semibold text-[#087ef5]">
                      Open it on Calendly
                    </a>
                    .
                  </p>
                </noscript>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
