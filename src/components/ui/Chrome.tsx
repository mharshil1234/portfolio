"use client";

import { useRef } from "react";
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
