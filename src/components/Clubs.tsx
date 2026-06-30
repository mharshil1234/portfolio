import React, { forwardRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ClubCard } from './Club/ClubCard';


const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const cardLeft: Variants = {
    hidden: { opacity: 0, x: -80, rotateY: 10 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardRight: Variants = {
    hidden: { opacity: 0, x: 80, rotateY: -10 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const Clubs = forwardRef<HTMLElement>((_, ref) => {
    const clubs = [
        {
            name: 'CodeChef-VIT',
            image: '/ccvit.png',
            description: 'Competitive Programming & Web Development Member. Contributing to project cycles and helped organize and judge a hackathon with 1,000+ participants.',
            website: 'https://www.codechefvit.com/',
            github: 'https://github.com/CodeChefVIT',
            linkedin: 'https://www.linkedin.com/company/codechefvit/',
        },
        {
            name: 'ACM-VIT',
            image: '/acmvit.png',
            description: 'Competitive Programming Member. Contributed to organizing coding competitions and workshops, fostering a vibrant programming community on campus.',
            website: 'https://www.acmvit.in/',
            github: 'https://github.com/ACM-VIT',
            linkedin: 'https://www.linkedin.com/company/acmvit/',
        }
    ];

    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-600/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/3 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="relative mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold text-center"
                    >
                        <span className="text-white">Clubs & Communities</span>
                        <span className="block mx-auto mt-2 w-12 h-0.5 bg-purple-500/60 rounded-full" />
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-8"
                >
                    {clubs.map((club, index) => {
                        const accentBorder = index === 0 ? "border-t-purple-500/40" : "border-t-cyan-500/40";
                        return (
                        <motion.div
                            key={index}
                            variants={index === 0 ? cardLeft : cardRight}
                            className={`w-full md:w-96 border-t-2 ${accentBorder} rounded-xl`}
                            style={{ perspective: "1000px" }}
                        >
                            <ClubCard
                                name={club.name}
                                image={club.image}
                                description={club.description}
                                website={club.website}
                                github={club.github}
                                linkedin={club.linkedin}
                            />
                        </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
});

Clubs.displayName = 'Clubs';

export { Clubs };
