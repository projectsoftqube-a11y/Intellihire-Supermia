import Script from "next/script";
import { GA4_ID, GTM_ID } from "@/lib/analytics";
import { IS_PREVIEW } from "@/lib/site";

// Only the live site reports: local development and Vercel previews would
// otherwise fill the GA4 property with test traffic.
const ENABLED = process.env.NODE_ENV === "production" && !IS_PREVIEW;

/**
 * Goes in <head>. Sets up the dataLayer queue, configures GA4 and starts the
 * GTM container before anything else runs, so events fired on page load
 * (e.g. `ai_referral`) wait in the queue instead of being lost. The library
 * files themselves load later, in <AnalyticsBody />.
 */
export function AnalyticsHead() {
  if (!ENABLED) return null;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
      }}
    />
  );
}

/**
 * Goes first in <body>: GTM's fallback for visitors with JavaScript off, and
 * gtag.js and gtm.js, loaded once the page is interactive so they do not
 * delay the first render.
 */
export function AnalyticsBody() {
  if (!ENABLED) return null;
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
