import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/content/cases/types";
import { SectionTitle } from "./SectionTitle";
import { SubSectionTitle } from "./SubSection";

export function Overview({ overview }: { overview: CaseStudy["overview"] }) {
  const { info, role, summary, strategy } = overview;

  return (
    <section className="mb-16 md:mb-24">
      <SectionTitle>Visão geral</SectionTitle>

      <Reveal>
        <dl className="border-t border-line text-lg">
          {info.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:gap-8">
              <dt className="shrink-0 font-medium text-accent sm:w-48">{item.label}</dt>
              <dd className="flex-1">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {(role || summary || strategy) && (
        <div className="mt-10 grid grid-cols-1 gap-x-24 gap-y-10 text-lg md:mt-16 md:grid-cols-2 md:gap-y-16">
          {role && (
            <Reveal>
              <SubSectionTitle>Meu papel</SubSectionTitle>
              <p className="mb-6">{role.titles}</p>
              <p>{role.description}</p>
            </Reveal>
          )}

          {summary && (
            <Reveal delay={0.05}>
              <SubSectionTitle>Resumo do projeto</SubSectionTitle>
              <p className="mb-6">{summary.text}</p>
              <ul className="space-y-4">
                {summary.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </Reveal>
          )}

          {strategy && (
            <Reveal>
              <SubSectionTitle>Estratégia</SubSectionTitle>
              <ul className="space-y-4">
                {strategy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
