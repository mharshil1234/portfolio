"use client";

import { useRef } from "react";
import { FaArrowRight, FaCheck, FaExternalLinkAlt, FaGithub, FaHourglassHalf, FaLock } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, socials, type Project } from "@/data/content";
import { Magnetic } from "@/components/ui/motion";
import { Hanko, SectionHeader } from "@/components/ui/ninja";

const github = socials.find((s) => s.label === "GitHub")!.href;

/** A horizontal makimono scroll: wooden rods at each end, rice paper between. */
function MissionScroll({ project, index }: { project: Project; index: number }) {
    const privateRepo = project.links.length === 0;

    return (
        <article className="project-card relative flex w-full shrink-0 md:min-h-[min(58vh,28rem)] md:w-[min(44rem,72vw)]">
            <div className="rod-l rod absolute -bottom-3 -top-3 left-0 z-10 w-4 rounded-full" />
            <div className="rod-r rod absolute -bottom-3 -top-3 right-0 z-10 w-4 rounded-full" />

            <div className="paper-body paper relative mx-3 flex flex-1 flex-col overflow-hidden px-8 py-8 text-ink sm:px-10 sm:py-10">
                {/* Mission number in brush ink */}
                <span className="pointer-events-none absolute -right-2 -top-6 select-none text-[9rem] font-black leading-none text-ink/[0.06]">
                    {index + 1}
                </span>

                <p className="relative flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
                    <span className="flex items-center gap-3 whitespace-nowrap">
                        <span className="h-2.5 w-2.5 rotate-45" style={{ background: project.accent }} />
                        Mission {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden h-px w-6 bg-current opacity-40 lg:block" />
                    <span className="basis-full lg:basis-auto">{project.subtitle}</span>
                </p>
                <h3 className="relative mt-3 text-4xl font-black tracking-tight sm:text-6xl">{project.name}</h3>
                <p className="relative mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{project.description}</p>

                <ul className="relative mt-7 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <li key={t} className="rounded-sm border border-ink/20 bg-ink/[0.04] px-2.5 py-1 text-xs font-medium text-ink/80">
                            {t}
                        </li>
                    ))}
                </ul>

                <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
                    <div className="flex flex-wrap gap-3">
                        {privateRepo && (
                            <span className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-4 py-2 text-sm text-ink/55">
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
                                className="inline-flex items-center gap-2 rounded-sm border border-ink/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                            >
                                {link.label === "Live" ? <FaExternalLinkAlt size={12} /> : <FaGithub size={14} />}
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="mission-seal flex flex-col items-center gap-1.5">
                        <Hanko size={58} rotate={index % 2 ? 7 : -7}>
                            {project.inProgress ? <FaHourglassHalf size={22} /> : <FaCheck size={24} />}
                        </Hanko>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-seal/80">
                            {project.inProgress ? "In progress" : "Complete"}
                        </span>
                    </div>
                </div>
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

            /** Unroll: paper opens from the centre while the two rods slide apart; then the seal stamps. */
            const unroll = (card: HTMLElement, scrollTrigger: ScrollTrigger.Vars, scrub: boolean) => {
                const half = () => card.offsetWidth / 2 - 8;
                const tl = gsap.timeline({ scrollTrigger: { ...scrollTrigger, scrub: scrub ? true : undefined } });
                tl.fromTo(card.querySelector(".paper-body"), { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 0)
                    .fromTo(card.querySelector(".rod-l"), { x: half }, { x: 0, ease: "power2.out" }, 0)
                    .fromTo(card.querySelector(".rod-r"), { x: () => -half() }, { x: 0, ease: "power2.out" }, 0)
                    .fromTo(
                        card.querySelector(".mission-seal"),
                        { scale: 2.4, opacity: 0, rotate: -20 },
                        { scale: 1, opacity: 1, rotate: 0, ease: "power4.in", duration: 0.25 },
                        scrub ? 0.85 : ">-0.1",
                    );
                if (!scrub) tl.duration(1.2);
                return tl;
            };

            // Desktop: pin the section and scroll the scrolls horizontally.
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

                gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) =>
                    unroll(card, { trigger: card, containerAnimation: tween, start: "left 92%", end: "left 45%" }, true),
                );

                gsap.to(".projects-bar", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
                });
            });

            // Mobile: each scroll unrolls once as it enters.
            mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => unroll(card, { trigger: card, start: "top 85%" }, false));
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <section id="projects" ref={root} className="relative z-10 overflow-hidden py-24 md:flex md:h-screen md:items-center md:py-0">
            <div ref={track} className="flex flex-col gap-12 px-6 md:flex-row md:items-stretch md:gap-12 md:pl-[8vw] md:pr-[8vw]">
                {/* Intro panel */}
                <div className="flex shrink-0 flex-col justify-center md:w-[min(30rem,48vw)]">
                    <SectionHeader number="04" label="Missions" title="Completed missions." accent="#fbbf24" />
                    <p className="mt-6 max-w-sm text-white/60">
                        Things I&apos;ve built and shipped, from contest infrastructure to real-time social apps.
                    </p>
                    <p className="mt-3 hidden items-center gap-1.5 text-sm text-white/40 md:flex">
                        Keep scrolling <FaArrowRight size={11} />
                    </p>
                </div>

                {projects.map((p, i) => (
                    <MissionScroll key={p.name} project={p} index={i} />
                ))}

                {/* Outro panel */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-6 text-center md:w-[min(26rem,35vw)]">
                    <p className="text-3xl font-black tracking-tight sm:text-4xl">More missions on GitHub.</p>
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
                <div className="projects-bar h-full origin-left scale-x-0 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300" />
            </div>
        </section>
    );
}
