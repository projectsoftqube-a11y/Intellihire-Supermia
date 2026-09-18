"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
  {
    index: "01",
    label: "Attract",
    short: "Reach the right talent",
    title: "Bring the right people closer.",
    copy: "Turn every role into a clear, compelling opportunity and reach talent where they already are.",
    image: "/images/flow-attract.png",
    alt: "Recruiter in a modern office atrium looking out toward the city",
  },
  {
    index: "02",
    label: "Screen",
    short: "Surface real potential",
    title: "See potential, not paperwork.",
    copy: "IntelliHire surfaces relevant experience and skills without losing the context behind each person.",
    image: "/images/flow-screen.png",
    alt: "Recruiter reviewing ranked candidate profiles on a large monitor",
  },
  {
    index: "03",
    label: "Assess",
    short: "Compare what matters",
    title: "Compare what matters.",
    copy: "Structured signals help teams evaluate capability consistently and build a stronger shortlist.",
    image: "/images/flow-assess.png",
    alt: "Two colleagues comparing candidate cards on a glass planning wall",
  },
  {
    index: "04",
    label: "Interview",
    short: "Talk to the right people",
    title: "Make every conversation count.",
    copy: "Smart coordination and focused insights keep interviews moving while people stay at the center.",
    image: "/images/flow-interview.png",
    alt: "Hiring manager listening attentively during a candidate interview",
  },
  {
    index: "05",
    label: "Hire",
    short: "Decide with confidence",
    title: "Move forward with confidence.",
    copy: "Bring the full hiring story together so decision-makers can act clearly, quickly, and fairly.",
    image: "/images/flow-hire.png",
    alt: "Hiring team welcoming a new colleague with a handshake",
  },
];

