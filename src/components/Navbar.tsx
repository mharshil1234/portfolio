'use client';

import React, { RefObject, useState, useEffect } from 'react';

interface NavbarProps {
  aboutRef: RefObject<HTMLElement | null>;
  skillsRef: RefObject<HTMLElement | null>;
  clubsRef: RefObject<HTMLElement | null>;
  projectsRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
}

export default function Navbar({
  aboutRef,
  skillsRef,
  clubsRef,
  projectsRef,
  contactRef,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'clubs', ref: clubsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [aboutRef, skillsRef, clubsRef, projectsRef, contactRef]);

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getButtonClass = (sectionId: string) => {
    const baseClass = 'px-4 py-2 rounded-lg transition-colors font-medium';
    if (activeSection === sectionId) {
      return `${baseClass} text-blue-600`;
    }
    return `${baseClass} text-black hover:text-gray-600`;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit">
      <div className="bg-white rounded-full shadow-xl px-8 py-3 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-2 text-black">
          <button
            onClick={() => scrollToSection(aboutRef)}
            className={getButtonClass('about')}
          >
            About Me
          </button>
          <button
            onClick={() => scrollToSection(skillsRef)}
            className={getButtonClass('skills')}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection(clubsRef)}
            className={getButtonClass('clubs')}
          >
            Clubs
          </button>
          <button
            onClick={() => scrollToSection(projectsRef)}
            className={getButtonClass('projects')}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className={getButtonClass('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
