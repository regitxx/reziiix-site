export default function HomePage() {
  return (
      <main className="min-h-screen flex flex-col">
        {/* Nav */}
        <header className="w-full sticky top-0 z-20 bg-[#050814]/80 backdrop-blur border-b border-white/5">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700" />
              <span className="font-semibold tracking-[0.18em] text-xs uppercase">
              Reziiix
            </span>
            </div>
            <nav className="hidden sm:flex gap-6 text-sm text-slate-300">
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#agents" className="hover:text-white">Agents</a>
              <a href="#about" className="hover:text-white">About</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </nav>
            <a
                href="#contact"
                className="text-xs sm:text-sm rounded-full border border-slate-500 px-3 py-1.5 hover:border-white hover:bg-white hover:text-black transition"
            >
              Book a call
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 flex flex-col gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-slate-400 uppercase mb-3">
                AI Automation Studio
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
                We turn your{" "}
                <span className="bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                workflows
              </span>{" "}
                into autonomous agents.
              </h1>
              <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                Reziiix designs and builds custom AI agents that automate repetitive
                knowledge work, integrate with your tools, and respect your
                governance. From HR and operations to analytics and R&amp;D, we
                help enterprises move from “experiments” to production.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                    href="#contact"
                    className="rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-slate-100 transition"
                >
                  Talk about a project
                </a>
                <a
                    href="#agents"
                    className="text-sm text-slate-300 hover:text-white"
                >
                  See agent examples →
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Processes automated" value="20+" />
              <Stat label="Average time saved" value="30–60%" />
              <Stat label="Use cases covered" value="HR · Ops · Analytics" />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-white/5 bg-[#050814]">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-8">
            <h2 className="text-2xl font-semibold">What we do</h2>
            <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-300">
              <ServiceCard
                  title="AI process automation"
                  body="Map your workflows, identify bottlenecks, and build agents that execute tasks end-to-end instead of just chatting."
              />
              <ServiceCard
                  title="Agent strategy & design"
                  body="From discovery workshops to architecture, we help you design agents that are safe, aligned with policy, and measurable."
              />
              <ServiceCard
                  title="Enterprise integration"
                  body="Connect agents to Microsoft 365, Google Workspace, internal APIs, and data warehouses — securely."
              />
            </div>
          </div>
        </section>

        {/* Agents */}
        <section id="agents" className="border-t border-white/5 bg-[#050814]">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-8">
            <h2 className="text-2xl font-semibold">Example agents</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Reziiix agents are not generic chatbots. They are structured tools
              that follow your workflows, call APIs, and update your systems.
            </p>
            <div className="grid gap-6 md:grid-cols-2 text-sm text-slate-300">
              <AgentCard
                  name="KnowledgeFlow Copilot"
                  description="Searches, summarizes, and compares content across your internal knowledge base with source-linked answers."
              />
              <AgentCard
                  name="HR Request Router"
                  description="Classifies incoming HR tickets and routes them with suggested replies, cutting handling time for HR teams."
              />
              <AgentCard
                  name="Ops Automation Agent"
                  description="Monitors dashboards, raises alerts, and triggers predefined runbooks when thresholds are crossed."
              />
              <AgentCard
                  name="Decision Brief Generator"
                  description="Turns long documents, emails, and meeting notes into 1-page decision briefs tailored for leaders."
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-white/5 bg-[#050814]">
          <div className="mx-auto max-w-5xl px-4 py-14 space-y-6">
            <h2 className="text-2xl font-semibold">About Reziiix</h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Reziiix is an AI automation studio focused on practical, high-impact
              agents. We blend software engineering, prompt design, and workflow
              thinking to ship systems that real teams actually adopt. Our work
              spans prototypes, pilots, and production deployments.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
            id="contact"
            className="border-t border-white/5 bg-gradient-to-t from-slate-900 via-[#050814] to-[#050814]"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 flex flex-col md:flex-row gap-10 md:items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-semibold">Let’s build your first agent</h2>
              <p className="text-sm text-slate-300">
                Share a process you’d like to automate and we’ll come back with a
                concrete agent concept, architecture sketch, and rollout path.
              </p>
              <div className="text-sm text-slate-300 space-y-1">
                <p>Email: <span className="font-mono">hello@reziiix.com</span></p>
                <p>Location: Remote · Hong Kong · Singapore (future)</p>
              </div>
            </div>
            <form
                className="flex-1 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur"
            >
              <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-slate-300"
              />
              <input
                  type="email"
                  placeholder="Work email"
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-slate-300"
              />
              <textarea
                  rows={4}
                  placeholder="Describe a process you’d like to automate…"
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-slate-300"
              />
              <button
                  type="submit"
                  className="w-full rounded-full bg-white text-black text-sm font-medium py-2.5 hover:bg-slate-100 transition"
              >
                Send message
              </button>
              <p className="text-[11px] text-slate-400">
                For now this form is static – we can wire it to email or a CRM later.
              </p>
            </form>
          </div>
        </section>

        <footer className="border-t border-white/5 text-[11px] text-slate-500 py-4">
          <div className="mx-auto max-w-5xl px-4 flex justify-between">
            <span>© {new Date().getFullYear()} Reziiix Pte. Ltd.</span>
            <span>AI automation & agents</span>
          </div>
        </footer>
      </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
      <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="mt-1 text-lg font-semibold">{value}</div>
      </div>
  );
}

function ServiceCard({ title, body }: { title: string; body: string }) {
  return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold mb-2">{title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{body}</p>
      </div>
  );
}

function AgentCard({ name, description }: { name: string; description: string }) {
  return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold mb-1">{name}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{description}</p>
      </div>
  );
}
