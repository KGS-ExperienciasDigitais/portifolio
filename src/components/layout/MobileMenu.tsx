"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItems, site } from "@/content/site";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { ThemeToggle } from "./ThemeToggle";
import { trackCvClick } from "./trackCvClick";

export function MobileMenu({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    // No celular, o tema troca no botão de sol/lua, no canto. Com texto ampliado, este menu também vale no desktop,
    // onde a cordinha continua: a margem deixa espaço para ela, e dividir pela escala do texto mantém o espaço fixo,
    // já que a cordinha não cresce com o texto.
    <div className="flex items-center gap-2 md:mr-[calc(6rem/var(--text-scale,1))] md:hidden text-up:max-lg:flex! text-large:flex!">
      <AccessibilityMenu labelFrom="sm" />
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="glass inline-flex size-(--icon-button) items-center justify-center rounded-full text-black dark:text-slate-100"
      >
        {open ? <X className="size-(--icon)" /> : <Menu className="size-(--icon)" />}
      </button>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="glass absolute top-14 right-4 left-4 rounded-2xl p-2">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={close}
                  aria-current={active === item.id ? "true" : undefined}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-gray-800 hover:bg-black/5 aria-[current=true]:bg-black/10 aria-[current=true]:font-bold dark:text-slate-200 dark:aria-[current=true]:bg-white/20 dark:hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.cv}
                download
                aria-label="Baixar CV em PDF"
                onClick={() => {
                  trackCvClick();
                  close();
                }}
                className="block rounded-xl px-4 py-3 text-base font-medium text-gray-800 hover:bg-black/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                CV
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* Depois do menu no DOM: o Tab vai do botão do menu direto para os links. Na tela fica no canto (o menu é absolute). */}
      <ThemeToggle className="size-(--icon-button) text-black md:hidden dark:text-slate-100" iconClassName="size-(--icon)" />
    </div>
  );
}
