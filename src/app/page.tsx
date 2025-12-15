"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";

/** ---------------- TYPES / THEMES ---------------- */

type Theme = {
  name: string;
  bg: string;
  ink: string;
  muted: string;
  card: string;
  border: string;
  a: string;
  b: string;
  c: string;
};

const THEMES: Theme[] = [
  {
    name: "Studio Bright",
    bg: "#F7F7F4",
    ink: "#0B0B0C",
    muted: "rgba(11,11,12,0.62)",
    card: "rgba(255,255,255,0.72)",
    border: "rgba(11,11,12,0.10)",
    a: "#5B21B6",
    b: "#0284C7",
    c: "#F97316",
  },
  {
    name: "Clean Mint",
    bg: "#F5FAF7",
    ink: "#07110B",
    muted: "rgba(7,17,11,0.62)",
    card: "rgba(255,255,255,0.72)",
    border: "rgba(7,17,11,0.10)",
    a: "#16A34A",
    b: "#0F766E",
    c: "#1D4ED8",
  },
  {
    name: "Punch",
    bg: "#FBF7FA",
    ink: "#12060F",
    muted: "rgba(18,6,15,0.62)",
    card: "rgba(255,255,255,0.70)",
    border: "rgba(18,6,15,0.10)",
    a: "#DB2777",
    b: "#F59E0B",
    c: "#22C55E",
  },
];

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

/** ---------------- THEME BACKGROUND (GLITCH-FREE) ---------------- */

function ThemeBackground({ theme }: { theme: Theme }) {
  return (
    <motion.div
      key={theme.name}
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        background: `
          radial-gradient(1100px 520px at 18% 10%, ${theme.a}18, transparent 60%),
          radial-gradient(900px 520px at 82% 18%, ${theme.b}14, transparent 62%),
          radial-gradient(880px 620px at 52% 88%, ${theme.c}12, transparent 68%),
          ${theme.bg}
        `,
      }}
    />
  );
}

