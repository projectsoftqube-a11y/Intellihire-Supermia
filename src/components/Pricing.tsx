"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PLANS = [
  {
    name: "Starter",
    blurb: "For small teams running their first AI-assisted hires.",
    points: [
      "Resume parsing and candidate matching",
      "AI voice interviews",
      "Automated scorecards",
      "Email and WhatsApp notifications",
    ],
  },
  {
    name: "Growth",
    blurb: "For scaling teams hiring across multiple roles at once.",
    featured: true,
    points: [
      "Everything in Starter",
      "AI-assisted human interviews",
      "Interview proctoring and integrity scoring",
      "Pipeline management and analytics",
      "ATS and calendar integrations",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For organisations with compliance and scale requirements.",
    points: [
      "Everything in Growth",
      "Multi-tenant isolation and SSO",
      "Custom retention and audit logging",
      "Dedicated interviewer portal",
      "Priority support and onboarding",
    ],
  },
];

export default function Pricing() {
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
    { scope: root },
  );

  return (
    <section
      className="relative border-t border-[#e5eaf0] bg-[#ffffff] px-5 py-20 md:px-10 md:py-28"
      id="pricing"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px]">
        <div data-pr-anim className="max-w-[760px]">
          <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
            <span
              className="h-px w-10 shrink-0 bg-[#ff6b00]"
              aria-hidden="true"
            />
            Pricing
          </p>

          <h2 className="mt-6 font-display text-[clamp(30px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
            Plans built around
            <span className="block text-[#087ef5]">how you hire.</span>
          </h2>

          <p className="mt-5 max-w-[560px] text-[clamp(15px,1.3vw,20px)] leading-[1.7] text-[#5b6575]">
            We are finalising pricing ahead of launch. Tell us how your team
            hires and we will share plans as soon as they are ready.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map(({ name, blurb, points, featured }) => (
            <article
              data-pr-anim
              key={name}
              className={`relative flex flex-col overflow-hidden rounded-[26px] border p-7 md:p-8 ${
                featured
                  ? "border-[#087ef5] bg-[#071a3d]"
                  : "border-[#e5eaf0] bg-[#f2f8fd]"
              }`}
            >
              {featured && (
                <span className="absolute top-6 right-6 rounded-full bg-[#ff6b00] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#ffffff]">
                  Popular
                </span>
              )}

              <p
                className={`m-0 font-display text-[clamp(22px,2.2vw,30px)] leading-tight ${
                  featured ? "text-[#ffffff]" : "text-[#071a3d]"
                }`}
              >
                {name}
              </p>

              <p
                className={`mt-3 text-[14px] leading-[1.6] ${
                  featured ? "text-[#ffffff]/60" : "text-[#5b6575]"
                }`}
              >
                {blurb}
              </p>

              <div
                className={`mt-7 flex items-baseline gap-3 border-t pt-7 ${
                  featured ? "border-[#ffffff]/15" : "border-[#e5eaf0]"
                }`}
              >
                <span
                  className={`font-display text-[clamp(26px,3vw,38px)] leading-none ${
                    featured ? "text-[#ffffff]" : "text-[#071a3d]"
                  }`}
                >
                  Coming soon
                </span>
              </div>

              <ul className="m-0 mt-7 flex list-none flex-col gap-3 p-0">
                {points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 text-[14px] leading-[1.6] ${
                      featured ? "text-[#ffffff]/70" : "text-[#5b6575]"
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        featured ? "text-[#087ef5]" : "text-[#087ef5]"
                      }`}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:hello@supermia.ai?subject=IntelliHire%20pricing"
                className={`group mt-9 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full px-6 text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  featured
                    ? "bg-[#ffffff] text-[#071a3d] hover:bg-[#087ef5] hover:text-[#ffffff]"
                    : "bg-[#071a3d] text-[#ffffff] hover:bg-[#087ef5]"
                }`}
              >
                <span className="text-inherit">Notify me</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
