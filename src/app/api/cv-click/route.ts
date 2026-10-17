import { after } from "next/server";
import { site } from "@/content/site";

// Recebe o clique no CV e manda o dia e a hora (horário de Brasília) para a planilha do Google.
// Sem CV_CLICK_WEBHOOK_URL (ex.: em desenvolvimento), o clique é ignorado. Ver scripts/registro-cv.gs.
export async function POST() {
  const webhook = process.env.CV_CLICK_WEBHOOK_URL;

  if (webhook) {
    const now = new Date();
    const zone = { timeZone: site.location.timeZone };
    const body = JSON.stringify({
      data: now.toLocaleDateString("pt-BR", zone),
      hora: now.toLocaleTimeString("pt-BR", zone),
    });

    after(() =>
      fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body }).catch(() => {}),
    );
  }

  return new Response(null, { status: 204 });
}
