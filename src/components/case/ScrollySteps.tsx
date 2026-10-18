"use client";

import { BookOpen } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useActiveId } from "@/components/ui/useActiveId";

export type ScrollyStep = {
  id: string;
  label: string;
  text: React.ReactNode;
  visual: React.ReactNode;
};

type ScrollyStepsProps = {
  steps: ScrollyStep[];
  /** Fecho depois da grade, sem visual; também aparece na barra de etapas. */
  closing: { id: string; label: string; content: React.ReactNode };
  fullHref: string;
};

// Linha que ativa uma etapa: 30% da tela, para o título chegar perto do topo do visual. Nunca acima de 10.5rem,
// onde a âncora de uma etapa deixa o título (header + barra), senão com texto ampliado o salto marcaria a anterior.
function stepLine() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Math.max(window.innerHeight * 0.3, rem * 10.5);
}

// Itens da barra de etapas: só texto, sem pílula (a barra fica fixa durante a leitura e precisa ser discreta).
// min-h-9/min-w-9 garantem o alvo de toque.
const stepBase =
  "relative inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-200";
const stepIdle = "font-medium text-muted hover:text-foreground";

// Resumo em rolagem guiada. No desktop, o texto das etapas rola à esquerda e o visual da etapa ativa fica fixo
// à direita: os visuais ficam empilhados na mesma área da grade e só o ativo aparece. No celular, cada etapa
// é texto e visual em sequência. Texto e visual saem como irmãos, na ordem de leitura, sem duplicar nada.
export function ScrollySteps({ steps, closing, fullHref }: ScrollyStepsProps) {
  const all = [...steps, closing];
  const { active, select } = useActiveId(all.map((step) => step.id), true, stepLine);
  const activeIndex = all.findIndex((step) => step.id === active);
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  // No celular a barra rola para os lados: mantém a etapa ativa centralizada nela.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active, reduceMotion]);

  return (
    <div>
      <nav aria-label="Etapas do resumo" className="glass sticky top-20 z-40 mb-10 flex items-center gap-1 rounded-full px-2 py-0.5 md:mb-16">
        <ol ref={listRef} className="relative flex min-w-0 flex-1 items-center overflow-x-auto p-1 scrollbar-none">
          {all.map((step, index) => {
            const current = step.id === active;
            return (
              <li key={step.id} className="shrink-0">
                <a
                  href={`#${step.id}`}
                  onClick={() => select(step.id)}
                  aria-current={current ? "step" : undefined}
                  className={`${stepBase} ${current ? "font-semibold text-foreground" : stepIdle}`}
                >
                  {/* No celular só cabe o número; o nome aparece na etapa ativa (e sempre para o leitor de tela). */}
                  <span aria-hidden className="tabular-nums md:hidden">
                    {index + 1}
                  </span>
                  <span className={current ? undefined : "max-md:sr-only"}>{step.label}</span>
                  {/* Progresso: os segmentos se emendam numa linha só, na cor do caso até a etapa atual. Fica num span
                      à parte porque no Alto contraste tudo com bg-accent vira amarelo com texto preto, e isso não pode
                      pegar o link inteiro. */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-300 ${index <= activeIndex ? "bg-accent" : "bg-line"}`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
        <Link href={fullHref} className={`${stepBase} ${stepIdle} border-l border-line`}>
          <BookOpen aria-hidden className="size-4" />
          <span className="max-sm:sr-only">Estudo completo</span>
        </Link>
      </nav>

      <div
        className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[repeat(var(--steps),auto)] lg:gap-x-16"
        style={{ "--steps": steps.length } as React.CSSProperties}
      >
        {steps.map((step, index) => {
          const current = step.id === active;
          return (
            <Fragment key={step.id}>
              <div
                id={step.id}
                onFocusCapture={() => select(step.id)}
                style={{ "--row": index + 1 } as React.CSSProperties}
                className="scroll-mt-16 lg:col-start-1 lg:row-start-(--row) lg:min-h-[75dvh]"
              >
                <Reveal>{step.text}</Reveal>
              </div>
              {/* Foco num visual escondido (Tab no zoom) torna a etapa ativa, para o foco nunca ficar invisível.
                  Com texto ampliado o visual pode passar da altura da tela: ganha rolagem própria (no tamanho normal todos cabem). */}
              <div
                onFocusCapture={() => select(step.id)}
                className={`mt-6 mb-16 md:mt-8 md:mb-24 lg:sticky lg:top-40 lg:col-start-2 lg:row-span-full lg:my-0 lg:self-start lg:text-up:max-h-[calc(100dvh-12rem)] lg:text-up:overflow-y-auto lg:motion-safe:transition-[opacity,translate] lg:motion-safe:duration-500 lg:motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  current ? "lg:z-10" : "lg:pointer-events-none lg:translate-y-3 lg:opacity-0"
                }`}
              >
                <Reveal>{step.visual}</Reveal>
              </div>
            </Fragment>
          );
        })}
      </div>

      <section id={closing.id} className="scroll-mt-16 lg:mt-12">
        <Reveal>{closing.content}</Reveal>
      </section>
    </div>
  );
}