/** ---------------- MAIN ---------------- */

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const [t, setT] = useState(0);
  const theme = THEMES[t % THEMES.length];

  // subtle cursor glow for the whole page (calm)
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  useEffect(() => {
    const mm = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY, on: true });
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
    const ids = ["top", "truth", "belief", "proof", "ecosystem", "engage", "contact"];
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
        title: "Capability Build",
        subtitle: "AI inside your organization — owned and evolvable.",
        body: "We build systems inside your environment so your team owns the architecture, the constraints, and the evolution — not a vendor.",
        bullets: ["Designed for ownership", "Patterns your team can extend", "Built like real software"],
        tag: "Core",
      },
      {
        title: "Governance + Control",
        subtitle: "Policy, review paths, and auditability by design.",
        body: "Enterprise reality: approvals, access boundaries, human oversight, and traceability. We build with governance as a first-class requirement.",
        bullets: ["Human-in-the-loop paths", "Audit trails and observability", "Scoped permissions"],
        tag: "Trust",
      },
      {
        title: "Integration Engineering",
        subtitle: "Your tools remain the interface.",
        body: "We integrate where work already lives — Microsoft 365, Copilot Studio, Slack, CRMs, service desks, and internal APIs — so adoption is natural.",
        bullets: ["M365 + Copilot Studio", "CRM + service desk", "Custom connectors"],
        tag: "Stack",
      },
      {
        title: "Enablement",
        subtitle: "We can teach your team to operate and extend it.",
        body: "If you want in-house capability, we run workshops and build alongside your team — so you’re not dependent on us for every change.",
        bullets: ["Copilot Studio / M365 agents", "Workshops + templates", "Operating playbooks"],
        tag: "Optional",
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
    <main style={{ background: theme.bg, color: theme.ink }} className="min-h-screen">
      {/* theme compositor (fixes theme artifacts) */}
      <AnimatePresence mode="wait">
        <ThemeBackground theme={theme} />
      </AnimatePresence>

      {/* cursor ambient (subtle) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
        <motion.div
          animate={{
            opacity: cursor.on ? 1 : 0,
            x: cursor.x - 240,
            y: cursor.y - 240,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.6 }}
          className="absolute h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${theme.a}12, transparent 60%),
                         radial-gradient(circle at 70% 40%, ${theme.b}10, transparent 60%),
                         radial-gradient(circle at 50% 80%, ${theme.c}08, transparent 62%)`,
          }}
        />
      </div>

      {/* TOP NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          background: `${theme.bg}cc`,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl"
              style={{
                border: `1px solid ${theme.border}`,
                background: `linear-gradient(135deg, ${theme.a}22, ${theme.b}18)`,
              }}
            />
            <div className="leading-none text-left">
              <div className="text-[11px] uppercase tracking-[0.40em]">REZIIIX</div>
              <div className="mt-1 text-[11px]" style={{ color: theme.muted }}>
                AI capability studio
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavBtn theme={theme} active={active === "truth"} onClick={() => scrollToId("truth")}>
              Truth
            </NavBtn>
            <NavBtn theme={theme} active={active === "belief"} onClick={() => scrollToId("belief")}>
              Belief
            </NavBtn>
            <NavBtn theme={theme} active={active === "proof"} onClick={() => scrollToId("proof")}>
              Proof
            </NavBtn>
            <NavBtn theme={theme} active={active === "ecosystem"} onClick={() => scrollToId("ecosystem")}>
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
              onClick={() => setT((x) => x + 1)}
              className="rounded-full px-3 py-2 text-[12px] transition"
              style={{
                border: `1px solid ${theme.border}`,
                background: "rgba(255,255,255,0.55)",
              }}
            >
              Theme: {theme.name}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-full px-4 py-2 text-[12px] font-semibold text-white transition"
              style={{ background: theme.a }}
            >
              Start
            </button>
          </div>
        </div>
      </header>

      {/* HERO (MANIFESTO) */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <div
            className="relative overflow-hidden rounded-[40px] p-7 md:p-10"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.card,
            }}
          >
            {/* “paper” depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.20)),
                  radial-gradient(820px 420px at 18% 0%, rgba(255,255,255,0.30), transparent 60%),
                  radial-gradient(720px 420px at 98% 12%, rgba(255,255,255,0.26), transparent 62%)
                `,
                opacity: 0.60,
              }}
            />

            {/* top bar */}
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.30em]"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: "rgba(255,255,255,0.60)",
                    color: theme.muted,
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: theme.b }} />
                  a point of view
                </span>
                <span
                  className="hidden sm:inline-flex rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.30em]"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: "rgba(255,255,255,0.45)",
                    color: theme.muted,
                  }}
                >
                  calm, governed systems
                </span>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.30em]"
                style={{
                  border: `1px solid ${theme.border}`,
                  background: "rgba(255,255,255,0.60)",
                  color: theme.muted,
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: theme.a }} />
                studio build
              </div>
            </div>

            {/* typography grid */}
            <div className="relative mt-8 grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-start">
              {/* left */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.1 : 0.8,
                    ease: [0.2, 1, 0.2, 1],
                  }}
                  className="text-[clamp(2.4rem,5.6vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
                >
                  Most companies will never{" "}
                  <span className="relative inline-block">
                    own their AI
                    <span
                      aria-hidden
                      className="absolute left-0 -bottom-2 h-[8px] w-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${theme.a}55, ${theme.b}45, ${theme.c}35)`,
                        filter: "blur(10px)",
                        opacity: 0.55,
                      }}
                    />
                  </span>
                  .
                </motion.h1>

                <p className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>
                  They’ll integrate tools, subscribe to platforms, and deploy copilots they don’t fully control.
                  Over time, “automation” becomes dependency.
                </p>

                {/* actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToId("belief")}
                    className="rounded-2xl px-6 py-3 text-sm font-semibold text-white transition"
                    style={{ background: theme.a }}
                  >
                    See our belief
                  </button>
                  <button
                    onClick={() => scrollToId("contact")}
                    className="rounded-2xl px-6 py-3 text-sm transition"
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: "rgba(255,255,255,0.55)",
                      color: theme.ink,
                    }}
                  >
                    Start a conversation
                  </button>
                </div>

                {/* micro-proof row */}
                <div className="mt-9 grid gap-3 md:grid-cols-3">
                  <HeroProof
                    theme={theme}
                    title="Owned"
                    desc="Capability built in your environment — not rented."
                    dot={theme.b}
                  />
                  <HeroProof
                    theme={theme}
                    title="Governed"
                    desc="Policies, review paths, and auditability by design."
                    dot={theme.a}
                  />
                  <HeroProof
                    theme={theme}
                    title="Evolvable"
                    desc="Patterns your team can extend over time."
                    dot={theme.c}
                  />
                </div>
              </div>

              {/* right: manifesto card */}
              <div
                className="relative overflow-hidden rounded-[30px] p-6 md:p-7"
                style={{
                  border: `1px solid ${theme.border}`,
                  background: "rgba(255,255,255,0.62)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-16 opacity-60 blur-3xl"
                  style={{
                    background: `
                      radial-gradient(circle at 15% 20%, ${theme.a}20, transparent 55%),
                      radial-gradient(circle at 90% 25%, ${theme.b}16, transparent 60%),
                      radial-gradient(circle at 55% 90%, ${theme.c}12, transparent 62%)
                    `,
                  }}
                />

                <div className="relative">
                  <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                    The belief
                  </div>
                  <div className="mt-4 text-[18px] font-semibold leading-snug tracking-[-0.02em]">
                    AI should be an internal capability.
                  </div>
                  <div className="mt-3 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                    Reziiix builds systems inside your organization — aligned to your tools, policies, and people —
                    so you own the evolution, not a vendor.
                  </div>

                  <div className="mt-6 grid gap-3">
                    <HeroLine theme={theme} k="Outcome" v="Ownership over novelty." />
                    <HeroLine theme={theme} k="Interface" v="Your tools stay the UI." />
                    <HeroLine theme={theme} k="Reality" v="Governance, audit trails, human control." />
                  </div>

                  <div
                    className="mt-7 flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                      REZIIIX
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.a }}>
                      capability studio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* footer stripe */}
            <div
              className="relative mt-10 flex items-center justify-between gap-4 border-t pt-5"
              style={{ borderColor: theme.border, color: theme.muted }}
            >
              <span className="text-[11px] uppercase tracking-[0.30em]">Singapore · Global</span>
              <span className="text-[11px] uppercase tracking-[0.30em]">Built for enterprise constraints</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUTH */}
      <section id="truth" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                The truth
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                AI adoption is optimized for speed —{" "}
                <span style={{ color: theme.a }}>not durability</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Most initiatives start as pilots and end as dependencies: fragmented logic, unclear responsibility,
                and systems no one can confidently govern or evolve.
              </p>
            </div>

            <div className="rounded-[30px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
              <div className="text-[11px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                What it turns into
              </div>
              <div className="mt-4 space-y-3 text-[13px]" style={{ color: theme.muted }}>
                <div>• Automations scattered across tools</div>
                <div>• Vendor dependency and locked knowledge</div>
                <div>• Security/compliance discomfort</div>
                <div>• No clear owner when it breaks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BELIEF + CAPABILITIES */}
      <section id="belief" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Our belief
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                AI should be an{" "}
                <span style={{ color: theme.b }}>internal capability</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Like engineering, finance, or security — AI should live inside the organization,
                aligned to its tools, data boundaries, and operating reality.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill theme={theme}>Owned</Pill>
                <Pill theme={theme}>Governed</Pill>
                <Pill theme={theme}>Evolvable</Pill>
                <Pill theme={theme}>Observable</Pill>
              </div>

              <div
                className="mt-8 rounded-3xl p-6"
                style={{ border: `1px solid ${theme.border}`, background: theme.card }}
              >
                <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  Also available
                </div>
                <div className="mt-3 text-[14px] font-semibold">Copilot Studio / M365 agents</div>
                <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                  If needed: we build Microsoft-native agents and can run an enablement workshop for your team.
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map((c) => (
                <button
                  key={c.title}
                  onClick={() => setOpen(c)}
                  className="group text-left rounded-[28px] p-6 transition"
                  style={{ border: `1px solid ${theme.border}`, background: theme.card }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
                        {c.tag}
                      </div>
                      <div className="mt-3 text-[16px] font-semibold">{c.title}</div>
                      <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                        {c.subtitle}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        color: theme.a,
                        border: `1px solid ${theme.border}`,
                        background: "rgba(255,255,255,0.55)",
                      }}
                    >
                      →
                    </span>
                  </div>

                  <div className="mt-6 h-[10px] w-full rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-full w-[62%] rounded-full transition-all group-hover:w-[88%]"
                      style={{ background: `linear-gradient(90deg, ${theme.a}, ${theme.b})` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROOF (RESEARCH) */}
      <section id="proof" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Proof
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Grounded in{" "}
                <span style={{ color: theme.c }}>active research</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Alongside commercial work, we contribute to research in autonomous systems and social robotics at
                The Hong Kong Polytechnic University (Research Lab for Advanced Social Robotics).
              </p>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                That work informs how we build for businesses: systems that reason, explain themselves, and stay stable over time —
                not just impressive in demos.
              </p>

              <div className="mt-6">
                <a
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: "rgba(255,255,255,0.55)",
                    color: theme.ink,
                  }}
                  href="https://www.polyu.edu.hk/sd/research/research-centres-and-labs/research-lab-for-advanced-social-robotics/?sc_lang=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  View the lab →
                </a>
              </div>
            </div>

            <div className="rounded-[30px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
              <div className="text-[11px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                What we work on
              </div>
              <div className="mt-4 space-y-3 text-[13px]" style={{ color: theme.muted }}>
                <div>• Cognitive “brain” architectures for social robots</div>
                <div>• RAG + Knowledge Graph reasoning systems</div>
                <div>• Agent-based automation under real constraints</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK (NASA) */}
      <section id="ecosystem" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Stack
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Built to live inside your{" "}
                <span style={{ color: theme.c }}>environment</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                We integrate into the tools you already use — so adoption is natural and ownership stays internal.
                Hover a tool to see the constellation.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill theme={theme}>M365</Pill>
                <Pill theme={theme}>Copilot Studio</Pill>
                <Pill theme={theme}>Slack</Pill>
                <Pill theme={theme}>Service desk</Pill>
                <Pill theme={theme}>CRM</Pill>
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
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Choose how you want to{" "}
                <span style={{ color: theme.a }}>build</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Calm, clear engagements. No platform dependency.
              </p>

              <div className="mt-8 rounded-[28px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
                <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
                  This is not for everyone
                </div>
                <div className="mt-3 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                  Reziiix works best with organizations that care about long-term ownership, operate under real constraints,
                  and prefer clarity over novelty.
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <OfferCard
                theme={theme}
                title="Pilot capability"
                price="Best start"
                body="One focused system built inside your environment to establish patterns, trust, and governance."
                bullets={["Fast scope", "Durable architecture", "Measurable outcome"]}
                badge="Start"
              />
              <OfferCard
                theme={theme}
                title="Scale & embed"
                price="For teams"
                body="Expand across workflows with reusable patterns, observability, and operational ownership."
                bullets={["Shared architecture", "Monitoring mindset", "Rollout support"]}
                badge="Scale"
              />
              <OfferCard
                theme={theme}
                title="Enablement"
                price="Workshops"
                body="Teach your team to build and operate safely (including Copilot Studio / M365 agents)."
                bullets={["Hands-on", "Templates", "Governance included"]}
                badge="Teach"
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
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                If this way of thinking{" "}
                <span style={{ color: theme.b }}>resonates</span>,
                let’s talk.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Start with a conversation — not a demo.
              </p>

              <div
                className="mt-8 rounded-3xl p-6"
                style={{ border: `1px solid ${theme.border}`, background: theme.card }}
              >
                <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  Email
                </div>
                <div className="mt-2 text-[16px] font-semibold">hello@reziiix.com</div>
                <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                  Keep it short: what you want, where it lives (tools), and what success looks like.
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                    style={{ background: theme.a }}
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
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: "rgba(255,255,255,0.55)",
                    }}
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

            <div className="rounded-[30px] p-7" style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
              <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                Quick note
              </div>
              <div className="mt-3 text-[15px] font-semibold leading-tight">
                Send a message in 30 seconds.
              </div>

              <div className="mt-6 space-y-3">
                <Input theme={theme} placeholder="Name" />
                <Input theme={theme} placeholder="Work email" />
                <Textarea theme={theme} placeholder="What do you want to improve?" />
                <button
                  type="button"
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: theme.b }}
                >
                  Send (static)
                </button>
                <div className="text-[11px]" style={{ color: theme.muted }}>
                  We can wire this to a CRM later if you want.
                </div>
              </div>

              <div
                className="mt-7 flex items-center justify-between rounded-2xl px-4 py-3"
                style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
              >
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  REZIIIX
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.a }}>
                  studio build
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

