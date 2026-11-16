"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";
import { Magnetic, RevealHeading } from "@/components/ui/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-56 animate-pulse rounded-full bg-orange-500/20 blur-2xl" />
        </div>
    ),
});

export function Hero() {
    const root = useRef<HTMLElement>(null);
    const lenis = useLenis();

    useGSAP(
        () => {
            gsap.from(".hero-fade", { opacity: 0, y: 24, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.7 });

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Scroll away: content scales down, blurs and drifts up; 3D layer scales up
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
                });
                tl.to(".hero-content", { yPercent: -35, scale: 0.88, opacity: 0, filter: "blur(10px)", ease: "none" }, 0)
                    .to(".hero-canvas", { scale: 1.25, yPercent: 15, ease: "none" }, 0)
                    .to(".hero-scroll", { opacity: 0, ease: "none", duration: 0.2 }, 0);
            });
            return () => mm.revert();
        },
        { scope: root },
    );

    const goTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) lenis?.scrollTo(el, { duration: 1.4 });
    };

    return (
        <section id="hero" ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden">
            <div className="hero-canvas absolute inset-0 will-change-transform [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
                <HeroScene />
            </div>

            {/* Text overlay. pointer-events-none so the 3D shapes underneath stay interactive */}
            <div className="hero-content pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:pb-28">
                <p className="hero-fade mb-3 font-mono text-sm uppercase tracking-[0.3em] text-white/60">
                    Hi, I&apos;m — {profile.role}
                </p>
                <RevealHeading
                    as="h1"
                    onLoad
                    delay={0.2}
                    text={profile.firstName}
                    className="text-[14.5vw] font-black leading-[0.85] tracking-[-0.05em] sm:text-[14vw] lg:text-[13rem]"
                />
                <RevealHeading
                    as="p"
                    onLoad
                    delay={0.35}
                    text={profile.lastName}
                    className="text-stroke text-[14.5vw] font-black leading-[0.85] tracking-[-0.05em] sm:text-[14vw] lg:text-[13rem]"
                />
                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <p className="hero-fade max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{profile.tagline}</p>
                    <div className="hero-fade pointer-events-auto flex gap-3">
                        <Magnetic>
                            <button
                                onClick={() => goTo("projects")}
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                            >
                                See my work
                            </button>
                        </Magnetic>
                        <Magnetic>
                            <button
                                onClick={() => goTo("contact")}
                                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10"
                            >
                                Say hello
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>

            <div className="hero-scroll pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                <span>Scroll</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/15">
                    <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-line bg-white" />
                </span>
            </div>

            <p className="hero-fade pointer-events-none absolute right-6 top-28 z-10 hidden max-w-[12rem] text-right font-mono text-xs text-white/40 md:block">
                psst — move your cursor through me
            </p>
        </section>
    );
}
