"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { HMLogo } from "./HMLogo";
import { ShatterPhoto } from "./ShatterPhoto";
import { ScrambleText } from "./ScrambleText";

const NAME = "Harshil Maheshwari";
const ROLE = "Full Stack Developer";

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  const [typedRole, setTypedRole] = useState("");

  useEffect(() => {
    const totalNameDuration = 1400;

    const startTyping = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        setTypedRole(ROLE.slice(0, index + 1));
        index++;

        if (index === ROLE.length) {
          clearInterval(interval);
        }
      }, 60);

      return () => clearInterval(interval);
    }, totalNameDuration);

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <ShatterPhoto />
          </motion.div>

          <div className="relative max-w-2xl">

            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-[0.08] scale-125 pointer-events-none">
              <HMLogo />
            </div>

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg mb-4"
              >
                Hi, I'm
              </motion.p>

              {/* Name */}
              <h1 className="text-5xl sm:text-7xl font-bold leading-none mb-3 tracking-wide">
                {NAME.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    <ScrambleText text={word} />
                  </span>
                ))}
              </h1>

              {/* Typewriter */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-xl text-gray-400 mb-6 h-8"
              >
                {typedRole}
                <span className="animate-pulse">|</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="text-lg text-gray-300 leading-relaxed mb-8"
              >
                Passionate about building software that solves real problems. I
                enjoy learning new technologies, exploring ideas and turning them
                into meaningful projects.
              </motion.p>

              {/* Socials */}
              <div className="flex gap-6">
                {[
                  {
                    icon: <FaGithub size={28} />,
                    href: "https://github.com/mharshil1234",
                  },
                  {
                    icon: <FaLinkedin size={28} />,
                    href: "https://www.linkedin.com/in/harshil-maheshwari/",
                  },
                  {
                    icon: <FaEnvelope size={28} />,
                    href: "mailto:mharshil1234@gmail.com",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 2.0 + index * 0.15,
                      duration: 0.3,
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.15,
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
});

AboutMe.displayName = "AboutMe";

export { AboutMe };