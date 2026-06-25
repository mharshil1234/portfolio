import React, { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const card = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
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
        scale: 0.4,
        x:
            index % 2 === 0
                ? -160 - (index % 5) * 30
                : 160 + (index % 5) * 30,
        y: 80 + (index % 4) * 20,
        rotate: index % 2 === 0 ? -20 : 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
            transition: {
                type: "spring" as "spring",
                stiffness: 80 + (index % 3) * 20,
                damping: 10 + (index % 3) * 2,
                mass: 0.7 + (index % 3) * 0.1,
            },
    },
});

const Skills = forwardRef<HTMLElement>((_, ref) => {
    const skills = [
        {
            category: "Frontend",
            items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
        },
        {
            category: "Backend",
            items: ["Node.js", "Express.js"],
        },
        {
            category: "Databases",
            items: ["Redis", "MongoDB", "PostgreSQL"],
        },
        {
            category: "Programming Languages",
            items: ["JavaScript", "TypeScript", "Java", "C++"],
        },
        {
            category: "Tools & Platforms",
            items: ["Docker", "Git", "Linux"],
        },
    ];

    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold mb-12 text-center"
                >
                    Skills
                </motion.h2>

                <div className="flex justify-center">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl"
                    >
                        {skills.map((skillGroup, groupIndex) => (
                            <motion.div
                                key={groupIndex}
                                variants={card}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 },
                                }}
                                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl"
                            >
                                <h3 className="text-2xl font-bold mb-6">
                                    {skillGroup.category}
                                </h3>

                                <motion.div
                                    variants={pillContainer}
                                    className="flex flex-wrap gap-3"
                                >
                                    {skillGroup.items.map((skill, i) => {
                                        const globalIdx =
                                            skills
                                                .slice(0, groupIndex)
                                                .reduce(
                                                    (s, g) =>
                                                        s + g.items.length,
                                                    0
                                                ) + i;
                                        return (
                                            <motion.span
                                                key={skill}
                                                variants={getPillVariants(
                                                    globalIdx
                                                )}
                                                whileHover={{
                                                    scale: 1.1,
                                                    y: -2,
                                                }}
                                                whileTap={{
                                                    scale: 0.95,
                                                }}
                                                className="px-4 py-2 bg-white/10 border border-white/10 text-gray-200 rounded-full text-sm font-medium cursor-pointer"
                                            >
                                                {skill}
                                            </motion.span>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

Skills.displayName = "Skills";

export { Skills };
