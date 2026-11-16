"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
export function ScrollProgress() {
    const bar = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(bar.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
    });

    return (
        <div className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none">
            <div
                ref={bar}
                className="h-full origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-amber-300 to-cyan-300"
            />
        </div>
    );
}

/** Blend-mode cursor follower; grows over interactive elements. Hidden on touch devices. */
export function Cursor() {
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const d = dot.current!;
        const r = ring.current!;
        d.style.display = r.style.display = "block";

        const dx = gsap.quickTo(d, "x", { duration: 0.1, ease: "power3" });
        const dy = gsap.quickTo(d, "y", { duration: 0.1, ease: "power3" });
        const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
        const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

        const move = (e: PointerEvent) => {
            dx(e.clientX);
            dy(e.clientY);
            rx(e.clientX);
            ry(e.clientY);
            const interactive = (e.target as HTMLElement).closest("a, button, input, textarea, [data-cursor]");
            gsap.to(r, { scale: interactive ? 1.9 : 1, duration: 0.3, overwrite: "auto" });
        };
        const down = () => gsap.to(r, { scale: 0.7, duration: 0.15 });
        const up = () => gsap.to(r, { scale: 1, duration: 0.3 });

        window.addEventListener("pointermove", move);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
        };
    }, []);

    return (
        <>
            <div
                ref={ring}
                style={{ display: "none" }}
                className="pointer-events-none fixed left-0 top-0 z-[70] -ml-5 -mt-5 h-10 w-10 rounded-full border border-white/70 mix-blend-difference"
            />
            <div
                ref={dot}
                style={{ display: "none" }}
                className="pointer-events-none fixed left-0 top-0 z-[70] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference"
            />
        </>
    );
}
