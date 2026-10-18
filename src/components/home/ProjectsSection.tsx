import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/cases";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projetos" className="px-4 pt-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <Reveal className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Projetos</h2>
          <p className="mx-auto max-w-2xl text-lg">Estudos de caso de produtos digitais em que trabalhei</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cases.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
