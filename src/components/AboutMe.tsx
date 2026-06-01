import React, { forwardRef } from 'react';

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center pt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8">About Me</h2>
        <div className="text-lg sm:text-xl leading-relaxed">
          <p className="mb-6">
            Hi, I'm <span className="font-bold text-2xl">Harshil Maheshwari</span>
          </p>
          <p className="mb-4">
            Welcome to my portfolio. I'm passionate about creating innovative solutions and
            contributing to impactful projects. With a keen interest in technology and continuous
            learning, I strive to make a difference through my work.
          </p>
          <p>
            This portfolio showcases my journey, projects, and the clubs and communities I'm
            involved with. Feel free to explore and get to know more about me!
          </p>
        </div>
      </div>
    </section>
  );
});

AboutMe.displayName = 'AboutMe';

export { AboutMe };
