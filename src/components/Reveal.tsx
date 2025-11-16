"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

type RevealProps = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const variants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
    },
};

export default function Reveal({ children, delay = 0, className }: RevealProps) {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.15 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={{
                ...variants,
                visible: {
                    ...variants.visible,
                    transition: {
                        ...(variants.visible.transition as any),
                        delay,
                    },
                },
            }}
            initial="hidden"
            animate={controls}
        >
            {children}
        </motion.div>
    );
}
