// src/app/page.tsx

function Stat({ label, value }: { label: string; value: string }) {
  return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="mt-1 text-lg font-semibold text-slate-50">{value}</div>
      </div>
  );
}

function ServiceCard({ title, body }: { title: string; body: string }) {
  return (
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-sm font-semibold text-slate-50 mb-2">{title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{body}</p>
      </div>
  );
}

function AgentCard({ name, description }: { name: string; description: string }) {
  return (
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
        <div className="pointer-events-none absolute inset-x-[-40%] top-[-40%] h-40 bg-gradient-to-br from-sky-400/30 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
        <h3 className="text-sm font-semibold text-slate-50 mb-1 relative z-10">
          {name}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed relative z-10">
          {description}
        </p>
      </div>
  );
}

const steps = [
  {
    title: "Discovery & scoping",
    text: "We map your workflows, systems, constraints, and success metrics so we know exactly what an agent should and should not do.",
  },
  {
    title: "Architecture & design",
    text: "We design the agent flow, tools, data connections, and guardrails — with clear boundaries, escalation paths, and logs.",
  },
  {
    title: "Build, integrate, iterate",
    text: "We implement the agent, connect it to your stack (M365, Google Workspace, APIs, data), and iterate with your team.",
  },
  {
    title: "Deployment & measurement",
    text: "We monitor usage, time saved, and quality. You get concrete numbers, not just demos.",
  },
];

