import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { slugify } from "@/content/cases/slug";
import type { Block, CaseStudy } from "@/content/cases/types";
import { renderBlock } from "./BlockRenderer";
import { TextBlock } from "./Blocks";
import { CaseCover } from "./CaseHero";
import { ScrollySteps, type ScrollyStep } from "./ScrollySteps";

// Títulos de seção e de subseção do estudo completo: as âncoras que uma etapa pode citar em `more`.
function anchorTitles(study: CaseStudy) {
  return study.sections.flatMap((section) => [
    section.title,
    ...section.blocks.flatMap((block) => (block.type === "subsection" ? [block.title] : [])),
  ]);
}

function StepHeading({ number, total, title }: { number: number; total: number; title: string }) {
  return (
    <>
      <p className="mb-3 text-sm font-semibold tracking-wider text-subtle tabular-nums">
        <span className="text-accent">{String(number).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
      </p>
      <h2 className="mb-5 text-3xl leading-tight font-medium text-balance sm:text-4xl">{title}</h2>
    </>
  );
}

function Visual({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block, { compact: true })}</Fragment>
      ))}
    </div>
  );
}

// Resumo do caso: "Visão geral" (montada do overview e da capa), as etapas de `steps` e o fecho de `takeaway`.
export function CaseSummary({ study }: { study: CaseStudy }) {
  const fullHref = `/projetos/${study.slug}/completo`;
  const total = study.steps.length + 2;

  // Pega erro de digitação no build: um `more` que não existe viraria um link para lugar nenhum.
  const anchors = anchorTitles(study);
  for (const step of study.steps) {
    if (step.more && !anchors.includes(step.more)) {
      throw new Error(`Caso "${study.slug}": a etapa "${step.label}" aponta para "${step.more}", que não é título de seção nem de subseção.`);
    }
  }

  const steps: ScrollyStep[] = [
    {
      id: "etapa-1",
      label: "Visão geral",
      text: (
        <>
          <StepHeading number={1} total={total} title="Visão geral" />
          <dl className="space-y-4">
            {study.overview.info.map((item) => (
              <div key={item.label}>
                <dt className="font-medium text-accent">{item.label}</dt>
                <dd className="leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
      visual: <CaseCover study={study} />,
    },
    ...study.steps.map((step, index) => ({
      id: `etapa-${index + 2}`,
      label: step.label,
      text: (
        <>
          <StepHeading number={index + 2} total={total} title={step.title} />
          <TextBlock type="text" body={step.body} />
          {step.more && (
            <Link
              href={`${fullHref}#${slugify(step.more)}`}
              className="mt-6 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
            >
              Ler no estudo completo
              <span className="sr-only">: {step.more}</span>
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </>
      ),
      visual: <Visual blocks={step.visual} />,
    })),
  ];

  const closing = {
    id: `etapa-${total}`,
    label: study.takeaway.title,
    content: (
      <>
        <StepHeading number={total} total={total} title={study.takeaway.title} />
        <TextBlock type="text" body={study.takeaway.body} />
        <Link
          href={fullHref}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-transform active:scale-[0.98] dark:text-slate-950"
        >
          <BookOpen aria-hidden className="size-5" />
          Ler o estudo completo
        </Link>
      </>
    ),
  };

  return <ScrollySteps steps={steps} closing={closing} fullHref={fullHref} />;
}
