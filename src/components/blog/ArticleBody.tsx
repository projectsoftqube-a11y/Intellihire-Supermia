import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { RichText } from "@/components/ui";
import CopyButton from "@/components/blog/CopyButton";
import type { BlogBlock } from "@/content/types";

const CALLOUT = {
  tip: {
    icon: Lightbulb,
    box: "border-[#087ef5]/25 bg-[#087ef5]/[0.06]",
    iconBox: "bg-[#087ef5] text-[#ffffff]",
  },
  note: {
    icon: Info,
    box: "border-[#e5eaf0] bg-[#f2f8fd]",
    iconBox: "bg-[#071a3d] text-[#ffffff]",
  },
  warning: {
    icon: TriangleAlert,
    box: "border-[#ff6b00]/30 bg-[#ff6b00]/[0.06]",
    iconBox: "bg-[#ff6b00] text-[#ffffff]",
  },
} as const;

const p = "m-0 text-[16.5px] leading-[1.85] text-[#3c4656] md:text-[17.5px]";

/** Renders a post's content blocks with the site's editorial typography. */
export default function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={block.id}
                id={block.id}
                className="m-0 mt-8 scroll-mt-28 font-display text-[clamp(25px,2.4vw,34px)] leading-[1.18] font-normal tracking-[-0.015em] text-[#071a3d] first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="m-0 mt-3 text-[clamp(18px,1.5vw,21px)] leading-snug font-semibold text-[#071a3d]">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={p}>
                <RichText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="m-0 flex list-none flex-col gap-3 p-0">
                {block.items.map((item) => (
                  <li key={item.slice(0, 48)} className={`${p} flex gap-3.5`}>
                    <span className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#087ef5]" aria-hidden="true" />
                    <span className="min-w-0">
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="m-0 flex list-none flex-col gap-3.5 p-0">
                {block.items.map((item, n) => (
                  <li key={item.slice(0, 48)} className={`${p} flex gap-4`}>
                    <span className="mt-[3px] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#071a3d] font-display text-[13px] text-[#ffffff]">
                      {n + 1}
                    </span>
                    <span className="min-w-0">
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="m-0 my-2 overflow-hidden rounded-[20px] border border-[#e5eaf0] bg-[#ffffff]">
                <div className="table-scroll">
                  <table className="w-full min-w-[560px] border-collapse text-left">
                    {block.caption && (
                      <caption className="border-b border-[#e5eaf0] px-5 py-3.5 text-left text-[13px] font-semibold text-[#5b6575]">
                        {block.caption}
                      </caption>
                    )}
                    <thead>
                      <tr className="bg-[#071a3d]">
                        {block.head.map((cell) => (
                          <th
                            key={cell}
                            scope="col"
                            className="px-5 py-3.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#ffffff]"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-t border-[#e5eaf0] align-top odd:bg-[#ffffff] even:bg-[#f7fbfe]">
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th
                                key={c}
                                scope="row"
                                className="px-5 py-4 text-[14.5px] leading-[1.6] font-semibold text-[#071a3d]"
                              >
                                <RichText text={cell} />
                              </th>
                            ) : (
                              <td key={c} className="px-5 py-4 text-[14.5px] leading-[1.6] text-[#3c4656]">
                                <RichText text={cell} />
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
          case "callout": {
            const style = CALLOUT[block.tone];
            const Icon = style.icon;
            return (
              <aside key={i} className={`my-2 flex gap-4 rounded-[20px] border p-5 sm:p-6 ${style.box}`}>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${style.iconBox}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="m-0 text-[15.5px] font-semibold text-[#071a3d]">{block.title}</p>
                  <p className="m-0 mt-1.5 text-[15px] leading-[1.75] text-[#3c4656]">
                    <RichText text={block.text} />
                  </p>
                </div>
              </aside>
            );
          }
          case "template":
            return (
              <figure key={i} className="m-0 my-2 overflow-hidden rounded-[22px] bg-[#071a3d] shadow-[0_30px_70px_-35px_rgba(7,26,61,0.6)]">
                <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ffffff]/10 px-5 py-4 sm:px-6">
                  <span className="flex items-center gap-3 text-[14px] font-semibold text-[#ffffff]">
                    <span className="h-2 w-2 rounded-full bg-[#ff6b00]" aria-hidden="true" />
                    {block.title}
                  </span>
                  <CopyButton text={[block.title, "", ...block.lines].join("\n")} />
                </figcaption>
                <pre className="m-0 overflow-x-auto px-5 py-5 font-sans text-[13.5px] leading-[1.8] whitespace-pre-wrap text-[#ffffff]/85 sm:px-6 sm:text-[14px]">
                  {block.lines.join("\n")}
                </pre>
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
