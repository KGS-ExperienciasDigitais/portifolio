import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GlassPill } from "@/components/ui/GlassPill";
import { Media } from "@/components/ui/Media";
import type { CaseStudy } from "@/content/cases/types";

export function ProjectCard({ project }: { project: CaseStudy }) {
  const href = `/projetos/${project.slug}`;

  return (
    <article className="group max-md:text-center">
      <Link href={href} tabIndex={-1} aria-hidden className="relative mb-4 block aspect-16/10 w-full overflow-hidden rounded-lg md:aspect-auto md:h-96">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <Media {...project.cover} fill sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full" />
        </div>
      </Link>
      <h3 className="mb-2 text-xl font-semibold">{project.name}</h3>
      <p className="mb-4 line-clamp-4 text-sm leading-relaxed text-muted">{project.summary}</p>
      <GlassPill
        actions={[
          {
            label: "Estudo de caso",
            href,
            icon: <ArrowUpRight className="size-4" />,
            ariaLabel: `Ver o estudo de caso ${project.name}`,
          },
        ]}
      />
    </article>
  );
}
