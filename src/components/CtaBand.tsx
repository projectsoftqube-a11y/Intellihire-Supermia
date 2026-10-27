import { ArrowLink, Eyebrow, PillButton, RichText } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

/**
 * Closing call to action for inner pages, in the homepage's dark style.
 * Its heading is an H2 so it sits correctly in each page's outline.
 */
export default function CtaBand({
  heading,
  body,
  secondary,
  eyebrow = "See it on a live role",
  footnote = "No candidate is ever rejected by a machine.",
}: {
  heading: string;
  body: string;
  secondary?: { label: string; href: string };
  eyebrow?: string;
  footnote?: string | null;
}) {
  return (
    <section className="relative px-4 pt-12 pb-20 sm:px-5 md:px-10 md:pt-16 md:pb-28">
      <div
        data-reveal
        className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-14 sm:rounded-[34px] sm:px-8 md:px-14 md:py-20"
      >
        <span
          className="pointer-events-none absolute top-[-30%] left-[10%] h-[520px] w-[520px] rounded-full bg-[#087ef5]/20 blur-[150px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute right-[4%] bottom-[-40%] h-[420px] w-[420px] rounded-full bg-[#ff6b00]/12 blur-[140px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-0 left-6 h-px w-[calc(100%-3rem)] bg-gradient-to-r from-[#087ef5] via-[#ffffff]/20 to-transparent sm:left-8 md:left-14 md:w-[calc(100%-7rem)]"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow tone="onDark">{eyebrow}</Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(30px,4.2vw,64px)] leading-[1.02] font-normal tracking-[-0.025em] text-[#ffffff]">
              {heading}
            </h2>
            <p className="m-0 mt-6 max-w-[620px] text-[clamp(15px,1.25vw,19px)] leading-[1.7] text-[#ffffff]/75">
              <RichText
                text={body}
                linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
              />
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-5 lg:justify-end">
              <PillButton href={DEMO_URL} tone="light" size="lg">
                Book a demo
              </PillButton>
              {secondary && (
                <ArrowLink href={secondary.href} tone="light">
                  {secondary.label}
                </ArrowLink>
              )}
            </div>
            {footnote && (
              <p className="m-0 flex items-center gap-2.5 text-[13px] font-medium text-[#ffffff]/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" aria-hidden="true" />
                {footnote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
