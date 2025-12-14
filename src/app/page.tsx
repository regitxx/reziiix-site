"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * REZIIIX — Artifact Mode Homepage
 * A living "AI factory" interface you enter and operate.
 * No sections. No marketing scroll. The site behaves like the product.
 *
 * Paste into app/page.tsx (or app/artifact/page.tsx).
 */

type Mode = "idle" | "observe" | "understand" | "own" | "engage";

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

const kindTone: Record<EventKind, { dot: string; chip: string }> = {
  intake: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  route: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  synth: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  policy: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  approve: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  execute: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
  escalate: { dot: "bg-white/70", chip: "border-white/10 bg-white/5 text-white/80" },
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

function useKeybinds(bindings: Record<string, () => void>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const key = [
        e.metaKey ? "Meta" : "",
        e.ctrlKey ? "Ctrl" : "",
        e.altKey ? "Alt" : "",
        e.shiftKey ? "Shift" : "",
        e.key,
      ]
        .filter(Boolean)
        .join("+");

      const keyLower = key.toLowerCase();

      // normalize common patterns
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const fn = bindings["cmdk"] ?? bindings["meta+k"] ?? bindings["ctrl+k"];
        if (fn) {
          e.preventDefault();
          fn();
          return;
        }
      }

      const fn = bindings[keyLower] ?? bindings[e.key.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bindings, enabled]);
}

/* ----------------------------- */

