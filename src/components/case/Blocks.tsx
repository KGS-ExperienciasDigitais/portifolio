import { ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import type { Block, CaseMedia } from "@/content/cases/types";
import { RichText } from "./RichText";

type BlockOf<T extends Block["type"]> = Extract<Block, { type: T }>;

const cardClass = "rounded-lg bg-surface p-5 shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-none dark:ring-1 dark:ring-line";

const toArray = (value?: string | string[]) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

function Paragraphs({ value }: { value?: string | string[] }) {
  return toArray(value).map((paragraph) => (
    <p key={paragraph} className="mb-4 max-w-3xl leading-relaxed last:mb-0">
      <RichText text={paragraph} />
    </p>
  ));
}

export function TextBlock({ heading, body, bullets, ordered, after }: BlockOf<"text">) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="text-lg">
      {heading && <h4 className="mb-4 text-2xl font-semibold">{heading}</h4>}
      <Paragraphs value={body} />
      {bullets && (
        <List
          className={`my-6 max-w-3xl space-y-3 pl-6 marker:font-semibold marker:text-accent ${ordered ? "list-decimal" : "list-disc"}`}
        >
          {bullets.map((item) => (
            <li key={item} className="pl-1 leading-relaxed">
              <RichText text={item} />
            </li>
          ))}
        </List>
      )}
      <Paragraphs value={after} />
    </div>
  );
}

export function Callout({ text }: BlockOf<"callout">) {
  return (
    <blockquote className="max-w-3xl border-l-4 border-accent py-2 pl-6 text-2xl leading-snug font-medium text-balance sm:text-3xl">
      <RichText text={text} />
    </blockquote>
  );
}

