"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { A11Y_CHANGE_EVENT } from "./accessibility";
import { ThemeToggle } from "./ThemeToggle";

const WIDTH = 100;
const HEIGHT = 200;
const SEGMENTS = 9;
const SEGMENT_LENGTH = 12;
const ANCHOR = { x: WIDTH / 2, y: 4 };
const REST_Y = ANCHOR.y + SEGMENTS * SEGMENT_LENGTH;
const PULL_THRESHOLD = 32;
const GRAB_RADIUS = 22;
const KNOB_RADIUS = 8;

type Point = { x: number; y: number; px: number; py: number };

const noopSubscribe = () => () => {};

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// O mesmo `md` do Tailwind. Em media query o rem não sofre a escala de 80% da fonte-raiz.
const DESKTOP_QUERY = "(min-width: 48rem)";

function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// Fator da escala global (fonte-raiz / 16px): 0,8 no desktop, 1 no celular. Ver globals.css.
// Descontamos o --text-scale do menu de acessibilidade: a cordinha é um controle e não cresce com o texto.
function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  window.addEventListener(A11Y_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener(A11Y_CHANGE_EVENT, callback);
  };
}
const getRootScale = () => {
  const style = getComputedStyle(document.documentElement);
  const textScale = parseFloat(style.getPropertyValue("--text-scale")) || 1;
  return parseFloat(style.fontSize) / 16 / textScale;
};

function createRope(): Point[] {
  return Array.from({ length: SEGMENTS + 1 }, (_, i) => {
    const y = ANCHOR.y + i * SEGMENT_LENGTH;
    return { x: ANCHOR.x, y, px: ANCHOR.x, py: y };
  });
}

export function ThemeCord() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return <div aria-hidden className="fixed top-2 right-2 z-40 hidden h-54 w-25 sm:right-6 md:block" />;
  }

  // No celular, o tema troca no botão de sol/lua do header (MobileMenu); sem a corda, o loop de animação também para.
  if (!desktop) return null;

  if (reducedMotion) {
    return (
      <ThemeToggle
        className="fixed top-4 right-4 z-40 size-10 text-gray-800 sm:right-6 dark:text-amber-300"
        iconClassName="size-5"
      />
    );
  }

  return <Cord isDark={isDark} onToggle={toggle} />;
}

function Cord({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  // A simulação roda sempre em 100×200; só o desenho e o ponteiro são convertidos pela escala.
  const scale = useSyncExternalStore(subscribeResize, getRootScale, () => 1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rope = useRef<Point[]>(createRope());
  const drag = useRef<{ x: number; y: number; startX: number; startY: number; moved: boolean } | null>(null);
  const darkRef = useRef(isDark);
  const toggleRef = useRef(onToggle);

  useEffect(() => {
    darkRef.current = isDark;
    toggleRef.current = onToggle;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr * scale;
    canvas.height = HEIGHT * dpr * scale;
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);

    let frame = 0;

    const step = () => {
      const points = rope.current;
      const last = points.length - 1;

      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const vx = (p.x - p.px) * 0.97;
        const vy = (p.y - p.py) * 0.97;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.45;
      }

      for (let iteration = 0; iteration < 14; iteration++) {
        const target = drag.current;
        if (target) {
          points[last].x = target.x;
          points[last].y = target.y;
        }
        for (let i = 0; i < last; i++) {
          const a = points[i];
          const b = points[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          // A corda só estica um pouco além do comprimento natural ao ser puxada.
          const length = target ? SEGMENT_LENGTH * 1.35 : SEGMENT_LENGTH;
          if (dist <= length && target) continue;
          const diff = (dist - length) / dist;
          if (i === 0) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
        points[0].x = ANCHOR.x;
        points[0].y = ANCHOR.y;
      }

      draw(ctx, points, darkRef.current);
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [scale]);

  const localPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(WIDTH - KNOB_RADIUS, Math.max(KNOB_RADIUS, (event.clientX - rect.left) / scale)),
      y: Math.min(HEIGHT - KNOB_RADIUS, Math.max(ANCHOR.y + 10, (event.clientY - rect.top) / scale)),
    };
  };

  const tug = () => {
    const knob = rope.current[rope.current.length - 1];
    knob.py = knob.y - 14;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = localPoint(event);
    const knob = rope.current[rope.current.length - 1];
    if (Math.hypot(point.x - knob.x, point.y - knob.y) > GRAB_RADIUS) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { ...point, startX: point.x, startY: point.y, moved: false };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = localPoint(event);
    const current = drag.current;
    if (current) {
      current.x = point.x;
      current.y = point.y;
      if (Math.hypot(point.x - current.startX, point.y - current.startY) > 4) current.moved = true;
      return;
    }
    const knob = rope.current[rope.current.length - 1];
    event.currentTarget.style.cursor = Math.hypot(point.x - knob.x, point.y - knob.y) <= GRAB_RADIUS ? "grab" : "default";
  };

  const handlePointerUp = () => {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    if (!current.moved) {
      tug();
      onToggle();
    } else if (current.y - REST_Y > PULL_THRESHOLD) {
      onToggle();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    tug();
    onToggle();
  };

  return (
    <div className="pointer-events-none fixed top-2 right-2 z-40 sm:right-6">
      <div className="pointer-events-auto flex select-none flex-col items-center" style={{ width: WIDTH * scale }}>
        <p aria-hidden className="mb-1 whitespace-nowrap text-center text-[0.875rem] font-semibold tracking-wide text-slate-600 dark:text-slate-400">
          Puxe aqui
        </p>
        <canvas
          ref={canvasRef}
          role="switch"
          aria-checked={isDark}
          aria-label="Puxe a cordinha para ativar o modo escuro. Espaço também alterna."
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          style={{ width: WIDTH * scale, height: HEIGHT * scale, touchAction: "none" }}
          className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-amber-500/90"
        />
      </div>
    </div>
  );
}

function draw(ctx: CanvasRenderingContext2D, points: Point[], isDark: boolean) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // No alto contraste o fundo é sempre preto: desenha como no modo escuro, com corda branca.
  const highContrast = document.documentElement.getAttribute("data-contrast") === "alto";
  const dark = isDark || highContrast;
  const line = highContrast ? "#ffffff" : dark ? "#94a3b8" : "#475569";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }
  const knob = points[points.length - 1];
  ctx.lineTo(knob.x, knob.y);
  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(points[0].x, points[0].y, 3, 0, Math.PI * 2);
  ctx.fillStyle = line;
  ctx.fill();

  if (dark) {
    ctx.shadowColor = "rgba(251, 191, 36, 0.8)";
    ctx.shadowBlur = 14;
  }
  ctx.beginPath();
  ctx.arc(knob.x, knob.y, KNOB_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = dark ? "#fbbf24" : "#1e293b";
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}
