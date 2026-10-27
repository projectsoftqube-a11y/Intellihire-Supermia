"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROBLEMS = [
  {
    index: "01",
    title: "Too many applications",
    copy: "When a role draws hundreds of applicants, nobody has time to read each one properly. The strongest applicant can be the one nobody opened.",
    load: 92,
  },
  {
    index: "02",
    title: "Too much manual screening",
    copy: "Recruiters spend their days reading resume after resume against the same checklist. Every hour on first-pass review is an hour not spent talking to the people you want to hire.",
    load: 78,
  },
  {
    index: "03",
    title: "Slow interview coordination",
    copy: "Momentum disappears between calendars and follow-ups. Every day spent arranging a first conversation is a day a strong candidate can walk away.",
    load: 64,
  },
  {
    index: "04",
    title: "Great candidates get missed",
    copy: "Strong potential can sit behind an unusual resume or an imperfect keyword match. A rushed first pass rarely finds it.",
    load: 47,
  },
];

export default function HiringGap() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-gap-heading] > *", {
        y: 34,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      gsap.from("[data-gap-seam]", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-gap-row]").forEach((row, i) => {
        gsap.from(row, {
          x: 46,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });

        const bar = row.querySelector("[data-gap-bar]");
        if (bar) {
          gsap.from(bar, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            delay: i * 0.08 + 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section
      className="relative bg-brand-surface px-4 py-20 sm:px-5 md:px-10 md:py-28"
      id="problem"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px] overflow-hidden rounded-[28px] bg-[#071a3d] sm:rounded-[34px]">
        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          <span
            data-gap-seam
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#087ef5] to-transparent lg:block"
            aria-hidden="true"
          />

          <div
            data-gap-heading
            className="relative px-6 pt-14 pb-10 sm:px-7 md:px-14 md:pt-20 lg:py-24"
          >
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#ffffff]/90">
              <span
                className="h-px w-10 shrink-0 bg-[#ff6b00]"
                aria-hidden="true"
              />
              The hiring gap
            </p>

            <h2 className="mt-8 font-display text-[clamp(30px,3.8vw,60px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
              Why Hiring Stalls{" "}
              <span className="block text-[#087ef5]">
                Before Anyone Talks to a Candidate
              </span>
            </h2>

            <p className="mt-8 max-w-[480px] text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-[#ffffff]/65">
              Good candidates apply. The trouble is what happens next.
              Applications pile up and recruiters spend their week on
              first-pass review. By the time interviews are arranged, some of
              the people you wanted may have taken other offers.
            </p>

            <div className="mt-12 flex items-start gap-5 border-t border-[#ffffff]/12 pt-8">
              <span
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff6b00]"
                aria-hidden="true"
              />
              <p className="m-0 max-w-[460px] text-[clamp(14px,1.05vw,16px)] leading-[1.7] text-[#ffffff]/80">
                IntelliHire takes the reading, ranking and first-round
                interviews off your recruiters&rsquo; desks, so their hours go
                to the conversations that matter. Your team still decides who
                moves forward.
              </p>
            </div>
          </div>

          <div className="relative border-t border-[#ffffff]/10 lg:border-t-0">
            {PROBLEMS.map(({ index, title, copy, load }) => (
              <article
                data-gap-row
                key={index}
                className="group relative border-b border-[#ffffff]/10 px-6 py-8 transition-colors duration-300 last:border-b-0 hover:bg-[#ffffff]/[0.04] sm:px-7 md:px-14 md:py-10"
              >
                <div className="flex items-baseline gap-5 md:gap-7">
                  <span className="font-display text-[15px] leading-none text-[#087ef5]">
                    {index}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-[clamp(19px,1.6vw,26px)] leading-snug font-semibold text-[#ffffff]">
                      {title}
                    </h3>
                    <p className="mt-2.5 max-w-[420px] text-[clamp(14px,1.05vw,16px)] leading-[1.6] text-[#ffffff]/55">
                      {copy}
                    </p>

                    <span
                      className="mt-6 block h-[2px] w-full overflow-hidden rounded-full bg-[#ffffff]/10"
                      aria-hidden="true"
                    >
                      <span
                        data-gap-bar
                        className="block h-full rounded-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00] transition-[width] duration-500"
                        style={{ width: `${load}%` }}
                      />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
