"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const NAME = "Harshil Maheshwari";
const ROLE = "Full Stack Developer";

const AboutMe = forwardRef<HTMLElement>((_, ref) => {
  const [typedRole, setTypedRole] = useState("");

  useEffect(() => {
    const totalNameDuration = NAME.length * 30 + 300;

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
      className="w-full min-h-screen flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Photo */}
          <motion.div
            initial={{
              clipPath: "circle(0% at 50% 50%)",
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              clipPath: "circle(75% at 50% 50%)",
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl scale-110" />

              <img
                src="/me.jpeg"
                alt="Harshil Maheshwari"
                className="relative w-full max-w-sm h-auto rounded-full object-cover border-4 border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Text */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-4"
            >
              Hi, I'm
            </motion.p>

            {/* Name */}
            <h1 className="text-5xl sm:text-7xl font-bold leading-none mb-3">
              {NAME.split(" ").map((word, wordIndex) => (
                <span
                  key={word}
                  className="inline-block mr-4 whitespace-nowrap"
                >
                  {word.split("").map((char, index) => {
                    const delay =
                      (NAME.split(" ")
                        .slice(0, wordIndex)
                        .join("").length +
                        index +
                        wordIndex) *
                      0.03;

                    return (
                      <motion.span
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay,
                          duration: 0.25,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>

            {/* Typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-gray-400 mb-6 h-8"
            >
              {typedRole}
              <span className="animate-pulse">|</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
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
                    delay: 1.4 + index * 0.15,
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
    </section>
  );
});

AboutMe.displayName = "AboutMe";

export { AboutMe };