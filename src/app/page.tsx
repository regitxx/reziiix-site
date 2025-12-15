"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const FIELDS = [
  { k: "RAG", d: "Grounded retrieval systems." },
  { k: "Knowledge Graphs", d: "Structured memory & truth." },
  { k: "Agent Automations", d: "Actions in real tools." },
  { k: "Robot cognition", d: "Brains, not demos." },
];

export default function Page() {
  const reduceMotion = useReducedMotion();

  // cursor for “mist”
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

  // scroll-driven “cold reveal”
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -32]);
  const titleO = useTransform(scrollYProgress, [0, 0.65], [1, 0.58]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.92]);
  const bottleGlow = useTransform(scrollYProgress, [0, 1], [0.9, 0.55]);

  // random micro “stars”
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const x = (Math.sin(i * 999) * 0.5 + 0.5) * 100;
      const y = (Math.cos(i * 777) * 0.5 + 0.5) * 100;
      const s = 0.6 + ((i * 13) % 12) * 0.08;
      const o = 0.08 + ((i * 17) % 10) * 0.02;
      return { x, y, s, o };
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-neutral-100">
      {/* Ambient background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* base cold gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 800px at 60% 15%, rgba(56,189,248,0.14), transparent 55%),
              radial-gradient(900px 700px at 18% 78%, rgba(168,85,247,0.12), transparent 60%),
              radial-gradient(1000px 820px at 88% 82%, rgba(255,255,255,0.06), transparent 60%),
              #000000
            `,
          }}
        />

        {/* subtle grain */}
        <div className="absolute inset-0 opacity-[0.10] reziiix-grain" />

        {/* stars */}
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.s}px`,
                height: `${s.s}px`,
                opacity: s.o,
                background: "rgba(255,255,255,0.75)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* cursor mist */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 520,
            height: 520,
            left: 0,
            top: 0,
            opacity: cursor.on ? 1 : 0,
            x: cursor.x - 260,
            y: cursor.y - 260,
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 62%), radial-gradient(circle at 65% 45%, rgba(56,189,248,0.16), transparent 62%), radial-gradient(circle at 50% 75%, rgba(168,85,247,0.10), transparent 65%)",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.7 }}
        />
      </div>

      {/* Minimal top strip (not a nav) */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
            <div className="grid h-full w-full place-items-center text-[11px] font-semibold tracking-[0.35em] text-white/90">
              R
            </div>
          </div>
          <div className="leading-none">
            <div className="text-[11px] uppercase tracking-[0.40em] text-white/90">REZIIIX</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/45">
              cold systems / real world
            </div>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "#contact")}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-semibold text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:bg-white/10"
        >
          Enter
        </button>
      </header>

      {/* HERO: the “perfume bottle” sculpture */}
      <section ref={heroRef} className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-4 md:grid-cols-[1.1fr,0.9fr] md:items-center md:pt-10">
          {/* Left text: BIG, readable, minimal */}
          <div>
            <motion.div style={{ y: titleY, opacity: titleO }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.32em] text-white/65">
                <span className="h-2 w-2 rounded-full bg-sky-300/80" />
                private build studio
              </div>

              <h1 className="mt-6 text-[clamp(2.9rem,6.2vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                The brain.
                <br />
                The rules.
                <br />
                The control.
              </h1>

              <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.2vw,1.25rem)] leading-relaxed text-white/70">
                REZIIIX builds <span className="text-white/90">cold, reliable</span> intelligence systems —
                grounded retrieval, knowledge graphs, and agent automations — shipped into real environments.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="rounded-2xl bg-white px-6 py-3 text-[14px] font-semibold text-black shadow-[0_20px_60px_rgba(255,255,255,0.10)] hover:bg-white/90"
                >
                  Get it built
                </a>
                <a
                  href="#fields"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:bg-white/10"
                >
                  What we touch
                </a>
              </div>
            </motion.div>

            {/* “Fields” strip — minimal */}
            <div id="fields" className="mt-10 grid gap-3 md:grid-cols-2">
              {FIELDS.map((f) => (
                <div
                  key={f.k}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                >
                  <div className="text-[12px] uppercase tracking-[0.32em] text-white/55">{f.k}</div>
                  <div className="mt-2 text-[15px] leading-relaxed text-white/80">{f.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sculpture */}
          <div className="relative">
            <motion.div style={{ scale: bottleScale, opacity: bottleGlow }}>
              <BottleSculpture />
            </motion.div>

            {/* tiny caption */}
            <div className="mt-6 text-[12px] uppercase tracking-[0.26em] text-white/45">
              engineered to feel inevitable
            </div>
          </div>
        </div>
      </section>

      {/* THE CUT: one mysterious band (no “process”) */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-[1fr,1fr] md:items-center">
            <div>
              <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">The point</div>
              <h2 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                Not “automation”.
                <br />
                <span className="text-white/70">A controlled intelligence layer.</span>
              </h2>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
              <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">Includes</div>
              <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-white/75">
                <div>• Grounded answers (RAG)</div>
                <div>• Structured memory (KG)</div>
                <div>• Agents with rules + approvals</div>
                <div>• Integrations into your tools</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF — minimal: one line + link */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-[34px] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
            <div className="grid gap-7 md:grid-cols-[1.1fr,0.9fr] md:items-center">
              <div>
                <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">Ongoing</div>
                <div className="mt-4 text-[clamp(1.4rem,2.4vw,2.0rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                  Research-backed work in advanced social robotics.
                </div>
                <div className="mt-3 text-[16px] leading-relaxed text-white/70">
                  Building the brain of the robot: retrieval, knowledge graphs, and agent automation.
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://www.polyu.edu.hk/sd/research/research-centres-and-labs/research-lab-for-advanced-social-robotics/?sc_lang=en"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white px-6 py-3 text-[14px] font-semibold text-black hover:bg-white/90"
                >
                  View lab → PolyU
                </a>
                <div className="text-[12px] uppercase tracking-[0.28em] text-white/45">
                  proof without noise
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — single action */}
      <section id="contact" className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-start">
            <div>
              <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">Contact</div>
              <h3 className="mt-5 text-[clamp(2.0rem,4.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                If you want it cold and correct —
                <br />
                email us.
              </h3>
              <div className="mt-6 text-[18px] font-semibold text-white/90">hello@reziiix.com</div>
              <div className="mt-3 max-w-md text-[16px] leading-relaxed text-white/65">
                Just send: what you want, where it lives, and what “done” means.
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-white px-6 py-3 text-[14px] font-semibold text-black hover:bg-white/90"
                  onClick={() => {
                    const subject = encodeURIComponent("REZIIIX — build request");
                    const body = encodeURIComponent(
                      `Hi REZIIIX,\n\nGoal:\nTools:\nConstraints:\nTimeline:\n\nThanks.`
                    );
                    window.location.href = `mailto:hello@reziiix.com?subject=${subject}&body=${body}`;
                  }}
                >
                  Email template
                </button>
                <button
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] text-white/85 hover:bg-white/10"
                  onClick={() => scrollToId("top")}
                >
                  Back to top
                </button>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
              <div className="text-[12px] uppercase tracking-[0.34em] text-white/55">Send fast</div>
              <div className="mt-4 space-y-3">
                <Input placeholder="Name" />
                <Input placeholder="Work email" />
                <Textarea placeholder="What do you want built?" />
                <button className="w-full rounded-2xl bg-white px-6 py-3 text-[14px] font-semibold text-black hover:bg-white/90">
                  Send (static)
                </button>
                <div className="text-[12px] uppercase tracking-[0.26em] text-white/45">
                  can wire to CRM later
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center text-[11px] uppercase tracking-[0.30em] text-white/35">
            © {new Date().getFullYear()} REZIIIX
          </div>
        </div>
      </section>
    </main>
  );
}

/** ---------------- Sculpture ---------------- */

function BottleSculpture() {
  // this is “perfume bottle + mist + caustics” done with CSS only
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
      {/* halo rings */}
      <div className="absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-70" />
      <div className="absolute left-1/2 top-[52%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-40" />

      {/* mist cone */}
      <div className="absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2">
        <div className="reziiix-mist absolute inset-0" />
      </div>

      {/* “bottle” core */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[290px] w-[190px] rounded-[40px] border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_50px_120px_rgba(56,189,248,0.10)] backdrop-blur-2xl">
          {/* bottle cap */}
          <div className="absolute left-1/2 top-[-34px] h-[54px] w-[110px] -translate-x-1/2 rounded-[18px] border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]" />
          {/* inner caustics */}
          <div className="reziiix-caustics absolute inset-0 rounded-[40px] opacity-80" />
          {/* vertical highlight */}
          <div className="absolute left-[18px] top-[20px] h-[230px] w-[18px] rounded-full bg-white/10 blur-[1px]" />
          {/* label */}
          <div className="absolute bottom-[26px] left-1/2 w-[78%] -translate-x-1/2 rounded-[18px] border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
            <div className="text-center text-[11px] uppercase tracking-[0.44em] text-white/80">REZIIIX</div>
            <div className="mt-1 text-center text-[12px] font-semibold text-white/90">cold intelligence</div>
          </div>
        </div>
      </div>

      {/* bottom light pool */}
      <div className="absolute left-1/2 top-[86%] h-[220px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
           style={{
             background:
               "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.14), transparent 65%), radial-gradient(circle at 40% 60%, rgba(56,189,248,0.16), transparent 68%), radial-gradient(circle at 60% 65%, rgba(168,85,247,0.08), transparent 72%)",
           }} />
    </div>
  );
}

/** ---------------- Inputs ---------------- */

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-white/90 outline-none placeholder:text-white/35"
    />
  );
}

function Textarea({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      placeholder={placeholder}
      className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-white/90 outline-none placeholder:text-white/35"
    />
  );
}
