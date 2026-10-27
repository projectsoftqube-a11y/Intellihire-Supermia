import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function pageFromParam(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1;
  const raw = Array.isArray(value) ? value[0] : value;
  if (!/^[1-9]\d{0,3}$/.test(raw)) return null;
  return Number(raw);
}

export function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

/** Crawlable ?page=N links (handoff: paginate at 12 with self-canonicals). */
export default function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const linkClass =
    "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-200";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={pageHref(basePath, page - 1)} rel="prev" className={`${linkClass} border-[#e5eaf0] bg-[#ffffff] text-[#071a3d] hover:border-[#087ef5]`}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Newer
        </Link>
      )}
      {pages.map((n) => (
        <Link
          key={n}
          href={pageHref(basePath, n)}
          aria-current={n === page ? "page" : undefined}
          className={`${linkClass} ${
            n === page
              ? "border-[#071a3d] bg-[#071a3d] text-[#ffffff]"
              : "border-[#e5eaf0] bg-[#ffffff] text-[#071a3d] hover:border-[#087ef5]"
          }`}
        >
          {n}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={pageHref(basePath, page + 1)} rel="next" className={`${linkClass} border-[#e5eaf0] bg-[#ffffff] text-[#071a3d] hover:border-[#087ef5]`}>
          Older
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
