import type { Metadata } from "next";
import MarketingPageView from "@/components/marketing/MarketingPageView";
import { ABOUT_PAGE } from "@/content/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  path: ABOUT_PAGE.path,
});

export default function AboutPage() {
  return <MarketingPageView page={ABOUT_PAGE} />;
}
