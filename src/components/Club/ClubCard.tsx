import React, { useRef, useState } from "react";
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
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glowX, setGlowX] = useState(50);
    const [glowY, setGlowY] = useState(50);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 12);
        setRotateY((centerX - x) / 12);
        setGlowX((x / rect.width) * 100);
        setGlowY((y / rect.height) * 100);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlowX(50);
        setGlowY(50);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-white/[0.06] shadow-lg overflow-hidden group"
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168,85,247,0.12) 0%, transparent 60%)`,
                }}
            />
            <div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-cyan-400/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ transform: "translateZ(-10px)" }}
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
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.2)" }}
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
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.2)" }}
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
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.2)" }}
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
    );
};

export { ClubCard };
