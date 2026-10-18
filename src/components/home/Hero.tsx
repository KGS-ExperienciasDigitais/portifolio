import { ScrollMouse } from "@/components/home/ScrollCue";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    // Celular: o Hero ocupa a primeira tela (svh, com as barras do navegador à mostra). Foto pequena e texto ficam
    // centralizados no espaço livre e o "Ver projetos" fica na base; a foto acompanha a altura da tela para caber.
    // Do md para cima, espaços em px fixos, iguais na escala de 80% do notebook e na de 100%:
    // - topo: 64px abaixo da pílula do menu, que termina em 3.125rem + 1px (top-4 + metade da linha do nome + metade da pílula);
    // - base: 124px até o título da seção seguinte, que já começa com pt-16 (4rem).
    <section
      id="inicio"
      className="flex min-h-svh flex-col px-4 pt-20 pb-0 sm:px-6 md:block md:min-h-0 md:pt-[calc(3.125rem+65px)] md:pb-[max(0px,124px-4rem)] lg:px-8"
    >
      <div className="container mx-auto flex max-w-7xl flex-1 flex-col md:block">
        <div className="flex flex-1 flex-col md:grid md:grid-cols-1 md:items-center md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-1 flex-col text-center md:block md:text-left">
            <div className="flex flex-1 flex-col items-center justify-center md:block">
              <Reveal className="mb-6 md:hidden">
                <div className="rounded-2xl bg-white/60 p-1.5 shadow-lg ring-1 ring-black/5 dark:bg-slate-800/60 dark:ring-white/10">
                  <Media
                    {...site.profile.heroPhoto}
                    fill
                    priority
                    sizes="(min-width: 768px) 0px, 176px"
                    className="size-[clamp(7rem,25svh,11rem)] rounded-xl"
                    imageClassName="origin-[56%_40%] scale-115"
                  />
                </div>
              </Reveal>
              <Reveal>
                <h1 className="mb-6 text-4xl leading-[1.15] font-bold text-balance sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
                  Olá, eu sou <span className="text-accent">{site.name}</span>
                  <span className="mt-3 block md:mt-6">{site.role}</span>
                </h1>
                <p className="mx-auto max-w-2xl text-base text-balance sm:text-lg md:mx-0 md:text-xl md:text-wrap">{site.tagline}</p>
              </Reveal>
            </div>
            {/* No celular o respiro fica dentro do Reveal: ele só aparece quando entra 60px na tela, e começa 20px abaixo. */}
            <Reveal delay={0.3} className="mt-auto flex justify-center pt-8 pb-6 md:mt-10 md:pt-0 md:pb-0">
              <ScrollMouse />
            </Reveal>
          </div>
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="rounded-3xl bg-white/60 p-3 shadow-xl ring-1 ring-black/5 dark:bg-slate-800/60 dark:ring-white/10">
              <Media
                {...site.profile.heroPhoto}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 0px"
                className="aspect-6/5 w-full rounded-2xl"
                imageClassName="origin-[56%_40%] scale-115"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
