import Link from "next/link";
import { navItems, site } from "@/content/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm">
          © <CurrentYear /> {site.name}. Todos os direitos reservados.
        </p>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="text-sm transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
