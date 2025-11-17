"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

type RevealProps = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const variants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function Reveal({
                                   children,
                                   delay = 0,
                                   className,
                               }: RevealProps) {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{
                duration: 0.7,
                ease: "easeOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
