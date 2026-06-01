'use client';

import React, { RefObject } from 'react';

interface NavbarProps {
  aboutRef: RefObject<HTMLElement | null>;
  clubsRef: RefObject<HTMLElement | null>;
  projectsRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
}

export default function Navbar({
  aboutRef,
  clubsRef,
  projectsRef,
  contactRef,
}: NavbarProps) {
  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-2 w-full z-50 m-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 text-black">
          <div className="flex space-x-8">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-gray-600 transition-colors"
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection(clubsRef)}
              className="hover:text-gray-600 transition-colors"
            >
              Clubs
            </button>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="hover:text-gray-600 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-gray-600 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
