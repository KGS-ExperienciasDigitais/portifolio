import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { site } from "@/content/site";

// O canonical fica na página, não no layout: no layout, toda página nova herdaria o canonical da home.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Dados estruturados (ProfilePage + Person) para o Google entender de quem é o portfólio.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.fullName,
    jobTitle: site.role,
    description: site.profile.bio,
    url: site.url,
    image: `${site.url}${site.profile.heroPhoto.src}`,
    homeLocation: { "@type": "Place", name: site.location.city },
    sameAs: [site.links.linkedin],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escapa "<" para que nenhum texto feche a tag <script> (recomendação do Next contra XSS).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      {/* O que vem abaixo do Hero só aparece depois que o visitante rola a página, menos o título e o subtítulo
          de Projetos (o ProjectsSection esconde os próprios cards). */}
      <ProjectsSection />
      <RevealOnScroll>
        <About />
        <ContactSection />
      </RevealOnScroll>
    </>
  );
}
