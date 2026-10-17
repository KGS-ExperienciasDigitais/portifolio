"use client";

import { site } from "@/content/site";
import "./globals.css";

// Aparece só quando o próprio layout raiz quebra. Substitui o layout, por isso traz <html>, <body> e o CSS.
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR" className="dark antialiased">
      <body className="bg-dot-grid min-h-screen font-sans">
        <title>{`Algo deu errado | ${site.name}`}</title>
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-sm font-medium tracking-wider text-subtle uppercase">Erro</p>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Algo deu errado</h1>
          <p className="mb-8 text-lg text-muted">A página não carregou. Tente de novo em alguns instantes.</p>
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Tentar de novo
          </button>
        </section>
      </body>
    </html>
  );
}
