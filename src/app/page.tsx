import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import HiringGap from "@/components/HiringGap";
import HiringFlow from "@/components/HiringFlow";
import HumanBalance from "@/components/HumanBalance";
import FeatureSuite from "@/components/FeatureSuite";
import Differentiators from "@/components/home/Differentiators";
import SecurityControls from "@/components/home/SecurityControls";
import Audiences from "@/components/home/Audiences";
import Pricing from "@/components/Pricing";
import HomeFaq, { HOME_FAQS } from "@/components/home/HomeFaq";
import FinalCta from "@/components/FinalCta";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/ui";
import { getBillingPlans } from "@/lib/billing";
import { homePricingIntro } from "@/lib/pricing";
import { buildMetadata, faqPageNode, webPageNode } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SOFTWARE_ID } from "@/lib/site";

// Pricing comes from the billing API. Rebuild the page in the background at
// most once a minute, so plan changes show within a minute while visitors get
// the cached page instantly instead of waiting on the API.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

const PAGE_GRAPH = [
  webPageNode({
    path: "/",
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    dateModified: "2026-10-27",
    aboutSoftware: true,
    hasBreadcrumb: false,
    extra: {
      mainEntity: { "@id": SOFTWARE_ID },
      mainEntityOfPage: { "@id": `${SITE_URL}/#faq` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
  }),
  // The homepage FAQ preview, eligible for People Also Ask in its own right.
  faqPageNode("/", HOME_FAQS)!,
];

export default async function Home() {
  const plans = await getBillingPlans();

  return (
    <>
      <JsonLd nodes={PAGE_GRAPH} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <HiringGap />
        <HiringFlow />
        <HumanBalance />
        <FeatureSuite />
        <Reveal>
          <Differentiators />
          <SecurityControls />
          <Audiences />
        </Reveal>
        <Pricing plans={plans} intro={homePricingIntro(plans)} />
        {/* The brochure section returns once a corrected PDF replaces
            /images/IntelliHire.pdf (see the SEO handoff). */}
        <Reveal>
          <HomeFaq />
        </Reveal>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
