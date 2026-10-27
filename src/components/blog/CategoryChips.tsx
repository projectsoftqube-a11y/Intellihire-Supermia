import Link from "next/link";
import { liveCategories } from "@/content/blog";

/** Crawlable category filter chips; empty categories stay hidden. */
export default function CategoryChips({
  active,
  tone = "onDark",
}: {
  /** Category slug, or "all" on the hub. */
  active: string;
  tone?: "onDark" | "onLight";
}) {
  const chips = [
    { slug: "all", name: "All", path: "/blog" },
    ...liveCategories().map(({ slug, name, path }) => ({ slug, name, path })),
  ];
  const dark = tone === "onDark";

  return (
    <nav aria-label="Blog categories">
      <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
        {chips.map((chip) => {
          const current = chip.slug === active;
          return (
            <li key={chip.slug}>
              <Link
                href={chip.path}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[13.5px] font-semibold transition-all duration-200 ${
                  current
                    ? "border-[#087ef5] bg-[#087ef5] text-[#ffffff]"
                    : dark
                      ? "border-[#ffffff]/15 bg-[#ffffff]/[0.05] text-[#ffffff]/85 hover:border-[#087ef5] hover:text-[#ffffff]"
                      : "border-[#e5eaf0] bg-[#ffffff] text-[#071a3d] hover:border-[#087ef5] hover:text-[#087ef5]"
                }`}
              >
                {chip.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
