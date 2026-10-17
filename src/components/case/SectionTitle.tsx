// Título grande e cinza que abre cada parte do caso ("Visão geral", "Processo", "Resultados").
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-12 text-4xl font-medium text-subtle sm:text-5xl">{children}</h2>;
}
