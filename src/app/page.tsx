"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

/**
 * REZIIIX — VIVID CUT
 * Ultra product / fashion editorial.
 * Bright palette, oversized typography, bento grids, playful motion.
 * No external components, no extra files required.
 */

type SectionId = "top" | "why" | "factory" | "proof" | "process" | "workshop" | "contact";

const nav: Array<{ id: SectionId; label: string }> = [
  { id: "top", label: "Home" },
  { id: "why", label: "Why" },
  { id: "factory", label: "Factory" },
  { id: "proof", label: "Outcomes" },
  { id: "process", label: "Process" },
  { id: "workshop", label: "Workshop" },
  { id: "contact", label: "Contact" },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 84;
  const rect = el.getBoundingClientRect();
  const y = rect.top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ----------------------------- */

export default function VividPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });

  // Fashion background: bright + clean + kinetic
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [1, 0.9, 0.7]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.06, 0.22]);

  // Palette tool (product-y but playful)
  const [mode, setMode] = useState<"Electric" | "Citrus" | "Candy">("Electric");
  const palette = useMemo(() => {
    if (mode === "Citrus")
      return {
        a: "#FF4D00", // orange blaze
        b: "#FFD400", // lemon
        c: "#00F5A0", // mint
        ink: "#0A0A0A",
      };
    if (mode === "Candy")
      return {
        a: "#FF2DAA", // hot pink
        b: "#7C3AED", // violet
        c: "#00D4FF", // neon cyan
        ink: "#07070B",
      };
    return {
      a: "#00D4FF",
      b: "#A3FF12",
      c: "#FF2DAA",
      ink: "#07070B",
    };
  }, [mode]);

  // Command palette (optional, but very “product”)
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const actions = useMemo(
    () => [
      { label: "Go → Why", hint: "#why", run: () => scrollToId("why") },
      { label: "Go → Factory", hint: "#factory", run: () => scrollToId("factory") },
      { label: "Go → Outcomes", hint: "#proof", run: () => scrollToId("proof") },
      { label: "Go → Process", hint: "#process", run: () => scrollToId("process") },
      { label: "Go → Workshop", hint: "#workshop", run: () => scrollToId("workshop") },
      { label: "Go → Contact", hint: "#contact", run: () => scrollToId("contact") },
      { label: "Theme → Electric", hint: "palette", run: () => setMode("Electric") },
      { label: "Theme → Citrus", hint: "palette", run: () => setMode("Citrus") },
      { label: "Theme → Candy", hint: "palette", run: () => setMode("Candy") },
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(s) || (a.hint ?? "").toLowerCase().includes(s));
  }, [q, actions]);

  // Tiny “outcome mixer” (makes the page feel alive)
  const [volume, setVolume] = useState(74);
  const [risk, setRisk] = useState(42);
  const [connectivity, setConnectivity] = useState(81);

  const outcome = useMemo(() => {
    const coverage = clamp(Math.round(connectivity * 0.55 + (100 - risk) * 0.25 + (100 - volume) * 0.2), 12, 95);
    const humanLoop = clamp(Math.round(risk * 0.62 + volume * 0.22), 8, 88);
    const time = clamp(Math.round((volume * 0.3 + risk * 0.26 + (100 - connectivity) * 0.44) / 2.1), 6, 38);
    return { coverage, humanLoop, time };
  }, [volume, risk, connectivity]);

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen"
      style={{
        backgroundColor: palette.ink,
        color: "#F7F7FB",
      }}
    >
      {/* VIVID BACKGROUND */}
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ opacity: bgOpacity }}>
        {/* animated ribbon gradient */}
        <motion.div
          className="absolute -inset-[20%] blur-3xl"
          style={{
            transform: `translate3d(0,0,0)`,
            background: `conic-gradient(from 160deg at 50% 40%, ${palette.a}, ${palette.b}, ${palette.c}, ${palette.a})`,
            translateY: bgShift as any,
            opacity: 0.55,
          }}
        />
        {/* clean bright wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 48%), radial-gradient(circle at 90% 30%, rgba(255,255,255,0.08), transparent 46%)",
          }}
        />
        {/* editorial grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
        {/* vignette */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: vignette,
            background: "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.92) 85%)",
          }}
        />
      </motion.div>

      {/* NAV */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-2xl"
            style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.35)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${palette.a}, ${palette.b})`,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                }}
              />
              <div className="leading-none">
                <div className="text-[11px] uppercase tracking-[0.32em] text-white/90">REZIIIX</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Vivid cut</div>
              </div>
            </div>

            <nav className="hidden items-center gap-3 md:flex">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollToId(n.id)}
                  className="rounded-full px-2.5 py-1 text-[12px] text-white/70 hover:text-white transition"
                  type="button"
                >
                  {n.label}
                </button>
              ))}

              <span className="ml-2 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                ⌘K
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1">
                {(["Electric", "Citrus", "Candy"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cx(
                      "rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition",
                      mode === m ? "bg-white text-black" : "text-white/70 hover:text-white"
                    )}
                    type="button"
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOpen(true)}
                className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[12px] text-white/90 hover:bg-white/15 transition"
                type="button"
              >
                Command
              </button>

              <button
                onClick={() => scrollToId("contact")}
                className="rounded-full px-4 py-1.5 text-[12px] font-semibold text-black"
                style={{
                  background: `linear-gradient(135deg, ${palette.b}, ${palette.a})`,
                }}
                type="button"
              >
                Book a call
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="grid gap-10 md:grid-cols-[1.25fr,0.75fr] md:items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: palette.c }} />
                <span className="uppercase tracking-[0.24em]">Fashion-grade design • Real enterprise delivery</span>
              </motion.div>

              <h1 className="mt-6 leading-[0.95]">
                <span className="block text-[clamp(3.0rem,7vw,5.4rem)] font-semibold text-white">
                  Build an AI factory
                </span>
                <span className="block text-[clamp(2.2rem,5vw,4.2rem)] font-light text-white/80">
                  inside your company.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/80">
                REZIIIX designs agentic automation that lives inside your existing tools.
                Not “another app” — a repeatable capability with governance, audit trails, and human control.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToId("factory")}
                  className="rounded-2xl px-5 py-3 text-sm font-semibold text-black"
                  style={{ background: `linear-gradient(135deg, ${palette.a}, ${palette.b})` }}
                  type="button"
                >
                  Show me the factory
                </button>
                <button
                  onClick={() => scrollToId("process")}
                  className="rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm text-white/90 hover:bg-white/10 transition"
                  type="button"
                >
                  How it ships
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-2xl border border-white/12 bg-black/35 px-5 py-3 text-sm text-white/90 hover:bg-black/45 transition"
                  type="button"
                >
                  ⌘K palette
                </button>
              </div>

              {/* Editorial strip */}
              <div className="mt-10 grid gap-3 md:grid-cols-3">
                <MiniBadge title="Deploy inside tools" body="M365, Slack, email, CRM, service desk." palette={palette} />
                <MiniBadge title="Governed behavior" body="Policies, logs, confidence gating." palette={palette} />
                <MiniBadge title="Scales by pattern" body="One workflow → adjacent workflows." palette={palette} />
              </div>
            </div>

            {/* Hero right: fashion “poster” */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[28px] bg-white/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Signature</div>

                  <div className="mt-3 text-2xl font-semibold leading-tight text-white">
                    Quiet automation.
                    <span className="block font-light text-white/75">Loud results.</span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/60">Promise</div>
                    <div className="mt-2 text-[13px] leading-relaxed text-white/80">
                      Every agent ships with: <span className="text-white">audit trails</span>,{" "}
                      <span className="text-white">escalation paths</span>, and{" "}
                      <span className="text-white">clear owners</span>.
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag text="Copilot Studio / M365 agents" palette={palette} />
                    <Tag text="Custom deployments" palette={palette} />
                    <Tag text="Workshops available" palette={palette} />
                  </div>
                </div>

                {/* diagonal color slice */}
                <div
                  className="h-16"
                  style={{
                    background: `linear-gradient(90deg, ${palette.c}, ${palette.a}, ${palette.b})`,
                    clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">Why REZIIIX</div>
              <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold leading-tight text-white">
                Businesses don’t fail from lack of AI.
                <span className="block font-light text-white/75">They fail from messy operations.</span>
              </h2>
            </div>
            <div className="max-w-md text-[13px] leading-relaxed text-white/70">
              We turn chaotic inputs into predictable outcomes — inside the tools teams already use — with governance that makes it safe to scale.
            </div>
          </div>

          {/* Bento grid — fashion/product */}
          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <Bento
              className="md:col-span-7"
              title="Not a chatbot. A capability."
              body="Agents don’t just answer — they route, summarize, draft, update, and escalate with traceability."
              palette={palette}
              accent="A"
            />
            <Bento
              className="md:col-span-5"
              title="You own the factory."
              body="Logic, policies, deployment model. You’re not locked into a vendor magic box."
              palette={palette}
              accent="B"
            />
            <Bento
              className="md:col-span-4"
              title="Audit trails by default."
              body="Every decision leaves a trail: sources, confidence, and the human who approved it."
              palette={palette}
              accent="C"
            />
            <Bento
              className="md:col-span-8"
              title="Scale like a product team."
              body="Start with one workflow, prove it, then reuse the pattern for adjacent workflows. No reinvention."
              palette={palette}
              accent="A"
            />
          </div>
        </div>
      </section>

      {/* FACTORY */}
      <section id="factory" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">The Factory</div>
              <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold text-white leading-tight">
                A fabric of agents
                <span className="block font-light text-white/75">with rules and taste.</span>
              </h2>
              <p className="mt-5 text-[14px] leading-relaxed text-white/75">
                Think of it like manufacturing: inputs come in messy, outputs come out clean — because the factory has
                machinery (tools), governance (policies), and operators (humans).
              </p>

              <div className="mt-8 space-y-3">
                <Bullet palette={palette} title="Inputs" body="Email, tickets, chat, documents, dashboards." />
                <Bullet palette={palette} title="Fabric" body="Retrieval, memory, tools, policies, confidence gating." />
                <Bullet palette={palette} title="Outputs" body="Drafts, updates, briefs, runbooks, actions." />
              </div>
            </div>

            {/* Diagram — bright + clean */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] blur-2xl" style={{ background: `radial-gradient(circle at 30% 10%, ${palette.a}55, transparent 55%)` }} />
              <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Blueprint</div>
                    <div className="mt-1 text-[14px] text-white/85">Input → Fabric → Outcome</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                    modular
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <Node palette={palette} title="Inputs" items={["Email", "Tickets", "Docs", "Chat"]} kind="left" />
                  <Node palette={palette} title="Fabric" items={["Policies", "Tools", "Retrieval", "Logs"]} kind="mid" />
                  <Node palette={palette} title="Outcomes" items={["Drafts", "Briefs", "Updates", "Escalations"]} kind="right" />
                </div>

                {/* moving highlight */}
                <motion.div
                  aria-hidden="true"
                  className="absolute -left-24 top-10 h-24 w-64 rotate-12 blur-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${palette.c}66, transparent)` }}
                  animate={{ x: ["0%", "180%"] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="proof" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">Outcomes</div>
              <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold leading-tight text-white">
                Make work feel lighter.
                <span className="block font-light text-white/75">Without making risk feel heavier.</span>
              </h2>
            </div>
            <div className="max-w-md text-[13px] leading-relaxed text-white/70">
              Slide the knobs to feel how governance + integration changes what’s safe to automate.
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <div className="md:col-span-7 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Outcome mixer</div>
                  <div className="mt-2 text-lg font-semibold text-white">Tune the factory</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVolume(rand(20, 92));
                    setRisk(rand(18, 85));
                    setConnectivity(rand(25, 95));
                  }}
                  className="rounded-2xl border border-white/12 bg-black/35 px-4 py-2 text-[12px] text-white/85 hover:bg-black/45 transition"
                >
                  Shuffle
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Slider label="Workflow complexity" value={volume} onChange={setVolume} palette={palette} />
                <Slider label="Compliance sensitivity" value={risk} onChange={setRisk} palette={palette} />
                <Slider label="Integration readiness" value={connectivity} onChange={setConnectivity} palette={palette} />
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <Metric title="Safe automation" value={`${outcome.coverage}%`} palette={palette} />
                <Metric title="Human in loop" value={`${outcome.humanLoop}%`} palette={palette} />
                <Metric title="Time to pilot" value={`${outcome.time} days`} palette={palette} />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-[13px] leading-relaxed text-white/80">
                Rule of taste: start read-only + drafting → graduate to scoped write actions → automate runbooks.
              </div>
            </div>

            <div className="md:col-span-5 grid gap-4">
              <Callout
                palette={palette}
                title="Copilot Studio / M365 agents"
                body="If you’re Microsoft-native, we design governed agents that integrate cleanly with your environment."
                tag="Microsoft-native"
              />
              <Callout
                palette={palette}
                title="Custom agent fabric"
                body="If you need bespoke integrations or deployment constraints, we build the fabric inside your stack."
                tag="Custom"
              />
              <Callout
                palette={palette}
                title="Workshop option"
                body="We can run a workshop so your team learns how to build and operate agents safely (governance included)."
                tag="Enablement"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">Process</div>
          <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold text-white leading-tight">
            A runway, not a maze.
          </h2>
          <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/75">
            We ship the first workflow fast — with governance — then scale patterns. No “big bang” platform rebuild.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <StepCard palette={palette} k="01" title="Pick one workflow" body="The messiest one. The one your team hates." />
            <StepCard palette={palette} k="02" title="Build guardrails" body="Policies, logs, thresholds, escalation." />
            <StepCard palette={palette} k="03" title="Pilot in prod" body="Behind controls. Measure real outcomes." />
            <StepCard palette={palette} k="04" title="Scale patterns" body="Adjacent workflows. Reuse the fabric." />
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Enterprise truth</div>
                <div className="mt-2 text-xl font-semibold text-white">Safety is a feature.</div>
                <div className="mt-2 text-[13px] leading-relaxed text-white/75">
                  If confidence is low or data is incomplete — the agent escalates with a structured brief, not a guess.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/60">Default rule</div>
                <div className="mt-2 text-[13px] text-white/85">
                  If confidence &lt; 0.85 → human review + evidence links
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOP */}
      <section id="workshop" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">Workshop</div>
              <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold text-white leading-tight">
                Teach teams to run the factory.
              </h2>
              <p className="mt-5 text-[14px] leading-relaxed text-white/75">
                If you want internal capability (not dependence), we can organize a hands-on workshop:
                building Copilot Studio / M365 agents with governance, safe tools, and operational playbooks.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag text="Copilot Studio" palette={palette} />
                <Tag text="M365 Agents" palette={palette} />
                <Tag text="Governance" palette={palette} />
                <Tag text="Playbooks" palette={palette} />
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Typical agenda</div>
              <ul className="mt-4 space-y-3 text-[13px] text-white/80">
                <li className="flex gap-2">
                  <Dot palette={palette} />
                  Boundaries + safe tool access
                </li>
                <li className="flex gap-2">
                  <Dot palette={palette} />
                  Confidence thresholds + escalation
                </li>
                <li className="flex gap-2">
                  <Dot palette={palette} />
                  Logging + auditability + owner handoff
                </li>
                <li className="flex gap-2">
                  <Dot palette={palette} />
                  A working internal prototype by the end
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">Contact</div>
              <h2 className="mt-4 text-[clamp(2.0rem,4vw,3.0rem)] font-semibold text-white leading-tight">
                Bring one workflow.
              </h2>
              <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-white/75">
                Tell us what’s slow, repetitive, or fragile. We’ll respond with a concrete agent concept, integration approach,
                and what “production” means for your environment.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-black/35 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Email</div>
                <div className="mt-2 text-[15px] font-semibold text-white">hello@reziiix.com</div>
                <div className="mt-2 text-[12px] text-white/60">Or use the form (intentionally static).</div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
                placeholder="Name"
              />
              <input
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
                placeholder="Work email"
              />
              <textarea
                className="mt-3 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
                placeholder="Describe the workflow..."
              />

              <button
                className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                style={{ background: `linear-gradient(135deg, ${palette.b}, ${palette.c})` }}
              >
                Send (static)
              </button>

              <div className="mt-4 text-[11px] text-white/60">
                Want enablement? Ask about the Copilot Studio / M365 workshop.
              </div>
            </div>
          </div>

          <footer className="mt-14 text-center text-[11px] text-white/45">
            © {new Date().getFullYear()} REZIIIX • Vivid Cut
          </footer>
        </div>
      </section>

      <Cmd
        open={open}
        query={q}
        setQuery={setQ}
        actions={filtered}
        onClose={() => setOpen(false)}
        onRun={(run) => {
          run();
          setOpen(false);
          setQ("");
        }}
        palette={palette}
      />
    </main>
  );
}

