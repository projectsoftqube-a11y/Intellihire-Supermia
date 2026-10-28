"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HANDOFFS = [
  {
    ai: "Reads and structures every application",
    you: "What the role actually needs",
  },
  {
    ai: "Ranks candidates against your rubric",
    you: "Which signals carry weight",
  },
  {
    ai: "Runs first-round interviews around the clock",
    you: "Who moves forward",
  },
  {
    ai: "Drafts scorecards with transcript evidence",
    you: "What the evidence means",
  },
  {
    ai: "Flags integrity concerns for review",
    you: "The final offer, every time",
  },
];

export default function HumanBalance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
      });

      tl.from("[data-hb-head] > *", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
      }).fromTo(
        "[data-hb-row]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        "-=0.3",
      );

      gsap.utils.toArray<HTMLElement>("[data-hb-row]").forEach((row) => {
        gsap.fromTo(
          row.querySelector("[data-hb-line]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      className="relative overflow-hidden bg-[#071a3d] px-4 py-24 sm:px-5 md:px-10 md:py-32"
      id="oversight"
      ref={root}
    >
      <span
        className="pointer-events-none absolute top-0 right-[10%] h-[420px] w-[420px] rounded-full bg-[#087ef5]/12 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1920px]">
        <div data-hb-head className="max-w-[820px]">
          <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#ffffff]/90">
            <span
              className="h-px w-10 shrink-0 bg-[#ff6b00]"
              aria-hidden="true"
            />
            Intelligence, with oversight
          </p>

          <h2 className="mt-8 font-display text-[clamp(30px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
            AI Does the Reading.{" "}
            <span className="block text-[#087ef5]">Your Team Makes the Call.</span>
          </h2>

          <p className="mt-8 max-w-[600px] text-[clamp(16px,1.3vw,20px)] leading-[1.7] text-[#ffffff]/65">
            IntelliHire is built for human in the loop hiring. Every stage ends
            with a handoff to a person: the AI handles the volume, and your team
            makes every decision.
          </p>
        </div>

        <div className="mt-16 flex flex-col md:mt-20">
          <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-8 pb-5 lg:grid">
            <p className="m-0 text-[12px] font-semibold tracking-[0.18em] uppercase text-[#5aa9ff]">
              IntelliHire does
            </p>
            <span className="w-12" aria-hidden="true" />
            <p className="m-0 text-[12px] font-semibold tracking-[0.18em] uppercase text-[#ff6b00]">
              Your team decides
            </p>
          </div>

          {HANDOFFS.map(({ ai, you }, i) => (
            <div
              data-hb-row
              key={ai}
              className="group grid grid-cols-1 items-center gap-5 border-t border-[#ffffff]/10 py-7 last:border-b lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:py-8"
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-[14px] leading-none text-[#ffffff]/25">
                  0{i + 1}
                </span>
                <p className="m-0 text-[clamp(16px,1.35vw,21px)] leading-[1.5] text-[#ffffff]/60">
                  <span className="sr-only">IntelliHire does: </span>
                  {ai}
                </p>
              </div>

              <div className="flex items-center gap-3 lg:w-12 lg:justify-center">
                <span
                  data-hb-line
                  className="h-px flex-1 bg-gradient-to-r from-[#087ef5] to-[#ff6b00] lg:hidden"
                  aria-hidden="true"
                />
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-[#ff6b00] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span
                  className="h-px flex-1 bg-gradient-to-r from-[#ff6b00] to-transparent lg:hidden"
                  aria-hidden="true"
                />
              </div>

              <p className="m-0 text-[clamp(17px,1.5vw,23px)] leading-[1.4] font-semibold text-[#ffffff]">
                <span className="sr-only">Your team decides: </span>
                <span className="text-[#ff6b00] lg:hidden" aria-hidden="true">
                  Your team decides:{" "}
                </span>
                {you}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 md:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <p className="m-0 max-w-[620px] font-display text-[clamp(22px,2.6vw,38px)] leading-[1.25] text-[#ffffff]">
            No candidate is ever rejected by a machine
            <span className="text-[#ff6b00]">.</span>
          </p>

          <Link
            className="group inline-flex min-h-[58px] max-w-full shrink-0 items-center gap-4 rounded-full bg-[#ffffff] py-2 pr-2 pl-6 text-[15px] font-semibold text-[#071a3d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] sm:pl-8"
            href="/platform/human-oversight"
          >
            <span className="text-[#071a3d] group-hover:text-[#ffffff]">
              Read how human oversight and data security work
            </span>
            <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#071a3d] transition-transform duration-300 group-hover:rotate-45">
              <ArrowRight
                className="h-[18px] w-[18px] text-[#ffffff]"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
