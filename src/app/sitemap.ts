import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

// Só as URLs: o Google ignora priority e changefreq, e só usa lastModified quando a data é real.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...cases.flatMap((study) => [
      { url: `${site.url}/projetos/${study.slug}` },
      { url: `${site.url}/projetos/${study.slug}/resumo` },
    ]),
  ];
}
