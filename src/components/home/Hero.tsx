import { ScrollMouse } from "@/components/home/ScrollCue";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    // Espaços em px fixos, iguais na escala de 80% do notebook e na de 100%:
    // - topo (md+): 64px abaixo da pílula do menu, que termina em 3.125rem + 1px (top-4 + metade da linha do nome + metade da pílula);
    // - base (md+): 124px até o título da seção seguinte, que já começa com pt-16 (4rem);
    // - base no celular: sem pb, só os 64px do pt-16 da seção seguinte.
    <section
      id="inicio"
      className="px-4 pt-28 pb-0 sm:px-6 md:pt-[calc(3.125rem+65px)] md:pb-[max(0px,124px-4rem)] lg:px-8"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal>
              <h1 className="mb-6 text-4xl leading-[1.15] font-bold text-balance sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
                Olá, eu sou <span className="text-accent">{site.name}</span>
                <span className="mt-3 block md:mt-6">{site.role}</span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg md:text-xl">{site.tagline}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex justify-center md:mt-10">
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
