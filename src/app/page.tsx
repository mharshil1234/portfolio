import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor, ScrollProgress } from "@/components/ui/Chrome";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Clubs } from "@/components/sections/Clubs";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
    return (
        <>
            <div className="ambient" aria-hidden />
            <div className="grain" aria-hidden />
            <ScrollProgress />
            <Cursor />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Clubs />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
