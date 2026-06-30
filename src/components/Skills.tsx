import React, { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";


const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const card: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        rotateX: 15,
        perspective: 1000,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const pillContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

const getPillVariants = (index: number): Variants => ({
    hidden: {
        opacity: 0,
        scale: 0.3,
        x: index % 2 === 0 ? -120 - (index % 5) * 20 : 120 + (index % 5) * 20,
        y: 60 + (index % 4) * 15,
        rotate: index % 2 === 0 ? -15 : 15,
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100 + (index % 3) * 30,
            damping: 12 + (index % 3) * 2,
            mass: 0.6 + (index % 3) * 0.1,
        },
    },
});



const accentColors = [
    { border: "border-t-purple-500/40", glow: "rgba(168,85,247,0.06)", chipHover: "hover:border-purple-500/30 hover:bg-purple-500/5" },
    { border: "border-t-cyan-500/40", glow: "rgba(6,182,212,0.06)", chipHover: "hover:border-cyan-500/30 hover:bg-cyan-500/5" },
    { border: "border-t-emerald-500/40", glow: "rgba(16,185,129,0.06)", chipHover: "hover:border-emerald-500/30 hover:bg-emerald-500/5" },
    { border: "border-t-amber-500/40", glow: "rgba(245,158,11,0.06)", chipHover: "hover:border-amber-500/30 hover:bg-amber-500/5" },
];

const Skills = forwardRef<HTMLElement>((_, ref) => {
    const skills = [
        { category: "Languages", items: ["Java", "C++", "JavaScript", "TypeScript", "Python"] },
        { category: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"] },
        { category: "Backend", items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"] },
        { category: "Tools & DevOps", items: ["Git", "Docker", "Linux", "Bash", "Vercel", "VS Code"] },
    ];

    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="relative mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold text-center"
                >
                    <span className="text-white">Skills</span>
                    <span className="block mx-auto mt-2 w-12 h-0.5 bg-purple-500/60 rounded-full" />
                </motion.h2>
                </div>

                <div className="flex justify-center" style={{ perspective: "1200px" }}>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl"
                    >
                        {skills.map((skillGroup, groupIndex) => {
                            const accent = accentColors[groupIndex];
                            return (
                            <motion.div
                                key={groupIndex}
                                variants={card}
                                whileHover={{
                                    y: -5,
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                                className={`group bg-gray-800/30 backdrop-blur-sm border border-white/[0.06] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-t-2 ${accent.border}`}
                                style={{ boxShadow: `0 0 0 0 ${accent.glow}` }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 30px ${accent.glow}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 0 0 ${accent.glow}`;
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)` }} />
                                <div className="absolute -inset-1 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow.replace('0.06', '0.10')}, transparent 70%)` }} />

                                <div className="relative z-10">
                                    <motion.h3
                                        className="text-2xl font-bold mb-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
                                    >
                                        {skillGroup.category}
                                    </motion.h3>

                                    <motion.div
                                        variants={pillContainer}
                                        className="flex flex-wrap gap-3"
                                    >
                                        {skillGroup.items.map((skill, i) => {
                                            const globalIdx = skills
                                                .slice(0, groupIndex)
                                                .reduce((s, g) => s + g.items.length, 0) + i;
                                            return (
                                                <motion.span
                                                    key={skill}
                                                    variants={getPillVariants(globalIdx)}
                                                    whileHover={{
                                                        scale: 1.06,
                                                        y: -2,
                                                        transition: { type: "spring", stiffness: 400, damping: 10 },
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-4 py-2 bg-white/[0.06] border border-white/[0.08] text-gray-200 rounded-full text-sm font-medium cursor-pointer backdrop-blur-sm transition-all duration-300 ${accent.chipHover}`}
                                                >
                                                    {skill}
                                                </motion.span>
                                            );
                                        })}
                                    </motion.div>
                                </div>
                            </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

Skills.displayName = "Skills";

export { Skills };
