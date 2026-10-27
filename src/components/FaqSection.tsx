import FaqAccordion from "@/components/FaqAccordion";
import { ArrowLink, Eyebrow, RichText } from "@/components/ui";

/** Visible FAQ block (no FAQPage markup; that lives on /faq only). */
export default function FaqSection({
  id = "faqs",
  heading,
  intro,
  items,
  link = { label: "See all IntelliHire FAQs", href: "/faq" },
}: {
  id?: string;
  heading: string;
  intro?: string;
  items: { question: string; answer: string }[];
  link?: { label: string; href: string } | null;
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="relative scroll-mt-24 px-4 py-20 sm:px-5 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(28px,3.2vw,48px)] leading-[1.06] font-normal tracking-[-0.02em] text-[#071a3d]">
              {heading}
            </h2>
            {intro && (
              <p className="m-0 mt-5 max-w-[420px] text-[clamp(15px,1.15vw,17px)] leading-[1.7] text-[#5b6575]">
                <RichText text={intro} />
              </p>
            )}
            {link && (
              <ArrowLink href={link.href} className="mt-7">
                {link.label}
              </ArrowLink>
            )}
          </div>
        </div>
        <div data-reveal className="lg:col-span-8">
          <FaqAccordion items={items} openFirst />
        </div>
      </div>
    </section>
  );
}