/* ------------------- UI bits ------------------- */

function MiniBadge({
  title,
  body,
  palette,
}: {
  title: string;
  body: string;
  palette: { a: string; b: string; c: string; ink: string };
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.30em] text-white/60">{title}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-white/75">{body}</div>
      <div className="mt-3 h-1.5 w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.a}, ${palette.c})` }} />
    </div>
  );
}

function Tag({ text, palette }: { text: string; palette: { a: string; b: string; c: string; ink: string } }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
      {text}
    </span>
  );
}

function Dot({ palette }: { palette: { a: string; b: string; c: string; ink: string } }) {
  return <span className="mt-[6px] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: palette.c }} />;
}

function Bento({
  title,
  body,
  palette,
  accent,
  className,
}: {
  title: string;
  body: string;
  palette: { a: string; b: string; c: string; ink: string };
  accent: "A" | "B" | "C";
  className?: string;
}) {
  const glow = accent === "A" ? palette.a : accent === "B" ? palette.b : palette.c;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cx("relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl", className)}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40" style={{ backgroundColor: glow }} />
      <div className="text-[12px] font-semibold text-white">{title}</div>
      <div className="mt-3 text-[14px] leading-relaxed text-white/75">{body}</div>
      <div className="mt-5 h-1.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${glow}, transparent)` }} />
    </motion.div>
  );
}

