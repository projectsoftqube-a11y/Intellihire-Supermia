import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, RichText } from "@/components/ui";
import type { PageSection } from "@/content/types";

const wrap = "relative px-4 sm:px-5 md:px-10";
const inner = "mx-auto max-w-[1920px]";

function SectionHead({
  section,
  tone = "onLight",
  className = "",
}: {
  section: PageSection;
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const dark = tone === "onDark";
  return (
    <div data-reveal className={className}>
      <Eyebrow tone={tone}>{section.eyebrow}</Eyebrow>
      <h2
        className={`mt-7 font-display text-[clamp(28px,3.4vw,52px)] leading-[1.06] font-normal tracking-[-0.02em] ${
          dark ? "text-[#ffffff]" : "text-[#071a3d]"
        }`}
      >
        {section.heading}
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {section.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={`m-0 max-w-[680px] text-[clamp(15px,1.15vw,18px)] leading-[1.75] ${
              dark ? "text-[#ffffff]/65" : "text-[#5b6575]"
            }`}
          >
            <RichText
              text={paragraph}
              linkClassName={
                dark
                  ? "font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
                  : undefined
              }
            />
          </p>
        ))}
      </div>
    </div>
  );
}

function Note({ text, dark }: { text?: string; dark?: boolean }) {
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
        <RichText text={text} />
      </span>
    </p>
  );
}

