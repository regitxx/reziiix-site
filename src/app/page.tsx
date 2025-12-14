"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * REZIIIX — Sales Landing + Artifact Demo
 * Simple to understand + still feels like an artifact.
 *
 * Above fold: clear offer + CTA + live demo panel
 * Below: four clean blocks (What / How / Options / Contact)
 *
 * Single file. No other components needed.
 */

type EventKind = "intake" | "route" | "synth" | "policy" | "approve" | "execute" | "escalate";

type FactoryEvent = {
  id: string;
  t: number;
  kind: EventKind;
  confidence: number;
  text: string;
  refs: string[];
  owner: string;
  status: "ok" | "warn" | "hold";
};

const owners = ["Ops", "HR", "Fin", "IT", "CS", "Legal", "Sales", "PMO"];
const refsPool = [
  "M365/Policy#12",
  "KB/Runbook#4",
  "Jira/INC-8841",
  "CRM/Acct-21",
  "SharePoint/Doc-77",
  "ServiceNow/REQ-102",
  "Confluence/Page-9",
  "Email/Thread-18",
];

const kindLabel: Record<EventKind, string> = {
  intake: "INTAKE",
  route: "ROUTE",
  synth: "SYNTH",
  policy: "POLICY",
  approve: "APPROVE",
  execute: "EXECUTE",
  escalate: "ESCALATE",
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function formatTime(ms: number) {
  const d = new Date(ms);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 84;
  const rect = el.getBoundingClientRect();
  const y = rect.top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function useKeybinds(bindings: Record<string, () => void>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const fn = bindings["cmdk"];
        if (fn) {
          e.preventDefault();
          fn();
          return;
        }
      }
      const fn = bindings[e.key.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bindings, enabled]);
}

/* ---------------------------------- */

