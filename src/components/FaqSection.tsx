import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { ArrowLink, Eyebrow, RichText } from "@/components/ui";
import type { ImageRef } from "@/content/types";

/**
 * Visible FAQ block: a navy panel with the heading beside a white panel
 * holding the questions, both inside one rounded card. The page adds the
 * matching FAQPage markup from the same items. With an `image`, the navy
 * panel shows the photo under an overlay that is darkest behind the text.
 */
export default function FaqSection({
  id = "faqs",
  heading,
  intro,
  items,
  link = { label: "See all IntelliHire FAQs", href: "/faq" },
  image,
}: {
  id?: string;
  heading: string;
  intro?: string;
  items: { question: string; answer: string }[];
  link?: { label: string; href: string } | null;
  image?: ImageRef;
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="relative scroll-mt-24 px-4 py-8 sm:px-5 md:px-10 md:py-12">
      <div className="relative mx-auto grid max-w-[1920px] grid-cols-1 overflow-hidden rounded-[28px] border border-[#e5eaf0] bg-[#ffffff] shadow-[0_30px_70px_-50px_rgba(7,26,61,0.45)] sm:rounded-[34px] lg:grid-cols-12">
        <div className={`relative overflow-hidden bg-[#071a3d] px-6 py-10 sm:px-8 md:px-12 md:py-14 lg:col-span-5 xl:col-span-4 ${image ? "min-h-[420px]" : ""}`}>
          <span
            className="pointer-events-none absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-[#087ef5]/25 blur-[110px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-20 -bottom-24 h-[280px] w-[280px] rounded-full bg-[#ff6b00]/10 blur-[110px]"
            aria-hidden="true"
          />
          {image ? (
            <>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Darkest behind the heading, so the photo shows through
                  lower down without costing legibility. */}
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071a3d] via-[#071a3d]/80 to-[#071a3d]/25"
                aria-hidden="true"
              />
            </>
          ) : (
            <span
              className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_20%_10%,black,transparent_70%)]"
              aria-hidden="true"
            />
          )}
          <div data-reveal className="relative lg:sticky lg:top-28">
            <Eyebrow tone="onDark">FAQ</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(28px,3vw,46px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#ffffff]">
              {heading}
            </h2>
            {intro && (
              <p className="m-0 mt-5 max-w-[420px] text-[clamp(15px,1.15vw,17px)] leading-[1.7] text-[#ffffff]/65">
                <RichText
                  text={intro}
                  linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 hover:text-[#087ef5]"
                />
              </p>
            )}
            <p className="m-0 mt-6 text-[13px] font-medium text-[#ffffff]/45">
              {items.length === 1 ? "1 question answered" : `${items.length} questions answered`}
            </p>
            {link && (
              <ArrowLink href={link.href} tone="light" className="mt-7">
                {link.label}
              </ArrowLink>
            )}
          </div>
        </div>

        <div data-reveal className="px-6 py-6 sm:px-8 md:px-12 md:py-10 lg:col-span-7 xl:col-span-8">
          <FaqAccordion items={items} openFirst />
        </div>
      </div>
    </section>
  );
}
