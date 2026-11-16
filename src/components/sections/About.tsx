"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";
import { ScrubText, TiltCard } from "@/components/ui/motion";
import { Hanko, SectionHeader, Shuriken } from "@/components/ui/ninja";

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
                    { yPercent: -10, scale: 1.2 },
                    {
                        yPercent: 10,
                        scale: 1.08,
                        ease: "none",
                        scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: true },
                    },
                );
                // Ink wash reveal: the frame bleeds in from top to bottom
                gsap.from(".about-frame", {
                    clipPath: "inset(0% 0% 100% 0%)",
                    duration: 1.4,
                    ease: "expo.inOut",
                    scrollTrigger: { trigger: ".about-frame", start: "top 85%" },
                });
            });

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
                <TiltCard className="mx-auto w-full max-w-md" max={6}>
                    <div className="about-frame relative aspect-[4/5] overflow-hidden bg-white/5">
                        <Image
                            src={profile.photo}
                            alt={profile.name}
                            fill
                            sizes="(min-width: 768px) 40vw, 90vw"
                            className="about-photo object-cover grayscale-[35%] will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.7))]" />
                    </div>
                    {/* Torn ink-brush frame over the photo edges */}
                    <div className="pointer-events-none absolute -inset-2 border-[14px] border-[#050505] [filter:url(#ink-rough)]" aria-hidden />
                    <div className="absolute -right-5 -top-5 [transform:translateZ(60px)]">
                        <Hanko size={92} rotate={-8} stamp>
                            <Shuriken size={52} />
                        </Hanko>
                    </div>
                </TiltCard>

                <div>
                    <SectionHeader number="01" label="The Shinobi" title="I make the web feel alive." className="mb-10" />
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
