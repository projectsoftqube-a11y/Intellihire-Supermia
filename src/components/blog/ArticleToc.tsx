"use client";

import { useEffect, useState } from "react";

/**
 * Desktop "On this page" list for a post. The section being read is
 * highlighted: the last H2 whose top has passed the reading line (a third of
 * the way down the screen). The links are plain anchors in the server HTML;
 * this only adds the highlight.
 */
export default function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/65">
        On this page
      </p>
      <ol className="m-0 mt-5 flex list-none flex-col p-0">
        {items.map((item, n) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex gap-3 border-l-2 py-2.5 pl-4 text-[14px] leading-[1.5] transition-colors duration-300 ${
                  on
                    ? "border-[#087ef5] bg-[#087ef5]/[0.06] font-semibold text-[#071a3d]"
                    : "border-[#e5eaf0] text-[#5b6575] hover:border-[#087ef5]/50 hover:text-[#071a3d]"
                }`}
              >
                <span
                  className={`font-display text-[12px] transition-colors duration-300 ${
                    on ? "text-[#066bd4]" : "text-[#071a3d]/65"
                  }`}
                >
                  {String(n + 1).padStart(2, "0")}
                </span>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
