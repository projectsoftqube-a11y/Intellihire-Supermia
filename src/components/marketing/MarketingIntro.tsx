import { ArrowDown } from "lucide-react";
import { RichText } from "@/components/ui";
import type { MarketingPage } from "@/content/types";

/**
 * The page's lead copy, directly under the hero, beside an "On this page"
 * card. The lead moved out of the hero so the hero stays short, but it stays
 * high on the page: it carries the primary keyword in context. The card is
 * built from the page's own sections, so it is always accurate and gives
 * readers (and crawlers) a map of the page.
 */
export default function MarketingIntro({ page }: { page: MarketingPage }) {
  const { lead, sections, faqs, faqHeading } = page;
  if (lead.length === 0) return null;

  const contents = [
    ...sections.map((section) => ({ href: `#${section.id}`, label: section.heading })),
    ...(faqs.length > 0 ? [{ href: "#faqs", label: faqHeading }] : []),
  ];

  return (
    <section className="relative px-4 pt-14 sm:px-5 md:px-10 md:pt-20">
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="flex flex-col gap-5 border-l-2 border-[#ff6b00] pl-6 md:pl-8 lg:col-span-7">
          {lead.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 40)}
              className={`m-0 ${
                i === 0
                  ? "font-display text-[clamp(19px,1.7vw,26px)] leading-[1.45] text-[#071a3d]"
                  : "text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-[#5b6575]"
              }`}
            >
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        {contents.length > 0 && (
          <nav
            data-reveal
            aria-label="On this page"
            className="rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-6 shadow-[0_24px_60px_-40px_rgba(7,26,61,0.35)] sm:p-7 lg:col-span-5"
          >
            <p className="m-0 flex items-center justify-between gap-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/45">
              On this page
              <span className="tracking-normal normal-case">{contents.length} sections</span>
            </p>
            <ol className="m-0 mt-4 flex list-none flex-col divide-y divide-[#e5eaf0] p-0">
              {contents.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-4 py-3.5 text-[#071a3d] transition-colors duration-200 hover:text-[#087ef5]"
                  >
                    <span className="w-6 shrink-0 font-display text-[13px] text-[#087ef5]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-[15px] leading-snug font-medium">{item.label}</span>
                    <ArrowDown
                      className="h-4 w-4 shrink-0 text-[#071a3d]/30 transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-[#087ef5]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
