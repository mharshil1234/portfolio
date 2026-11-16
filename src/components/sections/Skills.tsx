"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { skills } from "@/data/content";
import { RevealHeading, Stagger, TiltCard } from "@/components/ui/motion";

const ACCENTS = ["#fb923c", "#22d3ee", "#34d399", "#fbbf24"];
const ALL = skills.flatMap((g) => g.items);

/** Infinite marquee whose speed and direction react to scroll velocity. */
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
    const track = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = track.current;
            if (!el) return;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduce) return;

            // Track contains the list twice; loop over half its width.
            const loop = gsap.fromTo(
                el,
                { xPercent: reverse ? -50 : 0 },
                { xPercent: reverse ? 0 : -50, duration: 40, ease: "none", repeat: -1 },
            );

            // Scrolling boosts speed; scrolling up flips direction. Eases back to cruise speed.
            const st = ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
                    const sign = self.direction;
                    gsap.to(loop, { timeScale: boost * sign, duration: 0.15, overwrite: true });
                    gsap.to(loop, { timeScale: sign, duration: 1.2, delay: 0.15 });
                },
            });

            return () => {
                st.kill();
                loop.kill();
            };
        },
        { dependencies: [reverse] },
    );

    return (
        <div className="relative flex overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div ref={track} className="flex shrink-0 gap-4 pr-4 will-change-transform">
                {[...items, ...items].map((s, i) => (
                    <span
                        key={i}
                        className="flex shrink-0 items-center gap-4 text-5xl font-black tracking-tight text-white/90 sm:text-7xl"
                    >
                        {s}
                        <span className="text-3xl text-orange-400 sm:text-5xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Skills() {
    const half = Math.ceil(ALL.length / 2);

    return (
        <section id="skills" className="relative z-10 py-32 sm:py-40">
            <div className="mx-auto mb-16 max-w-7xl px-6">
                <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">02 — Skills</p>
                <RevealHeading text="My toolbox." className="text-5xl font-black tracking-tight sm:text-7xl" />
            </div>

            <div className="-rotate-2 space-y-2 border-y border-white/10 bg-white/[0.02] py-6">
                <Marquee items={ALL.slice(0, half)} />
                <Marquee items={ALL.slice(half)} reverse />
            </div>

            <Stagger className="mx-auto mt-24 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((group, i) => (
                    <TiltCard key={group.category} className="reveal rounded-3xl" glare={`${ACCENTS[i]}33`}>
                        <div
                            className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
                            style={{ boxShadow: `inset 0 1px 0 ${ACCENTS[i]}55` }}
                        >
                            <div className="mb-6 flex items-center justify-between [transform:translateZ(30px)]">
                                <h3 className="text-xl font-bold">{group.category}</h3>
                                <span className="font-mono text-xs" style={{ color: ACCENTS[i] }}>
                                    0{i + 1}
                                </span>
                            </div>
                            <ul className="flex flex-wrap gap-2 [transform:translateZ(20px)]">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition-colors hover:text-white"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TiltCard>
                ))}
            </Stagger>
        </section>
    );
}
