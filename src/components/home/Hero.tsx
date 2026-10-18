import { ScrollMouse } from "@/components/home/ScrollCue";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    // Altura do conteúdo, sem tela cheia: pb-15 (60px) + pt-16 da seção seguinte = 124px até o título dela.
    // No lg, pt-46 deixa os mesmos 124px de ar abaixo do header fixo (top-4 + pill ≈ 60px).
    <section id="inicio" className="px-4 pt-28 pb-15 sm:px-6 lg:px-8 lg:pt-46">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal>
              <h1 className="mb-8 text-4xl leading-[1.15] font-bold text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                Olá, eu sou <span className="text-accent">{site.name}</span>
                <span className="mt-6 block">{site.role}</span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg md:text-xl">{site.tagline}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex justify-center">
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
