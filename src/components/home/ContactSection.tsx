import { Mail } from "lucide-react";
import { BehanceIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const channels = [
  { label: "Email", href: `mailto:${site.links.email}`, icon: <Mail className="size-6" />, external: false },
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon />, external: true },
  { label: "Behance", href: site.links.behance, icon: <BehanceIcon />, external: true },
];

export function ContactSection() {
  return (
    <section id="contato" className="px-4 pt-16 pb-20 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Vamos conversar</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg">
            Estou aberto a novos projetos, ideias e oportunidades de fazer parte do seu time. Fique à vontade para entrar
            em contato!
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mb-12 flex flex-wrap justify-center gap-6">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-2 rounded-lg bg-gray-50 p-4 transition-colors hover:text-accent dark:bg-slate-900"
                >
                  {channel.icon}
                  <span className="text-sm font-medium">{channel.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="rounded-lg bg-gray-50 p-8 dark:bg-slate-900">
            <h3 className="mb-4 text-xl font-semibold">Mande uma mensagem</h3>
            <a
              href={`mailto:${site.links.email}`}
              className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Entrar em contato
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