export function FindingCards({ intro, items }: BlockOf<"findings">) {
  return (
    <div>
      {intro && <p className="mb-4 text-lg">{intro}</p>}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
        {items.map((item) => (
          <li key={item.title} className={cardClass}>
            <h5 className="mb-3 text-lg font-semibold">{item.title}</h5>
            <p className="text-lg">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PictureProps = {
  item: CaseMedia;
  placeholderClass: string;
  sizes: string;
  /** Proporção fixa para a imagem real, cortando só embaixo (molduras de mesma altura). */
  cropClass?: string;
};

// Imagem com zoom quando é real; placeholder com proporção fixa enquanto não há imagem.
function Picture({ item, placeholderClass, sizes, cropClass }: PictureProps) {
  if (!item.src) return <Media {...item} className={`w-full rounded-lg ${placeholderClass}`} />;

  return (
    <ZoomableImage
      src={item.zoomSrc ?? item.src}
      alt={item.alt}
      width={item.zoomSrc ? item.zoomWidth : item.width}
      height={item.zoomSrc ? item.zoomHeight : item.height}
      className={cropClass}
    >
      {cropClass ? (
        <Media {...item} fill alignTop sizes={sizes} className={`w-full ${cropClass}`} />
      ) : (
        <Media
          {...item}
          sizes={sizes}
          className={
            item.width && item.height
              ? "rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10"
              : `w-full rounded-lg ${placeholderClass}`
          }
        />
      )}
    </ZoomableImage>
  );
}

// Imagens mais estreitas que a coluna (ex.: um print pequeno) ficam no tamanho natural, sem esticar.
const COLUMN_WIDTH = 1000;

function Figure({ item, placeholderClass }: { item: CaseMedia; placeholderClass: string }) {
  const narrow = item.src && item.width && item.width < COLUMN_WIDTH;

  return (
    <figure className={narrow ? "mx-auto" : undefined} style={narrow ? { maxWidth: item.width } : undefined}>
      {item.label && <p className="mb-3 text-center font-semibold">{item.label}</p>}
      <Picture item={item} placeholderClass={placeholderClass} sizes="(min-width: 1024px) 1024px, 100vw" />
      {item.caption && <figcaption className="mt-3 text-sm text-subtle">{item.caption}</figcaption>}
    </figure>
  );
}

export function MediaRow({ items }: BlockOf<"media">) {
  if (items.length === 1) return <Figure item={items[0]} placeholderClass="aspect-video" />;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
      {items.map((item) => (
        <Figure key={item.alt} item={item} placeholderClass="aspect-[4/3]" />
      ))}
    </div>
  );
}

// Peças lado a lado em molduras de mesma altura.
// - 4 colunas (padrão): peças altas, como e-mails (2 colunas no mobile).
// - 2 colunas: peças largas, como fotos; uma por linha no mobile e a última, se sobrar sozinha, centralizada.
// A proporção vem da peça mais curta; as mais longas perdem só o fim, que aparece inteiro no zoom.
export function Gallery({ items, columns = 4 }: BlockOf<"gallery">) {
  const ratios = items.filter((item) => item.width && item.height).map((item) => item.width! / item.height!);
  const aspectRatio = ratios.length ? Math.max(...ratios) : undefined;
  const twoColumns = columns === 2;

  return (
    <ul className={twoColumns ? "flex flex-wrap justify-center gap-6" : "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"}>
      {items.map((item) => (
        <li key={item.alt} className={twoColumns ? "w-full md:w-[calc(50%-0.75rem)]" : undefined}>
          <figure>
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
              <div style={aspectRatio ? { aspectRatio } : undefined}>
                <Picture
                  item={item}
                  placeholderClass={twoColumns ? "aspect-video" : "aspect-[9/20]"}
                  cropClass="h-full"
                  sizes={twoColumns ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                />
              </div>
            </div>
            {item.label && <figcaption className="mt-3 text-center text-sm font-medium">{item.label}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function ABCompare({ a, b, note }: BlockOf<"ab">) {
  return (
    <div>
      {note && <p className="mb-6 text-lg font-semibold">{note}</p>}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-24">
        <Figure item={{ label: "A", ...a }} placeholderClass="aspect-[3/4]" />
        <Figure item={{ label: "B", ...b }} placeholderClass="aspect-[3/4]" />
      </div>
    </div>
  );
}

const metricTone = { before: "", after: "text-success", neutral: "text-accent" };
// Colunas pelo número de cards: um card sozinho ocupa a largura toda em vez de um terço.
const metricColumns = ["", "", "sm:grid-cols-2", "sm:grid-cols-3"];

// `compact`: numa coluna estreita (visual do resumo), com menos espaço entre os cards e rótulo menor.
export function MetricCards({ label, tone, items, compact }: BlockOf<"metrics"> & { compact?: boolean }) {
  return (
    <div>
      {label && <p className="mb-4 text-lg font-semibold">{label}</p>}
      <ul className={`grid grid-cols-1 ${compact ? "gap-4" : "gap-6 md:gap-12"} ${metricColumns[items.length] ?? "sm:grid-cols-3"}`}>
        {items.map((item) => (
          <li key={item.label} className={cardClass}>
            <p className={`mb-2 text-4xl font-semibold ${metricTone[tone]}`}>{item.value}</p>
            <p className={`${compact ? "text-base" : "text-lg"} font-semibold`}>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ListCards({ intro, items }: BlockOf<"lists">) {
  return (
    <div>
      {intro && <p className="mb-8 max-w-4xl text-lg">{intro}</p>}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-24">
        {items.map((list) => (
          <div key={list.title} className={cardClass}>
            <h5 className="mb-4 text-lg font-semibold">{list.title}</h5>
            <ul className="space-y-3 text-lg">
              {list.entries.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableBlock({ columns, rows, align = [] }: BlockOf<"table">) {
  const alignClass = (index: number) => (align[index] === "right" ? "text-right tabular-nums" : "text-left");

  return (
    <div className="max-w-3xl overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-base">
        <thead>
          <tr className="border-b-2 border-line">
            {columns.map((column, index) => (
              <th key={column} scope="col" className={`py-3 pr-6 font-semibold text-accent last:pr-0 ${alignClass(index)}`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-line">
              {row.map((cell, index) => (
                <td key={index} className={`py-3 pr-6 align-top leading-relaxed last:pr-0 ${alignClass(index)}`}>
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Flow({ label, steps, highlight = [] }: BlockOf<"flow">) {
  return (
    <div>
      {label && <p className="mb-3 text-sm font-semibold tracking-wider text-subtle uppercase">{label}</p>}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`rounded-full border px-4 py-2 text-base font-medium ${
                highlight.includes(index) ? "border-accent bg-accent text-white dark:text-slate-950" : "border-line bg-surface"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && <ArrowRight aria-hidden className="size-4 shrink-0 text-subtle" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
