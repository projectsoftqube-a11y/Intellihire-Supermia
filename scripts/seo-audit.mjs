/**
 * SEO / AEO / GEO audit for the built site.
 *
 * Usage: node scripts/seo-audit.mjs [--base http://localhost:3000] [--json]
 *
 * Fetches every public route's raw HTML (no JavaScript executed, the way most
 * AI crawlers see it) and asserts the head tags, heading structure, JSON-LD
 * graph and answer-first content that the SEO handoffs require. Exits non-zero
 * on a failure so this can gate CI.
 */

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const BASE = flag("base", "http://localhost:3000").replace(/\/$/, "");
const JSON_OUT = args.includes("--json");

/**
 * Origin the pages themselves emit in canonicals and og:url. A local `next
 * start` still renders production URLs (NEXT_PUBLIC_SITE_URL), so comparing
 * them against `--base` would flag every correct canonical. Defaults to the
 * origin of the canonical on the homepage.
 */
let SITE_ORIGIN = flag("origin", null);

/* -------------------------------------------------------------------------- */
/* HTML helpers. Regex is enough here: we only read tags Next emits.          */
/* -------------------------------------------------------------------------- */

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const meta = (html, name) => {
  const m = html.match(
    new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]*>`, "i"),
  );
  if (!m) return null;
  const c = m[0].match(/content="([^"]*)"/i);
  return c ? decode(c[1]) : null;
};

const title = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decode(m[1]).trim() : null;
};

const canonical = (html) => {
  const m = html.match(/<link[^>]+rel="canonical"[^>]*>/i);
  if (!m) return null;
  const h = m[0].match(/href="([^"]*)"/i);
  return h ? decode(h[1]) : null;
};

/** Every heading in document order, as { level, text }. */
const headings = (html) =>
  [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: decode(m[2].replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim(),
  }));

/** Visible text of <main>, with scripts and tags removed. */
const bodyText = (html) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return decode(
    (main ? main[1] : html)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
};

const wordCount = (text) =>
  text ? text.split(/\s+/).filter(Boolean).length : 0;

/** All JSON-LD nodes on the page, flattened out of every @graph. */
const jsonLdNodes = (html) => {
  const nodes = [];
  for (const m of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const parsed = JSON.parse(m[1].replace(/\\u003c/g, "<"));
      nodes.push(...(parsed["@graph"] ?? [parsed]));
    } catch {
      nodes.push({ __parseError: m[1].slice(0, 120) });
    }
  }
  return nodes;
};

/** Internal page hrefs found anywhere in the HTML. */
const internalLinks = (html) =>
  [...html.matchAll(/href="(\/[^"#?]*)/g)]
    .map((m) => m[1].replace(/\/$/, "") || "/")
    .filter(
      (p) =>
        !p.startsWith("/_next") &&
        !/\.(png|jpe?g|svg|pdf|ico|webp|avif|woff2?|ttf|txt|xml|webmanifest)$/.test(
          p,
        ),
    );

/* -------------------------------------------------------------------------- */
/* Fetching and the route list                                                */
/* -------------------------------------------------------------------------- */

async function fetchText(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { status: res.status, headers: res.headers, text: await res.text() };
}

/** Indexable routes from the sitemap, plus the noindex pages it omits. */
async function routeList() {
  const { text } = await fetchText("/sitemap.xml");
  const fromSitemap = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/",
  );
  const noindexPages = ["/blog"];
  return [...new Set([...fromSitemap, ...noindexPages])];
}

/* -------------------------------------------------------------------------- */
/* Checks                                                                     */
/* -------------------------------------------------------------------------- */

const failures = [];
const warnings = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);
const warn = (route, msg) => warnings.push(`${route}: ${msg}`);

const TITLE_MIN = 15;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;
const THIN_WORDS = 300;

/** Page-level schema types that satisfy "this page has a primary type". */
const PAGE_TYPES = [
  "WebPage",
  "CollectionPage",
  "AboutPage",
  "FAQPage",
  "ContactPage",
  "ProfilePage",
  "BlogPosting",
];

async function auditRoute(route) {
  const { status, text: html } = await fetchText(route);
  if (status !== 200) {
    fail(route, `expected 200, got ${status}`);
    return null;
  }

  const t = title(html);
  const desc = meta(html, "description");
  const can = canonical(html);
  const robots = meta(html, "robots") ?? "";
  const hs = headings(html);
  const h1s = hs.filter((h) => h.level === 1);
  const nodes = jsonLdNodes(html);
  const text = bodyText(html);
  const words = wordCount(text);
  const noindex = robots.includes("noindex");

  /* -- Head tags -- */
  if (!t) fail(route, "no <title>");
  else if (t.length < TITLE_MIN || t.length > TITLE_MAX)
    fail(route, `title length ${t.length} outside ${TITLE_MIN}-${TITLE_MAX}`);

  if (!desc) fail(route, "no meta description");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    fail(route, `description length ${desc.length} outside ${DESC_MIN}-${DESC_MAX}`);

  const expected = `${SITE_ORIGIN}${route === "/" ? "/" : route}`;
  if (!can) fail(route, "no canonical");
  else if (can.replace(/\/$/, "") !== expected.replace(/\/$/, ""))
    fail(route, `canonical not self-referencing: ${can}`);

  // `index, follow` is emitted on its own; the snippet directives ride on the
  // googlebot tag, so read both before deciding one is missing.
  const robotsAll = `${robots} ${meta(html, "googlebot") ?? ""}`;
  if (!noindex) {
    for (const directive of [
      "max-image-preview:large",
      "max-snippet:-1",
      "max-video-preview:-1",
    ]) {
      if (!robotsAll.includes(directive))
        fail(route, `robots missing ${directive}`);
    }
  }

  /* -- Open Graph and Twitter -- */
  for (const p of [
    "og:title",
    "og:description",
    "og:url",
    "og:type",
    "og:site_name",
    "og:image",
    "og:image:alt",
  ]) {
    if (!meta(html, p)) fail(route, `missing ${p}`);
  }
  if (meta(html, "twitter:card") !== "summary_large_image")
    fail(route, "twitter:card is not summary_large_image");

  /* -- Headings -- */
  if (h1s.length !== 1) fail(route, `${h1s.length} <h1> elements (expected 1)`);
  let prev = 0;
  for (const h of hs) {
    if (prev && h.level > prev + 1)
      fail(
        route,
        `heading level jumps h${prev} -> h${h.level} at "${h.text.slice(0, 50)}"`,
      );
    prev = h.level;
  }

  /* -- JSON-LD graph -- */
  if (nodes.some((n) => n.__parseError)) fail(route, "JSON-LD failed to parse");

  const ids = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
  const walkRefs = (node, path) => {
    if (Array.isArray(node))
      return node.forEach((n, i) => walkRefs(n, `${path}[${i}]`));
    if (!node || typeof node !== "object") return;
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "@id" && !ids.has(node["@id"]))
      fail(route, `@id reference does not resolve: ${node["@id"]} (at ${path})`);
    for (const [k, v] of Object.entries(node)) walkRefs(v, `${path}.${k}`);
  };
  nodes.forEach((n, i) => walkRefs(n, `node[${i}]`));

  const scanValues = (node, path) => {
    if (Array.isArray(node))
      return node.forEach((n, i) => scanValues(n, `${path}[${i}]`));
    if (!node || typeof node !== "object") return;
    for (const [k, v] of Object.entries(node)) {
      if (v === null || v === undefined || v === "")
        fail(route, `JSON-LD empty value at ${path}.${k}`);
      if (typeof v === "string" && /^(#|TODO|TBD|xxx|placeholder|lorem)/i.test(v.trim()))
        fail(route, `JSON-LD placeholder value at ${path}.${k}: ${v}`);
      scanValues(v, `${path}.${k}`);
    }
  };
  nodes.forEach((n, i) => scanValues(n, `node[${i}]`));

  // Fake review markup triggers a domain-wide manual action; never ship it.
  const graphJson = JSON.stringify(nodes);
  for (const banned of ["aggregateRating", "ratingValue", "reviewCount"]) {
    if (graphJson.includes(`"${banned}"`))
      fail(route, `JSON-LD contains ${banned} without verified review data`);
  }

  const types = [
    ...new Set(
      nodes
        .flatMap((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]))
        .filter(Boolean),
    ),
  ];
  if (!types.some((x) => PAGE_TYPES.includes(x)))
    fail(route, `no page-level schema type (got: ${types.join(", ") || "none"})`);
  if (route !== "/" && !types.includes("BreadcrumbList"))
    fail(route, "no BreadcrumbList");

  /* -- FAQ schema must match the rendered FAQ text -- */
  // A FAQ question is the heading inside a <summary>; the rest of the element
  // is icon markup. A <summary> with no heading is some other disclosure (the
  // mobile table of contents, for one), not a question, so it is skipped.
  const renderedQuestions = [
    ...html.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi),
  ]
    .map((m) => m[1].match(/<h[34]\b[^>]*>([\s\S]*?)<\/h[34]>/i))
    .filter(Boolean)
    .map((heading) =>
      decode(heading[1].replace(/<[^>]+>/g, ""))
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
  const faqNode = nodes.find((n) => Array.isArray(n.mainEntity));
  const questions = (faqNode?.mainEntity ?? []).filter(
    (q) => q["@type"] === "Question",
  );

  if (renderedQuestions.length > 0 && questions.length === 0)
    warn(route, `${renderedQuestions.length} rendered Q&A items with no FAQPage schema`);

  for (const q of questions) {
    if (!renderedQuestions.includes(q.name))
      fail(route, `FAQ schema question not in rendered HTML: "${q.name.slice(0, 60)}"`);
    const answer = (q.acceptedAnswer?.text ?? "").replace(/\s+/g, " ").trim();
    const needle = answer.slice(0, 60);
    if (needle && !text.includes(needle))
      fail(route, `FAQ schema answer not in rendered HTML: "${needle}"`);
  }

  /* -- Raw-HTML content: what a non-JS AI crawler can read -- */
  if (h1s[0] && !text.includes(h1s[0].text.slice(0, 40)))
    fail(route, "H1 text missing from server-rendered <main>");
  if (words < THIN_WORDS && !noindex) warn(route, `thin page: ${words} words`);

  /* -- Answer-first block and speakable -- */
  const answerBlock = /data-answer\b/.test(html);
  if (!answerBlock && !noindex) warn(route, "no answer-first block (data-answer)");
  if (!noindex && !graphJson.includes("SpeakableSpecification"))
    warn(route, "no speakable specification");

  /* -- Images -- */
  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = img[0];
    if (!/\salt=/.test(tag)) fail(route, `<img> without alt: ${tag.slice(0, 90)}`);
    else if (!/alt=""/.test(tag) && !/(width=|height=|fill)/.test(tag))
      warn(route, `<img> without dimensions: ${tag.slice(0, 90)}`);
  }

  return {
    route,
    status,
    title: t,
    titleLen: t?.length ?? 0,
    descLen: desc?.length ?? 0,
    canonical: can,
    h1Count: h1s.length,
    h1: h1s[0]?.text ?? null,
    jsonLdTypes: types,
    words,
    noindex,
    renderedFaqs: renderedQuestions.length,
    schemaFaqs: questions.length,
    answerBlock,
    links: internalLinks(html),
    bytes: html.length,
  };
}

/* -------------------------------------------------------------------------- */
/* Site-level files                                                           */
/* -------------------------------------------------------------------------- */

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
];

async function auditFiles() {
  const checks = [
    ["/sitemap.xml", "xml"],
    ["/robots.txt", "text/plain"],
    ["/llms.txt", "text/plain"],
    ["/llms-full.txt", "text/plain"],
    ["/manifest.webmanifest", "manifest"],
    ["/opengraph-image", "image/"],
  ];
  const out = {};
  for (const [path, expectType] of checks) {
    const { status, headers } = await fetchText(path);
    const ct = headers.get("content-type") ?? "";
    out[path] = { status, contentType: ct };
    if (status !== 200) fail(path, `expected 200, got ${status}`);
    else if (!ct.includes(expectType))
      fail(path, `content-type "${ct}" does not include "${expectType}"`);
  }

  const { text: robotsTxt } = await fetchText("/robots.txt");
  if (!robotsTxt.includes("/sitemap.xml")) fail("/robots.txt", "no Sitemap: line");
  for (const bot of AI_CRAWLERS) {
    if (!robotsTxt.includes(bot)) fail("/robots.txt", `AI crawler not named: ${bot}`);
  }
  return out;
}

/** Every sitemap URL must return 200 with no redirect. */
async function auditSitemapUrls() {
  const { text } = await fetchText("/sitemap.xml");
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const { status } = await fetchText(new URL(loc).pathname);
    if (status !== 200) fail("/sitemap.xml", `${new URL(loc).pathname} returns ${status}`);
  }
  return locs.length;
}

/* -------------------------------------------------------------------------- */
/* Run                                                                        */
/* -------------------------------------------------------------------------- */

if (!SITE_ORIGIN) {
  const { text } = await fetchText("/");
  const home = canonical(text);
  SITE_ORIGIN = home ? new URL(home).origin : BASE;
}
SITE_ORIGIN = SITE_ORIGIN.replace(/\/$/, "");

const routes = await routeList();
const rows = [];
for (const route of routes) {
  const row = await auditRoute(route);
  if (row) rows.push(row);
}

const files = await auditFiles();
const sitemapCount = await auditSitemapUrls();

/* Unique titles and descriptions across routes. */
for (const field of ["title", "descLen"]) {
  if (field !== "title") continue;
  const seen = new Map();
  for (const r of rows) {
    if (!seen.has(r.title)) seen.set(r.title, []);
    seen.get(r.title).push(r.route);
  }
  for (const [value, used] of seen) {
    if (used.length > 1) fail("site", `duplicate title "${value}" on ${used.join(", ")}`);
  }
}

/* Orphans: an audited route with no inbound internal link from another page. */
const inbound = new Map(rows.map((r) => [r.route, 0]));
for (const r of rows) {
  for (const href of new Set(r.links)) {
    if (href !== r.route && inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
  }
}
for (const [route, count] of inbound) {
  if (count === 0 && route !== "/")
    fail("site", `orphan page, no inbound internal links: ${route}`);
}

/* Broken internal links and redirect chains. */
const known = new Set(rows.map((r) => r.route));
const checked = new Set();
for (const r of rows) {
  for (const href of new Set(r.links)) {
    if (known.has(href) || checked.has(href)) continue;
    checked.add(href);
    const { status } = await fetchText(href);
    if (status >= 400) fail(r.route, `broken internal link ${href} (${status})`);
    else if (status >= 300) fail(r.route, `internal link redirects ${href} (${status})`);
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ base: BASE, rows, files, failures, warnings }, null, 2));
} else {
  const pad = (s, n) => String(s ?? "").padEnd(n).slice(0, n);
  console.log(`\nSEO / AEO / GEO audit — ${BASE}\n`);
  console.log(
    pad("route", 46) +
      pad("ttl", 5) +
      pad("desc", 6) +
      pad("h1", 4) +
      pad("words", 7) +
      pad("faq s/r", 9) +
      pad("ans", 5) +
      "schema",
  );
  console.log("-".repeat(132));
  for (const r of rows) {
    console.log(
      pad(r.route + (r.noindex ? " (noindex)" : ""), 46) +
        pad(r.titleLen, 5) +
        pad(r.descLen, 6) +
        pad(r.h1Count, 4) +
        pad(r.words, 7) +
        pad(`${r.schemaFaqs}/${r.renderedFaqs}`, 9) +
        pad(r.answerBlock ? "yes" : "—", 5) +
        r.jsonLdTypes.join(", "),
    );
  }

  console.log("\nSite files:");
  for (const [path, v] of Object.entries(files)) {
    console.log(`  ${pad(path, 26)} ${v.status}  ${v.contentType}`);
  }
  console.log(`  sitemap URLs checked: ${sitemapCount}`);

  const heaviest = rows.reduce((a, b) => (a.bytes > b.bytes ? a : b));
  console.log(
    `\nHeaviest page: ${Math.round(heaviest.bytes / 1024)} KB HTML (${heaviest.route})`,
  );

  if (warnings.length) {
    console.log(`\n! ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }
  if (failures.length) {
    console.log(`\nx ${failures.length} failure(s):`);
    for (const f of failures) console.log(`  - ${f}`);
  } else {
    console.log(`\nOK: all ${rows.length} routes passed.`);
  }
}

process.exit(failures.length ? 1 : 0);
