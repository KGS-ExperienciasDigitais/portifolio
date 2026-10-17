"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/content/site";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { MobileMenu } from "./MobileMenu";
import { trackCvClick } from "./trackCvClick";

const itemBase =
  "relative rounded-full px-2 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm";
const itemIdle =
  "text-gray-700 hover:bg-white/40 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white";
const itemActive =
  "bg-white/75 font-bold text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:bg-white/20 dark:text-white dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>(navItems[0].id);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");

  return (
    // O header ocupa a largura toda; só os filhos recebem cliques, para não bloquear a cordinha do tema.
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-50 px-4">
      <div className="mx-auto flex w-full max-w-384 items-center justify-between *:pointer-events-auto">
        <Link
          href="/#inicio"
          className="text-xl font-bold text-black transition-colors hover:text-gray-700 sm:text-2xl dark:text-slate-100 dark:hover:text-slate-300"
        >
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
        <span aria-hidden className="invisible hidden text-2xl font-bold md:block text-up:max-lg:hidden! text-large:hidden!">
          {site.fullName}
        </span>
      </div>
    </header>
  );
}
