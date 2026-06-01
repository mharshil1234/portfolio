import React, { forwardRef } from 'react';

const Clubs = forwardRef<HTMLElement>((_, ref) => {
  const clubs = [
    { name: 'Club 1', description: 'Brief description of your involvement' },
    { name: 'Club 2', description: 'Brief description of your involvement' },
    { name: 'Club 3', description: 'Brief description of your involvement' },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-[#190a32] text-white flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Clubs & Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-3">{club.name}</h3>
              <p className="text-gray-300">{club.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Clubs.displayName = 'Clubs';

export { Clubs };
