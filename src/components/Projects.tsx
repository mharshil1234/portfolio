import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';


const Projects = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-600/3 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="relative mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold text-center"
                    >
                        <span className="text-white">Projects</span>
                        <span className="block mx-auto mt-2 w-12 h-0.5 bg-purple-500/60 rounded-full" />
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center"
                >
                    <div
                        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/[0.06] border-t-2 border-t-purple-500/40 p-12 max-w-lg w-full text-center"
                    >
                        <span className="text-4xl mb-4 block">🚀</span>
                        <h3 className="text-2xl font-bold mb-3">
                            Work in Progress
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            I'm currently building a few projects that will be showcased here soon.
                        </p>
                        <a
                            href="https://github.com/mharshil1234"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:cursor-pointer"
                            style={{ backgroundColor: '#24292F', border: '1px solid #3A4048', color: 'white' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2F363D'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#24292F'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <span>Explore My GitHub</span>
                            <span>→</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export { Projects };
