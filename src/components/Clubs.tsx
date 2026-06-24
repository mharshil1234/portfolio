import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ClubCard } from './Club/ClubCard';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
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
          Clubs & Communities
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row justify-center items-center gap-8"
        >
          {clubs.map((club, index) => (
            <motion.div
              key={index}
              variants={card}
              className="w-full md:w-96"
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
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Clubs.displayName = 'Clubs';

export { Clubs };
