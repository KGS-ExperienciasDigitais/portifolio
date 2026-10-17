import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-sm font-medium tracking-wider text-subtle uppercase">Erro 404</p>
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Página não encontrada</h1>
      <p className="mb-8 text-lg text-muted">O endereço que você procurou não existe ou foi movido.</p>
      <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
        Voltar para o início
      </Link>
    </section>
  );
}
