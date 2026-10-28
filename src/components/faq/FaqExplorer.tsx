"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  HelpCircle,
  Mail,
  Mic,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import AnswerBlock from "@/components/AnswerBlock";
import FaqAccordion from "@/components/FaqAccordion";
import { ArrowLink, Eyebrow, RichText } from "@/components/ui";
import type { FaqGroup } from "@/content/faq";

const ICONS: Record<string, LucideIcon> = {
  about: Sparkles,
  screening: FileSearch,
  interviews: Mic,
  scorecards: ClipboardCheck,
  oversight: ShieldCheck,
  pricing: CreditCard,
};

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Plain, lower-case text for matching: link markup reduced to its label. */
const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .toLowerCase();

/**
 * The /faq help centre: a hero with a search box and topic chips, then a
 * sticky topic list beside one card per topic.
 *
 * Every question and answer is in the server HTML. Search only hides what
 * does not match, and only after the reader types, so crawlers and readers
 * without JavaScript always get the full list.
 */
export default function FaqExplorer({
  title,
  answer,
  groups,
  demoUrl,
  email,
  notify,
}: {
  title: string;
  answer: string;
  groups: FaqGroup[];
  demoUrl: string;
  email: string;
  /** Extra link under the pricing topic while prices are unpublished. */
  notify?: { label: string; href: string };
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(groups[0]?.id ?? "");

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const askHref = `mailto:${email}?subject=IntelliHire%20question`;

  const haystack = useMemo(
    () =>
      groups.map((group) =>
        group.items.map((item) => plain(`${group.title} ${item.question} ${item.answer}`)),
      ),
    [groups],
  );

  const visible = groups.map((group, g) =>
    terms.length === 0
      ? group.items
      : group.items.filter((_, i) => terms.every((term) => haystack[g][i].includes(term))),
  );
  const matches = visible.reduce((sum, items) => sum + items.length, 0);
  const firstMatch = visible.findIndex((items) => items.length > 0);

  // Highlight the topic currently in the reading band.
  useEffect(() => {
    const sections = groups
      .map((group) => document.getElementById(group.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <>
      {/* Hero: title, short answer, search and topics. */}
      <section className="relative px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
        <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] px-5 py-9 shadow-[0_30px_80px_-60px_rgba(7,26,61,0.5)] sm:rounded-[34px] sm:px-8 md:px-12 md:py-12 xl:px-16">
          <span
            className="pointer-events-none absolute -top-56 left-1/2 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-[#087ef5]/10 blur-[140px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-24 -bottom-40 h-[360px] w-[360px] rounded-full bg-[#ff6b00]/[0.07] blur-[120px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(#e5eaf0_1px,transparent_1px),linear-gradient(90deg,#e5eaf0_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_65%)]"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Help centre</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(28px,3vw,48px)] leading-[1.08] font-normal tracking-[-0.02em] text-[#071a3d]">
                {title}
              </h1>
              <div className="mt-5 [&>p]:max-w-[700px] [&>p]:text-[16px]">
                <AnswerBlock text={answer} tone="onLight" plain />
              </div>
            </div>

            {/* Search */}
            <form
              role="search"
              className="w-full rounded-[24px] border border-[#e5eaf0] bg-[#f7fafd]/80 p-4 backdrop-blur sm:p-5 lg:col-span-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="m-0 mb-3 px-1 text-[14px] font-semibold text-[#071a3d]">Looking for something specific?</p>
              <label htmlFor="faq-search" className="sr-only">
                Search the FAQ
              </label>
              <div className="group relative flex items-center rounded-full border border-[#e5eaf0] bg-[#ffffff] shadow-[0_24px_50px_-30px_rgba(7,26,61,0.45)] transition-[border-color,box-shadow] duration-300 focus-within:border-[#087ef5] focus-within:shadow-[0_0_0_5px_rgba(8,126,245,0.12),0_24px_50px_-30px_rgba(7,26,61,0.45)]">
                <Search
                  className="pointer-events-none absolute left-5 h-5 w-5 sm:left-6 text-[#071a3d]/40 transition-colors group-focus-within:text-[#087ef5]"
                  aria-hidden="true"
                />
                <input
                  id="faq-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the FAQ"
                  autoComplete="off"
                  className="h-[58px] w-full rounded-full bg-transparent pr-14 pl-12 text-[16px] sm:pr-16 sm:pl-14 text-[#071a3d] outline-none placeholder:text-[#071a3d]/40 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-[#f2f8fd] text-[#071a3d] transition-colors hover:bg-[#087ef5] hover:text-[#ffffff]"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="m-0 mt-3 px-1 text-[13px] text-[#5b6575]" aria-live="polite">
                {terms.length === 0
                  ? `${total} answers across ${groups.length} topics`
                  : matches === 0
                    ? "No answers match that search yet."
                    : `${matches} ${matches === 1 ? "answer matches" : "answers match"} "${query.trim()}"`}
              </p>
            </form>

            {/* Topic chips: small screens only; wide screens get the sticky
                topic list beside the answers. */}
            <nav aria-label="FAQ topics" className="lg:hidden">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {groups.map((group) => {
                  const Icon = ICONS[group.id] ?? HelpCircle;
                  return (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#e5eaf0] bg-[#ffffff] py-1 pr-1.5 pl-3.5 text-[13.5px] font-semibold text-[#071a3d] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#087ef5]/40 hover:text-[#087ef5] hover:shadow-[0_14px_30px_-20px_rgba(8,126,245,0.6)]"
                      >
                        <Icon className="h-4 w-4 text-[#087ef5]" aria-hidden="true" />
                        {group.title}
                        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#f2f8fd] px-1.5 text-[11.5px] text-[#5b6575] transition-colors group-hover:bg-[#087ef5] group-hover:text-[#ffffff]">
                          {group.items.length}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="relative px-4 pt-6 sm:px-5 md:px-10 md:pt-8">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <div className="sticky top-28 flex flex-col gap-4">
              <nav aria-label="FAQ topic list" className="rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-3">
                <p className="m-0 px-3 pt-2 pb-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/45">
                  Topics
                </p>
                <ol className="m-0 flex list-none flex-col gap-1 p-0">
                  {groups.map((group, i) => {
                    const Icon = ICONS[group.id] ?? HelpCircle;
                    const on = active === group.id;
                    const count = visible[i].length;
                    return (
                      <li key={group.id}>
                        <a
                          href={`#${group.id}`}
                          aria-current={on ? "true" : undefined}
                          className={`relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 ${
                            on ? "bg-[#f2f8fd] text-[#071a3d]" : "text-[#5b6575] hover:bg-[#f7fafd] hover:text-[#071a3d]"
                          } ${count === 0 ? "opacity-40" : ""}`}
                        >
                          <span
                            className={`absolute top-2.5 bottom-2.5 left-0 w-[3px] rounded-full bg-[#087ef5] transition-transform duration-300 ${
                              on ? "scale-y-100" : "scale-y-0"
                            }`}
                            aria-hidden="true"
                          />
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-200 ${
                              on ? "bg-[#087ef5] text-[#ffffff]" : "bg-[#f2f8fd] text-[#087ef5]"
                            }`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1 text-[14.5px] leading-snug font-semibold">{group.title}</span>
                          <span className="text-[12px] text-[#071a3d]/40">{count}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div className="relative overflow-hidden rounded-[24px] bg-[#071a3d] p-6">
                <span
                  className="pointer-events-none absolute -top-20 -right-16 h-[200px] w-[200px] rounded-full bg-[#087ef5]/30 blur-[70px]"
                  aria-hidden="true"
                />
                <p className="relative m-0 font-display text-[22px] leading-[1.2] text-[#ffffff]">
                  Still have a question?
                </p>
                <p className="relative m-0 mt-2 text-[14px] leading-[1.6] text-[#ffffff]/60">
                  Ask us directly, or bring a live role to a demo.
                </p>
                <div className="relative mt-5 flex flex-col gap-3">
                  <a
                    href={demoUrl}
                    data-track="book_demo_click"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#ffffff] px-5 text-[14px] font-semibold text-[#071a3d] transition-colors duration-200 hover:bg-[#087ef5] hover:text-[#ffffff]"
                  >
                    Book a demo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={askHref}
                    data-track="contact_email_click"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#ffffff]/20 px-5 text-[14px] font-semibold text-[#ffffff] transition-colors duration-200 hover:border-[#087ef5] hover:text-[#087ef5]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email your question
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-5 lg:col-span-8 xl:col-span-9">
            {groups.map((group, g) => {
              const Icon = ICONS[group.id] ?? HelpCircle;
              const items = visible[g];
              const open = terms.length === 0 ? g === 0 : g === firstMatch;
              return (
                <section
                  key={group.id}
                  id={group.id}
                  hidden={items.length === 0}
                  className="relative scroll-mt-28 overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_24px_60px_-50px_rgba(7,26,61,0.5)]"
                >
                  <header className="relative flex flex-col gap-5 border-b border-[#e5eaf0] bg-gradient-to-br from-[#f7fafd] to-[#ffffff] px-6 py-7 sm:flex-row sm:items-start sm:gap-6 md:px-10 md:py-9">
                    <span
                      className="pointer-events-none absolute top-4 right-6 font-display text-[clamp(56px,6vw,96px)] leading-none text-[#071a3d]/[0.04] md:right-10"
                      aria-hidden="true"
                    >
                      {num(g)}
                    </span>
                    <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#087ef5] to-[#0560c2] text-[#ffffff] shadow-[0_16px_30px_-14px_rgba(8,126,245,0.8)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="relative min-w-0">
                      <p className="m-0 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#c2410c]">
                        Topic {num(g)} · {group.items.length} questions
                      </p>
                      <h2 className="m-0 mt-2 font-display text-[clamp(24px,2.3vw,36px)] leading-[1.12] font-normal tracking-[-0.015em] text-[#071a3d]">
                        {group.title}
                      </h2>
                      <p className="m-0 mt-2.5 max-w-[680px] text-[15px] leading-[1.7] text-[#5b6575]">
                        <RichText text={group.intro} />
                      </p>
                    </div>
                  </header>

                  <div className="px-6 md:px-10 [&>div]:border-y-0">
                    <FaqAccordion items={items} openFirst={open} />
                  </div>

                  {group.id === "pricing" && notify && (
                    <div className="border-t border-[#e5eaf0] px-6 py-5 md:px-10">
                      <ArrowLink href={notify.href}>{notify.label}</ArrowLink>
                    </div>
                  )}
                </section>
              );
            })}

            {terms.length > 0 && matches === 0 && (
              <div className="rounded-[28px] border border-dashed border-[#c9d3e0] bg-[#ffffff] px-6 py-14 text-center md:px-10">
                <p className="m-0 font-display text-[24px] text-[#071a3d]">Nothing matches &ldquo;{query.trim()}&rdquo;</p>
                <p className="m-0 mt-3 text-[15px] text-[#5b6575]">
                  Try a shorter word, or send us the question and we will answer it.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3">
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#087ef5]"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Show every answer
                  </button>
                  <a
                    href={askHref}
                    data-track="contact_email_click"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#071a3d] hover:text-[#087ef5]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email your question
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
