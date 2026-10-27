import Image from "next/image";
import { Ban, KeyRound, Lock, ScrollText, Timer, UserCheck } from "lucide-react";
import { Eyebrow, RichText } from "@/components/ui";

const CONTROLS = [
  {
    icon: Lock,
    title: "Encryption",
    text: "Encryption in transit and at rest, on multi-tenant infrastructure.",
  },
  {
    icon: KeyRound,
    title: "Access control",
    text: "Role-based access with least-privilege internal access, and audit logging of access to candidate records.",
  },
  {
    icon: Timer,
    title: "Configurable retention",
    text: "You can set retention periods for candidate records, and interview recordings and transcripts follow configurable retention windows. When a period ends, records are deleted or irreversibly anonymized.",
  },
  {
    icon: ScrollText,
    title: "Consent management",
    text: "As data controller, your organization obtains any required candidate consent for recording and automated processing.",
  },
  {
    icon: Ban,
    title: "No sale of data",
    text: "IntelliHire does not sell personal information.",
  },
  {
    icon: UserCheck,
    title: "Candidate rights",
    text: "Candidates can ask about automated processing and, where the law provides, request human review.",
  },
];

export default function SecurityControls() {
  return (
    <section
      id="security"
      className="relative scroll-mt-20 bg-brand-surface px-4 pb-24 sm:px-5 md:px-10 md:pb-32"
    >
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div data-reveal>
              <Eyebrow>Trust</Eyebrow>
              <h2 className="mt-8 font-display text-[clamp(30px,3.8vw,58px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
                Security, Privacy{" "}
                <span className="block text-[#087ef5]">and Data Controls</span>
              </h2>
              <p className="mt-7 max-w-[520px] text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-[#5b6575]">
                Your legal and IT reviewers will ask how candidate data is
                protected and who can see it. Here is what the privacy policy
                commits to.
              </p>
            </div>

            <div
              data-reveal
              className="relative mt-10 hidden aspect-[16/11] overflow-hidden rounded-[24px] bg-[#071a3d] lg:block"
            >
              <Image
                src="/images/feature-platform.png"
                alt="Engineer reviewing IntelliHire access control and system architecture screens"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:gap-5">
            {CONTROLS.map(({ icon: Icon, title, text }) => (
              <li
                data-reveal
                key={title}
                className="group rounded-[22px] border border-[#e5eaf0] bg-[#ffffff] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/40 hover:shadow-[0_18px_44px_-18px_rgba(7,26,61,0.25)] md:p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#087ef5]/10 text-[#087ef5] transition-colors duration-300 group-hover:bg-[#087ef5] group-hover:text-[#ffffff]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="m-0 mt-6 text-[17px] leading-snug font-semibold text-[#071a3d]">
                  {title}
                </p>
                <p className="m-0 mt-2.5 text-[14.5px] leading-[1.65] text-[#5b6575]">
                  {text}
                </p>
              </li>
            ))}
          </ul>

          <div
            data-reveal
            className="mt-5 rounded-[22px] border border-[#071a3d] bg-[#071a3d] p-6 md:p-8"
          >
            <p className="m-0 text-[15px] leading-[1.7] text-[#ffffff]/75 md:text-[16px]">
              <RichText
                text="Enterprise plans also add **multi-tenant isolation, SSO, and custom retention and audit logging**. Read the full [privacy policy](/privacy) and [terms and conditions](/terms)."
                linkClassName="font-semibold text-[#ffffff] underline decoration-[#087ef5] underline-offset-4 transition-colors hover:text-[#087ef5]"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
