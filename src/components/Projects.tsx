import React, { forwardRef } from 'react';
import { FaGithub } from 'react-icons/fa';

const Projects = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">Projects</h2>
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-2xl border border-gray-700/50 max-w-2xl w-full text-center">
            <h3 className="text-3xl font-bold mb-4">Yet to be Displayed</h3>
            <p className="text-gray-400 mb-8">
              My projects are coming soon! In the meantime, check out my GitHub profile to see what I've been working on.
            </p>
            <a
              href="https://github.com/mharshil1234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <FaGithub className="text-xl" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export { Projects };
