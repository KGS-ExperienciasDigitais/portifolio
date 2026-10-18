import { GlassCard } from "@/components/ui/GlassCard";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { CvDownloadButton } from "./CvDownloadButton";
import { ExperienceCard } from "./ExperienceCard";
import { LocationCard } from "./LocationCard";
import { ProfileCard } from "./ProfileCard";
import { SoftwareMarquee } from "./SoftwareMarquee";
import { ToolLogoMarquee } from "./ToolLogoMarquee";

// Divide uma lista em `count` faixas de tamanho parecido.
function splitRows<T>(items: readonly T[], count: number): T[][] {
  const size = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, row) => items.slice(row * size, (row + 1) * size));
}

const toolRows = splitRows(site.tools, 3);
const methodRows = splitRows(site.methods, 2);

export function About() {
  return (
    <section id="sobre" className="px-4 pt-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <Reveal className="mb-16 flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">Sobre mim</h2>
          <CvDownloadButton />
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="flex h-full flex-col gap-4">
            <Reveal y={30}>
              <ProfileCard />
            </Reveal>
            <Reveal y={30} delay={0.05} className="flex flex-1 flex-col">
              <GlassCard className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="mb-6 text-center text-xl font-semibold">{site.currently.title}</h3>
                <div className="flex min-h-50 flex-1 items-center justify-center">
                  <div className="w-36">
                    <Media {...site.currently.cover} sizes="160px" className="rounded-md shadow-lg" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="mb-1 text-lg font-bold">{site.currently.item}</h4>
                  <p className="text-xs text-subtle">{site.currently.kind}</p>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal y={30} delay={0.1}>
            <ExperienceCard />
          </Reveal>

          <div className="flex h-full flex-col gap-4">
            <Reveal y={30} delay={0.2}>
              <LocationCard />
            </Reveal>
            <Reveal y={30} delay={0.25} className="flex flex-1 flex-col">
              <GlassCard className="flex flex-1 flex-col gap-8 p-6 lg:p-8">
                <div className="flex grow flex-col">
                  <h3 className="mb-6 text-xl font-semibold">Ferramentas</h3>
                  <div className="flex grow flex-col justify-center gap-4">
                    {toolRows.map((row, index) => (
                      <ToolLogoMarquee key={index} items={row} reverse={index % 2 === 1} />
                    ))}
                  </div>
                </div>
                <div className="flex grow flex-col">
                  <h3 className="mb-6 text-xl font-semibold">Métodos</h3>
                  <div className="flex grow flex-col justify-center gap-4">
                    {methodRows.map((row, index) => (
                      <SoftwareMarquee key={index} items={row} reverse={index % 2 === 0} />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
