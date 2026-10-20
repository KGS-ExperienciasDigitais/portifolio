// Primeiro elemento de cada página do caso, preso ao topo do artigo. Ao navegar, o Next só garante que o primeiro
// elemento da página esteja na tela; como o título fica no layout, sem este marcador esse elemento seria a capa e o
// caso abriria nela, com o título fora da tela. Fica fora do Suspense da página: o fallback não pode ser medido antes.
export function CaseTopAnchor() {
  return <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0" />;
}
