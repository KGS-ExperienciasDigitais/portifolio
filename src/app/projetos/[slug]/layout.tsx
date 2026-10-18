import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseNav } from "@/components/case/CaseNav";
import { cases, getCase } from "@/content/cases";

// Vale para o resumo (page.tsx) e para o estudo completo (completo/page.tsx).
export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

// Topo e navegação entre casos ficam aqui: trocar de modo só troca a página, sem remontar o topo.
// A leitura de params fica dentro do Suspense para o shell da rota ser compartilhado entre os casos
// (exigência da navegação instantânea do Next 16). Os casos conhecidos continuam pré-renderizados no build.
export default function CaseLayout({ children, params }: LayoutProps<"/projetos/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CaseShell params={params}>{children}</CaseShell>
    </Suspense>
  );
}

async function CaseShell({ children, params }: Pick<LayoutProps<"/projetos/[slug]">, "children" | "params">) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const index = cases.indexOf(study);
  const next = cases[(index + 1) % cases.length];

  // A cor do caso substitui o --accent global só dentro do artigo.
  const accentStyle = study.accent ? ({ "--accent": study.accent } as React.CSSProperties) : undefined;

  return (
    <article style={accentStyle} className="container mx-auto max-w-5xl px-4 pb-16 text-pretty sm:px-6 md:pb-24 lg:px-8">
      <CaseHero study={study} />
      {children}
      {next !== study && <CaseNav next={next} />}
    </article>
  );
}
