import React, { forwardRef } from 'react';

const Skills = forwardRef<HTMLElement>((_, ref) => {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js'],
    },
    {
      category: 'Databases',
      items: ['Redis', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'Java', 'C++'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Docker', 'Git', 'Linux'],
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-6">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/10 border border-white/10 text-gray-200 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export { Skills };
