"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  // background intensity changes as you scroll
  const gridOpacity = useTransform(scrollYProgress, [0, 0.35], [0.75, 0.22]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.65]);

  // “AI Factory Configurator”
  const [complexity, setComplexity] = useState(62);
  const [risk, setRisk] = useState(46);
  const [integration, setIntegration] = useState(72);
  const [copilot, setCopilot] = useState(true);

  const model = useMemo(() => {
    // persuasive/illustrative, not a promise
    const automationCoverage = clamp(
      Math.round(integration * 0.45 + (100 - risk) * 0.25 + (100 - complexity) * 0.3),
      18,
      92
    );
    const humanInLoop = clamp(
      Math.round(risk * 0.55 + complexity * 0.25 + (copilot ? 8 : 0)),
      10,
      85
    );
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

  // tiny “boot” indicator
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen bg-black text-neutral-100">
      {/* background: blueprint grid + cosmic glow */}
      <motion.div aria-hidden="true" style={{ opacity: gridOpacity }} className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.12),transparent_62%)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: vignetteOpacity }}
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_75%)]"
      />

      {/* keep your existing nav component */}
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
              <span className="text-[11px] text-neutral-500">Remote • global teams • enterprise-first</span>
            </div>

            {/* a quiet credibility anchor */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Principle</div>
              <div className="mt-2 text-sm text-neutral-200">
                You own the system: logic, governance, and deployment model. The platform is a means — the factory is the capability.
              </div>
            </div>

            {/* “moment of silence” inside hero column */}
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
            <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.20),transparent_65%)] blur-2xl" />
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

            <div className="mt-3 text-[11px] text-neutral-500">
              Not a chat demo. A control model for production automation.
            </div>
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
                <MiniRule title="Evidence over vibes">
                  Agents link decisions back to sources, events, and policies.
                </MiniRule>
                <MiniRule title="Safe by default">
                  Start with read-only + drafting, then graduate to scoped actions.
                </MiniRule>
                <MiniRule title="Humans remain owners">
                  Confidence gating and approvals keep responsibility clear.
                </MiniRule>
              </div>
            </div>

            <Diagram />
          </div>
        </div>
      </section>

      {/* PATTERNS / CASES */}
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
                <div className="mt-4 text-[11px] text-neutral-500">
                  Deployed inside your environment — or delivered as a managed pilot.
                </div>
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
                  Tell us what’s slow, fragile, or repetitive. We’ll reply with a concrete agent concept,
                  deployment approach, and what “production” means in your environment.
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
    </main>
  );
}

/* ---------- components ---------- */

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
