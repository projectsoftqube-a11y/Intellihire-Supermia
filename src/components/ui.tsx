import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DEMO_URL } from "@/lib/site";
import { serializeJsonLd, type JsonLdNode } from "@/lib/seo";

/*
 * Shared building blocks for the inner pages. They reproduce the homepage's
 * visual language (orange-ruled eyebrows, Questrial display headings, pill
 * buttons with a circular arrow) so new pages read as part of the same site.
 */

/** GA4 event for a link, inferred from its destination. */
export function trackFor(href: string): string | undefined {
  if (href === DEMO_URL) return "book_demo_click";
  if (href.startsWith("mailto:")) {
    return /subject=IntelliHire%20pricing/i.test(href)
      ? "pricing_notify_click"
      : "contact_email_click";
  }
  if (href.startsWith("https://app.intellihire")) return "login_click";
  return undefined;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function Eyebrow({
  children,
  tone = "onLight",
  className = "",
}: {
  children: ReactNode;
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  return (
    <p
      className={`m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase ${
        tone === "onDark" ? "text-[#ffffff]/90" : "text-[#066bd4]"
      } ${className}`}
    >
      <span className="h-px w-10 shrink-0 bg-[#ff6b00]" aria-hidden="true" />
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** "light" sits on dark backgrounds, "dark" on light ones. */
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
  /** Overrides the inferred GA4 event. */
  track?: string;
};

/** The homepage's primary pill button with a circular arrow chip. */
export function PillButton({
  href,
  children,
  tone = "light",
  size = "md",
  className = "",
  track,
}: ButtonProps) {
  const external = isExternal(href);
  const event = track ?? trackFor(href);
  const Icon = external ? ArrowUpRight : ArrowRight;

  const classes = `group inline-flex max-w-full items-center gap-4 rounded-full py-2 pr-2 font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087ef5] ${
    size === "lg"
      ? "min-h-[60px] pl-8 text-[15px] sm:min-h-[64px] sm:pl-9 sm:text-[16px]"
      : "min-h-[56px] pl-7 text-[15px]"
  } ${
    tone === "light"
      ? "bg-[#ffffff] text-[#071a3d] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:bg-[#087ef5] hover:text-[#ffffff] hover:shadow-[0_14px_32px_rgba(8,126,245,0.45)]"
      : "bg-[#071a3d] text-[#ffffff] shadow-[0_8px_24px_rgba(7,26,61,0.22)] hover:bg-[#087ef5] hover:shadow-[0_14px_32px_rgba(8,126,245,0.4)]"
  } ${className}`;

  const inner = (
    <>
      <span className="min-w-0 leading-snug">{children}</span>
      <span
        className={`grid h-[40px] w-[40px] shrink-0 place-items-center rounded-full transition-all duration-300 ${
          external ? "" : "group-hover:rotate-45"
        } ${
          tone === "light"
            ? "bg-[#071a3d] text-[#ffffff] group-hover:bg-[#ffffff] group-hover:text-[#087ef5]"
            : "bg-[#ffffff] text-[#071a3d] group-hover:text-[#087ef5]"
        }`}
      >
        <Icon
          className={`h-[18px] w-[18px] transition-transform duration-300 ${
            external ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : ""
          }`}
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        data-track={event}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-track={event}>
      {inner}
    </Link>
  );
}

/** Secondary underlined text link with an arrow. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className = "",
  track,
}: ButtonProps) {
  const external = isExternal(href);
  const event = track ?? trackFor(href);
  const classes = `group relative inline-flex items-center gap-2 pb-1 text-[15px] font-semibold transition-colors duration-300 ${
    tone === "light"
      ? "text-[#ffffff] hover:text-[#ffffff]/80"
      : "text-[#071a3d] hover:text-[#087ef5]"
  } ${className}`;

  const inner = (
    <>
      {children}
      {external ? (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-0 ${
          tone === "light" ? "bg-[#ffffff]/40" : "bg-[#071a3d]/25"
        }`}
        aria-hidden="true"
      />
    </>
  );

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        data-track={event}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-track={event}>
      {inner}
    </Link>
  );
}

/** Renders `[text](href)` links and `**bold**` inside a content string. */
export function RichText({
  text,
  linkClassName = "font-semibold text-[#066bd4] underline decoration-[#087ef5]/30 underline-offset-4 transition-colors duration-200 hover:decoration-[#087ef5]",
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[3] !== undefined) {
      parts.push(
        <strong key={key++} className="font-semibold text-inherit">
          {match[3]}
        </strong>,
      );
    } else {
      const [, label, href] = match;
      const event = trackFor(href);
      if (isExternal(href) || href.startsWith("mailto:")) {
        parts.push(
          <a
            key={key++}
            href={href}
            className={linkClassName}
            data-track={event}
            {...(isExternal(href)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {label}
          </a>,
        );
      } else {
        parts.push(
          <Link key={key++} href={href} className={linkClassName}>
            {label}
          </Link>,
        );
      }
    }
    last = pattern.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function JsonLd({ nodes }: { nodes: JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(nodes) }}
    />
  );
}
