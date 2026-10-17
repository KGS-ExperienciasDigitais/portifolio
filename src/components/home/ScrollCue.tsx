// Mouse com a rodinha descendo, ao lado do convite para rolar.
export function ScrollMouse() {
  return (
    <a
      href="#projetos"
      className="group inline-flex items-center gap-4 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-7 shrink-0 justify-center rounded-full border-2 border-line pt-2 transition-colors duration-300 group-hover:border-accent"
      >
        <span className="h-2 w-1 animate-scroll-wheel rounded-full bg-accent motion-reduce:animate-none" />
      </span>
      <span className="flex flex-col">
        <span className="font-semibold transition-colors duration-300 group-hover:text-accent">Ver projetos</span>
        <span className="text-sm text-subtle">role para baixo</span>
      </span>
    </a>
  );
}
