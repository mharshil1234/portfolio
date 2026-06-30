'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoHeartSharp } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";

export function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= docHeight - 10) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#11151f] text-white py-6 px-8 font-sans"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">

                <div />

                <span className="flex justify-center items-center gap-1.5 text-sm tracking-wide text-center whitespace-nowrap">
                    Made With
                    <IoHeartSharp className="text-purple-400" />
                </span>

                <div className="flex justify-end">
                    <AnimatePresence>
                        {isVisible && (
                            <motion.a
                                href="#"
                                onClick={scrollToTop}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.7, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all"
                                aria-label="Scroll to top"
                            >
                                <FaArrowUp className="text-sm" />
                            </motion.a>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.footer>
    );
}
