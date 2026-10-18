"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Qual dos elementos (pelos ids, na ordem da página) está ativo: o último cujo topo já passou da linha
// `line` (fração da altura da tela, 0.5 = meio, ou uma função estável que devolve a linha em px).
// No fim da rolagem, o último vira o ativo, porque ele pode nunca chegar à linha.
// Por posição, e não por interseção, para acertar também em saltos e entre elementos.
// `select` marca um id na hora (clique num link de etapa, foco) e ignora a rolagem até ela parar,
// para não passar por todas as etapas do caminho.
export function useActiveId(ids: readonly string[], enabled = true, line: number | (() => number) = 0.5) {
  const [active, setActive] = useState(ids[0]);
  const paused = useRef(false);
  const key = ids.join(" ");

  useEffect(() => {
    if (!enabled) return;
    const list = key.split(" ");
    let frame = 0;

    function update() {
      frame = 0;
      if (paused.current) return;
      const root = document.documentElement;
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(list[list.length - 1]);
        return;
      }
      const limit = typeof line === "function" ? line() : window.innerHeight * line;
      let current = list[0];
      for (const id of list) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= limit) current = id;
      }
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, enabled, line]);

  const select = useCallback((id: string) => {
    setActive(id);
    paused.current = true;

    let timer = window.setTimeout(resume, 200);
    function onScroll() {
      window.clearTimeout(timer);
      timer = window.setTimeout(resume, 150);
    }
    function resume() {
      paused.current = false;
      window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }, []);

  return { active: enabled ? active : null, select };
}
