import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlockRenderer } from "@/components/case/BlockRenderer";
import { CaseCover } from "@/components/case/CaseHero";
import { Overview } from "@/components/case/Overview";
import { SectionTitle } from "@/components/case/SectionTitle";
import { SummaryPrompt } from "@/components/case/SummaryPrompt";
import { Reveal } from "@/components/ui/Reveal";
import { getCase } from "@/content/cases";
import { slugify } from "@/content/cases/slug";
import { site } from "@/content/site";
import { openGraphBase } from "@/app/shared-metadata";

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  const path = `/projetos/${study.slug}`;
  return {
    title: study.name,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphBase(study.og),
      type: "article",
      url: path,
      title: `${study.name} | ${site.name}`,
      description: study.summary,
    },
  };
}

// Estudo completo, a página padrão do caso: capa, visão geral e todas as seções. O resumo fica em /resumo.
export default function CaseFullPage({ params }: PageProps<"/projetos/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FullContent params={params} />
    </Suspense>
  );
}

async function FullContent({ params }: Pick<PageProps<"/projetos/[slug]">, "params">) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  return (
    <>
      <Reveal delay={0.1} className="mb-10 md:mb-16">
        <CaseCover study={study} />
      </Reveal>
      <Overview overview={study.overview} />
      {/* O aviso do resumo fica no canto até o fim da Visão geral passar do meio da tela. */}
      <SummaryPrompt href={`/projetos/${study.slug}/resumo`} />
      {study.sections.map((section) => (
        <section key={section.title} className="mb-16 md:mb-24">
          <SectionTitle id={slugify(section.title)}>{section.title}</SectionTitle>
          <BlockRenderer blocks={section.blocks} />
        </section>
      ))}
    </>
  );
}
