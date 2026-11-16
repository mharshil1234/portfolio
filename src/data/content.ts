export const profile = {
    name: "Harshil Maheshwari",
    firstName: "Harshil",
    lastName: "Maheshwari",
    role: "Full Stack Developer",
    tagline:
        "Passionate about building software that solves real problems. I enjoy learning new technologies, exploring ideas and turning them into meaningful projects.",
    about:
        "I build things for the web end to end, from real-time Go backends that judge code for hundreds of live contestants, to polished React interfaces people actually enjoy using. I care about systems that stay fast under load, interfaces that feel alive, and shipping work that solves a real problem.",
    photo: "/me.jpeg",
    resume: "/Harshil_Maheshwari_Resume.pdf",
    email: "mharshil1234@gmail.com",
};

export const socials = [
    { label: "GitHub", href: "https://github.com/mharshil1234", handle: "github.com/mharshil1234" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harshil-maheshwari/", handle: "linkedin.com/in/harshil-maheshwari" },
    { label: "LeetCode", href: "https://leetcode.com/u/mharshil1234/", handle: "leetcode.com/u/mharshil1234" },
    { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
] as const;

export type SocialLabel = (typeof socials)[number]["label"];

export const skills = [
    { category: "Languages", items: ["Java", "C++", "JavaScript", "TypeScript", "Python", "Go"] },
    { category: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"] },
    { category: "Backend", items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"] },
    { category: "Tools & DevOps", items: ["Git", "Docker", "Linux", "Bash", "Vercel", "Cloudflare", "Google Cloud", "VS Code"] },
];

export type ProjectLink = { label: "Frontend" | "Backend" | "GitHub" | "Live"; href: string };

export type Project = {
    name: string;
    subtitle: string;
    description: string;
    tech: string[];
    links: ProjectLink[];
    accent: string;
};

export const projects: Project[] = [
    {
        name: "Cookoff",
        subtitle: "Competitive Programming Platform",
        description:
            "Led development of a full-stack contest platform for 500+ live participants, with an async Go + Judge0 code evaluation pipeline and real-time verdict delivery.",
        tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Redis", "Docker"],
        links: [
            { label: "Frontend", href: "https://github.com/CodeChefVIT/cookoff-portal-11.0" },
            { label: "Backend", href: "https://github.com/CodeChefVIT/cookoff-11.0-be" },
        ],
        accent: "#fb923c",
    },
    {
        name: "CraveBuddy",
        subtitle: "Mood-Based Restaurant Discovery",
        description:
            "Restaurant discovery app that uses Gemini to turn free-text cravings into matching dishes, with real-time multiplayer Mood Rooms for group voting over Socket.IO.",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Socket.IO"],
        links: [{ label: "GitHub", href: "https://github.com/mharshil1234/crave-buddy" }],
        accent: "#22d3ee",
    },
    {
        name: "VCAP",
        subtitle: "VIT Capstone Project Platform",
        description:
            "Worked on the frontend of the platform VIT runs its capstone and course projects on, handling every stage from team formation through to final grading.",
        tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand"],
        links: [{ label: "Live", href: "https://vcap.vit.ac.in/" }],
        accent: "#34d399",
    },
    {
        name: "GitHub-Org-Tool",
        subtitle: "GitHub Organization Management",
        description:
            "GraphQL-based tool for managing GitHub organizations, with bulk member invitations and configurable custom scoring rules.",
        tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "GraphQL", "GitHub Apps API"],
        links: [],
        accent: "#f87171",
    },
];

export const clubs = [
    {
        name: "CodeChef-VIT",
        image: "/ccvit.png",
        description:
            "Competitive Programming & Web Development Member. Contributing to project cycles and helped organize and judge a hackathon with 1,000+ participants.",
        period: "Jan 2026 - Present",
        website: "https://www.codechefvit.com/",
        github: "https://github.com/CodeChefVIT",
        linkedin: "https://www.linkedin.com/company/codechefvit/",
        accent: "#fb923c",
    },
    {
        name: "ACM-VIT",
        image: "/acmvit.png",
        description:
            "Competitive Programming Member. Contributed to organizing coding competitions and workshops, fostering a vibrant programming community on campus.",
        period: "Jan 2026 - Present",
        website: "https://www.acmvit.in/",
        github: "https://github.com/ACM-VIT",
        linkedin: "https://www.linkedin.com/company/acmvit/",
        accent: "#22d3ee",
    },
];

export const navSections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "clubs", label: "Clubs" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
] as const;
