import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/ninja/Intro";
import { BrushDivider, InkDefs, ShurikenThrower } from "@/components/ui/ninja";
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
            <InkDefs />
            <ShurikenThrower />
            <Intro />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <BrushDivider />
                <Skills />
                <BrushDivider flip />
                <Clubs />
                <BrushDivider />
                <Projects />
                <BrushDivider flip />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
