import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/content/site";

export function ExperienceCard() {
  return (
    <GlassCard className="h-full p-6 lg:p-8">
      <h3 className="mb-6 text-xl font-semibold max-md:text-center">Experiência</h3>
      <ol className="space-y-6">
        {site.experience.map((job, index) => (
          <li
            key={`${job.company}-${job.highlights[0]}`}
            className={`space-y-3 ${index > 0 ? "border-t border-white/50 pt-6 dark:border-white/10" : ""}`}
          >
            {/* No celular o cabeçalho de cada experiência fica no centro; os tópicos com • continuam à esquerda. */}
            <div className="max-md:text-center">
              <h4 className="font-semibold">{job.title}</h4>
              <p className="flex flex-wrap items-center gap-2 text-sm text-muted max-md:justify-center">
                {job.company}
                <span aria-hidden className="text-xs text-subtle">
                  •
                </span>
                <span className="text-xs text-subtle">{job.period}</span>
              </p>
              <p className="text-xs text-subtle">{job.location}</p>
            </div>
            <ul className="space-y-1.5">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start text-sm leading-relaxed text-muted">
                  <span className="mr-2 text-accent">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </GlassCard>
  );
}
