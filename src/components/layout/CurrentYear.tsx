import { cacheLife } from "next/cache";

// Com Cache Components, new Date() no prerender precisa estar num escopo "use cache".
// O ano é calculado no build e revalidado uma vez por dia.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
