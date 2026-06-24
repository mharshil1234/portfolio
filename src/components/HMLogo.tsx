"use client";

import { motion } from "framer-motion";

export function HMLogo() {
    return (
        <motion.svg
            width="700"
            height="400"
            viewBox="0 0 700 400"
            initial="hidden"
            animate="visible"
        >
            {/* H */}
            <motion.path
                d="M100 80 V320 M100 200 H250 M250 80 V320"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                variants={{
                    hidden: {
                        pathLength: 0,
                        opacity: 0,
                    },
                    visible: {
                        pathLength: 1,
                        opacity: 0.8,
                        transition: {
                            delay: 0.8,
                            duration: 2,
                            ease: "easeInOut",
                        },
                    },
                }}
            />

            {/* M */}
            <motion.path
                d="M350 320 V80 L450 220 L550 80 V320"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                variants={{
                    hidden: {
                        pathLength: 0,
                        opacity: 0,
                    },
                    visible: {
                        pathLength: 1,
                        opacity: 0.8,
                        transition: {
                            delay: 0.8,
                            duration: 2,
                            ease: "easeInOut",
                        },
                    },
                }}
            />
        </motion.svg>
    );
}