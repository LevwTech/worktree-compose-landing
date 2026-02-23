import { CopyButton } from "./components/CopyButton";
import { PortTable } from "./components/PortTable";

const COMMANDS = [
  {
    cmd: "wtc start [indices...]",
    desc: "Start Docker Compose stacks. Syncs files from main, injects isolated ports, runs docker compose up -d --build.",
    example: "npx wtc start 1 2",
  },
  {
    cmd: "wtc stop [indices...]",
    desc: "Stop stacks. Runs docker compose down. Volumes are preserved.",
    example: "npx wtc stop 1",
  },
  {
    cmd: "wtc restart [indices...]",
    desc: "Full restart: stop, re-sync files, re-inject env, rebuild, start. Use after migrations or Dockerfile changes.",
    example: "npx wtc restart 1",
  },
  {
    cmd: "wtc list",
    desc: "Show all worktrees with branch, status, URL, and allocated ports.",
    example: "npx wtc list",
  },
  {
    cmd: "wtc promote <index>",
    desc: "Copy changed files from a worktree into your current branch as uncommitted changes. Excludes .env and compose files.",
    example: "npx wtc promote 1",
  },
  {
    cmd: "wtc clean",
    desc: "Stop all containers, remove all worktrees, prune stale Docker resources (networks, volumes, containers).",
    example: "npx wtc clean",
  },
];

