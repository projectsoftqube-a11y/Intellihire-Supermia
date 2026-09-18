"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MARQUEE = [
  "Find better candidates",
  "Screen without the backlog",
  "Interview around the clock",
  "Score every answer fairly",
  "Hire with confidence",
];

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduced) {
        gsap.set(
          "[data-cta-eyebrow], [data-cta-copy], [data-cta-btn], [data-cta-rule]",
          { opacity: 1, y: 0, scaleX: 1 },
        );

        const tl = gsap.timeline({
          defaults: { ease: "power4.out", immediateRender: false },
          scrollTrigger: { trigger: root.current, start: "top bottom", once: true },
        });

        tl.from("[data-cta-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
        })
          .from(
            "[data-cta-eyebrow]",
            { y: 20, opacity: 0, duration: 0.5 },
            "-=0.7",
          )
          .from(
            "[data-cta-word] > span",
            { yPercent: 118, stagger: 0.07, duration: 0.9 },
            "-=0.35",
          )
          .from(
            "[data-cta-copy]",
            { y: 20, opacity: 0, duration: 0.55 },
            "-=0.55",
          )
          .from(
            "[data-cta-btn]",
            { y: 24, opacity: 0, stagger: 0.1, duration: 0.55 },
            "-=0.35",
          );

        gsap.to("[data-cta-marquee]", {
          xPercent: -50,
          ease: "none",
          repeat: -1,
          duration: 34,
        });

        gsap.to("[data-cta-glow]", {
          xPercent: 12,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      className="relative overflow-hidden bg-[#071a3d] py-16 md:py-32"
      id="contact"
      ref={root}
    >
      <span
        data-cta-glow
        className="pointer-events-none absolute top-[-20%] left-[15%] h-[620px] w-[620px] rounded-full bg-[#087ef5]/18 blur-[150px]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-[8%] bottom-[-25%] h-[440px] w-[440px] rounded-full bg-[#ff6b00]/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10">
        <span
          data-cta-rule
          className="block h-px w-full bg-gradient-to-r from-[#087ef5] via-[#ffffff]/20 to-transparent"
          aria-hidden="true"
        />

        <p
          data-cta-eyebrow
          className="m-0 mt-7 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.22em] uppercase text-[#ffffff]"
        >
          <span className="h-px w-10 shrink-0 bg-[#ff6b00]" aria-hidden="true" />
          Your next great hire starts here
        </p>

        <h2 className="m-0 mt-6 font-display text-[clamp(40px,9.5vw,158px)] leading-[0.9] font-normal tracking-[-0.035em] text-[#ffffff]">
          <span data-cta-word className="block overflow-hidden pb-[0.05em]">
            <span className="block">Ready to</span>
          </span>
          <span data-cta-word className="block overflow-hidden pb-[0.05em]">
            <span className="block">
              hire{" "}
              <span className="text-[#087ef5]">smarter</span>
              <span className="text-[#ff6b00]">?</span>
            </span>
          </span>
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:mt-14 md:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p
            data-cta-copy
            className="m-0 max-w-[520px] text-[clamp(17px,1.5vw,24px)] leading-[1.6] text-[#ffffff]"
          >
            Turn your recruitment process into a faster, more intelligent hiring
            engine.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              data-cta-btn
              className="group inline-flex min-h-[64px] items-center gap-5 rounded-full bg-[#ffffff] py-2.5 pr-2.5 pl-9 text-[16px] font-semibold text-[#071a3d] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,255,255,0.18)]"
              href="/#features"
              scroll={false}
            >
              <span className="text-[#071a3d]">Explore IntelliHire</span>
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#071a3d] transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight
                  className="h-[19px] w-[19px] text-[#ffffff]"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="relative mt-12 flex overflow-hidden border-y border-[#ffffff]/10 py-5 md:mt-20 md:py-7"
        aria-hidden="true"
      >
        <div data-cta-marquee className="flex shrink-0 items-center gap-10 pr-10">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-[clamp(26px,3vw,46px)] leading-none whitespace-nowrap text-[#ffffff]/25">
                {word}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff6b00]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
