'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const scenes = [
  { number: '01', label: 'ABOUT' },
  { number: '02', label: 'SKILLS' },
  { number: '03', label: 'COMMUNITY' },
  { number: '04', label: 'PROJECTS' },
  { number: '05', label: 'CONTACT' },
  { number: '06', label: 'END' },
];

export function ScrollScene({ index, children }: { index: number; children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 26, mass: 0.45 });
  const rotateX = useTransform(progress, [0, 0.5, 1], [20, 0, -20]);
  const rotateY = useTransform(progress, [0, 0.5, 1], [-9, 0, 9]);
  const y = useTransform(progress, [0, 0.5, 1], [190, 0, -190]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.78, 1, 0.78]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.12, 1, 1, 0.12]);
  const cubeRotate = useTransform(progress, [0, 1], [-55, 205]);
  const scene = scenes[index] ?? scenes[scenes.length - 1];

  return (
    <div ref={sceneRef} className="scroll-scene">
      <motion.div
        className="scroll-scene-content"
        style={reducedMotion ? undefined : { rotateX, rotateY, y, scale, opacity, transformOrigin: 'center center' }}
      >
        {children}
      </motion.div>
      {!reducedMotion && (
        <div className="scroll-scene-mark" aria-hidden="true">
          <motion.div className="scroll-scene-cube" style={{ rotateX: cubeRotate, rotateY: cubeRotate }}>
            <i /><i /><i /><i /><i /><i />
          </motion.div>
          <span>{scene.number} <b>—</b> {scene.label}</span>
        </div>
      )}
    </div>
  );
}
