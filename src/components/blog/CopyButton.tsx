"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies a template block to the clipboard. */
export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[38px] shrink-0 items-center gap-2 rounded-full border border-[#ffffff]/20 px-4 text-[13px] font-semibold text-[#ffffff] transition-colors duration-200 hover:border-[#087ef5] hover:bg-[#087ef5]"
      aria-live="polite"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy template"}
    </button>
  );
}
