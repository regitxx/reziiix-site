"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Accent = {
  name: string;
  a: string;
  b: string;
  c: string;
};

const ACCENTS: Accent[] = [
  { name: "Ultraviolet", a: "#6D28D9", b: "#0EA5E9", c: "#F97316" },
  { name: "Electric Lime", a: "#65A30D", b: "#14B8A6", c: "#2563EB" },
  { name: "Hot Pink", a: "#DB2777", b: "#F59E0B", c: "#22C55E" },
  { name: "Ink Blue", a: "#1D4ED8", b: "#7C3AED", c: "#111827" },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const [accentIdx, setAccentIdx] = useState(0);
  const accent = ACCENTS[accentIdx % ACCENTS.length];

  // cursor halo (editorial subtle)
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, active: true });
    const onLeave = () => setCursor((p) => ({ ...p, active: false }));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const micro = useMemo(
    () => [
      "A studio for serious systems.",
      "A premium build quality mindset.",
      "Calm automation. Clear control.",
      "Designed to be used, not admired.",
      "Your internal AI factory.",
    ],
    []
  );
  const [microIdx, setMicroIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setMicroIdx((i) => (i + 1) % micro.length), 2200);
    return () => window.clearInterval(id);
  }, [micro.length]);

  return (
    <main
      className="min-h-screen"
      style={{
        background: "#F7F7F4",
        color: "#0A0A0A",
      }}
    >
      {/* cursor halo */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
        <motion.div
          animate={{
            opacity: cursor.active ? 1 : 0,
            x: cursor.x - 220,
            y: cursor.y - 220,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.5 }}
          className="absolute h-[440px] w-[440px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accent.a}22, transparent 60%),
                         radial-gradient(circle at 70% 40%, ${accent.b}22, transparent 60%),
                         radial-gradient(circle at 50% 80%, ${accent.c}18, transparent 62%)`,
          }}
        />
      </div>

      {/* top chrome */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F7F7F4]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl border border-black/10"
              style={{ background: `linear-gradient(135deg, ${accent.a}22, ${accent.b}18)` }}
            />
            <div className="leading-none text-left">
              <div className="text-[11px] uppercase tracking-[0.38em]">REZIIIX</div>
              <div className="mt-1 text-[11px] text-black/55">AI automation studio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <Nav onClick={() => scrollToId("film")}>Film</Nav>
            <Nav onClick={() => scrollToId("capabilities")}>Capabilities</Nav>
            <Nav onClick={() => scrollToId("proof")}>Proof</Nav>
            <Nav onClick={() => scrollToId("contact")}>Contact</Nav>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAccentIdx((i) => i + 1)}
              className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[12px] text-black/70 hover:bg-white transition"
            >
              Theme
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-full px-4 py-2 text-[12px] font-semibold text-white transition"
              style={{ background: accent.a }}
            >
              Start a pilot
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-end">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.75, ease: [0.2, 1, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-black/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.a }} />
                <span className="uppercase tracking-[0.26em]">Editorial business design</span>
              </div>

              <h1 className="mt-6 text-[clamp(3.0rem,6.0vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
                Build
                <span className="block font-light">calm power.</span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-black/70">
                REZIIIX is a studio that designs and ships modern automation systems with premium UX,
                governance, and integration-first thinking.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToId("film")}
                  className="rounded-2xl border border-black/10 bg-white/70 px-6 py-3 text-sm text-black/75 hover:bg-white transition"
                >
                  Watch the film
                </button>
                <button
                  onClick={() => scrollToId("contact")}
                  className="rounded-2xl px-6 py-3 text-sm font-semibold text-white transition"
                  style={{ background: accent.a }}
                >
                  Start a pilot
                </button>
              </div>

              <div className="mt-10 h-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={microIdx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: "easeOut" }}
                    className="text-[13px] text-black/60"
                  >
                    <span className="mr-2 inline-block h-[10px] w-[10px] rounded-sm" style={{ background: accent.b }} />
                    {micro[microIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.85, ease: [0.2, 1, 0.2, 1], delay: 0.05 }}
              className="relative"
            >
              <div
                className="absolute -inset-6 rounded-[36px] blur-2xl opacity-50"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accent.a}22, transparent 55%),
                               radial-gradient(circle at 70% 40%, ${accent.b}22, transparent 60%),
                               radial-gradient(circle at 50% 80%, ${accent.c}18, transparent 62%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.34em] text-black/50">In one line</div>
                    <div className="mt-3 text-[15px] font-semibold leading-tight">
                      You own an AI factory inside your company.
                    </div>
                    <div className="mt-2 text-[13px] leading-relaxed text-black/65">
                      We design it, ship it, and help you scale it like real software.
                    </div>
                  </div>
                  <span
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold"
                    style={{ color: accent.a }}
                  >
                    REZIIIX
                  </span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <MiniTile accent={accent} k="Style" v="Minimal, premium, usable." />
                  <MiniTile accent={accent} k="Output" v="A running system." />
                  <MiniTile accent={accent} k="Focus" v="One workflow first." />
                  <MiniTile accent={accent} k="Scale" v="Patterns, not chaos." />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILM STRIP SPLIT-SCREEN */}
      <FilmSection accent={accent} />

      {/* CAPABILITIES */}
      <section id="capabilities" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-black/50">Capabilities</div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Product quality,
                <span className="block font-light">system seriousness.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-black/70">
                We build automation like premium product teams: clean UX, clear control, integration-first.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Tag accent={accent}>Integration-first</Tag>
                <Tag accent={accent}>Governance-ready</Tag>
                <Tag accent={accent}>Human-grade UX</Tag>
                <Tag accent={accent}>Enterprise-safe</Tag>
              </div>

              <div className="mt-10 rounded-3xl border border-black/10 bg-white/70 p-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">Optional</div>
                <div className="mt-3 text-[14px] font-semibold">Microsoft-native builds</div>
                <div className="mt-2 text-[13px] leading-relaxed text-black/65">
                  If needed: we also develop Copilot Studio / M365 agents, and can run a workshop to enable your team.
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <BigCard accent={accent} title="Quiet automation" body="The best system feels invisible: less friction, fewer handoffs." foot="Less repetition • more focus" />
              <BigCard accent={accent} title="Governed behavior" body="Clear boundaries, approvals, observability — built in, not bolted on." foot="Audit-friendly • controlled" />
              <BigCard accent={accent} title="Integration as design" body="M365, Slack, email, service desks, CRMs, internal APIs — where work already lives." foot="No new platform to force" />
              <BigCard accent={accent} title="Pilot → production" body="A focused pilot, then reusable patterns to scale across teams." foot="Small start • scalable fabric" />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-black/50">Proof</div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Serious teams
                <span className="block font-light">want seriousness.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-black/70">
                We ship real systems: scoped, tested, measurable, maintainable — designed for long-term ownership.
              </p>

              <div className="mt-8 grid gap-3">
                <ProofLine accent={accent} k="Approach" v="Start with one workflow. Make it real." />
                <ProofLine accent={accent} k="Output" v="A running system your team can own." />
                <ProofLine accent={accent} k="Standard" v="Clear controls + audit trail." />
              </div>
            </div>

            <div className="rounded-[30px] border border-black/10 bg-white/70 p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">A pilot looks like</div>
                  <div className="mt-3 text-[15px] font-semibold leading-tight">
                    2–4 weeks to a production-grade pilot.
                  </div>
                  <div className="mt-2 text-[13px] leading-relaxed text-black/65">
                    One workflow. Integrated. Governed. Observable. Then expand by pattern.
                  </div>
                </div>
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-black/70">
                  Pilot
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                <Bullet accent={accent}>Discovery + scope → measurable definition</Bullet>
                <Bullet accent={accent}>Build → integrate → harden</Bullet>
                <Bullet accent={accent}>Run with humans in the loop</Bullet>
                <Bullet accent={accent}>Expand to adjacent workflows</Bullet>
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
                <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">Signal</div>
                <div className="mt-2 text-[13px] text-black/70">
                  If you care about quality, control, and ownership — we’ll work well together.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-black/50">Engage</div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Bring one
                <span className="block font-light">messy process.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-black/70">
                We’ll reply with a concrete pilot plan: scope, integrations, guardrails, timeline.
              </p>

              <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 p-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">Email</div>
                <div className="mt-2 text-[16px] font-semibold">hello@reziiix.com</div>
                <div className="mt-2 text-[13px] text-black/65">
                  Keep it short: “Here’s the workflow, where it lives, and what good looks like.”
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                  style={{ background: accent.a }}
                  onClick={() => {
                    const subject = encodeURIComponent("Pilot request — REZIIIX");
                    const body = encodeURIComponent(
                      `Hi REZIIIX,\n\nWe want to pilot:\n- Workflow:\n- Where it lives (tools):\n- Success metric:\n\nThanks!`
                    );
                    window.location.href = `mailto:hello@reziiix.com?subject=${subject}&body=${body}`;
                  }}
                >
                  Email with template
                </button>
                <button
                  className="rounded-2xl border border-black/10 bg-white/60 px-6 py-3 text-sm text-black/75 hover:bg-white transition"
                  onClick={() => scrollToId("top")}
                >
                  Back to top
                </button>
              </div>

              <div className="mt-10 text-[11px] uppercase tracking-[0.22em] text-black/45">
                © {new Date().getFullYear()} REZIIIX
              </div>
            </div>

            <div className="rounded-[30px] border border-black/10 bg-white/70 p-7">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">Quick note</div>
              <div className="mt-3 text-[15px] font-semibold leading-tight">Send a workflow in 30 seconds.</div>

              <div className="mt-6 space-y-3">
                <Input placeholder="Name" />
                <Input placeholder="Work email" />
                <Textarea placeholder="Describe the process you want to improve…" />
                <button
                  type="button"
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: accent.b }}
                >
                  Send (static)
                </button>
                <div className="text-[11px] text-black/55">
                  We can wire this to your CRM later (or replace it with an intake agent).
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-black/50">REZIIIX</span>
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: accent.a }}>
                  Studio system
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------- FILM SECTION ----------------- */

function FilmSection({ accent }: { accent: Accent }) {
  const reduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Split layout: left text pinned, right film moves.
  // Film moves vertically as you scroll through this section.
  const filmY = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const titleSkew = useTransform(scrollYProgress, [0, 1], [0, -7]);

  // A subtle “frame counter”
  const counter = useTransform(scrollYProgress, [0, 1], [1, 6]);

  const frames = useMemo(
    () => [
      {
        label: "Frame 01 — Quiet",
        headline: "Reduce friction.",
        body: "The best automation doesn’t scream. It disappears into daily work.",
      },
      {
        label: "Frame 02 — Control",
        headline: "Keep ownership.",
        body: "Systems should be governed, inspectable, and built for long-term trust.",
      },
      {
        label: "Frame 03 — Integration",
        headline: "Stay in-tool.",
        body: "The interface your team loves is the one they already use.",
      },
      {
        label: "Frame 04 — Quality",
        headline: "Ship like product.",
        body: "Beautiful UX + serious engineering. Otherwise it’s just a demo.",
      },
      {
        label: "Frame 05 — Scale",
        headline: "Expand by pattern.",
        body: "Start with one workflow. Then replicate the fabric across teams.",
      },
      {
        label: "Frame 06 — Calm power",
        headline: "Make work lighter.",
        body: "Less repetition. More focus. More time for actual decisions.",
      },
    ],
    []
  );

  return (
    <section id="film" className="border-t border-black/10">
      {/* Tall section so scroll has room */}
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr]">
          {/* LEFT — pinned editorial copy */}
          <div className="md:sticky md:top-24 h-fit">
            <div className="text-[11px] uppercase tracking-[0.34em] text-black/50">Film</div>

            <motion.h2
              style={{ x: titleX, skewX: titleSkew as any }}
              className="mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              A campaign
              <span className="block font-light">for systems.</span>
            </motion.h2>

            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-black/70">
              Scroll to “watch”. This isn’t a dashboard. It’s an editorial story in frames — the vibe of a luxury brand
              but for business systems.
            </p>

            <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">Now showing</div>
                  <div className="mt-2 text-[14px] font-semibold">REZIIIX / Studio Film</div>
                </div>
                <div className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-black/70">
                  <motion.span>
                    {/*
                      We can't directly render MotionValue here without subscription,
                      so we show an elegant static label + moving indicator below.
                    */}
                    6 frames
                  </motion.span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-[2px] flex-1 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ width: useTransform(scrollYProgress, [0, 1], ["8%", "100%"]), background: accent.a }}
                  />
                </div>
                <div className="text-[11px] text-black/55">scroll</div>
              </div>

              <div className="mt-5 text-[12px] leading-relaxed text-black/65">
                Want the “wow” without the mess. Minimal words. Maximum design signal.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                style={{ background: accent.a }}
                onClick={() => scrollToId("contact")}
              >
                Start a pilot
              </button>
              <span className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                premium ux • serious systems
              </span>
            </div>
          </div>

          {/* RIGHT — film strip */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white/60 p-4 md:p-6">
              {/* top “film header” */}
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: accent.b }} />
                  <span className="text-[11px] uppercase tracking-[0.34em] text-black/55">Split-screen film</span>
                </div>
                <div className="text-[11px] text-black/55">scroll to advance</div>
              </div>

              {/* film viewport */}
              <div className="relative h-[520px] md:h-[640px] overflow-hidden rounded-[28px] border border-black/10 bg-white">
                {/* moving track */}
                <motion.div
                  style={{ y: filmY }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="absolute left-0 top-0 w-full"
                >
                  {frames.map((f, idx) => (
                    <FilmFrame
                      key={f.label}
                      index={idx}
                      accent={accent}
                      label={f.label}
                      headline={f.headline}
                      body={f.body}
                    />
                  ))}
                </motion.div>

                {/* film perforations */}
                <div className="pointer-events-none absolute inset-y-0 left-3 hidden md:flex flex-col justify-between py-6">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className="h-3 w-3 rounded-sm bg-black/10" />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-3 hidden md:flex flex-col justify-between py-6">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className="h-3 w-3 rounded-sm bg-black/10" />
                  ))}
                </div>

                {/* floating counter */}
                <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] text-black/60 backdrop-blur">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: accent.a }} />
                  <CounterPill scrollYProgress={scrollYProgress} accent={accent} />
                </div>
              </div>

              <div className="mt-4 text-[12px] text-black/55">
                This is a “design-first” narrative layer: it sells the vibe, the quality bar, and the trust signal.
              </div>
            </div>

            {/* glow behind */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[44px] blur-3xl opacity-40"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accent.a}22, transparent 60%),
                             radial-gradient(circle at 70% 40%, ${accent.b}22, transparent 60%),
                             radial-gradient(circle at 50% 80%, ${accent.c}18, transparent 62%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterPill({ scrollYProgress, accent }: { scrollYProgress: any; accent: Accent }) {
  const v = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const [n, setN] = useState(1);

  useEffect(() => {
    const unsub = v.on("change", (x: number) => {
      setN(clampInt(Math.round(x), 1, 6));
    });
    return () => unsub();
  }, [v]);

  return (
    <span className="font-semibold" style={{ color: accent.a }}>
      Frame {String(n).padStart(2, "0")} / 06
    </span>
  );
}

function clampInt(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function FilmFrame({
  index,
  accent,
  label,
  headline,
  body,
}: {
  index: number;
  accent: Accent;
  label: string;
  headline: string;
  body: string;
}) {
  // Each frame is a “campaign still” made with CSS gradients (no assets needed).
  // We alternate art direction a bit per frame.
  const art = getArtDirection(index, accent);

  return (
    <div className="h-[520px] md:h-[640px] w-full p-4 md:p-6">
      <div className="grid h-full gap-4 md:grid-cols-[1.1fr,0.9fr]">
        {/* left: image still */}
        <div className="relative overflow-hidden rounded-[26px] border border-black/10 bg-white">
          <div className="absolute inset-0" style={{ background: art.background }} />
          <div className="absolute inset-0" style={{ background: art.overlay }} />

          {/* micro details */}
          <div className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-black/60 backdrop-blur">
            REZIIIX
          </div>

          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-black/10 bg-white/80 p-3 backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.28em] text-black/50">{label}</div>
            <div className="mt-1 text-[13px] font-semibold tracking-[-0.01em]" style={{ color: accent.a }}>
              {headline}
            </div>
          </div>
        </div>

        {/* right: editorial caption */}
        <div className="rounded-[26px] border border-black/10 bg-white/70 p-5">
          <div className="text-[10px] uppercase tracking-[0.34em] text-black/50">
            Caption
          </div>
          <div className="mt-4 text-[16px] font-semibold leading-snug tracking-[-0.01em]">
            {headline}
          </div>
          <div className="mt-3 text-[13px] leading-relaxed text-black/70">{body}</div>

          <div className="mt-6 space-y-2">
            <CaptionLine accent={accent} t="Minimal words. Maximum signal." />
            <CaptionLine accent={accent} t="Designed like a premium product." />
            <CaptionLine accent={accent} t="Built to earn trust in real teams." />
          </div>

          <div className="mt-6 border-t border-black/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-black/50">
            Frame {String(index + 1).padStart(2, "0")} • Studio film
          </div>
        </div>
      </div>
    </div>
  );
}

function getArtDirection(i: number, accent: Accent) {
  // different “stills” via gradients; looks like abstract editorial photography
  const sets = [
    {
      background: `radial-gradient(circle at 20% 25%, ${accent.a}55, transparent 60%),
                   radial-gradient(circle at 70% 35%, ${accent.b}44, transparent 62%),
                   radial-gradient(circle at 40% 80%, ${accent.c}33, transparent 64%),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.06))`,
    },
    {
      background: `radial-gradient(circle at 65% 20%, ${accent.b}55, transparent 58%),
                   radial-gradient(circle at 25% 55%, ${accent.c}40, transparent 60%),
                   radial-gradient(circle at 55% 85%, ${accent.a}30, transparent 62%),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05), transparent 55%)`,
    },
    {
      background: `conic-gradient(from 180deg at 50% 50%, ${accent.a}25, ${accent.b}20, ${accent.c}18, ${accent.a}25),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.0), rgba(0,0,0,0.08))`,
    },
    {
      background: `radial-gradient(circle at 35% 30%, ${accent.c}55, transparent 62%),
                   radial-gradient(circle at 75% 60%, ${accent.a}44, transparent 60%),
                   radial-gradient(circle at 45% 85%, ${accent.b}30, transparent 64%),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `linear-gradient(0deg, rgba(255,255,255,0.0), rgba(0,0,0,0.05))`,
    },
    {
      background: `radial-gradient(circle at 50% 25%, ${accent.a}55, transparent 62%),
                   radial-gradient(circle at 30% 65%, ${accent.b}40, transparent 60%),
                   radial-gradient(circle at 75% 78%, ${accent.c}30, transparent 64%),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 60%)`,
    },
    {
      background: `linear-gradient(135deg, ${accent.a}20, ${accent.b}16, ${accent.c}12),
                   linear-gradient(135deg, #ffffff, #f2f2ee)`,
      overlay: `radial-gradient(circle at 50% 40%, rgba(0,0,0,0.06), transparent 55%)`,
    },
  ];
  return sets[i % sets.length];
}

