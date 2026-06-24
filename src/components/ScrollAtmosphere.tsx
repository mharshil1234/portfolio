"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollAtmosphere() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 70%)",
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.3, 0]),
                    x: useTransform(scrollYProgress, [0, 1], [0, -100]),
                    y: useTransform(scrollYProgress, [0, 1], [0, 150]),
                }}
            />

            <motion.div
                className="absolute top-1/3 -right-1/4 w-[450px] h-[450px] rounded-full"
                style={{
                    background: "radial-gradient(circle at center, rgba(217,70,239,0.12) 0%, transparent 70%)",
                    opacity: useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.8, 1, 0.2]),
                    x: useTransform(scrollYProgress, [0, 1], [0, 200]),
                    y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                }}
            />

            <motion.div
                className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full"
                style={{
                    background: "radial-gradient(circle at center, rgba(34,211,238,0.10) 0%, transparent 70%)",
                    opacity: useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.1, 0.8]),
                    x: useTransform(scrollYProgress, [0, 1], [0, -150]),
                    y: useTransform(scrollYProgress, [0, 1], [0, -200]),
                }}
            />
        </div>
    );
}
