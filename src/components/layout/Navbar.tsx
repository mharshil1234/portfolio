"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, profile } from "@/data/content";

export function Navbar() {
    const lenis = useLenis();
    const [active, setActive] = useState<string>("hero");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        if (open) lenis?.stop();
        else lenis?.start();
    }, [open, lenis]);

    const go = (id: string) => {
        setOpen(false);
        const target = document.getElementById(id);
        if (!target) return;
        if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
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
                        scrolled ? "border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl" : "border-transparent"
                    }`}
                >
                    <button
                        onClick={() => go("hero")}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black tracking-tight text-black"
                        aria-label="Back to top"
                    >
                        HM
                    </button>

                    <ul className="hidden items-center gap-1 md:flex">
                        {navSections.map((s) => (
                            <li key={s.id}>
                                <button
                                    onClick={() => go(s.id)}
                                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        active === s.id ? "text-black" : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    {active === s.id && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-white"
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
                        download
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
                        className="fixed inset-0 z-40 flex flex-col justify-center bg-gradient-to-br from-orange-600 via-red-700 to-[#0a0a0a] px-8 md:hidden"
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
                            download
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 self-start rounded-full bg-white px-6 py-3 font-semibold text-black"
                        >
                            Download Resume
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
