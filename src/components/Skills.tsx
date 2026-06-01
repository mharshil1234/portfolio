import React, { forwardRef } from 'react';

const Skills = forwardRef<HTMLElement>((_, ref) => {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma'] },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-[#190a32] text-white flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4">{skillGroup.category}</h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, i) => (
                  <li key={i} className="text-gray-300 flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
