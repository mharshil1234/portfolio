import React from 'react';
import { FiExternalLink, FiGithub, FiLinkedin } from 'react-icons/fi';

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
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1">
      <div className="mb-6 w-24 h-24 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      <div className="flex gap-4">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300"
            title="Website"
          >
            <FiExternalLink className="text-xl text-gray-300 hover:text-white" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300"
            title="GitHub"
          >
            <FiGithub className="text-xl text-gray-300 hover:text-white" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300"
            title="LinkedIn"
          >
            <FiLinkedin className="text-xl text-gray-300 hover:text-white" />
          </a>
        )}
      </div>
    </div>
  );
};

export { ClubCard };
