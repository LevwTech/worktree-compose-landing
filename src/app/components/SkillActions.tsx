"use client";

import { useState } from "react";

export function SkillActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const res = await fetch("/SKILL.md");
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the Download button still works */
    }
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gh-muted hover:text-gh-blue transition-colors px-2.5 py-1.5 rounded-md"
        aria-label="Copy SKILL.md to clipboard"
      >
        {copied ? (
          <>
            <svg
              className="w-4 h-4 text-gh-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </>
        )}
      </button>
      <a
        href="/SKILL.md"
        download="SKILL.md"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gh-muted hover:text-gh-blue transition-colors px-2.5 py-1.5 rounded-md"
        aria-label="Download SKILL.md"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
      </a>
    </div>
  );
}
