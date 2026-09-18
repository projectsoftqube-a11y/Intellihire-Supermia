"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
  list?: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set("[data-lp-anim]", { opacity: 1, y: 0 });
      gsap.fromTo(
        "[data-lp-anim]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    },
    { scope: root },
  );

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="bg-brand-surface" ref={root}>
      <section className="px-5 pt-28 pb-10 md:px-10 md:pt-32 md:pb-12">
        <div className="mx-auto max-w-[1920px]">
          <div data-lp-anim className="max-w-[760px]">
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
              <span
                className="h-px w-10 shrink-0 bg-[#ff6b00]"
                aria-hidden="true"
              />
              {eyebrow}
            </p>

            <h1 className="mt-5 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.05] font-normal tracking-[-0.025em] text-[#071a3d]">
              {title}
            </h1>

            <p className="mt-4 max-w-[600px] text-[15px] leading-[1.65] text-[#5b6575] md:text-[17px]">
              {intro}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/40">
                On this page
              </p>

              <nav className="mt-5">
                <ul className="m-0 flex list-none flex-col p-0">
                  {sections.map(({ id, heading }, i) => {
                    const isActive = activeId === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`relative flex gap-3 border-l-2 py-2.5 pl-4 text-[14px] leading-[1.5] transition-all duration-300 ${
                            isActive
                              ? "border-[#087ef5] font-semibold text-[#071a3d]"
                              : "border-[#e5eaf0] text-[#5b6575] hover:border-[#087ef5]/40 hover:text-[#071a3d]"
                          }`}
                        >
                          <span
                            className={
                              isActive
                                ? "font-display text-[12px] text-[#087ef5]"
                                : "font-display text-[12px] text-[#071a3d]/30"
                            }
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {heading}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] p-7 md:p-12">
              {sections.map(({ id, heading, body, list }, i) => (
                <section
                  key={id}
                  id={id}
                  className="scroll-mt-28 border-t border-[#e5eaf0] pt-10 first:border-t-0 first:pt-0 [&+section]:mt-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[14px] text-[#087ef5]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="m-0 font-display text-[clamp(22px,2.2vw,32px)] leading-[1.25] font-normal text-[#071a3d]">
                      {heading}
                    </h2>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 pl-0 md:pl-9">
                    {body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="m-0 text-[15px] leading-[1.75] text-[#5b6575] md:text-[16px]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {list && (
                      <ul className="m-0 mt-1 flex list-none flex-col gap-2.5 p-0">
                        {list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#5b6575] md:text-[16px]"
                          >
                            <span
                              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#087ef5]"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 rounded-[28px] bg-[#071a3d] p-7 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <div>
                <p className="m-0 font-display text-[clamp(20px,2vw,28px)] leading-[1.3] text-[#ffffff]">
                  Questions about this policy?
                </p>
                <p className="mt-2 m-0 text-[15px] text-[#ffffff]/60">
                  Our team is happy to walk you through it.
                </p>
              </div>

              <a
                href="mailto:hello@supermia.ai"
                className="group inline-flex min-h-[54px] shrink-0 items-center gap-4 rounded-full bg-[#ffffff] py-2 pr-2 pl-7 text-[15px] font-semibold text-[#071a3d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:text-[#ffffff]"
              >
                <span>Contact us</span>
                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#071a3d] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight
                    className="h-4 w-4 text-[#ffffff]"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
