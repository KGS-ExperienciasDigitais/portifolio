import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/content/cases/types";

export function CaseNav({ next }: { next: CaseStudy }) {
  return (
    <nav aria-label="Próximo estudo de caso" className="mt-24 border-t border-line pt-12">
      <p className="mb-2 text-sm font-medium tracking-wider text-subtle uppercase">Próximo estudo de caso</p>
      <Link
        href={`/projetos/${next.slug}`}
        className="group inline-flex items-center gap-3 text-2xl font-medium transition-colors hover:text-accent sm:text-3xl"
      >
        {next.name}
        <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
      </Link>
    </nav>
  );
}
