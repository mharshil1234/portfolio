'use client';

import React, { RefObject, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > lastScroll.current && current > 200);
      lastScroll.current = current;

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
      initial={{ y: 0 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? 'rgba(17, 0, 34, 0.85)'
            : 'rgba(17, 0, 34, 0.4)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
          borderColor: scrolled
            ? 'rgba(168, 85, 247, 0.2)'
            : 'rgba(255,255,255,0.06)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(168,85,247,0.1)'
            : '0 4px 16px rgba(0,0,0,0.2)',
        }}
        transition={{ duration: 0.4 }}
        className="rounded-full px-5 py-2 border flex items-center gap-1"
      >
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <motion.button
              key={s.id}
              onClick={() => scrollToSection(s.ref)}
              layout
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}
              whileHover={{ color: '#fff' }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-purple-600"
                  style={{ boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

export { Navbar };
