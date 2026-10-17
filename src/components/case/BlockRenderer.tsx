import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/content/cases/types";
import { ABCompare, Callout, FindingCards, Flow, Gallery, ListCards, MediaRow, MetricCards, TableBlock, TextBlock } from "./Blocks";
import { SubSectionTitle } from "./SubSection";

function renderBlock(block: Block) {
  switch (block.type) {
    case "subsection":
      return <SubSectionTitle>{block.title}</SubSectionTitle>;
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
      return <MetricCards {...block} />;
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
