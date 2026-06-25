"use client";

import { useEffect, useState } from "react";

const ROWS = 5;
const COLS = 5;

type Tile = {
    id: number;
    col: number;
    row: number;
    delay: number;
};

export function ShatterPhoto() {
    const [phase, setPhase] = useState<"init" | "enter" | "done">("init");
    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        const t: Tile[] = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                t.push({
                    id: r * COLS + c,
                    col: c,
                    row: r,
                    delay: 0.02 * (r * COLS + c) + Math.random() * 0.15,
                });
            }
        }
        setTiles(t);
        const raf = requestAnimationFrame(() => setPhase("enter"));
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (phase !== "enter") return;
        const timer = setTimeout(() => setPhase("done"), 1800);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square">
            <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl scale-110" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-gray-800/50">
                {phase !== "done" &&
                    tiles.map((t) => (
                        <div
                            key={t.id}
                            style={{
                                position: "absolute",
                                left: `${(t.col / COLS) * 100}%`,
                                top: `${(t.row / ROWS) * 100}%`,
                                width: `${100 / COLS}%`,
                                height: `${100 / ROWS}%`,
                                backgroundImage: `url(/me.jpeg)`,
                                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                backgroundPosition: `${(t.col / (COLS - 1)) * 100}% ${(t.row / (ROWS - 1)) * 100}%`,
                                backgroundRepeat: "no-repeat",
                                transform: phase === "enter" ? "scale(1)" : "scale(0)",
                                opacity: phase === "enter" ? 1 : 0,
                                transition:
                                    phase === "enter"
                                        ? `transform 0.5s cubic-bezier(0.22, 1.3, 0.36, 1) ${t.delay}s, opacity 0.4s ease ${t.delay}s`
                                        : "none",
                            }}
                        />
                    ))}
            </div>

            {phase === "done" && (
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                    <img
                        src="/me.jpeg"
                        alt="Harshil Maheshwari"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );
}
