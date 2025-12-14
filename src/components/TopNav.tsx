"use client";

import React, { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const sections = [
  { id: "top", label: "Home" },
  { id: "model", label: "Model" },
  { id: "cases", label: "Patterns" },
  { id: "pilot", label: "Pilot" },
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
    if (!el) return;

    const headerOffset = 80;
    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY - headerOffset;

    setActive(id);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-black/80 via-black/70 to-black/40 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(15,23,42,1))] shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.18em] text-black/75">
              R
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="select-none bg-[linear-gradient(120deg,#ffffff,#e5edff,#ffffff)] bg-clip-text text-[11px] font-medium uppercase tracking-[0.32em] text-transparent">
              REZIIIX
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Blueprint Edition
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
                      : "text-slate-300 hover:text-slate-50")
                  }
                >
                  {s.label}
                </span>
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[2px] w-7 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.95),rgba(229,237,255,0.9),rgba(255,255,255,0.95))]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* right side */}
        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-slate-400 sm:inline">
            Remote · global teams
          </span>
          <MagneticButton
            onClick={handleClick("contact")}
            className="bg-white px-3.5 py-1.5 text-[12px] font-semibold text-slate-900 shadow-[0_12px_35px_rgba(15,23,42,0.7)] hover:bg-slate-100"
          >
            Book a call
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
