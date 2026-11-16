"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";
import { RevealHeading, ScrubText, TiltCard } from "@/components/ui/motion";

const STATS = [
    { value: 500, suffix: "+", label: "live contestants on Cookoff" },
    { value: 1000, suffix: "+", label: "hackathon participants judged" },
    { value: 4, suffix: "", label: "shipped projects featured" },
];

export function About() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Photo parallax inside its frame
                gsap.fromTo(
                    ".about-photo",
                    { yPercent: -12, scale: 1.2 },
                    {
                        yPercent: 12,
                        scale: 1.05,
                        ease: "none",
                        scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: true },
                    },
                );
                // Frame clip-path wipe in
                gsap.from(".about-frame", {
                    clipPath: "inset(100% 0% 0% 0% round 2rem)",
                    duration: 1.4,
                    ease: "expo.inOut",
                    scrollTrigger: { trigger: ".about-frame", start: "top 85%" },
                });
                // Floating sticker spins with scroll
                gsap.to(".about-sticker", {
                    rotate: 360,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
                });
            });

            // Counters (run regardless of motion preference, just instantly if reduced)
            gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
                const end = Number(el.dataset.value);
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: end,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 90%" },
                    onUpdate: () => {
                        el.textContent = Math.round(obj.v).toLocaleString();
                    },
                });
            });
        },
        { scope: root },
    );

    return (
        <section id="about" ref={root} className="relative z-10 px-6 py-32 sm:py-40">
            <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[5fr_7fr] lg:gap-24">
                <TiltCard className="mx-auto w-full max-w-md rounded-[2rem]" max={8}>
                    <div className="about-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                        <Image
                            src={profile.photo}
                            alt={profile.name}
                            fill
                            sizes="(min-width: 768px) 40vw, 90vw"
                            className="about-photo object-cover will-change-transform"
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
                    </div>
                    <div className="absolute -right-6 -top-6 [transform:translateZ(60px)]">
                        <div
                            className="about-sticker flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 text-center text-xs font-black uppercase leading-tight text-black shadow-xl"
                            data-cursor
                        >
                            Full
                            <br />
                            Stack
                            <br />
                            Dev ✦
                        </div>
                    </div>
                </TiltCard>

                <div>
                    <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-orange-300">01 — About</p>
                    <RevealHeading
                        text="I make the web feel alive."
                        className="mb-10 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl"
                    />
                    <ScrubText text={profile.about} className="text-2xl font-medium leading-snug text-white sm:text-3xl" />

                    <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <p className="text-4xl font-black tracking-tight sm:text-5xl">
                                    <span className="stat-num" data-value={s.value}>
                                        {s.value.toLocaleString()}
                                    </span>
                                    <span className="text-orange-400">{s.suffix}</span>
                                </p>
                                <p className="mt-2 text-xs leading-snug text-white/50 sm:text-sm">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
