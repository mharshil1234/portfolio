"use client";

import { useLenis } from "lenis/react";
import { FaArrowUp } from "react-icons/fa";
import { socials } from "@/data/content";
import { Magnetic } from "@/components/ui/motion";
import { Hanko } from "@/components/ui/ninja";

export function Footer() {
    const lenis = useLenis();

    return (
        <footer className="relative z-10 border-t border-white/10 px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                    <Hanko size={36}>HM</Hanko>
                    <p className="font-mono text-[11px] text-white/30">psst, double-click anywhere.</p>
                </div>
                <ul className="flex gap-5 text-sm text-white/60">
                    {socials.map((s) => (
                        <li key={s.label}>
                            <a
                                href={s.href}
                                target={s.href.startsWith("http") ? "_blank" : undefined}
                                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="transition-colors hover:text-white"
                            >
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <Magnetic>
                    <button
                        onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                        aria-label="Scroll to top"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white hover:text-black"
                    >
                        <FaArrowUp />
                    </button>
                </Magnetic>
            </div>
        </footer>
    );
}
