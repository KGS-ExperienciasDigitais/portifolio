// Preferências de acessibilidade: tamanho do texto (WCAG G178, até 200%) e contraste (WCAG G174 / padrão gov.br).
// Ficam no localStorage e são aplicadas no <html> por um script inline antes da primeira pintura (ver layout.tsx).

export const TEXT_STEPS: readonly number[] = [0.9, 1, 1.12, 1.25, 1.5, 1.75, 2];

export const CONTRASTS = [
  { id: "auto", label: "Automático", hint: "Segue o sistema" },
  { id: "padrao", label: "Padrão", hint: "Cores originais" },
  { id: "reforcado", label: "Reforçado", hint: "Textos mais escuros" },
  { id: "alto", label: "Alto contraste", hint: "Preto e amarelo" },
] as const;

export type ContrastId = (typeof CONTRASTS)[number]["id"];
export type A11yPrefs = { scale: number; contrast: ContrastId };

const STORAGE_KEY = "a11y";
export const A11Y_CHANGE_EVENT = "a11ychange";
export const DEFAULT_PREFS: A11yPrefs = { scale: 1, contrast: "auto" };

// Mesma lógica de applyPrefs, em JS puro, para rodar no <head> antes do React.
// data-text-up: texto acima de 100%; data-text-large: 175% ou mais (o Header troca para o menu mobile).
export const a11yInitScript = `(function(){try{var p=JSON.parse(localStorage.getItem("${STORAGE_KEY}")||"{}"),r=document.documentElement;if(typeof p.scale==="number"&&p.scale!==1){r.style.setProperty("--text-scale",String(p.scale));if(p.scale>1)r.setAttribute("data-text-up","");if(p.scale>=1.75)r.setAttribute("data-text-large","")}if(p.contrast&&p.contrast!=="auto")r.setAttribute("data-contrast",p.contrast)}catch(e){}})()`;

function isContrast(value: unknown): value is ContrastId {
  return CONTRASTS.some((option) => option.id === value);
}

function isScale(value: unknown): value is number {
  return TEXT_STEPS.some((step) => step === value);
}

export function readPrefs(): A11yPrefs {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return {
      scale: isScale(stored.scale) ? stored.scale : DEFAULT_PREFS.scale,
      contrast: isContrast(stored.contrast) ? stored.contrast : DEFAULT_PREFS.contrast,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function setFlag(name: string, on: boolean) {
  if (on) document.documentElement.setAttribute(name, "");
  else document.documentElement.removeAttribute(name);
}

export function applyPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  if (prefs.scale === 1) root.style.removeProperty("--text-scale");
  else root.style.setProperty("--text-scale", String(prefs.scale));
  setFlag("data-text-up", prefs.scale > 1);
  setFlag("data-text-large", prefs.scale >= 1.75);

  if (prefs.contrast === "auto") root.removeAttribute("data-contrast");
  else root.setAttribute("data-contrast", prefs.contrast);
}

export function savePrefs(prefs: A11yPrefs) {
  applyPrefs(prefs);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
  window.dispatchEvent(new Event(A11Y_CHANGE_EVENT));
}
