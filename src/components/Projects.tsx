import React, { forwardRef } from 'react';

const Projects = forwardRef<HTMLElement>((_, ref) => {
  const projects = [
    { name: 'Project 1', description: 'A brief description of your project' },
    { name: 'Project 2', description: 'A brief description of your project' },
    { name: 'Project 3', description: 'A brief description of your project' },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-[#190a32] text-white flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105 transform"
            >
              <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
                  View
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors">
                  Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
