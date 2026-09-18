"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOOTER_LINKS = [
  {
    title: "Platform",
    links: [
      { label: "AI voice interviews", href: "/#features" },
      { label: "Resume parsing", href: "/#features" },
      { label: "Candidate matching", href: "/#features" },
      { label: "Scorecards", href: "/#features" },
      { label: "Interview proctoring", href: "/#features" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "The hiring gap", href: "/#solutions" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Human oversight", href: "/#oversight" },
      { label: "All capabilities", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
];

const PIPELINE = [
  { stage: "01", label: "The hiring gap", href: "/#solutions" },
  { stage: "02", label: "How it works", href: "/#how-it-works" },
  { stage: "03", label: "The platform", href: "/#features" },
  { stage: "04", label: "Get in touch", href: "mailto:hello@supermia.ai" },
];

export default function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set("[data-ft-anim]", { opacity: 1, y: 0 });

      gsap.fromTo(
        "[data-ft-anim]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-ft-track]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 92%",
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <footer
      className="relative bg-brand-surface px-5 pt-20 pb-10 md:px-10 md:pt-24"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px]">
        <p
          data-ft-anim
          className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]"
        >
          <span className="h-px w-10 shrink-0 bg-[#ff6b00]" aria-hidden="true" />
          Where this goes next
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-4">
          {PIPELINE.map(({ stage, label, href }, i) => (
            <a
              data-ft-anim
              key={stage}
              href={href}
              className="group relative block"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-[#e5eaf0]">
                <span
                  data-ft-track
                  className={`block h-full rounded-full ${
                    i === PIPELINE.length - 1
                      ? "bg-[#ff6b00]"
                      : "bg-[#087ef5]"
                  }`}
                />
              </span>

              <span className="mt-5 flex items-start justify-between gap-4">
                <span>
                  <span className="block font-display text-[13px] text-[#071a3d]/35">
                    {stage}
                  </span>
                  <span className="mt-2 block font-display text-[clamp(22px,2.2vw,32px)] leading-[1.2] text-[#071a3d] transition-colors duration-300 group-hover:text-[#087ef5]">
                    {label}
                  </span>
                </span>

                <ArrowUpRight
                  className="mt-6 h-5 w-5 shrink-0 text-[#071a3d]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#087ef5]"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1920px] overflow-hidden rounded-[34px] bg-[#071a3d] px-7 py-14 md:mt-20 md:px-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div data-ft-anim className="sm:col-span-2 lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt="IntelliHire"
              width={517}
              height={106}
              className="block h-auto w-[185px] brightness-0 invert"
            />
            <p className="mt-6 max-w-[320px] text-[15px] leading-[1.7] text-[#ffffff]/55">
              AI-powered recruitment that finds, evaluates and connects you with
              the right talent, faster.
            </p>

            <a
              href="mailto:hello@supermia.ai"
              className="mt-7 inline-flex items-center gap-2.5 text-[15px] font-semibold text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
            >
              <Mail className="h-4 w-4 text-[#087ef5]" aria-hidden="true" />
              hello@supermia.ai
            </a>
          </div>

          {FOOTER_LINKS.map(({ title, links }) => (
            <div data-ft-anim key={title} className="lg:col-span-3">
              <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/40">
                {title}
              </p>
              <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[14px] text-[#ffffff]/70 transition-colors duration-200 hover:text-[#087ef5]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-ft-anim className="lg:col-span-2">
            <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/40">
              Office
            </p>
            <p className="mt-5 m-0 text-[14px] leading-[1.6] text-[#ffffff]/70">
              2451 W Grapevine Mills Cir #547
              <span className="block">Grapevine, TX 76051</span>
            </p>
            <a
              href="https://supermia.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[14px] font-semibold text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
            >
              supermia.ai
            </a>
          </div>
        </div>

        <div
          data-ft-anim
          className="mt-12 flex flex-col gap-4 border-t border-[#ffffff]/12 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="m-0 text-[13px] text-[#ffffff]/55">
            © {new Date().getFullYear()} IntelliHire. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="/privacy"
              className="text-[13px] text-[#ffffff]/55 transition-colors duration-200 hover:text-[#087ef5]"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[13px] text-[#ffffff]/55 transition-colors duration-200 hover:text-[#087ef5]"
            >
              Terms &amp; Conditions
            </a>

            <span
              className="hidden h-4 w-px bg-[#ffffff]/15 sm:block"
              aria-hidden="true"
            />

            <p className="m-0 text-[13px] text-[#ffffff]/55">
              by{" "}
              <a
                href="https://supermia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
              >
                SuperMIA
              </a>
              <span className="mx-1.5">·</span>
              <a
                href="https://botfinity.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[#087ef5]"
              >
                Botfinity Inc.
              </a>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
