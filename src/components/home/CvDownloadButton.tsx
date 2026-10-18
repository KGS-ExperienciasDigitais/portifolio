"use client";

import { Download } from "lucide-react";
import { trackCvClick } from "@/components/layout/trackCvClick";
import { site } from "@/content/site";

// Baixa o PDF do currículo e registra o clique, igual ao CV da navbar.
export function CvDownloadButton() {
  return (
    <a
      href={site.links.cv}
      download
      onClick={trackCvClick}
      className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-95 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      <Download aria-hidden="true" className="size-4" />
      {site.cvButton}
      <span className="sr-only"> em PDF</span>
    </a>
  );
}
