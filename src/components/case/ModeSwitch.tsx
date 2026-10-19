"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

// Alterna entre o estudo completo (/projetos/slug, o padrão) e o resumo (/projetos/slug/resumo).
// Escolher o modo pesa mais que navegar dentro dele: trilho sólido e ativo preenchido, sem vidro
// (fica parado no topo), para não se confundir com a barra de etapas, que é de vidro e discreta.
export function ModeSwitch({ slug }: { slug: string }) {
  const summary = useSelectedLayoutSegment() === "resumo";
  const modes = [
    { label: "Estudo completo", href: `/projetos/${slug}`, active: !summary },
    { label: "Resumo", href: `/projetos/${slug}/resumo`, active: summary },
  ];

  return (
    <nav aria-label="Modo de leitura" className="inline-flex max-w-full rounded-full bg-black/5 p-1 ring-1 ring-line dark:bg-white/8">
      <ul className="flex flex-wrap gap-1">
        {modes.map((mode) => (
          <li key={mode.href}>
            <Link
              href={mode.href}
              aria-current={mode.active ? "page" : undefined}
              className={`inline-flex rounded-full px-5 py-2.5 text-base font-semibold transition-all duration-200 active:scale-[0.98] ${
                mode.active ? "bg-foreground text-background shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              {mode.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
