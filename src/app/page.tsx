"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/** --------- MAIN --------- */

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const [t, setT] = useState(0);
  const theme = THEMES[t % THEMES.length];

  // subtle cursor glow (not a “feature”, just polish)
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
    const ids = ["top", "what", "ecosystem", "offers", "contact"];
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

  // modal for “capabilities”
  const [open, setOpen] = useState<null | Capability>(null);

  const capabilities: Capability[] = useMemo(
    () => [
      {
        title: "Automation Systems",
        subtitle: "End-to-end capability, not a demo.",
        body: "We design and ship automation that behaves like real software: measurable, maintainable, and owned by your team over time.",
        bullets: ["Production-grade build", "Clear control & observability", "Integrates into your tools"],
        tag: "Core",
      },
      {
        title: "Enterprise Governance",
        subtitle: "Built for serious constraints.",
        body: "Security posture, boundaries, approvals, auditability. We design for the reality of enterprise environments from day one.",
        bullets: ["Policy-aligned behavior", "Audit trail mindset", "Scoped permissions"],
        tag: "Trust",
      },
      {
        title: "Integration Engineering",
        subtitle: "Where work already lives.",
        body: "M365, Slack, email, CRMs, service desks, internal APIs. We don’t force new tools—your stack stays the interface.",
        bullets: ["M365 / Slack / Email", "CRM + service desk", "Internal API connectors"],
        tag: "Stack",
      },
      {
        title: "Enablement",
        subtitle: "Your team can learn it too.",
        body: "If you want in-house capability: we can run workshops and build alongside your team—so you’re not dependent on us.",
        bullets: ["Copilot Studio / M365 agents", "Workshops + templates", "Best-practice governance"],
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
    <main
      style={{ background: theme.bg, color: theme.ink }}
      className="min-h-screen"
    >
      {/* cursor ambient */}
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
            background: `radial-gradient(circle at 30% 30%, ${theme.a}22, transparent 60%),
                         radial-gradient(circle at 70% 40%, ${theme.b}22, transparent 60%),
                         radial-gradient(circle at 50% 80%, ${theme.c}16, transparent 62%)`,
          }}
        />
      </div>

      {/* Top nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: `${theme.bg}cc`, borderBottom: `1px solid ${theme.border}` }}
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
                AI automation studio
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavBtn theme={theme} active={active === "what"} onClick={() => scrollToId("what")}>
              What
            </NavBtn>
            <NavBtn theme={theme} active={active === "ecosystem"} onClick={() => scrollToId("ecosystem")}>
              Ecosystem
            </NavBtn>
            <NavBtn theme={theme} active={active === "offers"} onClick={() => scrollToId("offers")}>
              Offers
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
              style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
            >
              Theme
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

      {/* HERO — “poster” layout */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div
            className="relative overflow-hidden rounded-[36px] p-7 md:p-10"
            style={{ border: `1px solid ${theme.border}`, background: theme.card }}
          >
            {/* top-right stamp */}
            <div
              className="absolute right-6 top-6 hidden md:flex items-center gap-2 rounded-full px-3 py-2"
              style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.6)" }}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: theme.b }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
                Studio build
              </span>
            </div>

            {/* big type */}
            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.75, ease: [0.2, 1, 0.2, 1] }}
              className="text-[clamp(2.8rem,6.0vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
            >
              Automation, built like{" "}
              <span style={{ color: theme.a }}>a product</span>.
            </motion.h1>

            <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr,0.95fr] md:items-end">
              <div>
                <p className="max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>
                  REZIIIX designs and ships automation systems for businesses that want quality, control,
                  and long-term ownership — not just experiments.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToId("contact")}
                    className="rounded-2xl px-6 py-3 text-sm font-semibold text-white transition"
                    style={{ background: theme.a }}
                  >
                    Talk to REZIIIX
                  </button>
                  <button
                    onClick={() => scrollToId("what")}
                    className="rounded-2xl px-6 py-3 text-sm transition"
                    style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)", color: theme.ink }}
                  >
                    See what we build
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Pill theme={theme}>Enterprise-friendly</Pill>
                  <Pill theme={theme}>Integration-first</Pill>
                  <Pill theme={theme}>Governance-minded</Pill>
                  <Pill theme={theme}>Workshops available</Pill>
                </div>
              </div>

              {/* right: visual “brand block” (no workflow UI) */}
              <div
                className="relative overflow-hidden rounded-[28px] p-5"
                style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.62)" }}
              >
                <div
                  className="absolute -inset-16 opacity-60 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at 20% 15%, ${theme.a}35, transparent 55%),
                                 radial-gradient(circle at 80% 25%, ${theme.b}30, transparent 55%),
                                 radial-gradient(circle at 45% 90%, ${theme.c}22, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                    In one line
                  </div>
                  <div className="mt-3 text-[16px] font-semibold leading-snug">
                    You own an AI factory inside your company.
                  </div>
                  <div className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>
                    We build the capability. You keep the control.
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <MiniStat theme={theme} k="Build" v="Systems" />
                    <MiniStat theme={theme} k="Style" v="Calm" />
                    <MiniStat theme={theme} k="Fit" v="SME → Enterprise" />
                    <MiniStat theme={theme} k="Output" v="Production" />
                  </div>
                </div>
              </div>
            </div>

            {/* bottom stripe */}
            <div className="mt-9 flex items-center justify-between gap-4 border-t pt-5"
                 style={{ borderColor: theme.border, color: theme.muted }}>
              <span className="text-[11px] uppercase tracking-[0.28em]">REZIIIX</span>
              <span className="text-[11px] uppercase tracking-[0.28em]">Automation studio</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT — bento capabilities (opens modal) */}
      <section id="what" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                What we build
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Capabilities you can{" "}
                <span style={{ color: theme.b }}>deploy</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Click any tile. This is not a platform UI — it’s a portfolio of what REZIIIX ships.
              </p>

              <div className="mt-8 rounded-3xl p-6"
                   style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
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
                      style={{ color: theme.a, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
                    >
                      →
                    </span>
                  </div>

                  <div className="mt-6 h-[10px] w-full rounded-full overflow-hidden"
                       style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all group-hover:w-[88%] w-[62%]"
                      style={{ background: `linear-gradient(90deg, ${theme.a}, ${theme.b})` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM — integration “universe” (no workflow, no steps) */}
      <section id="ecosystem" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Ecosystem
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Built to live in your{" "}
                <span style={{ color: theme.c }}>stack</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                We integrate into the tools you already use. No new “platform adoption” problem.
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

            <IntegrationUniverse theme={theme} items={integrations} />
          </div>
        </div>
      </section>

      {/* OFFERS — business clear */}
      <section id="offers" className="border-t" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.muted }}>
                Offers
              </div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.0vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Choose how you want to{" "}
                <span style={{ color: theme.a }}>engage</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Clear packages. No platform fluff.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <OfferCard
                theme={theme}
                title="Pilot Build"
                price="Best start"
                body="One focused automation system shipped into your environment."
                bullets={["Fast scope", "Production-quality", "Measurable outcome"]}
                badge="Popular"
              />
              <OfferCard
                theme={theme}
                title="Scale Program"
                price="For teams"
                body="Multiple systems + stronger integrations + operating rhythm."
                bullets={["Reusable patterns", "Monitoring mindset", "Team rollout support"]}
                badge="Scale"
              />
              <OfferCard
                theme={theme}
                title="Workshop"
                price="Enablement"
                body="Teach your team how to build safely (Copilot Studio / M365)."
                bullets={["Hands-on", "Templates", "Governance included"]}
                badge="Optional"
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
                Tell us what you want to{" "}
                <span style={{ color: theme.b }}>improve</span>.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: theme.muted }}>
                Email is enough. We’ll respond with a concrete plan.
              </p>

              <div className="mt-8 rounded-3xl p-6"
                   style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
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
                    style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}
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

            <div className="rounded-[30px] p-7"
                 style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
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

              <div className="mt-7 flex items-center justify-between rounded-2xl px-4 py-3"
                   style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}>
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  REZIIIX
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.a }}>
                  Studio build
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

