"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    MotionProps,
} from "framer-motion";
import React from "react";

type ButtonBaseProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

type Props = ButtonBaseProps &
    MotionProps & {
    children: React.ReactNode;
};

export default function MagneticButton({
                                           children,
                                           className = "",
                                           type,
                                           ...rest
                                       }: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * 0.2);
        y.set(relY * 0.2);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            {...rest}
            type={type ?? "button"}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={
                "inline-flex items-center justify-center rounded-full text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-[2px] focus-visible:ring-offset-transparent " +
                className
            }
        >
            {children}
        </motion.button>
    );
}
