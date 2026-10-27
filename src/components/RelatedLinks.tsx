import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { linkSummary } from "@/content";

export default function RelatedLinks({
  paths,
  heading = "Keep exploring",
}: {
  paths: string[];
  heading?: string;
}) {
  const items = paths.map(linkSummary).filter((item) => item !== null);
  if (items.length === 0) return null;

  return (
    <section className="relative px-4 py-16 sm:px-5 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1920px]">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Related</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(26px,2.8vw,42px)] leading-[1.08] font-normal tracking-[-0.02em] text-[#071a3d]">
              {heading}
            </h2>
          </div>
        </div>

        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {items.map((item) => (
            <li data-reveal key={item.path}>
              <Link
                href={item.path}
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/40 hover:shadow-[0_22px_50px_-22px_rgba(7,26,61,0.3)] md:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#087ef5]">
                    {item.kicker}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2f8fd] text-[#071a3d] transition-all duration-300 group-hover:bg-[#087ef5] group-hover:text-[#ffffff]">
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <span className="mt-7 block font-display text-[clamp(19px,1.6vw,24px)] leading-[1.25] text-[#071a3d]">
                  {item.title}
                </span>
                <span className="mt-3 block text-[14.5px] leading-[1.65] text-[#5b6575]">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
