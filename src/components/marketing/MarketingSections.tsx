import Image from "next/image";
import { ArrowRight, Check, Sparkles, UserCheck } from "lucide-react";
import { Eyebrow, RichText } from "@/components/ui";
import type { ListItem, PageSection } from "@/content/types";

/*
 * Body sections for platform, use-case and company pages.
 *
 * Each layout has its own grid, and every one is complete as server HTML:
 * motion is layered on by `SectionMotion` through `data-fx-*` attributes and
 * the `fx-*` classes in globals.css.
 *
 *   split      editorial index: outlined numbers, hairline rows, sticky head
 *   cards      bento grid: heading cell, photo feature card, smaller cards
 *   steps      process rail, horizontal on wide screens
 *   checklist  hairline "ledger" grid on navy
 *   contrast   two-column table with an arrow spine
 */

export const wrap = "relative px-4 sm:px-5 md:px-10";
export const inner = "mx-auto max-w-[1920px]";
export const pad = "py-14 md:py-20";
export const darkLink =
  "font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]";

export const index = (i: number) => String(i + 1).padStart(2, "0");

export function Body({ section, dark = false, className = "" }: { section: PageSection; dark?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {section.body.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className={`m-0 max-w-[760px] text-[clamp(15px,1.15vw,18px)] leading-[1.75] ${
            dark ? "text-[#ffffff]/65" : "text-[#5b6575]"
          }`}
        >
          <RichText text={paragraph} linkClassName={dark ? darkLink : undefined} />
        </p>
      ))}
    </div>
  );
}

export function Heading({ section, dark = false }: { section: PageSection; dark?: boolean }) {
  return (
    <>
      <Eyebrow tone={dark ? "onDark" : "onLight"}>{section.eyebrow}</Eyebrow>
      <h2
        className={`mt-6 font-display text-[clamp(28px,3.2vw,50px)] leading-[1.06] font-normal tracking-[-0.02em] ${
          dark ? "text-[#ffffff]" : "text-[#071a3d]"
        }`}
      >
        {section.heading}
      </h2>
    </>
  );
}

/**
 * Heading left, body right, both aligned to the top and joined by a hairline
 * divider, so the pair reads as one block rather than two loose columns.
 */
export function WideHead({ section, dark = false }: { section: PageSection; dark?: boolean }) {
  return (
    <div data-reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
      <div className="lg:col-span-5">
        <Heading section={section} dark={dark} />
      </div>
      <Body
        section={section}
        dark={dark}
        className={`lg:col-span-7 lg:border-l lg:pt-1 lg:pl-12 ${dark ? "lg:border-[#ffffff]/12" : "lg:border-[#e5eaf0]"}`}
      />
    </div>
  );
}

