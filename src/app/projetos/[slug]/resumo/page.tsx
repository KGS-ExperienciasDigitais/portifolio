import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseSummary } from "@/components/case/CaseSummary";
import { getCase } from "@/content/cases";
import { site } from "@/content/site";
import { openGraphBase } from "@/app/shared-metadata";

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]/resumo">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  const path = `/projetos/${study.slug}/resumo`;
  const title = `${study.name} · resumo`;
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

// Resumo em etapas. O estudo completo, página padrão do caso, fica em /projetos/slug.
export default function CaseSummaryPage({ params }: PageProps<"/projetos/[slug]/resumo">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SummaryContent params={params} />
    </Suspense>
  );
}

async function SummaryContent({ params }: Pick<PageProps<"/projetos/[slug]/resumo">, "params">) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  return <CaseSummary study={study} />;
}
