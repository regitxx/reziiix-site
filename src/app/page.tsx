"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

/**
 * REZIIIX — Award Cut
 * Goal: calm hierarchy, editorial clarity, high-trust enterprise tone, "wow" layout.
 * No dependency on your existing components.
 */

type PillTone = "ink" | "mint" | "amber" | "violet";
type Pill = { label: string; tone?: PillTone };

type Module = {
  title: string;
  subtitle: string;
  body: string;
  pillars: Pill[];
};

type Step = {
  k: string;
  title: string;
  body: string;
};

type FAQ = {
  q: string;
  a: string;
};

const modules: Module[] = [
  {
    title: "Automation that behaves like a system",
    subtitle: "Not a bot. Not a demo. A governed capability.",
    body:
      "We design agentic workflows that operate inside your stack with audit trails, confidence thresholds, and defined escalation. Your team remains owners. The system does the repetitive work.",
    pillars: [
      { label: "Audit trails", tone: "ink" },
      { label: "Confidence gating", tone: "mint" },
      { label: "Human handoffs", tone: "ink" },
      { label: "Policy-first", tone: "amber" },
    ],
  },
  {
    title: "An AI factory inside your company",
    subtitle: "A repeatable pattern, not one-off automation.",
    body:
      "We build the fabric: integrations, knowledge retrieval, memory, tools, and governance. After the first workflow works, you expand into adjacent ones—without rebuilding from scratch.",
    pillars: [
      { label: "Reusable patterns", tone: "violet" },
      { label: "Owned by your team", tone: "ink" },
      { label: "Expandable by design", tone: "mint" },
      { label: "Operational playbooks", tone: "amber" },
    ],
  },
  {
    title: "Enterprise-ready delivery",
    subtitle: "Clear boundaries. Observable behavior.",
    body:
      "A successful engagement ends with a running system, not slides: logs, metrics, guardrails, and an internal owner. We deploy Microsoft-native (Copilot Studio / M365) when it fits, or custom inside your environment.",
    pillars: [
      { label: "Microsoft-native", tone: "mint" },
      { label: "Custom deployments", tone: "ink" },
      { label: "Observability", tone: "violet" },
      { label: "Security-first", tone: "amber" },
    ],
  },
];

const steps: Step[] = [
  {
    k: "01",
    title: "Scope one workflow",
    body:
      "Pick something real and messy—where time leaks. Define inputs, outputs, risk, owners, and acceptance criteria.",
  },
  {
    k: "02",
    title: "Build the governed core",
    body:
      "Integrations, retrieval, tool-use, and logging. Add policies, confidence thresholds, and escalation paths from day one.",
  },
  {
    k: "03",
    title: "Pilot in production",
    body:
      "Ship behind controls. Measure outcomes. Tighten edge cases. Transfer operational ownership to your internal lead.",
  },
  {
    k: "04",
    title: "Scale into an internal factory",
    body:
      "Reuse the fabric for adjacent workflows. Add monitoring, runbooks, and a workshop so teams can extend safely.",
  },
];