export function Note({ text, dark }: { text?: string; dark?: boolean }) {
  if (!text) return null;
  return (
    <p
      data-reveal
      className={`m-0 mt-8 flex max-w-[760px] items-start gap-3 text-[14px] leading-[1.65] ${
        dark ? "text-[#ffffff]/55" : "text-[#5b6575]"
      }`}
    >
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]" aria-hidden="true" />
      <span>
        <RichText text={text} linkClassName={dark ? darkLink : undefined} />
      </span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Split: editorial index                                                      */
/* -------------------------------------------------------------------------- */

function Split({ section }: { section: PageSection }) {
  const items = section.items ?? [];

  if (items.length === 0) {
    return (
      <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
        <div className={inner}>
          <div data-reveal className="max-w-[860px]">
            <Heading section={section} />
            <Body section={section} className="mt-6" />
          </div>
          <Note text={section.note} />
        </div>
      </section>
    );
  }

  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={`${inner} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <div data-reveal className="lg:sticky lg:top-28">
            <Heading section={section} />
            <Body section={section} className="mt-6" />
            <div className="mt-10 hidden items-center gap-4 lg:flex" aria-hidden="true">
              <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/40">
                {items.length} points
              </span>
              <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[#e5eaf0]">
                <span
                  data-fx-rail
                  className="fx-line-x absolute inset-0 rounded-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00]"
                />
              </span>
            </div>
          </div>
        </div>

        <ol className="m-0 list-none border-t border-[#e5eaf0] p-0 lg:col-span-7">
          {items.map((item, i) => (
            <li
              data-reveal
              data-fx-row
              key={item.title}
              className="fx-row group relative grid grid-cols-[auto_1fr] gap-x-6 border-b border-[#e5eaf0] py-8 sm:gap-x-10 md:py-10"
            >
              <span className="fx-num font-display text-[clamp(44px,4.2vw,76px)] leading-[0.85]" aria-hidden="true">
                {index(i)}
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="m-0 text-[clamp(19px,1.6vw,24px)] leading-snug font-semibold text-[#071a3d]">
                  {item.title}
                </h3>
                <p className="m-0 mt-3 max-w-[640px] text-[15.5px] leading-[1.75] text-[#5b6575]">
                  <RichText text={item.text} />
                </p>
              </div>
              <span
                className="fx-row-bar absolute -bottom-px left-0 h-[2px] w-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00]"
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
      </div>
      <div className={inner}>
        <Note text={section.note} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cards: bento grid                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Placement in the 12-column bento: the heading takes the top-left, the
 * feature card the whole right half (two rows), the next two cards sit under
 * the heading, and any further cards fill full-width rows below.
 */
function bentoCell(i: number, count: number) {
  if (i === 0) return "sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1";
  const rest = count - 1;
  const lastOdd = i === count - 1 && rest % 2 === 1 ? "sm:col-span-2" : "";
  if (i <= 2) return `lg:col-span-3 ${lastOdd}`;
  const extra = count - 3;
  return `${lastOdd} ${extra % 2 === 1 && i === count - 1 ? "lg:col-span-12" : "lg:col-span-6"}`;
}

function FeatureCard({ item, i, image }: { item: ListItem; i: number; image?: PageSection["image"] }) {
  return (
    <>
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Overlay: dark at the foot for the text, lighter at the top so
              the photo still reads. */}
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/75 to-[#071a3d]/15"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <span
            data-fx-parallax
            className="pointer-events-none absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full bg-[#087ef5]/30 blur-[110px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-6 -bottom-8 font-display text-[clamp(120px,13vw,220px)] leading-none text-[#ffffff]/[0.05] select-none"
            aria-hidden="true"
          >
            {index(i)}
          </span>
        </>
      )}
      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-[#ffffff]/20 bg-[#071a3d]/50 px-3 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-[#ffffff] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" aria-hidden="true" />
        {index(i)}
      </span>
      <div className="relative mt-auto pt-24">
        <h3 className="m-0 max-w-[560px] font-display text-[clamp(24px,2.2vw,36px)] leading-[1.15] font-normal text-[#ffffff]">
          {item.title}
        </h3>
        <p className="m-0 mt-4 max-w-[560px] text-[15.5px] leading-[1.75] text-[#ffffff]/75">
          <RichText text={item.text} linkClassName={darkLink} />
        </p>
      </div>
    </>
  );
}

function LightCard({ item, i }: { item: ListItem; i: number }) {
  return (
    <>
      <span className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#087ef5]/10 font-display text-[14px] text-[#087ef5] transition-colors duration-300 group-hover:bg-[#087ef5] group-hover:text-[#ffffff]">
          {index(i)}
        </span>
        <ArrowRight
          className="h-5 w-5 -translate-x-2 text-[#087ef5] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </span>
      <h3 className="m-0 mt-auto pt-8 text-[clamp(18px,1.4vw,21px)] leading-snug font-semibold text-[#071a3d]">
        {item.title}
      </h3>
      <p className="m-0 mt-3 max-w-[560px] text-[15px] leading-[1.7] text-[#5b6575]">
        <RichText text={item.text} />
      </p>
    </>
  );
}

function Cards({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={inner}>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:gap-5 lg:grid-cols-12">
          {/* The heading is a cell of the grid, so there is no separate
              header row and no empty band above the cards. */}
          <li
            data-reveal
            className="flex flex-col justify-center py-2 sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pr-10 lg:pb-6"
          >
            <Heading section={section} />
            <Body section={section} className="mt-6" />
          </li>
          {items.map((item, i) => {
            const feature = i === 0;
            return (
              <li
                data-reveal
                data-fx-spot
                key={item.title}
                className={`fx-spot group relative flex flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-300 hover:-translate-y-1 md:p-9 ${
                  feature
                    ? "fx-spot-dark min-h-[420px] bg-[#071a3d] shadow-[0_30px_70px_-35px_rgba(7,26,61,0.7)] lg:min-h-[560px]"
                    : "min-h-[240px] border border-[#e5eaf0] bg-[#ffffff] hover:border-[#087ef5]/40 hover:shadow-[0_24px_55px_-28px_rgba(7,26,61,0.35)]"
                } ${bentoCell(i, items.length)}`}
              >
                {feature ? (
                  <FeatureCard item={item} i={i} image={section.image} />
                ) : (
                  <LightCard item={item} i={i} />
                )}
              </li>
            );
          })}
        </ul>
        <Note text={section.note} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Steps: process rail                                                         */
/* -------------------------------------------------------------------------- */

const STEP_COLS: Record<number, string> = {
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};

function Steps({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-8 md:py-12`}>
      <div className={`${inner} relative overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-6 py-12 sm:rounded-[34px] sm:px-8 md:px-14 md:py-16`}>
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(#e5eaf0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <WideHead section={section} />

          <ol
            data-fx-steps
            className={`relative m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 md:mt-14 xl:gap-6 ${STEP_COLS[items.length] ?? "xl:grid-cols-4"}`}
          >
            {/* Vertical rail below xl, horizontal rail from xl up. */}
            <span className="absolute top-6 bottom-6 left-[23px] w-[2px] rounded-full bg-[#e5eaf0] xl:hidden" aria-hidden="true">
              <span data-fx-line-y className="fx-line-y absolute inset-0 rounded-full bg-gradient-to-b from-[#087ef5] to-[#ff6b00]" />
            </span>
            <span className="absolute top-[23px] right-6 left-6 hidden h-[2px] rounded-full bg-[#e5eaf0] xl:block" aria-hidden="true">
              <span data-fx-line-x className="fx-line-x absolute inset-0 rounded-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00]" />
            </span>

            {items.map((item, i) => (
              <li data-reveal key={item.title} className="relative flex gap-5 sm:gap-7 xl:block">
                <span
                  data-fx-node
                  className="fx-node relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#087ef5]/30 bg-[#ffffff] font-display text-[16px] text-[#087ef5] shadow-[0_0_0_6px_#ffffff]"
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-2.5 xl:mt-7 xl:pt-0 xl:pr-4">
                  <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/40">
                    Step {i + 1}
                  </p>
                  <h3 className="m-0 mt-2 text-[clamp(17px,1.35vw,20px)] leading-snug font-semibold text-[#071a3d]">
                    {item.title}
                  </h3>
                  <p className="m-0 mt-2.5 max-w-[560px] text-[15px] leading-[1.7] text-[#5b6575]">
                    <RichText text={item.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Note text={section.note} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Checklist: ledger grid on navy                                              */
/* -------------------------------------------------------------------------- */

/** Column count and spans so the ledger never leaves an empty cell. */
function ledger(count: number) {
  if (count === 3) return { grid: "sm:grid-cols-2 lg:grid-cols-3", cell: (i: number) => (i === 2 ? "sm:col-span-2 lg:col-span-1" : "") };
  if (count === 4) return { grid: "sm:grid-cols-2 xl:grid-cols-4", cell: () => "" };
  if (count === 5) return { grid: "sm:grid-cols-2 lg:grid-cols-3", cell: (i: number) => (i === 4 ? "sm:col-span-2" : "") };
  return { grid: "sm:grid-cols-2 lg:grid-cols-3", cell: () => "" };
}

function Checklist({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  const layout = ledger(items.length);
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-8 md:py-12`}>
      <div className={`${inner} relative overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-12 sm:rounded-[34px] sm:px-8 md:px-14 md:py-16`}>
        <span
          data-fx-parallax
          className="pointer-events-none absolute -top-32 right-[-8%] h-[460px] w-[460px] rounded-full bg-[#087ef5]/20 blur-[130px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-40 left-[-6%] h-[380px] w-[380px] rounded-full bg-[#ff6b00]/10 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative">
          <WideHead section={section} dark />

          <ul
            className={`m-0 mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-[#ffffff]/10 bg-[#ffffff]/10 p-0 md:mt-12 ${layout.grid}`}
          >
            {items.map((item, i) => (
              <li
                data-reveal
                data-fx-spot
                key={item.title}
                className={`fx-spot fx-spot-dark group relative bg-[#071a3d] p-7 transition-colors duration-300 hover:bg-[#0b2552] md:p-8 ${layout.cell(i)}`}
              >
                <span className="flex items-start justify-between gap-4">
                  <span
                    data-fx-pop
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#087ef5] text-[#ffffff] shadow-[0_10px_24px_-8px_rgba(8,126,245,0.8)]"
                  >
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-[13px] text-[#ffffff]/30" aria-hidden="true">
                    {index(i)}
                  </span>
                </span>
                <h3 className="m-0 mt-6 text-[17px] leading-snug font-semibold text-[#ffffff]">{item.title}</h3>
                <p className="m-0 mt-2.5 text-[14.5px] leading-[1.7] text-[#ffffff]/60">
                  <RichText text={item.text} linkClassName={darkLink} />
                </p>
              </li>
            ))}
          </ul>
          <Note text={section.note} dark />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contrast: table with an arrow spine                                         */
/* -------------------------------------------------------------------------- */

export function Contrast({ section }: { section: PageSection }) {
  const contrast = section.contrast;
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={inner}>
        <WideHead section={section} />
        {contrast && (
          <div
            data-reveal
            className="mt-10 overflow-hidden rounded-[26px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_30px_70px_-45px_rgba(7,26,61,0.45)] md:mt-12"
          >
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">{section.heading}</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b-2 border-[#087ef5] bg-[#ffffff] px-4 py-5 sm:px-8 sm:py-6"
                  >
                    <span className="flex items-center gap-3">
                      <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-[#087ef5]/10 text-[#087ef5] sm:grid">
                        <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="font-display text-[15px] leading-tight font-normal text-[#071a3d] sm:text-[clamp(17px,1.4vw,21px)]">
                        {contrast.leftLabel}
                      </span>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-l border-[#e5eaf0] border-b-[#ff6b00] bg-[#ff6b00]/[0.04] px-4 py-5 pl-8 sm:px-8 sm:py-6 sm:pl-12"
                  >
                    <span className="flex items-center gap-3">
                      <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ff6b00]/12 text-[#ff6b00] sm:grid">
                        <UserCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="font-display text-[15px] leading-tight font-normal text-[#071a3d] sm:text-[clamp(17px,1.4vw,21px)]">
                        {contrast.rightLabel}
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contrast.rows.map((row, i) => (
                  <tr key={row.left} className="group border-t border-[#e5eaf0] first:border-t-0">
                    <td className="px-4 py-6 align-middle text-[14px] leading-[1.55] text-[#5b6575] transition-colors duration-200 group-hover:bg-[#f2f8fd] sm:px-8 sm:py-7 sm:text-[16px]">
                      <span data-fx-from="left" className="flex items-start gap-3">
                        <span className="hidden font-display text-[13px] text-[#071a3d]/30 sm:inline" aria-hidden="true">
                          {index(i)}
                        </span>
                        {row.left}
                      </span>
                    </td>
                    <td className="relative border-l border-[#e5eaf0] bg-[#fbfcfe] px-4 py-6 pl-8 align-middle text-[14px] leading-[1.55] font-semibold text-[#071a3d] transition-colors duration-200 group-hover:bg-[#f2f8fd] sm:px-8 sm:py-7 sm:pl-12 sm:text-[16px]">
                      <span
                        className="absolute top-1/2 left-0 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#071a3d] text-[#ffffff] shadow-[0_0_0_4px_#ffffff] transition-colors duration-300 group-hover:bg-[#ff6b00] sm:h-8 sm:w-8"
                        aria-hidden="true"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <span data-fx-from="right" className="block">
                        {row.right}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {section.items && section.items.length > 0 && (
          <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5">
            {section.items.map((item, i) => (
              <li
                data-reveal
                data-fx-spot
                key={item.title}
                className="fx-spot relative rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6 md:p-7"
              >
                <span className="font-display text-[13px] text-[#087ef5]">{index(i)}</span>
                <h3 className="m-0 mt-3 text-[17px] leading-snug font-semibold text-[#071a3d]">{item.title}</h3>
                <p className="m-0 mt-2 text-[15px] leading-[1.7] text-[#5b6575]">
                  <RichText text={item.text} />
                </p>
              </li>
            ))}
          </ul>
        )}
        <Note text={section.note} />
      </div>
    </section>
  );
}

export default function MarketingSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.layout) {
          case "cards":
            return <Cards key={section.id} section={section} />;
          case "steps":
            return <Steps key={section.id} section={section} />;
          case "checklist":
            return <Checklist key={section.id} section={section} />;
          case "contrast":
            return <Contrast key={section.id} section={section} />;
          case "split":
          default:
            return <Split key={section.id} section={section} />;
        }
      })}
    </>
  );
}
