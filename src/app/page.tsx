import { About } from "@/components/home/About";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/home/ProjectsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
