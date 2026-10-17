import Link from "next/link";

export type PillAction = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

const actionClass =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900 active:scale-[0.98] sm:px-4 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white";

export function GlassPill({ actions }: { actions: PillAction[] }) {
  return (
    <div className="glass inline-flex max-w-full flex-wrap items-center gap-0.5 rounded-full px-1 py-1 sm:gap-1 sm:px-2 sm:py-1.5">
      {actions.map((action) =>
        action.external ? (
          <a
            key={action.href}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={action.ariaLabel}
            className={actionClass}
          >
            {action.icon}
            {action.label}
          </a>
        ) : (
          <Link key={action.href} href={action.href} aria-label={action.ariaLabel} className={actionClass}>
            {action.icon}
            {action.label}
          </Link>
        ),
      )}
    </div>
  );
}
