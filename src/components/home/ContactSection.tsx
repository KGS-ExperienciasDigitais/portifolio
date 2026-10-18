import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const { contact, links } = site;

const channels = [
  {
    ...contact.email,
    href: `mailto:${links.email}`,
    icon: <Mail className="size-8" />,
    external: false,
  },
  {
    ...contact.linkedin,
    href: links.linkedin,
    icon: <LinkedinIcon className="size-8" />,
    external: true,
  },
  {
    ...contact.whatsapp,
    text: links.whatsapp.display,
    href: `https://wa.me/${links.whatsapp.number}?text=${encodeURIComponent(links.whatsapp.message)}`,
    icon: <WhatsappIcon className="size-8" />,
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="px-4 pt-16 pb-16 sm:px-6 md:pb-20 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">{contact.title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:mb-12">{contact.intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          {/* Colunas em rem: com o texto ampliado no menu de acessibilidade, os cards quebram de linha sozinhos. */}
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-6">
            {channels.map((channel) => (
              <li key={channel.label}>
                <GlassCard className="h-full">
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col gap-4 rounded-2xl p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="flex items-start justify-between">
                      <span className="transition-colors group-hover:text-accent">{channel.icon}</span>
                      <ArrowUpRight className="size-5 text-subtle transition-colors group-hover:text-accent" aria-hidden />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-lg font-semibold transition-colors group-hover:text-accent">
                        {channel.label}
                      </span>
                      <span className="text-muted">{channel.text}</span>
                      {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
                    </span>
                  </a>
                </GlassCard>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
