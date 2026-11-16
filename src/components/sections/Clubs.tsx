"use client";

import Image from "next/image";
import { FiCalendar, FiExternalLink, FiGithub, FiLinkedin } from "react-icons/fi";
import { clubs } from "@/data/content";
import { Magnetic, RevealHeading, Stagger, TiltCard } from "@/components/ui/motion";

export function Clubs() {
    return (
        <section id="clubs" className="relative z-10 px-6 py-32 sm:py-40">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-red-300">03 — Clubs</p>
                <RevealHeading text="Clubs & communities." className="mb-16 text-5xl font-black tracking-tight sm:text-7xl" />

                <Stagger className="grid gap-8 md:grid-cols-2" y={80} stagger={0.15}>
                    {clubs.map((club) => (
                        <TiltCard key={club.name} className="reveal rounded-[2rem]" glare={`${club.accent}40`}>
                            <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                                <div
                                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
                                    style={{ background: club.accent }}
                                />
                                <div className="relative flex items-start justify-between [transform:translateZ(50px)]">
                                    <div className="relative h-20 w-20">
                                        <Image src={club.image} alt={`${club.name} logo`} fill sizes="80px" className="object-contain drop-shadow-xl" />
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                                        <FiCalendar />
                                        {club.period}
                                    </span>
                                </div>
                                <h3 className="relative mt-8 text-3xl font-black tracking-tight [transform:translateZ(35px)]">{club.name}</h3>
                                <p className="relative mt-4 leading-relaxed text-white/70 [transform:translateZ(20px)]">{club.description}</p>
                                <div className="relative mt-8 flex gap-3 [transform:translateZ(40px)]">
                                    {[
                                        { href: club.website, icon: <FiExternalLink />, label: "Website" },
                                        { href: club.github, icon: <FiGithub />, label: "GitHub" },
                                        { href: club.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
                                    ].map((l) => (
                                        <Magnetic key={l.label}>
                                            <a
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${club.name} ${l.label}`}
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg transition-colors hover:bg-white hover:text-black"
                                            >
                                                {l.icon}
                                            </a>
                                        </Magnetic>
                                    ))}
                                </div>
                            </article>
                        </TiltCard>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
