"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import type { PricingPlan } from "@/lib/billing";
import PlanCards from "@/components/PlanCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Included on every plan, as the section intro says. */
const EVERY_PLAN = ["Resume screening", "AI interviews", "Evidence-backed scorecards"];

export default function Pricing({
  plans,
  intro,
}: {
  plans: PricingPlan[];
  intro: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set("[data-pr-anim]", { opacity: 1, y: 0 });

      gsap.fromTo(
        "[data-pr-anim]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.65,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        },
      );
    },
    { scope: root, dependencies: [plans.length] },
  );

  if (plans.length === 0) return null;

  return (
    <section
      className="relative border-t border-[#e5eaf0] bg-[#ffffff] px-5 py-20 md:px-10 md:py-28"
      id="pricing"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Split heading, as on the inner pages: title left, the intro,
            what every plan includes and the link right, so nothing floats
            alone at the far edge. */}
        <div
          data-pr-anim
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14"
        >
          <div className="lg:col-span-5">
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#066bd4]">
              <span
                className="h-px w-10 shrink-0 bg-[#ff6b00]"
                aria-hidden="true"
              />
              Pricing
            </p>

            <h2 className="mt-6 font-display text-[clamp(30px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
              Plans and
              <span className="block text-[#087ef5]">Pricing</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-[#e5eaf0] lg:pl-14">
            <p className="m-0 max-w-[620px] text-[clamp(15px,1.3vw,20px)] leading-[1.7] text-[#5b6575]">
              {intro}
            </p>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {EVERY_PLAN.map((item) => (
                  <li
                    key={item}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-[#e5eaf0] bg-[#ffffff] px-3.5 text-[13px] font-medium text-[#071a3d]"
                  >
                    <Check className="h-3.5 w-3.5 text-[#087ef5]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing"
                className="group relative inline-flex shrink-0 items-center gap-2 self-start pb-1 text-[15px] font-semibold text-[#071a3d] transition-colors duration-300 hover:text-[#087ef5] sm:self-auto"
              >
                Compare plans
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-[#071a3d]/25 transition-transform duration-300 group-hover:scale-x-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <PlanCards plans={plans} />
      </div>
    </section>
  );
}