export default function HiringFlow() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from("[data-flow-heading] > *", {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-flow-mobile]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: "[data-flow-pin]",
          start: "top top",
          end: "+=3000",
          pin: "[data-flow-pin]",
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (self) =>
            setActive(
              Math.min(
                STAGES.length - 1,
                Math.floor(self.progress * STAGES.length * 0.999),
              ),
            ),
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      className="relative bg-brand-surface"
      id="how-it-works"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px] px-5 pt-20 pb-12 md:px-10 md:pt-28 md:pb-16">
        <div data-flow-heading className="max-w-[760px]">
          <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
            <span
              className="h-px w-10 shrink-0 bg-[#ff6b00]"
              aria-hidden="true"
            />
            The IntelliHire flow
          </p>

          <h2 className="mt-8 font-display text-[clamp(34px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
            From application
            <span className="block text-[#087ef5]">to the right hire.</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1920px] px-5 pb-20 md:px-10 md:pb-28 lg:hidden">
        <div className="mt-10 flex flex-col gap-16">
          {STAGES.map(({ index, label, title, copy, image, alt }, i) => (
            <article key={index} data-flow-mobile>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#071a3d]">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/55 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute bottom-5 left-5 flex items-end gap-3">
                  <span className="font-display text-[clamp(34px,11vw,48px)] leading-[0.8] text-[#ffffff]">
                    {index}
                  </span>
                  <span className="flex items-center gap-2.5 pb-1">
                    <span className="h-px w-6 bg-[#ff6b00]" aria-hidden="true" />
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]">
                      {label}
                    </span>
                  </span>
                </span>
              </div>

              <p className="m-0 mt-7 flex items-center gap-3 text-[11px] leading-none font-semibold tracking-[0.18em] uppercase text-[#087ef5]">
                <span className="h-px w-7 shrink-0 bg-[#ff6b00]" aria-hidden="true" />
                Stage {index} of 05
              </p>

              <h3 className="m-0 mt-4 font-display text-[clamp(26px,7.5vw,38px)] leading-[1.1] font-normal tracking-[-0.015em] text-[#071a3d]">
                {title}
              </h3>

              <p className="mt-4 text-[clamp(15px,4.2vw,18px)] leading-[1.65] text-[#5b6575]">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1920px] lg:block lg:px-0 lg:pb-24">
        <div
          data-flow-pin
          className="lg:flex lg:h-screen lg:items-stretch lg:pt-[72px]"
        >
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14 lg:pr-10">
            <div className="relative lg:col-span-6 lg:h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#071a3d] lg:aspect-auto lg:h-full">
                {STAGES.map(({ index, image, alt }, i) => (
                  <div
                    key={index}
                    className="absolute inset-0 overflow-hidden transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
                    style={{
                      transform: `translateY(${i <= active ? 0 : 100}%)`,
                      zIndex: i + 1,
                    }}
                  >
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ))}

                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-2/5 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/60 to-transparent"
                  aria-hidden="true"
                />

                <span className="absolute bottom-8 left-8 z-[21] flex items-end gap-4">
                  <span className="font-display text-[clamp(44px,5vw,72px)] leading-[0.8] text-[#ffffff]">
                    {STAGES[active].index}
                  </span>
                  <span className="flex items-center gap-3 pb-1.5">
                    <span
                      className="h-px w-8 bg-[#ff6b00]"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#ffffff]">
                      {STAGES[active].label}
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 py-2 lg:col-span-6 lg:h-full lg:py-10">
              <div>
                <p className="m-0 flex items-center gap-3 text-[11px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
                  <span
                    className="h-px w-8 shrink-0 bg-[#ff6b00]"
                    aria-hidden="true"
                  />
                  Stage {STAGES[active].index} of 05
                </p>

                <h3 className="m-0 mt-7 max-w-[600px] font-display text-[clamp(32px,3.8vw,60px)] leading-[1.04] font-normal tracking-[-0.015em] text-[#071a3d]">
                  {STAGES[active].title}
                </h3>

                <p className="mt-6 max-w-[520px] text-[clamp(16px,1.3vw,21px)] leading-[1.7] text-[#5b6575]">
                  {STAGES[active].copy}
                </p>
              </div>

              <ol className="m-0 flex list-none flex-col p-0">
                {STAGES.map(({ index, label, short }, i) => {
                  const isActive = i === active;
                  const done = i < active;
                  return (
                    <li
                      key={index}
                      className={`relative flex items-center gap-5 border-t border-[#e5eaf0] py-4 transition-all duration-500 last:border-b ${
                        isActive ? "pl-5" : "pl-0"
                      }`}
                    >
                      <span
                        className={`absolute top-0 bottom-0 left-0 w-[3px] origin-top bg-[#087ef5] transition-transform duration-500 ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                        aria-hidden="true"
                      />

                      <span
                        className={`font-display text-[15px] leading-none transition-colors duration-400 ${
                          isActive
                            ? "text-[#087ef5]"
                            : done
                              ? "text-[#071a3d]/50"
                              : "text-[#071a3d]/25"
                        }`}
                      >
                        {index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[clamp(16px,1.35vw,21px)] font-semibold transition-colors duration-400 ${
                            isActive
                              ? "text-[#071a3d]"
                              : done
                                ? "text-[#071a3d]/70"
                                : "text-[#071a3d]/35"
                          }`}
                        >
                          {label}
                        </span>
                        <span
                          className={`mt-1 block text-[14px] leading-[1.5] transition-colors duration-400 ${
                            isActive ? "text-[#5b6575]" : "text-[#071a3d]/30"
                          }`}
                        >
                          {short}
                        </span>
                      </span>

                      {done && (
                        <Check
                          className="h-4 w-4 shrink-0 text-[#087ef5]"
                          aria-hidden="true"
                        />
                      )}

                      {isActive && (
                        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ff6b00]">
                          Now
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <div className="flex items-center gap-5">
                <span
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#e5eaf0]"
                  aria-hidden="true"
                >
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-[#087ef5] to-[#ff6b00] transition-[width] duration-700 ease-out"
                    style={{
                      width: `${((active + 1) / STAGES.length) * 100}%`,
                    }}
                  />
                </span>
                <p className="m-0 text-[12px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase text-[#5b6575]">
                  Recruiter reviewed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