/* ---------------- small UI ---------------- */

function Nav({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-2 text-[12px] text-black/60 hover:text-black transition"
      type="button"
    >
      {children}
    </button>
  );
}

function MiniTile({ accent, k, v }: { accent: Accent; k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="text-[10px] uppercase tracking-[0.28em] text-black/50">{k}</div>
      <div className="mt-2 text-[13px] font-semibold leading-snug" style={{ color: accent.a }}>
        {v}
      </div>
    </div>
  );
}

function Tag({ children, accent }: { children: React.ReactNode; accent: Accent }) {
  return (
    <span
      className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-black/70"
      style={{ boxShadow: `0 0 0 2px ${accent.a}08 inset` }}
    >
      {children}
    </span>
  );
}

function BigCard({ title, body, foot, accent }: { title: string; body: string; foot: string; accent: Accent }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 transition hover:bg-white">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-50" style={{ background: `${accent.a}22` }} />
      <div className="relative">
        <div className="text-[13px] font-semibold tracking-[-0.01em]">{title}</div>
        <div className="mt-3 text-[13px] leading-relaxed text-black/65">{body}</div>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
          <span className="text-[11px] uppercase tracking-[0.22em] text-black/45">{foot}</span>
          <span className="text-[11px] font-semibold" style={{ color: accent.b }}>
            →
          </span>
        </div>
      </div>
    </div>
  );
}

function ProofLine({ k, v, accent }: { k: string; v: string; accent: Accent }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 rounded-full" style={{ background: accent.a }} />
      <div>
        <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">{k}</div>
        <div className="mt-1 text-[13px] text-black/70">{v}</div>
      </div>
    </div>
  );
}

function Bullet({ children, accent }: { children: React.ReactNode; accent: Accent }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[7px] h-2 w-2 rounded-full" style={{ background: accent.b }} />
      <div className="text-[13px] leading-relaxed text-black/70">{children}</div>
    </div>
  );
}

function CaptionLine({ t, accent }: { t: string; accent: Accent }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[7px] h-2 w-2 rounded-full" style={{ background: accent.c }} />
      <div className="text-[13px] text-black/70">{t}</div>
    </div>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none focus:border-black/20"
    />
  );
}

function Textarea({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      placeholder={placeholder}
      className="h-28 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none focus:border-black/20"
    />
  );
}
