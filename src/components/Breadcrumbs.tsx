import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/seo";

/**
 * Visible breadcrumb under the header. Pages emit the matching BreadcrumbList
 * JSON-LD from the same `crumbs` array via `breadcrumbNode`.
 */
export default function Breadcrumbs({
  crumbs,
  tone = "onLight",
}: {
  crumbs: Crumb[];
  tone?: "onLight" | "onDark";
}) {
  const dark = tone === "onDark";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-1.5 gap-y-1 p-0 text-[13px]">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.path}-${crumb.name}`} className="flex min-w-0 items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={`truncate font-semibold ${dark ? "text-[#ffffff]" : "text-[#071a3d]"}`}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={`transition-colors duration-200 ${
                    dark
                      ? "text-[#ffffff]/55 hover:text-[#ffffff]"
                      : "text-[#5b6575] hover:text-[#087ef5]"
                  }`}
                >
                  {crumb.name}
                </Link>
              )}
              {!last && (
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-[#ffffff]/30" : "text-[#071a3d]/30"}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
