"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  PLATFORM_COLUMNS,
  PLATFORM_FOOTER,
  PLATFORM_LINKS,
  TOP_LINKS,
  USE_CASE_LINKS,
  isActivePath,
  type NavLink,
} from "@/lib/nav";
import { APP_LOGIN_URL, BRAND_NAME, CONTACT_EMAIL, DEMO_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP);

type DropdownKey = "platform" | "use-cases";

const MOBILE_SECTIONS: { key: DropdownKey; label: string; links: NavLink[] }[] = [
  { key: "platform", label: "Platform", links: [...PLATFORM_LINKS, PLATFORM_FOOTER[1]] },
  { key: "use-cases", label: "Use Cases", links: USE_CASE_LINKS },
];

/** Desktop label with the homepage's slide-up hover effect. */
function SlideLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="relative inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        <span className={`block ${active ? "text-[#087ef5]" : ""}`}>{label}</span>
        <span className="absolute top-full left-0 block text-[#087ef5]" aria-hidden="true">
          {label}
        </span>
      </span>
    </span>
  );
}

function MenuItemLink({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const Icon = link.icon;
  const active = isActivePath(pathname, link.href);
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`group/item flex items-start gap-3.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-[#f2f8fd] focus-visible:bg-[#f2f8fd] focus-visible:outline-none ${
        active ? "bg-[#f2f8fd]" : ""
      }`}
    >
      {Icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#087ef5]/10 text-[#087ef5] transition-colors duration-200 group-hover/item:bg-[#087ef5] group-hover/item:text-[#ffffff]">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[14.5px] leading-snug font-semibold text-[#071a3d]">
          {link.label}
          <ArrowRight
            className="h-3.5 w-3.5 -translate-x-1 text-[#087ef5] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
            aria-hidden="true"
          />
        </span>
        {link.description && (
          <span className="mt-0.5 block text-[13px] leading-[1.45] text-[#5b6575]">
            {link.description}
          </span>
        )}
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname() ?? "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownKey | null>(null);
  const [mobileSection, setMobileSection] = useState<DropdownKey | null>(null);

  const platformActive = PLATFORM_LINKS.some((l) => isActivePath(pathname, l.href));
  const useCasesActive = USE_CASE_LINKS.some((l) => isActivePath(pathname, l.href));

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
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setDropdown(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openDropdown = (key: DropdownKey) => {
    cancelClose();
    setDropdown(key);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setDropdown(null), 250);
  };

  // Hover only means something for a real mouse. Touch screens fire emulated
  // mouse events before the click, which used to open the menu and then
  // close it again in the same tap.
  const lastPointer = useRef<string>("mouse");
  const hoverOpen = (e: ReactPointerEvent, key: DropdownKey) => {
    if (e.pointerType === "mouse") openDropdown(key);
  };
  const hoverStay = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") cancelClose();
  };
  const hoverClose = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") scheduleClose();
  };

  // A mouse has already opened the menu on hover, so its click only keeps the
  // menu open; toggling here is what closed menus the moment they were
  // clicked. Keyboard (detail 0) and touch still toggle.
  const triggerClick = (e: ReactMouseEvent, key: DropdownKey) => {
    if (e.detail !== 0 && lastPointer.current === "mouse") {
      openDropdown(key);
      return;
    }
    setDropdown((d) => (d === key ? null : key));
  };

  const closeAll = () => {
    cancelClose();
    setDropdown(null);
    setMenuOpen(false);
  };

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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(panel.current, {
          clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        });
        return;
      }

      if (menuOpen) {
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
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.45 },
            "-=0.3",
          );
      } else {
        gsap.to(panel.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
    },
    { dependencies: [menuOpen], scope: root },
  );

  const navItemClass =
    "group relative inline-flex items-center gap-1.5 py-1 text-[14px] font-medium whitespace-nowrap text-[#071a3d] xl:text-[15px]";

  return (
    <header
      ref={root}
      // The bar's background is a full-viewport-width layer behind the
      // content, so it runs edge to edge on screens wider than 1920px while
      // the logo and menu stay aligned with the page's 1920px container.
      className={`fixed top-0 left-1/2 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between gap-3 px-4 transition-[padding] duration-300 before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:transition-all before:duration-300 before:content-[''] sm:px-6 md:gap-6 md:px-10 ${
        menuOpen ? "py-4" : scrolled ? "py-3" : "py-4 md:py-5"
      } ${
        menuOpen
          ? "before:border-transparent before:bg-transparent"
          : scrolled || dropdown
            ? "before:border-[#e5eaf0] before:bg-[#f2f8fd]/95 before:shadow-[0_6px_24px_rgba(7,26,61,0.08)] before:backdrop-blur-md"
            : "before:border-transparent before:bg-[#f2f8fd]"
      }`}
    >
      <Link
        data-hd-item
        href="/"
        aria-label={`${BRAND_NAME}, home`}
        aria-current={pathname === "/" ? "page" : undefined}
        onClick={closeAll}
        className="relative z-[60] shrink-0 transition-transform duration-300 hover:scale-[1.03]"
      >
        <Image
          className={`block h-auto transition-all duration-300 ${
            menuOpen ? "brightness-0 invert" : ""
          } ${
            scrolled
              ? "w-[104px] min-[380px]:w-[118px] sm:w-[150px] lg:w-[150px] xl:w-[170px]"
              : "w-[104px] min-[380px]:w-[124px] sm:w-[165px] lg:w-[160px] xl:w-[200px]"
          }`}
          src="/images/logo.png"
          alt={BRAND_NAME}
          width={517}
          height={106}
          priority
        />
      </Link>

      {/* Desktop navigation. Every dropdown link is in the HTML on load and
          only hidden with CSS, so crawlers see the full menu. */}
      <nav data-hd-item className="hidden lg:block" aria-label="Primary">
        {/* Both dropdowns hang from the bottom of this row: Platform from
            the list itself, Use Cases from its item minus the item's 2rem
            hover padding, so they open the same distance below the links. */}
        <ul className="relative m-0 flex list-none items-center gap-6 p-0 xl:gap-9">
          <li
            className="static -my-8 py-8"
            onPointerEnter={(e) => hoverOpen(e, "platform")}
            onPointerLeave={hoverClose}
          >
            <button
              type="button"
              className={navItemClass}
              aria-expanded={dropdown === "platform"}
              aria-controls="menu-platform"
              onPointerDown={(e) => (lastPointer.current = e.pointerType)}
              onClick={(e) => triggerClick(e, "platform")}
            >
              <SlideLabel label="Platform" active={platformActive} />
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  dropdown === "platform" ? "rotate-180 text-[#087ef5]" : "text-[#071a3d]/50"
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id="menu-platform"
              className={`absolute top-full left-1/2 w-[min(940px,calc(100vw-48px))] -translate-x-1/2 pt-3 transition-all duration-300 ${
                dropdown === "platform"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
              onPointerEnter={hoverStay}
              onPointerLeave={hoverClose}
            >
              <div className="overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] p-3 shadow-[0_32px_80px_-24px_rgba(7,26,61,0.38)]">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {PLATFORM_COLUMNS.map((column) => (
                    <div key={column.heading}>
                      <p className="m-0 flex items-center gap-2 px-3 pt-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/40">
                        <span className="h-px w-4 bg-[#ff6b00]" aria-hidden="true" />
                        {column.heading}
                      </p>
                      <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <MenuItemLink link={link} pathname={pathname} onNavigate={closeAll} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-[#071a3d] px-5 py-4">
                  <Link
                    href={PLATFORM_FOOTER[0].href}
                    onClick={closeAll}
                    aria-current={isActivePath(pathname, PLATFORM_FOOTER[0].href) ? "page" : undefined}
                    className="group/f flex min-w-0 items-center gap-3.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ffffff]/10 text-[#ffffff]">
                      {(() => {
                        const Icon = PLATFORM_FOOTER[0].icon!;
                        return <Icon className="h-[18px] w-[18px]" aria-hidden="true" />;
                      })()}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[14.5px] font-semibold text-[#ffffff]">
                        {PLATFORM_FOOTER[0].label}
                        <ArrowRight
                          className="h-3.5 w-3.5 text-[#087ef5] transition-transform duration-200 group-hover/f:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="block text-[13px] text-[#ffffff]/55">
                        {PLATFORM_FOOTER[0].description}
                      </span>
                    </span>
                  </Link>

                  <a
                    href={PLATFORM_FOOTER[1].href}
                    onClick={closeAll}
                    className="group/h inline-flex items-center gap-2 rounded-full border border-[#ffffff]/15 px-4 py-2 text-[13.5px] font-semibold text-[#ffffff] transition-colors duration-200 hover:border-[#087ef5] hover:bg-[#087ef5]"
                  >
                    {PLATFORM_FOOTER[1].label}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/h:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li
            className="relative -my-8 py-8"
            onPointerEnter={(e) => hoverOpen(e, "use-cases")}
            onPointerLeave={hoverClose}
          >
            <button
              type="button"
              className={navItemClass}
              aria-expanded={dropdown === "use-cases"}
              aria-controls="menu-use-cases"
              onPointerDown={(e) => (lastPointer.current = e.pointerType)}
              onClick={(e) => triggerClick(e, "use-cases")}
            >
              <SlideLabel label="Use Cases" active={useCasesActive} />
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  dropdown === "use-cases" ? "rotate-180 text-[#087ef5]" : "text-[#071a3d]/50"
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id="menu-use-cases"
              className={`absolute top-[calc(100%-2rem)] left-1/2 w-[400px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                dropdown === "use-cases"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
              onPointerEnter={hoverStay}
              onPointerLeave={hoverClose}
            >
              <div className="rounded-[26px] border border-[#e5eaf0] bg-[#ffffff] p-3 shadow-[0_32px_80px_-24px_rgba(7,26,61,0.38)]">
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {USE_CASE_LINKS.map((link) => (
                    <li key={link.href}>
                      <MenuItemLink link={link} pathname={pathname} onNavigate={closeAll} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {TOP_LINKS.map(({ label, href }) => {
            const active = isActivePath(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeAll}
                  aria-current={active ? "page" : undefined}
                  className={navItemClass}
                >
                  <SlideLabel label={label} active={active} />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-[#087ef5] transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div data-hd-item className="flex shrink-0 items-center gap-2 sm:gap-3 xl:gap-5">
        <a
          href={APP_LOGIN_URL}
          data-track="login_click"
          className="group relative hidden py-1 text-[14px] font-semibold whitespace-nowrap text-[#071a3d] transition-colors duration-200 hover:text-[#087ef5] lg:inline-flex xl:text-[15px]"
        >
          Log in
        </a>

        <a
          href={DEMO_URL}
          data-track="book_demo_click"
          className={`group relative inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 text-[13px] font-semibold whitespace-nowrap shadow-[0_6px_20px_rgba(7,26,61,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087ef5] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)] sm:min-h-[48px] sm:px-6 sm:text-[14px] lg:min-h-[50px] lg:px-7 xl:text-[15px] ${
            menuOpen ? "bg-[#ffffff] text-[#071a3d] hover:text-[#ffffff]" : "bg-[#071a3d] text-[#ffffff]"
          }`}
        >
          <span>Book a demo</span>
          <ArrowRight
            className="hidden h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 min-[400px]:block"
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
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu: same links as desktop, in the same order (Google indexes
          the mobile version). Dropdowns become accordions. */}
      <div
        id="mobile-menu"
        ref={panel}
        className="fixed inset-x-0 top-0 -z-10 h-[100dvh] overflow-hidden bg-[#071a3d] lg:hidden"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        inert={!menuOpen}
      >
        <span
          className="pointer-events-none absolute top-[-10%] right-[-20%] h-[360px] w-[360px] rounded-full bg-[#087ef5]/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-5 pt-24 pb-8 sm:px-8 sm:pt-28"
          data-lenis-prevent
        >
          <nav aria-label="Mobile">
            <ul className="m-0 flex list-none flex-col p-0">
              {MOBILE_SECTIONS.map(({ key, label, links }, i) => {
                const open = mobileSection === key;
                return (
                  <li key={key} data-hd-link className="border-b border-[#ffffff]/12">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`mobile-${key}`}
                      onClick={() => setMobileSection(open ? null : key)}
                      className="flex w-full items-center justify-between gap-3 py-4 text-left text-[#ffffff] sm:py-5"
                    >
                      <span className="flex min-w-0 flex-1 items-baseline gap-3 sm:gap-4">
                        <span className="shrink-0 font-display text-[11px] text-[#ffffff]/35 sm:text-[12px]">
                          0{i + 1}
                        </span>
                        <span className="min-w-0 font-display text-[clamp(20px,5.5vw,30px)] leading-tight">
                          {label}
                        </span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#ffffff]/15 text-[#087ef5]">
                        {open ? (
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>

                    <div
                      id={`mobile-${key}`}
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden" inert={!open}>
                        <ul className="m-0 flex list-none flex-col gap-1 p-0 pb-5 sm:pl-8">
                          {links.map((link) => {
                            const Icon = link.icon;
                            const active = isActivePath(pathname, link.href);
                            return (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={closeAll}
                                  aria-current={active ? "page" : undefined}
                                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-[#ffffff]/[0.06] ${
                                    active ? "bg-[#ffffff]/[0.08]" : ""
                                  }`}
                                >
                                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ffffff]/[0.08] text-[#087ef5]">
                                    {Icon ? (
                                      <Icon className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    )}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[15px] leading-snug font-semibold text-[#ffffff]">
                                      {link.label}
                                    </span>
                                    {link.description && (
                                      <span className="block text-[12.5px] leading-snug text-[#ffffff]/50">
                                        {link.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}

              {TOP_LINKS.map(({ label, href }, i) => {
                const active = isActivePath(pathname, href);
                return (
                  <li key={href} data-hd-link className="border-b border-[#ffffff]/12">
                    <Link
                      href={href}
                      onClick={closeAll}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center justify-between gap-3 py-4 text-[#ffffff] sm:py-5"
                    >
                      <span className="flex min-w-0 flex-1 items-baseline gap-3 sm:gap-4">
                        <span className="shrink-0 font-display text-[11px] text-[#ffffff]/35 sm:text-[12px]">
                          0{i + 3}
                        </span>
                        <span
                          className={`min-w-0 font-display text-[clamp(20px,5.5vw,30px)] leading-tight ${
                            active ? "text-[#087ef5]" : ""
                          }`}
                        >
                          {label}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-[#087ef5] transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div data-hd-link className="mt-auto flex flex-col gap-3 pt-8">
            <a
              href={DEMO_URL}
              data-track="book_demo_click"
              onClick={closeAll}
              className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#ffffff] px-6 text-[15px] font-semibold text-[#071a3d] transition-colors duration-300 hover:bg-[#087ef5] hover:text-[#ffffff]"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={APP_LOGIN_URL}
              data-track="login_click"
              onClick={closeAll}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-[#ffffff]/20 px-6 text-[15px] font-semibold text-[#ffffff] transition-colors duration-300 hover:border-[#087ef5] hover:bg-[#087ef5]"
            >
              Log in
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-track="contact_email_click"
              className="mt-3 text-[13px] break-words text-[#ffffff]/45 transition-colors hover:text-[#ffffff]"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
