import Image from "next/image";
import { marqueeLoop } from "./SoftwareMarquee";

type Tool = {
  name: string;
  logo: string;
  mono?: boolean;
};

type ToolLogoMarqueeProps = {
  items: readonly Tool[];
  reverse?: boolean;
};

export function ToolLogoMarquee({ items, reverse = false }: ToolLogoMarqueeProps) {
  const loop = marqueeLoop(items);

  return (
    <div className="group relative overflow-hidden py-1 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`flex w-max items-start gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map((tool, index) => (
          <li
            key={`${tool.logo}-${index}`}
            aria-hidden={index >= items.length}
            className="group/tool flex w-24 shrink-0 flex-col items-center gap-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-black/5 bg-white/60 p-4 transition-all duration-200 group-hover/tool:-translate-y-0.5 group-hover/tool:border-accent/40 dark:border-white/10 dark:bg-white/5">
              <Image
                src={`/logos/tools/${tool.logo}.svg`}
                alt=""
                width={48}
                height={48}
                unoptimized
                className={`h-full w-full object-contain ${tool.mono ? "dark:invert" : ""}`}
              />
            </div>
            <span className="text-center text-sm font-medium leading-tight text-muted transition-colors duration-200 group-hover/tool:text-accent">
              {tool.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
