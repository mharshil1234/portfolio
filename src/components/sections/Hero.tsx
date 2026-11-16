"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/content";
import { useIntroDone } from "@/lib/intro";
import { Magnetic, RevealHeading } from "@/components/ui/motion";
import { NinjaStage } from "@/components/ninja/NinjaStage";

export function Hero() {
    const root = useRef<HTMLElement>(null);
    const lenis = useLenis();
    const introDone = useIntroDone();

    // Supporting copy fades in once the intro has burned away
    useGSAP(
        () => {
            if (!introDone) {
                gsap.set(".hero-fade", { opacity: 0, y: 24 });
                return;
            }
            gsap.fromTo(".hero-fade", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.5 });
        },
        { scope: root, dependencies: [introDone], revertOnUpdate: true },
    );

    useGSAP(
        () => {

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Scroll away: content scales down, blurs and drifts up; the ninja sinks and grows
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
                });
                tl.to(".hero-content", { yPercent: -35, scale: 0.88, opacity: 0, filter: "blur(10px)", ease: "none" }, 0)
                    .to(".hero-ninja", { scale: 1.12, opacity: 0.25, transformOrigin: "50% 100%", ease: "none" }, 0);
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
            {/* Same stage + position as the intro, so the paper burns away onto this exact ninja */}
            <div className="hero-ninja absolute inset-0 opacity-60 will-change-transform md:opacity-100">
                <NinjaStage variant="hero" />
            </div>

            <div className="hero-content pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:pb-28">
                <p className="hero-fade mb-3 font-mono text-sm uppercase tracking-[0.3em] text-white/60">
                    {profile.role}
                </p>
                <RevealHeading
                    as="h1"
                    onLoad
                    play={introDone}
                    delay={0.2}
                    text={profile.firstName}
                    className="text-[14.5vw] font-black leading-[0.85] tracking-[-0.05em] sm:text-[14vw] lg:text-[11rem]"
                />
                <RevealHeading
                    as="p"
                    onLoad
                    play={introDone}
                    delay={0.35}
                    text={profile.lastName}
                    className="text-stroke text-[14.5vw] font-black leading-[0.85] tracking-[-0.05em] sm:text-[14vw] lg:text-[11rem]"
                />
                <div className="mt-8 flex flex-col items-start gap-6">
                    <p className="hero-fade max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{profile.tagline}</p>
                    <div className="hero-fade pointer-events-auto flex flex-wrap gap-3">
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
                        <Magnetic>
                            <a
                                href={profile.resume}
                                download
                                className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                            >
                                Resume
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>

        </section>
    );
}
