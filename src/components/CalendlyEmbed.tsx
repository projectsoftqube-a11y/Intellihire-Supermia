"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { withAttribution } from "@/lib/attribution";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function isCalendlyEvent(e: MessageEvent): e is MessageEvent<{ event: string }> {
  return (
    typeof e.origin === "string" &&
    e.origin.includes("calendly.com") &&
    typeof e.data === "object" &&
    e.data !== null &&
    "event" in e.data
  );
}

/**
 * Inline Calendly scheduler.
 *
 * The widget script is injected once and shared across mounts. We call
 * initInlineWidget() ourselves rather than relying on the script's own
 * auto-scan, because that scan only runs on first load; after a client-side
 * route change the widget would otherwise render blank.
 *
 * A completed booking fires the `demo_booked` GA4 event, alongside the
 * `book_demo_click` events `TrackClicks` already sends for the links here.
 * The session's lead source is added to the Calendly URL as UTM parameters,
 * so each booking records where the visitor came from.
 */
export default function CalendlyEmbed({
  url,
  className = "",
  onEventScheduled,
  redirectTo,
}: {
  /** Full Calendly scheduling URL. */
  url: string;
  className?: string;
  /** Fired once the invitee completes a booking. */
  onEventScheduled?: () => void;
  /** Page to open once the booking is complete. */
  redirectTo?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Keep the latest callback without re-subscribing the message listener.
  const onScheduledRef = useRef(onEventScheduled);
  useEffect(() => {
    onScheduledRef.current = onEventScheduled;
  }, [onEventScheduled]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyEvent(e) || e.data.event !== "calendly.event_scheduled") return;
      const params = { page_path: window.location.pathname };
      if (typeof window.gtag === "function") window.gtag("event", "demo_booked", params);
      else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: "demo_booked", ...params });
      onScheduledRef.current?.();
      if (redirectTo) router.push(redirectTo);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [redirectTo, router]);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url: withAttribution(url), parentElement: containerRef.current });
    };

    if (window.Calendly) {
      init();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", init);
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      // Lenis captures wheel events document-wide; let the scheduler scroll.
      data-lenis-prevent
      className={`calendly-inline-widget w-full min-w-0 ${className}`}
      data-url={url}
    />
  );
}
