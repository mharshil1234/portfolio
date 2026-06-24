"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const SECTION_MARKS = [0.2, 0.4, 0.6, 0.8];

export function ScrollPath() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed left-8 top-0 h-full z-50 pointer-events-none">
            <div className="relative h-full w-8">
                <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-white/[0.04] rounded-full" />

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-28 bg-gradient-to-b from-purple-500/10 via-fuchsia-500/5 to-cyan-400/5 blur-2xl origin-top rounded-full"
                    style={{ scaleY: scrollYProgress }}
                />

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-14 bg-gradient-to-b from-purple-600/15 via-fuchsia-500/8 to-cyan-400/5 blur-xl origin-top rounded-full"
                    style={{ scaleY: scrollYProgress }}
                />

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1.5px] bg-gradient-to-b from-purple-600 via-fuchsia-500 to-cyan-400 origin-top rounded-full"
                    style={{ scaleY: scrollYProgress, opacity: scrollYProgress }}
                />

                {SECTION_MARKS.map((pos) => (
                    <div
                        key={pos}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-1.5 w-1.5 rounded-full bg-white/20"
                        style={{ top: `${pos * 100}%` }}
                    />
                ))}

                <motion.div
                    className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute h-10 w-10 rounded-full border border-purple-400/20 animate-ping [animation-duration:3s]" />
                        <div className="absolute h-8 w-8 rounded-full border border-fuchsia-400/10" />
                        <div className="absolute h-6 w-6 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/20 blur-md" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_30px_rgba(168,85,247,0.8),0_0_60px_rgba(168,85,247,0.4),0_0_100px_rgba(168,85,247,0.2)]" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
