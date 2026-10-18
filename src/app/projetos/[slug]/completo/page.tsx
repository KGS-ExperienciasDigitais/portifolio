import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlockRenderer } from "@/components/case/BlockRenderer";
import { CaseCover } from "@/components/case/CaseHero";
import { Overview } from "@/components/case/Overview";
import { SectionTitle } from "@/components/case/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getCase } from "@/content/cases";
import { slugify } from "@/content/cases/slug";
import { site } from "@/content/site";
import { openGraphBase } from "@/app/shared-metadata";

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]/completo">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  const path = `/projetos/${study.slug}/completo`;
  const title = `${study.name} · estudo completo`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphBase(study.og),
      type: "article",
      url: path,
      title: `${title} | ${site.name}`,
      description: study.summary,
    },
  };
}

// O artigo inteiro: capa, visão geral e todas as seções.
export default function CaseFullPage({ params }: PageProps<"/projetos/[slug]/completo">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FullContent params={params} />
    </Suspense>
  );
}

async function FullContent({ params }: Pick<PageProps<"/projetos/[slug]/completo">, "params">) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  return (
    <>
      <Reveal delay={0.1} className="mb-16">
        <CaseCover study={study} />
      </Reveal>
      <Overview overview={study.overview} />
      {study.sections.map((section) => (
        <section key={section.title} className="mb-24">
          <SectionTitle id={slugify(section.title)}>{section.title}</SectionTitle>
          <BlockRenderer blocks={section.blocks} />
        </section>
      ))}
    </>
  );
}
