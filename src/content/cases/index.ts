import { caso1 } from "./caso-1";
import { caso2 } from "./caso-2";
import { caso3 } from "./caso-3";
import { caso4 } from "./caso-4";
import type { CaseStudy } from "./types";

// Ordem em que os casos aparecem na home e na navegação entre casos.
export const cases: CaseStudy[] = [caso4, caso3, caso2, caso1];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
