"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

const base = "glass inline-flex items-center justify-center rounded-full";

// Botão de sol/lua: no celular fica no header, no lugar da cordinha; no desktop é a versão dela sem movimento.
// Posição, tamanho e cor vêm de quem usa.
export function ThemeToggle({ className = "", iconClassName = "" }: { className?: string; iconClassName?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // O tema só é conhecido no navegador: até lá, o círculo vazio guarda o lugar e o header não pula.
  if (!mounted) return <span aria-hidden className={`${base} ${className}`} />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Modo escuro"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${base} ${className}`}
    >
      {isDark ? <Sun className={iconClassName} aria-hidden /> : <Moon className={iconClassName} aria-hidden />}
    </button>
  );
}
