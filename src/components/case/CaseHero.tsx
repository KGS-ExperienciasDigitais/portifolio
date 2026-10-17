import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/content/cases/types";

export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <header className="pt-28 pb-16">
      <Reveal>
        <Link
          href="/#projetos"
          className="mb-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar aos projetos
        </Link>
        <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-medium text-balance sm:text-5xl">{study.title}</h1>
        {study.subtitle && <p className="mb-10 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl">{study.subtitle}</p>}
      </Reveal>
      <Reveal delay={0.1}>
        {/* Com largura e altura, a capa aparece inteira na proporção real; sem elas, usa 16:10 com corte. */}
        <Media
          {...study.cover}
          fill={!(study.cover.width && study.cover.height)}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className={study.cover.width && study.cover.height ? "w-full rounded-xl" : "aspect-16/10 w-full rounded-xl"}
        />
      </Reveal>
    </header>
  );
}
