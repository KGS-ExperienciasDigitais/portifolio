// Âncora a partir de um título: "Priorização: do mapeamento ao MVP" → "priorizacao-do-mapeamento-ao-mvp".
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
