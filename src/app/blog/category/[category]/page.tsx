import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import PostCard from "@/components/blog/PostCard";
import CategoryChips from "@/components/blog/CategoryChips";
import { Eyebrow, JsonLd } from "@/components/ui";
import {
  INDEX_THRESHOLD,
  getCategory,
  liveCategories,
  postPath,
  postsInCategory,
} from "@/content/blog";
import { absoluteUrl, breadcrumbNode, buildMetadata, webPageNode } from "@/lib/seo";

export const dynamicParams = false;

/** Only categories with at least one post get a page (blog brief). */
export function generateStaticParams() {
  return liveCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: category.path,
    // noindex, follow until the category has three posts.
    noindex: postsInCategory(category.slug).length < INDEX_THRESHOLD,
  });
}

export default async function BlogCategoryPage({
  params,
}: PageProps<"/blog/category/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = postsInCategory(category.slug);
  if (posts.length === 0) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: category.path },
  ];

  const graph = [
    webPageNode({
      type: "CollectionPage",
      path: category.path,
      name: category.metaTitle,
      description: category.metaDescription,
      dateModified: "2026-10-27",
      speakableSelectors: null,
      extra:
        posts.length >= INDEX_THRESHOLD
          ? {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: posts.map((post, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: absoluteUrl(postPath(post)),
                  name: post.h1,
                })),
              },
            }
          : undefined,
    }),
    breadcrumbNode(category.path, crumbs),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <PageHero
          crumbs={crumbs}
          eyebrow="IntelliHire Blog"
          title={category.h1}
          lead={category.intro}
        >
          <div className="mt-9">
            <CategoryChips active={category.slug} />
          </div>
        </PageHero>

        <Reveal>
          <section className="relative px-4 py-20 sm:px-5 md:px-10 md:py-28">
            <div className="mx-auto max-w-[1920px]">
              <div data-reveal>
                <Eyebrow>{posts.length === 1 ? "1 guide" : `${posts.length} guides`}</Eyebrow>
                <h2 className="mt-7 font-display text-[clamp(28px,3.4vw,52px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
                  {category.name} guides
                </h2>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} priority={i === 0} />
                ))}
              </div>
            </div>
          </section>

          <CtaBand
            eyebrow="From reading to hiring"
            heading="Put the Guide Into Practice"
            body="Bring a role you are hiring for now, and we'll walk through how IntelliHire would screen, interview and score it while your team makes every decision."
            secondary={{ label: "Browse all guides", href: "/blog" }}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
