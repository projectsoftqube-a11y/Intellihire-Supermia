"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Dispatched on window to ask for a smooth scroll back to the top. */
export const SCROLL_TOP_EVENT = "ih:scroll-top";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // Only handle in-page hashes on the current route.
      const [path, hash] = href.split("#");
      if (!hash) return;
      if (path && path !== "/" && path !== window.location.pathname) return;
      if (path === "/" && window.location.pathname !== "/") return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    };

    document.addEventListener("click", onAnchorClick);

    const onScrollTop = () => lenis.scrollTo(0, { duration: 1.2 });
    window.addEventListener(SCROLL_TOP_EVENT, onScrollTop);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener(SCROLL_TOP_EVENT, onScrollTop);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll position, so a client-side navigation would
  // open the next page part-way down. Start each new page at the top unless
  // the link points at a section on it.
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return <>{children}</>;
}
