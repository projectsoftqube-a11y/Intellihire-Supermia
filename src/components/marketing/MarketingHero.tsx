import Image from "next/image";
import { Check } from "lucide-react";
import AnswerBlock from "@/components/AnswerBlock";
import { formatDate } from "@/content/blog";
import { ArrowLink, Eyebrow, PillButton } from "@/components/ui";
import type { MarketingPage } from "@/content/types";
import { DEMO_URL } from "@/lib/site";

/**
 * Hero for platform, use-case and company pages.
 *
 * Kept deliberately short: eyebrow, H1, the answer-first paragraph (which
 * opens with the page's primary keyword), the calls to action and three
 * proof points, with no product mock-up. The longer lead copy renders below the hero in
 * `MarketingIntro`. The photo fills the right half of the card at full height and
 * fades into the navy on an eased curve; the copy takes the left half, rather than sitting in a framed box.
 */
export default function MarketingHero({
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
        <div className="relative overflow-hidden rounded-[28px] bg-[#071a3d] sm:rounded-[34px]">
          {/* Photo: full width on top for small screens, fading downward; on
              desktop it fills the right of the card and fades leftward. */}
          <div className="relative aspect-[16/10] w-full [mask-image:linear-gradient(to_bottom,black_45%,rgba(0,0,0,0.85)_58%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.25)_82%,transparent_96%)] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2 lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.04)_8%,rgba(0,0,0,0.15)_16%,rgba(0,0,0,0.33)_24%,rgba(0,0,0,0.55)_32%,rgba(0,0,0,0.76)_40%,rgba(0,0,0,0.92)_48%,black_56%)]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-[#071a3d] via-[#071a3d]/45 to-transparent lg:block"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071a3d]/50 to-transparent"
              aria-hidden="true"
            />
          </div>
          <span
            className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-[#087ef5]/20 blur-[140px]"
            aria-hidden="true"
          />

          <div className="relative -mt-16 grid grid-cols-1 gap-10 px-6 pb-12 sm:-mt-24 sm:px-8 sm:pb-14 md:px-12 lg:mt-0 lg:min-h-[620px] lg:grid-cols-12 lg:items-center lg:px-16 lg:py-20 xl:min-h-[660px]">
            <div className="min-w-0 lg:col-span-6">
              <Eyebrow tone="onDark">{eyebrow}</Eyebrow>

              <h1 className="mt-6 font-display text-[clamp(31px,3.9vw,62px)] leading-[1.05] font-normal tracking-[-0.02em] text-[#ffffff]">
                {h1}
              </h1>

              {/* Answer-first block: opens with the primary keyword and is
                  the passage answer engines lift. */}
              <div className="mt-6">
                <AnswerBlock text={answer} plain />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
                <PillButton href={DEMO_URL} tone="light">
                  Book a demo
                </PillButton>
                <ArrowLink href={secondary.href} tone="light">
                  {secondary.label}
                </ArrowLink>
              </div>

              <div className="mt-10 flex max-w-[640px] flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[#ffffff]/10 pt-6">
                <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0">
                  {highlights.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2 text-[14px] font-medium text-[#ffffff]/80">
                      <Check className="h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Freshness signal, visible as well as in schema. */}
                <p className="m-0 text-[12.5px] text-[#ffffff]/45">
                  Updated <time dateTime={page.dateModified}>{formatDate(page.dateModified)}</time>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
