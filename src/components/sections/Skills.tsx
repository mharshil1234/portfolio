"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { skills } from "@/data/content";
import { Hanko, SectionHeader, Shuriken } from "@/components/ui/ninja";

const NUMERALS = ["I", "II", "III", "IV"];
const ALL = skills.flatMap((g) => g.items);

/** Infinite marquee whose speed and direction react to scroll velocity. */
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
    const track = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = track.current;
            if (!el) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const loop = gsap.fromTo(
                el,
                { xPercent: reverse ? -50 : 0 },
                { xPercent: reverse ? 0 : -50, duration: 40, ease: "none", repeat: -1 },
            );
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
            <div ref={track} className="flex shrink-0 gap-6 pr-6 will-change-transform">
                {[...items, ...items].map((s, i) => (
                    <span key={i} className="flex shrink-0 items-center gap-6 text-5xl font-black tracking-tight text-white/90 sm:text-7xl">
                        {s}
                        <Shuriken size={36} className="spin-slow text-orange-400" />
                    </span>
                ))}
            </div>
        </div>
    );
}

/** A hanging scroll that unrolls downward when it scrolls into view. */
function WeaponScroll({ group, index }: { group: (typeof skills)[number]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const body = ref.current!.querySelector<HTMLElement>(".scroll-body")!;
                gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%" }, delay: index * 0.12 })
                    .from(".scroll-body", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "power3.inOut" }, 0)
                    .from(".scroll-bottom", { y: () => -body.offsetHeight, duration: 0.9, ease: "power3.inOut" }, 0)
                    .from(".scroll-item", { opacity: 0, y: 8, stagger: 0.03, duration: 0.3 }, 0.5);
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="group origin-top transition-transform duration-500 hover:rotate-[1.2deg]">
            {/* hanging cord */}
            <div className="mx-auto h-5 w-16 border-x border-t border-white/25 [border-radius:999px_999px_0_0]" />
            <div className="rod-h relative z-10 -mx-2 h-3 rounded-full" />
            <div className="scroll-body paper relative px-6 pb-8 pt-6 text-ink">
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Technique {NUMERALS[index]}</p>
                        <h3 className="mt-1 text-xl font-black">{group.category}</h3>
                    </div>
                    <Hanko size={34} rotate={index % 2 ? 5 : -5}>
                        {NUMERALS[index]}
                    </Hanko>
                </div>
                <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                        <li key={item} className="scroll-item rounded-sm border border-ink/20 bg-ink/[0.04] px-2.5 py-1 text-sm font-medium text-ink/85">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="scroll-bottom rod-h relative z-10 -mx-2 h-3 rounded-full" />
        </div>
    );
}

export function Skills() {
    const half = Math.ceil(ALL.length / 2);

    return (
        <section id="skills" className="relative z-10 py-32 sm:py-40">
            <div className="mx-auto mb-16 max-w-7xl px-6">
                <SectionHeader number="02" label="Arsenal" title="My arsenal." accent="#22d3ee" />
            </div>

            <div className="-rotate-2 space-y-2 border-y border-white/10 bg-white/[0.02] py-6">
                <Marquee items={ALL.slice(0, half)} />
                <Marquee items={ALL.slice(half)} reverse />
            </div>

            <div className="mx-auto mt-24 grid max-w-7xl items-start gap-x-8 gap-y-14 px-8 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((group, i) => (
                    <WeaponScroll key={group.category} group={group} index={i} />
                ))}
            </div>
        </section>
    );
}
