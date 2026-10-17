import { caso1 } from "./caso-1";
import { caso2 } from "./caso-2";
import type { CaseStudy } from "./types";

// Ordem em que os casos aparecem na home e na navegação entre casos.
export const cases: CaseStudy[] = [caso1, caso2];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
