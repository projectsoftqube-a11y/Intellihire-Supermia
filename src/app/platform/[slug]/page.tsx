import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPageView from "@/components/marketing/MarketingPageView";
import { PLATFORM_PAGES } from "@/content/platform";
import { getPlatformPage } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/platform/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
  });
}

export default async function PlatformPage({
  params,
}: PageProps<"/platform/[slug]">) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();
  return <MarketingPageView page={page} />;
}
