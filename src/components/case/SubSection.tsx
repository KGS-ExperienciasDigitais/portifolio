// Título com linha cinza embaixo, usado nas subseções e nos blocos da visão geral.
export function SubSectionTitle({ children, as: Tag = "h3", id }: { children: React.ReactNode; as?: "h3" | "h4"; id?: string }) {
  return (
    <Tag id={id} className="mb-6 scroll-mt-6 border-b-2 border-line pb-2 text-2xl font-medium sm:text-3xl">
      {children}
    </Tag>
  );
}
