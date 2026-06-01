'use client';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import AboutMe from '@/components/AboutMe';
import Skills from '@/components/Skills';
import Clubs from '@/components/Clubs';
import Projects from '@/components/Projects';
import ContactMe from '@/components/ContactMe';

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const clubsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-[#190a32] min-h-screen">
      <Navbar
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        clubsRef={clubsRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <div className="pt-4">
        <AboutMe ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Clubs ref={clubsRef} />
        <Projects ref={projectsRef} />
        <ContactMe ref={contactRef} />
      </div>
    </div>
  );
}