function Split({ section }: { section: PageSection }) {
  if (!section.items?.length) {
    return (
      <section id={section.id} className={`${wrap} scroll-mt-24 py-20 md:py-28`}>
        <div className={inner}>
          <SectionHead section={section} className="max-w-[860px]" />
          <Note text={section.note} />
        </div>
      </section>
    );
  }

  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-20 md:py-28`}>
      <div className={`${inner} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <SectionHead section={section} className="lg:sticky lg:top-28" />
        </div>
        <div className="lg:col-span-7">
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {section.items?.map((item, i) => (
              <li
                data-reveal
                key={item.title}
                className="group relative overflow-hidden rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6 transition-all duration-300 hover:border-[#087ef5]/40 hover:shadow-[0_20px_50px_-24px_rgba(7,26,61,0.3)] sm:p-7 md:p-8"
              >
                <span
                  className="absolute top-0 bottom-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-[#087ef5] to-[#ff6b00] transition-transform duration-500 group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-5">
                  <span className="font-display text-[15px] leading-[1.9] text-[#087ef5]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="m-0 text-[clamp(17px,1.4vw,21px)] leading-snug font-semibold text-[#071a3d]">
                      {item.title}
                    </h3>
                    <p className="m-0 mt-2.5 text-[15px] leading-[1.7] text-[#5b6575]">
                      <RichText text={item.text} />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Note text={section.note} />
        </div>
      </div>
    </section>
  );
}

function Cards({ section }: { section: PageSection }) {
  const count = section.items?.length ?? 0;
  const cols =
    count === 3 ? "lg:grid-cols-3" : count >= 5 ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-4";
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-20 md:py-28`}>
      <div className={inner}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead section={section} className="lg:col-span-8" />
        </div>
        <ul className={`m-0 mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:mt-14 md:gap-5 ${cols}`}>
          {section.items?.map((item, i) => (
            <li
              data-reveal
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/40 hover:shadow-[0_22px_50px_-22px_rgba(7,26,61,0.3)] md:p-8"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#087ef5] to-[#ff6b00] transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="flex items-center justify-between">
                <span className="font-display text-[clamp(30px,2.6vw,40px)] leading-none text-[#071a3d]/15 transition-colors duration-300 group-hover:text-[#087ef5]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-[#ff6b00]" aria-hidden="true" />
              </span>
              <h3 className="m-0 mt-8 text-[clamp(17px,1.35vw,20px)] leading-snug font-semibold text-[#071a3d]">
                {item.title}
              </h3>
              <p className="m-0 mt-3 text-[15px] leading-[1.7] text-[#5b6575]">
                <RichText text={item.text} />
              </p>
            </li>
          ))}
        </ul>
        <Note text={section.note} />
      </div>
    </section>
  );
}

function Steps({ section }: { section: PageSection }) {
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-12 md:py-16`}>
      <div className={`${inner} rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-6 py-14 sm:rounded-[34px] sm:px-8 md:px-14 md:py-20`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead section={section} className="lg:sticky lg:top-28" />
          </div>
          <ol className="relative m-0 flex list-none flex-col p-0 lg:col-span-7">
            <span
              className="absolute top-6 bottom-6 left-[23px] w-px bg-gradient-to-b from-[#087ef5] via-[#087ef5]/40 to-[#ff6b00]"
              aria-hidden="true"
            />
            {section.items?.map((item, i) => (
              <li data-reveal key={item.title} className="relative flex gap-5 pb-9 last:pb-0 sm:gap-7">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#087ef5]/30 bg-[#ffffff] font-display text-[16px] text-[#087ef5] shadow-[0_0_0_6px_#ffffff]">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-2.5">
                  <h3 className="m-0 text-[clamp(17px,1.4vw,21px)] leading-snug font-semibold text-[#071a3d]">
                    {item.title}
                  </h3>
                  <p className="m-0 mt-2.5 max-w-[620px] text-[15px] leading-[1.7] text-[#5b6575]">
                    <RichText text={item.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Note text={section.note} />
      </div>
    </section>
  );
}

function Checklist({ section }: { section: PageSection }) {
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-12 md:py-16`}>
      <div className={`${inner} relative overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-14 sm:rounded-[34px] sm:px-8 md:px-14 md:py-20`}>
        <span
          className="pointer-events-none absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#087ef5]/16 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHead section={section} tone="onDark" className="lg:col-span-5" />
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:col-span-7 lg:gap-4">
            {section.items?.map((item) => (
              <li
                data-reveal
                key={item.title}
                className="rounded-[20px] border border-[#ffffff]/10 bg-[#ffffff]/[0.04] p-6 transition-colors duration-300 hover:border-[#087ef5]/50 hover:bg-[#ffffff]/[0.07]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#087ef5] text-[#ffffff]">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="m-0 mt-5 text-[17px] leading-snug font-semibold text-[#ffffff]">
                  {item.title}
                </h3>
                <p className="m-0 mt-2 text-[14.5px] leading-[1.65] text-[#ffffff]/60">
                  <RichText
                    text={item.text}
                    linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
                  />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Note text={section.note} dark />
      </div>
    </section>
  );
}

function Contrast({ section }: { section: PageSection }) {
  const contrast = section.contrast;
  return (
    <section id={section.id} className={`${wrap} scroll-mt-24 py-20 md:py-28`}>
      <div className={inner}>
        <SectionHead section={section} className="max-w-[860px]" />
        {contrast && (
          <div data-reveal className="mt-12 overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] md:mt-14">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">{section.heading}</caption>
              <thead>
                <tr className="bg-[#071a3d]">
                  <th
                    scope="col"
                    className="px-4 py-4 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#087ef5] sm:px-8 sm:text-[12px] sm:tracking-[0.18em]"
                  >
                    {contrast.leftLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#ff6b00] sm:px-8 sm:text-[12px] sm:tracking-[0.18em]"
                  >
                    {contrast.rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {contrast.rows.map((row, i) => (
                  <tr
                    key={row.left}
                    className="group border-t border-[#e5eaf0] transition-colors duration-200 hover:bg-[#f2f8fd]"
                  >
                    <td className="px-4 py-5 align-top text-[14px] leading-[1.55] text-[#5b6575] sm:px-8 sm:py-6 sm:text-[16px]">
                      <span className="mr-2 hidden font-display text-[13px] text-[#071a3d]/30 sm:inline">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {row.left}
                    </td>
                    <td className="px-4 py-5 align-top text-[14px] leading-[1.55] font-semibold text-[#071a3d] sm:px-8 sm:py-6 sm:text-[16px]">
                      <span className="flex items-start gap-2.5">
                        <ArrowRight
                          className="mt-1 hidden h-4 w-4 shrink-0 text-[#ff6b00] transition-transform duration-300 group-hover:translate-x-1 sm:block"
                          aria-hidden="true"
                        />
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
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {section.items.map((item) => (
              <li data-reveal key={item.title} className="rounded-[20px] border border-[#e5eaf0] bg-[#ffffff] p-6 md:p-7">
                <h3 className="m-0 text-[17px] leading-snug font-semibold text-[#071a3d]">{item.title}</h3>
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
