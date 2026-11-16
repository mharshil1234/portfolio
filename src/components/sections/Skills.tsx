"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills } from "@/data/content";
import { Hanko, SectionHeader, Shuriken } from "@/components/ui/ninja";

const NUMERALS = ["I", "II", "III", "IV"];
const ACCENTS = ["#fb923c", "#22d3ee", "#34d399", "#f87171"];

/** Every skill, round-robin across categories so the colours mix on the board. */
const TAGS = (() => {
    const out: { name: string; accent: string }[] = [];
    const longest = Math.max(...skills.map((g) => g.items.length));
    for (let i = 0; i < longest; i++)
        skills.forEach((g, c) => {
            if (g.items[i]) out.push({ name: g.items[i], accent: ACCENTS[c % ACCENTS.length] });
        });
    return out;
})();

/** Deterministic little tilt per tag, so the board looks hand-pinned. */
const tilt = (i: number) => ((i * 37) % 11) - 5;

/**
 * Wooden training board. As you scroll, shurikens fly in from either side and
 * pin each skill tag to the wood. Scrolling back pulls them out again.
 */
function TargetBoard() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 60%", scrub: 0.6, invalidateOnRefresh: true },
                });

                gsap.utils.toArray<HTMLElement>(".skill-tag").forEach((tag, i) => {
                    const star = tag.querySelector(".tag-star");
                    const paper = tag.querySelector(".tag-paper");
                    const side = i % 2 === 0 ? -1 : 1;
                    const t = i * 0.12;

                    // Shuriken: thrown from off-screen, spinning, lands on the pin spot
                    tl.fromTo(
                        star,
                        { x: () => side * window.innerWidth * 0.8, y: () => -window.innerHeight * 0.35, rotate: 0, opacity: 1 },
                        { x: 0, y: 0, rotate: side * 1080, duration: 0.5, ease: "power1.in" },
                        t,
                    )
                        // Tag slaps onto the board where it hits
                        .fromTo(
                            paper,
                            { opacity: 0, scale: 0.6, rotate: side * 25 },
                            { opacity: 1, scale: 1, rotate: 0, duration: 0.12, ease: "back.out(3)" },
                            t + 0.46,
                        )
                        // Thud: a quick wobble on impact
                        .fromTo(
                            tag,
                            { x: 0 },
                            { keyframes: [{ x: side * -5 }, { x: side * 3 }, { x: side * -1 }, { x: 0 }], duration: 0.16 },
                            t + 0.5,
                        );
                });
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="mx-auto max-w-6xl px-6">
            <div className="board relative overflow-hidden rounded-md border-[10px] border-[#24140a] px-4 py-14 sm:px-10 sm:py-16">
                {/* Ink targets painted on the wood */}
                {[
                    "left-[6%] top-[10%] h-40 w-40 sm:h-56 sm:w-56",
                    "right-[4%] bottom-[6%] h-48 w-48 sm:h-72 sm:w-72",
                    "left-[44%] top-[38%] hidden h-32 w-32 md:block",
                ].map((pos) => (
                    <svg key={pos} viewBox="0 0 100 100" className={`pointer-events-none absolute opacity-40 ${pos}`} aria-hidden>
                        {[48, 36, 24].map((r) => (
                            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#120a04" strokeWidth="5" style={{ filter: "url(#ink-rough)" }} />
                        ))}
                        <circle cx="50" cy="50" r="10" fill="#c4161c" style={{ filter: "url(#ink-rough)" }} />
                    </svg>
                ))}

                <ul className="relative flex flex-wrap justify-center gap-x-5 gap-y-9 sm:gap-x-7 sm:gap-y-11">
                    {TAGS.map((t, i) => (
                        <li key={t.name} style={{ transform: `rotate(${tilt(i)}deg) translateY(${(i % 3) * 4}px)` }}>
                            <div className="skill-tag relative">
                                <span
                                    className="tag-paper paper block rounded-[2px] border-l-4 px-4 py-2 text-base font-black tracking-tight text-ink shadow-[0_8px_18px_rgba(0,0,0,0.45)] sm:text-2xl"
                                    style={{ borderLeftColor: t.accent }}
                                >
                                    {t.name}
                                </span>
                                <span className="tag-star absolute -top-3 left-1/2 -ml-3 text-[#d6d0c4] drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)]">
                                    <Shuriken size={24} />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/35">Training ground</p>
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
    return (
        <section id="skills" className="relative z-10 overflow-x-clip py-32 sm:py-40">
            <div className="mx-auto mb-16 max-w-7xl px-6">
                <SectionHeader number="02" label="Arsenal" title="My arsenal." accent="#22d3ee" />
            </div>

            <TargetBoard />

            <div className="mx-auto mt-24 grid max-w-7xl items-start gap-x-8 gap-y-14 px-8 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((group, i) => (
                    <WeaponScroll key={group.category} group={group} index={i} />
                ))}
            </div>
        </section>
    );
}
