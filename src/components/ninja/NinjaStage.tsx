"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Ink-brush ninja drawn in SVG (viewBox 400x500, ground at y=442, facing left).
 *
 * Two poses:
 *  - .pose-a: airborne, blazing sword raised overhead (used only by the intro)
 *  - .pose-b: kneeling, sword driven into the ground (final pose, shown in the hero)
 *
 * The intro animates these parts by class name; the hero shows the final state.
 */

const IMPACT = { x: 157, y: 442 };
export const NINJA_IMPACT = IMPACT;

// Manga speed lines radiating from the leap
const SPEED_LINES = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2 + (i % 3) * 0.04;
    const c = { x: 255, y: 170 };
    const inner = 220 + (i % 5) * 18;
    const outer = 1200;
    const w = 5 + (i % 4) * 3;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const p1 = `${c.x + dx * inner},${c.y + dy * inner}`;
    const p2 = `${c.x + dx * outer - dy * w},${c.y + dy * outer + dx * w}`;
    const p3 = `${c.x + dx * outer + dy * w},${c.y + dy * outer - dx * w}`;
    return `${p1} ${p2} ${p3}`;
});

// Ink splatter around the impact point (fixed so server and client render the same)
const SPLATS = [
    [-38, -14, 5], [-62, -6, 3], [-24, -30, 4], [30, -18, 6], [56, -8, 3], [44, -34, 3],
    [-82, -2, 2.5], [86, -4, 2.5], [-10, -44, 2], [16, -50, 3],
] as const;

// Flames licking up the planted blade and around its base
const FLAMES = [
    { x: 152, y: 336, s: 0.55 }, { x: 163, y: 360, s: 0.7 }, { x: 151, y: 384, s: 0.8 },
    { x: 163, y: 408, s: 0.9 }, { x: 152, y: 428, s: 1 }, { x: 140, y: 444, s: 1.3 },
    { x: 157, y: 446, s: 1.7 }, { x: 175, y: 444, s: 1.25 },
];

const FLAME_PATH = "M0 0 C-9 -8 -7 -22 -1 -38 C1 -30 6 -26 5 -18 C9 -14 9 -6 0 0 Z";

const CRACKS = [
    "M157 442 L128 447 L104 440 L74 449 L40 443 L8 450",
    "M157 442 L188 448 L222 440 L256 450 L296 443 L330 449",
    "M128 447 L118 462",
    "M222 440 L234 458",
    "M74 449 L66 466",
    "M256 450 L270 470",
];

const EMBER_COUNT = 22;

