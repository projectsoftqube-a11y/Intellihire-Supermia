import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import FaqExplorer from "@/components/faq/FaqExplorer";
import CtaBand from "@/components/CtaBand";
import { JsonLd } from "@/components/ui";
import { faqGroups } from "@/content/faq";
import { getBillingPlans } from "@/lib/billing";
import { hasPublishedPrices } from "@/lib/pricing";
import {
  breadcrumbNode,
  buildMetadata,
  faqEntities,
  webPageNode,
  type Crumb,
} from "@/lib/seo";
import { CONTACT_EMAIL, DEMO_URL, PRICING_NOTIFY_MAILTO } from "@/lib/site";

// The pricing answer is built from the billing API, so render per request
// like /pricing and the homepage.
export const dynamic = "force-dynamic";

const PATH = "/faq";
const TITLE = "IntelliHire FAQ: AI Screening, Interviews and Your Data";
const DESCRIPTION =
  "Answers about IntelliHire: how resume screening and matching work, how AI voice interviews run, who makes decisions, pricing status and candidate data.";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: PATH },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function FaqPage() {
  const plans = await getBillingPlans();
  const groups = faqGroups(plans);
  const published = hasPublishedPrices(plans);

  const graph = [
    webPageNode({
      type: "FAQPage",
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      dateModified: "2026-10-27",
      aboutSoftware: true,
      extra: {
        mainEntity: faqEntities(groups.flatMap((group) => group.items)),
      },
    }),
    breadcrumbNode(PATH, CRUMBS),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <FaqExplorer
          title="IntelliHire FAQ: Screening, AI Interviews, Pricing, Privacy and Oversight"
          answer="IntelliHire is AI recruitment software from SuperMIA that parses resumes, ranks candidates against the rubric a hiring team sets, runs first-round AI voice interviews and writes scorecards citing the interview transcript. People make every hiring decision: no candidate is ever rejected by a machine."
          groups={groups}
          demoUrl={DEMO_URL}
          email={CONTACT_EMAIL}
          notify={
            published
              ? undefined
              : { label: "Get notified when prices are published", href: PRICING_NOTIFY_MAILTO }
          }
        />

        <Reveal>
          <CtaBand
            eyebrow="Still have a question?"
            heading="Bring a Real Role to Your Demo"
            body="See how IntelliHire would screen, interview and score a role you are hiring for now, and where your team stays in control."
            secondary={{
              label: "Email us your question",
              href: "mailto:hello@supermia.ai?subject=IntelliHire%20question",
            }}
            footnote={null}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
