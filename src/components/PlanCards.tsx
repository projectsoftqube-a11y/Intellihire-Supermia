"use client";

import { useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { PricingPlan } from "@/lib/billing";
import ContactSalesDialog from "@/components/ContactSalesDialog";

// Shared between the link and button variants of the card CTA so both render
// identically.
const ctaClass =
  "group/cta mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-2 focus-visible:outline-none";

const ctaFeaturedClass =
  "bg-brand-white text-brand-dark-blue ring-offset-brand-dark-blue hover:bg-brand-light-blue hover:text-brand-white";

const ctaDefaultClass =
  "bg-brand-dark-blue text-brand-white ring-offset-brand-surface hover:bg-brand-light-blue";

/**
 * The plan card grid, shared by the homepage pricing section and /pricing so
 * both always show the same plans from the billing API.
 */
export default function PlanCards({
  plans,
  headingLevel = "p",
}: {
  plans: PricingPlan[];
  /** /pricing renders plan names as H3s under its "Plans" H2. */
  headingLevel?: "p" | "h3";
}) {
  // Plan whose "Contact Sales" button opened the dialog, or null when closed.
  const [salesPlanId, setSalesPlanId] = useState<string | null>(null);
  const [salesOpen, setSalesOpen] = useState(false);

  const PlanName = headingLevel;

  return (
    <>
      <div className="mt-12 grid grid-cols-1 items-stretch gap-5 pt-4 md:mt-16 md:grid-cols-2 xl:grid-cols-4 xl:pt-8">
        {plans.map(
          ({ id, name, blurb, price, cadence, points, featured, isCustom, cta }) => {
            const notify = cta.href.startsWith("mailto:");
            return (
              <article
                data-pr-anim
                data-reveal
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
                  <PlanName
                    className={`m-0 font-display text-[clamp(22px,2.2vw,28px)] leading-tight font-normal ${
                      featured ? "text-brand-white" : "text-brand-dark-blue"
                    }`}
                  >
                    {name}
                  </PlanName>

                  <p
                    className={`mt-3 text-[13.5px] leading-[1.6] ${
                      featured ? "text-brand-white/65" : "text-brand-text-secondary"
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
                        featured ? "text-brand-white/60" : "text-brand-text-secondary"
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
                      <span className={included ? "" : "line-through"}>{label}</span>
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
                    className={`${ctaClass} ${featured ? ctaFeaturedClass : ctaDefaultClass}`}
                  >
                    <span className="text-inherit">{cta.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <a
                    href={notify ? cta.href.replace(/IntelliHire%20pricing$/, `IntelliHire%20pricing%20-%20${encodeURIComponent(name)}`) : cta.href}
                    data-track={notify ? "pricing_notify_click" : undefined}
                    className={`${ctaClass} ${featured ? ctaFeaturedClass : ctaDefaultClass}`}
                  >
                    <span className="text-inherit">{cta.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </article>
            );
          },
        )}
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
    </>
  );
}
