import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Eyebrow } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, DEMO_URL } from "@/lib/site";

// Thank-you state after a Calendly booking: never indexed, never in the
// sitemap. The `demo_booked` event fires in CalendlyEmbed before the redirect.
export const metadata: Metadata = buildMetadata({
  title: "Your IntelliHire Demo Is Booked",
  description:
    "Your IntelliHire demo is booked. Check your email for the calendar invite, and bring a role you are hiring for now so we can walk through it live.",
  path: `${DEMO_URL}/booked`,
  noindex: true,
});

const PREPARE = [
  "A role you are hiring for now, or one you hire for often",
  "Its job description, if you have one written",
  "Roughly how many people apply to it",
  "Anyone on your team who should see how scoring works",
];

const READ = [
  { label: "How AI voice interviews run", href: "/platform/ai-interviews" },
  { label: "Scorecards that cite the transcript", href: "/platform/interview-scorecards" },
  { label: "Where people stay in control", href: "/platform/human-oversight" },
  { label: "Plans and pricing", href: "/pricing" },
];

export default function DemoBookedPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <section className="px-4 pt-24 pb-16 sm:px-5 sm:pt-28 md:px-10 md:pb-24">
          <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-5 py-10 shadow-[0_30px_80px_-60px_rgba(7,26,61,0.5)] sm:rounded-[34px] sm:px-8 md:px-12 md:py-14">
            <span
              className="pointer-events-none absolute -top-48 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#17b26a]/10 blur-[140px]"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#17b26a]/12 text-[#0f8a52]">
                <CalendarCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="mt-6">
                <Eyebrow>Demo booked</Eyebrow>
              </div>
              <h1 className="mt-5 font-display text-[clamp(28px,3.2vw,48px)] leading-[1.08] font-normal tracking-[-0.02em] text-[#071a3d]">
                Your IntelliHire Demo Is Booked
              </h1>
              <p className="m-0 mt-5 max-w-[680px] text-[16px] leading-[1.7] text-[#5b6575]">
                Calendly has emailed your confirmation and calendar invite to the address you
                entered. If you need to change the time, use the link in that email.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-[22px] border border-[#e5eaf0] bg-[#f7fafd] p-6">
                  <h2 className="m-0 text-[13px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/70">
                    Bring to the call
                  </h2>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                    {PREPARE.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#071a3d]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17b26a]/12 text-[#0f8a52]">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <nav aria-label="Read before your demo" className="rounded-[22px] border border-[#e5eaf0] p-6">
                  <h2 className="m-0 text-[13px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/70">
                    Read before your demo
                  </h2>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-1 p-0">
                    {READ.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex items-center justify-between gap-4 rounded-xl py-2 text-[15px] font-semibold text-[#071a3d] transition-colors hover:text-[#087ef5]"
                        >
                          {label}
                          <ArrowRight
                            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <p className="m-0 mt-8 text-[14px] text-[#5b6575]">
                Questions before the call? Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=IntelliHire%20demo`}
                  data-track="contact_email_click"
                  className="font-semibold text-[#087ef5] underline decoration-[#087ef5]/30 underline-offset-4"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
