import React, { useState } from "react";
import { FiExternalLink, FiGithub, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

interface ClubCardProps {
    name: string;
    image: string;
    description: string;
    website?: string;
    github?: string;
    linkedin?: string;
}

const ClubCard: React.FC<ClubCardProps> = ({
    name,
    image,
    description,
    website,
    github,
    linkedin,
}) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);

    const handleMouseLeave = () => setHovered(false);

    return (
        <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <motion.div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/[0.06] shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(circle at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 60%)`,
                }}
            />
            <div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600/5 to-cyan-400/5 rounded-xl blur-xl transition-opacity duration-500"
                style={{ transform: "translateZ(-10px)", opacity: hovered ? 1 : 0 }}
            />

            <div className="relative z-10 flex flex-col items-center text-center" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                    className="mb-6 w-24 h-24 flex items-center justify-center"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain drop-shadow-lg"
                    />
                </motion.div>

                <h3
                    className="text-2xl font-bold mb-4"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {name}
                </h3>

                <p
                    className="text-gray-300 mb-6 text-sm leading-relaxed"
                    style={{ transform: "translateZ(10px)" }}
                >
                    {description}
                </p>

                <div
                    className="flex gap-4"
                    style={{ transform: "translateZ(25px)" }}
                >
                    {website && (
                        <motion.a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.12)" }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 bg-white/[0.06] rounded-full border border-white/[0.06] transition-colors duration-300"
                            title="Website"
                        >
                            <FiExternalLink className="text-lg text-gray-300 hover:text-white" />
                        </motion.a>
                    )}
                    {github && (
                        <motion.a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.12)" }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 bg-white/[0.06] rounded-full border border-white/[0.06] transition-colors duration-300"
                            title="GitHub"
                        >
                            <FiGithub className="text-lg text-gray-300 hover:text-white" />
                        </motion.a>
                    )}
                    {linkedin && (
                        <motion.a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.12)" }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 bg-white/[0.06] rounded-full border border-white/[0.06] transition-colors duration-300"
                            title="LinkedIn"
                        >
                            <FiLinkedin className="text-lg text-gray-300 hover:text-white" />
                        </motion.a>
                    )}
                </div>
            </div>
            </motion.div>
        </motion.div>
    );
};

export { ClubCard };
