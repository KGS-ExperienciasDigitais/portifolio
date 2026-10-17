import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Todos os robôs liberados (inclusive os de IA): o portfólio quer ser encontrado. Só a API fica de fora.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
