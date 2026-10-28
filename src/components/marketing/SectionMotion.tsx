"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll and pointer effects for `MarketingSections`.
 *
 * The sections themselves are server rendered and read correctly with no
 * JavaScript: rails are fully drawn, every step and row is visible. This
 * component only adds motion on top, keyed by `data-fx-*` attributes:
 *
 *   data-fx-spot     pointer-following glow (CSS reads --mx / --my)
 *   data-fx-rail     bar that fills with section scroll progress
 *   data-fx-row      row that gains `is-active` while it is in the reading band
 *   data-fx-steps    step list: line draws with scroll, nodes gain `is-on`
 *   data-fx-pop      icon that pops in when it enters the viewport
 *   data-fx-from     "left" | "right": content that slides in from that side
 *   data-fx-parallax decorative layer that drifts against the scroll
 *   data-fx-stack    sticky card list; earlier cards ease back and dim under
 *                    their [data-fx-stack-shade] tint (wide screens)
 *   data-fx-hscroll  panel pinned while its [data-fx-track] scrolls sideways
 */
export default function SectionMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, scope);

      // Spotlight is hover feedback rather than motion, so it stays on even
      // when reduced motion is requested.
      const spots = q("[data-fx-spot]");
      const onMove = (event: PointerEvent) => {
        const el = event.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      };
      spots.forEach((el) => el.addEventListener("pointermove", onMove));
      const removeSpots = () => spots.forEach((el) => el.removeEventListener("pointermove", onMove));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return removeSpots;

      const belowFold = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

      // Progress rails beside split-section headings.
      q("[data-fx-rail]").forEach((rail) => {
        gsap.fromTo(
          rail,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: rail.closest("section"), start: "top 60%", end: "bottom 60%", scrub: 0.5 },
          },
        );
      });

      // The row in the reading band lights up its number and underline.
      q("[data-fx-row]").forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 62%",
          toggleClass: { targets: row, className: "is-active" },
        });
      });

      // Step lists: the connector draws with scroll and each node fills as
      // the line reaches it.
      q("[data-fx-steps]").forEach((list) => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-fx-node]", list);
        const lineX = list.querySelector<HTMLElement>("[data-fx-line-x]");
        const lineY = list.querySelector<HTMLElement>("[data-fx-line-y]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.6,
            onUpdate: (self) => {
              nodes.forEach((node, i) => {
                const at = nodes.length > 1 ? i / (nodes.length - 1) : 0;
                node.classList.toggle("is-on", self.progress >= at - 0.02);
              });
            },
          },
        });
        if (lineX) tl.fromTo(lineX, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        if (lineY) tl.fromTo(lineY, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0);
      });

      // Check icons pop in.
      const pops = q("[data-fx-pop]").filter(belowFold);
      gsap.set(pops, { scale: 0.3, rotate: -35 });
      ScrollTrigger.batch(pops, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)", stagger: 0.08, overwrite: true }),
      });

      // Contrast rows: each side arrives from its own edge.
      const sliders = q("[data-fx-from]").filter(belowFold);
      sliders.forEach((el) =>
        gsap.set(el, { opacity: 0, x: el.dataset.fxFrom === "right" ? 36 : -36 }),
      );
      ScrollTrigger.batch(sliders, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.05, overwrite: true }),
      });

      // Decorative layers drift against the scroll.
      q("[data-fx-parallax]").forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: layer.closest("section"), start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Wide screens only: effects that depend on sticky or pinned layout.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // Stacking challenge cards: each eases back as the next slides over.
        q("[data-fx-stack]").forEach((list) => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-fx-stack-card]", list);
          // Cards stay opaque; a solid tint layer dims them instead.
          cards.slice(0, -1).forEach((card, i) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 30%", scrub: true },
            });
            tl.to(card, { scale: 0.94, transformOrigin: "50% 0%", ease: "none" }, 0);
            const shade = card.querySelector<HTMLElement>("[data-fx-stack-shade]");
            if (shade) tl.to(shade, { opacity: 0.6, ease: "none" }, 0);
          });
        });

        // Horizontal journey: pin the panel and let vertical scroll move the
        // row of steps sideways, with a progress bar in step.
        q("[data-fx-hscroll]").forEach((panel) => {
          const viewport = panel.querySelector<HTMLElement>("[data-fx-hviewport]");
          const track = panel.querySelector<HTMLElement>("[data-fx-track]");
          const bar = panel.querySelector<HTMLElement>("[data-fx-hprogress]");
          if (!viewport || !track) return;
          gsap.set(viewport, { overflow: "hidden" });
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              // Centre the panel when it fits the screen; otherwise pin it
              // just under the fixed header.
              start: () => (panel.offsetHeight < window.innerHeight - 110 ? "center 55%" : "top 88px"),
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
          tl.to(track, { x: () => -distance(), ease: "none" }, 0);
          if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        });
      });

      // Pinning adds scroll distance, so recalculate every trigger in page
      // order once everything above exists.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      // Nothing stays hidden if a trigger misses (e.g. a jump-link landing).
      const failsafe = window.setTimeout(() => {
        gsap.to([...pops, ...sliders].filter((el) => !belowFold(el)), {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 0.3,
          overwrite: true,
        });
      }, 2500);

      return () => {
        removeSpots();
        window.clearTimeout(failsafe);
        mm.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
