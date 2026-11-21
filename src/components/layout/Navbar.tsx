"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, profile } from "@/data/content";

export function Navbar() {
    const lenis = useLenis();
    const [active, setActive] = useState<string>("hero");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    // Section picked from the mobile menu, scrolled to once the menu has closed.
    const pending = useRef<HTMLElement | null>(null);

    // Hide when scrolling down, reveal when scrolling up.
    useLenis(({ scroll, direction }) => {
        setScrolled(scroll > 40);
        setHidden(direction === 1 && scroll > 400 && !open);
    });

    // Track which section is centred in the viewport.
    useEffect(() => {
        const els = ["hero", ...navSections.map((s) => s.id)]
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
            },
            { rootMargin: "-45% 0px -45% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    // The menu stops Lenis while open (a stopped Lenis ignores scrollTo, and the page
    // layout is different while stopped). So a link tapped in the menu is only scrolled
    // to here, after the menu has closed and Lenis is running again.
    useEffect(() => {
        if (open) {
            lenis?.stop();
            return;
        }
        lenis?.start();
        const target = pending.current;
        if (!target) return;
        pending.current = null;
        const id = requestAnimationFrame(() => {
            if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4, force: true });
            else target.scrollIntoView({ behavior: "smooth" });
        });
        return () => cancelAnimationFrame(id);
    }, [open, lenis]);

    const go = (id: string) => {
        const target = document.getElementById(id);
        if (!target) return;
        if (open) {
            pending.current = target;
            setOpen(false);
        } else if (lenis) {
            lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5"
            >
                <nav
                    className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-500 ${
                        scrolled ? "border-white/10 bg-[#050505]/70 backdrop-blur-xl" : "border-transparent"
                    }`}
                >
                    <button
                        onClick={() => go("hero")}
                        className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-[6px] bg-seal text-sm font-black tracking-tight text-paper shadow-[0_4px_14px_rgba(196,22,28,0.4)] transition-transform [filter:url(#ink-rough)] hover:rotate-0"
                        aria-label="Back to top"
                    >
                        HM
                    </button>

                    <ul className="hidden items-center gap-1 md:flex">
                        {navSections.map((s) => (
                            <li key={s.id}>
                                <button
                                    onClick={() => go(s.id)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                                        active === s.id ? "text-black" : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    {active === s.id && (
                                        <motion.span
                                            layoutId="nav-brush"
                                            className="brush-swipe absolute -inset-x-1 inset-y-0 -z-10"
                                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-sm font-semibold md:inline-block"
                    >
                        Resume
                    </a>

                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="block h-0.5 w-6 bg-white" />
                        <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="block h-0.5 w-6 bg-white" />
                    </button>
                </nav>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 flex flex-col justify-center bg-gradient-to-br from-red-800 via-[#3a0d0d] to-[#050505] px-8 md:hidden"
                    >
                        {navSections.map((s, i) => (
                            <motion.button
                                key={s.id}
                                onClick={() => go(s.id)}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                                className="py-2 text-left text-5xl font-black tracking-tight"
                            >
                                {s.label}
                            </motion.button>
                        ))}
                        <motion.a
                            href={profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 self-start rounded-full bg-white px-6 py-3 font-semibold text-black"
                        >
                            View Resume
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
