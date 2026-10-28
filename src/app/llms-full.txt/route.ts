import { llmsFullMarkdown } from "@/lib/markdown";

// Built from the same content as the pages, so the document cannot drift.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
