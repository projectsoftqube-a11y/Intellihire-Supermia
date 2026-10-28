import { RichText } from "@/components/ui";

/**
 * The answer-first block: one standalone paragraph, directly after the H1,
 * answering the page's core question in 40–60 words.
 *
 * Answer engines lift a short self-contained passage, so the text must read
 * on its own: no pronouns pointing at earlier copy, no "as described above".
 * The `ih-answer` class is the selector named by `speakable` in the page's
 * JSON-LD, and the copy is sourced from `page.answer` in `src/content`, which
 * is the same string the schema reads — the two cannot drift.
 */
export default function AnswerBlock({
  text,
  tone = "onDark",
}: {
  text: string;
  tone?: "onDark" | "onLight";
}) {
  const dark = tone === "onDark";
  return (
    <p
      className={`ih-answer m-0 max-w-[680px] border-l-2 pl-5 text-[clamp(16px,1.3vw,19px)] leading-[1.7] ${
        dark ? "border-[#087ef5] text-[#ffffff]/85" : "border-[#087ef5] text-[#071a3d]"
      }`}
      data-answer
    >
      <RichText text={text} />
    </p>
  );
}