function Bullet({
  palette,
  title,
  body,
}: {
  palette: { a: string; b: string; c: string; ink: string };
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ background: `linear-gradient(135deg, ${palette.a}, ${palette.c})` }} />
      <div>
        <div className="text-[12px] font-semibold text-white">{title}</div>
        <div className="mt-1 text-[13px] leading-relaxed text-white/70">{body}</div>
      </div>
    </div>
  );
}

function Node({
  palette,
  title,
  items,
  kind,
}: {
  palette: { a: string; b: string; c: string; ink: string };
  title: string;
  items: string[];
  kind: "left" | "mid" | "right";
}) {
  const head = kind === "left" ? palette.a : kind === "mid" ? palette.c : palette.b;

  return (
    <div className="rounded-[24px] border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[12px] font-semibold text-white">{title}</div>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: head }} />
      </div>
      <div className="mt-3 space-y-2">
        {items.map((x) => (
          <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white/80">
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  palette,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  palette: { a: string; b: string; c: string; ink: string };
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px] text-white/75">
        <span>{label}</span>
        <span className="text-white/90 font-semibold">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
        style={{ accentColor: palette.c }}
      />
    </div>
  );
}

function Metric({
  title,
  value,
  palette,
}: {
  title: string;
  value: string;
  palette: { a: string; b: string; c: string; ink: string };
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/30 p-4">
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">{title}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      <div className="mt-3 h-1.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.b}, ${palette.c})` }} />
    </div>
  );
}

function Callout({
  title,
  body,
  tag,
  palette,
}: {
  title: string;
  body: string;
  tag: string;
  palette: { a: string; b: string; c: string; ink: string };
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[12px] font-semibold text-white">{title}</div>
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
          {tag}
        </span>
      </div>
      <div className="mt-3 text-[13px] leading-relaxed text-white/75">{body}</div>
      <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.a}, ${palette.b})` }} />
    </div>
  );
}

function StepCard({
  k,
  title,
  body,
  palette,
}: {
  k: string;
  title: string;
  body: string;
  palette: { a: string; b: string; c: string; ink: string };
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.30em] text-white/60">{k}</span>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette.c }} />
      </div>
      <div className="mt-3 text-[13px] font-semibold text-white">{title}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-white/75">{body}</div>
    </div>
  );
}

/* ------------------- Command Palette ------------------- */

function Cmd({
  open,
  query,
  setQuery,
  actions,
  onClose,
  onRun,
  palette,
}: {
  open: boolean;
  query: string;
  setQuery: (v: string) => void;
  actions: Array<{ label: string; hint?: string; run: () => void }>;
  onClose: () => void;
  onRun: (run: () => void) => void;
  palette: { a: string; b: string; c: string; ink: string };
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-2xl"
            style={{ boxShadow: "0 40px 140px rgba(0,0,0,0.6)" }}
          >
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.30em] text-white/60">Command</div>
                  <div className="mt-1 text-[12px] text-white/85">Navigate • Theme</div>
                </div>
                <div className="h-2 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.a}, ${palette.b}, ${palette.c})` }} />
              </div>
            </div>

            <div className="p-5">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type… (e.g., factory, citrus, contact)"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
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
