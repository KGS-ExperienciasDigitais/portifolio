import type { MediaItem } from "@/components/ui/Media";

export type CaseMedia = MediaItem & {
  caption?: string;
  label?: string;
};

// Textos aceitam **negrito** (ver src/components/case/RichText.tsx).
// Cada bloco vira um componente em src/components/case/. Para mudar a estrutura de um caso, basta reordenar os blocos.
export type Block =
  | { type: "subsection"; title: string }
  | { type: "text"; heading?: string; body?: string | string[]; bullets?: string[]; ordered?: boolean; after?: string | string[] }
  /** Pergunta-guia em destaque. Sem cards de ressalva: o cuidado com o escopo fica no próprio texto. */
  | { type: "callout"; tone: "question"; text: string }
  | { type: "findings"; intro?: string; items: { title: string; body: string }[] }
  | { type: "media"; items: CaseMedia[] }
  | { type: "gallery"; items: CaseMedia[]; columns?: 2 | 4 }
  | { type: "table"; columns: string[]; rows: string[][]; align?: ("left" | "right")[] }
  /** Etapas ligadas por setas; `highlight` marca (pelo índice) as etapas em destaque. */
  | { type: "flow"; label?: string; steps: string[]; highlight?: number[] }
  | { type: "ab"; a: CaseMedia; b: CaseMedia; note?: string }
  | { type: "metrics"; label?: string; tone: "before" | "after" | "neutral"; items: { value: string; label: string }[] }
  | { type: "lists"; intro?: string; items: { title: string; entries: string[] }[] };

export type CaseSection = {
  title: string;
  blocks: Block[];
};

/** Uma etapa do resumo: rótulo curto, título, uma ou duas frases e o visual ao lado. */
export type CaseStep = {
  /** Nome curto na barra de etapas. */
  label: string;
  title: string;
  body: string | string[];
  /** Mesmos blocos do corpo do caso. Precisa caber na altura da tela do notebook sem rolar. */
  visual: Block[];
  /** Título da seção ou subseção do estudo completo que aprofunda a etapa (vira o link "Ler no estudo completo"). */
  more?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Linha de apoio em destaque abaixo do título. */
  subtitle?: string;
  /** Nome curto usado no card da home e na navegação entre casos. */
  name: string;
  summary: string;
  cover: MediaItem;
  /** Prévia ao compartilhar o link do caso (JPG 1200×630, menos de 300 KB). Sem ela, usa a da home. */
  og?: MediaItem;
  /** Cor de destaque do caso (títulos, callouts, rótulos). Precisa ser legível no claro e no escuro. */
  accent?: string;
  overview: {
    info: { label: string; value: string }[];
    role?: { titles: string; description: string };
    summary?: { text: string; goals: string[] };
    strategy?: string[];
  };
  sections: CaseSection[];
  /** Resumo em etapas, a página padrão do caso. A primeira etapa ("Visão geral") sai do `overview` e da capa. */
  steps: CaseStep[];
  /** Fecho do resumo, depois da última etapa. */
  takeaway: { title: string; body: string | string[] };
};
