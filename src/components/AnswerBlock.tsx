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
  plain = false,
}: {
  text: string;
  tone?: "onDark" | "onLight";
  /** No left rule: for heroes where the paragraph is the main supporting text. */
  plain?: boolean;
}) {
  const dark = tone === "onDark";
  return (
    <p
      className={`ih-answer m-0 leading-[1.7] ${
        plain
          ? "max-w-[600px] text-[clamp(16px,1.15vw,18px)]"
          : "max-w-[680px] border-l-2 border-[#087ef5] pl-5 text-[clamp(16px,1.3vw,19px)]"
      } ${dark ? (plain ? "text-[#ffffff]/75" : "text-[#ffffff]/85") : "text-[#071a3d]"}`}
      data-answer
    >
      <RichText text={text} />
    </p>
  );
}