export default function HomeArtifact() {
  const reduceMotion = useReducedMotion();

  const [mode, setMode] = useState<Mode>("idle");

  // "factory controls"
  const [governance, setGovernance] = useState(true);
  const [humanLoop, setHumanLoop] = useState(true);
  const [execution, setExecution] = useState(false);
  const [intensity, setIntensity] = useState(62); // how fast the system runs
  const [threshold, setThreshold] = useState(0.85); // confidence gate

  // command palette
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");

  // live events
  const [events, setEvents] = useState<FactoryEvent[]>(() => seedEvents());

  // headline micro-state (makes it feel alive)
  const [statusWord, setStatusWord] = useState<"ACTIVE" | "STEADY" | "LIVE">("ACTIVE");

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusWord((w) => (w === "ACTIVE" ? "STEADY" : w === "STEADY" ? "LIVE" : "ACTIVE"));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  // event generator
  useEffect(() => {
    if (mode === "idle") return;

    const base = 1150; // ms
    const speed = clamp(intensity, 0, 100);
    const interval = clamp(Math.round(base - speed * 8), 220, 1150);

    const id = window.setInterval(() => {
      setEvents((prev) => {
        const next = produceEvent(prev, {
          governance,
          humanLoop,
          execution,
          threshold,
        });
        const merged = [next, ...prev].slice(0, 28);
        return merged;
      });
    }, interval);

    return () => window.clearInterval(id);
  }, [mode, governance, humanLoop, execution, intensity, threshold]);

  // palette actions
  const actions = useMemo(() => {
    const nav = (m: Mode) => () => setMode(m);
    const toggle = (setter: (v: any) => void) => () => setter((v: any) => !v);

    return [
      { label: "Enter factory", hint: "Mode", run: () => setMode("observe") },
      { label: "Mode: Observe", hint: "Mode", run: nav("observe") },
      { label: "Mode: Understand", hint: "Mode", run: nav("understand") },
      { label: "Mode: Own", hint: "Mode", run: nav("own") },
      { label: "Mode: Engage", hint: "Mode", run: nav("engage") },

      { label: `Toggle governance (${governance ? "ON" : "OFF"})`, hint: "Control", run: toggle(setGovernance) },
      { label: `Toggle human-in-loop (${humanLoop ? "ON" : "OFF"})`, hint: "Control", run: toggle(setHumanLoop) },
      { label: `Toggle execution (${execution ? "ON" : "OFF"})`, hint: "Control", run: toggle(setExecution) },

      { label: "Set speed: calm", hint: "Control", run: () => setIntensity(30) },
      { label: "Set speed: normal", hint: "Control", run: () => setIntensity(62) },
      { label: "Set speed: insane", hint: "Control", run: () => setIntensity(92) },

      { label: "Confidence gate: 0.85", hint: "Control", run: () => setThreshold(0.85) },
      { label: "Confidence gate: 0.90", hint: "Control", run: () => setThreshold(0.9) },
      { label: "Confidence gate: 0.95", hint: "Control", run: () => setThreshold(0.95) },

      { label: "Reset stream", hint: "System", run: () => setEvents(seedEvents()) },
      { label: "Exit to splash", hint: "Mode", run: () => setMode("idle") },
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
      escape: () => setPaletteOpen(false),
      "1": () => setMode("observe"),
      "2": () => setMode("understand"),
      "3": () => setMode("own"),
      "4": () => setMode("engage"),
      "g": () => setGovernance((v) => !v),
      "h": () => setHumanLoop((v) => !v),
      "e": () => setExecution((v) => !v),
      "r": () => setEvents(seedEvents()),
    },
    true
  );

  // aesthetic: single accent (not "ugly colors" — this is intentional, award-grade restraint)
  const ACCENT = "#FFFFFF";
  const INK = "#070707";

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: INK, color: ACCENT }}>
      {/* background film grain + minimal grid (quiet, editorial) */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.65] bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.92)_80%)]" />
        <Noise />
      </div>

      {/* minimal top chrome */}
      <div className="fixed left-0 right-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl border border-white/12 bg-white/10" />
              <div className="leading-none">
                <div className="text-[11px] uppercase tracking-[0.40em] text-white">REZIIIX</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Artifact mode • {statusWord}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Keycap>1</Keycap>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Observe</span>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <Keycap>2</Keycap>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Understand</span>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <Keycap>3</Keycap>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Own</span>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <Keycap>4</Keycap>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Engage</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
                ⌘K
              </span>
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] text-white/85 hover:bg-white/15 transition"
              >
                Command
              </button>
              <button
                type="button"
                onClick={() => setMode(mode === "idle" ? "observe" : "idle")}
                className="rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-black hover:bg-neutral-200 transition"
              >
                {mode === "idle" ? "Enter" : "Exit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* main surface */}
      <div className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {mode === "idle" && (
            <Splash
              key="idle"
              reduceMotion={!!reduceMotion}
              onEnter={() => setMode("observe")}
            />
          )}

          {mode === "observe" && (
            <Observe
              key="observe"
              reduceMotion={!!reduceMotion}
              events={events}
              onNext={() => setMode("understand")}
            />
          )}

          {mode === "understand" && (
            <Understand
              key="understand"
              reduceMotion={!!reduceMotion}
              events={events}
              governance={governance}
              humanLoop={humanLoop}
              execution={execution}
              intensity={intensity}
              threshold={threshold}
              setGovernance={setGovernance}
              setHumanLoop={setHumanLoop}
              setExecution={setExecution}
              setIntensity={setIntensity}
              setThreshold={setThreshold}
              onNext={() => setMode("own")}
              onPrev={() => setMode("observe")}
            />
          )}

          {mode === "own" && (
            <Own
              key="own"
              reduceMotion={!!reduceMotion}
              governance={governance}
              humanLoop={humanLoop}
              execution={execution}
              threshold={threshold}
              onNext={() => setMode("engage")}
              onPrev={() => setMode("understand")}
            />
          )}

          {mode === "engage" && (
            <Engage
              key="engage"
              reduceMotion={!!reduceMotion}
              onPrev={() => setMode("own")}
              onReset={() => {
                setEvents(seedEvents());
                setMode("observe");
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* command palette */}
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

/* ----------------------------- SPLASH ----------------------------- */

function Splash({ onEnter, reduceMotion }: { onEnter: () => void; reduceMotion: boolean }) {
  return (
    <motion.section
      className="mx-auto flex min-h-[82vh] max-w-6xl items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.55, ease: "easeOut" }}
    >
      <div className="w-full">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.48em] text-white/60">REZIIIX SYSTEM</div>

          <h1 className="mt-6 text-[clamp(3.2rem,6.5vw,6rem)] font-semibold leading-[0.92] text-white">
            ENTER
            <span className="block font-light text-white/75">THE FACTORY.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-white/70">
            This website is not a brochure. It is a running automation system.
            You can observe behavior, change governance, and feel how a real agent factory operates.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={onEnter}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition"
              type="button"
            >
              Enter
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] text-white/75">
              <div className="flex items-center gap-3">
                <Keycap>⌘K</Keycap>
                <span className="text-white/70">Command palette</span>
                <span className="text-white/35">•</span>
                <Keycap>G</Keycap>
                <span className="text-white/70">Governance</span>
                <span className="text-white/35">•</span>
                <Keycap>H</Keycap>
                <span className="text-white/70">Human loop</span>
                <span className="text-white/35">•</span>
                <Keycap>E</Keycap>
                <span className="text-white/70">Execution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal “seal” — no extra colors, just taste */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Seal title="Not a demo" body="Everything you see behaves like an operational system." />
          <Seal title="Not a dashboard" body="It’s a living artifact: decisions, gates, and handoffs." />
          <Seal title="Not a pitch" body="If it’s not trustworthy, it doesn’t ship." />
        </div>
      </div>
    </motion.section>
  );
}

function Seal({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.30em] text-white/60">{title}</div>
      <div className="mt-3 text-[13px] leading-relaxed text-white/75">{body}</div>
      <div className="mt-5 h-px bg-white/10" />
      <div className="mt-4 text-[10px] uppercase tracking-[0.28em] text-white/45">artifact</div>
    </div>
  );
}

/* ----------------------------- OBSERVE ----------------------------- */

function Observe({
  events,
  onNext,
  reduceMotion,
}: {
  events: FactoryEvent[];
  onNext: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      className="mx-auto min-h-[82vh] max-w-6xl px-4 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: "easeOut" }}
    >
      <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr,1.1fr]">
        {/* left: minimal narrative */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Mode 01</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Observe behavior.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">
            This is the “quiet work” layer: intake → routing → synthesis → approval → execution.
            Nothing magical. Just a system doing repetitive work with traceability.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">Hint</div>
            <p className="mt-2 text-[12px] leading-relaxed text-white/70">
              Press <span className="text-white">2</span> for Understand to change governance.
              Or hit <span className="text-white">⌘K</span> and type “toggle”.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onNext}
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              Understand →
            </button>
            <div className="text-[11px] uppercase tracking-[0.30em] text-white/45">live stream</div>
          </div>
        </div>

        {/* right: stream */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Event stream</div>
              <div className="mt-2 text-[13px] text-white/75">Last ~30 seconds</div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">click nothing • just watch</div>
          </div>

          <div className="mt-5 space-y-2">
            <AnimatePresence initial={false}>
              {events.slice(0, 11).map((e) => (
                <motion.div
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0.05 : 0.22, ease: "easeOut" }}
                  className="rounded-2xl border border-white/10 bg-black/30 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={cx("h-1.5 w-1.5 rounded-full", e.status === "warn" ? "bg-white" : "bg-white/70")} />
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                        {formatTime(e.t)}
                      </span>
                      <span className={cx("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.20em]",
                        kindTone[e.kind].chip
                      )}>
                        {kindLabel[e.kind]}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{e.owner}</span>
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                      {Math.round(e.confidence * 100)}%
                    </span>
                  </div>

                  <div className="mt-2 text-[12px] leading-relaxed text-white/80">
                    {e.text}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {e.refs.slice(0, 3).map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 text-[11px] text-white/45">
            The stream is intentionally minimal: only what a real operator needs.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ----------------------------- UNDERSTAND ----------------------------- */

function Understand({
  events,
  governance,
  humanLoop,
  execution,
  intensity,
  threshold,
  setGovernance,
  setHumanLoop,
  setExecution,
  setIntensity,
  setThreshold,
  onNext,
  onPrev,
  reduceMotion,
}: {
  events: FactoryEvent[];
  governance: boolean;
  humanLoop: boolean;
  execution: boolean;
  intensity: number;
  threshold: number;
  setGovernance: (v: boolean | ((x: boolean) => boolean)) => void;
  setHumanLoop: (v: boolean | ((x: boolean) => boolean)) => void;
  setExecution: (v: boolean | ((x: boolean) => boolean)) => void;
  setIntensity: (v: number) => void;
  setThreshold: (v: number) => void;
  onNext: () => void;
  onPrev: () => void;
  reduceMotion: boolean;
}) {
  const metrics = useMemo(() => computeMetrics(events), [events]);

  return (
    <motion.section
      className="mx-auto min-h-[82vh] max-w-6xl px-4 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: "easeOut" }}
    >
      <div className="mt-6 grid gap-6 md:grid-cols-[1.05fr,0.95fr]">
        {/* left: controls */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Mode 02</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Understand control.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">
            Toggle the pillars. Watch behavior shift.
            This is the difference between “AI toy” and “production system.”
          </p>

          <div className="mt-6 grid gap-3">
            <ToggleRow
              label="Governance"
              hint="G"
              value={governance}
              onToggle={() => setGovernance((v: boolean) => !v)}
              desc="Policies + audit trails + explicit boundaries."
            />
            <ToggleRow
              label="Human-in-loop"
              hint="H"
              value={humanLoop}
              onToggle={() => setHumanLoop((v: boolean) => !v)}
              desc="Escalations + approvals when confidence is low."
            />
            <ToggleRow
              label="Execution"
              hint="E"
              value={execution}
              onToggle={() => setExecution((v: boolean) => !v)}
              desc="Write actions: tickets, drafts, updates — gated."
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">Factory speed</div>
                <div className="mt-1 text-[12px] text-white/70">How fast the system runs.</div>
              </div>
              <div className="text-[11px] font-semibold text-white">{intensity}</div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="mt-3 w-full"
              style={{ accentColor: "#ffffff" }}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">Confidence gate</div>
                <div className="mt-1 text-[12px] text-white/70">
                  Below this → escalate (if human loop is enabled).
                </div>
              </div>
              <div className="text-[11px] font-semibold text-white">{threshold.toFixed(2)}</div>
            </div>
            <input
              type="range"
              min={0.7}
              max={0.98}
              step={0.01}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-3 w-full"
              style={{ accentColor: "#ffffff" }}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-2xl border border-white/12 bg-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/15 transition"
            >
              ← Observe
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              Own →
            </button>
            <span className="text-[10px] uppercase tracking-[0.30em] text-white/45">real control</span>
          </div>
        </div>

        {/* right: metrics + “behavior lens” */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Behavior lens</div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <MetricCard label="Escalations" value={`${metrics.escalations}`} />
              <MetricCard label="Avg confidence" value={`${Math.round(metrics.avgConfidence * 100)}%`} />
              <MetricCard label="Executed" value={`${metrics.executed}`} />
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-[12px] leading-relaxed text-white/75">
              <span className="text-white/90">Feel it:</span> if governance is off, events become “fast but unsafe”.
              If human-loop is off, low-confidence work slips through. If execution is on, the system becomes powerful —
              and dangerous without gates.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Latest decisions</div>
                <div className="mt-2 text-[13px] text-white/70">You’re seeing the operator’s truth.</div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">not marketing</span>
            </div>

            <div className="mt-4 space-y-2">
              {events.slice(0, 6).map((e) => (
                <div key={e.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">{kindLabel[e.kind]}</span>
                      <span className="text-[10px] uppercase tracking-[0.20em] text-white/45">{e.owner}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                      {Math.round(e.confidence * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 text-[12px] text-white/80">{e.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onToggle,
  desc,
}: {
  label: string;
  hint: string;
  value: boolean;
  onToggle: () => void;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-[12px] font-semibold text-white">{label}</div>
            <Keycap>{hint}</Keycap>
          </div>
          <div className="mt-1 text-[12px] text-white/65">{desc}</div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={cx(
            "relative h-9 w-16 rounded-full border transition",
            value ? "border-white/25 bg-white/15" : "border-white/12 bg-white/5"
          )}
        >
          <span
            className={cx(
              "absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white transition",
              value ? "left-8" : "left-1"
            )}
          />
        </button>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">{label}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      <div className="mt-3 h-px bg-white/10" />
      <div className="mt-3 text-[11px] text-white/50">observable</div>
    </div>
  );
}

/* ----------------------------- OWN ----------------------------- */

function Own({
  governance,
  humanLoop,
  execution,
  threshold,
  onPrev,
  onNext,
  reduceMotion,
}: {
  governance: boolean;
  humanLoop: boolean;
  execution: boolean;
  threshold: number;
  onPrev: () => void;
  onNext: () => void;
  reduceMotion: boolean;
}) {
  const spec = useMemo(() => {
    // generated spec copy based on toggles: feels “alive”
    const lines = [
      `GOVERNANCE=${governance ? "ON" : "OFF"}`,
      `HUMAN_LOOP=${humanLoop ? "ON" : "OFF"}`,
      `EXECUTION=${execution ? "ON" : "OFF"}`,
      `CONFIDENCE_GATE=${threshold.toFixed(2)}`,
      "",
      "SYSTEM PROMISE:",
      "• Every decision emits an audit line.",
      "• Every low-confidence event escalates (if enabled).",
      "• Execution is scoped to approved tools only.",
      "",
      "OWNERSHIP:",
      "• Your team owns the factory.",
      "• We deliver patterns, not lock-in.",
    ];

    return lines.join("\n");
  }, [governance, humanLoop, execution, threshold]);

  return (
    <motion.section
      className="mx-auto min-h-[82vh] max-w-6xl px-4 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: "easeOut" }}
    >
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Mode 03</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Own the factory.</h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">
            REZIIIX builds the fabric inside your company — integrated into your tools — with governance and operational ownership.
            This is not “AI as a feature.” It’s AI as an internal capability.
          </p>

          <div className="mt-6 grid gap-3">
            <Claim title="Integrated by default" body="M365, Slack, email, service desk, CRM — wherever work already lives." />
            <Claim title="Microsoft-native if needed" body="We can build Copilot Studio / M365 agents when your org wants it." />
            <Claim title="Workshop option" body="If you want internal capability, we run an enablement workshop." />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-2xl border border-white/12 bg-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/15 transition"
            >
              ← Understand
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              Engage →
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Your configuration</div>

          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/35 p-4 text-[12px] leading-relaxed text-white/80">
{spec}
          </pre>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-[12px] leading-relaxed text-white/75">
            This is the *actual* output of a serious automation studio: clear config, clear gates, clear ownership.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Claim({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="text-[12px] font-semibold text-white">{title}</div>
      <div className="mt-2 text-[12px] leading-relaxed text-white/70">{body}</div>
    </div>
  );
}

/* ----------------------------- ENGAGE ----------------------------- */

function Engage({
  onPrev,
  onReset,
  reduceMotion,
}: {
  onPrev: () => void;
  onReset: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      className="mx-auto min-h-[82vh] max-w-6xl px-4 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: "easeOut" }}
    >
      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Mode 04</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Bring one workflow.</h2>
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/70">
            If it’s slow, repetitive, fragile, or high-volume — it’s a candidate.
            We’ll respond with a concrete agent concept, integration plan, and what “production” means for your environment.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">Email</div>
            <div className="mt-2 text-[14px] font-semibold text-white">hello@reziiix.com</div>
            <div className="mt-2 text-[12px] text-white/60">Or wire this form later — we can even build the intake agent.</div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-2xl border border-white/12 bg-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/15 transition"
            >
              ← Own
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              Run it again
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/60">Static form</div>

          <div className="mt-4 space-y-3">
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25"
              placeholder="Name"
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25"
              placeholder="Work email"
            />
            <textarea
              className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/25"
              placeholder="Describe the workflow…"
            />
            <button
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition"
              type="button"
            >
              Send (static)
            </button>
          </div>

          <div className="mt-4 text-[11px] text-white/55">
            Optional: we can run a workshop to teach Copilot Studio / M365 agent building + governance.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ----------------------------- COMMAND PALETTE ----------------------------- */

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
                  <div className="mt-1 text-[12px] text-white/80">Navigate • Controls • System</div>
                </div>
                <div className="text-[11px] text-white/50">Esc to close</div>
              </div>
            </div>

            <div className="p-5">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type… (toggle, mode, speed, gate)"
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

/* ----------------------------- VISUAL HELPERS ----------------------------- */

function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-white/12 bg-black/30 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-white/75">
      {children}
    </span>
  );
}

function Noise() {
  // CSS-only grain using a repeating radial pattern; stays subtle & premium.
  return (
    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
        backgroundSize: "4px 4px",
      }}
    />
  );
}

/* ----------------------------- FACTORY LOGIC ----------------------------- */

function seedEvents(): FactoryEvent[] {
  const now = Date.now();
  const base: FactoryEvent[] = [];
  for (let i = 0; i < 10; i++) {
    base.push(
      makeEvent(now - i * 1200, {
        governance: true,
        humanLoop: true,
        execution: false,
        threshold: 0.85,
      })
    );
  }
  return base;
}

function computeMetrics(events: FactoryEvent[]) {
  const recent = events.slice(0, 18);
  const escalations = recent.filter((e) => e.kind === "escalate").length;
  const executed = recent.filter((e) => e.kind === "execute").length;
  const avgConfidence =
    recent.reduce((acc, e) => acc + e.confidence, 0) / Math.max(1, recent.length);
  return { escalations, executed, avgConfidence };
}

function produceEvent(
  prev: FactoryEvent[],
  cfg: { governance: boolean; humanLoop: boolean; execution: boolean; threshold: number }
): FactoryEvent {
  const now = Date.now();
  return makeEvent(now, cfg);
}

function makeEvent(
  t: number,
  cfg: { governance: boolean; humanLoop: boolean; execution: boolean; threshold: number }
): FactoryEvent {
  // behavior changes based on cfg:
  // - governance OFF -> more "fast/unsafe" text, less references
  // - humanLoop OFF -> fewer escalations
  // - execution ON -> more execute events (but gated)
  // - threshold affects escalation frequency
  const owner = pick(owners);

  // choose kind based on mode of operation
  const kinds: EventKind[] = cfg.execution
    ? ["intake", "route", "synth", "policy", "approve", "execute", "execute", "escalate"]
    : ["intake", "route", "synth", "policy", "approve", "escalate"];

  let kind = pick(kinds);

  // confidence distribution: governance tends to increase confidence (better structure)
  let confidence = Math.random() * 0.35 + (cfg.governance ? 0.6 : 0.48);
  confidence = clamp(confidence, 0.18, 0.98);

  // escalate rules
  const shouldEscalate = confidence < cfg.threshold;
  if (shouldEscalate && cfg.humanLoop) kind = "escalate";
  if (shouldEscalate && !cfg.humanLoop) {
    // if no human loop, system might "route" or "synth" anyway (unsafe)
    kind = cfg.execution ? pick(["route", "synth", "execute"]) : pick(["route", "synth"]);
  }

  // execution gating: if execution ON but confidence is low AND governance is on, escalate instead
  if (cfg.execution && cfg.governance && kind === "execute" && confidence < cfg.threshold) {
    kind = cfg.humanLoop ? "escalate" : "route";
  }

  const refsCount = cfg.governance ? 2 + Math.floor(Math.random() * 3) : 0 + Math.floor(Math.random() * 2);
  const refs = shuffle([...refsPool]).slice(0, refsCount);

  const status: FactoryEvent["status"] =
    kind === "escalate" ? "warn" : confidence < cfg.threshold ? "hold" : "ok";

  const text = generateText({ kind, owner, confidence, cfg });

  return {
    id: uid(),
    t,
    kind,
    confidence,
    text,
    refs,
    owner,
    status,
  };
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

  // governance OFF feels reckless/fast
  const tone = cfg.governance
    ? "structured"
    : "fast";

  const lines: Record<EventKind, string[]> = {
    intake: [
      `${owner} request received. Extracted fields: subject, owner, SLA.`,
      `Inbound signal detected. Normalizing payload for routing.`,
      `New request captured. Metadata attached (owner, urgency).`,
    ],
    route: [
      `Classified → ${owner}. Routed to correct queue with summary.`,
      `Routed to ${owner} owner-of-policy. Context links attached.`,
      `Assigned to ${owner} workflow lane. SLA timer started.`,
    ],
    synth: [
      `Synthesized thread into 6-line brief. Added evidence links.`,
      `Collapsed noisy inputs into decision-ready summary.`,
      `Drafted response + highlighted missing fields.`,
    ],
    policy: [
      `Checked policy boundaries. Marked safe actions + disallowed ones.`,
      `Validated against constraints. Flagged exceptions.`,
      `Mapped request to policy section. Suggested next steps.`,
    ],
    approve: [
      `Prepared approval packet for ${owner}. Confidence ${c}%.`,
      `Queued for human review with evidence trail.`,
      `Generated options A/B with tradeoffs for approval.`,
    ],
    execute: [
      `Executed scoped action: updated record + posted draft.`,
      `Triggered runbook step. Logged actions for audit.`,
      `Applied approved update. Notified owner.`,
    ],
    escalate: [
      `Escalated to human. Confidence ${c}% < gate. Attached brief + links.`,
      `Handoff triggered. Missing data / low confidence. Summary provided.`,
      `Escalation: policy boundary reached. Human required.`,
    ],
  };

  const base = pick(lines[kind]);

  if (tone === "fast") {
    // degrade language + remove safe signals
    const fastVariants = [
      `Auto-handled quickly. Minimal trace. Confidence ${c}%.`,
      `Moved fast. Routed without deep policy mapping.`,
      `Accelerated pass. Limited evidence attached.`,
    ];
    if (kind !== "escalate" && Math.random() < 0.55) return pick(fastVariants);
  }

  if (!cfg.humanLoop && kind === "execute" && confidence < cfg.threshold) {
    return `Executed despite low confidence (${c}%). Human loop disabled.`;
  }

  return base;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