export function NinjaStage({ variant, className = "" }: { variant: "intro" | "hero"; className?: string }) {
    const root = useRef<HTMLDivElement>(null);
    const id = `ninja-${variant}`;
    const ink = variant === "intro" ? "#14110f" : "#ece6da";
    const isHero = variant === "hero";

    // Embers drifting up from the blade, forever
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<SVGCircleElement>(".ember").forEach((el) => {
                    gsap.fromTo(
                        el,
                        {
                            attr: { cx: () => gsap.utils.random(140, 175), cy: () => gsap.utils.random(330, 445) },
                            opacity: 1,
                            x: 0,
                            y: 0,
                        },
                        {
                            x: () => gsap.utils.random(-50, 50),
                            y: () => gsap.utils.random(-320, -160),
                            opacity: 0,
                            duration: () => gsap.utils.random(1.6, 3.2),
                            ease: "power1.out",
                            repeat: -1,
                            repeatRefresh: true,
                            delay: gsap.utils.random(0, 2.5),
                        },
                    );
                });
                // Headband tails flutter
                gsap.to(".tail", {
                    rotate: 6,
                    transformOrigin: "0% 50%",
                    duration: 0.35,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    stagger: 0.12,
                });
                // Cracks smoulder
                gsap.to(".crack", { opacity: 0.55, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.2 });
            });
            return () => mm.revert();
        },
        { scope: root },
    );

    const limb = { fill: "none", stroke: ink, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

    return (
        <div ref={root} className={`stage pointer-events-none absolute inset-0 ${className}`}>
            <svg
                viewBox="0 0 400 500"
                preserveAspectRatio="xMidYMax meet"
                className="absolute -bottom-[2vh] left-1/2 h-[62vh] -translate-x-1/2 overflow-visible md:left-auto md:right-[3vw] md:h-[72vh] md:translate-x-0"
                aria-hidden
            >
                <defs>
                    {/* Rough, bleeding brush edges */}
                    <filter id={`${id}-ink`} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="5" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#ff5a1f" />
                        <stop offset="0.5" stopColor="#fff4d6" />
                        <stop offset="1" stopColor="#ff8a1f" />
                    </linearGradient>
                    <linearGradient id={`${id}-flame`} x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0" stopColor="#fff1c1" />
                        <stop offset="0.35" stopColor="#ffb02e" />
                        <stop offset="1" stopColor="#ff4d12" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id={`${id}-smear`} x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="0.4" stopColor="#ffd28a" />
                        <stop offset="1" stopColor="#ff5a1f" />
                    </linearGradient>
                    <radialGradient id={`${id}-backlight`}>
                        <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Warm backlight from the burning blade (hero only) */}
                {isHero && <ellipse cx="170" cy="380" rx="230" ry="190" fill={`url(#${id}-backlight)`} />}

                {/* Manga speed lines */}
                <g className="speed" opacity={0} fill={ink}>
                    {SPEED_LINES.map((pts, i) => (
                        <polygon key={i} points={pts} opacity={0.5 + (i % 3) * 0.2} />
                    ))}
                </g>

                {/* Ground */}
                <path
                    className="ground"
                    d="M-1600 443 C-400 440 800 446 2000 442"
                    stroke={ink}
                    strokeWidth={3}
                    strokeOpacity={isHero ? 0.15 : 0.7}
                    fill="none"
                    filter={`url(#${id}-ink)`}
                />

                {/* Impact shockwave */}
                <ellipse className="shock" cx={IMPACT.x} cy={IMPACT.y} rx="120" ry="18" fill="none" stroke="#ff9a3c" strokeWidth={3} opacity={0} />

                {/* Glowing ground cracks */}
                <g filter={`url(#${id}-glow)`}>
                    {CRACKS.map((d, i) => (
                        <path key={i} className="crack" d={d} stroke="#ff7a1a" strokeWidth={i < 2 ? 3 : 2} fill="none" strokeLinecap="round" />
                    ))}
                </g>

                {/* ------------------------- Pose A: airborne strike ------------------------- */}
                <g className="pose-a" opacity={0}>
                    {/* blade raised overhead, already burning */}
                    <g filter={`url(#${id}-glow)`}>
                        <path d="M280 76 L291 85 L368 6 L361 0 Z" fill={`url(#${id}-blade)`} />
                    </g>
                    <g filter={`url(#${id}-ink)`}>
                        <path d="M266 110 L285 80" {...limb} strokeWidth={8} />
                        <path d="M272 72 L293 89" {...limb} strokeWidth={6} />
                        <path d="M232 176 L246 128 L268 98" {...limb} strokeWidth={17} />
                        <path d="M258 180 L266 132 L277 101" {...limb} strokeWidth={15} />
                        <circle cx="272" cy="99" r="10" fill={ink} />
                        <path d="M222 168 C240 160 262 166 270 178 C282 205 284 232 276 256 L240 252 C228 226 216 196 222 168 Z" fill={ink} />
                        <circle cx="238" cy="150" r="20" fill={ink} />
                        <path className="tail" d="M255 144 C280 130 300 122 334 128" {...limb} strokeWidth={5} />
                        <path className="tail" d="M255 149 C278 146 300 148 328 160" {...limb} strokeWidth={4} />
                        <path d="M246 252 L212 272 L228 306" {...limb} strokeWidth={24} />
                        <path d="M268 254 L302 278 L334 300" {...limb} strokeWidth={24} />
                    </g>
                </g>

                {/* Slash smear frame */}
                <path
                    className="smear"
                    d="M372 0 C300 120 210 300 150 446 C236 318 306 158 384 12 Z"
                    fill={`url(#${id}-smear)`}
                    opacity={0}
                />

                {/* ------------------------- Pose B: kneeling, sword planted ------------------------- */}
                <g className="pose-b" opacity={isHero ? 1 : 0}>
                    <g filter={`url(#${id}-ink)`}>
                        {/* back leg kneeling, front leg planted */}
                        <path d="M248 330 L286 432 L342 440" {...limb} strokeWidth={26} />
                        <path d="M228 332 L176 356 L170 440" {...limb} strokeWidth={26} />
                        <path d="M170 440 L146 442" {...limb} strokeWidth={13} />
                        {/* torso */}
                        <path d="M210 232 C228 226 252 228 262 240 C270 270 268 300 258 332 L216 336 C204 300 200 262 210 232 Z" fill={ink} />
                        {/* head + flowing headband */}
                        <circle cx="228" cy="212" r="21" fill={ink} />
                        <path className="tail" d="M246 205 C270 198 292 188 322 194" {...limb} strokeWidth={5} />
                        <path className="tail" d="M246 210 C268 214 288 222 316 228" {...limb} strokeWidth={4} />
                        {/* arms gripping the hilt */}
                        <path d="M218 244 L186 280 L157 296" {...limb} strokeWidth={18} />
                        <path d="M244 246 L198 288 L161 304" {...limb} strokeWidth={16} />
                        <circle cx="158" cy="300" r="10" fill={ink} />
                        {/* hilt + guard */}
                        <path d="M157 266 L157 312" {...limb} strokeWidth={8} />
                        <path d="M143 315 L171 315" {...limb} strokeWidth={6} />
                    </g>
                    {/* blazing blade */}
                    <g filter={`url(#${id}-glow)`}>
                        <path d="M151 318 L163 318 L160 443 L154 443 Z" fill={`url(#${id}-blade)`} />
                    </g>
                    <g className="flames" filter={`url(#${id}-glow)`}>
                        {FLAMES.map((f, i) => (
                            <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
                                <path
                                    className="flame"
                                    d={FLAME_PATH}
                                    fill={`url(#${id}-flame)`}
                                    style={{ animationDelay: `${(i * 0.13) % 0.5}s` }}
                                />
                            </g>
                        ))}
                    </g>
                </g>

                {/* Ink splatter from the impact */}
                <g filter={`url(#${id}-ink)`} fill={ink}>
                    {SPLATS.map(([dx, dy, r], i) => (
                        <circle key={i} className="splat" cx={IMPACT.x + dx} cy={IMPACT.y + dy} r={r} opacity={isHero ? 0.6 : 1} />
                    ))}
                </g>

                {/* Rising embers */}
                <g className="embers" opacity={isHero ? 1 : 0} fill="#ffb347">
                    {Array.from({ length: EMBER_COUNT }, (_, i) => (
                        <circle key={i} className="ember" cx={157} cy={440} r={1.2 + (i % 3) * 0.8} opacity={0} />
                    ))}
                </g>

                {/* Hanko seal stamp (intro only) */}
                {!isHero && (
                    <g className="stamp" opacity={0} transform="translate(318 300)">
                        <rect x="-26" y="-26" width="52" height="52" rx="4" fill="#c4161c" filter={`url(#${id}-ink)`} />
                        <path
                            transform="translate(-17 -17) scale(0.34)"
                            d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z M50 43 A7 7 0 1 0 50.01 43 Z"
                            fill="#f3ebdd"
                            fillRule="evenodd"
                        />
                    </g>
                )}
            </svg>
        </div>
    );
}