/** --------- COMPONENTS --------- */

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
      style={{
        color: active ? theme.ink : theme.muted,
      }}
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
      style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)", color: theme.muted }}
    >
      {children}
    </span>
  );
}

function MiniStat({ theme, k, v }: { theme: Theme; k: string; v: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}>
      <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
        {k}
      </div>
      <div className="mt-2 text-[13px] font-semibold" style={{ color: theme.ink }}>
        {v}
      </div>
    </div>
  );
}

type Capability = {
  title: string;
  subtitle: string;
  body: string;
  bullets: string[];
  tag: string;
};

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

            <div className="mt-6 rounded-3xl p-5"
                 style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.55)" }}>
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
              <Pill theme={theme}>High-quality UX</Pill>
              <Pill theme={theme}>Practical builds</Pill>
              <Pill theme={theme}>Enterprise constraints</Pill>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
    <div className="rounded-[28px] p-6"
         style={{ border: `1px solid ${theme.border}`, background: theme.card }}>
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

/** --------- Integration Universe (visual, not a process) --------- */

function IntegrationUniverse({ theme, items }: { theme: Theme; items: string[] }) {
  const reduceMotion = useReducedMotion();

  // distribute labels around a circle + small drift animation
  const positions = useMemo(() => {
    const n = items.length;
    return items.map((_, i) => {
      const angle = (i / n) * Math.PI * 2;
      const r = 165 + (i % 3) * 22;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        d: 5 + (i % 5),
        delay: (i % 7) * 0.12,
      };
    });
  }, [items]);

  return (
    <div
      className="relative h-[440px] md:h-[480px] overflow-hidden rounded-[32px]"
      style={{ border: `1px solid ${theme.border}`, background: theme.card }}
    >
      <div
        className="absolute -inset-24 blur-2xl opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${theme.a}28, transparent 55%),
                       radial-gradient(circle at 70% 30%, ${theme.b}24, transparent 55%),
                       radial-gradient(circle at 55% 85%, ${theme.c}18, transparent 62%)`,
        }}
      />

      {/* center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="grid place-items-center rounded-[26px] px-6 py-5"
          style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.62)" }}
        >
          <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: theme.muted }}>
            REZIIIX
          </div>
          <div className="mt-2 text-[15px] font-semibold">Integrates into</div>
          <div className="mt-1 text-[13px]" style={{ color: theme.muted }}>
            your existing tools
          </div>
        </div>
      </div>

      {/* orbit rings */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `1px dashed ${theme.border}` }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `1px dashed ${theme.border}` }}
        />
      </div>

      {/* nodes */}
      {items.map((label, i) => {
        const p = positions[i];
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2"
            initial={false}
            animate={
              reduceMotion
                ? { x: p.x, y: p.y }
                : { x: [p.x - p.d, p.x + p.d, p.x - p.d], y: [p.y + p.d, p.y - p.d, p.y + p.d] }
            }
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { duration: 6 + (i % 6), repeat: Infinity, ease: "easeInOut", delay: p.delay }
            }
          >
            <div
              className="whitespace-nowrap rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em]"
              style={{ border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.62)", color: theme.muted }}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: i % 3 === 0 ? theme.a : i % 3 === 1 ? theme.b : theme.c }} />
              {label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
