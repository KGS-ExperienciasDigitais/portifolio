"use client";

import { useSyncExternalStore } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.location.timeZone,
});

function subscribe(callback: () => void) {
  const id = setInterval(callback, 10_000);
  return () => clearInterval(id);
}

export function LocationCard() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "--:--",
  );

  return (
    <GlassCard className="p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center space-y-3 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-muted">
          <span className="size-2 animate-pulse rounded-full bg-green-500" />
          Morando em {site.location.city}
        </p>
        <p className="text-sm">
          <span aria-hidden>🕐 </span>
          <span className="font-medium tabular-nums">{time}</span>
          <span className="sr-only"> no horário local</span>
        </p>
      </div>
    </GlassCard>
  );
}
