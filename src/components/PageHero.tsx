import type { ReactNode } from "react";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Eyebrow, RichText } from "@/components/ui";
import type { Crumb } from "@/lib/seo";

/**
 * Hero for text-led inner pages (pricing, FAQ, blog). Same navy card and
 * type scale as the homepage hero, with an optional aside panel.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  answer,
  lead,
  actions,
  footnote,
  aside,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  /** Answer-first block, 40-60 words, rendered directly under the H1. */
  answer?: string;
  lead: string[];
  actions?: ReactNode;
  footnote?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
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
            className="pointer-events-none absolute right-[-8%] bottom-[-35%] h-[440px] w-[440px] rounded-full bg-[#ff6b00]/10 blur-[130px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 items-center gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:px-16 lg:py-20">
            <div className={`min-w-0 ${aside ? "lg:col-span-7" : "lg:col-span-10"}`}>
              <Eyebrow tone="onDark">{eyebrow}</Eyebrow>

              <h1 className="mt-7 font-display text-[clamp(31px,4.3vw,66px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
                {title}
              </h1>

              {answer && (
                <div className="mt-7">
                  <AnswerBlock text={answer} />
                </div>
              )}

              <div className="mt-7 flex max-w-[680px] flex-col gap-4">
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

              {children}

              {actions && (
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">{actions}</div>
              )}

              {footnote && (
                <p className="m-0 mt-7 flex items-center gap-2.5 text-[13px] font-medium text-[#ffffff]/60">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]" aria-hidden="true" />
                  {footnote}
                </p>
              )}
            </div>

            {aside && (
              <div className="ih-rise relative min-w-0 lg:col-span-5" style={{ animationDelay: "0.15s" }}>
                {aside}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
