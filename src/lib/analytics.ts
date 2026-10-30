/**
 * Google Analytics 4 and Google Tag Manager.
 *
 * GA4 is loaded directly with gtag.js, so page views and the site's events
 * reach the GA4 property without any GTM setup. GTM is loaded alongside it
 * for other tags (ads conversions, heatmaps): every site event is also
 * pushed to the dataLayer as `{ event: "<name>" }`, ready to use as a GTM
 * trigger. Do not add a GA4 tag for the same measurement ID in GTM, or every
 * page view and event will be counted twice.
 */

export const GA4_ID = "G-9TS833W323";
export const GTM_ID = "GTM-W7XNH6MT";

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: Record<string, unknown>[];
  }
}

/** Send a named event to GA4 and the GTM dataLayer. No-op when neither is loaded. */
export function trackEvent(name: string, params: Record<string, string>) {
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...params });
}
