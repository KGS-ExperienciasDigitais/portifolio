"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

// Vira true na primeira rolagem e não volta: subir de novo ao topo não esconde nada.
let hasScrolled = false;

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrolled() {
  if (window.scrollY > 0) hasScrolled = true;
  return hasScrolled;
}

// Esconde o conteúdo até a primeira rolagem e então faz a mesma entrada do `Reveal`.
// O foco do teclado também mostra (ninguém tabula para um link invisível), e o leitor de tela lê tudo desde o início.
// Abrir a página já rolada (âncora, voltar do navegador) mostra direto. Com movimento reduzido, nada fica escondido.
// Só esconde do md para cima: no celular o Hero é curto e a primeira tela ficaria com um vão vazio.
// O motion grava opacity e transform inline; as classes com ! passam por cima já no HTML do servidor, sem piscar.
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const scrolled = useSyncExternalStore(subscribe, getScrolled, () => false);
  const [focused, setFocused] = useState(false);
  const visible = scrolled || focused || reduceMotion;

  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setFocused(true)}
      className={`max-md:opacity-100! max-md:transform-none! ${visible ? "" : "md:pointer-events-none"}`}
    >
      {children}
    </motion.div>
  );
}
