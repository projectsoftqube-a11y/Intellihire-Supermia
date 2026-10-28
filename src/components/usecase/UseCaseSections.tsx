import Image from "next/image";
import { Check } from "lucide-react";
import { Eyebrow, RichText } from "@/components/ui";
import type { PageSection } from "@/content/types";
import {
  Body,
  Contrast,
  Heading,
  Note,
  WideHead,
  darkLink,
  index,
  inner,
  pad,
  wrap,
} from "@/components/marketing/MarketingSections";

/*
 * Body sections for use-case pages. Platform pages describe a feature; these
 * tell an audience's story (problem, approach, a hiring round, outcome), so
 * each layout has its own shape:
 *
 *   cards      stacking challenge cards beside a sticky head and photo
 *   split      sticky brief card beside a timeline that draws on scroll
 *   steps      horizontal journey, pinned and scrubbed on wide screens
 *   checklist  light outcome cards with green checks
 *   contrast   shared with platform pages
 *
 * Everything is complete as server HTML; `SectionMotion` adds the motion.
 */

/* Challenges: stacking cards ------------------------------------------------ */

function Challenges({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={`${inner} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <div data-reveal className="lg:sticky lg:top-28">
            <Heading section={section} />
            <Body section={section} className="mt-6" />
            {section.image && (
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[24px] bg-[#071a3d]">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071a3d]/45 to-transparent"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>

        <ol data-fx-stack className="m-0 flex list-none flex-col gap-6 p-0 lg:col-span-7">
          {items.map((item, i) => (
            <li
              data-fx-stack-card
              key={item.title}
              // Each card sticks a little lower than the one before, so they
              // pile up as the reader scrolls.
              style={{ top: `${112 + i * 22}px` }}
              className="relative isolate overflow-hidden rounded-[26px] border border-[#e5eaf0] bg-[#ffffff] p-7 shadow-[0_30px_60px_-40px_rgba(7,26,61,0.5)] md:p-10 lg:sticky lg:min-h-[280px]"
            >
              {/* Solid tint laid over a card once the next one covers it, so
                  cards dim without turning see-through. */}
              <span
                data-fx-stack-shade
                className="pointer-events-none absolute inset-0 z-10 bg-[#e9eef5] opacity-0"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#ff6b00]">
                  <span className="h-px w-6 bg-[#ff6b00]" aria-hidden="true" />
                  Challenge {index(i)}
                </span>
                <span className="font-display text-[clamp(40px,3.6vw,64px)] leading-none text-[#071a3d]/10" aria-hidden="true">
                  {index(i)}
                </span>
              </div>
              <h3 className="m-0 mt-6 font-display text-[clamp(22px,2vw,32px)] leading-[1.15] font-normal text-[#071a3d]">
                {item.title}
              </h3>
              <p className="m-0 mt-4 max-w-[640px] text-[16px] leading-[1.75] text-[#5b6575]">
                <RichText text={item.text} />
              </p>
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

/* Approach: brief card and timeline ------------------------------------------------ */

function Approach({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  if (items.length === 0) {
    return (
      <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
        <div className={inner}>
          <WideHead section={section} />
          <Note text={section.note} />
        </div>
      </section>
    );
  }

  const [lead, ...rest] = section.body;
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={`${inner} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        {/* Brief card: heading and copy, sticky on the right on wide
            screens so the page alternates sides with the challenges above. */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] p-7 shadow-[0_30px_70px_-50px_rgba(7,26,61,0.5)] md:p-10 lg:sticky lg:top-28"
          >
            <span
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087ef5] to-[#ff6b00]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -top-28 -right-24 h-[260px] w-[260px] rounded-full bg-[#087ef5]/10 blur-[90px]"
              aria-hidden="true"
            />
            <div className="relative">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(26px,2.5vw,42px)] leading-[1.08] font-normal tracking-[-0.02em] text-[#071a3d]">
                {section.heading}
              </h2>
              {lead && (
                <p className="m-0 mt-6 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-[#071a3d]/85">
                  <RichText text={lead} />
                </p>
              )}
              {rest.length > 0 && (
                <div className="mt-6 flex flex-col gap-4 border-t border-[#e5eaf0] pt-6">
                  {rest.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="m-0 text-[15px] leading-[1.75] text-[#5b6575]">
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline: the line draws with scroll and each node fills as it
            arrives. */}
        <ol
          data-fx-steps
          className="relative m-0 list-none p-0 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-4"
        >
          <span
            className="absolute top-6 bottom-6 left-[19px] w-[2px] sm:left-[23px] rounded-full bg-[#e5eaf0]"
            aria-hidden="true"
          >
            <span
              data-fx-line-y
              className="fx-line-y absolute inset-0 rounded-full bg-gradient-to-b from-[#087ef5] to-[#ff6b00]"
            />
          </span>
          {items.map((item, i) => (
            <li
              data-reveal
              key={item.title}
              className="relative grid grid-cols-[40px_1fr] gap-x-3 pb-5 last:pb-0 sm:grid-cols-[48px_1fr] sm:gap-x-5 md:gap-x-7 md:pb-6"
            >
              <span
                data-fx-node
                className="fx-node relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-[#087ef5]/30 bg-[#ffffff] font-display text-[14px] sm:h-12 sm:w-12 sm:text-[15px] text-[#087ef5] shadow-[0_0_0_6px_#f2f8fd]"
              >
                {index(i)}
              </span>
              <div className="group rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-5 shadow-[0_24px_50px_-40px_rgba(7,26,61,0.45)] sm:p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#087ef5]/35 hover:shadow-[0_30px_60px_-36px_rgba(8,126,245,0.45)] md:p-7">
                <h3 className="m-0 text-[clamp(18px,1.45vw,22px)] leading-snug font-semibold text-[#071a3d] transition-colors group-hover:text-[#087ef5]">
                  {item.title}
                </h3>
                <p className="m-0 mt-2.5 text-[15.5px] leading-[1.75] text-[#5b6575]">
                  <RichText text={item.text} />
                </p>
              </div>
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

/* Journey: horizontal, pinned ----------------------------------------------- */

function Journey({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-8 md:py-12`}>
      <div
        data-fx-hscroll
        className={`${inner} relative overflow-hidden rounded-[28px] bg-[#071a3d] py-12 sm:rounded-[34px] md:py-14`}
      >
        <span
          className="pointer-events-none absolute -top-32 -left-24 h-[440px] w-[440px] rounded-full bg-[#087ef5]/20 blur-[130px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-24 -bottom-40 h-[380px] w-[380px] rounded-full bg-[#ff6b00]/10 blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative px-6 sm:px-8 md:px-14">
          <WideHead section={section} dark />
          <div className="mt-10 hidden items-center gap-4 lg:flex" aria-hidden="true">
            <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/40">
              Scroll to follow the round
            </span>
            <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[#ffffff]/10">
              <span
                data-fx-hprogress
                className="fx-line-x absolute inset-0 rounded-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00]"
              />
            </span>
            <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/40">
              {items.length} steps
            </span>
          </div>
        </div>

        {/* Without JavaScript this row scrolls sideways natively; with it,
            vertical scrolling drives the row while the panel is pinned. */}
        <div data-fx-hviewport className="relative mt-8 lg:overflow-x-auto">
          {/* The track's own side padding is the only space after the last
              card, so the scroll ends with it flush to the panel edge. */}
          <ol
            data-fx-track
            className="m-0 flex list-none flex-col gap-4 p-0 px-6 sm:px-8 md:px-14 lg:w-max lg:flex-row lg:gap-5"
          >
            {items.map((item, i) => (
              <li
                key={item.title}
                className="relative flex flex-col rounded-[24px] border border-[#ffffff]/10 bg-[#ffffff]/[0.04] p-7 md:p-8 lg:min-h-[300px] lg:w-[400px] xl:w-[440px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#087ef5]">
                    Step {i + 1}
                  </span>
                  <span className="font-display text-[clamp(52px,4.6vw,84px)] leading-none text-[#ffffff]/[0.07]" aria-hidden="true">
                    {index(i)}
                  </span>
                </div>
                <h3 className="m-0 mt-auto pt-8 text-[clamp(19px,1.5vw,23px)] leading-snug font-semibold text-[#ffffff]">
                  {item.title}
                </h3>
                <p className="m-0 mt-3 text-[15px] leading-[1.7] text-[#ffffff]/60">
                  <RichText text={item.text} linkClassName={darkLink} />
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative px-6 sm:px-8 md:px-14">
          <Note text={section.note} dark />
        </div>
      </div>
    </section>
  );
}

/* Outcomes: light cards ----------------------------------------------------- */

function Outcomes({ section }: { section: PageSection }) {
  const items = section.items ?? [];
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 ${pad}`}>
      <div className={`${inner} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <div data-reveal className="lg:sticky lg:top-28">
            <Heading section={section} />
            <Body section={section} className="mt-6" />
          </div>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:gap-5 lg:col-span-8">
          {items.map((item, i) => (
            <li
              data-reveal
              data-fx-spot
              key={item.title}
              className={`fx-spot relative overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-7 md:p-8 ${
                i === items.length - 1 && items.length % 2 === 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#17b26a] via-[#087ef5] to-[#ff6b00]"
                aria-hidden="true"
              />
              <span
                data-fx-pop
                className="grid h-12 w-12 place-items-center rounded-2xl bg-[#17b26a]/12 text-[#0f8a52]"
              >
                <Check className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="m-0 mt-6 text-[clamp(17px,1.35vw,20px)] leading-snug font-semibold text-[#071a3d]">
                {item.title}
              </h3>
              <p className="m-0 mt-2.5 text-[15px] leading-[1.7] text-[#5b6575]">
                <RichText text={item.text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={inner}>
        <Note text={section.note} />
      </div>
    </section>
  );
}

export default function UseCaseSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.layout) {
          case "cards":
            return <Challenges key={section.id} section={section} />;
          case "steps":
            return <Journey key={section.id} section={section} />;
          case "checklist":
            return <Outcomes key={section.id} section={section} />;
          case "contrast":
            return <Contrast key={section.id} section={section} />;
          case "split":
          default:
            return <Approach key={section.id} section={section} />;
        }
      })}
    </>
  );
}
