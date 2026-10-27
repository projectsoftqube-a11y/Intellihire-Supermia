import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import FaqSection from "@/components/FaqSection";
import RelatedLinks from "@/components/RelatedLinks";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingSections from "@/components/marketing/MarketingSections";
import { JsonLd } from "@/components/ui";
import type { MarketingPage } from "@/content/types";
import { breadcrumbNode, webPageNode, type Crumb } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

/** Breadcrumb trail for a platform, use-case or company page. */
export function marketingCrumbs(page: MarketingPage): Crumb[] {
  if (page.kind === "platform") {
    // No platform hub yet, so "Platform" points at the homepage section.
    return [
      { name: "Home", path: "/" },
      { name: "Platform", path: "/#features" },
      { name: page.navLabel, path: page.path },
    ];
  }
  if (page.kind === "use-case") {
    return [
      { name: "Home", path: "/" },
      { name: "Use Cases", path: "/#who-uses-intellihire" },
      { name: page.navLabel, path: page.path },
    ];
  }
  return [
    { name: "Home", path: "/" },
    { name: page.navLabel, path: page.path },
  ];
}

const SECONDARY = {
  platform: {
    hero: { label: "See how it works", href: "/#how-it-works" },
    cta: { label: "Compare plans", href: "/pricing" },
  },
  "use-case": {
    hero: { label: "Compare plans", href: "/pricing" },
    cta: { label: "Read the FAQ", href: "/faq" },
  },
  about: {
    hero: { label: "Read the FAQ", href: "/faq" },
    cta: { label: "Email the team", href: `mailto:${CONTACT_EMAIL}` },
  },
} as const;

export default function MarketingPageView({ page }: { page: MarketingPage }) {
  const crumbs = marketingCrumbs(page);
  const secondary = SECONDARY[page.kind];

  const graph = [
    webPageNode({
      type: page.kind === "about" ? "AboutPage" : "WebPage",
      path: page.path,
      name: page.metaTitle,
      description: page.metaDescription,
      dateModified: page.dateModified,
      aboutSoftware: page.kind !== "use-case",
    }),
    breadcrumbNode(page.path, crumbs),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <MarketingHero page={page} crumbs={crumbs} secondary={secondary.hero} />
        <Reveal>
          <MarketingSections sections={page.sections} />
          <FaqSection heading={page.faqHeading} items={page.faqs} />
          <RelatedLinks paths={page.related} />
          <CtaBand
            heading={page.cta.heading}
            body={page.cta.body}
            secondary={secondary.cta}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
