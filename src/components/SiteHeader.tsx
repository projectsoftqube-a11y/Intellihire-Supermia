"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { label: "The Hiring Gap", href: "/#solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Platform", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact Us", href: "/#contact" },
];

export default function SiteHeader() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-hd-item]", {
        y: -18,
        opacity: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!panel.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (menuOpen) {
        gsap.set(panel.current, { pointerEvents: "auto" });
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            panel.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55 },
          )
          .fromTo(
            "[data-hd-link]",
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.07, duration: 0.45 },
            "-=0.3",
          );
      } else {
        gsap.to(panel.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            if (panel.current) {
              gsap.set(panel.current, { pointerEvents: "none" });
            }
          },
        });
      }
    },
    { dependencies: [menuOpen], scope: root },
  );

  return (
    <header
      ref={root}
      className={`fixed top-0 left-1/2 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between gap-4 border-b px-4 transition-all duration-300 sm:px-6 md:gap-8 md:px-10 ${
        menuOpen
          ? "border-transparent bg-transparent py-4"
          : scrolled
            ? "border-[#e5eaf0] bg-[#f2f8fd] py-3 shadow-[0_6px_24px_rgba(7,26,61,0.08)]"
            : "border-transparent bg-[#f2f8fd] py-4 md:py-5"
      }`}
    >
      <Link
        data-hd-item
        href="/"
        aria-label="IntelliHire home"
        className="relative z-[60] shrink-0 transition-transform duration-300 hover:scale-[1.03]"
      >
        <Image
          className={`block h-auto transition-all duration-300 ${
            menuOpen ? "brightness-0 invert" : ""
          } ${
            scrolled
              ? "w-[112px] sm:w-[150px] md:w-[170px]"
              : "w-[120px] sm:w-[165px] md:w-[200px]"
          }`}
          src="/images/logo.png"
          alt="IntelliHire"
          width={517}
          height={106}
          priority
        />
      </Link>

      <nav
        data-hd-item
        className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-11"
        aria-label="Primary navigation"
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="group relative overflow-hidden py-1 text-[14px] font-medium whitespace-nowrap text-brand-dark-blue xl:text-[15px]"
          >
            <span className="relative inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              <span className="block">{label}</span>
              <span className="absolute top-full left-0 block text-brand-light-blue">
                {label}
              </span>
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-brand-light-blue transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <div data-hd-item className="flex shrink-0 items-center gap-2 sm:gap-3">
        <a
          className="group relative hidden min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#071a3d] px-6 text-[14px] font-semibold text-[#ffffff] shadow-[0_6px_20px_rgba(7,26,61,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)] sm:inline-flex lg:min-h-[52px] lg:px-8 lg:text-[15px]"
          href="http://app.IntelliHire.supermia.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-[#ffffff]">Login</span>
          <ArrowRight
            className="h-4 w-4 text-[#ffffff] transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>

        <button
          className={`relative z-[60] grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-all duration-300 sm:h-12 sm:w-12 lg:hidden ${
            menuOpen
              ? "bg-[#ffffff] text-[#071a3d]"
              : "bg-[#071a3d] text-[#ffffff] hover:bg-[#087ef5]"
          }`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        ref={panel}
        className="fixed inset-x-0 top-0 -z-10 h-[100dvh] bg-[#071a3d] lg:hidden"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-5 pt-24 pb-8 sm:px-8 sm:pt-28">
          <nav
            className="flex flex-col"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <a
                data-hd-link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between gap-3 border-b border-[#ffffff]/12 py-4 text-[#ffffff] sm:py-5"
              >
                <span className="flex min-w-0 flex-1 items-baseline gap-3 sm:gap-4">
                  <span className="shrink-0 font-display text-[11px] text-[#ffffff]/35 sm:text-[12px]">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 font-display text-[clamp(18px,5.5vw,30px)] leading-tight break-words">
                    {label}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[#087ef5] transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div data-hd-link className="mt-8">
            <a
              href="http://app.IntelliHire.supermia.ai/"
          target="_blank"
          rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#ffffff] px-6 text-[15px] font-semibold text-[#071a3d] transition-colors duration-300 hover:bg-[#087ef5] hover:text-[#ffffff]"
            >
              <span>Login</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <p className="mt-6 m-0 text-[13px] break-words text-[#ffffff]/45">
              hello@supermia.ai
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
