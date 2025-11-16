"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NetworkField() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);

    if (!ready) return null;

    return (
        <Particles
            id="network-field"
            className="absolute inset-0 -z-10"
            options={{
                fullScreen: { enable: false },
                background: { color: "transparent" },

                particles: {
                    number: {
                        value: 40,
                        density: { enable: true, area: 700 },
                    },
                    color: { value: "#a78bfa" },
                    shape: { type: "circle" },
                    size: { value: 2 },
                    opacity: { value: 0.35 },

                    links: {
                        enable: true,
                        distance: 140,
                        color: "#c084fc",
                        opacity: 0.25,
                        width: 1,
                    },

                    move: {
                        enable: true,
                        speed: 0.4,
                        outModes: "bounce",
                    },
                },

                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                    },
                    modes: {
                        grab: {
                            distance: 160,
                            links: { opacity: 0.45 },
                        },
                    },
                },

                detectRetina: true,
            }}
        />
    );
}
