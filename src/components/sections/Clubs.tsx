"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiCalendar, FiExternalLink, FiGithub, FiLinkedin } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { clubs } from "@/data/content";
import { Magnetic } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/ninja";

/** A nobori war banner: unfurls downward on scroll, then sways gently on its pole. */
function ClanBanner({ club, index }: { club: (typeof clubs)[number]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" }, delay: index * 0.2 })
                    .from(".banner-cloth", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "power3.inOut" })
                    .from(".banner-content > *", { opacity: 0, y: 14, stagger: 0.06, duration: 0.4 }, "-=0.4");
                gsap.to(".banner-sway", {
                    rotate: index % 2 ? -0.8 : 0.8,
                    skewY: index % 2 ? 0.4 : -0.4,
                    transformOrigin: "0% 0%",
                    duration: 3 + index,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    const links = [
        { href: club.website, icon: <FiExternalLink />, label: "Website" },
        { href: club.github, icon: <FiGithub />, label: "GitHub" },
        { href: club.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
    ];

    return (
        <div ref={ref} className="relative pl-4">
            {/* pole + crossbar */}
            <div className="rod absolute -bottom-10 left-0 top-0 w-3 rounded-full" />
            <div className="rod-h absolute left-0 right-2 top-0 z-10 h-3 rounded-full" />
            <div className="absolute -left-1 -top-3 z-10 h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-700" />

            <div className="banner-sway pt-3">
                <article
                    className="banner-cloth relative overflow-hidden bg-[#111] pb-14 [clip-path:polygon(0_0,100%_0,100%_100%,50%_93%,0_100%)]"
                    style={{ boxShadow: `inset 6px 0 0 ${club.accent}` }}
                >
                    {/* Accent header band with the clan crest (logo) */}
                    <div className="relative flex h-32 items-center justify-center" style={{ background: `${club.accent}26` }}>
                        <div className="relative h-20 w-20 rounded-full bg-paper p-3 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]">
                            <div className="relative h-full w-full">
                                <Image src={club.image} alt={`${club.name} logo`} fill sizes="80px" className="object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="banner-content relative px-8 pt-8 sm:px-10">
                        <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                            <FiCalendar />
                            {club.period}
                        </span>
                        <h3 className="mt-5 text-3xl font-black tracking-tight">{club.name}</h3>
                        <p className="mt-4 leading-relaxed text-white/70">{club.description}</p>
                        <div className="mt-8 flex gap-3">
                            {links.map((l) => (
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
                    </div>
                </article>
            </div>
        </div>
    );
}

export function Clubs() {
    return (
        <section id="clubs" className="relative z-10 px-6 py-32 sm:py-40">
            <div className="mx-auto max-w-6xl">
                <SectionHeader number="03" label="Clans" title="Clans & dojos." accent="#f87171" className="mb-20" />
                <div className="grid gap-16 md:grid-cols-2 md:gap-12">
                    {clubs.map((club, i) => (
                        <ClanBanner key={club.name} club={club} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
