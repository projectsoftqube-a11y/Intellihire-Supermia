import { Building2, ClipboardCheck, Rocket, UsersRound } from "lucide-react";
import { Eyebrow, RichText } from "@/components/ui";

const AUDIENCES = [
  {
    icon: UsersRound,
    label: "High-Volume Hiring",
    text: "Teams doing high-volume hiring that need every application read and every shortlisted candidate interviewed. See [high-volume hiring software](/use-cases/high-volume-hiring).",
  },
  {
    icon: Building2,
    label: "Recruitment Agencies",
    text: "Recruitment agencies running first rounds for several client roles at once, with scorecards that cite the transcript. See [IntelliHire for recruitment agencies](/use-cases/recruitment-agencies).",
  },
  {
    icon: ClipboardCheck,
    label: "HR and Talent Teams",
    text: "In-house HR and talent teams that want consistent first rounds and evidence-backed scorecards. See [IntelliHire for HR teams](/use-cases/hr-teams).",
  },
  {
    icon: Rocket,
    label: "Startups and SMBs",
    text: "Startups and small businesses hiring without a full recruiting team. See [IntelliHire for startups](/use-cases/startups).",
  },
];

export default function Audiences() {
  return (
    <section
      id="who-uses-intellihire"
      className="relative bg-brand-surface px-4 pb-24 sm:px-5 md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-[1920px]">
        <div data-reveal className="max-w-[820px]">
          <Eyebrow>Use cases</Eyebrow>
          <h2 className="mt-8 font-display text-[clamp(30px,4vw,60px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
            Who Uses <span className="text-[#087ef5]">IntelliHire</span>
          </h2>
        </div>

        <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:mt-16 md:gap-5 xl:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, label, text }, i) => (
            <li
              data-reveal
              key={label}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#e5eaf0] bg-[#ffffff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/40 hover:shadow-[0_22px_50px_-22px_rgba(7,26,61,0.3)] md:p-8"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#087ef5] to-[#ff6b00] transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#071a3d] text-[#ffffff] transition-colors duration-300 group-hover:bg-[#087ef5]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-[15px] text-[#071a3d]/25">
                  0{i + 1}
                </span>
              </span>
              <p className="m-0 mt-8 font-display text-[clamp(21px,1.7vw,26px)] leading-tight text-[#071a3d]">
                {label}
              </p>
              <p className="m-0 mt-4 text-[15px] leading-[1.7] text-[#5b6575]">
                <RichText text={text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
