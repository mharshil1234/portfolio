"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isIntroDone, markIntroDone } from "@/lib/intro";
import { NinjaStage, NINJA_IMPACT } from "./NinjaStage";

/**
 * Full-screen landing intro on "paper": the ninja leaps in, slashes down and drives a
 * blazing sword into the ground; the paper then burns away from the impact point,
 * revealing the site (where the same ninja waits in the hero).
 */
export function Intro() {
    const root = useRef<HTMLDivElement>(null);
    const edge = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const doneRef = useRef(false);
    const [gone, setGone] = useState(false);
    const lenis = useLenis();
    const lenisRef = useRef(lenis);

    // Lock scrolling while the intro plays (Lenis may initialise after this component)
    useEffect(() => {
        lenisRef.current = lenis;
        if (lenis && !doneRef.current && !isIntroDone()) lenis.stop();
    }, [lenis]);

    const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        tlRef.current?.kill();
        lenisRef.current?.start();
        markIntroDone();
        setGone(true);
    };

    useGSAP(
        () => {
            if (isIntroDone()) {
                setGone(true);
                return;
            }
            const q = gsap.utils.selector(root);
            const overlay = root.current!;
            const svg = root.current!.querySelector("svg")!;

            // Initial state
            gsap.set(q(".stage"), { opacity: 1 });
            gsap.set(q(".pose-a"), { opacity: 1, x: 260, y: -440, rotate: 28, transformOrigin: "50% 50%" });
            gsap.set(q(".ground"), { scaleX: 0, transformOrigin: "50% 50%" });
            gsap.set(q(".flames"), { scale: 0, transformOrigin: "50% 100%" });
            gsap.set(q(".splat"), { scale: 0, transformOrigin: "50% 50%" });
            gsap.set(q(".shock"), { scale: 0.2, opacity: 0, transformOrigin: "50% 50%" });
            gsap.set(q(".stamp"), { scale: 3, opacity: 0, transformOrigin: "50% 50%" });
            root.current!.querySelectorAll<SVGPathElement>(".crack").forEach((el) => {
                const len = el.getTotalLength();
                gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
            });

            const burn = { r: 0, cx: 0, cy: 0, max: 0 };
            const paintBurn = () => {
                const at = `circle at ${burn.cx}px ${burn.cy}px`;
                const mask = `radial-gradient(${at}, transparent ${burn.r}px, #000 ${burn.r + 30}px)`;
                overlay.style.maskImage = mask;
                overlay.style.webkitMaskImage = mask;
                edge.current!.style.background = `radial-gradient(${at}, transparent ${Math.max(burn.r - 30, 0)}px, rgba(255,190,90,0.95) ${burn.r}px, rgba(255,90,20,0.6) ${burn.r + 16}px, transparent ${burn.r + 60}px)`;
            };

            const tl = gsap.timeline({ onComplete: finish });
            tlRef.current = tl;

            tl.to(q(".ground"), { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0)
                .to(q(".speed"), { opacity: 0.9, duration: 0.3 }, 0.15)
                // Leap in
                .to(q(".pose-a"), { x: 0, y: 0, rotate: 0, duration: 0.65, ease: "power3.out" }, 0.15)
                // Hang time
                .to(q(".pose-a"), { y: -16, duration: 0.28, ease: "sine.inOut" })
                .to(q(".speed"), { opacity: 0.35, duration: 0.28 }, "<")
                // Slash
                .addLabel("strike")
                .set(q(".smear"), { opacity: 1 }, "strike")
                .set(q(".pose-a"), { opacity: 0 }, "strike")
                .to(q(".smear"), { opacity: 0, duration: 0.2 }, "strike+=0.05")
                .set(q(".pose-b"), { opacity: 1 }, "strike+=0.04")
                .set(q(".speed"), { opacity: 0 }, "strike+=0.04")
                // Impact
                .addLabel("impact", "strike+=0.06")
                .fromTo(q(".flash"), { opacity: 0.9 }, { opacity: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, "impact")
                .to(
                    q(".stage"),
                    {
                        keyframes: [
                            { x: -14, y: 7 },
                            { x: 11, y: -8 },
                            { x: -8, y: 5 },
                            { x: 6, y: -3 },
                            { x: -3, y: 2 },
                            { x: 0, y: 0 },
                        ],
                        duration: 0.42,
                    },
                    "impact",
                )
                .to(q(".crack"), { strokeDashoffset: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" }, "impact")
                .fromTo(q(".shock"), { scale: 0.2, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, "impact")
                .to(q(".splat"), { scale: 1, duration: 0.25, stagger: 0.015, ease: "back.out(3)" }, "impact")
                .to(q(".flames"), { scale: 1, duration: 0.45, ease: "back.out(2)" }, "impact+=0.05")
                .to(q(".embers"), { opacity: 1, duration: 0.3 }, "impact+=0.1")
                .to(q(".stamp"), { scale: 1, opacity: 1, duration: 0.22, ease: "power4.in" }, "impact+=0.45")
                // Paper burns away from the impact point
                .addLabel("burn", "impact+=1.15")
                .call(
                    () => {
                        const pt = svg.createSVGPoint();
                        pt.x = NINJA_IMPACT.x;
                        pt.y = NINJA_IMPACT.y;
                        const p = pt.matrixTransform(svg.getScreenCTM()!);
                        burn.cx = p.x;
                        burn.cy = p.y;
                        burn.max = Math.hypot(Math.max(p.x, innerWidth - p.x), Math.max(p.y, innerHeight - p.y)) + 80;
                        paintBurn();
                    },
                    [],
                    "burn",
                )
                .to(burn, { r: () => burn.max, duration: 1.1, ease: "power2.in", onUpdate: paintBurn }, "burn")
                .to(q(".skip"), { opacity: 0, duration: 0.2 }, "burn");

            const skip = (e: Event) => {
                if (e instanceof KeyboardEvent && ["Tab", "Shift", "Alt", "Control", "Meta"].includes(e.key)) return;
                finish();
            };
            window.addEventListener("keydown", skip);
            overlay.addEventListener("pointerdown", skip);
            return () => {
                window.removeEventListener("keydown", skip);
                overlay.removeEventListener("pointerdown", skip);
            };
        },
        { scope: root },
    );

    if (gone) return null;

    return (
        <>
            <div ref={root} className="intro-overlay fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#ebe3d3]" role="presentation">
                {/* Paper texture + vignette */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(60,40,20,0.35))]" />
                <div className="grain !absolute !opacity-[0.12]" />
                <NinjaStage variant="intro" className="opacity-0" />
                <div className="flash pointer-events-none absolute inset-0 bg-white opacity-0" />
                <p className="skip pointer-events-none absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.3em] text-black/40">
                    Click or press any key to skip
                </p>
            </div>
            <div ref={edge} className="intro-overlay pointer-events-none fixed inset-0 z-[101]" />
        </>
    );
}
