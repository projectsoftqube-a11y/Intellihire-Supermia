import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLink, Eyebrow, PillButton, RichText } from "@/components/ui";
import type { HeroPanelRow, MarketingPage } from "@/content/types";
import type { Crumb } from "@/lib/seo";
import { DEMO_URL } from "@/lib/site";

const TONE: Record<HeroPanelRow["tone"], string> = {
  blue: "bg-[#087ef5]",
  orange: "bg-[#ff6b00]",
  green: "bg-[#17b26a]",
  slate: "bg-[#94a3b8]",
};

const TONE_TEXT: Record<HeroPanelRow["tone"], string> = {
  blue: "text-[#087ef5] bg-[#087ef5]/10",
  orange: "text-[#d45a00] bg-[#ff6b00]/10",
  green: "text-[#0f8a52] bg-[#17b26a]/10",
  slate: "text-[#475569] bg-[#94a3b8]/15",
};

export default function MarketingHero({
  page,
  crumbs,
  secondary,
}: {
  page: MarketingPage;
  crumbs: Crumb[];
  secondary: { label: string; href: string };
}) {
  const { eyebrow, h1, lead, heroImage, heroPanel, highlights } = page;

  return (
    <section className="relative bg-brand-surface px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-5 px-1 md:mb-6">
          <Breadcrumbs crumbs={crumbs} />
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-[#071a3d] sm:rounded-[34px]">
          <span
            className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-[#087ef5]/20 blur-[140px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-[-8%] bottom-[-30%] h-[420px] w-[420px] rounded-full bg-[#ff6b00]/10 blur-[130px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 items-center gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20 xl:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <Eyebrow tone="onDark">{eyebrow}</Eyebrow>

              <h1 className="mt-7 font-display text-[clamp(31px,4.3vw,66px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
                {h1}
              </h1>

              <div className="mt-7 flex max-w-[640px] flex-col gap-4">
                {lead.map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={`m-0 leading-[1.7] ${
                      i === 0
                        ? "text-[clamp(16px,1.3vw,19px)] text-[#ffffff]/80"
                        : "text-[clamp(15px,1.15vw,17px)] text-[#ffffff]/60"
                    }`}
                  >
                    <RichText
                      text={paragraph}
                      linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
                    />
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
                <PillButton href={DEMO_URL} tone="light">
                  Book a demo
                </PillButton>
                <ArrowLink href={secondary.href} tone="light">
                  {secondary.label}
                </ArrowLink>
              </div>

              <ul className="m-0 mt-10 flex list-none flex-wrap gap-2.5 border-t border-[#ffffff]/12 p-0 pt-7">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ffffff]/12 bg-[#ffffff]/[0.05] px-3.5 py-2 text-[13px] leading-tight font-medium text-[#ffffff]/80"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#087ef5]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-w-0 lg:col-span-5">
              <div className="ih-rise relative mx-auto max-w-[560px] lg:max-w-none">
                <div className="relative aspect-[1370/1148] overflow-hidden rounded-[22px] bg-[#0d2754] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-[#ffffff]/10 sm:rounded-[26px] lg:aspect-[6/7] xl:aspect-[1/1]">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071a3d]/70 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Illustrative product panel (demo data). */}
                <div
                  className="ih-rise relative z-10 mx-3 -mt-20 rounded-[20px] border border-[#e5eaf0] bg-[#ffffff]/95 p-4 shadow-[0_30px_70px_-25px_rgba(7,26,61,0.55)] backdrop-blur sm:mx-6 sm:-mt-24 sm:p-5 lg:absolute lg:-bottom-10 lg:-left-10 lg:mx-0 lg:mt-0 lg:w-[78%] xl:-left-14 xl:w-[72%]"
                  style={{ animationDelay: "0.25s" }}
                  aria-hidden="true"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="m-0 min-w-0 text-[12.5px] leading-snug font-semibold text-[#071a3d] sm:text-[13.5px]">
                      {heroPanel.title}
                    </p>
                    <span className="flex shrink-0 gap-1" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-[#e5eaf0]" />
                      <span className="h-2 w-2 rounded-full bg-[#e5eaf0]" />
                      <span className="h-2 w-2 rounded-full bg-[#087ef5]" />
                    </span>
                  </div>
                  <ul className="m-0 mt-3.5 flex list-none flex-col gap-2 p-0">
                    {heroPanel.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex flex-col items-start gap-1.5 rounded-xl bg-[#f2f8fd] px-3 py-2.5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-3"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className={`h-2 w-2 shrink-0 rounded-full ${TONE[row.tone]}`} />
                          <span className="text-[12.5px] leading-snug font-medium text-[#071a3d] min-[420px]:truncate sm:text-[13px]">
                            {row.label}
                          </span>
                        </span>
                        <span
                          className={`ml-[18px] max-w-full rounded-full px-2.5 py-1 text-[11px] leading-snug font-semibold min-[420px]:ml-0 min-[420px]:max-w-[55%] min-[420px]:shrink-0 min-[420px]:truncate sm:text-[11.5px] ${TONE_TEXT[row.tone]}`}
                        >
                          {row.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="m-0 mt-3.5 flex items-center gap-2 border-t border-[#e5eaf0] pt-3 text-[12px] font-semibold text-[#5b6575]">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#ff6b00]" />
                    {heroPanel.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
