import React, { forwardRef } from 'react';

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Div - Photo */}
          <div className="flex items-center justify-center">
            <img 
              src="/me.jpeg" 
              alt="Harshil Maheshwari" 
              className="w-96 h-96 rounded-full object-cover"
            />
          </div>
          
          {/* Right Div - Text */}
          <div>
            <p className="text-lg mb-4">Hi, I am</p>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">Harshil Maheshwari</h1>
            <p className="text-xl text-gray-600">I build full-stack applications and solve complex algorithmic problems.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutMe.displayName = 'AboutMe';

export { AboutMe };
