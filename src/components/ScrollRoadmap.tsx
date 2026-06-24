"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
    { label: "About", threshold: 0.07 },
    { label: "Skills", threshold: 0.25 },
    { label: "Clubs", threshold: 0.45 },
    { label: "Projects", threshold: 0.65 },
    { label: "Contact", threshold: 0.85 },
];

function WaypointDot({
    cx,
    cy,
    progress,
    threshold,
    label,
}: {
    cx: number;
    cy: number;
    progress: import("framer-motion").MotionValue<number>;
    threshold: number;
    label: string;
}) {
    const opacity = useTransform(
        progress,
        [threshold - 0.06, threshold, threshold + 0.3],
        [0.15, 0.8, 0.4]
    );
    const glowOpacity = useTransform(
        progress,
        [threshold - 0.03, threshold],
        [0, 0.5]
    );

    const labelX = cx > 210 ? cx - 14 : cx + 14;

    return (
        <>
            <motion.circle
                cx={cx}
                cy={cy}
                r={3}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={1}
                style={{ opacity }}
            />
            <motion.circle
                cx={cx}
                cy={cy}
                r={10}
                fill="rgba(168,85,247,0.15)"
                style={{ opacity: glowOpacity }}
            />
            <motion.text
                x={labelX}
                y={cy + 1}
                textAnchor={cx > 210 ? "end" : "start"}
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.15)"
                fontSize={9}
                fontFamily="var(--font-geist-sans)"
                style={{ opacity }}
            >
                {label}
            </motion.text>
        </>
    );
}

export function ScrollRoadmap() {
    const { scrollYProgress } = useScroll();
    const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const pathRef = useRef<SVGPathElement>(null);
    const [pathTotalLength, setPathTotalLength] = useState(0);
    const dotX = useMotionValue(160);
    const dotY = useMotionValue(0);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        if (pathRef.current) {
            const len = pathRef.current.getTotalLength();
            setPathTotalLength(len);
            const pts = SECTIONS.map((s) =>
                pathRef.current!.getPointAtLength(s.threshold * len)
            );
            setPoints(pts);
        }
    }, []);

    useEffect(() => {
        const update = (latest: number) => {
            if (pathRef.current && pathTotalLength > 0) {
                const at = Math.min(latest * pathTotalLength, pathTotalLength);
                const point = pathRef.current.getPointAtLength(at);
                dotX.set(point.x);
                dotY.set(point.y);
            }
        };
        update(scrollYProgress.get());
        const unsub = scrollYProgress.on("change", update);
        return unsub;
    }, [scrollYProgress, pathTotalLength, dotX, dotY]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 400 800"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.65} />
                        <stop offset="50%" stopColor="#d946ef" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.35} />
                    </linearGradient>
                    <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                </defs>

                <path
                    d="M 160 0 C 200 40, 340 100, 300 200 C 260 300, 60 320, 100 400 C 140 480, 340 500, 300 600 C 260 700, 180 740, 160 800"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                />

                <motion.path
                    ref={pathRef}
                    d="M 160 0 C 200 40, 340 100, 300 200 C 260 300, 60 320, 100 400 C 140 480, 340 500, 300 600 C 260 700, 180 740, 160 800"
                    fill="none"
                    stroke="url(#pathGrad)"
                    strokeWidth="2.5"
                    style={{ pathLength: pathDraw }}
                />

                {points.length > 0 &&
                    SECTIONS.map((s, i) => (
                        <WaypointDot
                            key={s.label}
                            cx={points[i].x}
                            cy={points[i].y}
                            progress={scrollYProgress}
                            threshold={s.threshold}
                            label={s.label}
                        />
                    ))}

                <motion.circle
                    cx={dotX}
                    cy={dotY}
                    r={3}
                    fill="none"
                    stroke="rgba(168,85,247,0.35)"
                    strokeWidth={1.5}
                    animate={{ r: [3, 10, 3], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                    cx={dotX}
                    cy={dotY}
                    r={7}
                    fill="rgba(168,85,247,0.3)"
                    filter="url(#dotGlow)"
                />
                <motion.circle
                    cx={dotX}
                    cy={dotY}
                    r={2.5}
                    fill="white"
                />
            </svg>
        </div>
    );
}
