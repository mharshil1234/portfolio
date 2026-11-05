'use client';

import { useRef, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

function Cube() {
  return (
    <div className="intro-cube" aria-hidden="true">
      <div className="cube-face cube-face-front"><span className="cube-monogram">HM</span><span className="cube-face-caption">MAKE IT MATTER</span></div>
      <div className="cube-face cube-face-back"><span className="cube-symbol">↗</span><span className="cube-face-caption">IDEA → IMPACT</span></div>
      <div className="cube-face cube-face-right"><span>01</span><small>BUILD</small></div>
      <div className="cube-face cube-face-left"><span>02</span><small>EXPLORE</small></div>
      <div className="cube-face cube-face-top"><span>H</span></div>
      <div className="cube-face cube-face-bottom"><span>M</span></div>
    </div>
  );
}

function IntroDetails() {
  return (
    <>
      <div className="intro-detail-photo"><img src="/me.jpeg" alt="Harshil Maheshwari" /><span>VIT · VELLORE, INDIA</span></div>
      <div className="intro-detail-copy">
        <p className="intro-detail-kicker">THE PERSON BEHIND THE SCREEN <span>— 01</span></p>
        <h2>Hey, I’m<br /><em>Harshil.</em></h2>
        <p className="intro-detail-role">FULL STACK DEVELOPER · VELLORE, INDIA</p>
        <p className="intro-detail-bio">I build useful software with a little bit of wonder. I enjoy taking ideas from rough sketches to thoughtful, working products, and care about the details people feel along the way.</p>
        <div className="intro-detail-links">
          <a href="https://github.com/mharshil1234" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/harshil-maheshwari/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:mharshil1234@gmail.com" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </>
  );
}

export function PortfolioIntro({ aboutRef }: { aboutRef: RefObject<HTMLElement | null> }) {
  const reducedMotion = useReducedMotion();
  const sequenceRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sequenceRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 78, damping: 28, mass: 0.34 });

  const cubeRotateX = useTransform(progress, [0, 0.2, 0.46, 0.72, 1], [22, -14, 36, 180, 540]);
  const cubeRotateY = useTransform(progress, [0, 0.2, 0.47, 0.75, 1], [-28, 42, 205, 420, 780]);
  const cubeRotateZ = useTransform(progress, [0, 0.32, 0.58, 1], [-8, 0, -15, 180]);
  // Keep the cube fully visible while it spins, then carry the entire cube off the right edge.
  const cubeX = useTransform(progress, [0, 0.22, 0.5, 0.72, 0.86, 1], ['0vw', '-5vw', '2vw', '12vw', '48vw', '130vw']);
  const cubeY = useTransform(progress, [0, 0.28, 0.55, 0.8, 1], ['0vh', '-2vh', '0vh', '-10vh', '-34vh']);
  const cubeScale = useTransform(progress, [0, 0.2, 0.43, 0.68, 0.88, 1], [1, 1.15, 1.3, 1.2, 1.35, 1.5]);
  const cubeOpacity = useTransform(progress, [0, 0.78, 0.9, 1], [1, 1, 0.82, 0]);
  const titleY = useTransform(progress, [0, 0.22, 0.43], ['0vh', '-2vh', '-40vh']);
  const titleOpacity = useTransform(progress, [0, 0.18, 0.35, 0.48], [1, 1, 0.5, 0]);
  const orbitRotate = useTransform(progress, [0, 1], [-16, 164]);
  const detailY = useTransform(progress, [0.2, 0.5, 0.74, 0.88], ['8vh', '0vh', '0vh', '-4vh']);
  const detailOpacity = useTransform(progress, [0.22, 0.48, 0.76, 0.92, 1], [0, 1, 1, 0.65, 0]);
  const detailRotateX = useTransform(progress, [0.22, 0.56], [18, 0]);
  const orbitOpacity = useTransform(progress, [0.72, 0.92, 1], [1, 0.35, 0]);
  const promptOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 0.75, 0]);

  return (
    <section className="portfolio-intro-sequence" ref={sequenceRef} aria-label="Introduction">
      <div className="portfolio-intro-stage">
        <div className="intro-stage-vignette" />
        <motion.div className="intro-orbit intro-orbit-one" style={{ rotate: orbitRotate, opacity: orbitOpacity }} />
        <motion.div className="intro-orbit intro-orbit-two" style={{ rotate: useTransform(orbitRotate, (v) => -v * 0.7), opacity: orbitOpacity }} />
        <motion.div className="intro-cube-wrap" style={reducedMotion ? { opacity: 0.75 } : { x: cubeX, y: cubeY, rotateX: cubeRotateX, rotateY: cubeRotateY, rotateZ: cubeRotateZ, scale: cubeScale, opacity: cubeOpacity }}>
          <Cube />
        </motion.div>

        <motion.div className="intro-title" style={reducedMotion ? { opacity: 1 } : { y: titleY, opacity: titleOpacity }}>
          <p className="intro-eyebrow"><i /> FULL STACK DEVELOPER · VELLORE, INDIA</p>
          <h1>Harshil<br /><em>Maheshwari</em></h1>
          <p className="intro-title-sub">I TURN IDEAS INTO THINGS PEOPLE CAN USE.</p>
        </motion.div>

        <motion.article className="intro-detail-scene" style={reducedMotion ? { opacity: 1 } : { y: detailY, opacity: detailOpacity, rotateX: detailRotateX }}>
          <IntroDetails />
        </motion.article>

        <motion.div className="intro-scroll-prompt" style={reducedMotion ? { opacity: 0 } : { opacity: promptOpacity }}>
          <span>SCROLL TO OPEN</span>
          <motion.i animate={reducedMotion ? {} : { y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><FaArrowDown /></motion.i>
        </motion.div>
        <span className="intro-index">HM<span>®</span> <i>—</i> PORTFOLIO 2026</span>
        <span className="intro-scroll-count"><b>01</b> / 02</span>
        <button className="intro-skip" onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}>SKIP INTRO <span>↗</span></button>
      </div>
    </section>
  );
}
