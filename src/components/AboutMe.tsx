import React, { forwardRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Div - Photo */}
          <div className="flex items-center justify-center">
            <img
              src="/me.jpeg"
              alt="Harshil Maheshwari"
              className="w-full max-w-sm h-auto rounded-full object-cover border-4 border-white/10 shadow-2xl"
            />
          </div>

          {/* Right Div - Text */}
          <div className="max-w-2xl">
            <p className="text-lg mb-4">Hi, I'm</p>
            <h1 className="text-5xl sm:text-7xl font-bold leading-none mb-3">Harshil Maheshwari</h1>
            <p className="text-xl text-gray-400 mb-6">Full Stack Developer</p>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Passionate about building software that solves real problems. I enjoy learning new technologies, exploring ideas and turning them into meaningful projects.
            </p>

            {/* Social Buttons */}
            <div className="flex gap-6">
              <a
                href="https://github.com/mharshil1234"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/harshil-maheshwari/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="mailto:mharshil1234@gmail.com"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutMe.displayName = 'AboutMe';

export { AboutMe };
