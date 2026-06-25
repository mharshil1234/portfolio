import React, { useRef } from "react";
import { useInView } from "framer-motion";

const startPos = [
    { x: "-10vw", y: "-5vh" },
    { x: "110vw", y: "10vh" },
    { x: "-15vw", y: "20vh" },
    { x: "105vw", y: "-10vh" },
    { x: "-5vw", y: "-15vh" },
    { x: "115vw", y: "-8vh" },
    { x: "-20vw", y: "30vh" },
    { x: "108vw", y: "25vh" },
];

const endPos = [
    { x: -60, y: -40 },
    { x: 60, y: -30 },
    { x: -80, y: 10 },
    { x: 80, y: 15 },
    { x: -40, y: 40 },
    { x: 50, y: 45 },
    { x: -70, y: -10 },
    { x: 70, y: -20 },
];

function Dot({ i }: { i: number }) {
    const s = startPos[i % startPos.length];
    const e = endPos[i % endPos.length];
    return (
        <div
            className="absolute rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)] dot-fly"
            style={{
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                top: "50%",
                left: "50%",
                animationDelay: `${i * 0.06}s`,
                ['--start-x' as string]: s.x,
                ['--start-y' as string]: s.y,
                ['--end-x' as string]: `${e.x}px`,
                ['--end-y' as string]: `${e.y}px`,
            }}
        />
    );
}

export function TransitionDots({
    className = "",
}: {
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <div ref={ref} className={`relative ${className}`}>
            {inView && Array.from({ length: 6 }).map((_, i) => (
                <Dot key={i} i={i} />
            ))}
        </div>
    );
}
