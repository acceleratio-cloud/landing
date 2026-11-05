"use client";

import { useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy command"}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line bg-card px-2.5 font-mono text-xs text-ink-2 transition hover:border-line-2 hover:text-ink ${className}`}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8.5l3.2 3L13 4.5" stroke="var(--ok)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 3.5V3A1.5 1.5 0 009 1.5H3.5A1.5 1.5 0 002 3v5.5A1.5 1.5 0 003.5 10H4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export function CopyCommand({ command }: { command: string }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg border border-line bg-card p-1.5 pl-4 shadow-[0_1px_2px_rgba(16,19,22,0.06)]">
      <span className="select-none font-mono text-sm text-accent">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-ink [scrollbar-width:none]">
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  );
}
