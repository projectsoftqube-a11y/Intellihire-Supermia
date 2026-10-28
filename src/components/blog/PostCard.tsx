import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/content/types";
import { formatDate, getCategory, postPath, readingMinutes } from "@/content/blog";

export default function PostCard({
  post,
  headingLevel = "h3",
  featured = false,
  priority = false,
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  featured?: boolean;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  const category = getCategory(post.category);

  return (
    <article
      data-reveal
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e5eaf0] bg-[#ffffff] transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/40 hover:shadow-[0_26px_60px_-28px_rgba(7,26,61,0.35)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* The featured card keeps a real aspect ratio on desktop rather than
          stretching to the text column's height, which left a wide, shallow
          letterbox when the copy was short. */}
      <div
        className={`relative overflow-hidden bg-[#071a3d] ${
          featured
            ? "aspect-[16/10] lg:aspect-[4/3] lg:w-[46%] lg:shrink-0"
            : "aspect-[16/10]"
        }`}
      >
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071a3d]/55 to-transparent"
          aria-hidden="true"
        />
        {category && (
          <span className="absolute top-4 left-4 rounded-full bg-[#ffffff]/95 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#071a3d] backdrop-blur">
            {category.name}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-10 xl:p-12" : ""}`}>
        <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] font-medium text-[#5b6575]">
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} min read</span>
        </p>
        <Heading
          className={`m-0 mt-3 font-display leading-[1.2] font-normal tracking-[-0.01em] text-[#071a3d] transition-colors duration-300 group-hover:text-[#087ef5] ${
            featured ? "text-[clamp(24px,2.4vw,36px)]" : "text-[clamp(19px,1.55vw,23px)]"
          }`}
        >
          <Link href={postPath(post)} className="after:absolute after:inset-0 after:content-['']">
            {post.h1}
          </Link>
        </Heading>
        <p className={`m-0 mt-3 text-[14.5px] leading-[1.65] text-[#5b6575] ${featured ? "md:text-[16px]" : ""}`}>
          {post.excerpt}
        </p>
        {/* In the grid the link sits at the card's foot so every card lines
            up; on the featured card the column is already centred, so it
            follows the copy instead of being pushed down. */}
        <span
          className={`inline-flex items-center gap-2 text-[14px] font-semibold text-[#071a3d] transition-colors duration-300 group-hover:text-[#087ef5] ${
            featured ? "mt-6" : "mt-auto pt-6"
          }`}
        >
          Read the guide
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
