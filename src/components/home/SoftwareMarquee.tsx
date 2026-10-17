type SoftwareMarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
};

// Mínimo de itens em cada metade do loop, para a faixa sempre cobrir a largura do card.
const MIN_HALF = 10;

/**
 * Repete a lista para o carrossel dar a volta sem emenda (a animação vai até -50%).
 * Listas curtas são repetidas mais vezes, mantendo sempre um número par de cópias.
 */
export function marqueeLoop<T>(items: readonly T[]): T[] {
  const copies = 2 * Math.ceil(MIN_HALF / items.length);
  return Array.from({ length: copies }, () => items).flat();
}

export function SoftwareMarquee({ items, reverse = false }: SoftwareMarqueeProps) {
  const loop = marqueeLoop(items);

  return (
    <div className="group relative overflow-hidden py-1 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`flex w-max gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="shrink-0 rounded-full border border-black/5 bg-white/60 px-6 py-3 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent dark:border-white/10 dark:bg-white/5"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
