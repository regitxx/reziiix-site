"use client";

import React, { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const sections = [
    { id: "top", label: "Home" },
    { id: "services", label: "Services" },
    { id: "agents", label: "Agents" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];

export default function TopNav() {
    const [active, setActive] = useState<string>("top");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id) setActive(id);
                    }
                });
            },
            {
                threshold: 0.4,
            }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                {/* “logo” */}
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 shadow-[0_0_18px_rgba(129,140,248,0.6)]" />
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-700">
            <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-semibold">
              REZIIIX
            </span>
                        <span className="hidden sm:inline text-slate-400"> · AI automation</span>
                    </div>
                </div>

                {/* nav links */}
                <nav className="hidden items-center gap-4 text-[13px] text-slate-600 md:flex">
                    {sections.map((s) => {
                        const isActive = active === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={handleClick(s.id)}
                                className="relative rounded-full px-2 py-1 transition text-left"
                            >
                <span
                    className={
                        "relative z-10 " +
                        (isActive ? "text-slate-900 font-medium" : "hover:text-violet-500")
                    }
                >
                  {s.label}
                </span>
                                {isActive && (
                                    <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-8 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* small CTAs */}
                <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-slate-500 sm:inline">
            Singapore · Remote
          </span>
                    <MagneticButton
                        onClick={handleClick("contact")}
                        className="bg-slate-900 text-slate-50 px-3.5 py-1.5 rounded-full shadow-[0_10px_25px_rgba(15,23,42,0.35)] hover:bg-slate-800"
                    >
                        Book a call
                    </MagneticButton>
                </div>
            </div>
        </header>
    );
}
