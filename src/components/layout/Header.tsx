"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillItemActive as itemActive, pillItemIdle as itemIdle } from "@/components/ui/pillItem";
import { useActiveId } from "@/components/ui/useActiveId";
import { navItems, site } from "@/content/site";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { MobileMenu } from "./MobileMenu";
import { trackCvClick } from "./trackCvClick";

const itemBase =
  "relative rounded-full px-2 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm";

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const pathname = usePathname();
  const { active } = useActiveId(sectionIds, pathname === "/");

  return (
    // O header ocupa a largura toda; só os filhos recebem cliques, para não bloquear a cordinha do tema.
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-50 px-4">
      <div className="mx-auto flex w-full max-w-384 items-center justify-between *:pointer-events-auto">
        <Link
          href="/#inicio"
          className="inline-flex items-center gap-2 text-xl font-bold text-black transition-colors hover:text-gray-700 sm:text-2xl dark:text-slate-100 dark:hover:text-slate-300"
        >
          {/* Em em: acompanha o tamanho do nome. A margem negativa devolve a altura de 1.2em, menor que a linha, então o header não cresce. */}
          <Image src={site.logo} alt="" width={128} height={128} unoptimized loading="eager" className="my-[-0.15em] size-[1.5em]" />
          {site.fullName}
        </Link>

        {/* Com texto ampliado o menu central não cabe ao lado do nome; o menu mobile assume (WCAG 1.4.4). */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block text-up:max-lg:hidden! text-large:hidden!">
          <nav aria-label="Principal" className="glass rounded-full px-2 py-1.5">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`${itemBase} ${active === item.id ? itemActive : itemIdle}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.links.cv} download aria-label="Baixar CV em PDF" onClick={trackCvClick} className={`${itemBase} ${itemIdle}`}>
                  CV
                </a>
              </li>
            </ul>
          </nav>
          {/* Fora do fluxo: o menu continua centralizado e o botão fica colado à direita dele. */}
          <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2">
            <AccessibilityMenu labelFrom="lg" />
          </div>
        </div>

        <MobileMenu active={active} />
        <span aria-hidden className="invisible hidden items-center gap-2 text-2xl font-bold md:inline-flex text-up:max-lg:hidden! text-large:hidden!">
          <span className="my-[-0.15em] size-[1.5em]" />
          {site.fullName}
        </span>
      </div>
    </header>
  );
}
