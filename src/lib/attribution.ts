/*
 * First-touch lead source, kept for the browser session so a demo booked
 * three pages later still records where the visitor came from.
 *
 * Order of precedence: UTM parameters on the landing URL, then a referral
 * from an AI assistant (so AI-sourced leads are visible on their own), then
 * any other external referrer. Every storage call is wrapped: blocked
 * storage must never break a page.
 */

const KEY = "ih-attribution";

export type Attribution = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string>
>;

/** Referrer hosts of AI assistants and answer engines. */
const AI_REFERRERS: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "www.perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "grok.com": "grok",
  "chat.deepseek.com": "deepseek",
  "you.com": "you",
  "search.brave.com": "brave-ai",
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Record the session's lead source if none is stored yet. Returns the AI
 * assistant's name when this visit was referred by one, so the caller can
 * send an analytics event.
 */
export function captureAttribution(): string | null {
  if (read()) return null;

  const params = new URLSearchParams(window.location.search);
  const fromUtm: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUtm[key] = value.slice(0, 100);
  }

  let host = "";
  try {
    host = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    host = "";
  }
  const ai = AI_REFERRERS[host] ?? null;

  let value: Attribution;
  if (Object.keys(fromUtm).length > 0) value = fromUtm;
  else if (ai) value = { utm_source: ai, utm_medium: "ai-referral" };
  else if (host && host !== window.location.hostname) value = { utm_source: host, utm_medium: "referral" };
  else value = { utm_source: "direct", utm_medium: "none" };

  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the lead simply records no source.
  }
  return ai;
}

/** Add the stored lead source to a URL (used for the Calendly booking). */
export function withAttribution(url: string): string {
  const stored = read();
  if (!stored) return url;
  try {
    const next = new URL(url);
    for (const [key, value] of Object.entries(stored)) {
      if (value && !next.searchParams.has(key)) next.searchParams.set(key, value);
    }
    return next.toString();
  } catch {
    return url;
  }
}
