import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlockRenderer } from "@/components/case/BlockRenderer";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseNav } from "@/components/case/CaseNav";
import { Overview } from "@/components/case/Overview";
import { SectionTitle } from "@/components/case/SectionTitle";
import { cases, getCase } from "@/content/cases";
import { site } from "@/content/site";
import { openGraphBase } from "@/app/shared-metadata";

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

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

// A leitura de params fica dentro do Suspense para o shell da rota ser compartilhado entre os casos
// (exigência da navegação instantânea do Next 16). Os casos conhecidos continuam pré-renderizados no build.
export default function CaseStudyPage({ params }: PageProps<"/projetos/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}

async function CaseStudyContent({ params }: Pick<PageProps<"/projetos/[slug]">, "params">) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const index = cases.indexOf(study);
  const next = cases[(index + 1) % cases.length];

  // A cor do caso substitui o --accent global só dentro do artigo.
  const accentStyle = study.accent ? ({ "--accent": study.accent } as React.CSSProperties) : undefined;

  return (
    <article style={accentStyle} className="container mx-auto max-w-5xl px-4 pb-24 text-pretty sm:px-6 lg:px-8">
      <CaseHero study={study} />
      <Overview overview={study.overview} />
      {study.sections.map((section) => (
        <section key={section.title} className="mb-24">
          <SectionTitle>{section.title}</SectionTitle>
          <BlockRenderer blocks={section.blocks} />
        </section>
      ))}
      {next !== study && <CaseNav next={next} />}
    </article>
  );
}
