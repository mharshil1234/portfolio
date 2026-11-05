'use client';

import { useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { AboutMe } from '@/components/AboutMe';
import { Skills } from '@/components/Skills';
import { Clubs } from '@/components/Clubs';
import { Projects } from '@/components/Projects';
import { ContactMe } from '@/components/ContactMe';
import { Footer } from '@/components/Footer';
import { PortfolioIntro } from '@/components/PortfolioIntro';
import { ScrollScene } from '@/components/ScrollScene';
// import { ScrollRoadmap } from '@/components/ScrollRoadmap';

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const clubsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div className="page-wrapper">
      {/* <ScrollRoadmap /> */}
      <PortfolioIntro aboutRef={aboutRef} />
      <Navbar
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        clubsRef={clubsRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <div className="pt-4">
        <ScrollScene index={0}><AboutMe ref={aboutRef} /></ScrollScene>
        <ScrollScene index={1}><Skills ref={skillsRef} /></ScrollScene>
        <ScrollScene index={2}><Clubs ref={clubsRef} /></ScrollScene>
        <ScrollScene index={3}><Projects ref={projectsRef} /></ScrollScene>
        <ScrollScene index={4}><ContactMe ref={contactRef} /></ScrollScene>
      </div>
      <ScrollScene index={5}><Footer /></ScrollScene>
    </div>
  );
}
