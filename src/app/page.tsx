"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  type Variants,
  type MotionProps,
} from "framer-motion";

import TopNav from "@/components/TopNav";
import NeuralGradient from "@/components/NeuralGradient";
import ReziiixScene from "@/components/ReziiixScene";
import ParallaxContainer from "@/components/Parallax";

/* ---------- motion helpers ---------- */

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

const staggerContainer: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ---------- main page ---------- */

export default function HomePage() {
  const { scrollYProgress: pageProgress } = useScroll();
  const progressScaleX = useTransform(pageProgress, [0, 1], [0, 1]);

  // HERO scroll-driven effects
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, -26]);

  const haloScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.92]);
  const haloOpacity = useTransform(scrollYProgress, [0, 1], [0.95, 0.45]);

  return (
    <main className="relative min-h-screen bg-black text-neutral-100">
      {/* ghost 3D scene behind everything */}
      <ReziiixScene />
      {/* neural glow */}
      <NeuralGradient />

      {/* GLOBAL SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400"
        style={{ scaleX: progressScaleX }}
      />

      {/* TOP NAV */}
      <TopNav />

      {/* INTRO SPLASH WITH GHOST REZIIIX */}
      <IntroSplash />

      {/* HERO */}
      <motion.section
        id="top"
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity, y: heroTranslateY }}
        className="relative overflow-hidden border-b border-neutral-900/70"
      >
        {/* halo behind hero */}
        <motion.div
          style={{ scale: haloScale, opacity: haloOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="h-[520px] w-[520px] rounded-[40%] bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.55),transparent_65%)] blur-3xl" />
        </motion.div>

        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),transparent_70%)]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-24 md:flex-row md:items-center md:pb-28 md:pt-28">
          {/* Left copy */}
          <motion.div {...fadeUp(0)} className="max-w-xl space-y-6 md:space-y-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-neutral-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              <span className="uppercase tracking-[0.22em]">
                Focused AI automation studio
              </span>
            </div>

            {/* UPDATED HERO HEADLINE (minimal design change) */}
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              You own{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                an AI factory
              </span>{" "}
              inside your company.
            </h1>

            {/* UPDATED HERO DESCRIPTION */}
            <p className="max-w-md text-sm leading-relaxed text-neutral-200 md:text-[15px]">
              REZIIIX designs and ships production-grade AI agents embedded in your
              existing tools. They automate real workflows, log every decision, and
              hand control back to humans when needed — no black-box SaaS, no lock-in.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(248,250,252,0.14)] transition hover:bg-neutral-200"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Talk to REZIIIX
              </motion.button>
              <button
                onClick={() =>
                  document
                    .getElementById("process")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="rounded-full border border-neutral-600 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-neutral-200 hover:border-neutral-400 hover:text-white"
              >
                See how the system works
              </button>
              <span className="hidden w-px self-stretch bg-neutral-800 md:inline-block" />
              {/* UPDATED LOCATION LINE */}
              <span className="text-[11px] text-neutral-400">
                Remote · working with global teams
              </span>
            </div>
          </motion.div>

          {/* Right: Live agent console */}
          <ParallaxContainer>
            <motion.div {...fadeUp(0.15)} className="w-full max-w-md md:max-w-lg">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-700/90 bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                {/* glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sky-500/25 via-violet-500/15 to-transparent" />

                <div className="relative flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                        Live agent
                      </p>
                      <p className="text-xs text-neutral-100">
                        REZIIIX · Production orchestration
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-neutral-900/80 px-2 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                      <span className="text-[10px] text-neutral-200">Healthy</span>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.3fr,1fr]">
                    {/* log */}
                    <div className="space-y-2 rounded-2xl border border-neutral-700 bg-neutral-950/85 p-2.5 text-[11px] text-neutral-50">
                      <div className="mb-1 flex items-center justify-between text-[10px] text-neutral-500">
                        <span>Event stream</span>
                        <span>Last 30 sec</span>
                      </div>

                      {[
                        {
                          time: "09:14:03",
                          label: "Intake",
                          text: "New HR request triaged → “Benefits / Eligibility”.",
                        },
                        {
                          time: "09:14:09",
                          label: "Synthesis",
                          text: "Summarised 12-message thread for manager approval.",
                        },
                        {
                          time: "09:14:12",
                          label: "Execution",
                          text: "Draft reply + ticket update prepared for review.",
                        },
                      ].map((item) => (
                        <div key={item.time} className="flex gap-2">
                          <div className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                              <span>{item.time}</span>
                              <span className="rounded-full border border-neutral-700 px-1.5 py-[1px] text-[9px] uppercase tracking-[0.14em]">
                                {item.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-100">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* metrics */}
                    <div className="space-y-2 rounded-2xl border border-neutral-700 bg-neutral-950/85 p-2.5 text-[11px] text-neutral-100">
                      <div className="mb-1 flex items-center justify-between text-[10px] text-neutral-500">
                        <span>Today</span>
                        <span>Session load</span>
                      </div>
                      <div className="space-y-1.5">
                        <MetricRow label="Requests handled" value="318" />
                        <MetricRow label="Avg. human review" value="18%" />
                        <MetricRow label="SLA matched" value="96%" />
                      </div>

                      <div className="mt-2 space-y-1 rounded-xl border border-neutral-700 bg-black/80 p-2 text-[10px] text-neutral-300">
                        <p className="uppercase tracking-[0.14em] text-neutral-500">
                          Guardrail
                        </p>
                        <p>
                          If confidence &lt; 0.85 or data incomplete → assign to human,
                          attach summary + suggested next steps.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-neutral-400">
                This is what we actually build: a running agent inside your stack,
                with logs, metrics, and clear rules for when humans stay in the loop.
              </p>
            </motion.div>
          </ParallaxContainer>
        </div>
      </motion.section>

      {/* SERVICES */}
      <ServicesSection />

      {/* PROCESS – sticky story */}
      <SystemsStory />

      {/* Example agents */}
      <ExampleAgents />

      {/* WORKFLOW STRIP (anchor for “Process” in nav) */}
      <motion.section
        id="process"
        className="border-b border-neutral-900 bg-neutral-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-14">
          <motion.div
            className="mb-6 flex items-center justify-between gap-4"
            variants={staggerItem}
          >
            <h2 className="text-sm font-medium md:text-base">A simple mental model.</h2>
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
              Input → Agent → Output
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-black px-4 py-5 text-xs md:px-6 md:py-6 md:text-[13px]"
            variants={staggerItem}
          >
            <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-neutral-700/70" />
            <motion.div
              className="absolute top-1/2 h-[2px] w-20 -translate-y-1/2 bg-white"
              initial={{ x: "-10%" }}
              animate={{ x: "110%" }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative grid gap-3 md:grid-cols-3">
              <WorkflowNode
                title="Inputs"
                body="Email, chats, forms, documents, metrics — wherever the work currently shows up."
              />
              <WorkflowNode
                title="REZIIIX agent"
                body="Scoped logic, tools, memory, and policies designed for your workflow and risk level."
                strong
              />
              <WorkflowNode
                title="Outputs"
                body="Updates, drafts, tickets, reports — delivered into the systems and channels you already use."
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="border-b border-neutral-900 bg-black scroll-mt-24 md:scroll-mt-28
"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
            <motion.div variants={staggerItem}>
              <h2 className="mb-3 text-xl font-medium md:text-2xl">
                A small studio for serious work.
              </h2>
              <p className="text-sm leading-relaxed text-neutral-200">
                REZIIIX operates as a focused AI automation studio. We work with teams
                who have real workloads, data, and constraints — not just ideas. The
                output is always a running system that your people can use and trust.
              </p>
            </motion.div>
            <motion.div
              className="space-y-3 text-xs text-neutral-300"
              variants={staggerItem}
            >
              {/* UPDATED ABOUT BULLETS */}
              <p>▸ Remote-first, working with global teams.</p>
              <p>▸ Comfortable close to your data, policies, and security.</p>
              <p>
                ▸ Opinionated about scoping: start with one workflow, make it real,
                then expand.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="border-b border-neutral-900 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
            <motion.div className="space-y-4" variants={staggerItem}>
              <h2 className="text-xl font-medium md:text-2xl">
                Bring one messy workflow.
              </h2>
              <p className="text-sm leading-relaxed text-neutral-200">
                Describe one process that feels slow, repetitive, or fragile.
                We&apos;ll respond with a concrete agent concept, technical approach,
                and what &quot;production&quot; could look like for you.
              </p>
              <p className="text-xs text-neutral-300">
                Email: <span className="text-neutral-100">hello@reziiix.com</span>
              </p>
            </motion.div>

            <motion.div
              className="space-y-3 rounded-2xl border border-neutral-800 bg-black/75 px-4 py-5 text-xs md:px-5 md:py-6"
              variants={staggerItem}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-neutral-700 bg-neutral-950/90 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-400"
              />
              <input
                type="email"
                placeholder="Work email"
                className="w-full rounded-md border border-neutral-700 bg-neutral-950/90 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-400"
              />
              <textarea
                placeholder="Describe one workflow you’d like to automate..."
                className="h-24 w-full resize-none rounded-md border border-neutral-700 bg-neutral-950/90 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                className="w-full rounded-md border border-neutral-500 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-neutral-900"
              >
                Send (static form)
              </motion.button>
              <p className="text-[10px] text-neutral-500">
                This form is intentionally static. We can wire it to your email,
                CRM, or directly into an intake agent once your stack is defined.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-[11px] text-neutral-500">
        © {new Date().getFullYear()} REZIIIX · AI Automation Studio
      </footer>
    </main>
  );
}

/* ---------- INTRO SPLASH ---------- */

function IntroSplash() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });

  // fade on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // entrance animation
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [36, 0],
      transition: { duration: 1.3, ease: [0.19, 1, 0.22, 1] },
    });
  }, [controls]);

  const handleScrollDown = () => {
    const el = document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      ref={introRef}
      style={{ opacity, scale, y: translateY }}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-black"
    >
      {/* -------------- SKY GOD-RAYS BACKGROUND -------------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* vertical god ray */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_55%)] blur-3xl" />

        {/* soft celestial field */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(180,200,255,0.06),transparent_70%)]" />

        {/* faint aurora rings */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        />
      </div>

      {/* -------------- CENTER CONTENT -------------- */}
      <motion.div
        animate={controls}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        {/* --------- REZIIIX wordmark (angel silver gradient) --------- */}
        <motion.span
          initial={{ backgroundPositionX: "0%" }}
          animate={{
            backgroundPositionX: ["0%", "100%", "0%"],
            letterSpacing: ["0.18em", "0.22em", "0.18em"],
          }}
          transition={{
            backgroundPositionX: { duration: 8, repeat: Infinity, ease: "linear" },
            letterSpacing: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="
            select-none
            bg-[linear-gradient(120deg,#ffffff,#dfe9ff,#e3f2ff,#ffffff)]
            bg-clip-text
            text-transparent
            text-[clamp(4rem,15vw,11rem)]
            font-light
            tracking-[0.22em]
            drop-shadow-[0_0_55px_rgba(255,255,255,0.28)]
            uppercase
          "
          style={{ backgroundSize: "200% 100%" }}
        >
          REZIIIX
        </motion.span>

        {/* UPDATED INTRO SUBTEXT */}
        <p className="max-w-md text-[11px] uppercase tracking-[0.28em] text-neutral-300">
          Build an AI factory inside your company — real agents in real systems, with real control.
        </p>

        {/* -------------- SCROLL BUTTON (ANGEL LIGHT) -------------- */}
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 6, 0],
          }}
          transition={{
            y: { duration: 1.7, repeat: Infinity, ease: "easeInOut" },
            opacity: { delay: 0.6, duration: 0.8 },
          }}
          className="relative flex flex-col items-center gap-3 text-[11px] text-neutral-200"
        >
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-16 bg-white/30" />
            <span>Enter the system</span>
            <div className="h-[1px] w-16 bg-white/30" />
          </div>

          {/* glowing divine button */}
          <div className="relative">
            {/* outer halo */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 rounded-full bg-white/10 blur-2xl"
            />

            {/* actual button */}
            <div
              className="
                relative z-10 flex h-12 w-12 items-center justify-center
                rounded-full
                border border-white/40
                bg-white/10
                backdrop-blur-xl
                shadow-[0_0_38px_rgba(255,255,255,0.45)]
              "
            >
              <span className="text-white text-lg leading-none">↓</span>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

/* ---------- SERVICES SECTION ---------- */

function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="border-b border-neutral-900 bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <motion.div
          className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          variants={staggerItem}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              Services
            </p>
            <h2 className="mt-2 text-xl font-medium md:text-2xl">
              From experiment to production system.
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
            We don&apos;t ship toy demos. Each engagement ends with a running system,
            observable behavior, and a clear next workflow to automate.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Discovery sprint",
              body: "Map your workflows, data, tools, and risks. We define the smallest agent that is still genuinely useful.",
            },
            {
              label: "Pilot agent",
              body: "Design, build, and ship one agent into a controlled environment with guardrails, logs, and review loops.",
            },
            {
              label: "Scale-out",
              body: "Extend to adjacent workflows, connect more tools, and add monitoring so you can treat agents like any other system.",
            },
          ].map((card, i) => (
            <ParallaxContainer key={card.label}>
              <motion.article
                variants={staggerItem}
                className="relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-950/90 via-black to-black/90 px-4 py-4 text-xs shadow-[0_20px_60px_rgba(0,0,0,0.7)] md:px-5 md:py-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.24),transparent_60%)]" />
                <div className="relative space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    {String(i + 1).padStart(2, "0")} / Phase
                  </p>
                  <h3 className="text-sm font-medium text-white">{card.label}</h3>
                  <p className="text-[13px] leading-relaxed text-neutral-400">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            </ParallaxContainer>
          ))}
        </div>

        {/* NEW (minimal) CALLOUT: Microsoft/Copilot + Workshop */}
        <motion.div
          variants={staggerItem}
          className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-4 text-xs shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:px-5 md:py-5"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Integrated delivery
          </p>
          <h3 className="mt-2 text-sm font-medium md:text-base">
            Built into your stack (including Microsoft).
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-400">
            We deploy agents inside your environment and tools. If your organization is
            Microsoft-native, we can also develop{" "}
            <span className="text-neutral-200">Copilot Studio / M365 agents</span>{" "}
            as part of the same governed system — not isolated assistants.
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
            Optional: Reziiix can run a hands-on workshop to help your team learn to
            design, test, and operate Copilot Studio / M365 automations safely.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ---------- sticky Systems story ---------- */

function SystemsStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const triageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0.25]);
  const triageY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  const synthOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.65], [0.25, 1, 0.25]);
  const synthY = useTransform(scrollYProgress, [0.2, 0.65], [30, -40]);

  const execOpacity = useTransform(scrollYProgress, [0.5, 0.75, 1], [0.2, 1, 1]);
  const execY = useTransform(scrollYProgress, [0.5, 1], [40, 0]);

  return (
    <section ref={ref} className="relative border-b border-neutral-900 bg-black">
      <div className="mx-auto max-w-5xl px-4 py-24 md:py-40">
        <div className="sticky top-24 space-y-10 md:space-y-12">
          <div className="max-w-xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              Process
            </p>
            <h2 className="text-xl font-medium md:text-2xl">
              We automate the unglamorous work that never stops.
            </h2>
            <p className="text-xs leading-relaxed text-neutral-500 md:text-sm">
              As you scroll, you&apos;re moving through the three stages we usually
              automate first in a real team: intake, synthesis, and execution.
            </p>
          </div>

          <div className="space-y-4 md:space-y-5">
            <motion.article
              style={{ opacity: triageOpacity, y: triageY }}
              className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:px-5 md:py-5"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                01 / Triage
              </p>
              <h3 className="mt-2 text-sm font-medium md:text-base">
                Signal intake & routing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Classify, enrich, and route inbound requests from email, forms, and
                tickets into the right queues — with confidence scores, SLAs, and
                human review paths baked in.
              </p>
            </motion.article>

            <motion.article
              style={{ opacity: synthOpacity, y: synthY }}
              className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:px-5 md:py-5"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                02 / Synthesis
              </p>
              <h3 className="mt-2 text-sm font-medium md:text-base">
                Summaries & briefings
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Turn sprawling threads, dashboards, and documents into concise,
                decision-ready briefs your team can edit, not rewrite — with context
                links back to the originals.
              </p>
            </motion.article>

            <motion.article
              style={{ opacity: execOpacity, y: execY }}
              className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:px-5 md:py-5"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                03 / Execution
              </p>
              <h3 className="mt-2 text-sm font-medium md:text-base">
                Agentic workflows
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Trigger actions in your stack — update records, open tickets, draft
                replies, generate reports — all within defined guardrails,
                observability, and audit trails.
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Example agents horizontal track ---------- */

function ExampleAgents() {
  const agents = [
    {
      name: "KnowledgeFlow Copilot",
      tag: "Ops · Knowledge",
      description:
        "Searches, ranks, and summarizes content across your knowledge base with source links, so teams get decision-ready answers instead of search results.",
      impact: "Cuts hunting time for answers by 60–70%.",
    },
    {
      name: "HR Request Router",
      tag: "HR · Service Desk",
      description:
        "Classifies incoming employee requests, drafts suggested replies, and routes each case to the right policy owner or team with full traceability.",
      impact: "Keeps inbox load stable as headcount grows.",
    },
    {
      name: "Decision Brief Generator",
      tag: "Leadership",
      description:
        "Turns long threads, reports, and meeting notes into one-page briefs with options, tradeoffs, and open questions clearly laid out.",
      impact: "Leaders see the signal, not the noise.",
    },
    {
      name: "Ops Automation Agent",
      tag: "Ops · Monitoring",
      description:
        "Monitors dashboards and queues, raises alerts, and triggers predefined runbooks when thresholds are crossed or patterns appear.",
      impact: "Fewer 2 a.m. surprises, clearer ownership.",
    },
  ];

  const loopAgents = [...agents, ...agents];

  const [active, setActive] = useState<string | null>(null);
  const controls = useAnimation();

  const startMarquee = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    startMarquee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="agents" className="border-b border-neutral-900 bg-black w-full">
      <div className="w-full px-4 py-16 md:px-8 md:py-20">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              Example agents
            </p>
            <h2 className="mt-2 text-xl font-medium md:text-2xl">
              A few patterns we can adapt to your stack.
            </h2>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={startMarquee}
        >
          <motion.div
            className="flex w-[200%] gap-6 px-2 md:px-4"
            initial={{ x: 0 }}
            animate={controls}
          >
            {loopAgents.map((agent, index) => {
              const key = `${agent.name}-${index}`;
              const isActive = active === key;

              return (
                <motion.article
                  key={key}
                  onClick={() => setActive(isActive ? null : key)}
                  className="relative min-w-[260px] max-w-[320px] cursor-pointer rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/90 px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.6)] md:px-5 md:py-5"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_55%)] opacity-80" />
                  {isActive && (
                    <div className="pointer-events-none absolute -inset-[1.5px] rounded-2xl ring-2 ring-violet-400/70" />
                  )}

                  <div className="relative space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-violet-300/80">
                      {agent.tag}
                    </p>
                    <h3 className="text-sm font-medium md:text-base">{agent.name}</h3>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {agent.description}
                    </p>
                    <p className="pt-1 text-[11px] text-neutral-400">{agent.impact}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <p className="mt-4 text-[11px] text-neutral-600">
          Continuous gallery. Hover to pause, click a card to highlight a project you want to talk
          about.
        </p>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

type WorkflowNodeProps = {
  title: string;
  body: string;
  strong?: boolean;
};

function WorkflowNode({ title, body, strong }: WorkflowNodeProps) {
  return (
    <div
      className={
        "relative rounded-xl border px-3 py-3 md:px-4 md:py-4 " +
        (strong ? "border-neutral-500 bg-neutral-950" : "border-neutral-800 bg-black")
      }
    >
      <p className="mb-1.5 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        {title}
      </p>
      <p className="text-[11px] leading-relaxed text-neutral-200 md:text-xs">{body}</p>
    </div>
  );
}

type MetricRowProps = {
  label: string;
  value: string;
};

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between text-[10px] text-neutral-400">
      <span>{label}</span>
      <span className="text-[11px] font-medium text-neutral-100">{value}</span>
    </div>
  );
}
