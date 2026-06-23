'use client';

import { useState, useEffect } from 'react';
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
    <footer className="w-full bg-[#1a1834] text-white py-6 px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        
        <div />

        <span className="flex justify-center items-center gap-1 text-sm tracking-wide text-center whitespace-nowrap">
          Made With <IoHeartSharp />
        </span>
        
        <div className="flex justify-end">
          <a
            href="#"
            onClick={scrollToTop}
            className={`text-white transition-all duration-300 ease-in-out inline-flex items-center justify-center hover:-translate-y-1 ${
              isVisible ? 'opacity-70 hover:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </a>
        </div>

      </div>
    </footer>
  );
}