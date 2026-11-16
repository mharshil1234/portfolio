import React, { forwardRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
    {
        name: 'Cookoff',
        subtitle: 'Competitive Programming Platform',
        description:
            'Led development of a full-stack contest platform for 500+ live participants, with an async Go + Judge0 code evaluation pipeline and real-time verdict delivery.',
        tech: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
        links: [
            { label: 'Frontend', href: 'https://github.com/CodeChefVIT/cookoff-portal-11.0' },
            { label: 'Backend', href: 'https://github.com/CodeChefVIT/cookoff-11.0-be' },
        ],
    },
    {
        name: 'CraveBuddy',
        subtitle: 'Mood-Based Restaurant Discovery Platform',
        description:
            'Restaurant discovery app that uses Gemini to turn free-text cravings into matching dishes, with real-time multiplayer Mood Rooms for group voting over Socket.IO.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.IO'],
        links: [{ label: 'GitHub', href: 'https://github.com/mharshil1234/crave-buddy' }],
    },
    {
        name: 'VCAP',
        subtitle: 'VIT Capstone Project Platform',
        description:
            'Worked on the frontend of the platform VIT runs its capstone and course projects on, handling every stage from team formation through to final grading.',
        tech: [] as string[],
        links: [{ label: 'Live', href: 'https://vcap.vit.ac.in/' }],
    },
];

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

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
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    {projects.map((project) => (
                        <motion.article
                            key={project.name}
                            variants={card}
                            whileHover={{ y: -2, transition: { duration: 0.2 } }}
                            className="group bg-gray-800/30 backdrop-blur-sm border border-white/[0.06] border-t-2 border-t-purple-500/40 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 w-full max-w-md flex flex-col"
                        >
                            <div className="flex items-start justify-between gap-4 mb-1">
                                <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                                <div className="flex items-center gap-3 mt-1.5 shrink-0">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label === 'Live' ? `${project.name} live site` : `${project.name} ${link.label} on GitHub`}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.label === 'Live' ? <FaExternalLinkAlt size={13} /> : <FaGithub size={16} />}
                                            <span>{link.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-purple-300/80 mb-4">{project.subtitle}</p>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
                            {project.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 bg-white/[0.06] border border-white/[0.08] text-gray-200 rounded-full text-xs font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            )}
                        </motion.article>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-12">
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
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export { Projects };
