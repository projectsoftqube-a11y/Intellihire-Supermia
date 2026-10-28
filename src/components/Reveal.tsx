"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-reveal for server-rendered content: every `[data-reveal]` element
 * inside rises into place as it enters the viewport, matching the homepage
 * motion. The markup and copy stay server rendered; this only adds motion.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (items.length === 0) return;

      // Anything already in view on load is shown immediately. Hiding it first
      // and waiting for a scroll leaves above-the-fold cards blank until the
      // user moves, which is what made the blog grid look broken.
      const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.9;
      const hidden = items.filter((el) => !inView(el));

      gsap.set(hidden, { opacity: 0, y: 32 });

      ScrollTrigger.batch(hidden, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      // Late-loading images change every trigger position, so recompute once
      // they settle. Without this a card can scroll past its own start point
      // and never animate in.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      // Last-resort guard: nothing stays invisible, whatever the triggers do.
      const failsafe = window.setTimeout(() => {
        gsap.to(
          hidden.filter((el) => Number(gsap.getProperty(el, "opacity")) === 0 && inView(el)),
          { opacity: 1, y: 0, duration: 0.4, overwrite: true },
        );
      }, 2500);

      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(failsafe);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
