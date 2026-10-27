"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import type { PricingPlan } from "@/lib/billing";
import PlanCards from "@/components/PlanCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        <div
          data-pr-anim
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[760px]">
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
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

            <p className="mt-5 max-w-[560px] text-[clamp(15px,1.3vw,20px)] leading-[1.7] text-[#5b6575]">
              {intro}
            </p>
          </div>

          <Link
            href="/pricing"
            className="group relative inline-flex shrink-0 items-center gap-2 self-start pb-1 text-[15px] font-semibold text-[#071a3d] transition-colors duration-300 hover:text-[#087ef5] lg:self-end"
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

        <PlanCards plans={plans} />
      </div>
    </section>
  );
}
