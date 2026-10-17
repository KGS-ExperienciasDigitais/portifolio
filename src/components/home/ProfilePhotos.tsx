"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Media, type MediaItem } from "@/components/ui/Media";

const AUTOPLAY_MS = 4000;
const SWIPE_PX = 50;

// Posição de cada foto conforme a distância até a do centro (-2 a 2).
const positions = {
  center: { x: "0%", scale: 1, opacity: 1, zIndex: 30 },
  side: { x: "32%", scale: 0.84, opacity: 0.6, zIndex: 20 },
  hidden: { x: "16%", scale: 0.7, opacity: 0, zIndex: 10 },
};

function positionFor(offset: number) {
  const { x, ...rest } = offset === 0 ? positions.center : Math.abs(offset) === 1 ? positions.side : positions.hidden;
  return { ...rest, x: offset < 0 ? `-${x}` : x };
}

const controlClass =
  "inline-flex size-8 items-center justify-center rounded-full text-subtle transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Fotos empilhadas: a do centro com moldura, as vizinhas menores atrás. Troca sozinha e pausa no hover, no foco e no botão.
export function ProfilePhotos({ photos }: { photos: readonly MediaItem[] }) {
  const count = photos.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const panned = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();

  const playing = !reduceMotion && !paused && !hovered && !focused && inView;
  const go = (step: number) => setActive((current) => (current + step + count) % count);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, count]);

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos do Kevin"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <motion.div
        aria-live={playing ? "off" : "polite"}
        className="relative flex h-64 w-full touch-pan-y items-center justify-center"
        onPanStart={() => (panned.current = true)}
        onPanEnd={(_, info) => {
          if (info.offset.x <= -SWIPE_PX) go(1);
          else if (info.offset.x >= SWIPE_PX) go(-1);
        }}
      >
        {photos.map((photo, index) => {
          const offset = ((index - active + count + 2) % count) - 2;
          const { zIndex, ...target } = positionFor(offset);

          return (
            <motion.div
              key={photo.src ?? index}
              aria-hidden={offset !== 0}
              initial={false}
              animate={target}
              style={{ zIndex }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              onPointerDown={() => (panned.current = false)}
              onClick={() => {
                if (!panned.current && Math.abs(offset) === 1) go(offset);
              }}
              className={`absolute aspect-[4/5] h-full overflow-hidden rounded-xl border-4 border-line shadow-lg dark:border-white ${Math.abs(offset) === 1 ? "cursor-pointer" : ""}`}
            >
              <Media {...photo} sizes="240px" className="pointer-events-none h-full w-full" />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-3 flex items-center justify-center gap-1">
        <button type="button" aria-label="Foto anterior" onClick={() => go(-1)} className={controlClass}>
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        {!reduceMotion && (
          <button
            type="button"
            aria-label="Pausar troca das fotos"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            className={controlClass}
          >
            {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
          </button>
        )}
        <button type="button" aria-label="Próxima foto" onClick={() => go(1)} className={controlClass}>
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
