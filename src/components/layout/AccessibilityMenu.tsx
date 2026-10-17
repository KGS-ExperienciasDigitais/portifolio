"use client";

import { Accessibility } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  A11Y_CHANGE_EVENT,
  CONTRASTS,
  DEFAULT_PREFS,
  TEXT_STEPS,
  applyPrefs,
  readPrefs,
  savePrefs,
  type ContrastId,
} from "./accessibility";

function subscribe(callback: () => void) {
  // Outra aba mudou as preferências: aplica aqui também.
  const onStorage = () => {
    applyPrefs(readPrefs());
    callback();
  };
  window.addEventListener(A11Y_CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(A11Y_CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

// Snapshot em string para o useSyncExternalStore comparar por valor; mantém as instâncias desktop e mobile em sincronia.
const getSnapshot = () => {
  const prefs = readPrefs();
  return `${prefs.scale}|${prefs.contrast}`;
};
const getServerSnapshot = () => `${DEFAULT_PREFS.scale}|${DEFAULT_PREFS.contrast}`;

function useA11yPrefs() {
  const [scale, contrast] = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot).split("|");
  return { scale: Number(scale), contrast: contrast as ContrastId };
}

const swatches: Record<ContrastId, string> = {
  auto: "bg-[linear-gradient(135deg,#ffffff_50%,#0f172a_50%)] text-gray-500",
  padrao: "bg-white text-gray-500",
  reforcado: "bg-white font-bold text-black",
  alto: "bg-black font-bold text-[#ffff00]",
};

const sizeButton =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-bold text-gray-800 transition-colors hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-100 dark:hover:bg-white/10";

// O texto "Acessibilidade" só aparece onde cabe sem encostar na cordinha do tema; antes disso, fica só o ícone
// (o aria-label mantém o mesmo nome para leitores de tela).
const labelBreakpoints = {
  sm: { button: "sm:h-auto sm:px-4 sm:py-2", label: "hidden sm:inline" },
  // Com texto ampliado, entre 1024 e 1279px o rótulo encostaria na cordinha.
  lg: { button: "lg:px-5 text-up:max-xl:px-0!", label: "hidden lg:inline text-up:max-xl:hidden!" },
};

export function AccessibilityMenu({ labelFrom }: { labelFrom: keyof typeof labelBreakpoints }) {
  const [open, setOpen] = useState(false);
  const prefs = useA11yPrefs();
  const panelId = useId();
  const sizeLabelId = useId();
  const contrastLabelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Em dev, o remount do Strict Mode limpa os atributos que o script inline pôs no <html>. Em produção não faz nada.
  useLayoutEffect(() => applyPrefs(readPrefs()), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const step = TEXT_STEPS.indexOf(prefs.scale);
  const setStep = (index: number) => savePrefs({ ...prefs, scale: TEXT_STEPS[index] });
  const setContrast = (contrast: ContrastId) => savePrefs({ ...prefs, contrast });

  // Setas movem a seleção no grupo de contraste, como num grupo de rádios nativo.
  const handleRadioKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + CONTRASTS.length) % CONTRASTS.length;
    setContrast(CONTRASTS[next].id);
    radioRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className="md:relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Acessibilidade"
        title="Acessibilidade"
        className={`glass inline-flex h-(--icon-button) min-w-(--icon-button) items-center justify-center gap-2 rounded-full text-sm font-medium text-black transition-colors hover:bg-white/60 md:h-12 md:min-w-12 dark:text-slate-100 dark:hover:bg-white/10 ${labelBreakpoints[labelFrom].button}`}
      >
        <Accessibility className="size-(--icon) shrink-0 md:size-5" aria-hidden />
        <span className={labelBreakpoints[labelFrom].label}>Acessibilidade</span>
      </button>

      {open && (
        <section
          id={panelId}
          aria-label="Opções de acessibilidade"
          className="glass absolute top-14 right-4 left-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl p-4 text-gray-900 md:top-full md:right-0 md:left-auto md:mt-3 md:w-80 dark:text-slate-100"
        >
          <p id={sizeLabelId} className="text-sm font-semibold">
            Tamanho do texto
          </p>
          <div role="group" aria-labelledby={sizeLabelId} className="mt-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step <= 0}
              aria-label="Diminuir texto"
              className={`${sizeButton} text-sm`}
            >
              A−
            </button>
            <button
              type="button"
              onClick={() => setStep(TEXT_STEPS.indexOf(1))}
              disabled={prefs.scale === 1}
              aria-label="Tamanho padrão do texto"
              className={`${sizeButton} text-base`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step >= TEXT_STEPS.length - 1}
              aria-label="Aumentar texto"
              className={`${sizeButton} text-lg`}
            >
              A+
            </button>
            <output aria-live="polite" className="ml-auto text-sm font-medium tabular-nums">
              {Math.round(prefs.scale * 100)}%
            </output>
          </div>

          <p id={contrastLabelId} className="mt-5 text-sm font-semibold">
            Contraste
          </p>
          <div role="radiogroup" aria-labelledby={contrastLabelId} className="mt-2 flex flex-col gap-1">
            {CONTRASTS.map((option, index) => {
              const checked = prefs.contrast === option.id;
              return (
                <button
                  key={option.id}
                  ref={(element) => {
                    radioRefs.current[index] = element;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => setContrast(option.id)}
                  onKeyDown={(event) => handleRadioKeyDown(event, index)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                    checked
                      ? "bg-white/75 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:bg-white/20"
                      : "hover:bg-white/40 dark:hover:bg-white/10"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-400 text-xs ${swatches[option.id]}`}
                  >
                    Aa
                  </span>
                  <span className="flex flex-col">
                    <span className={`text-sm ${checked ? "font-bold" : "font-medium"}`}>{option.label}</span>
                    <span className="text-xs text-gray-600 dark:text-slate-400">{option.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
