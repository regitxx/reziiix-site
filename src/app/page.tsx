"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/** ---------- PAGE ---------- */

export default function HomePage() {
  const reduce = useReducedMotion();

  // subtle cursor “cold glow”
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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Ambient cursor glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]">
        <motion.div
          className="absolute h-[520px] w-[520px] rounded-full blur-3xl"
          animate={{
            opacity: cursor.on ? 1 : 0,
            x: cursor.x - 260,
            y: cursor.y - 260,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.6 }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(180,220,255,0.20), transparent 60%)," +
              "radial-gradient(circle at 70% 30%, rgba(120,170,255,0.14), transparent 58%)," +
              "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08), transparent 62%)",
          }}
        />
      </div>

      {/* Grain overlay (expensive glue) */}
      <Grain />

      {/* Top bar */}
      <TopBar />

      {/* CHAPTER 01 */}
      <Chapter
        id="top"
        videoSrc="/star.mp4"
        eyebrow="REZIIIX"
        title={
          <>
            You don’t buy automation.
            <br />
            You build an internal capability.
          </>
        }
        sub={
          <>
            Cold, governed systems that live inside your company.
            <br />
            Not a dashboard. Not a demo. A real capability.
          </>
        }
        left={[
          { k: "Mode", v: "Build + integrate + ship" },
          { k: "Interface", v: "Your tools stay the UI" },
          { k: "Style", v: "Quiet. Controlled. Durable." },
        ]}
        ctas={[
          { label: "Start a build", onClick: () => scrollToId("contact"), primary: true },
          { label: "See the fields", onClick: () => scrollToId("fields") },
        ]}
        reduceMotion={!!reduce}
      />

      {/* CHAPTER 02 */}
      <Chapter
        id="fields"
        videoSrc="/sphere.mp4"
        eyebrow="FIELDS"
        title={
          <>
            Agent systems.
            <br />
            Knowledge systems.
            <br />
            Governance.
          </>
        }
        sub={
          <>
            We don’t try to look like software.
            <br />
            We ship systems that behave like infrastructure.
          </>
        }
        featureGrid={[
          {
            title: "Agent automation",
            body: "Execution inside boundaries. Human override when needed.",
          },
          {
            title: "RAG + Knowledge Graphs",
            body: "Retrieval that stays grounded. Built for real internal data.",
          },
          {
            title: "Enterprise governance",
            body: "Approvals, audit trails, scoped permissions from day one.",
          },
          {
            title: "Microsoft-native",
            body: "Copilot Studio / M365 agents when that’s the right interface.",
          },
        ]}
        proof={[
          {
            label: "In discussion",
            value: "Novartis (dedicated build)",
          },
          {
            label: "Ongoing research",
            value: "PolyU • Advanced Social Robotics lab",
            href:
              "https://www.polyu.edu.hk/sd/research/research-centres-and-labs/research-lab-for-advanced-social-robotics/?sc_lang=en",
          },
        ]}
        ctas={[
          { label: "How we work", onClick: () => scrollToId("engage"), primary: true },
          { label: "Contact", onClick: () => scrollToId("contact") },
        ]}
        reduceMotion={!!reduce}
      />

      {/* CHAPTER 03 */}
      <Chapter
        id="engage"
        videoSrc="/human.mp4"
        eyebrow="ENGAGE"
        title={
          <>
            Two paths.
            <br />
            Same outcome: ownership.
          </>
        }
        sub={
          <>
            Either we build it for you, or we build it with you (enablement included).
            <br />
            You end up owning the capability.
          </>
        }
        splitCards={[
          {
            title: "Build for you",
            bullets: [
              "One focused system shipped into your environment",
              "Integration + guardrails + reliability",
              "Best when you want outcomes fast",
            ],
            accent: "from-white/85 to-white/30",
          },
          {
            title: "Build with you",
            bullets: [
              "Copilot Studio / M365 agent development",
              "Workshop + templates + governance patterns",
              "Best when you want internal builders",
            ],
            accent: "from-sky-200/70 to-white/20",
          },
        ]}
        ctas={[
          { label: "Start", onClick: () => scrollToId("contact"), primary: true },
          { label: "Back to top", onClick: () => scrollToId("top") },
        ]}
        reduceMotion={!!reduce}
      />

      {/* CONTACT (clean, no “form app”) */}
      <section id="contact" className="relative border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-start">
            <div>
              <div className="text-[12px] uppercase tracking-[0.38em] text-white/55">
                Contact
              </div>

              <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                If you want the capability
                <br />
                inside your company —
                <br />
                email us.
              </h2>

              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/65">
                Keep it short. You can be messy. We’ll make it precise.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@reziiix.com?subject=REZIIIX%20%E2%80%94%20build&body=Goal%3A%0ATools%20involved%3A%0AConstraints%20(security%2Fcompliance)%3A%0ASuccess%20metric%3A%0A%0A"
                  className="rounded-2xl bg-white px-6 py-3 text-[14px] font-semibold text-black hover:bg-white/90"
                >
                  Open email template
                </a>

                <button
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] text-white/85 hover:bg-white/10"
                  onClick={() => scrollToId("top")}
                >
                  Back to top
                </button>
              </div>

              <div className="mt-10 text-[12px] text-white/50">
                © {new Date().getFullYear()} REZIIIX
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[12px] uppercase tracking-[0.32em] text-white/55">
                Quick prompt
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-white/70">
{`Goal:
Where the work lives (tools):
Constraints (security/compliance):
What “good” looks like:`}
                </pre>
              </div>

              <div className="mt-5 text-[12px] text-white/55">
                If you don’t know details, just send the messy version.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/** ---------- COMPONENTS ---------- */

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          className="flex items-center gap-3"
          onClick={() => scrollToId("top")}
        >
          <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
          <div className="leading-none text-left">
            <div className="text-[11px] uppercase tracking-[0.42em] text-white/85">
              REZIIIX
            </div>
            <div className="mt-1 text-[11px] text-white/45">
              internal automation systems
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink onClick={() => scrollToId("fields")}>Fields</NavLink>
          <NavLink onClick={() => scrollToId("engage")}>Engage</NavLink>
          <NavLink onClick={() => scrollToId("contact")}>Contact</NavLink>
        </nav>

        <button
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-semibold text-white/90 hover:bg-white/10"
          onClick={() => scrollToId("contact")}
        >
          Start
        </button>
      </div>
    </header>
  );
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      className="rounded-full px-3 py-2 text-[12px] text-white/70 hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type ChapterProps = {
  id: string;
  videoSrc: string;
  eyebrow: string;
  title: React.ReactNode;
  sub: React.ReactNode;
  left?: Array<{ k: string; v: string }>;
  ctas: Array<{ label: string; onClick: () => void; primary?: boolean }>;
  featureGrid?: Array<{ title: string; body: string }>;
  proof?: Array<{ label: string; value: string; href?: string }>;
  splitCards?: Array<{ title: string; bullets: string[]; accent: string }>;
  reduceMotion: boolean;
};

