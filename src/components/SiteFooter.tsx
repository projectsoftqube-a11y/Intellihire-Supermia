"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, LogIn, Mail, MapPin } from "lucide-react";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/nav";
import {
  APP_LOGIN_URL,
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

type FooterColumn = (typeof FOOTER_COLUMNS)[number];
const column = (heading: string) => FOOTER_COLUMNS.find((c) => c.heading === heading)!;
const platform = column("Platform");
const useCases = column("Use Cases");
const resources = column("Resources");
const company = column("Company");

function ColumnHeading({ children }: { children: string }) {
  return (
    <p className="m-0 flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/60">
      <span className="h-px w-4 bg-[#ff6b00]" aria-hidden="true" />
      {children}
    </p>
  );
}

function FooterNav({ column: { heading, links } }: { column: FooterColumn }) {
  return (
    <nav data-ft-anim aria-label={`${heading} links`} className="min-w-0">
      <ColumnHeading>{heading}</ColumnHeading>
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
  );
}

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
          className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#066bd4]"
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
                    <span className="block font-display text-[13px] text-[#071a3d]/65">
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
          {/* Brand and account actions. */}
          <div data-ft-anim className="lg:col-span-4 lg:pr-12 xl:pr-16">
            <Image
              src="/images/logo.png"
              alt={BRAND_NAME}
              width={517}
              height={106}
              unoptimized
              className="block h-auto w-[170px] brightness-0 invert sm:w-[185px]"
            />
            <p className="mt-6 max-w-[360px] text-[15px] leading-[1.7] text-[#ffffff]/55">
              AI recruitment software that reads every application, runs
              first-round interviews and cites the evidence. Your team makes
              every hiring decision.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={DEMO_URL}
                data-track="book_demo_click"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#ffffff] px-5 text-[14px] font-semibold text-[#071a3d] transition-colors duration-200 hover:bg-[#087ef5] hover:text-[#ffffff]"
              >
                Book a demo
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={APP_LOGIN_URL}
                data-track="login_click"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#ffffff]/20 px-5 text-[14px] font-semibold text-[#ffffff] transition-colors duration-200 hover:border-[#087ef5] hover:text-[#087ef5]"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Log in
              </a>
            </div>
          </div>

          {/* Site links in three columns of similar height: the long
              Platform list, then the shorter groups stacked in pairs. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:col-span-8 lg:border-l lg:border-[#ffffff]/10 lg:pl-12 xl:pl-16">
            <FooterNav column={platform} />
            <div className="flex min-w-0 flex-col gap-10">
              <FooterNav column={useCases} />
              <FooterNav column={company} />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-10 sm:col-span-1 sm:flex sm:flex-col">
              <FooterNav column={resources} />
              <div data-ft-anim className="col-span-2 min-w-0 min-[420px]:col-span-1">
                <ColumnHeading>Get in touch</ColumnHeading>
                <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                  <li className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-[#ffffff]/70">
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
                      className="inline-flex items-center gap-2.5 text-[14px] font-semibold break-all text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-[#087ef5]" aria-hidden="true" />
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          data-ft-anim
          className="mt-12 flex flex-col gap-4 border-t border-[#ffffff]/12 pt-7 text-[13px] leading-[1.6] text-[#ffffff]/55 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
        >
          {/* The copyright shares a line with the brand rather than repeating
              the brand name in a separate block. */}
          <p className="m-0">
            {/* The year is baked into statically built pages, so the browser
                can compute a newer one after New Year; let that text differ. */}
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
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
          </p>

          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="transition-colors duration-200 hover:text-[#087ef5]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="m-0">
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
