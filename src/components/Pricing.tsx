"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { PricingPlan } from "@/lib/billing";
import ContactSalesDialog from "@/components/ContactSalesDialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared between the link and button variants of the card CTA so both render
// identically.
const ctaClass =
  "group/cta mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-2 focus-visible:outline-none";

const ctaFeaturedClass =
  "bg-brand-white text-brand-dark-blue ring-offset-brand-dark-blue hover:bg-brand-light-blue hover:text-brand-white";

const ctaDefaultClass =
  "bg-brand-dark-blue text-brand-white ring-offset-brand-surface hover:bg-brand-light-blue";

export default function Pricing({ plans }: { plans: PricingPlan[] }) {
  const root = useRef<HTMLElement>(null);

  // Plan whose "Contact Sales" button opened the dialog, or null when closed.
  const [salesPlanId, setSalesPlanId] = useState<string | null>(null);
  const [salesOpen, setSalesOpen] = useState(false);

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
            Start free and scale as your hiring grows. Every plan includes
            resume screening, AI interviews and evidence-backed scorecards.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 pt-4 md:mt-16 md:grid-cols-2 xl:grid-cols-4 xl:pt-8">
          {plans.map(
            ({
              id,
              name,
              blurb,
              price,
              cadence,
              points,
              featured,
              isCustom,
              cta,
            }) => (
              <article
                data-pr-anim
                key={id}
                className={`group/card relative flex h-full flex-col rounded-[26px] border p-7 transition-all duration-300 md:p-8 ${
                  featured
                    ? "border-brand-light-blue bg-brand-dark-blue shadow-[0_18px_50px_-12px_rgba(7,26,61,0.45)] xl:-translate-y-2"
                    : "border-brand-border bg-brand-surface hover:border-brand-light-blue/40 hover:shadow-[0_14px_40px_-16px_rgba(7,26,61,0.25)]"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-brand-white shadow-[0_6px_16px_-4px_rgba(255,107,0,0.6)] md:left-8">
                    Most Popular
                  </span>
                )}

                {/* Header: name + blurb. Fixed min-height keeps the price row
                    aligned across cards whose descriptions differ in length. */}
                <div className="min-h-[104px]">
                  <p
                    className={`m-0 font-display text-[clamp(22px,2.2vw,28px)] leading-tight ${
                      featured ? "text-brand-white" : "text-brand-dark-blue"
                    }`}
                  >
                    {name}
                  </p>

                  <p
                    className={`mt-3 text-[13.5px] leading-[1.6] ${
                      featured
                        ? "text-brand-white/65"
                        : "text-brand-text-secondary"
                    }`}
                  >
                    {blurb}
                  </p>
                </div>

                <div
                  className={`mt-6 flex items-baseline gap-2 border-t pt-6 ${
                    featured ? "border-brand-white/15" : "border-brand-border"
                  }`}
                >
                  <span
                    className={`font-display text-[clamp(28px,3vw,38px)] leading-none ${
                      featured ? "text-brand-white" : "text-brand-dark-blue"
                    }`}
                  >
                    {price}
                  </span>
                  {cadence && (
                    <span
                      className={`text-[13px] leading-none ${
                        featured
                          ? "text-brand-white/60"
                          : "text-brand-text-secondary"
                      }`}
                    >
                      {cadence}
                    </span>
                  )}
                </div>

                {/* flex-1 pushes the CTA to the bottom so every button aligns
                    on one line regardless of how many features a plan lists. */}
                <ul className="m-0 mt-6 flex flex-1 list-none flex-col gap-2.5 p-0">
                  {points.map(({ label, included }) => (
                    <li
                      key={label}
                      className={`flex items-start gap-2.5 text-[13.5px] leading-[1.55] ${
                        included
                          ? featured
                            ? "text-brand-white/75"
                            : "text-brand-text-secondary"
                          : featured
                            ? "text-brand-white/35"
                            : "text-[#9aa3b2]"
                      }`}
                    >
                      {included ? (
                        <Check
                          className="mt-0.75 h-3.75 w-3.75 shrink-0 text-brand-light-blue"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className={`mt-0.75 h-3.75 w-3.75 shrink-0 ${
                            featured ? "text-brand-white/30" : "text-[#b9c0cc]"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {included ? "Included:" : "Not included:"}
                      </span>
                      <span className={included ? "" : "line-through"}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                {isCustom ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSalesPlanId(id || null);
                      setSalesOpen(true);
                    }}
                    className={`${ctaClass} ${
                      featured ? ctaFeaturedClass : ctaDefaultClass
                    }`}
                  >
                    <span className="text-inherit">{cta.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <a
                    href={cta.href}
                    className={`${ctaClass} ${
                      featured ? ctaFeaturedClass : ctaDefaultClass
                    }`}
                  >
                    <span className="text-inherit">{cta.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </article>
            ),
          )}
        </div>
      </div>

      {/* Keyed by plan so each open mounts a fresh, empty form. */}
      {salesOpen && (
        <ContactSalesDialog
          key={salesPlanId ?? "custom"}
          open
          onClose={() => setSalesOpen(false)}
          planId={salesPlanId}
        />
      )}
    </section>
  );
}
