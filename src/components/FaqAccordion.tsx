import { Plus } from "lucide-react";
import { RichText } from "@/components/ui";

type Item = { question: string; answer: string };

/**
 * CSS-only accordion built on <details>. Every answer is in the server HTML on
 * first load (the FAQ handoffs require it); browsers that support animating
 * `::details-content` get a smooth open, others open instantly.
 */
export default function FaqAccordion({
  items,
  tone = "onLight",
  openFirst = false,
  headingLevel = "h3",
}: {
  items: Item[];
  tone?: "onLight" | "onDark";
  openFirst?: boolean;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const dark = tone === "onDark";

  return (
    <div
      className={`border-y ${
        dark ? "divide-y divide-[#ffffff]/12 border-[#ffffff]/12" : "divide-y divide-[#e5eaf0] border-[#e5eaf0]"
      }`}
    >
      {items.map(({ question, answer }, i) => (
        <details key={question} className="faq group" open={openFirst && i === 0}>
          <summary className="flex list-none items-start justify-between gap-5 py-6 outline-none select-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-[#087ef5] focus-visible:ring-offset-4 md:py-7 [&::-webkit-details-marker]:hidden">
            <Heading
              className={`m-0 text-[clamp(16px,1.35vw,20px)] leading-[1.4] font-semibold transition-colors duration-200 ${
                dark
                  ? "text-[#ffffff] group-hover:text-[#ffffff]/80"
                  : "text-[#071a3d] group-hover:text-[#087ef5]"
              }`}
            >
              {question}
            </Heading>
            <span
              className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 group-open:rotate-45 group-open:border-[#087ef5] group-open:bg-[#087ef5] group-open:text-[#ffffff] ${
                dark ? "border-[#ffffff]/20 text-[#ffffff]" : "border-[#e5eaf0] bg-[#ffffff] text-[#071a3d]"
              }`}
              aria-hidden="true"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>

          <div className="pr-0 pb-7 sm:pr-14">
            <p
              className={`m-0 max-w-[760px] text-[15px] leading-[1.75] md:text-[16px] ${
                dark ? "text-[#ffffff]/65" : "text-[#5b6575]"
              }`}
            >
              <RichText text={answer} />
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
