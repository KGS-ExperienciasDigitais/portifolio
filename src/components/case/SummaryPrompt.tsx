"use client";

import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const text = site.summaryPrompt;

// Fechar vale para a sessão inteira (todos os casos). A memória cobre o sessionStorage bloqueado.
const DISMISSED_KEY = "aviso-resumo-fechado";
let dismissedInMemory = false;
const dismissedListeners = new Set<() => void>();

function subscribeDismissed(callback: () => void) {
  dismissedListeners.add(callback);
  return () => dismissedListeners.delete(callback);
}

function getDismissed() {
  if (dismissedInMemory) return true;
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function dismiss() {
  dismissedInMemory = true;
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {}
  dismissedListeners.forEach((listener) => listener());
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

// Aviso no canto do estudo completo oferecendo o resumo, só nas primeiras rolagens.
// O marcador fica logo depois da Visão geral: o aviso aparece enquanto ele estiver abaixo do meio da tela,
// então some quando o leitor entra no corpo do caso e volta se ele subir ao topo. Quem chega por âncora não vê.
// Desktop: card de vidro com ✕. Celular: só a pílula, que não cobre o texto.
// No servidor não renderiza nada (o aviso depende da rolagem), então não pisca na hidratação.
export function SummaryPrompt({ href }: { href: string }) {
  const markerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const early = useSyncExternalStore(
    subscribeScroll,
    () => (markerRef.current ? markerRef.current.getBoundingClientRect().top > window.innerHeight / 2 : false),
    () => false,
  );
  const dismissed = useSyncExternalStore(subscribeDismissed, getDismissed, () => true);
  const visible = early && !dismissed;

  return (
    <>
      <div ref={markerRef} aria-hidden />
      <AnimatePresence>
        {visible && (
          <motion.aside
            key="aviso-resumo"
            aria-label={text.label}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:right-6 md:bottom-6"
          >
            <Link
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-white shadow-lg transition-transform active:scale-[0.98] md:hidden dark:text-slate-950"
            >
              {text.action}
              <ArrowRight aria-hidden className="size-4" />
            </Link>

            <div className="glass relative hidden w-72 rounded-2xl p-5 md:block">
              <button
                type="button"
                onClick={dismiss}
                aria-label={text.close}
                className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full text-subtle transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X aria-hidden className="size-4" />
              </button>
              <p className="pr-8 text-lg font-semibold">{text.title}</p>
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-white transition-transform active:scale-[0.98] dark:text-slate-950"
              >
                {text.action}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
