import React, { forwardRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const Projects = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold mb-12 text-center"
                >
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                        Projects
                    </span>
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center space-y-8"
                >
                    <motion.div
                        variants={item}
                        className="group relative bg-gray-800/30 backdrop-blur-sm p-12 rounded-2xl border border-white/[0.06] max-w-2xl w-full text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-cyan-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-400/20 flex items-center justify-center"
                            >
                                <FaGithub className="text-3xl text-purple-400" />
                            </motion.div>

                            <motion.h3
                                variants={item}
                                className="text-3xl font-bold mb-4"
                            >
                                Yet to be Displayed
                            </motion.h3>

                            <motion.p
                                variants={item}
                                className="text-gray-400 mb-8"
                            >
                                My projects are coming soon! In the meantime, check out my GitHub profile to see what I've been working on.
                            </motion.p>

                            <motion.a
                                variants={item}
                                href="https://github.com/mharshil1234"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20"
                            >
                                <FaGithub className="text-xl" />
                                <span>View on GitHub</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export { Projects };
