'use client';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import AboutMe from '@/components/AboutMe';
import Clubs from '@/components/Clubs';
import Projects from '@/components/Projects';
import ContactMe from '@/components/ContactMe';

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const clubsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-[#190a32] min-h-screen">
      <Navbar
        aboutRef={aboutRef}
        clubsRef={clubsRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <AboutMe ref={aboutRef} />
      <Clubs ref={clubsRef} />
      <Projects ref={projectsRef} />
      <ContactMe ref={contactRef} />
    </div>
  );
}
