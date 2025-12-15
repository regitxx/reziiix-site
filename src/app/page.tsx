"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";

/** ---------------- TYPES ---------------- */

type Theme = {
  bg: string;
  ink: string;
  muted: string;
  soft: string;
  border: string;
  accentA: string;
  accentB: string;
  accentC: string;
};

const THEME: Theme = {
  bg: "#F6F2EA", // museum paper
  ink: "#0B0B0C",
  muted: "rgba(11,11,12,0.62)",
  soft: "rgba(255,255,255,0.70)",
  border: "rgba(11,11,12,0.12)",
  accentA: "#1D4ED8", // cobalt
  accentB: "#F97316", // orange
  accentC: "#10B981", // emerald
};

type Capability = {
  title: string;
  subtitle: string;
  body: string;
  bullets: string[];
  tag: string;
};

/** ---------------- HELPERS ---------------- */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/** ---------------- PAGE ---------------- */

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const theme = THEME;

  // cursor light — but “print-like” (subtle)
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  useEffect(() => {
    const mm = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, on: true });
    const leave = () => setCursor((p) => ({ ...p, on: false }));
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  // active nav highlight
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = ["top", "sell", "deliver", "proof", "stack", "engage", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        });
      },
      { threshold: 0.55 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // modal
  const [open, setOpen] = useState<null | Capability>(null);

  const capabilities: Capability[] = useMemo(
    () => [
      {
        tag: "Deliverable",
        title: "Internal AI Capability",
        subtitle: "Not automation scripts. A durable system your team owns.",
        body: "We design an internal capability: governed agent behavior, retrieval, connectors, observability, and a safe operating model—inside your environment.",
        bullets: ["Owned architecture", "Governed behavior", "Observable + maintainable", "Built like software"],
      },
      {
        tag: "Deliverable",
        title: "RAG + Knowledge Graph Brain",
        subtitle: "The “brain” that stays consistent, explainable, and expandable.",
        body: "We implement retrieval grounded in your knowledge (docs + structured graph). The point is stability, traceability, and controllable behavior—so it works in real business conditions.",
        bullets: ["Grounded answers", "Structured reasoning", "Permission-aware retrieval", "Change-safe evolution"],
      },
      {
        tag: "Deliverable",
        title: "Agent Automations",
        subtitle: "Agents that act inside your tools — with control.",
        body: "We ship agents that operate where your work already happens (M365 / Slack / CRM / service desks) with approval gates, constraints, and audit trails.",
        bullets: ["Human-in-the-loop", "Scoped permissions", "Audit trails", "Real integrations"],
      },
      {
        tag: "Deliverable",
        title: "Enablement (Optional)",
        subtitle: "If you want your team to build too.",
        body: "Workshops + patterns so your team can operate, extend, and own the system. We can also build Microsoft-native agents in Copilot Studio when that’s the best fit.",
        bullets: ["Workshops", "Templates", "Governance playbooks", "Copilot Studio / M365 agents"],
      },
    ],
    []
  );

  const integrations = useMemo(
    () => [
      "Microsoft 365",
      "Copilot Studio",
      "Teams",
      "Outlook",
      "SharePoint",
      "Slack",
      "Notion",
      "Google Workspace",
      "HubSpot",
      "Salesforce",
      "ServiceNow",
      "Jira",
      "Zendesk",
      "Custom APIs",
    ],
    []
  );

  return (
    <main
      className="min-h-screen"
      style={{
        background: theme.bg,
        color: theme.ink,
      }}
    >
      {/* “paper” + halftone + edge vibes */}
      <BackgroundPrint theme={theme} />

      {/* cursor ambient (very subtle) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
        <motion.div
          animate={{
            opacity: cursor.on ? 1 : 0,
            x: cursor.x - 260,
            y: cursor.y - 260,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.6 }}
          className="absolute h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, ${theme.accentA}10, transparent 62%),
              radial-gradient(circle at 70% 40%, ${theme.accentB}10, transparent 62%),
              radial-gradient(circle at 50% 80%, ${theme.accentC}08, transparent 65%)
            `,
          }}
        />
      </div>

      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          background: "rgba(246,242,234,0.78)",
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <Mark theme={theme} />
            <div className="leading-none text-left">
              <div className="text-[11px] uppercase tracking-[0.42em]">REZIIIX</div>
              <div className="mt-1 text-[11px]" style={{ color: theme.muted }}>
                build internal AI capability
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavBtn theme={theme} active={active === "sell"} onClick={() => scrollToId("sell")}>
              What you buy
            </NavBtn>
            <NavBtn theme={theme} active={active === "deliver"} onClick={() => scrollToId("deliver")}>
              Deliverables
            </NavBtn>
            <NavBtn theme={theme} active={active === "proof"} onClick={() => scrollToId("proof")}>
              Proof
            </NavBtn>
            <NavBtn theme={theme} active={active === "stack"} onClick={() => scrollToId("stack")}>
              Stack
            </NavBtn>
            <NavBtn theme={theme} active={active === "engage"} onClick={() => scrollToId("engage")}>
              Engage
            </NavBtn>
            <NavBtn theme={theme} active={active === "contact"} onClick={() => scrollToId("contact")}>
              Contact
            </NavBtn>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-full px-4 py-2 text-[12px] font-semibold text-white transition"
              style={{ background: theme.ink }}
            >
              Start
            </button>
          </div>
        </div>
      </header>

      {/* HERO — editorial / manifesto */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.15fr,0.85fr] md:items-start">
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.30em]"
                   style={{ border: `1px solid ${theme.border}`, background: theme.soft, color: theme.muted }}>
                <span className="h-2 w-2 rounded-full" style={{ background: theme.accentA }} />
                not a generic automation studio
              </div>

              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.85, ease: [0.2, 1, 0.2, 1] }}
                className="mt-6 text-[clamp(2.8rem,6.4vw,5.8rem)] font-semibold leading-[0.90] tracking-[-0.06em]"
              >
                Build an{" "}
                <span className="relative inline-block">
                  internal AI capability
                  <span
                    aria-hidden
                    className="absolute left-0 -bottom-3 h-[10px] w-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${theme.accentA}55, ${theme.accentB}45, ${theme.accentC}35)`,
                      filter: "blur(12px)",
                      opacity: 0.55,
                    }}
                  />
                </span>{" "}
                your company can own.
              </motion.h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>
                You don’t “buy automations.” You buy a durable system: governed agents, a grounded knowledge brain (RAG + KG),
                integrations into your stack, and an operating model your team understands.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToId("sell")}
                  className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                  style={{ background: theme.ink }}
                >
                  Show me in plain language
                </button>
                <button
                  onClick={() => scrollToId("proof")}
                  className="rounded-2xl px-6 py-3 text-sm"
                  style={{ border: `1px solid ${theme.border}`, background: theme.soft, color: theme.ink }}
                >
                  Proof / Research
                </button>
              </div>

              <div className="mt-10 grid gap-3 md:grid-cols-3">
                <KeyStat theme={theme} k="Outcome" v="Less manual work, more control." />
                <KeyStat theme={theme} k="Ownership" v="Built inside your environment." />
                <KeyStat theme={theme} k="Trust" v="Governance + auditability." />
              </div>
            </div>

            <HeroPoster theme={theme} />
          </div>
        </div>
      </section>

      {/* WHAT YOU BUY — plain language */}
      <section id="sell" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                What you buy
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                A capability your team can{" "}
                <span style={{ color: theme.accentA }}>run</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Think of it like an internal “AI department in a box”:
                it can answer questions grounded in your knowledge, take actions in your tools,
                and behave safely under your policies.
              </p>

              <div className="mt-8 rounded-[28px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
                <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                  Simple mental model
                </div>
                <div className="mt-4 grid gap-3 text-[13px]" style={{ color: theme.muted }}>
                  <div><b style={{ color: theme.ink }}>Brain</b>: RAG + Knowledge Graph for grounded reasoning.</div>
                  <div><b style={{ color: theme.ink }}>Hands</b>: agents that act in your tools (M365/Slack/CRM).</div>
                  <div><b style={{ color: theme.ink }}>Rules</b>: governance, approvals, logging, boundaries.</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <BigCallout theme={theme} title="You keep the control." body="No black-box platform dependency. You own the architecture and the evolution." />
              <BigCallout theme={theme} title="People understand it." body="We build it so non-technical teams can trust it, operate it, and extend it." />
              <BigCallout theme={theme} title="It survives reality." body="Security constraints, approvals, audits, tool sprawl, changing documents—built for that." />
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES — radically not bento cards: “catalog wall” */}
      <section id="deliver" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Deliverables
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                What we actually ship.
              </h2>
            </div>
            <div className="hidden md:block text-[12px]" style={{ color: theme.muted }}>
              Click any item →
            </div>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {capabilities.map((c, idx) => (
              <button
                key={c.title}
                onClick={() => setOpen(c)}
                className="group text-left"
                style={{ outline: "none" }}
              >
                <div
                  className="relative overflow-hidden rounded-[26px] p-6"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: theme.soft,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
                        {c.tag}
                      </div>
                      <div className="mt-3 text-[18px] font-semibold tracking-[-0.02em]">
                        {c.title}
                      </div>
                      <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                        {c.subtitle}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                          border: `1px solid ${theme.border}`,
                          background: "rgba(255,255,255,0.70)",
                          color: theme.ink,
                        }}
                      >
                        OPEN
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 h-[1px]" style={{ background: theme.border }} />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.bullets.slice(0, 3).map((b) => (
                      <span
                        key={b}
                        className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]"
                        style={{
                          border: `1px solid ${theme.border}`,
                          background: "rgba(255,255,255,0.62)",
                          color: theme.muted,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* edge stripe */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-[10px] opacity-70"
                    style={{
                      background: `linear-gradient(180deg, ${theme.accentA}55, ${theme.accentB}45, ${theme.accentC}35)`,
                    }}
                  />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-60 transition-opacity blur-3xl"
                    style={{
                      background: `radial-gradient(circle at 20% 20%, ${theme.accentA}22, transparent 55%),
                                   radial-gradient(circle at 80% 30%, ${theme.accentB}20, transparent 58%),
                                   radial-gradient(circle at 45% 90%, ${theme.accentC}16, transparent 62%)`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF — your PolyU research */}
      <section id="proof" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Proof
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                This isn’t just business.
                <br />
                It’s{" "}
                <span style={{ color: theme.accentB }}>research-grade</span>{" "}
                engineering.
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                We work on developing the “brain” of robots — including RAG + Knowledge Graph systems and agent automation —
                at The Hong Kong Polytechnic University (Research Lab for Advanced Social Robotics).
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.polyu.edu.hk/sd/research/research-centres-and-labs/research-lab-for-advanced-social-robotics/?sc_lang=en"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                  style={{ background: theme.ink }}
                >
                  View the lab →
                </a>
                <button
                  onClick={() => scrollToId("contact")}
                  className="rounded-2xl px-6 py-3 text-sm"
                  style={{ border: `1px solid ${theme.border}`, background: theme.soft, color: theme.ink }}
                >
                  Work with us
                </button>
              </div>
            </div>

            <div className="rounded-[30px] p-7" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
              <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                Research themes
              </div>

              <div className="mt-5 space-y-3 text-[13px]" style={{ color: theme.muted }}>
                <div>• Cognitive architectures for autonomous systems</div>
                <div>• Grounded reasoning via RAG + Knowledge Graphs</div>
                <div>• Agent behavior under constraints and safety boundaries</div>
              </div>

              <div className="mt-7 rounded-[22px] p-5" style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.65)" }}>
                <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                  What that means for businesses
                </div>
                <div className="mt-3 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                  Your systems are designed to be stable, explainable, and evolvable — not just impressive.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK — NASA ecosystem */}
      <section id="stack" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Stack
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                No platform adoption problem.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                We build inside your stack. Your tools stay the interface.
                Hover a tool to see the constellation connect.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill theme={theme}>M365</Pill>
                <Pill theme={theme}>Copilot Studio</Pill>
                <Pill theme={theme}>Slack</Pill>
                <Pill theme={theme}>CRM</Pill>
                <Pill theme={theme}>Service desk</Pill>
                <Pill theme={theme}>Internal APIs</Pill>
              </div>
            </div>

            <IntegrationUniverseNASA theme={theme} items={integrations} />
          </div>
        </div>
      </section>

      {/* ENGAGE */}
      <section id="engage" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Engage
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Start small. Build durable. Then scale.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                We’ll guide you to the smallest build that proves value and sets a foundation your team can extend.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <EngageCard
                theme={theme}
                title="Pilot"
                sub="Best start"
                body="One system shipped with governance + observability so it survives reality."
                points={["Clear scope", "Durable patterns", "Measurable outcome"]}
              />
              <EngageCard
                theme={theme}
                title="Scale"
                sub="For teams"
                body="Expand across workflows with reusable architecture and operating rhythms."
                points={["Shared connectors", "Monitoring", "Rollout support"]}
              />
              <EngageCard
                theme={theme}
                title="Enable"
                sub="Workshops"
                body="Teach your team to operate and extend the capability safely."
                points={["Templates", "Governance playbooks", "Copilot Studio optional"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Contact
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                If you want ownership, not dependency —
                <br />
                we should talk.
              </h2>

              <div className="mt-8 rounded-3xl p-6" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
                <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  Email
                </div>
                <div className="mt-2 text-[16px] font-semibold">hello@reziiix.com</div>
                <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                  Keep it short: goal, tools involved, constraints, and what success looks like.
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                    style={{ background: theme.ink }}
                    onClick={() => {
                      const subject = encodeURIComponent("REZIIIX — inquiry");
                      const body = encodeURIComponent(
                        `Hi REZIIIX,\n\nWe want to improve:\n- Goal:\n- Tools involved:\n- Constraints (security/compliance):\n- Timeline:\n\nThanks!`
                      );
                      window.location.href = `mailto:hello@reziiix.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    Email template
                  </button>
                  <button
                    className="rounded-2xl px-6 py-3 text-sm"
                    style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}
                    onClick={() => scrollToId("top")}
                  >
                    Back to top
                  </button>
                </div>
              </div>

              <div className="mt-10 text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
                © {new Date().getFullYear()} REZIIIX
              </div>
            </div>

            <div className="rounded-[30px] p-7" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
              <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                Quick message
              </div>
              <div className="mt-3 text-[15px] font-semibold leading-tight">
                Send a note in 30 seconds.
              </div>

              <div className="mt-6 space-y-3">
                <Input theme={theme} placeholder="Name" />
                <Input theme={theme} placeholder="Work email" />
                <Textarea theme={theme} placeholder="What do you want to improve?" />
                <button
                  type="button"
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: theme.ink }}
                >
                  Send (static)
                </button>
                <div className="text-[11px]" style={{ color: theme.muted }}>
                  We can wire this to a CRM later.
                </div>
              </div>

              <div className="mt-7 h-[1px]" style={{ background: theme.border }} />

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  REZIIIX
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.ink }}>
                  internal AI capability
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CapabilityModal theme={theme} open={open} onClose={() => setOpen(null)} />
    </main>
  );
}

/** ---------------- VISUAL SYSTEM ---------------- */

function BackgroundPrint({ theme }: { theme: Theme }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base paper */}
      <div className="absolute inset-0" style={{ background: theme.bg }} />

      {/* halftone-ish vignette */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background: `
            radial-gradient(900px 600px at 14% 8%, rgba(0,0,0,0.06), transparent 60%),
            radial-gradient(900px 600px at 92% 16%, rgba(0,0,0,0.05), transparent 62%),
            radial-gradient(1000px 700px at 50% 92%, rgba(0,0,0,0.045), transparent 65%)
          `,
        }}
      />

      {/* crisp “print edges” */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background: `
            repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 18px)
          `,
          mixBlendMode: "multiply",
        }}
      />

      {/* micro noise (cheap, no asset) */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "repeating-radial-gradient(circle at 20% 30%, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* accent “ink spills” */}
      <div
        className="absolute -inset-24 blur-3xl opacity-[0.22]"
        style={{
          background: `
            radial-gradient(circle at 12% 10%, ${theme.accentA}22, transparent 60%),
            radial-gradient(circle at 90% 18%, ${theme.accentB}1f, transparent 62%),
            radial-gradient(circle at 56% 92%, ${theme.accentC}18, transparent 65%)
          `,
        }}
      />
    </div>
  );
}

function Mark({ theme }: { theme: Theme }) {
  return (
    <div
      className="h-9 w-9 rounded-xl"
      style={{
        border: `1px solid ${theme.border}`,
        background: `linear-gradient(135deg, rgba(0,0,0,0.92), rgba(0,0,0,0.78))`,
      }}
    >
      <div className="grid h-full w-full place-items-center text-[11px] font-semibold tracking-[0.28em]" style={{ color: "#fff" }}>
        R
      </div>
    </div>
  );
}

function NavBtn({
  theme,
  active,
  onClick,
  children,
}: {
  theme: Theme;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-2 text-[12px] transition"
      style={{ color: active ? theme.ink : theme.muted }}
    >
      <span className="relative">
        {children}
        {active && (
          <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full" style={{ background: theme.ink }} />
        )}
      </span>
    </button>
  );
}

function Pill({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]"
      style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)", color: theme.muted }}
    >
      {children}
    </span>
  );
}

function KeyStat({ theme, k, v }: { theme: Theme; k: string; v: string }) {
  return (
    <div className="rounded-[22px] p-4" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
      <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
        {k}
      </div>
      <div className="mt-2 text-[13px] font-semibold" style={{ color: theme.ink }}>
        {v}
      </div>
    </div>
  );
}

function HeroPoster({ theme }: { theme: Theme }) {
  return (
    <div className="rounded-[34px] overflow-hidden" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
      <div className="p-6">
        <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
          What makes this different
        </div>

        <div className="mt-5 rounded-[26px] p-5" style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}>
          <div className="text-[12px] font-semibold" style={{ color: theme.ink }}>
            We build the “brain” + the “hands”.
          </div>
          <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
            A grounded knowledge system (RAG + KG) and agents that act in your tools — under governance.
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          <PosterRow theme={theme} label="Brain" value="RAG + Knowledge Graph" chip={theme.accentB} />
          <PosterRow theme={theme} label="Hands" value="Agents in M365 / Slack / CRM" chip={theme.accentA} />
          <PosterRow theme={theme} label="Rules" value="Policies, approvals, audit trails" chip={theme.accentC} />
        </div>

        <div className="mt-6 h-[1px]" style={{ background: theme.border }} />

        <div className="mt-6 text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
          Built for reality:
        </div>

        <div className="mt-3 grid gap-2 text-[13px]" style={{ color: theme.muted }}>
          <div>• Your docs change</div>
          <div>• Your tools sprawl</div>
          <div>• Your compliance matters</div>
          <div>• Humans must stay in control</div>
        </div>
      </div>

      <div className="h-[10px]" style={{ background: `linear-gradient(90deg, ${theme.accentA}aa, ${theme.accentB}aa, ${theme.accentC}aa)` }} />
    </div>
  );
}

function PosterRow({ theme, label, value, chip }: { theme: Theme; label: string; value: string; chip: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[22px] px-4 py-3"
         style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.65)" }}>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: chip }} />
        <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>{label}</span>
      </div>
      <div className="text-[12px] font-semibold" style={{ color: theme.ink }}>{value}</div>
    </div>
  );
}

function BigCallout({ theme, title, body }: { theme: Theme; title: string; body: string }) {
  return (
    <div className="rounded-[28px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
      <div className="text-[14px] font-semibold" style={{ color: theme.ink }}>
        {title}
      </div>
      <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
        {body}
      </div>
      <div className="mt-6 h-[1px]" style={{ background: theme.border }} />
      <div className="mt-4 text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
        REZIIIX / capability build
      </div>
    </div>
  );
}

function EngageCard({
  theme,
  title,
  sub,
  body,
  points,
}: {
  theme: Theme;
  title: string;
  sub: string;
  body: string;
  points: string[];
}) {
  return (
    <div className="rounded-[28px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.soft }}>
      <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
        {sub}
      </div>
      <div className="mt-3 text-[16px] font-semibold" style={{ color: theme.ink }}>
        {title}
      </div>
      <div className="mt-3 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
        {body}
      </div>
      <div className="mt-5 space-y-2">
        {points.map((p) => (
          <div key={p} className="flex items-start gap-2">
            <span className="mt-2 h-2 w-2 rounded-full" style={{ background: theme.ink }} />
            <span className="text-[13px]" style={{ color: theme.muted }}>
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ---------------- MODAL ---------------- */

function CapabilityModal({
  theme,
  open,
  onClose,
}: {
  theme: Theme;
  open: Capability | null;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.38)" }} />
          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ y: reduceMotion ? 0 : 14, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: reduceMotion ? 0 : 14, opacity: 0, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[30px] p-6"
            style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
                  {open.tag}
                </div>
                <div className="mt-3 text-[18px] font-semibold">{open.title}</div>
                <div className="mt-2 text-[13px]" style={{ color: theme.muted }}>
                  {open.subtitle}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full px-3 py-2 text-[12px]"
                style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}
              >
                Close
              </button>
            </div>

            <div className="mt-6 rounded-3xl p-5" style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}>
              <div className="text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                {open.body}
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {open.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full" style={{ background: theme.ink }} />
                    <span className="text-[13px]" style={{ color: theme.muted }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                REZIIIX
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.ink }}>
                internal capability
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** ---------------- FORM INPUTS ---------------- */

function Input({ theme, placeholder }: { theme: Theme; placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-2xl px-4 py-3 text-sm outline-none"
      style={{
        border: `1px solid ${theme.border}`,
        background: "rgba(255,255,255,0.70)",
        color: theme.ink,
      }}
    />
  );
}

function Textarea({ theme, placeholder }: { theme: Theme; placeholder: string }) {
  return (
    <textarea
      placeholder={placeholder}
      className="h-28 w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none"
      style={{
        border: `1px solid ${theme.border}`,
        background: "rgba(255,255,255,0.70)",
        color: theme.ink,
      }}
    />
  );
}

/** ---------------- NASA ECOSYSTEM (NO CLIPPING) ---------------- */

function IntegrationUniverseNASA({ theme, items }: { theme: Theme; items: string[] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState({ w: 820, h: 520 });
  const [hovered, setHovered] = useState<string | null>(null);

  // Responsive sizing
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  // Scroll breathing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [breath, setBreath] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setBreath(Math.sin(Math.PI * v)));
    return () => unsub();
  }, [scrollYProgress]);

  const center = useMemo(() => ({ x: size.w / 2, y: size.h / 2 }), [size.w, size.h]);

  // Node bounds: prevents clipping
  const NODE_W = 132;
  const NODE_H = 38;
  const SAFE_PAD = 26;

  const safeRX = Math.max(150, size.w / 2 - NODE_W - SAFE_PAD);
  const safeRY = Math.max(130, size.h / 2 - NODE_H - SAFE_PAD);

  // Tiers
  const tiers = useMemo(() => {
    const core = ["Microsoft 365", "Copilot Studio", "Slack"];
    const biz = ["Salesforce", "HubSpot", "ServiceNow", "Zendesk"];
    const rest = items.filter((x) => !core.includes(x) && !biz.includes(x));
    return [
      { t: 0, labels: core },
      { t: 1, labels: biz },
      { t: 2, labels: rest },
    ];
  }, [items]);

  // Starfield
  const stars = useMemo(() => {
    const count = 110;
    return Array.from({ length: count }).map((_, i) => {
      const x = (Math.sin(i * 999) * 0.5 + 0.5) * size.w;
      const y = (Math.cos(i * 777) * 0.5 + 0.5) * size.h;
      const r = 0.7 + ((i * 13) % 12) * 0.08;
      const o = 0.12 + ((i * 17) % 10) * 0.03;
      return { x, y, r, o };
    });
  }, [size.w, size.h]);

  // Compute nodes
  const nodes = useMemo(() => {
    const now = Date.now() / 1000;
    const breatheK = 1 + breath * 0.05;

    const ex = 1.16;
    const ey = 0.78;

    const rings = [
      { r: 0.40, drift: 4.0 },
      { r: 0.63, drift: 6.0 },
      { r: 0.88, drift: 7.6 },
    ];

    const all = tiers.flatMap((tier) => {
      const ring = rings[tier.t] ?? rings[2];
      const n = Math.max(tier.labels.length, 1);

      return tier.labels.map((label, i) => {
        const a = (i / n) * Math.PI * 2 + tier.t * 0.82 + 0.25;

        const rx = safeRX * ring.r * breatheK * ex;
        const ry = safeRY * ring.r * breatheK * ey;

        const baseX = center.x + Math.cos(a) * rx;
        const baseY = center.y + Math.sin(a) * ry;

        const drift = reduceMotion ? 0 : ring.drift;
        const dx = reduceMotion ? 0 : Math.sin(now * 0.62 + i * 0.9 + tier.t) * drift;
        const dy = reduceMotion ? 0 : Math.cos(now * 0.54 + i * 0.8 + tier.t) * drift;

        return { label, tier: tier.t, x: baseX + dx, y: baseY + dy };
      });
    });

    return all;
  }, [tiers, center.x, center.y, safeRX, safeRY, breath, reduceMotion]);

  const hoveredNode = hovered ? nodes.find((n) => n.label === hovered) : null;

  const beamPath = useMemo(() => {
    if (!hoveredNode) return null;
    const cx = center.x;
    const cy = center.y;
    const tx = hoveredNode.x;
    const ty = hoveredNode.y;

    const mx = (cx + tx) / 2;
    const my = (cy + ty) / 2;

    const bend = (tx > cx ? 1 : -1) * 44;
    const ctrlX = mx + bend;
    const ctrlY = my - 22;

    return `M ${cx} ${cy} Q ${ctrlX} ${ctrlY} ${tx} ${ty}`;
  }, [hoveredNode, center.x, center.y]);

  const edges = useMemo(() => {
    const pts = nodes;
    const maxDist = Math.min(size.w, size.h) * 0.32;
    const E: Array<{ a: any; b: any; w: number }> = [];

    for (let i = 0; i < pts.length; i++) {
      const dists: Array<{ j: number; d: number }> = [];
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        dists.push({ j, d });
      }
      dists.sort((a, b) => a.d - b.d);
      for (const k of dists.slice(0, 2)) {
        if (k.d < maxDist) {
          const w = 1 - k.d / maxDist;
          E.push({ a: pts[i], b: pts[k.j], w });
        }
      }
    }
    return E;
  }, [nodes, size.w, size.h]);

  return (
    <div
      ref={ref}
      className="relative h-[440px] md:h-[520px] overflow-hidden rounded-[36px]"
      style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.60)" }}
    >
      <div
        className="absolute -inset-24 opacity-55 blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 18% 20%, ${theme.accentA}22, transparent 55%),
            radial-gradient(circle at 86% 26%, ${theme.accentB}18, transparent 58%),
            radial-gradient(circle at 56% 88%, ${theme.accentC}14, transparent 62%)
          `,
        }}
      />

      {/* starfield */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: s.r,
              height: s.r,
              opacity: s.o,
              background: "rgba(0,0,0,0.55)",
              transform: "translate(-50%, -50%)",
              filter: "blur(0.2px)",
            }}
          />
        ))}
      </div>

      <svg className="pointer-events-none absolute inset-0" width={size.w} height={size.h}>
        {[0.40, 0.63, 0.88].map((r, i) => (
          <motion.ellipse
            key={i}
            cx={center.x}
            cy={center.y}
            rx={safeRX * r * 1.16}
            ry={safeRY * r * 0.78}
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeDasharray="4 7"
            animate={reduceMotion ? {} : { opacity: [0.85, 0.45, 0.85], strokeDashoffset: [0, 60] }}
            transition={reduceMotion ? { duration: 0.1 } : { duration: 11 + i * 3, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke={`rgba(0,0,0,${0.05 + e.w * 0.12})`}
            strokeWidth={1}
          />
        ))}

        <AnimatePresence>
          {beamPath && hoveredNode && (
            <>
              <motion.path
                d={beamPath}
                fill="none"
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={10}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ filter: "blur(8px)" }}
              />
              <motion.path
                d={beamPath}
                fill="none"
                stroke={`url(#beamGrad)`}
                strokeWidth={2.4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.path
                d={beamPath}
                fill="none"
                stroke={`rgba(255,255,255,0.85)`}
                strokeWidth={1.8}
                strokeDasharray="18 220"
                initial={{ strokeDashoffset: 260, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.05, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>

        <defs>
          <linearGradient
            id="beamGrad"
            gradientUnits="userSpaceOnUse"
            x1={center.x}
            y1={center.y}
            x2={hoveredNode?.x ?? center.x}
            y2={hoveredNode?.y ?? center.y}
          >
            <stop offset="0%" stopColor={theme.accentA} stopOpacity="0.70" />
            <stop offset="55%" stopColor={theme.accentB} stopOpacity="0.70" />
            <stop offset="100%" stopColor={theme.accentC} stopOpacity="0.65" />
          </linearGradient>
        </defs>
      </svg>

      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-[26px] px-6 py-5 text-center" style={{ border: `1px solid ${theme.border}`, background: "rgba(246,242,234,0.86)" }}>
          <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
            REZIIIX
          </div>
          <div className="mt-2 text-[15px] font-semibold">Integrates into</div>
          <div className="mt-1 text-[13px]" style={{ color: theme.muted }}>
            {hovered ? hovered : "your existing stack"}
          </div>
        </div>
      </div>

      {/* nodes */}
      {nodes.map((n) => (
        <motion.div
          key={n.label}
          className="absolute z-[20]"
          initial={false}
          animate={{ x: n.x, y: n.y }}
          transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.55 }}
          onMouseEnter={() => setHovered(n.label)}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.08 }}
        >
          <div
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.18em]"
            style={{
              border: `1px solid ${theme.border}`,
              background: "rgba(246,242,234,0.88)",
              color: theme.muted,
              boxShadow: "0 18px 55px rgba(0,0,0,0.08)",
            }}
          >
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full"
              style={{
                background: n.tier === 0 ? theme.accentA : n.tier === 1 ? theme.accentB : theme.accentC,
              }}
            />
            {n.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
