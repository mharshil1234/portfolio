"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Shuriken } from "@/components/ui/ninja";

/** Thin fire-gradient bar at the top of the viewport, with a shuriken spinning along its tip. */
export function ScrollProgress() {
    const bar = useRef<HTMLDivElement>(null);
    const star = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const setX = gsap.quickSetter(star.current, "x", "px");
        const setRot = gsap.quickSetter(star.current, "rotate", "deg");
        gsap.to(bar.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                start: 0,
                end: "max",
                scrub: 0.3,
                onUpdate: (self) => {
                    setX(self.progress * (window.innerWidth - 18));
                    setRot(self.progress * 2160);
                },
            },
        });
    });

    return (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-300" />
            <div ref={star} className="absolute -top-[7px] left-0 text-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]">
                <Shuriken size={18} />
            </div>
        </div>
    );
}