export default function HomePage() {
  return (
      <main className="min-h-screen flex flex-col bg-[#020617] text-slate-50">
        {/* Background blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-32 -right-10 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-500/10 blur-3xl" />
        </div>

        {/* Nav */}
        <header className="w-full sticky top-0 z-20 bg-[#020617]/80 backdrop-blur border-b border-white/5">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 shadow-lg shadow-sky-500/40" />
              <span className="font-semibold tracking-[0.18em] text-xs uppercase text-slate-100">
              Reziiix
            </span>
            </a>
            <nav className="hidden sm:flex gap-6 text-xs text-slate-300">
              <a href="#services" className="hover:text-slate-50 transition-colors">
                Services
              </a>
              <a href="#agents" className="hover:text-slate-50 transition-colors">
                Agents
              </a>
              <a href="#process" className="hover:text-slate-50 transition-colors">
                Process
              </a>
              <a href="#about" className="hover:text-slate-50 transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-slate-50 transition-colors">
                Contact
              </a>
            </nav>
            <a
                href="#contact"
                className="text-xs sm:text-sm rounded-full border border-sky-400/70 bg-sky-400/10 px-3 py-1.5 hover:bg-sky-400 hover:text-black transition"
            >
              Book a call
            </a>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 flex flex-col gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="uppercase tracking-[0.18em]">
                AI Automation Studio · Singapore
              </span>
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
                We build{" "}
                <span className="bg-gradient-to-br from-slate-50 via-sky-200 to-slate-400 bg-clip-text text-transparent">
                AI agents
              </span>{" "}
                that automate real work.
              </h1>
              <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                Reziiix designs and ships custom AI agents that plug into your tools
                and workflows. Not generic chatbots — production systems that
                classify, summarize, route, and execute tasks for your teams.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 items-center">
                <a
                    href="#contact"
                    className="rounded-full bg-slate-50 text-black text-sm font-medium px-5 py-2.5 hover:bg-slate-200 transition"
                >
                  Talk about a project
                </a>
                <a
                    href="#agents"
                    className="text-sm text-slate-300 hover:text-slate-50 flex items-center gap-1"
                >
                  See agent examples
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Processes automated" value="20+" />
              <Stat label="Time saved per workflow" value="30–60%" />
              <Stat label="Based in" value="Singapore · Remote" />
            </div>
          </div>
        </section>

        {/* Services */}
        <section
            id="services"
            className="border-t border-white/5 bg-black/40 bg-gradient-to-b from-black/20 to-transparent"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-50">
                  What we do
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-xl">
                  We help teams move from AI experiments to production agents that
                  automate concrete workflows across HR, operations, finance, and
                  analytics.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-300">
              <ServiceCard
                  title="AI process automation"
                  body="We map your workflows and design agents that take real work off your plate: triaging, summarizing, routing, and updating systems automatically."
              />
              <ServiceCard
                  title="Custom AI agents"
                  body="We design and build agents tailored to your data, tools, and policies — with clear guardrails, escalation paths, and observability."
              />
              <ServiceCard
                  title="Enterprise integration"
                  body="We connect agents to Microsoft 365, Google Workspace, internal APIs, and data warehouses, with security and governance in mind."
              />
            </div>
          </div>
        </section>

        {/* Agents */}
        <section id="agents" className="border-t border-white/5 bg-black/50">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-50">
                  Example agents
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-xl">
                  Reziiix agents orchestrate tools and data — they don&apos;t just
                  chat. Here are some examples we can adapt to your context.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 text-sm text-slate-300">
              <AgentCard
                  name="KnowledgeFlow Copilot"
                  description="Searches, ranks, and summarizes content across your knowledge base with source links, so teams get decision-ready answers instead of search results."
              />
              <AgentCard
                  name="HR Request Router"
                  description="Classifies incoming employee requests, drafts suggested replies, and routes them to the right policy or person, cutting handling time for HR teams."
              />
              <AgentCard
                  name="Ops Automation Agent"
                  description="Monitors dashboards or queues, raises alerts, and triggers predefined runbooks or tickets when thresholds are crossed or patterns appear."
              />
              <AgentCard
                  name="Decision Brief Generator"
                  description="Turns long documents, threads, and meeting notes into one-page briefs tailored to leaders, with options and trade-offs clearly laid out."
              />
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="border-t border-white/5 bg-black/40">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-8">
            <h2 className="text-2xl font-semibold text-slate-50">
              How we work
            </h2>
            <div className="grid gap-6 md:grid-cols-4 text-sm text-slate-300">
              {steps.map((step, index) => (
                  <div key={step.title} className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-6 rounded-full bg-slate-50 text-[11px] font-semibold text-black flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-white/5 bg-black/50">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-6">
            <h2 className="text-2xl font-semibold text-slate-50">
              About Reziiix
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Reziiix is an AI automation studio based in Singapore, working
              remotely with teams worldwide. We focus on practical agents that
              automate the unglamorous but critical work inside organisations —
              triaging requests, routing information, summarizing context, and
              updating systems. Our background combines software engineering,
              prompt and workflow design, and hands-on experience in enterprise
              environments.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
            id="contact"
            className="border-t border-white/5 bg-gradient-to-t from-black via-black/80 to-transparent"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 flex flex-col md:flex-row gap-10 md:items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-50">
                Let&apos;s automate your first workflow
              </h2>
              <p className="text-sm text-slate-300 max-w-md">
                Share a process that slows your team down today. We&apos;ll come
                back with a concrete agent concept and a feasible path to
                production — not just a slide deck.
              </p>
              <div className="text-sm text-slate-300 space-y-1">
                <p>
                  Email:{" "}
                  <span className="font-mono text-slate-100">
                  hello@reziiix.com
                </span>
                </p>
                <p>Base: Singapore · Operating globally</p>
              </div>
            </div>
            <form
                className="flex-1 space-y-3 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur"
            >

              <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400"
              />
              <input
                  type="email"
                  placeholder="Work email"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400"
              />
              <textarea
                  rows={4}
                  placeholder="Describe a workflow you’d like to automate…"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400"
              />
              <button
                  type="submit"
                  className="w-full rounded-full bg-slate-50 text-black text-sm font-medium py-2.5 hover:bg-slate-200 transition"
              >
                Send message
              </button>
              <p className="text-[11px] text-slate-500">
                This form is static for now. We can wire it to email, CRM, or an
                agent inbox as the next step.
              </p>
            </form>
          </div>
        </section>

        <footer className="border-t border-white/5 text-[11px] text-slate-500 py-4 bg-black/80">
          <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} Reziiix Pte. Ltd.</span>
            <span>AI automation &amp; agents · Singapore</span>
          </div>
        </footer>
      </main>
  );
}
