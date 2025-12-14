"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import TopNav from "@/components/TopNav";

type Tone = "neutral" | "accent" | "warning";
type Pill = { label: string; tone?: Tone };

type UseCase = {
  title: string;
  area: string;
  desc: string;
  result: string;
  pills: Pill[];
};

type TimelineStep = {
  week: string;
  title: string;
  desc: string;
};

const useCases: UseCase[] = [
  {
    title: "Policy + Knowledge Ops Agent",
    area: "Ops · Knowledge",
    desc: "Turns scattered policy docs and threads into decision-ready briefs with traceable sources and escalation rules.",
    result: "Less searching. Faster alignment. Clear ownership.",
    pills: [
      { label: "Retrieval + synthesis", tone: "accent" },
      { label: "Citations", tone: "neutral" },
      { label: "Human approval", tone: "neutral" },
    ],
  },
  {
    title: "Service Desk Triage Fabric",
    area: "Support · IT/HR",
    desc: "Routes inbound requests, drafts replies, creates tickets, and keeps an audit trail of every decision.",
    result: "Lower queue pressure. Stable SLAs as volume grows.",
    pills: [
      { label: "Routing", tone: "accent" },
      { label: "SLA-aware", tone: "neutral" },
      { label: "Audit trail", tone: "neutral" },
    ],
  },
  {
    title: "Ops Monitoring + Runbook Agent",
    area: "Ops · Monitoring",
    desc: "Watches signals, detects patterns, and prepares runbook actions—only executes when policies allow it.",
    result: "Fewer surprises. Cleaner 2 a.m. handoffs.",
    pills: [
      { label: "Guardrails", tone: "warning" },
      { label: "Runbooks", tone: "neutral" },
      { label: "Escalation", tone: "neutral" },
    ],
  },
];

