import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/content/cases/types";
import { ModeSwitch } from "./ModeSwitch";

// Topo comum ao resumo e ao estudo completo (fica no layout e não remonta ao trocar de modo).
export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <header className="pt-28 pb-10 md:pb-16">
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
        <ModeSwitch slug={study.slug} />
      </Reveal>
    </header>
  );
}

export function CaseCover({ study, className = "" }: { study: CaseStudy; className?: string }) {
  const { width, height } = study.cover;

  // Com largura e altura, a capa aparece inteira na proporção real; sem elas, usa 16:10 com corte.
  return (
    <Media
      {...study.cover}
      fill={!(width && height)}
      priority
      sizes="(min-width: 1024px) 1024px, 100vw"
      className={width && height ? `w-full rounded-xl ${className}` : `aspect-16/10 w-full rounded-xl ${className}`}
    />
  );
}
