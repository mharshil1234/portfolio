"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Heading whose characters slide up out of a mask when scrolled into view.
 */
export function RevealHeading({
    text,
    as: Tag = "h2",
    className = "",
    delay = 0,
    onLoad = false,
}: {
    text: string;
    as?: ElementType;
    className?: string;
    delay?: number;
    /** Animate immediately on mount instead of on scroll. */
    onLoad?: boolean;
}) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.from(".rh-char", {
                    yPercent: 115,
                    rotate: 8,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger: 0.025,
                    delay,
                    scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: "top 85%" },
                });
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <Tag ref={ref} className={className} aria-label={text}>
            {text.split(" ").map((word, wi) => (
                <span key={wi} aria-hidden className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
                    {word.split("").map((ch, ci) => (
                        <span key={ci} className="rh-char inline-block will-change-transform">
                            {ch}
                        </span>
                    ))}
                    {wi < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </Tag>
    );
}

/**
 * Paragraph whose words light up one by one, scrubbed to scroll position.
 */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    ".st-word",
                    { opacity: 0.12, filter: "blur(4px)" },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        stagger: 0.05,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 80%",
                            end: "bottom 45%",
                            scrub: true,
                        },
                    },
                );
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <p ref={ref} className={className}>
            {text.split(" ").map((w, i) => (
                <span key={i} className="st-word inline-block mr-[0.28em]">
                    {w}
                </span>
            ))}
        </p>
    );
}

/**
 * Children fade/slide in with a stagger when the wrapper enters the viewport.
 * Mark animated children with the `reveal` class.
 */
export function Stagger({
    children,
    className = "",
    y = 40,
    stagger = 0.08,
}: {
    children: ReactNode;
    className?: string;
    y?: number;
    stagger?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.from(".reveal", {
                    y,
                    opacity: 0,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger,
                    scrollTrigger: { trigger: ref.current, start: "top 85%" },
                });
            });
            return () => mm.revert();
        },
        { scope: ref },
    );
    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

/** Element that gets pulled toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || !window.matchMedia("(hover: hover)").matches) return;
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * strength);
                yTo((e.clientY - (r.top + r.height / 2)) * strength);
            };
            const leave = () => {
                xTo(0);
                yTo(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            return () => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
            };
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}

/** Card that tilts in 3D toward the cursor with a moving glare highlight. */
export function TiltCard({
    children,
    className = "",
    max = 10,
    glare = "rgba(255,255,255,0.12)",
}: {
    children: ReactNode;
    className?: string;
    max?: number;
    glare?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || !window.matchMedia("(hover: hover)").matches) return;
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
            gsap.set(el, { transformPerspective: 900 });

            const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                ry((px - 0.5) * max * 2);
                rx(-(py - 0.5) * max * 2);
                if (glareRef.current) {
                    glareRef.current.style.opacity = "1";
                    glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, ${glare}, transparent 55%)`;
                }
            };
            const leave = () => {
                rx(0);
                ry(0);
                if (glareRef.current) glareRef.current.style.opacity = "0";
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            return () => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
            };
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={`relative [transform-style:preserve-3d] ${className}`}>
            {children}
            <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
            />
        </div>
    );
}
