"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import type { PlanLimits } from "@/lib/billing";

/** The plan fields the calculator needs, passed from the server page. */
export type CalculatorPlan = {
  id: string;
  name: string;
  monthlyCost: number | null;
  currency: string;
  trialDays: number;
  isCustom: boolean;
  limits: PlanLimits | null;
};

const money = (value: number, currency: string, cents = false) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    }).format(value);
  } catch {
    return `$${value.toFixed(cents ? 2 : 0)}`;
  }
};

function Field({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? Math.round(n) : min));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] font-semibold text-[#071a3d]">
          {label}
        </label>
        <input
          type="number"
          inputMode="numeric"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="w-[84px] rounded-lg border border-[#e5eaf0] bg-[#ffffff] px-2.5 py-1.5 text-right font-display text-[18px] text-[#071a3d] outline-none focus:border-[#087ef5] focus:ring-2 focus:ring-[#087ef5]/20"
        />
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="mt-3 w-full accent-[#087ef5]"
      />
      <p className="m-0 mt-1 text-[12.5px] text-[#5b6575]">{hint}</p>
    </div>
  );
}

/**
 * Works out cost per AI interview on IntelliHire's live plans. Everything is
 * computed from the billing API's published prices and limits; nothing is
 * estimated beyond the visitor's own inputs.
 */
export default function CostCalculator({ plans }: { plans: CalculatorPlan[] }) {
  const [interviews, setInterviews] = useState(20);
  const [minutes, setMinutes] = useState(15);
  const [users, setUsers] = useState(2);

  const paid = plans
    .filter((p) => !p.isCustom && p.monthlyCost !== null && p.monthlyCost > 0 && p.limits)
    .sort((a, b) => a.monthlyCost! - b.monthlyCost!);
  const trial = plans.find((p) => p.monthlyCost === 0 && p.trialDays > 0 && p.limits);
  const custom = plans.find((p) => p.isCustom);

  if (paid.length === 0) {
    return (
      <div className="rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-6 text-[15px] leading-[1.7] text-[#5b6575] md:p-8">
        Plan limits are not published right now, so the calculator cannot run. See{" "}
        <Link href="/pricing" className="font-semibold text-[#066bd4] underline underline-offset-4">
          IntelliHire pricing
        </Link>{" "}
        or book a demo for a quote.
      </div>
    );
  }

  const needed = interviews * minutes;
  const rows = paid.map((plan) => {
    const limits = plan.limits!;
    const covers = Math.floor(limits.aiInterviewMinutes / minutes);
    // Every interviewed candidate needs a candidate profile, so that limit
    // counts too.
    const fits =
      limits.aiInterviewMinutes >= needed &&
      limits.users >= users &&
      limits.candidateProfiles >= interviews;
    return { plan, limits, covers, fits, perInterview: plan.monthlyCost! / interviews };
  });
  const best = rows.find((r) => r.fits) ?? null;
  const currency = paid[0].currency;

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_24px_60px_-36px_rgba(7,26,61,0.35)]">
      <div className="grid gap-6 p-6 md:p-8">
        <Field
          label="Interviews per month"
          hint="First-round AI interviews you expect to run."
          value={interviews}
          min={1}
          max={500}
          onChange={setInterviews}
        />
        <Field
          label="Minutes per interview"
          hint="How long a first round should take for the role."
          value={minutes}
          min={5}
          max={60}
          onChange={setMinutes}
        />
        <Field
          label="People who need access"
          hint="Recruiters and hiring managers who log in."
          value={users}
          min={1}
          max={50}
          onChange={setUsers}
        />
      </div>

      {/* Result */}
      <div className="border-t border-[#e5eaf0] bg-[#071a3d] p-6 text-[#ffffff] md:p-8" aria-live="polite">
        <p className="m-0 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/65">
          {needed.toLocaleString("en-US")} AI interview minutes a month
        </p>
        {best ? (
          <>
            <p className="m-0 mt-3 font-display text-[clamp(28px,3vw,40px)] leading-tight">
              {money(best.perInterview, currency, true)}{" "}
              <span className="text-[16px] text-[#ffffff]/70">per interview</span>
            </p>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-[#ffffff]/75">
              on the {best.plan.name} plan at {money(best.plan.monthlyCost!, currency)} a month, which includes{" "}
              {best.limits.aiInterviewMinutes.toLocaleString("en-US")} AI interview minutes and{" "}
              {best.limits.users} {best.limits.users === 1 ? "user" : "users"}.
            </p>
          </>
        ) : (
          <>
            <p className="m-0 mt-3 font-display text-[clamp(26px,2.8vw,36px)] leading-tight">
              {custom ? `${custom.name} fits this volume` : "This volume needs a custom plan"}
            </p>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-[#ffffff]/75">
              Your inputs exceed the largest published plan. {custom ? custom.name : "A custom plan"} sets limits to your
              volume; book a demo for a quote.
            </p>
          </>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={best ? "/pricing" : "/book-a-demo"}
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#ffffff] px-6 text-[14px] font-semibold text-[#071a3d] transition-colors hover:bg-[#087ef5] hover:text-[#ffffff]"
          >
            {best ? `See the ${best.plan.name} plan` : "Book a demo"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          {best && (
            <Link href="/book-a-demo" className="text-[14px] font-semibold text-[#ffffff] underline decoration-[#5aa9ff] underline-offset-4 hover:text-[#5aa9ff]">
              Or book a demo
            </Link>
          )}
        </div>
      </div>

      {/* Every plan, so the visitor can see why one fits */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
          <caption className="sr-only">How each IntelliHire plan covers your inputs</caption>
          <thead>
            <tr className="border-b border-[#e5eaf0] text-[11px] tracking-[0.12em] uppercase text-[#071a3d]/65">
              <th scope="col" className="px-6 py-3 font-semibold">Plan</th>
              <th scope="col" className="px-3 py-3 font-semibold">Per month</th>
              <th scope="col" className="px-3 py-3 font-semibold">Covers</th>
              <th scope="col" className="px-3 py-3 font-semibold">Users</th>
              <th scope="col" className="px-6 py-3 font-semibold">Fits</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.plan.id} className={`border-b border-[#e5eaf0] last:border-0 ${r === best ? "bg-[#087ef5]/[0.05]" : ""}`}>
                <th scope="row" className="px-6 py-3 font-semibold text-[#071a3d]">{r.plan.name}</th>
                <td className="px-3 py-3 text-[#071a3d]">{money(r.plan.monthlyCost!, currency)}</td>
                <td className="px-3 py-3 text-[#5b6575]">
                  {r.covers} interviews of {minutes} min
                </td>
                <td className="px-3 py-3 text-[#5b6575]">{r.limits.users}</td>
                <td className="px-6 py-3">
                  {r.fits ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#0f8a52]">
                      <Check className="h-4 w-4" aria-hidden="true" /> Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[#5b6575]">
                      <Minus className="h-4 w-4" aria-hidden="true" /> No
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {trial?.limits && (
        <p className="m-0 border-t border-[#e5eaf0] px-6 py-4 text-[13.5px] leading-[1.6] text-[#5b6575]">
          Try it first: the {trial.name} plan runs for {trial.trialDays} days with{" "}
          {trial.limits.aiInterviewMinutes} AI interview minutes, enough to price one real role.
        </p>
      )}
    </div>
  );
}