function Chapter({
  id,
  videoSrc,
  eyebrow,
  title,
  sub,
  left,
  ctas,
  featureGrid,
  proof,
  splitCards,
  reduceMotion,
}: ChapterProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <section id={id} className="relative min-h-[92vh] border-b border-white/10">
      {/* Video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className={cx(
            "h-full w-full object-cover",
            ready ? "opacity-100" : "opacity-0",
            "transition-opacity duration-700"
          )}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* fallback if codec fails */}
        {failed && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,220,255,0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.10),transparent_60%)]" />
        )}

        {/* cold vignette + contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

        {/* bottom-left mask to hide watermark/tag */}
        <div className="absolute bottom-0 left-0 h-40 w-[420px] bg-gradient-to-tr from-black/95 via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-start">
          <div>
            <div className="text-[12px] uppercase tracking-[0.42em] text-white/55">
              {eyebrow}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: [0.2, 1, 0.2, 1] }}
              className="mt-5 text-[clamp(2.4rem,5.3vw,5.0rem)] font-semibold leading-[0.93] tracking-[-0.05em]"
            >
              {title}
            </motion.h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
              {sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {ctas.map((c) => (
                <button
                  key={c.label}
                  onClick={c.onClick}
                  className={cx(
                    "rounded-2xl px-6 py-3 text-[14px] font-semibold transition",
                    c.primary
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {left && (
              <div className="mt-10 grid gap-3 md:grid-cols-3">
                {left.map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="text-[11px] uppercase tracking-[0.34em] text-white/50">
                      {x.k}
                    </div>
                    <div className="mt-2 text-[14px] text-white/75">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel changes per chapter */}
          <div className="space-y-4">
            {featureGrid && (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">
                  Core
                </div>
                <div className="mt-5 grid gap-4">
                  {featureGrid.map((f) => (
                    <div key={f.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="text-[15px] font-semibold text-white/90">
                        {f.title}
                      </div>
                      <div className="mt-2 text-[14px] leading-relaxed text-white/65">
                        {f.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {proof && (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">
                  Proof
                </div>
                <div className="mt-5 space-y-3">
                  {proof.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4"
                    >
                      <div className="text-[11px] uppercase tracking-[0.34em] text-white/50">
                        {p.label}
                      </div>
                      {p.href ? (
                        <a
                          className="mt-2 block text-[15px] font-semibold text-white/90 hover:underline"
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.value}
                        </a>
                      ) : (
                        <div className="mt-2 text-[15px] font-semibold text-white/90">
                          {p.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {splitCards && (
              <div className="grid gap-4">
                {splitCards.map((c) => (
                  <div
                    key={c.title}
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-16 opacity-35 blur-3xl"
                      style={{
                        background: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 70% 40%, rgba(160,210,255,0.28), transparent 58%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="text-[16px] font-semibold text-white/90">
                        {c.title}
                      </div>
                      <div className="mt-4 space-y-2">
                        {c.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-2 text-[14px] text-white/70">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!featureGrid && !proof && !splitCards && (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">
                  Signal
                </div>
                <div className="mt-4 text-[15px] leading-relaxed text-white/70">
                  Built to feel inevitable.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[3] opacity-[0.14]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        backgroundSize: "160px 160px",
        mixBlendMode: "overlay",
      }}
    />
  );
}
