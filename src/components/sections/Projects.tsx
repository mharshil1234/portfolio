"use client";

import { useRef } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, socials, type Project } from "@/data/content";
import { Magnetic, RevealHeading } from "@/components/ui/motion";

const github = socials.find((s) => s.label === "GitHub")!.href;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <article
            className="project-card group relative flex w-full shrink-0 md:h-[min(62vh,34rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c] p-8 sm:p-10 md:w-[min(42rem,70vw)]"
            style={{ ["--accent" as string]: project.accent }}
        >
            {/* Accent glow + giant index number */}
            <div
                className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: project.accent }}
            />
            <span
                className="project-num pointer-events-none absolute -right-4 -top-10 select-none text-[12rem] font-black leading-none tracking-tighter opacity-10"
                style={{ color: project.accent }}
            >
                0{index + 1}
            </span>

            <p className="relative font-mono text-xs uppercase tracking-[0.25em]" style={{ color: project.accent }}>
                {project.subtitle}
            </p>
            <h3 className="relative mt-3 text-4xl font-black tracking-tight sm:text-6xl">{project.name}</h3>
            <p className="relative mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{project.description}</p>

            <ul className="relative mt-8 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                        {t}
                    </li>
                ))}
            </ul>

            <div className="relative mt-auto flex flex-wrap gap-3 pt-10">
                {project.links.length === 0 && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/50">
                        <FaLock size={12} /> Private repo
                    </span>
                )}
                {project.links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label === "Live" ? `${project.name} live site` : `${project.name} ${link.label} on GitHub`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                    >
                        {link.label === "Live" ? <FaExternalLinkAlt size={12} /> : <FaGithub size={14} />}
                        {link.label}
                    </a>
                ))}
            </div>
        </article>
    );
}

export function Projects() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Desktop: pin the section and scroll the cards horizontally.
            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                const el = track.current!;
                const distance = () => el.scrollWidth - window.innerWidth;

                const tween = gsap.to(el, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top top",
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Each card tilts/scales into focus as it crosses the viewport
                gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
                    gsap.fromTo(
                        card,
                        { rotateY: -18, scale: 0.88, opacity: 0.4 },
                        {
                            rotateY: 0,
                            scale: 1,
                            opacity: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: tween,
                                start: "left 95%",
                                end: "left 45%",
                                scrub: true,
                            },
                        },
                    );
                    gsap.to(card.querySelector(".project-num"), {
                        xPercent: -40,
                        ease: "none",
                        scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
                    });
                });

                gsap.to(".projects-bar", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
                });
            });

            // Mobile / reduced motion: simple vertical reveal.
            mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
                gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
                    gsap.from(card, { y: 60, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%" } });
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <section id="projects" ref={root} className="relative z-10 overflow-hidden py-24 md:flex md:h-screen md:items-center md:py-0">
            <div ref={track} className="flex flex-col gap-8 px-6 md:flex-row md:items-stretch md:gap-10 md:pl-[8vw] md:pr-[8vw] md:[perspective:1400px]">
                {/* Intro panel */}
                <div className="flex shrink-0 flex-col justify-center md:w-[min(30rem,40vw)]">
                    <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-amber-300">04 — Projects</p>
                    <RevealHeading text="Selected work." className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl" />
                    <p className="mt-6 max-w-sm text-white/60">
                        Things I&apos;ve built and shipped — from contest infrastructure to real-time social apps.
                        <span className="hidden md:inline"> Keep scrolling →</span>
                    </p>
                </div>

                {projects.map((p, i) => (
                    <ProjectCard key={p.name} project={p} index={i} />
                ))}

                {/* Outro panel */}
                <div className="flex shrink-0 flex-col items-start justify-center gap-6 md:w-[min(26rem,35vw)] md:items-center md:text-center">
                    <p className="text-3xl font-black tracking-tight sm:text-4xl">Want to see more?</p>
                    <Magnetic>
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-white text-black transition-transform hover:scale-105"
                        >
                            <FaGithub size={28} />
                            <span className="flex items-center gap-1 text-sm font-bold">
                                My GitHub <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                    </Magnetic>
                </div>
            </div>

            <div className="absolute inset-x-[8vw] bottom-10 hidden h-px bg-white/10 md:block">
                <div className="projects-bar h-full origin-left scale-x-0 bg-gradient-to-r from-orange-400 via-cyan-300 to-amber-300" />
            </div>
        </section>
    );
}
