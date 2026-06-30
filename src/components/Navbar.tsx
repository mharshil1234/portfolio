'use client';

import React, { RefObject, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

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
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [aboutRef, skillsRef, clubsRef, projectsRef, contactRef]);

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    { id: 'about', label: 'About Me', ref: aboutRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'clubs', label: 'Clubs', ref: clubsRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'contact', label: 'Contact', ref: contactRef },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-6"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(15, 15, 19, 0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4 }}
        className="px-4 py-2 rounded-full border border-white/[0.06] flex items-center gap-1"
      >
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <motion.button
              key={s.id}
              onClick={() => scrollToSection(s.ref)}
              className="relative px-4 py-2 text-sm font-medium transition-colors"
              style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
              whileHover={{ color: '#fff' }}
              whileTap={{ scale: 0.98 }}
            >
              {s.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-white rounded-full"
                  style={{ width: 16 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

export { Navbar };
