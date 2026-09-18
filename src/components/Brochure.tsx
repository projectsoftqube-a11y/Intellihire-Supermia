"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Download, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BROCHURE_URL = "/images/IntelliHire.pdf";

const CHAPTERS = [
  {
    index: "01",
    title: "The hiring gap",
    copy: "Why volume and manual screening slow great teams down.",
  },
  {
    index: "02",
    title: "The IntelliHire flow",
    copy: "Attract, screen, assess, interview and hire, step by step.",
  },
  {
    index: "03",
    title: "Human oversight",
    copy: "Where the AI hands off and your team makes the call.",
  },
  {
    index: "04",
    title: "Platform & security",
    copy: "Every capability, integration and compliance control.",
  },
];

const PERKS = ["Free to share", "No sign-up required"];

export default function Brochure() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-br-head] > *", {
        y: 32,
        opacity: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: "[data-br-stage]",
            start: "top 78%",
            once: true,
          },
        })
        .from("[data-br-cover]", {
          y: 90,
          rotation: 6,
          opacity: 0,
          duration: 1.1,
        })
        .from(
          "[data-br-sheet]",
          { x: 0, y: 0, rotation: 0, opacity: 0, stagger: 0.12, duration: 0.9 },
          "-=0.7",
        )
        .from(
          "[data-br-chip]",
          {
            scale: 0.6,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "back.out(1.8)",
          },
          "-=0.5",
        );

      gsap.to("[data-br-chip]", {
        y: -10,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });

      gsap.to("[data-br-glow]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.from("[data-br-chapter]", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-br-chapters]",
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      className="relative bg-brand-surface px-5 py-20 md:px-10 md:py-28"
      id="brochure"
      ref={root}
    >
      <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[34px] bg-[#071a3d]">
        <span
          data-br-glow
          className="pointer-events-none absolute top-[8%] right-[6%] h-[460px] w-[460px] rounded-full bg-[#087ef5]/20 blur-[130px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-[-10%] left-[-6%] h-[360px] w-[360px] rounded-full bg-[#ff6b00]/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 items-center lg:grid-cols-12">
          <div
            data-br-head
            className="px-7 pt-14 md:px-14 md:pt-20 lg:col-span-6 lg:py-24"
          >
            <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#ffffff]/90">
              <span
                className="h-px w-10 shrink-0 bg-[#ff6b00]"
                aria-hidden="true"
              />
              The IntelliHire brochure
            </p>

            <h2 className="mt-8 font-display text-[clamp(34px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
              Share IntelliHire
              <span className="block text-[#087ef5]">
                with your whole team<span className="text-[#ff6b00]">.</span>
              </span>
            </h2>

            <p className="mt-8 max-w-[520px] text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-[#ffffff]/65">
              A concise, print-ready overview of the platform, the hiring flow
              and how human oversight works. Built for everyone who has a say in
              how your team hires.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                className="group inline-flex min-h-[58px] items-center gap-4 rounded-full bg-[#ffffff] py-2 pr-2 pl-8 text-[15px] font-semibold text-[#071a3d] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:text-[#ffffff] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)]"
                href={BROCHURE_URL}
                download
              >
                <span className="text-[#071a3d] group-hover:text-[#ffffff]">
                  Download brochure
                </span>
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#071a3d] text-[#ffffff] transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:text-[#087ef5]">
                  <Download
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>

              <a
                className="group relative inline-flex items-center gap-2 pb-1 text-[15px] font-semibold text-[#ffffff] transition-opacity duration-300 hover:opacity-80"
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in browser
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-[#ffffff]/40 transition-transform duration-300 group-hover:scale-x-0" />
              </a>
            </div>

            <ul className="m-0 mt-12 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-[#ffffff]/12 p-0 pt-8">
              <li className="flex items-center gap-2.5 text-[13px] text-[#ffffff]/55">
                <FileText
                  className="h-4 w-4 shrink-0 text-[#087ef5]"
                  aria-hidden="true"
                />
                PDF format
              </li>
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2.5 text-[13px] text-[#ffffff]/55"
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-[#087ef5]"
                    aria-hidden="true"
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-br-stage
            className="relative flex min-h-[440px] items-center justify-center px-5 py-16 sm:min-h-[540px] md:px-14 lg:col-span-6 lg:min-h-[660px] lg:py-20"
          >
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffffff]/10 sm:h-[480px] sm:w-[480px] lg:h-[560px] lg:w-[560px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffffff]/[0.06] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]"
              aria-hidden="true"
            />

            <div
              role="img"
              aria-label="Preview of the IntelliHire product brochure cover"
              className="group relative aspect-[210/297] w-[200px] sm:w-[260px] md:w-[280px] xl:w-[320px]"
            >
              <div
                data-br-sheet
                className="absolute inset-0"
                style={{ transform: "translate(26px, 8px) rotate(8deg)" }}
              >
                <div className="h-full w-full rounded-[14px] bg-[#087ef5] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:rotate-2" />
              </div>

              <div
                data-br-sheet
                className="absolute inset-0"
                style={{ transform: "translate(12px, 3px) rotate(4deg)" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#e5eaf0] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:rotate-1">
                  <span className="absolute top-[14%] right-4 flex w-10 flex-col gap-2">
                    <span className="h-1 w-full rounded-full bg-[#087ef5]/40" />
                    <span className="h-1 w-4/5 rounded-full bg-[#071a3d]/10" />
                    <span className="h-1 w-full rounded-full bg-[#071a3d]/10" />
                    <span className="h-1 w-3/5 rounded-full bg-[#071a3d]/10" />
                  </span>
                </div>
              </div>

              <div
                data-br-cover
                className="absolute inset-0"
                style={{ transform: "rotate(-3deg)" }}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-[#ffffff] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-1">
                  <span
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-[#071a3d]/15 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <Image
                        src="/images/logo.png"
                        alt=""
                        width={517}
                        height={106}
                        className="block h-auto w-[76px] sm:w-[92px]"
                      />
                      <span className="text-[8px] font-semibold tracking-[0.18em] uppercase text-[#5b6575] sm:text-[9px]">
                        Brochure
                      </span>
                    </div>

                    <p className="m-0 mt-6 flex items-center gap-2 text-[8px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5] sm:mt-8 sm:text-[9px]">
                      <span
                        className="h-px w-5 shrink-0 bg-[#ff6b00]"
                        aria-hidden="true"
                      />
                      Product overview
                    </p>

                    <p className="m-0 mt-3 font-display text-[20px] leading-[1.04] tracking-[-0.02em] text-[#071a3d] sm:text-[25px] xl:text-[28px]">
                      Smarter hiring
                      <span className="block text-[#087ef5]">
                        for a brighter tomorrow
                        <span className="text-[#ff6b00]">.</span>
                      </span>
                    </p>
                  </div>

                  <div className="relative mx-2.5 mt-5 mb-2.5 flex-1 overflow-hidden rounded-[10px] bg-[#071a3d]">
                    <Image
                      src="/images/hero-candidate.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 640px) 200px, 320px"
                      className="object-cover object-top"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/30 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                      <span className="text-[7px] font-semibold tracking-[0.14em] uppercase text-[#ffffff]/75 sm:text-[8px]">
                        intellihire.supermia.ai
                      </span>
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div
                data-br-chip
                className="absolute top-[58%] -left-6 z-20 flex items-center gap-2.5 rounded-full border border-[#ffffff]/15 bg-[#0d2754]/90 py-2 pr-4 pl-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur sm:-left-14"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#087ef5]">
                  <FileText
                    className="h-3.5 w-3.5 text-[#ffffff]"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[12px] font-semibold whitespace-nowrap text-[#ffffff]">
                  PDF brochure
                </span>
              </div>

              <div
                data-br-chip
                className="absolute -right-6 -bottom-6 z-20 rounded-2xl bg-[#ff6b00] px-4 py-3 shadow-[0_16px_36px_rgba(255,107,0,0.35)] sm:-right-12 sm:bottom-[14%]"
              >
                <span className="block font-display text-[28px] leading-none text-[#ffffff]">
                  0{CHAPTERS.length}
                </span>
                <span className="mt-1 block text-[10px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/85">
                  Chapters
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-[#ffffff]/10">
          <p className="m-0 flex items-center gap-3 px-7 pt-10 text-[12px] leading-none font-semibold tracking-[0.18em] uppercase text-[#ffffff]/40 md:px-14">
            Inside the brochure
          </p>

          <div
            data-br-chapters
            className="mt-8 grid grid-cols-1 gap-px border-t border-[#ffffff]/10 bg-[#ffffff]/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CHAPTERS.map(({ index, title, copy }) => (
              <article
                key={index}
                className="group bg-[#071a3d] px-7 py-8 transition-colors duration-300 hover:bg-[#0e2248] md:px-14 md:py-10 lg:px-10 xl:px-14"
              >
                <div data-br-chapter>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-[15px] leading-none text-[#087ef5]">
                      {index}
                    </span>
                    <span
                      className="h-px w-8 origin-right bg-[#ff6b00] transition-transform duration-300 group-hover:scale-x-150"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="m-0 mt-6 text-[clamp(18px,1.45vw,22px)] leading-snug font-semibold text-[#ffffff]">
                    {title}
                  </h3>
                  <p className="mt-2.5 max-w-[320px] text-[14px] leading-[1.6] text-[#ffffff]/55">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
