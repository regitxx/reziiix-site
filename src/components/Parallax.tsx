"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

export default function ParallaxContainer({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 120, damping: 20 });
    const springY = useSpring(y, { stiffness: 120, damping: 20 });

    const rotateX = useTransform(springY, [-60, 60], [10, -10]);
    const rotateY = useTransform(springX, [-60, 60], [-10, 10]);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        x.set(relX);
        y.set(relY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX, rotateY }}
            className="transition-transform will-change-transform"
        >
            {children}
        </motion.div>
    );
}