export default function Home() {
  const reduceMotion = useReducedMotion();

  // demo controls
  const [governance, setGovernance] = useState(true);
  const [humanLoop, setHumanLoop] = useState(true);
  const [execution, setExecution] = useState(false);
  const [intensity, setIntensity] = useState(55);
  const [threshold, setThreshold] = useState(0.85);

  // guided labels (for non-technical visitors)
  const [guided, setGuided] = useState(true);

  // command palette
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");

  // live demo stream
  const [events, setEvents] = useState<FactoryEvent[]>(() => seedEvents());

  // generator
  useEffect(() => {
    const base = 1150;
    const interval = clamp(Math.round(base - clamp(intensity, 0, 100) * 8), 260, 1150);

    const id = window.setInterval(() => {
      setEvents((prev) => {
        const next = makeEvent(Date.now(), { governance, humanLoop, execution, threshold });
        return [next, ...prev].slice(0, 16);
      });
    }, interval);

    return () => window.clearInterval(id);
  }, [governance, humanLoop, execution, threshold, intensity]);

  // palette actions
  const actions = useMemo(() => {
    const toggle = (setter: (v: any) => void) => () => setter((v: any) => !v);
    return [
      { label: "Toggle guided explanations", hint: "UX", run: toggle(setGuided) },
      { label: `Toggle governance (${governance ? "ON" : "OFF"})`, hint: "Control", run: toggle(setGovernance) },
      { label: `Toggle human-in-loop (${humanLoop ? "ON" : "OFF"})`, hint: "Control", run: toggle(setHumanLoop) },
      { label: `Toggle execution (${execution ? "ON" : "OFF"})`, hint: "Control", run: toggle(setExecution) },
      { label: "Speed: calm", hint: "Control", run: () => setIntensity(30) },
      { label: "Speed: normal", hint: "Control", run: () => setIntensity(55) },
      { label: "Speed: insane", hint: "Control", run: () => setIntensity(92) },
      { label: "Confidence gate: 0.85", hint: "Control", run: () => setThreshold(0.85) },
      { label: "Confidence gate: 0.90", hint: "Control", run: () => setThreshold(0.9) },
      { label: "Reset demo", hint: "System", run: () => setEvents(seedEvents()) },
      { label: "Jump: What we do", hint: "Nav", run: () => scrollToId("what") },
      { label: "Jump: How it works", hint: "Nav", run: () => scrollToId("how") },
      { label: "Jump: Options", hint: "Nav", run: () => scrollToId("options") },
      { label: "Jump: Contact", hint: "Nav", run: () => scrollToId("contact") },
    ];
  }, [governance, humanLoop, execution]);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(s) || (a.hint ?? "").toLowerCase().includes(s));
  }, [actions, query]);

  useKeybinds(
    {
      cmdk: () => setPaletteOpen((v) => !v),
      g: () => setGovernance((v) => !v),
      h: () => setHumanLoop((v) => !v),
      e: () => setExecution((v) => !v),
      r: () => setEvents(seedEvents()),
    },
    true
  );

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Noise />

      {/* Top Nav (simple + selling) */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/12 bg-white/10" />
            <div className="leading-none">
              <div className="text-[11px] uppercase tracking-[0.40em]">REZIIIX</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">AI automation studio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            <NavBtn onClick={() => scrollToId("what")}>What</NavBtn>
            <NavBtn onClick={() => scrollToId("how")}>How</NavBtn>
            <NavBtn onClick={() => scrollToId("options")}>Options</NavBtn>
            <NavBtn onClick={() => scrollToId("contact")}>Contact</NavBtn>
            <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
              ⌘K
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGuided((v) => !v)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-[11px] transition",
                guided ? "border-white/25 bg-white text-black" : "border-white/12 bg-white/10 text-white/85 hover:bg-white/15"
              )}
            >
              Guided: {guided ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] text-white/85 hover:bg-white/15 transition"
            >
              Command
            </button>

            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-black hover:bg-neutral-200 transition"
            >
              Talk to us
            </button>
          </div>
        </div>
      </header>

      {/* HERO: sell + prove */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.05fr,0.95fr] md:py-16">
          {/* SELL */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              <span className="uppercase tracking-[0.24em]">You own an AI factory</span>
            </div>

            <h1 className="mt-6 text-[clamp(2.6rem,5.2vw,4.2rem)] font-semibold leading-[0.95] text-white">
              We build governed AI automations
              <span className="block font-light text-white/75">inside your existing tools.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-white/70">
              REZIIIX turns repetitive workflows into reliable agentic systems with guardrails, audit trails,
              and human approvals when needed — deployed in M365, Slack, email, CRM, service desks, and more.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition"
              >
                Bring one workflow
              </button>
              <button
                type="button"
                onClick={() => scrollToId("how")}
                className="rounded-2xl border border-white/12 bg-white/10 px-6 py-3 text-sm text-white/90 hover:bg-white/15 transition"
              >
                How it works
              </button>
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Fast pilots • Enterprise-safe • No lock-in
              </span>
            </div>

            {/* “Make it obvious” in one line */}
            {guided && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-[13px] leading-relaxed text-white/75 backdrop-blur-xl">
                <span className="text-white font-semibold">Plain English:</span> you tell us a workflow (e.g. “triage HR requests”),
                we build an AI system that does it automatically, and escalates to a human when uncertain.
              </div>
            )}
          </motion.div>

          {/* PROVE (artifact demo panel) */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-white/10 blur-2xl opacity-30" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Live demo</div>
                  <div className="mt-1 text-[13px] text-white/80">A workflow running with guardrails</div>
                </div>
                <div className="flex items-center gap-2">
                  <TinyToggle label="Gov" on={governance} onClick={() => setGovernance((v) => !v)} />
                  <TinyToggle label="Human" on={humanLoop} onClick={() => setHumanLoop((v) => !v)} />
                  <TinyToggle label="Exec" on={execution} onClick={() => setExecution((v) => !v)} />
                </div>
              </div>

              {guided && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-3 text-[12px] text-white/75">
                  <span className="text-white/90 font-semibold">What you’re seeing:</span> each line is one request moving through
                  intake → decision → (approval) → action. Toggle “Gov/Human/Exec” to feel the difference.
                </div>
              )}

              <div className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                  {events.slice(0, 10).map((e) => (
                    <motion.div
                      key={e.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0.05 : 0.2, ease: "easeOut" }}
                      className="rounded-2xl border border-white/10 bg-black/30 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={cx("h-1.5 w-1.5 rounded-full", e.kind === "escalate" ? "bg-white" : "bg-white/70")} />
                          <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">{formatTime(e.t)}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.20em] text-white/80">
                            {kindLabel[e.kind]}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{e.owner}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                          {Math.round(e.confidence * 100)}%
                        </span>
                      </div>

                      <div className="mt-2 text-[12px] leading-relaxed text-white/80">{e.text}</div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {e.refs.slice(0, 2).map((r) => (
                          <span
                            key={r}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60"
                          >
                            {r}
                          </span>
                        ))}
                      </div>

                      {guided && e.kind === "escalate" && (
                        <div className="mt-2 text-[11px] text-white/55">
                          Translation: “I’m not sure enough. A human should approve this.”
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* simple sliders */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Slider label="Speed" value={intensity} min={0} max={100} step={1} onChange={setIntensity} />
                <Slider label="Confidence gate" value={Math.round(threshold * 100)} min={70} max={98} step={1} onChange={(v) => setThreshold(v / 100)} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT */}
      <section id="what" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle kicker="What we do" title="We automate the unglamorous work that never stops." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card title="Agentic workflows" body="Draft, route, summarize, update systems — safely, with logs." />
            <Card title="Integrations" body="M365, Copilot Studio, Slack, email, CRM, service desk, internal APIs." />
            <Card title="Governance by design" body="Confidence gates, policies, audit trails, and human approvals." />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle kicker="How it works" title="One workflow first. Make it real. Then scale patterns." />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Step k="01" t="Pick one workflow" d="Something repetitive and measurable." />
            <Step k="02" t="Add guardrails" d="Policies, gates, approvals, logging." />
            <Step k="03" t="Pilot in production" d="Controlled rollout with metrics." />
            <Step k="04" t="Scale by pattern" d="Adjacent workflows reuse the fabric." />
          </div>

          {guided && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-[13px] leading-relaxed text-white/75 backdrop-blur-xl">
              <span className="text-white font-semibold">If you’re non-technical:</span> this is like hiring a digital operator.
              We define its job, what it’s allowed to do, and when it must ask a human — then deploy it inside your tools.
            </div>
          )}
        </div>
      </section>

      {/* OPTIONS */}
      <section id="options" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle kicker="Options" title="Pick the path that matches your org." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card
              title="Pilot Agent"
              body="A fast, governed pilot for one workflow. You get a real system, not a demo."
              badge="Most common"
            />
            <Card
              title="AI Factory Buildout"
              body="Multiple workflows + integrations + monitoring. Treat agents like real software."
              badge="Scale"
            />
            <Card
              title="Copilot Studio / M365 Workshop"
              body="If you want internal capability, we teach your team to build safely (governance included)."
              badge="Enablement"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle kicker="Contact" title="Bring one workflow." />
          <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="text-[12px] leading-relaxed text-white/75">
                Email: <span className="font-semibold text-white">hello@reziiix.com</span>
              </div>
              <div className="mt-4 text-[13px] leading-relaxed text-white/70">
                Send a short description:
                <ul className="mt-2 list-disc pl-5 text-white/70">
                  <li>What the workflow is</li>
                  <li>Where it lives (M365, Slack, email, tools)</li>
                  <li>What “good” looks like (speed, accuracy, compliance)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="space-y-3">
                <input className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25" placeholder="Name" />
                <input className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25" placeholder="Work email" />
                <textarea className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25" placeholder="Describe the workflow…" />
                <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition" type="button">
                  Send (static)
                </button>
              </div>
              <div className="mt-4 text-[11px] text-white/55">
                We can wire this to your CRM later — or replace it with an intake agent.
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-[11px] text-white/45">
            © {new Date().getFullYear()} REZIIIX
          </footer>
        </div>
      </section>

      <CommandPalette
        open={paletteOpen}
        query={query}
        setQuery={setQuery}
        actions={filtered}
        onClose={() => {
          setPaletteOpen(false);
          setQuery("");
        }}
        onRun={(run) => {
          run();
          setPaletteOpen(false);
          setQuery("");
        }}
      />
    </main>
  );
}