const timeline: TimelineStep[] = [
  {
    week: "Week 1",
    title: "Workflow + risk map",
    desc: "Pick one messy workflow. Define owners, inputs, outputs, constraints, and failure modes.",
  },
  {
    week: "Week 2",
    title: "Build the first agent",
    desc: "Integrate where work happens. Add logs, confidence gating, and human review paths.",
  },
  {
    week: "Week 3",
    title: "Pilot in production",
    desc: "Ship behind controls. Measure outcomes. Tighten guardrails and edge cases.",
  },
  {
    week: "Week 4",
    title: "Scale patterns",
    desc: "Expand to adjacent workflows. Add monitoring and operational playbooks.",
  },
];

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 80;
  const rect = el.getBoundingClientRect();
  const y = rect.top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });

  /* ---------- Cinematic: “scene lighting” across scroll ---------- */
  const gridOpacity = useTransform(scrollYProgress, [0, 0.35], [0.78, 0.18]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.68]);

  // Scene lights (subtle, not gradient spam)
  const lightAOpacity = useTransform(scrollYProgress, [0, 0.22, 0.4], [0.55, 0.65, 0.18]); // hero
  const lightBOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.72], [0.08, 0.55, 0.12]); // model
  const lightCOpacity = useTransform(scrollYProgress, [0.6, 0.82, 1], [0.06, 0.38, 0.55]); // pilot/contact

  // subtle “film grain”
  const grainOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.08]);

  /* ---------- “AI Factory Configurator” state ---------- */
  const [complexity, setComplexity] = useState(62);
  const [risk, setRisk] = useState(46);
  const [integration, setIntegration] = useState(72);
  const [copilot, setCopilot] = useState(true);

  const model = useMemo(() => {
    const automationCoverage = clamp(
      Math.round(integration * 0.45 + (100 - risk) * 0.25 + (100 - complexity) * 0.3),
      18,
      92
    );
    const humanInLoop = clamp(Math.round(risk * 0.55 + complexity * 0.25 + (copilot ? 8 : 0)), 10, 85);
    const timeToPilotDays = clamp(
      Math.round((complexity * 0.35 + risk * 0.25 + (100 - integration) * 0.4) / 2.2),
      7,
      35
    );

    const recommended = copilot
      ? "Microsoft-native deployment + governed agent fabric"
      : "Custom agent fabric deployed inside your environment";

    const keyControls = [
      risk > 55 ? "Mandatory human approval for actions" : "Human approval on exceptions",
      integration < 45 ? "Start read-only + drafting (no write actions)" : "Scoped write actions with audit logs",
      complexity > 70 ? "Narrow scope: one queue + one system first" : "Pilot one workflow end-to-end",
      "Event logs + decision traces by default",
    ];

    return { automationCoverage, humanInLoop, timeToPilotDays, recommended, keyControls };
  }, [complexity, risk, integration, copilot]);

  /* ---------- Product: “System ready” indicator ---------- */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(t);
  }, []);

  /* ---------- Product: Command Palette (⌘K) ---------- */
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");

  const quickActions = useMemo(() => {
    const actions: Array<{
      label: string;
      hint?: string;
      run: () => void;
    }> = [
      { label: "Go: Home", hint: "#top", run: () => scrollToId("top") },
      { label: "Go: Model", hint: "#model", run: () => scrollToId("model") },
      { label: "Go: Patterns", hint: "#cases", run: () => scrollToId("cases") },
      { label: "Go: Pilot", hint: "#pilot", run: () => scrollToId("pilot") },
      { label: "Go: Contact", hint: "#contact", run: () => scrollToId("contact") },

      {
        label: copilot ? "Toggle: Copilot Studio / M365 (ON)" : "Toggle: Copilot Studio / M365 (OFF)",
        hint: "switch",
        run: () => setCopilot((v) => !v),
      },
      {
        label: "Preset: Conservative (high governance)",
        hint: "safe",
        run: () => {
          setRisk(70);
          setComplexity(58);
          setIntegration(55);
        },
      },
      {
        label: "Preset: Balanced (typical enterprise pilot)",
        hint: "default",
        run: () => {
          setRisk(48);
          setComplexity(60);
          setIntegration(72);
        },
      },
      {
        label: "Preset: Aggressive (fast iteration)",
        hint: "speed",
        run: () => {
          setRisk(30);
          setComplexity(52);
          setIntegration(85);
        },
      },
      {
        label: "Randomize model",
        hint: "fun",
        run: () => {
          setRisk(rand(25, 80));
          setComplexity(rand(35, 85));
          setIntegration(rand(35, 92));
        },
      },
    ];

    return actions;
  }, [copilot]);

  const filteredActions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quickActions;
    return quickActions.filter((a) => a.label.toLowerCase().includes(q) || (a.hint ?? "").toLowerCase().includes(q));
  }, [query, quickActions]);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") closePalette();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePalette]);

  return (
    <main ref={rootRef} className="relative min-h-screen bg-black text-neutral-100">
      {/* Cinematic layers (fixed) */}
      <motion.div aria-hidden="true" style={{ opacity: gridOpacity }} className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
      </motion.div>

      {/* Scene lights */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: lightAOpacity }}
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute -top-24 left-1/2 h-[720px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: lightBOpacity }}
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute top-[22vh] right-[-12rem] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.16),transparent_62%)] blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: lightCOpacity }}
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute bottom-[-18rem] left-[-10rem] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.14),transparent_62%)] blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: vignetteOpacity }}
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_75%)]"
      />

      {/* light film grain */}
      <motion.div aria-hidden="true" style={{ opacity: grainOpacity }} className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] mix-blend-overlay" />
      </motion.div>

      {/* NAV */}
      <TopNav />

      {/* HERO */}
      <section id="top" className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-14 md:grid-cols-[1.05fr,0.95fr] md:pb-20 md:pt-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-neutral-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
              <span className="uppercase tracking-[0.22em]">Blueprint Edition • Enterprise workflows</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Build an internal{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                AI factory
              </span>{" "}
              — not another tool.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-[15px]">
              REZIIIX designs and deploys production-grade AI systems embedded in your real stack.
              They observe, decide, and act with audit trails, guardrails, and clean human handoffs.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#model"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(248,250,252,0.12)] hover:bg-neutral-200"
              >
                Explore the model
              </a>
              <a
                href="#pilot"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-200 hover:border-white/25"
              >
                Start with a pilot
              </a>

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-200 hover:border-white/25"
              >
                ⌘K Command
              </button>

              <span className="text-[11px] text-neutral-500">Remote • global teams • enterprise-first</span>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Principle</div>
              <div className="mt-2 text-sm text-neutral-200">
                You own the system: logic, governance, and deployment model. The platform is a means — the factory is the capability.
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">A quiet truth</div>
              <div className="mt-2 text-lg font-light leading-snug text-neutral-100 md:text-xl">
                Automation isn’t about speed. It’s about removing uncertainty.
              </div>
              <div className="mt-2 text-[12px] leading-relaxed text-neutral-400">
                That’s why we ship audit trails, escalation paths, and operational ownership from day one.
              </div>
            </div>
          </div>

          {/* Control Room Panel */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_65%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="border-b border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">Factory console</div>
                    <div className="text-xs text-neutral-200">REZIIIX • Orchestration</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1">
                    <span className={cx("h-1.5 w-1.5 rounded-full", ready ? "bg-emerald-400" : "bg-neutral-600")} />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-200">
                      {ready ? "System ready" : "Booting"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <StatCard label="Automation coverage" value={`${model.automationCoverage}%`} hint="Where the system can act safely." />
                  <StatCard label="Human-in-loop" value={`${model.humanInLoop}%`} hint="Review gating & escalation rate." />
                  <StatCard label="Time to pilot" value={`${model.timeToPilotDays} days`} hint="Typical build-to-live cycle." />
                  <StatCard label="Deployment" value={copilot ? "Microsoft-native" : "Custom fabric"} hint="Matches your environment." />
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">Recommendation</div>
                      <div className="mt-1 text-sm text-neutral-100">{model.recommended}</div>
                      <div className="mt-2 text-[12px] leading-relaxed text-neutral-400">
                        Built inside your environment. Governed behavior. Expand workflow by workflow.
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <input
                        type="checkbox"
                        checked={copilot}
                        onChange={(e) => setCopilot(e.target.checked)}
                        className="h-4 w-4 accent-white"
                      />
                      Copilot Studio / M365
                    </label>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Slider label="Workflow complexity" value={complexity} onChange={setComplexity} />
                    <Slider label="Risk / compliance sensitivity" value={risk} onChange={setRisk} />
                    <Slider label="Integration readiness" value={integration} onChange={setIntegration} />
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">Key controls</div>
                    <ul className="mt-2 space-y-1 text-[12px] text-neutral-200">
                      {model.keyControls.map((c, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 text-[11px] text-neutral-500">
                      Optional: Reziiix can run a workshop so teams learn to build and operate Copilot Studio / M365 agents safely.
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/50">
                      <motion.div
                        className="h-full bg-white/70"
                        animate={{ x: ["-40%", "140%"], opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: "35%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag>Audit trails</Tag>
                    <Tag>Confidence gating</Tag>
                    <Tag>Human handoffs</Tag>
                    <Tag>Policy-first</Tag>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-neutral-500">Not a chat demo. A control model for production automation.</div>
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section id="model" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-neutral-500">The model</div>
              <h2 className="mt-3 text-2xl font-medium md:text-3xl">Input → Fabric → Output</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                A factory is a governed fabric of agents, tools, and controls. It turns messy inputs into traceable outputs with predictable behavior.
              </p>

              <div className="mt-7 space-y-3">
                <MiniRule title="Evidence over vibes">Agents link decisions back to sources, events, and policies.</MiniRule>
                <MiniRule title="Safe by default">Start with read-only + drafting, then graduate to scoped actions.</MiniRule>
                <MiniRule title="Humans remain owners">Confidence gating and approvals keep responsibility clear.</MiniRule>
              </div>
            </div>

            <Diagram />
          </div>
        </div>
      </section>

      {/* PATTERNS */}
      <section id="cases" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-neutral-500">Patterns</div>
              <h2 className="mt-3 text-2xl font-medium md:text-3xl">What the factory produces</h2>
            </div>
            <div className="max-w-md text-[12px] leading-relaxed text-neutral-400">
              No logo wall. Just repeatable patterns that adapt to your tools and constraints.
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {useCases.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">{c.area}</div>
                <div className="mt-2 text-base font-medium text-white">{c.title}</div>
                <div className="mt-3 text-[13px] leading-relaxed text-neutral-300">{c.desc}</div>

                <div className="mt-4 text-[12px] text-neutral-400">Outcome</div>
                <div className="mt-1 text-[13px] text-neutral-200">{c.result}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.pills.map((p) => (
                    <PillBadge key={p.label} pill={p} />
                  ))}
                </div>

                <div className="mt-5 h-px bg-white/10" />
                <div className="mt-4 text-[11px] text-neutral-500">Deployed inside your environment — or delivered as a managed pilot.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILOT */}
      <section id="pilot" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-neutral-500">Pilot</div>
              <h2 className="mt-3 text-2xl font-medium md:text-3xl">Start small. Ship something real.</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                Most engagements begin with one workflow. We ship it into production with logs, gating, and operational ownership — then expand responsibly.
              </p>

              <div className="mt-8 space-y-3">
                {timeline.map((s) => (
                  <div key={s.week} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">{s.week}</div>
                    <div className="mt-1 text-sm font-medium text-neutral-100">{s.title}</div>
                    <div className="mt-2 text-[13px] leading-relaxed text-neutral-300">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div id="contact" className="relative">
              <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)] blur-2xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
                <div className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Contact</div>
                <div className="mt-2 text-xl font-medium text-white">Bring one messy workflow.</div>
                <div className="mt-3 text-[13px] leading-relaxed text-neutral-300">
                  Tell us what’s slow, fragile, or repetitive. We’ll reply with a concrete agent concept, deployment approach, and what “production” means in your environment.
                </div>

                <div className="mt-6 space-y-3">
                  <input
                    placeholder="Name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/25"
                  />
                  <input
                    placeholder="Work email"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/25"
                  />
                  <textarea
                    placeholder="Describe the workflow..."
                    className="h-28 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/25"
                  />

                  <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200">
                    Send (static form)
                  </button>

                  <div className="text-[11px] text-neutral-500">
                    Email works too: <span className="text-neutral-200">hello@reziiix.com</span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">Operational promise</div>
                    <div className="mt-2 text-[13px] leading-relaxed text-neutral-300">
                      Agents ship with audit trails, escalation paths, and clear ownership. No mystery behavior. No hidden automation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-[11px] text-neutral-600">
                © {new Date().getFullYear()} REZIIIX • Blueprint Edition
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⌘K Command Palette */}
      <CommandPalette
        open={paletteOpen}
        query={query}
        setQuery={setQuery}
        actions={filteredActions}
        onClose={closePalette}
        onRun={(run) => {
          run();
          closePalette();
        }}
      />
    </main>
  );
}

/* ---------- Command Palette ---------- */

function CommandPalette({
  open,
  query,
  setQuery,
  actions,
  onClose,
  onRun,
}: {
  open: boolean;
  query: string;
  setQuery: (v: string) => void;
  actions: Array<{ label: string; hint?: string; run: () => void }>;
  onClose: () => void;
  onRun: (run: () => void) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    setActiveIdx(0);
  }, [open, query]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, Math.max(0, actions.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const a = actions[activeIdx];
        if (a) onRun(a.run);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, actions, activeIdx, onRun]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center px-4 pt-24 md:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <div className="border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Command</div>
                  <div className="text-xs text-neutral-200">Navigate • presets • toggles</div>
                </div>
                <div className="text-[11px] text-neutral-500">Esc to close</div>
              </div>
            </div>

            <div className="p-3 md:p-4">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command… (e.g., model, preset, copilot)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/20"
              />

              <div className="mt-3 max-h-[320px] overflow-auto pr-1">
                {actions.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-400">
                    No matches.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {actions.map((a, idx) => {
                      const active = idx === activeIdx;
                      return (
                        <button
                          key={`${a.label}-${idx}`}
                          type="button"
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => onRun(a.run)}
                          className={cx(
                            "w-full rounded-xl border px-3 py-2 text-left transition",
                            active ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/15"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-neutral-100">{a.label}</div>
                            {a.hint && (
                              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                                {a.hint}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                <span>↑↓ to navigate</span>
                <span>Enter to run</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- UI atoms ---------- */

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">{label}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-[12px] leading-relaxed text-neutral-400">{hint}</div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-neutral-400">
        <span>{label}</span>
        <span className="text-neutral-200">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-white"
      />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-300">
      {children}
    </span>
  );
}

function PillBadge({ pill }: { pill: Pill }) {
  const tone =
    pill.tone === "accent"
      ? "border-sky-400/30 bg-sky-400/10 text-sky-200"
      : pill.tone === "warning"
      ? "border-amber-300/30 bg-amber-300/10 text-amber-200"
      : "border-white/10 bg-black/30 text-neutral-300";

  return (
    <span className={cx("rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]", tone)}>
      {pill.label}
    </span>
  );
}

function MiniRule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">{title}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-neutral-300">{children}</div>
    </div>
  );
}

function Diagram() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">System blueprint</div>
      <div className="mt-2 text-sm text-neutral-200">A governed fabric of agents</div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <DiagramNode title="Inputs" body="Email • tickets • docs • metrics • chat" />
        <DiagramNode title="Agent fabric" body="Tools • memory • rules • confidence gating" strong />
        <DiagramNode title="Outputs" body="Drafts • tickets • updates • reports • runbooks" />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[12px] text-neutral-300">
            <span className="text-neutral-100">Key idea:</span> decisions remain traceable, actions remain controllable.
          </div>
          <motion.div
            className="h-1.5 w-40 overflow-hidden rounded-full bg-black/50"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full w-1/3 bg-white/70"
              animate={{ x: ["-40%", "140%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DiagramNode({ title, body, strong }: { title: string; body: string; strong?: boolean }) {
  return (
    <div
      className={cx(
        "rounded-2xl border p-4",
        strong ? "border-white/20 bg-white/5" : "border-white/10 bg-black/30"
      )}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">{title}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-neutral-300">{body}</div>
    </div>
  );
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
