"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/nav";
import {
  ADDRESS_LINE,
  BRAND_NAME,
  CONTACT_EMAIL,
  DEMO_URL,
  LEGAL_NAME,
  SUPERMIA_URL,
} from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIPELINE = [
  { stage: "01", label: "How it works", href: "/#how-it-works" },
  { stage: "02", label: "Compare plans", href: "/pricing" },
  { stage: "03", label: "Questions, answered", href: "/faq" },
  { stage: "04", label: "Book a demo", href: DEMO_URL },
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
      className="relative bg-brand-surface px-4 pt-20 pb-10 sm:px-5 md:px-10 md:pt-24"
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

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map(({ stage, label, href }, i) => {
            const external = href.startsWith("http");
            const className = "group relative block";
            const content = (
              <>
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-[#e5eaf0]">
                  <span
                    data-ft-track
                    className={`block h-full rounded-full ${
                      i === PIPELINE.length - 1 ? "bg-[#ff6b00]" : "bg-[#087ef5]"
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
              </>
            );

            return external ? (
              <a
                data-ft-anim
                key={stage}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-track="book_demo_click"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link data-ft-anim key={stage} href={href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1920px] overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-12 sm:rounded-[34px] sm:px-7 sm:py-14 md:mt-20 md:px-14 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-12 lg:gap-10">
          <div data-ft-anim className="col-span-2 lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt={BRAND_NAME}
              width={517}
              height={106}
              className="block h-auto w-[170px] brightness-0 invert sm:w-[185px]"
            />
            <p className="mt-6 max-w-[340px] text-[15px] leading-[1.7] text-[#ffffff]/55">
              AI recruitment software that reads every application, runs
              first-round interviews and cites the evidence. Your team makes
              every hiring decision.
            </p>

            <ul className="m-0 mt-7 flex list-none flex-col gap-4 p-0">
              <li className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#ffffff]/70">
                <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                <span>
                  2451 W Grapevine Mills Cir #547
                  <span className="block">Grapevine, TX 76051</span>
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  data-track="contact_email_click"
                  className="inline-flex items-center gap-3 text-[14px] font-semibold break-all text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {FOOTER_COLUMNS.map(({ heading, links }) => (
            <nav
              data-ft-anim
              key={heading}
              aria-label={`${heading} links`}
              className="min-w-0 lg:col-span-2"
            >
              <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/40">
                {heading}
              </p>
              <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                {links.map(({ label, href, external, track }) => {
                  const className =
                    "text-[14px] leading-[1.45] break-words text-[#ffffff]/70 transition-colors duration-200 hover:text-[#087ef5]";
                  return (
                    <li key={`${heading}-${label}`}>
                      {external || href.startsWith("mailto:") ? (
                        <a
                          href={href}
                          className={className}
                          data-track={track}
                          {...(external && !href.startsWith("https://app.")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={href} className={className}>
                          {label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div
          data-ft-anim
          className="mt-12 flex flex-col gap-4 border-t border-[#ffffff]/12 pt-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="m-0 text-[13px] leading-[1.6] text-[#ffffff]/55">
            <a
              href={SUPERMIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
            >
              {BRAND_NAME}
            </a>
            <span className="mx-1.5" aria-hidden="true">·</span>
            {LEGAL_NAME}
            <span className="mx-1.5" aria-hidden="true">·</span>
            {ADDRESS_LINE}
          </p>

          <p className="m-0 text-[13px] text-[#ffffff]/55">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>

          <p className="m-0 text-[13px] text-[#ffffff]/55">
            Design &amp; Develop by{" "}
            <a
              href="https://softqubes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
            >
              Softqube Technologies LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
