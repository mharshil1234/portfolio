"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isIntroDone } from "@/lib/intro";
import { RevealHeading } from "@/components/ui/motion";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Hidden SVG filters shared across the page (referenced via CSS `filter: url(#ink-rough)`). */
export function InkDefs() {
    return (
        <svg width="0" height="0" className="absolute" aria-hidden>
            <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
    );
}

const SHURIKEN_PATH =
    "M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z M50 43 A7 7 0 1 0 50.01 43 Z";

export function Shuriken({ className = "", size = 24 }: { className?: string; size?: number }) {
    return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
            <path d={SHURIKEN_PATH} fill="currentColor" fillRule="evenodd" />
        </svg>
    );
}

/**
 * Red seal around a short mark (letters or an icon). With `stamp`, it slams down when scrolled into view
 * (or when `trigger` toggles true).
 */
export function Hanko({
    children,
    size = 56,
    className = "",
    stamp = false,
    rotate = -6,
}: {
    children: ReactNode;
    size?: number;
    className?: string;
    stamp?: boolean;
    rotate?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (!stamp) return;
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    ref.current,
                    { scale: 2.4, opacity: 0, rotate: rotate - 14 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotate,
                        duration: 0.28,
                        ease: "power4.in",
                        scrollTrigger: { trigger: ref.current, start: "top 85%" },
                    },
                );
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <span
            ref={ref}
            className={`hanko inline-flex shrink-0 select-none items-center justify-center rounded-[6px] bg-seal font-black leading-none tracking-tight text-paper shadow-[0_6px_18px_rgba(196,22,28,0.35)] [filter:url(#ink-rough)] ${className}`}
            style={{
                width: size,
                height: size,
                fontSize: size * 0.3,
                transform: `rotate(${rotate}deg)`,
            }}
            aria-hidden
        >
            {children}
        </span>
    );
}

/**
 * Section header: number + themed label, a huge faint section number behind,
 * the main heading, and a brush underline that paints itself in.
 */
export function SectionHeader({
    number,
    label,
    title,
    accent = "#fb923c",
    className = "",
}: {
    number: string;
    label: string;
    title: string;
    accent?: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const stroke = ref.current!.querySelector<SVGPathElement>(".brush-line")!;
                const len = stroke.getTotalLength();
                gsap.fromTo(
                    stroke,
                    { strokeDasharray: len, strokeDashoffset: len },
                    {
                        strokeDashoffset: 0,
                        duration: 1.1,
                        ease: "power2.inOut",
                        scrollTrigger: { trigger: ref.current, start: "top 80%" },
                    },
                );
                gsap.fromTo(
                    ".bg-num",
                    { yPercent: 20, opacity: 0 },
                    {
                        yPercent: -20,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
                    },
                );
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={`relative ${className}`}>
            <span
                aria-hidden
                className="bg-num pointer-events-none absolute -left-4 -top-20 select-none text-[9rem] font-black leading-none tracking-tighter text-white/[0.04] sm:-top-28 sm:text-[14rem]"
            >
                {number}
            </span>
            <p className="relative mb-4 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.3em]" style={{ color: accent }}>
                <span>{number}</span>
                <span className="h-px w-8 bg-current opacity-60" />
                <span>{label}</span>
            </p>
            <RevealHeading text={title} className="relative text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl" />
            <svg viewBox="0 0 400 20" className="relative mt-3 h-4 w-56 overflow-visible sm:w-72" aria-hidden>
                <path
                    className="brush-line"
                    d="M4 13 C60 5 140 17 220 9 S360 12 396 7"
                    fill="none"
                    stroke={accent}
                    strokeWidth={6}
                    strokeLinecap="round"
                    style={{ filter: "url(#ink-rough)" }}
                />
            </svg>
        </div>
    );
}

/** Full-width ink brush stroke that paints across as you scroll, with a shuriken riding its tip. */
export function BrushDivider({ flip = false }: { flip?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 40%", scrub: 0.6 },
                });
                tl.fromTo(".stroke", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
                    .fromTo(".tip", { left: "0%", rotate: 0 }, { left: "100%", rotate: 720, ease: "none" }, 0)
                    .to(".tip", { opacity: 0, duration: 0.1 }, 0.9);
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={`relative z-10 mx-auto my-4 h-10 max-w-6xl px-6 ${flip ? "-scale-x-100" : ""}`} aria-hidden>
            <div className="relative h-full">
                <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="stroke absolute inset-0 h-full w-full">
                    <path
                        d="M0 22 C120 14 260 18 420 17 C620 15 820 24 1000 19 C1100 17 1170 19 1200 21 C1150 25 1060 27 960 26 C760 25 560 28 380 26 C230 25 90 27 0 24 Z"
                        fill="rgba(236,230,218,0.16)"
                        style={{ filter: "url(#ink-rough)" }}
                    />
                </svg>
                <span className="tip absolute top-1/2 -ml-2.5 -mt-2.5 text-orange-400">
                    <Shuriken size={20} />
                </span>
            </div>
        </div>
    );
}

/**
 * Easter egg: double-click empty space to throw a shuriken that thunks into the page,
 * quivers, then fades away.
 */
export function ShurikenThrower() {
    useEffect(() => {
        const live: HTMLElement[] = [];

        const onDbl = (e: MouseEvent) => {
            if (!isIntroDone()) return;
            const t = e.target as HTMLElement;
            if (t.closest("a, button, input, textarea, select, label, form, [data-no-shuriken]")) return;
            window.getSelection()?.removeAllRanges();

            const el = document.createElement("div");
            el.setAttribute("aria-hidden", "true");
            el.style.cssText = `position:absolute;left:${e.pageX - 16}px;top:${e.pageY - 16}px;width:32px;height:32px;z-index:90;pointer-events:none;color:#d6d0c4;filter:drop-shadow(0 3px 4px rgba(0,0,0,.6))`;
            el.innerHTML = `<svg viewBox="0 0 100 100" width="32" height="32"><path d="${SHURIKEN_PATH}" fill="currentColor" fill-rule="evenodd"/></svg>`;
            document.body.appendChild(el);
            live.push(el);
            if (live.length > 10) live.shift()?.remove();

            // Thrown from off-screen right, spinning, then sticks with a quiver
            const fromX = window.innerWidth - e.clientX + 120;
            const fromY = -Math.min(e.clientY + 120, 400);
            const restAngle = gsap.utils.random(-30, 30);
            gsap.timeline({
                onComplete: () => {
                    el.remove();
                    const i = live.indexOf(el);
                    if (i >= 0) live.splice(i, 1);
                },
            })
                .fromTo(
                    el,
                    { x: fromX, y: fromY, rotate: 0, scale: 1.4 },
                    { x: 0, y: 0, rotate: 1440 + restAngle, scale: 1, duration: 0.32, ease: "power1.in" },
                )
                .to(el, { keyframes: [{ x: -3 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.18 })
                .to(el, { opacity: 0, duration: 0.5, delay: 2.2 });
        };

        document.addEventListener("dblclick", onDbl);
        return () => {
            document.removeEventListener("dblclick", onDbl);
            live.forEach((el) => el.remove());
        };
    }, []);

    return null;
}
