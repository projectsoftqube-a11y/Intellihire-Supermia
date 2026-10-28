import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import FaqSection from "@/components/FaqSection";
import RelatedLinks from "@/components/RelatedLinks";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingIntro from "@/components/marketing/MarketingIntro";
import MarketingSections from "@/components/marketing/MarketingSections";
import SectionMotion from "@/components/marketing/SectionMotion";
import UseCaseHero from "@/components/usecase/UseCaseHero";
import UseCaseSections from "@/components/usecase/UseCaseSections";
import { JsonLd } from "@/components/ui";
import type { MarketingPage } from "@/content/types";
import { absoluteUrl, breadcrumbNode, faqPageNode, webPageNode, type Crumb } from "@/lib/seo";
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
  const useCase = page.kind === "use-case";

  const graph = [
    webPageNode({
      type: page.kind === "about" ? "AboutPage" : "WebPage",
      path: page.path,
      name: page.metaTitle,
      description: page.metaDescription,
      dateModified: page.dateModified,
      aboutSoftware: page.kind !== "use-case",
      primaryImage: page.heroImage,
      ...(page.faqs.length ? { extra: { mainEntityOfPage: { "@id": `${absoluteUrl(page.path)}#faq` } } } : {}),
    }),
    breadcrumbNode(page.path, crumbs),
    // The page's own type stays WebPage/AboutPage; its visible Q&A becomes a
    // separate FAQPage node so it is eligible for People Also Ask.
    ...[faqPageNode(page.path, page.faqs)].filter((node) => node !== null),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        {/* No visible breadcrumb on these pages; the BreadcrumbList above
            still gives search engines the page's place in the site. */}
        {/* Use-case pages tell an audience's story and get their own cover
            hero and section layouts; platform and company pages share the
            feature template. */}
        {useCase ? (
          <UseCaseHero page={page} secondary={secondary.hero} />
        ) : (
          <MarketingHero page={page} secondary={secondary.hero} />
        )}
        <Reveal>
          <MarketingIntro page={page} />
          <SectionMotion>
            {useCase ? (
              <UseCaseSections sections={page.sections} />
            ) : (
              <MarketingSections sections={page.sections} />
            )}
          </SectionMotion>
          <FaqSection heading={page.faqHeading} items={page.faqs} image={page.faqImage} />
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
