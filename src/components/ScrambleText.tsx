"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CharPos = { char: string; x: number; y: number };

export function ScrambleText({ text }: { text: string }) {
    const measureRef = useRef<HTMLSpanElement>(null);
    const [phase, setPhase] = useState<
        "init" | "ready" | "scatter" | "fly" | "done"
    >("init");
    const [chars, setChars] = useState<CharPos[]>([]);
    const [scatter, setScatter] = useState<{ x: number; y: number }[]>([]);

    // Measure character positions
    useEffect(() => {
        const el = measureRef.current;
        if (!el) return;
        const raf = requestAnimationFrame(() => {
            const positions: CharPos[] = [];
            const points: { x: number; y: number }[] = [];
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            for (let i = 0; i < text.length; i++) {
                const span = el.children[i] as HTMLSpanElement | undefined;
                const rect = span?.getBoundingClientRect();
                const x = rect?.left ?? 0;
                const y = rect?.top ?? 0;
                positions.push({ char: text[i], x, y });
                points.push({
                    x: Math.random() * vw,
                    y: Math.random() * vh,
                });
            }
            setChars(positions);
            setScatter(points);
            requestAnimationFrame(() => setPhase("ready"));
        });
        return () => cancelAnimationFrame(raf);
    }, [text]);

    // ready → scatter
    useEffect(() => {
        if (phase !== "ready") return;
        const t = setTimeout(() => setPhase("scatter"), 80);
        return () => clearTimeout(t);
    }, [phase]);

    // scatter → fly
    useEffect(() => {
        if (phase !== "scatter") return;
        const t = setTimeout(() => setPhase("fly"), 650);
        return () => clearTimeout(t);
    }, [phase]);

    // fly → done
    useEffect(() => {
        if (phase !== "fly") return;
        const t = setTimeout(() => setPhase("done"), 600);
        return () => clearTimeout(t);
    }, [phase]);

    const isAnimating = phase !== "init" && phase !== "done";

    return (
        <>
            {/* Placeholder for layout / final text */}
            <span
                ref={measureRef}
                className={`whitespace-nowrap ${phase !== "done" ? "invisible" : ""}`}
                aria-hidden={phase !== "done"}
            >
                {text.split("").map((char, i) => (
                    <span key={i} className="inline-block">
                        {char}
                    </span>
                ))}
            </span>

            {/* Animated fixed-position characters */}
            {isAnimating &&
                chars.map((c, i) => {
                    const isScatter = phase === "scatter";
                    const isFly = phase === "fly";
                    const tx = isScatter
                        ? scatter[i]?.x ?? c.x
                        : isFly
                          ? c.x
                          : c.x;
                    const ty = isScatter
                        ? scatter[i]?.y ?? c.y
                        : isFly
                          ? c.y
                          : c.y;

                    return (
                        <span
                            key={i}
                            style={{
                                position: "fixed",
                                left: tx,
                                top: ty,
                                zIndex: 50,
                                transition:
                                    isScatter || isFly
                                        ? `left 0.5s cubic-bezier(0.22, 1.3, 0.36, 1), top 0.5s cubic-bezier(0.22, 1.3, 0.36, 1)`
                                        : "none",
                            }}
                        >
                            {c.char}
                        </span>
                    );
                })}
        </>
    );
}
