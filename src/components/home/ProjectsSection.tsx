import { Reveal } from "@/components/ui/Reveal";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cases } from "@/content/cases";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projetos" className="px-4 pt-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Só o título aparece na primeira tela; o subtítulo e os cards esperam a primeira rolagem. */}
        <Reveal className="text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Projetos</h2>
        </Reveal>
        <RevealOnScroll>
          <p className="mx-auto mb-8 max-w-2xl text-center text-lg md:mb-12">Estudos de caso de produtos digitais em que trabalhei</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cases.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
