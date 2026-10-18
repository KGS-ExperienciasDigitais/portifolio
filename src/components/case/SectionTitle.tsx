// Título grande e cinza que abre cada parte do caso ("Visão geral", "Processo", "Resultados").
export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-12 scroll-mt-6 text-4xl font-medium text-subtle sm:text-5xl">
      {children}
    </h2>
  );
}