/** ---------------- NAV + UI ---------------- */

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
          <span
            className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full"
            style={{ background: theme.a }}
          />
        )}
      </span>
    </button>
  );
}

function Pill({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]"
      style={{
        border: `1px solid ${theme.border}`,
        background: "rgba(255,255,255,0.55)",
        color: theme.muted,
      }}
    >
      {children}
    </span>
  );
}

function HeroProof({
  theme,
  title,
  desc,
  dot,
}: {
  theme: Theme;
  title: string;
  desc: string;
  dot: string;
}) {
  return (
    <div
      className="rounded-[22px] p-4"
      style={{
        border: `1px solid ${theme.border}`,
        background: "rgba(255,255,255,0.55)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
        <div className="text-[11px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
          {title}
        </div>
      </div>
      <div className="mt-2 text-[12px] leading-relaxed" style={{ color: theme.muted }}>
        {desc}
      </div>
    </div>
  );
}

function HeroLine({ theme, k, v }: { theme: Theme; k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-[10px] uppercase tracking-[0.30em]" style={{ color: theme.muted }}>
        {k}
      </div>
      <div className="text-[12px]" style={{ color: theme.muted }}>
        {v}
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
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
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
                style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
              >
                Close
              </button>
            </div>

            <div
              className="mt-6 rounded-3xl p-5"
              style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
            >
              <div className="text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                {open.body}
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {open.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full" style={{ background: theme.a }} />
                    <span className="text-[13px]" style={{ color: theme.muted }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill theme={theme}>Ownership-first</Pill>
              <Pill theme={theme}>Enterprise constraints</Pill>
              <Pill theme={theme}>Built to last</Pill>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** ---------------- ENGAGE CARDS ---------------- */

function OfferCard({
  theme,
  title,
  price,
  body,
  bullets,
  badge,
}: {
  theme: Theme;
  title: string;
  price: string;
  body: string;
  bullets: string[];
  badge: string;
}) {
  return (
    <div className="rounded-[28px] p-6" style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
            {badge}
          </div>
          <div className="mt-3 text-[15px] font-semibold">{title}</div>
          <div className="mt-2 text-[12px]" style={{ color: theme.muted }}>
            {price}
          </div>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ color: theme.b, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
        >
          →
        </span>
      </div>

      <div className="mt-4 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
        {body}
      </div>

      <div className="mt-5 space-y-2">
        {bullets.map((x) => (
          <div key={x} className="flex items-start gap-2">
            <span className="mt-2 h-2 w-2 rounded-full" style={{ background: theme.c }} />
            <span className="text-[13px]" style={{ color: theme.muted }}>
              {x}
            </span>
          </div>
        ))}
      </div>
    </div>
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
        background: "rgba(255,255,255,0.55)",
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
        background: "rgba(255,255,255,0.55)",
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
  const SAFE_PAD = 22;

  const safeRX = Math.max(140, size.w / 2 - NODE_W - SAFE_PAD);
  const safeRY = Math.max(120, size.h / 2 - NODE_H - SAFE_PAD);

  // Tiers (designed)
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
    const count = 90;
    return Array.from({ length: count }).map((_, i) => {
      const x = (Math.sin(i * 999) * 0.5 + 0.5) * size.w;
      const y = (Math.cos(i * 777) * 0.5 + 0.5) * size.h;
      const r = 0.7 + ((i * 13) % 12) * 0.08;
      const o = 0.14 + ((i * 17) % 10) * 0.03;
      return { x, y, r, o };
    });
  }, [size.w, size.h]);

  // Compute nodes
  const nodes = useMemo(() => {
    const now = Date.now() / 1000;
    const breatheK = 1 + breath * 0.05;

    // Ellipse factor uses width more
    const ex = 1.12;
    const ey = 0.78;

    const rings = [
      { r: 0.42, drift: 4.5 },
      { r: 0.64, drift: 6.5 },
      { r: 0.86, drift: 8.0 },
    ];

    const all = tiers.flatMap((tier) => {
      const ring = rings[tier.t] ?? rings[2];
      const n = Math.max(tier.labels.length, 1);

      return tier.labels.map((label, i) => {
        const a = (i / n) * Math.PI * 2 + tier.t * 0.72 + 0.4;

        // Safe ellipse radii (cannot exceed container bounds)
        const rx = safeRX * ring.r * breatheK * ex;
        const ry = safeRY * ring.r * breatheK * ey;

        // Base position guaranteed inside
        const baseX = center.x + Math.cos(a) * rx;
        const baseY = center.y + Math.sin(a) * ry;

        // Subtle drift
        const drift = reduceMotion ? 0 : ring.drift;
        const dx = reduceMotion ? 0 : Math.sin(now * 0.65 + i * 0.9 + tier.t) * drift;
        const dy = reduceMotion ? 0 : Math.cos(now * 0.55 + i * 0.8 + tier.t) * drift;

        return {
          label,
          tier: tier.t,
          x: baseX + dx,
          y: baseY + dy,
        };
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

  // constellation edges (nearest links)
  const edges = useMemo(() => {
    const pts = nodes;
    const maxDist = Math.min(size.w, size.h) * 0.30;
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
      style={{ border: `1px solid ${theme.border}`, background: theme.card }}
    >
      {/* ambient in-card */}
      <div
        className="absolute -inset-24 opacity-55 blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 18% 20%, ${theme.a}22, transparent 55%),
            radial-gradient(circle at 86% 26%, ${theme.b}18, transparent 58%),
            radial-gradient(circle at 56% 88%, ${theme.c}14, transparent 62%)
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

      {/* svg layer */}
      <svg className="pointer-events-none absolute inset-0" width={size.w} height={size.h}>
        {/* orbit rings */}
        {[0.42, 0.64, 0.86].map((r, i) => (
          <motion.ellipse
            key={i}
            cx={center.x}
            cy={center.y}
            rx={safeRX * r * 1.12}
            ry={safeRY * r * 0.78}
            fill="none"
            stroke="rgba(0,0,0,0.10)"
            strokeDasharray="4 7"
            animate={reduceMotion ? {} : { opacity: [0.85, 0.45, 0.85], strokeDashoffset: [0, 60] }}
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { duration: 10 + i * 3, repeat: Infinity, ease: "linear" }
            }
          />
        ))}

        {/* edges */}
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke={`rgba(0,0,0,${0.05 + e.w * 0.11})`}
            strokeWidth={1}
          />
        ))}

        {/* hover beam */}
        <AnimatePresence>
          {beamPath && hoveredNode && (
            <>
              <motion.path
                d={beamPath}
                fill="none"
                stroke={`rgba(0,0,0,0.10)`}
                strokeWidth={9}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ filter: "blur(7px)" }}
              />
              <motion.path
                d={beamPath}
                fill="none"
                stroke={`url(#beamGrad)`}
                strokeWidth={2.3}
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
              <motion.circle
                cx={hoveredNode.x}
                cy={hoveredNode.y}
                r={18}
                fill="none"
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={8}
                style={{ filter: "blur(7px)" }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
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
            <stop offset="0%" stopColor={theme.a} stopOpacity="0.60" />
            <stop offset="55%" stopColor={theme.b} stopOpacity="0.70" />
            <stop offset="100%" stopColor={theme.c} stopOpacity="0.60" />
          </linearGradient>
        </defs>
      </svg>

      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="rounded-[26px] px-6 py-5 text-center"
          style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}
        >
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
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
            style={{
              border: `1px solid ${theme.border}`,
              background: "rgba(255,255,255,0.74)",
              color: theme.muted,
            }}
          >
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full"
              style={{
                background: n.tier === 0 ? theme.a : n.tier === 1 ? theme.b : theme.c,
              }}
            />
            {n.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
