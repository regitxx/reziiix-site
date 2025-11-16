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
  // Global page scroll progress (for top progress bar)
  const { scrollYProgress: pageProgress } = useScroll();
  const progressScaleX = useTransform(pageProgress, [0, 1], [0, 1]);

  // HERO scroll-driven effects
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.03]);
  const logoX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const haloScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.95]);
  const haloOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.35]);

  return (
      <main className="min-h-screen bg-black text-neutral-100">
        {/* GLOBAL SCROLL PROGRESS BAR */}
        <motion.div
            className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400"
            style={{ scaleX: progressScaleX }}
        />

        {/* HEADER */}
        <motion.header
            className="sticky top-0 z-30 border-b border-neutral-900 bg-black/80 backdrop-blur"
            initial={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 text-[10px] tracking-[0.18em]">
                R
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                REZIIIX
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-neutral-500">
              <span className="hidden sm:inline">AI Automation Studio</span>
              <span className="h-4 w-px bg-neutral-800" />
              <span>Singapore · Global</span>
            </div>
          </div>
        </motion.header>

        {/* HERO – COSMIC BACKGROUND with scroll-driven parallax */}
        <motion.section
            ref={heroRef}
            className="relative min-h-screen overflow-hidden bg-black flex items-center"
        >
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(70,70,255,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.18] mix-blend-soft-light" />
          </div>

          {/* HERO HALO – integrated glow behind the card */}
          <motion.div
              style={{ scale: haloScale, opacity: haloOpacity }}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
            <div className="h-[520px] w-[520px] rounded-[40%] bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.65),transparent_65%)] blur-2xl" />
          </motion.div>

          {/* GHOST LOGO */}
          <motion.div
              style={{
                scale: logoScale,
                opacity: logoOpacity,
                x: logoX,
                y: logoY,
              }}
              className="absolute inset-0 flex items-center justify-center z-0"
          >
            <h1 className="text-[28vw] font-black tracking-tighter text-white select-none leading-none">
              REZIIIX
            </h1>
          </motion.div>

          {/* HERO CONTENT */}
          <motion.div
              {...fadeUp(0)}
              style={{ y: cardY, opacity: cardOpacity }}
              className="relative z-10 mx-auto max-w-5xl px-6 py-32 md:py-48"
          >
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              Focused AI automation studio
            </h3>

            <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-6">
              AI systems that quietly <br /> remove repetitive work.
            </h1>

            <p className="text-neutral-300 max-w-md mb-8">
              REZIIIX designs and builds production-grade AI agents embedded in
              your existing tools. They handle real workflows, log every decision,
              and hand control back to humans when needed.
            </p>

            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-neutral-300 transition"
                onClick={() =>
                    document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
            >
              Talk to REZIIIX
            </motion.button>
          </motion.div>
        </motion.section>

        {/* sticky, Apple-style “Systems” story */}
        <SystemsStory />

        {/* Example agents horizontal track */}
        <ExampleAgents />

        {/* WORKFLOW STRIP */}
        <motion.section
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
              <h2 className="text-sm font-medium md:text-base">
                A simple mental model.
              </h2>
              <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                Input → Agent → Output
              </p>
            </motion.div>

            <motion.div
                className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-black px-4 py-5 text-xs md:px-6 md:py-6 md:text-[13px]"
                variants={staggerItem}
            >
              {/* animated line */}
              <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-neutral-700/60" />
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
            className="border-b border-neutral-900"
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
                <p className="text-sm leading-relaxed text-neutral-400">
                  REZIIIX operates as a focused AI automation studio. We work with
                  teams who have real workloads, data, and constraints — not just
                  ideas. The output is always a running system that your people
                  can use and trust.
                </p>
              </motion.div>
              <motion.div
                  className="space-y-3 text-xs text-neutral-500"
                  variants={staggerItem}
              >
                <p>▸ Based in Singapore, working remotely with global teams.</p>
                <p>▸ Comfortable close to your data, policies, and security.</p>
                <p>
                  ▸ Opinionated about scoping: start with one workflow, make it
                  real, then expand.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
            id="contact"
            className="border-b border-neutral-900"
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
                <p className="text-sm leading-relaxed text-neutral-400">
                  Describe one process that feels slow, repetitive, or fragile.
                  We&apos;ll respond with a concrete agent concept, technical
                  approach, and what &quot;production&quot; could look like for
                  you.
                </p>
                <p className="text-xs text-neutral-500">
                  Email:{" "}
                  <span className="text-neutral-200">hello@reziiix.com</span>
                </p>
              </motion.div>

              <motion.div
                  className="space-y-3 rounded-2xl border border-neutral-800 bg-black/70 px-4 py-5 text-xs md:px-5 md:py-6"
                  variants={staggerItem}
              >
                <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-500"
                />
                <input
                    type="email"
                    placeholder="Work email"
                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-500"
                />
                <textarea
                    placeholder="Describe one workflow you’d like to automate..."
                    className="h-24 w-full resize-none rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-500"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    className="w-full rounded-md border border-neutral-600 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-neutral-900"
                >
                  Send (static form)
                </motion.button>
                <p className="text-[10px] text-neutral-600">
                  This form is intentionally static. We can wire it to your email,
                  CRM, or directly into an intake agent once your stack is
                  defined.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="py-6 text-center text-[11px] text-neutral-600">
          © {new Date().getFullYear()} REZIIIX · AI Automation Studio
        </footer>
      </main>
  );
}

/* ---------- sticky Systems story ---------- */

function SystemsStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Three “chapters” that take turns being in focus
  const triageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0.25]);
  const triageY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  const synthOpacity = useTransform(
      scrollYProgress,
      [0.2, 0.4, 0.65],
      [0.25, 1, 0.25]
  );
  const synthY = useTransform(scrollYProgress, [0.2, 0.65], [30, -40]);

  const execOpacity = useTransform(scrollYProgress, [0.5, 0.75, 1], [0.2, 1, 1]);
  const execY = useTransform(scrollYProgress, [0.5, 1], [40, 0]);

  return (
      <section
          ref={ref}
          className="relative border-b border-neutral-900 bg-black"
      >
        <div className="mx-auto max-w-5xl px-4 py-24 md:py-40">
          <div className="sticky top-24 space-y-10 md:space-y-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                Systems, not experiments.
              </p>
              <h2 className="text-xl font-medium md:text-2xl">
                We automate the unglamorous work that never stops.
              </h2>
              <p className="text-xs leading-relaxed text-neutral-500 md:text-sm">
                As you scroll, you&apos;re moving through the three stages we
                usually automate first in a real team: intake, synthesis, and
                execution.
              </p>
            </div>

            <div className="space-y-4 md:space-y-5">
              <motion.article
                  style={{ opacity: triageOpacity, y: triageY }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 md:px-5 md:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  01 / Triage
                </p>
                <h3 className="mt-2 text-sm font-medium md:text-base">
                  Signal intake & routing
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  Classify, enrich, and route inbound requests from email, forms,
                  and tickets into the right queues — with confidence scores, SLAs,
                  and human review paths baked in.
                </p>
              </motion.article>

              <motion.article
                  style={{ opacity: synthOpacity, y: synthY }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 md:px-5 md:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  02 / Synthesis
                </p>
                <h3 className="mt-2 text-sm font-medium md:text-base">
                  Summaries & briefings
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  Turn sprawling threads, dashboards, and documents into concise,
                  decision-ready briefs your team can edit, not rewrite — with
                  context links back to the originals.
                </p>
              </motion.article>

              <motion.article
                  style={{ opacity: execOpacity, y: execY }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-4 md:px-5 md:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  03 / Execution
                </p>
                <h3 className="mt-2 text-sm font-medium md:text-base">
                  Agentic workflows
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  Trigger actions in your stack — update records, open tickets,
                  draft replies, generate reports — all within defined guardrails,
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

/* ---------- Example agents horizontal track (auto-scroll gallery) ---------- */

/* ---------- Example agents horizontal track (marquee gallery) ---------- */

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

  // duplicate list so marquee can loop seamlessly
  const loopAgents = [...agents, ...agents];

  const [active, setActive] = useState<string | null>(null);
  const controls = useAnimation();

  const startMarquee = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 40, // slower / faster marquee here
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
      <section className="border-b border-neutral-900 bg-black w-full">
        <div className="w-full px-4 md:px-8 py-16 md:py-20">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                Example agents
              </p>
              <h2 className="mt-2 text-xl font-medium md:text-2xl">
                A few patterns we can adapt to your stack.
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-neutral-500">
              These aren&apos;t chatbots. They&apos;re production workflows with
              routing, guardrails, and observability — tuned to your tools and
              policies.
            </p>
          </div>

          {/* MARQUEE CONTAINER */}
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
                        className="relative min-w-[260px] max-w-[320px] cursor-pointer rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/90 px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_60px_rgba(0,0,0,0.6)]"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                      {/* glow overlay */}
                      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_55%)] opacity-80" />

                      {/* active ring */}
                      {isActive && (
                          <div className="pointer-events-none absolute -inset-[1.5px] rounded-2xl ring-2 ring-violet-400/70" />
                      )}

                      <div className="relative space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-violet-300/80">
                          {agent.tag}
                        </p>
                        <h3 className="text-sm font-medium md:text-base">
                          {agent.name}
                        </h3>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {agent.description}
                        </p>
                        <p className="pt-1 text-[11px] text-neutral-400">
                          {agent.impact}
                        </p>
                      </div>
                    </motion.article>
                );
              })}
            </motion.div>
          </div>

          <p className="mt-4 text-[11px] text-neutral-600">
            Continuous gallery. Hover to pause, click a card to highlight a
            project you want to talk about.
          </p>
        </div>
      </section>
  );
}



/* ---------- helper component ---------- */

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
              (strong
                  ? "border-neutral-500 bg-neutral-950"
                  : "border-neutral-800 bg-black")
          }
      >
        <p className="mb-1.5 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          {title}
        </p>
        <p className="text-[11px] leading-relaxed text-neutral-300 md:text-xs">
          {body}
        </p>
      </div>
  );
}
