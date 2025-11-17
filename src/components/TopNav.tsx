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
                    if (entry.isIntersecting && entry.target.id) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                {/* logo */}
                <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 shadow-[0_0_18px_rgba(129,140,248,0.65)]">
                        <div className="absolute inset-[3px] rounded-full bg-black/80" />
                        <span className="relative z-10 flex h-full items-center justify-center text-[11px] font-semibold tracking-[0.22em] text-slate-100">
              R
            </span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
              REZIIIX
            </span>
                        <span className="hidden text-slate-500 sm:inline">
              {" "}
                            · AI automation
            </span>
                    </div>
                </div>

                {/* nav links */}
                <nav className="hidden items-center gap-4 text-[13px] text-slate-300 md:flex">
                    {sections.map((s) => {
                        const isActive = active === s.id;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={handleClick(s.id)}
                                className="relative rounded-full px-2 py-1 text-left transition"
                            >
                <span
                    className={
                        "relative z-10 " +
                        (isActive
                            ? "font-medium text-slate-50"
                            : "text-slate-300 hover:text-sky-400")
                    }
                >
                  {s.label}
                </span>
                                {isActive && (
                                    <span className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[2px] w-7 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* right side */}
                <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-slate-400 sm:inline">
            Singapore · Remote
          </span>
                    <MagneticButton
                        onClick={handleClick("contact")}
                        className="bg-slate-50 px-3.5 py-1.5 text-[12px] font-semibold text-slate-900 shadow-[0_12px_35px_rgba(15,23,42,0.7)] hover:bg-slate-200"
                    >
                        Book a call
                    </MagneticButton>
                </div>
            </div>
        </header>
    );
}
