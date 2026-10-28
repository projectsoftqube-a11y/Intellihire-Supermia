"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Fires the GA4 events named in the developer handoffs (book_demo_click,
 * pricing_notify_click, login_click, contact_email_click) for any link that
 * carries `data-track="<event>"`.
 *
 * One delegated listener keeps the links themselves as plain server-rendered
 * <a href> elements. It is a no-op until GA4 (gtag) or GTM (dataLayer) is
 * installed on the page.
 *
 * It also records the session's first-touch lead source (UTM tags, an AI
 * assistant or another referrer) and sends `ai_referral` when the visit came
 * from an AI assistant, so AI-sourced visits and leads can be segmented.
 */
function send(name: string, params: Record<string, string>) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}

export default function TrackClicks() {
  useEffect(() => {
    const ai = captureAttribution();
    if (ai) send("ai_referral", { ai_source: ai, page_path: window.location.pathname });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("[data-track]");
      if (!link) return;

      const name = link.getAttribute("data-track");
      if (!name) return;

      const params = {
        link_url: link.getAttribute("href") ?? "",
        link_text: (link.textContent ?? "").trim().slice(0, 100),
        page_path: window.location.pathname,
      };

      send(name, params);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