const FEATURES = [
  {
    title: "Zero Config",
    desc: "Works out of the box. Just run wtc start and your worktrees get isolated stacks.",
    color: "text-gh-blue",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Port Isolation",
    desc: "Each worktree gets unique ports via 20000 + default_port + index. No collisions, ever.",
    color: "text-gh-green",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Container Isolation",
    desc: "Separate COMPOSE_PROJECT_NAME per worktree. Own containers, networks, and volumes.",
    color: "text-gh-purple",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "File Sync",
    desc: "Compose files, Dockerfiles, and .env are synced from main before every start.",
    color: "text-gh-orange",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: "Env Injection",
    desc: "Port overrides are idempotently injected into .env. Your existing vars stay untouched.",
    color: "text-gh-yellow",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "MCP Server",
    desc: "Built-in MCP server for AI agents. Claude Code and Codex can manage stacks programmatically.",
    color: "text-gh-red",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const MCP_TOOLS = [
  { tool: "wtc_start", params: "indices?: number[]", desc: "Start worktree stacks" },
  { tool: "wtc_stop", params: "indices?: number[]", desc: "Stop worktree stacks" },
  { tool: "wtc_restart", params: "indices?: number[]", desc: "Restart after migrations/config changes" },
  { tool: "wtc_list", params: "none", desc: "List worktrees (returns JSON)" },
  { tool: "wtc_promote", params: "index: number", desc: "Pull worktree changes into current branch" },
  { tool: "wtc_clean", params: "none", desc: "Tear down everything" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* npm badge */}
          <a
            href="https://www.npmjs.com/package/worktree-compose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-8"
          >
            <img
              src="https://img.shields.io/npm/v/worktree-compose?label=npm&color=58A6FF&style=flat-square"
              alt="npm version"
              className="h-6"
            />
          </a>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4">
            worktree-compose
          </h1>
          <p className="text-xl text-gh-muted mb-4">
            Zero-config Docker Compose isolation for git worktrees.
          </p>
          <p className="text-lg text-gh-muted/70 mb-10 max-w-2xl mx-auto">
            Every worktree gets its own ports, database, cache, and containers — automatically.
          </p>

          {/* Install command */}
          <div className="glow-blue inline-flex items-center gap-3 bg-gh-card border border-gh-border rounded-xl px-6 py-4 mb-8">
            <span className="text-gh-muted font-mono">$</span>
            <code className="text-gh-green font-mono text-lg sm:text-xl font-medium">
              npm i worktree-compose
            </code>
            <CopyButton text="npm i worktree-compose" />
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/LevwTech/worktree-compose"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gh-border text-gh-text hover:border-gh-muted transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/worktree-compose"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gh-blue text-gh-bg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              View on npm
            </a>
          </div>
        </div>
      </section>

      {/* ─── Video ─── */}
      <section id="demo" className="pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            See it in action
          </h2>
          <div className="rounded-2xl overflow-hidden border-2 border-gh-border shadow-[0_0_60px_rgba(88,166,255,0.1)] bg-gh-card p-2">
            <div className="rounded-xl overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full"
              >
                <source
                  src="https://github.com/LevwTech/worktree-compose/raw/main/wtc-explainer.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem / Solution ─── */}
      <section id="problem" className="py-24 border-t border-gh-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            The Problem
          </h2>
          <p className="text-gh-muted text-center mb-12 max-w-2xl mx-auto">
            Multiple developers or AI agents working in parallel on the same
            repo — each in a git worktree — share the same Docker Compose setup.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without */}
            <div className="bg-gh-card border border-gh-border border-t-2 border-t-gh-red rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gh-red/15 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gh-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Without worktree-compose</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Port conflicts between worktrees",
                  "Shared databases corrupt each other's data",
                  "Shared caches cause stale state",
                  "Container name collisions crash docker compose",
                  "Manual port juggling in .env files",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gh-muted">
                    <svg
                      className="w-5 h-5 text-gh-red shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div className="bg-gh-card border border-gh-border border-t-2 border-t-gh-green rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gh-green/15 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gh-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">With worktree-compose</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Unique ports per worktree, automatically assigned",
                  "Isolated databases, one per worktree",
                  "Separate caches, no cross-contamination",
                  "Unique COMPOSE_PROJECT_NAME per worktree",
                  "Zero manual configuration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gh-muted">
                    <svg
                      className="w-5 h-5 text-gh-green shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 border-t border-gh-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
          <p className="text-gh-muted text-center mb-12">
            Everything you need to run parallel worktrees without conflicts.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="card-hover bg-gh-card border border-gh-border rounded-xl p-6"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gh-card-hover flex items-center justify-center mb-4 ${f.color}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gh-muted text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24 border-t border-gh-border">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            How ports are allocated
          </h2>
          <p className="text-gh-muted text-center mb-8">
            Each worktree N gets unique ports using a simple formula.
          </p>

          {/* Formula */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gh-card border border-gh-border rounded-xl px-8 py-4 font-mono text-lg">
              <span className="text-gh-yellow font-bold">port</span>
              <span className="text-gh-muted">=</span>
              <span className="text-gh-blue">20000</span>
              <span className="text-gh-muted">+</span>
              <span className="text-gh-green">default_port</span>
              <span className="text-gh-muted">+</span>
              <span className="text-gh-purple">worktree_index</span>
            </div>
          </div>

          {/* Example breakdown */}
          <div className="flex justify-center gap-3 mb-10 font-mono text-sm flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-gh-card border border-gh-border rounded-lg">
              <span className="text-gh-blue">20000</span>
              <span className="text-gh-muted text-xs">base offset</span>
            </div>
            <span className="text-gh-muted self-center">+</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-gh-card border border-gh-border rounded-lg">
              <span className="text-gh-green">5434</span>
              <span className="text-gh-muted text-xs">postgres default</span>
            </div>
            <span className="text-gh-muted self-center">+</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-gh-card border border-gh-border rounded-lg">
              <span className="text-gh-purple">1</span>
              <span className="text-gh-muted text-xs">worktree index</span>
            </div>
            <span className="text-gh-muted self-center">=</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-gh-card border border-gh-blue/40 rounded-lg">
              <span className="text-gh-text font-bold">25435</span>
            </div>
          </div>

          <PortTable />
        </div>
      </section>

      {/* ─── Commands ─── */}
      <section id="commands" className="py-24 border-t border-gh-border">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Commands</h2>
          <p className="text-gh-muted text-center mb-12">
            Six commands. That&apos;s the entire API.
          </p>

          <div className="space-y-4">
            {COMMANDS.map((c) => (
              <div
                key={c.cmd}
                className="bg-gh-card border border-gh-border rounded-xl p-5"
              >
                <code className="text-gh-green font-mono font-bold text-base">
                  {c.cmd}
                </code>
                <p className="text-gh-muted text-sm mt-2 mb-3">{c.desc}</p>
                <pre className="bg-gh-bg rounded-lg px-4 py-3 text-sm font-mono text-gh-text overflow-x-auto code-scroll">
                  <span className="text-gh-muted">$ </span>
                  {c.example}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Configuration ─── */}
      <section id="config" className="py-24 border-t border-gh-border">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Configuration
          </h2>
          <p className="text-gh-muted text-center mb-12 max-w-2xl mx-auto">
            Works zero-config out of the box. For project-specific needs, add a{" "}
            <code className="text-gh-yellow font-mono">.wtcrc.json</code> or a{" "}
            <code className="text-gh-yellow font-mono">&quot;wtc&quot;</code> key
            in your package.json.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Config file */}
            <div className="bg-gh-card border border-gh-border rounded-xl overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-gh-border bg-gh-bg">
                <span className="text-gh-muted text-sm font-mono">
                  .wtcrc.json
                </span>
              </div>
              <pre className="p-5 text-sm font-mono text-gh-text whitespace-pre-wrap break-words flex-1 flex items-center">
{`{
  "sync": [
    ".generated/prisma-client",
    "local-certs/"
  ],
  "envOverrides": {
    "VITE_API_URL":
      "http://localhost:\${BACKEND_PORT}"
  }
}`}
              </pre>
            </div>

            {/* Explanations */}
            <div className="flex flex-col gap-4">
              <div className="bg-gh-card border border-gh-border rounded-xl p-5 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <code className="text-gh-green font-mono font-bold">sync</code>
                </div>
                <p className="text-gh-muted text-sm leading-relaxed">
                  Extra files or directories to copy from main into each
                  worktree on start. Use for gitignored or generated files that
                  Docker needs but aren&apos;t committed — like generated clients,
                  local certificates, or build artifacts.
                </p>
              </div>
              <div className="bg-gh-card border border-gh-border rounded-xl p-5 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <code className="text-gh-green font-mono font-bold">envOverrides</code>
                </div>
                <p className="text-gh-muted text-sm leading-relaxed">
                  Additional env vars injected into{" "}
                  <code className="text-gh-yellow font-mono">.env</code>.
                  Supports{" "}
                  <code className="text-gh-yellow font-mono">{`\${VAR}`}</code>{" "}
                  interpolation with allocated port values — perfect when env
                  vars depend on allocated ports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MCP Integration ─── */}
      <section id="mcp" className="py-24 border-t border-gh-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built for AI agents
          </h2>
          <p className="text-gh-muted text-center mb-12 max-w-2xl mx-auto">
            Built-in MCP server so Claude Code, Codex, and other AI agents can
            manage worktree stacks programmatically.
          </p>

          {/* Config blocks */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Claude Code */}
            <div className="bg-gh-card border border-gh-border rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gh-border bg-gh-bg">
                <span className="text-gh-muted text-sm font-mono">
                  .claude/settings.json
                </span>
              </div>
              <pre className="p-5 text-sm font-mono text-gh-text overflow-x-auto code-scroll">
{`{
  "mcpServers": {
    "wtc": {
      "command": "npx",
      "args": ["wtc", "mcp"]
    }
  }
}`}
              </pre>
            </div>

            {/* Codex */}
            <div className="bg-gh-card border border-gh-border rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gh-border bg-gh-bg">
                <span className="text-gh-muted text-sm font-mono">
                  codex config
                </span>
              </div>
              <pre className="p-5 text-sm font-mono text-gh-text overflow-x-auto code-scroll">
{`{
  "servers": {
    "wtc": {
      "command": "npx",
      "args": ["wtc", "mcp"]
    }
  }
}`}
              </pre>
            </div>
          </div>

          {/* MCP tools table */}
          <div className="overflow-x-auto rounded-xl border border-gh-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gh-card border-b-2 border-gh-border">
                  <th className="px-6 py-3.5 text-left text-gh-muted font-semibold uppercase tracking-wider text-xs">
                    Tool
                  </th>
                  <th className="px-6 py-3.5 text-left text-gh-muted font-semibold uppercase tracking-wider text-xs">
                    Parameters
                  </th>
                  <th className="px-6 py-3.5 text-left text-gh-muted font-semibold uppercase tracking-wider text-xs">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {MCP_TOOLS.map((t, i) => (
                  <tr
                    key={t.tool}
                    className={`border-b border-gh-border last:border-0 ${
                      i % 2 === 0 ? "bg-gh-bg" : "bg-gh-card/50"
                    }`}
                  >
                    <td className="px-6 py-3 font-mono font-medium text-gh-green">
                      {t.tool}
                    </td>
                    <td className="px-6 py-3 font-mono text-gh-muted">
                      {t.params}
                    </td>
                    <td className="px-6 py-3 text-gh-text">{t.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gh-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <span className="font-mono text-gh-muted text-sm">
              worktree-compose
            </span>
            <div className="flex items-center gap-6 text-sm text-gh-muted">
              <a
                href="https://github.com/LevwTech/worktree-compose"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gh-text transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/worktree-compose"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gh-text transition-colors"
              >
                npm
              </a>
              <span>MIT License</span>
            </div>
          </div>
          <span className="text-gh-muted/60 text-sm">
            vibe coded with ❤️ by{" "}
            <a
              href="https://x.com/levwtech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gh-muted hover:text-gh-text transition-colors"
            >
              @levwtech
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
