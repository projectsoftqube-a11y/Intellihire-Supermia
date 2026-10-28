import Image from "next/image";
import { Check } from "lucide-react";
import AnswerBlock from "@/components/AnswerBlock";
import { ArrowLink, Eyebrow, PillButton } from "@/components/ui";
import { formatDate } from "@/content/blog";
import type { MarketingPage } from "@/content/types";
import { DEMO_URL } from "@/lib/site";

/**
 * Hero for use-case pages: a magazine-style cover. The photo runs the full
 * width with the title set on it, and a white answer strip overlaps the
 * cover's lower edge. Platform pages use the navy split hero instead, so the
 * two page families read differently at a glance.
 */
export default function UseCaseHero({
  page,
  secondary,
}: {
  page: MarketingPage;
  secondary: { label: string; href: string };
}) {
  const { eyebrow, h1, answer, heroImage, highlights } = page;

  return (
    <section className="relative bg-brand-surface px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
      <div className="mx-auto max-w-[1920px]">
        <div className="relative isolate flex min-h-[440px] items-end overflow-hidden rounded-[28px] bg-[#071a3d] sm:min-h-[520px] sm:rounded-[34px] lg:min-h-[600px]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[center_35%]"
          />
          <span
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/55 to-[#071a3d]/5"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#071a3d]/75 via-[#071a3d]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="w-full px-6 pt-24 pb-24 sm:px-8 md:px-12 md:pb-28 lg:px-16 lg:pb-32">
            <Eyebrow tone="onDark">{eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[1150px] font-display text-[clamp(32px,4.6vw,76px)] leading-[1.02] font-normal tracking-[-0.025em] text-[#ffffff]">
              {h1}
            </h1>
          </div>
        </div>

        {/* Answer strip: the answer-first paragraph, calls to action and
            proof points, overlapping the cover's lower edge. */}
        <div className="relative z-10 mx-3 -mt-14 rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-6 shadow-[0_40px_90px_-40px_rgba(7,26,61,0.45)] sm:mx-6 sm:p-8 md:-mt-20 lg:mx-12 lg:p-10 xl:mx-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <AnswerBlock text={answer} tone="onLight" plain />
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5 lg:border-l lg:border-[#e5eaf0] lg:pl-12">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <PillButton href={DEMO_URL} tone="dark">
                  Book a demo
                </PillButton>
                <ArrowLink href={secondary.href}>{secondary.label}</ArrowLink>
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14.5px] font-medium text-[#071a3d]">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17b26a]/12 text-[#0f8a52]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Freshness signal, visible as well as in schema. */}
              <p className="m-0 text-[12.5px] text-[#5b6575]">
                Updated <time dateTime={page.dateModified}>{formatDate(page.dateModified)}</time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
