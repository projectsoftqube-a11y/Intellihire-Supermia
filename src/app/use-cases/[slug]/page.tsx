import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPageView from "@/components/marketing/MarketingPageView";
import { USE_CASE_PAGES } from "@/content/use-cases";
import { getUseCasePage } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/use-cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCasePage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
  });
}

export default async function UseCasePage({
  params,
}: PageProps<"/use-cases/[slug]">) {
  const { slug } = await params;
  const page = getUseCasePage(slug);
  if (!page) notFound();
  return <MarketingPageView page={page} />;
}