/* ---------------- UI bits ---------------- */

function NavBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-[12px] text-white/70 hover:text-white transition"
    >
      {children}
    </button>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">{kicker}</div>
      <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-tight text-white">{title}</h2>
    </div>
  );
}

function Card({ title, body, badge }: { title: string; body: string; badge?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[13px] font-semibold text-white">{title}</div>
        {badge && (
          <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.20em] text-white/70">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 text-[13px] leading-relaxed text-white/70">{body}</div>
    </div>
  );
}

function Step({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.34em] text-white/55">{k}</div>
      <div className="mt-3 text-[13px] font-semibold text-white">{t}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-white/70">{d}</div>
    </div>
  );
}

function TinyToggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] transition",
        on ? "border-white/25 bg-white text-black" : "border-white/12 bg-white/10 text-white/80 hover:bg-white/15"
      )}
      title={label}
    >
      {label}
    </button>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">{label}</div>
        <div className="text-[11px] font-semibold text-white">{value}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
        style={{ accentColor: "#ffffff" }}
      />
    </div>
  );
}

function Noise() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="absolute inset-0 opacity-[0.60] bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.92)_80%)]" />
    </div>
  );
}

/* ---------------- Command Palette ---------------- */

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
  setQuery: (s: string) => void;
  actions: Array<{ label: string; hint?: string; run: () => void }>;
  onClose: () => void;
  onRun: (run: () => void) => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    setIdx(0);
  }, [open, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, Math.max(0, actions.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const a = actions[idx];
        if (a) onRun(a.run);
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, actions, idx, onClose, onRun]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center px-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ y: 14, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_40px_140px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
          >
            <div className="border-b border-white/10 bg-black/20 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.40em] text-white/60">Command</div>
                  <div className="mt-1 text-[12px] text-white/80">Nav • Demo • UX</div>
                </div>
                <div className="text-[11px] text-white/50">Esc to close</div>
              </div>
            </div>

            <div className="p-5">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type… (toggle, speed, gate, contact)"
                className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25"
              />

              <div className="mt-4 max-h-[320px] overflow-auto pr-1 space-y-2">
                {actions.map((a, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={`${a.label}-${i}`}
                      type="button"
                      onMouseEnter={() => setIdx(i)}
                      onClick={() => onRun(a.run)}
                      className={cx(
                        "w-full rounded-2xl border px-4 py-3 text-left transition",
                        active ? "border-white/25 bg-white/10" : "border-white/10 bg-black/20 hover:border-white/15"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] text-white/90">{a.label}</span>
                        {a.hint && (
                          <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{a.hint}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-white/55">
                <span>↑↓ navigate</span>
                <span>Enter run</span>
                <span>Esc close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Demo event logic ---------------- */

function seedEvents(): FactoryEvent[] {
  const now = Date.now();
  const base: FactoryEvent[] = [];
  for (let i = 0; i < 10; i++) {
    base.push(
      makeEvent(now - i * 900, {
        governance: true,
        humanLoop: true,
        execution: false,
        threshold: 0.85,
      })
    );
  }
  return base;
}

function makeEvent(
  t: number,
  cfg: { governance: boolean; humanLoop: boolean; execution: boolean; threshold: number }
): FactoryEvent {
  const owner = pick(owners);

  const kinds: EventKind[] = cfg.execution
    ? ["intake", "route", "synth", "policy", "approve", "execute", "execute", "escalate"]
    : ["intake", "route", "synth", "policy", "approve", "escalate"];

  let kind = pick(kinds);

  let confidence = Math.random() * 0.35 + (cfg.governance ? 0.6 : 0.48);
  confidence = clamp(confidence, 0.18, 0.98);

  const shouldEscalate = confidence < cfg.threshold;
  if (shouldEscalate && cfg.humanLoop) kind = "escalate";
  if (shouldEscalate && !cfg.humanLoop) kind = cfg.execution ? pick(["route", "synth", "execute"]) : pick(["route", "synth"]);
  if (cfg.execution && cfg.governance && kind === "execute" && confidence < cfg.threshold) kind = cfg.humanLoop ? "escalate" : "route";

  const refsCount = cfg.governance ? 2 + Math.floor(Math.random() * 2) : 0 + Math.floor(Math.random() * 2);
  const refs = shuffle([...refsPool]).slice(0, refsCount);

  const status: FactoryEvent["status"] = kind === "escalate" ? "warn" : confidence < cfg.threshold ? "hold" : "ok";

  const text = generateText({ kind, owner, confidence, cfg });

  return { id: uid(), t, kind, confidence, text, refs, owner, status };
}

function generateText({
  kind,
  owner,
  confidence,
  cfg,
}: {
  kind: EventKind;
  owner: string;
  confidence: number;
  cfg: { governance: boolean; humanLoop: boolean; execution: boolean; threshold: number };
}) {
  const c = Math.round(confidence * 100);
  const structured = cfg.governance;

  const lines: Record<EventKind, string[]> = {
    intake: [
      `${owner} request received. Extracted fields + SLA.`,
      `Inbound signal captured. Normalized for routing.`,
      `New request captured. Metadata attached.`,
    ],
    route: [
      `Classified → ${owner}. Routed to correct queue with summary.`,
      `Routed to ${owner} owner-of-policy. Context links attached.`,
      `Assigned to ${owner} lane. SLA timer started.`,
    ],
    synth: [
      `Summarized thread into a brief. Evidence links attached.`,
      `Condensed inputs into decision-ready summary.`,
      `Drafted response + highlighted missing fields.`,
    ],
    policy: [
      `Checked policy boundaries. Marked safe vs disallowed actions.`,
      `Validated constraints. Flagged exceptions.`,
      `Mapped request to policy section. Suggested next steps.`,
    ],
    approve: [
      `Prepared approval packet for ${owner}. Confidence ${c}%.`,
      `Queued for review with evidence trail.`,
      `Generated options A/B with tradeoffs.`,
    ],
    execute: [
      `Executed scoped action: updated record + posted draft.`,
      `Triggered runbook step. Logged actions for audit.`,
      `Applied approved update. Notified owner.`,
    ],
    escalate: [
      `Escalated to human. Confidence ${c}% < gate. Attached brief + links.`,
      `Handoff triggered. Missing data / low confidence. Summary provided.`,
      `Escalation: boundary reached. Human required.`,
    ],
  };

  if (!structured && kind !== "escalate" && Math.random() < 0.45) {
    return pick([
      `Auto-handled quickly. Limited evidence attached. Confidence ${c}%.`,
      `Moved fast. Routed without deep policy mapping.`,
      `Accelerated pass. Minimal trace.`,
    ]);
  }

  if (!cfg.humanLoop && kind === "execute" && confidence < cfg.threshold) {
    return `Executed despite low confidence (${c}%). Human loop disabled.`;
  }

  return pick(lines[kind]);
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