const faqs: FAQ[] = [
  {
    q: "Do we need a dashboard or a full platform UI?",
    a: "Not at first. We usually embed the system inside your existing tools (M365, Slack, email, Jira, ServiceNow, CRM). If you need a lightweight control panel later, we add it once the workflows prove value.",
  },
  {
    q: "Can you build Copilot Studio / M365 agents too?",
    a: "Yes. When Microsoft-native fits your environment, we design agents with governance, logging, and safe escalation—then optionally run a workshop so your team can extend and operate them.",
  },
  {
    q: "What’s the typical first use case?",
    a: "Triage + synthesis: routing inbound requests, summarizing threads, producing decision briefs, and drafting responses—because it creates immediate leverage without risky write-actions.",
  },
  {
    q: "How do you avoid unpredictable agent behavior?",
    a: "We use scoped tools, explicit policies, confidence thresholds, audit logs, and human-in-loop controls. If confidence is low or inputs are incomplete, the system escalates with a structured brief—not a guess.",
  },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 88;
  const rect = el.getBoundingClientRect();
  const y = rect.top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function AwardPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });

  // calm editorial lighting
  const bgA = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.55, 0.25, 0.35, 0.45]);
  const bgB = useTransform(scrollYProgress, [0, 0.45, 1], [0.35, 0.55, 0.25]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.2, 0.65]);

  // command palette (optional, light)
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setQ("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const actions = useMemo(
    () => [
      { label: "Go: Home", hint: "#top", run: () => scrollToId("top") },
      { label: "Go: The story", hint: "#story", run: () => scrollToId("story") },
      { label: "Go: Process", hint: "#process", run: () => scrollToId("process") },
      { label: "Go: Patterns", hint: "#patterns", run: () => scrollToId("patterns") },
      { label: "Go: Workshop", hint: "#workshop", run: () => scrollToId("workshop") },
      { label: "Go: FAQ", hint: "#faq", run: () => scrollToId("faq") },
      { label: "Go: Contact", hint: "#contact", run: () => scrollToId("contact") },
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(s) || (a.hint ?? "").toLowerCase().includes(s));
  }, [q, actions]);

  return (
    <main ref={rootRef} className="relative min-h-screen bg-black text-neutral-100">
      {/* Background: calm, premium, less “busy” */}
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <motion.div
          style={{ opacity: bgA }}
          className="absolute -top-40 left-1/2 h-[760px] w-[900px] -translate-x-1/2 rounded-[55%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14),transparent_60%)] blur-3xl"
        />
        <motion.div
          style={{ opacity: bgB }}
          className="absolute top-[18vh] right-[-12rem] h-[740px] w-[740px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.13),transparent_62%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:92px_92px] opacity-25" />
        <motion.div
          style={{ opacity: vignette }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.86)_74%)]"
        />
      </motion.div>

      {/* NAV (award cut) */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-white/10 ring-1 ring-white/10" />
            <div className="leading-none">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white">REZIIIX</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">Award cut</div>
            </div>
          </div>

          <nav className="hidden items-center gap-4 text-[12px] text-neutral-300 md:flex">
            <NavLink onClick={() => scrollToId("story")}>Story</NavLink>
            <NavLink onClick={() => scrollToId("process")}>Process</NavLink>
            <NavLink onClick={() => scrollToId("patterns")}>Patterns</NavLink>
            <NavLink onClick={() => scrollToId("workshop")}>Workshop</NavLink>
            <NavLink onClick={() => scrollToId("contact")}>Contact</NavLink>

            <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-200">
              ⌘K
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-neutral-200 hover:border-white/20 md:inline"
              type="button"
            >
              Command
            </button>

            <button
              onClick={() => scrollToId("contact")}
              className="rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-black hover:bg-neutral-200"
              type="button"
            >
              Book a call
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-neutral-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.7)]" />
                <span className="uppercase tracking-[0.22em]">Agentic automation • enterprise workflows</span>
              </div>

              <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.03] text-white">
                Your company doesn’t need more tools.
                <span className="block text-neutral-300 font-light">
                  It needs a reliable automation capability.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-neutral-200 md:text-[15px]">
                REZIIIX builds an <span className="text-white">AI factory inside your company</span>:
                a governed fabric of agents, integrations, and policies that turns messy inputs into traceable outcomes.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
                  onClick={() => scrollToId("story")}
                  type="button"
                >
                  See the story
                </button>
                <button
                  className="rounded-full border border-white/12 bg-white/5 px-5 py-2 text-sm text-neutral-200 hover:border-white/20"
                  onClick={() => scrollToId("process")}
                  type="button"
                >
                  How it ships
                </button>
                <span className="text-[11px] text-neutral-500">Remote • global teams • enterprise-first</span>
              </div>
            </div>

            {/* HERO SIDE: a single clean “card”, not many widgets */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_65%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/55 backdrop-blur-xl">
                <div className="border-b border-white/10 bg-white/5 px-5 py-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">What you get</div>
                  <div className="mt-2 text-base text-white">A running system with ownership</div>
                </div>

                <div className="p-5 space-y-4">
                  <AwardRow k="01" title="A governed agent fabric" body="Integrations, retrieval, tools, and policies aligned to your stack." />
                  <AwardRow k="02" title="Audit trails and control" body="Logs, confidence gating, escalation rules, and clear handoffs." />
                  <AwardRow k="03" title="A pilot that works" body="Ship one workflow end-to-end, then expand responsibly." />

                  <div className="pt-2 flex flex-wrap gap-2">
                    <PillBadge pill={{ label: "Microsoft-native option", tone: "mint" }} />
                    <PillBadge pill={{ label: "Custom deployment", tone: "ink" }} />
                    <PillBadge pill={{ label: "Workshop available", tone: "amber" }} />
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-neutral-500">
                Clean narrative. One card. No clutter.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">The story</div>
              <h2 className="mt-4 text-2xl font-medium md:text-3xl">From scattered work to predictable outcomes</h2>
              <p className="mt-4 text-[13px] leading-relaxed text-neutral-300">
                Most “AI tools” create more work: you still copy/paste, you still verify, you still route.
                We build a system that does the unglamorous operations—quietly, visibly, and safely.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((m) => (
                <article
                  key={m.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition"
                >
                  <div className="text-[12px] font-medium text-white">{m.title}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-neutral-500">{m.subtitle}</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-300">{m.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.pillars.map((p) => (
                      <PillBadge key={p.label} pill={p} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">Process</div>
              <h2 className="mt-4 text-2xl font-medium md:text-3xl">Designed to ship, not to impress</h2>
            </div>
            <div className="hidden md:block text-[12px] text-neutral-500 max-w-md">
              A calm timeline with one goal: a working pilot with governance, then scale.
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="text-[10px] uppercase tracking-[0.30em] text-neutral-500">{s.k}</div>
                <div className="mt-2 text-[13px] font-medium text-white">{s.title}</div>
                <div className="mt-3 text-[13px] leading-relaxed text-neutral-300">{s.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid gap-8 md:grid-cols-[1fr,1fr] md:items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">Guardrails</div>
                <div className="mt-3 text-xl text-white">Safe defaults, explicit escalation</div>
                <p className="mt-3 text-[13px] leading-relaxed text-neutral-300">
                  If confidence is low, data is incomplete, or policy boundaries are reached—
                  the system escalates with a structured brief and suggested next steps.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Escalation rule</div>
                <div className="mt-2 text-[13px] text-neutral-200">
                  If confidence &lt; 0.85 → human review
                </div>
                <div className="mt-3 h-px bg-white/10" />
                <ul className="mt-3 space-y-2 text-[12px] text-neutral-300">
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Include evidence links and extracted fields
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Suggest 2–3 resolution options
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Preserve audit log of decisions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATTERNS */}
      <section id="patterns" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">Patterns</div>
          <h2 className="mt-4 text-2xl font-medium md:text-3xl">Start where leverage is immediate</h2>
          <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-neutral-300">
            We often begin with triage + synthesis (routing, summaries, briefs) because it creates real value without risky write actions.
            Then we graduate to scoped execution.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Triage fabric",
                b: "Classify inbound requests, route by policy/owner, attach structured summaries, track SLAs.",
                p: ["Email", "Service desk", "Forms"],
              },
              {
                t: "Decision briefs",
                b: "Transform long threads and documents into concise, citeable briefs with options and tradeoffs.",
                p: ["Leadership", "Ops", "Compliance"],
              },
              {
                t: "Scoped execution",
                b: "Run approved actions inside your stack—ticket updates, drafts, status reports—within guardrails.",
                p: ["CRM", "Jira", "M365"],
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-[13px] font-medium text-white">{c.t}</div>
                <div className="mt-3 text-[13px] leading-relaxed text-neutral-300">{c.b}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.p.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-300"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOP */}
      <section id="workshop" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">Workshop</div>
              <h2 className="mt-4 text-2xl font-medium md:text-3xl">Enable your team to operate the factory</h2>
              <p className="mt-4 text-[13px] leading-relaxed text-neutral-300">
                If you want internal capability—not dependence—we can run a hands-on workshop to teach your team
                how to build and govern Copilot Studio / M365 agents safely.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <PillBadge pill={{ label: "Copilot Studio", tone: "mint" }} />
                <PillBadge pill={{ label: "M365 agents", tone: "mint" }} />
                <PillBadge pill={{ label: "Governance + risk", tone: "amber" }} />
                <PillBadge pill={{ label: "Operational playbooks", tone: "violet" }} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-6">
              <div className="text-[10px] uppercase tracking-[0.30em] text-neutral-500">Typical agenda</div>
              <ul className="mt-4 space-y-3 text-[13px] text-neutral-300">
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                  Designing agent boundaries and safe tool access
                </li>
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                  Confidence thresholds + escalation patterns
                </li>
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                  Logging, auditability, and owner handoff
                </li>
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                  A working internal prototype by the end
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">FAQ</div>
          <h2 className="mt-4 text-2xl font-medium md:text-3xl">The questions that matter</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <summary className="cursor-pointer list-none text-[13px] font-medium text-white">
                  <div className="flex items-center justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="text-neutral-500 group-open:rotate-45 transition">+</span>
                  </div>
                </summary>
                <div className="mt-3 text-[13px] leading-relaxed text-neutral-300">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.30em] text-neutral-500">Contact</div>
              <h2 className="mt-4 text-2xl font-medium md:text-3xl">Bring one workflow.</h2>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-neutral-300">
                Describe one process that’s slow, repetitive, or fragile. We’ll respond with a concrete agent concept,
                a deployment approach, and what “production” means for your environment.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="text-[10px] uppercase tracking-[0.30em] text-neutral-500">Email</div>
                <div className="mt-2 text-[14px] text-white">hello@reziiix.com</div>
                <div className="mt-2 text-[12px] text-neutral-500">Or use the form — it’s intentionally static for now.</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/20"
                placeholder="Name"
              />
              <input
                className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/20"
                placeholder="Work email"
              />
              <textarea
                className="mt-3 h-28 w-full resize-none rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/20"
                placeholder="Describe the workflow..."
              />
              <button className="mt-4 w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200">
                Send (static)
              </button>

              <div className="mt-4 text-[11px] text-neutral-500">
                Want internal capability? Ask about the Copilot Studio / M365 workshop.
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-[11px] text-neutral-600">
            © {new Date().getFullYear()} REZIIIX
          </footer>
        </div>
      </section>

      <CommandPalette
        open={paletteOpen}
        query={q}
        setQuery={setQ}
        actions={filtered}
        onClose={() => {
          setPaletteOpen(false);
          setQ("");
        }}
        onRun={(run) => {
          run();
          setPaletteOpen(false);
          setQ("");
        }}
      />
    </main>
  );
}

/* ---------- components ---------- */

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="hover:text-white transition">
      {children}
    </button>
  );
}

function AwardRow({ k, title, body }: { k: string; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[10px] uppercase tracking-[0.22em] text-neutral-300">
        {k}
      </div>
      <div>
        <div className="text-[13px] font-medium text-white">{title}</div>
        <div className="mt-1 text-[12px] leading-relaxed text-neutral-300">{body}</div>
      </div>
    </div>
  );
}

function PillBadge({ pill }: { pill: Pill }) {
  const tone =
    pill.tone === "mint"
      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
      : pill.tone === "amber"
      ? "border-amber-300/25 bg-amber-300/10 text-amber-200"
      : pill.tone === "violet"
      ? "border-violet-300/25 bg-violet-300/10 text-violet-200"
      : "border-white/10 bg-black/30 text-neutral-300";

  return <span className={cx("rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]", tone)}>{pill.label}</span>;
}

/* ---------- Command Palette (lightweight) ---------- */

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
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

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
                  <div className="text-xs text-neutral-200">Navigate</div>
                </div>
                <div className="text-[11px] text-neutral-500">Esc to close</div>
              </div>
            </div>

            <div className="p-3 md:p-4">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type… (e.g., process, contact)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-white/20"
              />

              <div className="mt-3 max-h-[320px] overflow-auto pr-1">
                {actions.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-400">No matches.</div>
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
                            {a.hint && <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">{a.hint}</div>}
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
