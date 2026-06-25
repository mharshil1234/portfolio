"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import { HMLogo } from "./HMLogo";
import { ShatterPhoto } from "./ShatterPhoto";
import { ScrambleText } from "./ScrambleText";
import { TransitionDots } from "./TransitionDots";

const NAME = "Harshil Maheshwari";
const ROLE = "Full Stack Developer";

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const wordReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
    const [typedRole, setTypedRole] = useState("");

    useEffect(() => {
        const totalNameDuration = 1400;

        const startTyping = setTimeout(() => {
            let index = 0;

            const interval = setInterval(() => {
                setTypedRole(ROLE.slice(0, index + 1));
                index++;

                if (index === ROLE.length) {
                    clearInterval(interval);
                }
            }, 60);

            return () => clearInterval(interval);
        }, totalNameDuration);

        return () => clearTimeout(startTyping);
    }, []);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <TransitionDots />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center justify-center"
                    >
                        <ShatterPhoto />
                    </motion.div>

                    <div className="relative max-w-2xl">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-[0.08] scale-125 pointer-events-none">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                <HMLogo />
                            </motion.div>
                        </div>

                        <div className="relative z-10">
                            <motion.p
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="text-lg mb-4"
                            >
                                Hi, I'm
                            </motion.p>

                            {/* Name */}
                            <h1 className="text-5xl sm:text-7xl font-bold leading-none mb-3 tracking-wide">
                                {NAME.split(" ").map((word, i) => (
                                    <span key={i} className="block">
                                        <ScrambleText text={word} />
                                    </span>
                                ))}
                            </h1>

                            {/* Typewriter */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                                className="text-xl text-gray-400 mb-6 h-8"
                            >
                                {typedRole}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                                >
                                    |
                                </motion.span>
                            </motion.p>

                            {/* Description with word reveal */}
                            <motion.p
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="text-lg text-gray-300 leading-relaxed mb-8"
                            >
                                {"Passionate about building software that solves real problems. I enjoy learning new technologies, exploring ideas and turning them into meaningful projects."
                                    .split(" ")
                                    .map((word, i) => (
                                        <motion.span key={i} variants={wordReveal} className="inline-block mr-1.5">
                                            {word}
                                        </motion.span>
                                    ))}
                            </motion.p>

                            {/* Socials */}
                            <div className="flex gap-6">
                                {[
                                    { icon: <FaGithub size={28} />, href: "https://github.com/mharshil1234", color: "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]" },
                                    { icon: <FaLinkedin size={28} />, href: "https://www.linkedin.com/in/harshil-maheshwari/", color: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
                                    { icon: <FaEnvelope size={28} />, href: "mailto:mharshil1234@gmail.com", color: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]" },
                                ].map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 2.0 + index * 0.15, duration: 0.3 }}
                                        whileHover={{
                                            y: -6,
                                            scale: 1.2,
                                            transition: { type: "spring", stiffness: 400, damping: 10 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gray-800/50 backdrop-blur-sm border border-white/10 transition-all duration-300 ${item.color}`}
                                    >
                                        {item.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

AboutMe.displayName = "AboutMe";

export { AboutMe };
