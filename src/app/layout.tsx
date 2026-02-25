import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "worktree-compose — Zero-config Docker Compose isolation for git worktrees",
  description:
    "Every worktree gets its own ports, database, cache, and containers — automatically.",
  openGraph: {
    title: "worktree-compose (wtc)",
    description:
      "Zero-config Docker Compose isolation for git worktrees. Every worktree gets its own ports, database, cache, and containers.",
    url: "https://github.com/LevwTech/worktree-compose",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gh-bg text-gh-text font-sans antialiased">
        {children}
        <Script
          defer
          data-url="https://devhunt.org/tool/worktree-compose"
          src="https://cdn.jsdelivr.net/gh/sidiDev/devhunt-banner/indexV0.js"
        />
      </body>
    </html>
  );
}
