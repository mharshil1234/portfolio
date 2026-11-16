"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Drives Lenis from GSAP's ticker so ScrollTrigger and Lenis stay in lock-step. */
function GsapBridge() {
    // useLenis re-renders once the instance exists, unlike a ref read in an effect.
    const lenis = useLenis(ScrollTrigger.update);

    useEffect(() => {
        if (!lenis) return;
        const update = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();
        return () => gsap.ticker.remove(update);
    }, [lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, anchors: { offset: -40 } }}>
            <GsapBridge />
            {children}
        </ReactLenis>
    );
}
