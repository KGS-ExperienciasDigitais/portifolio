import { Reveal } from "@/components/ui/Reveal";
import { slugify } from "@/content/cases/slug";
import type { Block } from "@/content/cases/types";
import { ABCompare, Callout, FindingCards, Flow, Gallery, ListCards, MediaRow, MetricCards, TableBlock, TextBlock } from "./Blocks";
import { SubSectionTitle } from "./SubSection";

// `compact` vale para blocos mostrados numa coluna estreita (o visual de uma etapa do resumo).
export function renderBlock(block: Block, { compact = false } = {}) {
  switch (block.type) {
    case "subsection":
      // O id recebe os links "Ler no estudo completo" do resumo.
      return <SubSectionTitle id={slugify(block.title)}>{block.title}</SubSectionTitle>;
    case "text":
      return <TextBlock {...block} />;
    case "callout":
      return <Callout {...block} />;
    case "findings":
      return <FindingCards {...block} />;
    case "media":
      return <MediaRow {...block} />;
    case "gallery":
      return <Gallery {...block} />;
    case "ab":
      return <ABCompare {...block} />;
    case "metrics":
      return <MetricCards {...block} compact={compact} />;
    case "lists":
      return <ListCards {...block} />;
    case "table":
      return <TableBlock {...block} />;
    case "flow":
      return <Flow {...block} />;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-12">
      {blocks.map((block, index) => (
        // Subseções ganham um respiro maior antes, como no layout de referência.
        <Reveal key={index} className={block.type === "subsection" && index > 0 ? "pt-12" : undefined}>
          {renderBlock(block)}
        </Reveal>
      ))}
    </div>
  );
}
