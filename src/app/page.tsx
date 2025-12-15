"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * REZIIIX — "cold / mysterious / perfume" site
 * - Built around 3 background videos
 * - Minimal copy, premium art-direction
 * - Tag hiding: safe-crop zoom + bottom fog mask
 *
 * Required files:
 *  public/video/reziiix-01.mp4
 *  public/video/reziiix-02.mp4
 *  public/video/reziiix-03.mp4
 */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 86;
  window.scrollTo({ top: y, behavior: "smooth" });
}

type Chapter = {
  id: string;
  label: string;
  video: string;
  tint: "ice" | "ink" | "aurora";
};

const CHAPTERS: Chapter[] = [
  { id: "top", label: "REZIIIX", video: "reziiix-site/public/sphere.mp4", tint: "ice" },
  { id: "signal", label: "Signal", video: "reziiix-site/public/star.mp4", tint: "aurora" },
  { id: "contact", label: "Contact", video: "reziiix-site/public/human.mp4", tint: "ink" },
];

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  // Active chapter highlight
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const ids = ["top", "fields", "signal", "offers", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.id && setActive(e.target.id)),
      { threshold: 0.55 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Tiny ambient cursor light (VERY subtle)
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

  // Scroll progress line (thin, classy)
  const { scrollYProgress: pageProgress } = useScroll();
  const scaleX = useTransform(pageProgress, [0, 1], [0, 1]);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Top progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-white/60 via-sky-200/60 to-white/60"
        style={{ scaleX }}
      />

      {/* Ultra-subtle cursor glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]">
        <motion.div
          animate={{
            opacity: cursor.on ? 1 : 0,
            x: cursor.x - 240,
            y: cursor.y - 240,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 32, mass: 0.55 }}
          className="absolute h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(circle at 70% 45%, rgba(56,189,248,0.08), transparent 62%), radial-gradient(circle at 50% 85%, rgba(167,139,250,0.06), transparent 65%)",
          }}
        />
      </div>

      {/* Grain layer (makes everything feel expensive) */}
      <Grain />

      {/* NAV (minimal, cold) */}
      <header className="sticky top-0 z-[55] border-b border-white/10 bg-black/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => scrollToId("top")} className="group flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/12 bg-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.28),transparent_58%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(56,189,248,0.18),transparent_60%)]" />
            </div>
            <div className="leading-none text-left">
              <div className="text-[11px] uppercase tracking-[0.42em] text-white/90">REZIIIX</div>
              <div className="mt-1 text-[11px] text-white/50">AI automation studio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink active={active === "fields"} onClick={() => scrollToId("fields")}>
              Fields
            </NavLink>
            <NavLink active={active === "signal"} onClick={() => scrollToId("signal")}>
              Signal
            </NavLink>
            <NavLink active={active === "offers"} onClick={() => scrollToId("offers")}>
              Engage
            </NavLink>
            <NavLink active={active === "contact"} onClick={() => scrollToId("contact")}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToId("contact")}
              className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[12px] text-white/90 hover:bg-white/15"
            >
              Start
            </button>
          </div>
        </div>
      </header>

      {/* HERO — full-screen video perfume vibe */}
      <section id="top" className="relative min-h-[92vh] overflow-hidden">
        <VideoBackdrop
          src="/video/reziiix-01.mp4"
          tint="ice"
          // hide tag: crop + fog
          zoom={1.14}
          fogHeight={140}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.8, ease: [0.2, 1, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[11px] uppercase tracking-[0.34em] text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              calm systems · serious outcomes
            </div>

            <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.90] tracking-[-0.06em] text-white">
              You own an{" "}
              <span className="relative inline-block">
                AI factory
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-2 h-[10px] w-full rounded-full bg-white/35 blur-xl"
                />
              </span>{" "}
              inside your company.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/72">
              REZIIIX builds automation systems that live in your environment — quiet, governed, and built to last.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToId("contact")}
                className="rounded-2xl bg-white px-6 py-3 text-[13px] font-semibold text-black shadow-[0_20px_80px_rgba(255,255,255,0.12)] hover:bg-white/90"
              >
                Talk to REZIIIX
              </button>

              <button
                onClick={() => scrollToId("offers")}
                className="rounded-2xl border border-white/14 bg-black/30 px-6 py-3 text-[13px] text-white/85 backdrop-blur-xl hover:bg-black/45"
              >
                How we engage
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              <Tag>Enterprise-friendly</Tag>
              <Tag>Integration-first</Tag>
              <Tag>Governance-minded</Tag>
              <Tag>Workshops available</Tag>
            </div>
          </motion.div>
        </div>

        {/* bottom “silence” strip */}
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-14 md:pb-14">
          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.30em] text-white/45">
            <span>REZIIIX</span>
            <span className="hidden sm:inline">Singapore · global work</span>
            <span>automation studio</span>
          </div>
        </div>
      </section>

      {/* FIELDS — pure typography, no “SaaS tiles” */}
      <section id="fields" className="relative border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/45">Fields</div>
              <h2 className="mt-6 text-[clamp(2.0rem,4.8vw,3.7rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                Cold capability.
                <br />
                Real-world constraints.
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-white/62">
              We don’t over-explain. If you know, you know — and if you don’t, you’ll feel it in the outcome.
            </p>
          </div>

          <div className="mt-14 border-y border-white/10 py-10">
            <FieldRow label="Agentic automation" desc="Operational systems that execute safely." />
            <FieldRow label="Knowledge systems" desc="RAG + graphs + retrieval you can trust." />
            <FieldRow label="Enterprise governance" desc="Policies, approvals, audit trails." />
            <FieldRow label="Microsoft-native builds" desc="Copilot Studio / M365 agents when needed." />
          </div>

          {/* one-line credibility: keep it elegant */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.34em] text-white/45">Current</span>
            <span className="h-px w-10 bg-white/10" />
            <span className="text-[13px] text-white/70">
              In discussion with an enterprise client (Novartis) for a dedicated build.
            </span>
          </div>
        </div>
      </section>

      {/* SIGNAL — video chapter 2 + research mention (no long explanation) */}
      <section id="signal" className="relative overflow-hidden border-t border-white/10">
        <div className="relative min-h-[78vh]">
          <VideoBackdrop
            src="/video/reziiix-02.mp4"
            tint="aurora"
            zoom={1.16}
            fogHeight={160}
            // this section is “panel-like”
            inset
          />

          <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">Signal</div>
              <h2 className="mt-6 text-[clamp(2.2rem,5.2vw,4.3rem)] font-semibold leading-[0.90] tracking-[-0.06em]">
                Research-grade foundations.
                <br />
                Product-grade outcomes.
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70">
                We’re also involved in ongoing research building the “brain” of a social robot — using RAG, knowledge
                graphs, and agent automation.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.polyu.edu.hk/sd/research/research-centres-and-labs/research-lab-for-advanced-social-robotics/?sc_lang=en"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/14 bg-black/35 px-6 py-3 text-[13px] text-white/85 backdrop-blur-xl hover:bg-black/50"
                >
                  View the lab →
                </a>

                <button
                  onClick={() => scrollToId("offers")}
                  className="rounded-2xl bg-white px-6 py-3 text-[13px] font-semibold text-black hover:bg-white/90"
                >
                  Build with REZIIIX
                </button>
              </div>

              {/* tiny “mystery” line */}
              <div className="mt-12 text-[11px] uppercase tracking-[0.34em] text-white/45">
                systems that feel inevitable.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGE — minimal, readable, not “package cards” */}
      <section id="offers" className="relative border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/45">Engage</div>
              <h2 className="mt-6 text-[clamp(2.0rem,4.8vw,3.7rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                Two ways to work.
                <br />
                Zero noise.
              </h2>
            </div>

            <div className="space-y-6">
              <EngageBlock
                title="We build it for you"
                lines={[
                  "A focused automation system shipped into your environment.",
                  "Designed for security posture, approvals, and long-term ownership.",
                ]}
                foot="Best if you want outcomes fast."
              />
              <EngageBlock
                title="We build it with you"
                lines={[
                  "Copilot Studio / M365 agent development + enablement workshop.",
                  "Templates, patterns, and guardrails so your team can continue alone.",
                ]}
                foot="Best if you want internal capability."
              />
            </div>
          </div>

          {/* ultra-minimal “ecosystem” hint without diagrams */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <div className="text-[11px] uppercase tracking-[0.34em] text-white/45">Lives inside</div>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-white/65">
              {["Microsoft 365", "Copilot Studio", "Teams", "Outlook", "SharePoint", "Slack", "CRM", "Service desk", "Internal APIs"].map(
                (x) => (
                  <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {x}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — video chapter 3 */}
      <section id="contact" className="relative min-h-[86vh] overflow-hidden border-t border-white/10">
        <VideoBackdrop src="/video/reziiix-03.mp4" tint="ink" zoom={1.16} fogHeight={170} />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">Contact</div>
              <h2 className="mt-6 text-[clamp(2.2rem,5.2vw,4.3rem)] font-semibold leading-[0.90] tracking-[-0.06em]">
                If you want it
                <br />
                internal — talk.
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70">
                Keep it short: what you want to automate, where it lives, and what “good” looks like.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const subject = encodeURIComponent("REZIIIX — inquiry");
                    const body = encodeURIComponent(
                      `Hi REZIIIX,\n\nWe want to improve:\n- Goal:\n- Where the work happens (tools):\n- Constraints (security/compliance):\n- Timeline:\n\nThanks.`
                    );
                    window.location.href = `mailto:admin@reziiix.com?subject=${subject}&body=${body}`;
                  }}
                  className="rounded-2xl bg-white px-6 py-3 text-[13px] font-semibold text-black hover:bg-white/90"
                >
                  Email admin@reziiix.com
                </button>

                <button
                  onClick={() => scrollToId("top")}
                  className="rounded-2xl border border-white/14 bg-black/35 px-6 py-3 text-[13px] text-white/85 backdrop-blur-xl hover:bg-black/50"
                >
                  Back to top
                </button>
              </div>

              <div className="mt-14 text-[11px] uppercase tracking-[0.34em] text-white/45">
                © {new Date().getFullYear()} REZIIIX
              </div>
            </div>

            {/* contact side block — not a “form”, just a calm card */}
            <div className="rounded-[28px] border border-white/12 bg-black/35 p-6 backdrop-blur-2xl">
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">Fast prompt</div>
              <div className="mt-4 text-[15px] font-semibold text-white/90">Copy/paste this:</div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-[12px] leading-relaxed text-white/70">
                <div className="text-white/85">Goal:</div>
                <div className="text-white/55">Tools involved:</div>
                <div className="text-white/55">Risk / approvals:</div>
                <div className="text-white/55">Success metric:</div>
              </div>

              <div className="mt-5 text-[12px] text-white/55">
                If you don’t know the details, send the messy version. We’ll clean it up.
              </div>
            </div>
          </div>
        </div>

        {/* footer fog to hide any tag */}
        <div className="absolute inset-x-0 bottom-0 z-[3] h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </section>
    </main>
  );
}

