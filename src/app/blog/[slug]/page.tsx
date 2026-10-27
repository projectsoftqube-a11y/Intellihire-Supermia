import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, CalendarDays, Clock, ExternalLink, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import ArticleBody from "@/components/blog/ArticleBody";
import PostCard from "@/components/blog/PostCard";
import { Eyebrow, JsonLd, PillButton, RichText } from "@/components/ui";
import {
  BLOG_POSTS,
  formatDate,
  getCategory,
  getPost,
  postPath,
  readingMinutes,
  sortedPosts,
  wordCount,
} from "@/content/blog";
import { linkSummary } from "@/content";
import { absoluteUrl, breadcrumbNode, buildMetadata, type Crumb } from "@/lib/seo";
import { BRAND_NAME, DEMO_URL, ORG_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: postPath(post),
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category)!;
  const path = postPath(post);
  const url = absoluteUrl(path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: category.path },
    { name: post.h1, path },
  ];
  const toc = post.blocks.filter((block) => block.type === "h2");
  const supports = linkSummary(post.supports);
  const related = sortedPosts(
    BLOG_POSTS.filter((p) => p.slug !== post.slug),
  )
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.h1,
      name: post.metaTitle,
      description: post.metaDescription,
      url,
      mainEntityOfPage: url,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      inLanguage: "en-US",
      articleSection: category.name,
      wordCount: wordCount(post),
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}${post.image.src}`,
        width: post.image.width,
        height: post.image.height,
      },
      author: { "@type": "Organization", name: BRAND_NAME, url: `${SITE_URL}/` },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbNode(path, crumbs),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <article>
          <header className="relative px-4 pt-24 sm:px-5 sm:pt-28 md:px-10">
            <div className="mx-auto max-w-[1920px]">
              <div className="px-1">
                <Breadcrumbs crumbs={crumbs} />
              </div>

              <div className="mx-auto mt-10 max-w-[980px] text-center md:mt-14">
                <Link
                  href={category.path}
                  className="inline-flex items-center gap-2 rounded-full border border-[#087ef5]/25 bg-[#087ef5]/[0.08] px-4 py-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-[#087ef5] transition-colors duration-200 hover:bg-[#087ef5] hover:text-[#ffffff]"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  {category.name}
                </Link>
                <h1 className="m-0 mt-7 font-display text-[clamp(30px,4.4vw,64px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#071a3d]">
                  {post.h1}
                </h1>
                <p className="mx-auto m-0 mt-6 max-w-[720px] text-[clamp(16px,1.3vw,19px)] leading-[1.7] text-[#5b6575]">
                  {post.excerpt}
                </p>
                <p className="m-0 mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-[#5b6575]">
                  <span className="inline-flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071a3d] text-[#ffffff]">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    IntelliHire Team
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-[#087ef5]" aria-hidden="true" />
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#087ef5]" aria-hidden="true" />
                    {readingMinutes(post)} min read
                  </span>
                </p>
              </div>

              <div className="ih-rise relative mx-auto mt-10 aspect-[16/9] max-w-[1280px] overflow-hidden rounded-[24px] bg-[#071a3d] sm:rounded-[30px] md:mt-14">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </div>
            </div>
          </header>

          <Reveal>
            <div className="px-4 pt-14 pb-10 sm:px-5 md:px-10 md:pt-20">
              <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                <aside className="lg:col-span-3">
                  <div className="lg:sticky lg:top-28">
                    <details className="faq group rounded-[20px] border border-[#e5eaf0] bg-[#ffffff] p-5 lg:hidden">
                      <summary className="flex list-none items-center justify-between text-[14px] font-semibold text-[#071a3d] [&::-webkit-details-marker]:hidden">
                        On this page
                        <span className="text-[#087ef5] transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ol className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                        {toc.map((block) =>
                          block.type === "h2" ? (
                            <li key={block.id}>
                              <a href={`#${block.id}`} className="text-[14px] leading-[1.5] text-[#5b6575] hover:text-[#087ef5]">
                                {block.text}
                              </a>
                            </li>
                          ) : null,
                        )}
                      </ol>
                    </details>

                    <nav aria-label="On this page" className="hidden lg:block">
                      <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#071a3d]/40">
                        On this page
                      </p>
                      <ol className="m-0 mt-5 flex list-none flex-col p-0">
                        {toc.map((block, n) =>
                          block.type === "h2" ? (
                            <li key={block.id}>
                              <a
                                href={`#${block.id}`}
                                className="flex gap-3 border-l-2 border-[#e5eaf0] py-2.5 pl-4 text-[14px] leading-[1.5] text-[#5b6575] transition-colors duration-200 hover:border-[#087ef5] hover:text-[#071a3d]"
                              >
                                <span className="font-display text-[12px] text-[#071a3d]/30">
                                  {String(n + 1).padStart(2, "0")}
                                </span>
                                {block.text}
                              </a>
                            </li>
                          ) : null,
                        )}
                      </ol>
                    </nav>
                  </div>
                </aside>

                <div className="min-w-0 lg:col-span-6">
                  {post.disclosure && (
                    <p className="m-0 mb-8 rounded-[18px] border border-[#ff6b00]/30 bg-[#ff6b00]/[0.06] px-5 py-4 text-[14.5px] leading-[1.7] text-[#3c4656]">
                      <span className="font-semibold text-[#071a3d]">Disclosure: </span>
                      {post.disclosure}
                    </p>
                  )}

                  <div className="flex flex-col gap-5">
                    {post.intro.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="m-0 text-[17.5px] leading-[1.85] text-[#071a3d] md:text-[19px]"
                      >
                        <RichText text={paragraph} />
                      </p>
                    ))}
                  </div>

                  <div className="my-10 rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6 sm:p-7">
                    <p className="m-0 flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#087ef5]">
                      <span className="h-px w-8 bg-[#ff6b00]" aria-hidden="true" />
                      Key takeaways
                    </p>
                    <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                      {post.takeaways.map((item) => (
                        <li key={item} className="flex gap-3 text-[15.5px] leading-[1.7] text-[#3c4656]">
                          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#087ef5]" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ArticleBody blocks={post.blocks} />

                  {post.faqs && post.faqs.length > 0 && (
                    <section id="faqs" className="mt-14 scroll-mt-28">
                      <h2 className="m-0 font-display text-[clamp(25px,2.4vw,34px)] leading-[1.18] font-normal tracking-[-0.015em] text-[#071a3d]">
                        Frequently asked questions
                      </h2>
                      <div className="mt-6">
                        <FaqAccordion items={post.faqs} />
                      </div>
                    </section>
                  )}

                  {post.sources && post.sources.length > 0 && (
                    <section id="sources" className="mt-14 scroll-mt-28 rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6 sm:p-7">
                      <h2 className="m-0 text-[18px] font-semibold text-[#071a3d]">Sources</h2>
                      <ol className="m-0 mt-5 flex list-none flex-col gap-4 p-0">
                        {post.sources.map((source, n) => (
                          <li key={source.url} className="flex gap-3 text-[14px] leading-[1.6] text-[#5b6575]">
                            <span className="font-display text-[13px] text-[#087ef5]">{n + 1}.</span>
                            <span className="min-w-0">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline font-semibold break-words text-[#071a3d] underline decoration-[#087ef5]/30 underline-offset-4 hover:text-[#087ef5]"
                              >
                                {source.title}
                                <ExternalLink className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                              </a>
                              <span className="block">
                                {source.publisher} · accessed {formatDate(source.accessed)}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                </div>

                <aside className="lg:col-span-3">
                  <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                    {supports && (
                      <Link
                        href={supports.path}
                        className="group relative block overflow-hidden rounded-[22px] bg-[#071a3d] p-6 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <span
                          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#087ef5]/30 blur-[60px]"
                          aria-hidden="true"
                        />
                        <span className="relative block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#087ef5]">
                          In IntelliHire
                        </span>
                        <span className="relative mt-4 block font-display text-[21px] leading-[1.25] text-[#ffffff]">
                          {supports.title}
                        </span>
                        <span className="relative mt-2.5 block text-[14px] leading-[1.6] text-[#ffffff]/60">
                          {supports.description}
                        </span>
                        <span className="relative mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#ffffff]">
                          See how it works
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    )}
                    <div className="rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6">
                      <p className="m-0 text-[15px] leading-[1.6] font-semibold text-[#071a3d]">
                        See it on a role you are hiring for now.
                      </p>
                      <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-[#5b6575]">
                        AI does the reading. Your team makes the call.
                      </p>
                      <PillButton href={DEMO_URL} tone="dark" className="mt-5">
                        Book a demo
                      </PillButton>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </Reveal>
        </article>

        <Reveal>
            {related.length > 0 && (
              <section className="px-4 py-16 sm:px-5 md:px-10 md:py-20">
                <div className="mx-auto max-w-[1920px]">
                  <div data-reveal>
                    <Eyebrow>Keep reading</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(26px,2.8vw,42px)] leading-[1.08] font-normal tracking-[-0.02em] text-[#071a3d]">
                      More hiring guides
                    </h2>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {related.map((item) => (
                      <PostCard key={item.slug} post={item} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            <CtaBand
              eyebrow="Put the guide into practice"
              heading="See IntelliHire on Your Next Open Role"
              body="Bring a role you are hiring for now. We'll walk through how IntelliHire would screen, interview and score it while your team makes every decision."
              secondary={{ label: "See how it works", href: "/#how-it-works" }}
            />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
