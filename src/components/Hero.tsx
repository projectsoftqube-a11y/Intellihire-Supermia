"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

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
      className="relative bg-brand-surface px-5 pt-28 md:px-10"
      id="top"
      ref={root}
    >
      <div className="relative mx-auto max-w-[1920px]">
        <div
          data-hero-card
          className="relative grid min-h-[620px] grid-cols-1 items-center overflow-hidden rounded-[34px] bg-brand-dark-blue px-7 py-16 md:min-h-[720px] md:px-12 md:py-20 lg:grid-cols-12 lg:gap-6 lg:px-16"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 lg:inset-y-0 lg:left-[42%]">
            <Image
              data-hero-image
              className="h-full w-full object-cover object-top"
              src="/images/hero-candidate.jpg"
              alt="Recruitment leader representing confident, people-first hiring"
              width={1600}
              height={1200}
              priority
            />
            <div className="absolute -top-16 inset-x-0 bottom-0 bg-gradient-to-b from-brand-dark-blue via-brand-dark-blue/40 to-transparent lg:inset-0 lg:bg-gradient-to-r lg:via-transparent" />
          </div>

          <div className="relative z-10 text-brand-white lg:col-span-8">
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-brand-white/90">
              <span className="h-px w-10 shrink-0 bg-brand-orange" aria-hidden="true" />
              Intelligent recruitment, human decisions
            </p>

            <h1 className="mt-8 font-display text-[clamp(46px,7.6vw,104px)] leading-[0.92] font-normal tracking-[-0.02em] text-brand-white">
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                <span className="block">Hire smarter.</span>
              </span>
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                <span className="block text-brand-light-blue">
                  Build stronger teams<span className="text-brand-orange">.</span>
                </span>
              </span>
            </h1>

            <p
              data-hero-support
              className="mt-7 max-w-[600px] text-[clamp(17px,1.5vw,22px)] leading-[1.65] text-brand-white/75"
            >
              AI-powered recruitment that finds, evaluates, and connects you with
              the right talent, faster.
            </p>

            <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-5">
              <a
                className="group inline-flex min-h-[58px] items-center gap-4 rounded-full bg-[#ffffff] py-2 pr-2 pl-8 text-[15px] font-semibold text-[#071a3d] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:text-[#ffffff] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)]"
                href="#contact"
              >
                <span className="text-[#071a3d] group-hover:text-[#ffffff]">
                  Get Started Now
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
          </div>
        </div>
      </div>
    </section>
  );
}
