import React, { forwardRef } from 'react';
import { ClubCard } from './Club/ClubCard';

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
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">Clubs & Communities</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {clubs.map((club, index) => (
            <div key={index} className="w-full md:w-96">
              <ClubCard
                name={club.name}
                image={club.image}
                description={club.description}
                website={club.website}
                github={club.github}
                linkedin={club.linkedin}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Clubs.displayName = 'Clubs';

export { Clubs };
