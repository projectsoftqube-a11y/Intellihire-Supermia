"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { DEMO_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-card]", {
          clipPath: "inset(20% 18% 20% 18% round 34px)",
          duration: 1,
        })
        .from("[data-hero-image]", { scale: 1.08, y: 45, duration: 1.1 }, "-=0.75")
        .from(
          "[data-hero-line] > span",
          { yPercent: 110, stagger: 0.12, duration: 0.8 },
          "-=0.85",
        )
        .from(
          "[data-hero-support], [data-hero-actions]",
          { y: 24, opacity: 0, stagger: 0.1, duration: 0.55 },
          "-=0.45",
        );
    },
    { scope: root },
  );

  return (
    <section
      className="relative bg-brand-surface px-4 pt-24 sm:px-5 sm:pt-28 md:px-10"
      id="top"
      ref={root}
    >
      <div className="relative mx-auto max-w-[1920px]">
        <div
          data-hero-card
          className="relative grid min-h-[620px] grid-cols-1 items-center overflow-hidden rounded-[28px] bg-brand-dark-blue px-6 pt-14 pb-[250px] sm:rounded-[34px] sm:px-7 sm:pt-16 sm:pb-[340px] md:min-h-[720px] md:px-12 md:pt-20 md:pb-[380px] lg:grid-cols-12 lg:gap-6 lg:px-16 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] sm:h-[400px] md:h-[440px] lg:inset-y-0 lg:left-[42%] lg:h-auto">
            <Image
              data-hero-image
              className="h-full w-full object-cover object-top"
              src="/images/hero-candidate.jpg"
              alt="Recruitment leader in a blue blazer standing with arms folded in a modern office"
              width={1600}
              height={1200}
              priority
            />
            <div className="absolute -top-16 inset-x-0 bottom-0 bg-gradient-to-b from-brand-dark-blue via-brand-dark-blue/40 to-transparent lg:inset-0 lg:bg-gradient-to-r lg:via-transparent" />
          </div>

          <div className="relative z-10 text-brand-white lg:col-span-8">
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-brand-white/90">
              <span className="h-px w-10 shrink-0 bg-brand-orange" aria-hidden="true" />
              IntelliHire by SuperMIA
            </p>

            <h1 className="mt-8 font-display text-[clamp(34px,5.4vw,84px)] leading-[0.98] font-normal tracking-[-0.02em] text-brand-white">
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                <span className="block">AI Recruitment Software</span>
              </span>{" "}
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                <span className="block">That Screens and Interviews.</span>
              </span>{" "}
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                <span className="block text-brand-light-blue">
                  Your Team Decides<span className="text-brand-orange">.</span>
                </span>
              </span>
            </h1>

            {/* Already an answer-first passage: it names the subject, stands
                alone and runs to ~55 words, so it carries the `ih-answer`
                selector that `speakable` points at rather than being
                duplicated by a second block. */}
            <p
              data-hero-support
              data-answer
              className="ih-answer mt-7 max-w-[640px] text-[clamp(16px,1.35vw,20px)] leading-[1.65] text-brand-white/75"
            >
              IntelliHire by SuperMIA is AI recruitment software for HR teams,
              recruitment agencies and high-volume hiring. It reads every
              application against your rubric, runs first-round AI voice
              interviews around the clock and writes scorecards that cite the
              transcript. Your team reviews the evidence and decides who moves
              forward.
            </p>

            <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-5">
              <a
                className="group inline-flex min-h-[58px] items-center gap-4 rounded-full bg-[#ffffff] py-2 pr-2 pl-8 text-[15px] font-semibold text-[#071a3d] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:text-[#ffffff] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)]"
                href={DEMO_URL}
                data-track="book_demo_click"
              >
                <span className="text-[#071a3d] group-hover:text-[#ffffff]">
                  Book a demo
                </span>
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#071a3d] text-[#ffffff] transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:text-[#087ef5]">
                  <ArrowRight
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
              <a
                className="group relative inline-flex items-center gap-2 pb-1 text-[15px] font-semibold text-[#ffffff] transition-opacity duration-300 hover:opacity-80"
                href="#how-it-works"
              >
                See how it works
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-[#ffffff]/40 transition-transform duration-300 group-hover:scale-x-0" />
              </a>
            </div>

            <p
              data-hero-support
              className="m-0 mt-6 flex items-center gap-2.5 text-[13px] font-medium text-brand-white/60"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
              No candidate is ever rejected by a machine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