/* ------------------------- COMPONENTS ------------------------- */

function NavLink({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-3 py-2 text-[12px] transition",
        active ? "text-white" : "text-white/60 hover:text-white/85"
      )}
    >
      <span className="relative">
        {children}
        {active && <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-white/70" />}
      </span>
    </button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/65 backdrop-blur-xl">
      {children}
    </span>
  );
}

function FieldRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="grid gap-3 py-5 md:grid-cols-[1fr,1fr] md:items-baseline">
      <div className="text-[16px] font-semibold tracking-[-0.02em] text-white/90">{label}</div>
      <div className="text-[14px] leading-relaxed text-white/60">{desc}</div>
    </div>
  );
}

function EngageBlock({
  title,
  lines,
  foot,
}: {
  title: string;
  lines: string[];
  foot: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/12 bg-white/5 p-6">
      <div className="text-[14px] font-semibold text-white/90">{title}</div>
      <div className="mt-3 space-y-2 text-[14px] leading-relaxed text-white/65">
        {lines.map((l) => (
          <div key={l} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[12px] uppercase tracking-[0.30em] text-white/40">{foot}</div>
    </div>
  );
}

/**
 * Video backdrop with:
 * - safe crop (zoom)
 * - bottom fog mask (hide watermark/tag)
 * - optional "inset panel" mode (looks like a framed cinematic panel)
 */
function VideoBackdrop({
  src,
  tint,
  zoom = 1.14,
  fogHeight = 150,
  inset = false,
}: {
  src: string;
  tint: "ice" | "ink" | "aurora";
  zoom?: number;
  fogHeight?: number;
  inset?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  const tintLayer = useMemo(() => {
    if (tint === "ink") {
      return "radial-gradient(900px 520px at 65% 15%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(900px 520px at 35% 85%, rgba(56,189,248,0.10), transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.86))";
    }
    if (tint === "aurora") {
      return "radial-gradient(900px 520px at 20% 15%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(900px 520px at 80% 25%, rgba(167,139,250,0.16), transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.52), rgba(0,0,0,0.82))";
    }
    // ice
    return "radial-gradient(900px 520px at 30% 10%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(900px 520px at 80% 20%, rgba(56,189,248,0.14), transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.52), rgba(0,0,0,0.84))";
  }, [tint]);

  return (
    <div
      aria-hidden
      className={cx(
        "absolute inset-0",
        inset && "mx-auto my-10 max-w-6xl px-5 md:my-14"
      )}
    >
      <div
        className={cx(
          "absolute inset-0 overflow-hidden",
          inset ? "rounded-[40px] border border-white/10" : ""
        )}
      >
        {/* video */}
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setReady(true)}
          className="absolute left-1/2 top-1/2 h-full w-full object-cover"
          style={{
            transform: `translate(-50%, -50%) scale(${zoom})`,
            filter: "contrast(1.08) saturate(0.92)",
            opacity: ready ? 1 : 0,
            transition: reduceMotion ? "opacity 0.12s ease" : "opacity 0.6s ease",
          }}
        >
          <source src={src} type="video/mp4" />
        </motion.video>

        {/* fallback if video not ready yet */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 35% 20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(900px 520px at 70% 60%, rgba(56,189,248,0.08), transparent 62%), #000",
          }}
        />

        {/* tint/grade */}
        <div className="absolute inset-0" style={{ background: tintLayer, mixBlendMode: "normal" }} />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.72))]" />

        {/* bottom fog mask: hides watermark/tag */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: fogHeight,
            background: "linear-gradient(to top, rgba(0,0,0,0.96), rgba(0,0,0,0.55), transparent)",
          }}
        />

        {/* top fog to keep text crisp */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 120,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.25), transparent)",
          }}
        />
      </div>
    </div>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.14]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        backgroundSize: "160px 160px",
        mixBlendMode: "overlay",
      }}
    />
  );
}
