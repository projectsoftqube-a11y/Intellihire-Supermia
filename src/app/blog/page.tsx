import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import PostCard from "@/components/blog/PostCard";
import Pagination, { pageFromParam, pageHref } from "@/components/blog/Pagination";
import { Eyebrow, JsonLd, PillButton } from "@/components/ui";
import {
  BLOG_POSTS,
  INDEX_THRESHOLD,
  POSTS_PER_PAGE,
  liveCategories,
  postPath,
  postsInCategory,
  sortedPosts,
} from "@/content/blog";
import { absoluteUrl, breadcrumbNode, buildMetadata, webPageNode, type Crumb } from "@/lib/seo";

const PATH = "/blog";
const TITLE = "AI Recruiting Guides and Hiring Insights | IntelliHire Blog";
const DESCRIPTION =
  "Practical guides on AI in recruiting: scoring rubrics, structured interviews, interview integrity, hiring laws and the recruitment metrics worth tracking.";
const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: PATH },
];

const TOTAL_PAGES = Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE));

export async function generateMetadata({ searchParams }: PageProps<"/blog">): Promise<Metadata> {
  const page = pageFromParam((await searchParams).page) ?? 1;
  return buildMetadata({
    title: page > 1 ? `${TITLE} (Page ${page})` : TITLE,
    description: DESCRIPTION,
    path: pageHref(PATH, page),
    // Handoff: noindex, follow until at least three posts are live.
    noindex: BLOG_POSTS.length < INDEX_THRESHOLD,
  });
}

/** Hero intro: one sentence naming who the guides are for and what they cover. */
const HERO_INTRO =
  "Practical AI recruiting guides for HR teams, recruitment agencies and small businesses, from scoring rubrics and structured interviews to hiring laws and time to hire.";

export default async function BlogHubPage({ searchParams }: PageProps<"/blog">) {
  const page = pageFromParam((await searchParams).page);
  if (page === null || page > TOTAL_PAGES) notFound();

  const posts = sortedPosts();
  const pagePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const [lead, ...rest] = pagePosts;
  const categories = liveCategories();
  const latest = posts[0];

  const graph = [
    webPageNode({
      type: "CollectionPage",
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
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
    breadcrumbNode(PATH, CRUMBS),
  ];

  return (
    <>
      <JsonLd nodes={graph} />
      <SiteHeader />
      <main id="main" className="bg-brand-surface">
        <PageHero
          eyebrow="IntelliHire Blog"
          title="IntelliHire Blog: AI Recruiting, Interviews and Hiring Analytics"
          lead={[HERO_INTRO]}
          actions={latest && <PillButton href={postPath(latest)}>Read the latest guide</PillButton>}
          aside={
            page === 1 && categories.length > 0 ? (
              <nav
                aria-label="Guide topics"
                className="rounded-[24px] border border-[#ffffff]/12 bg-[#ffffff]/[0.05] p-6 backdrop-blur sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="m-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ffffff]/45">
                    Browse by topic
                  </p>
                  <p className="m-0 text-[12px] text-[#ffffff]/45">{posts.length} guides</p>
                </div>
                <ul className="m-0 mt-4 flex list-none flex-col divide-y divide-[#ffffff]/10 p-0">
                  {categories.map((category) => {
                    const count = postsInCategory(category.slug).length;
                    return (
                      <li key={category.slug}>
                        <a
                          href={`#topic-${category.slug}`}
                          className="group flex items-center justify-between gap-4 py-4 text-[#ffffff] transition-colors duration-200 hover:text-[#087ef5]"
                        >
                          <span className="text-[17px] font-semibold">{category.name}</span>
                          <span className="flex shrink-0 items-center gap-2 text-[13px] text-[#ffffff]/50 transition-colors duration-200 group-hover:text-[#087ef5]">
                            {count === 1 ? "1 guide" : `${count} guides`}
                            <ArrowDown
                              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : undefined
          }
        />

        <Reveal>
          <section id="latest" className="relative scroll-mt-24 px-4 py-12 sm:px-5 md:px-10 md:py-16">
            <div className="mx-auto max-w-[1920px]">
              <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>Latest</Eyebrow>
                  <h2 className="mt-7 font-display text-[clamp(30px,3.6vw,56px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
                    Latest Hiring Guides
                  </h2>
                </div>
                <p className="m-0 text-[14px] text-[#5b6575]">
                  {posts.length} guides · page {page} of {TOTAL_PAGES}
                </p>
              </div>

              {lead && (
                <div className="mt-8 md:mt-10">
                  <PostCard post={lead} featured priority />
                </div>
              )}

              {rest.length > 0 && (
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}

              <Pagination basePath={PATH} page={page} totalPages={TOTAL_PAGES} />
            </div>
          </section>

          {page === 1 && categories.length > 0 && (
            <section id="topics" className="relative scroll-mt-24 px-4 pb-8 sm:px-5 md:px-10">
              <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-5 lg:grid-cols-3">
                {categories.map((category, i) => {
                  const inCategory = postsInCategory(category.slug);
                  return (
                    <section
                      data-reveal
                      key={category.slug}
                      aria-labelledby={`topic-${category.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-[26px] bg-[#071a3d] p-7 md:p-9"
                    >
                      <span
                        className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#087ef5]/25 blur-[70px] transition-opacity duration-500 group-hover:opacity-100 lg:opacity-60"
                        aria-hidden="true"
                      />
                      <span className="relative font-display text-[15px] text-[#087ef5]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`topic-${category.slug}`}
                        className="relative m-0 mt-5 scroll-mt-32 font-display text-[clamp(24px,2.2vw,34px)] leading-[1.1] font-normal text-[#ffffff]"
                      >
                        {category.name}
                      </h2>
                      <p className="relative m-0 mt-4 text-[15px] leading-[1.7] text-[#ffffff]/65">
                        {category.hubIntro}
                      </p>
                      <ul className="relative m-0 mt-7 flex list-none flex-col border-t border-[#ffffff]/10 p-0">
                        {inCategory.slice(0, 3).map((post) => (
                          <li key={post.slug} className="border-b border-[#ffffff]/10">
                            <Link
                              href={postPath(post)}
                              className="group/item flex items-start justify-between gap-4 py-4 text-[14.5px] leading-[1.5] font-semibold text-[#ffffff]/85 transition-colors duration-200 hover:text-[#ffffff]"
                            >
                              {post.h1}
                              <ArrowRight
                                className="mt-1 h-4 w-4 shrink-0 text-[#087ef5] transition-transform duration-200 group-hover/item:translate-x-1"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </section>
          )}

          <CtaBand
            eyebrow="From reading to hiring"
            heading="Put the Guide Into Practice"
            body="If a guide here has you rebuilding your rubric or your interview scorecard, IntelliHire has both built in: you set the rubric, and every scorecard cites the interview transcript. Bring a role you are hiring for now, and we'll walk through how IntelliHire would screen, interview and score it while your team makes every decision. Have a question first? Read the [IntelliHire FAQ](/faq)."
            secondary={{ label: "See how it works", href: "/#how-it-works" }}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
