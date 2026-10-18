"use client";

import { Clock, MapPin, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/content/site";

const { timeZone } = site.location;

const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone });
const hourFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hourCycle: "h23", timeZone });
const offsetFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone, timeZoneName: "shortOffset" });

function subscribe(callback: () => void) {
  const id = setInterval(callback, 10_000);
  return () => clearInterval(id);
}

// Muda uma vez por minuto, então o card só re-renderiza quando a hora muda.
function getMinute() {
  return Math.floor(Date.now() / 60_000);
}

// "GMT-3" → -180, "GMT+5:30" → 330, "GMT" → 0.
function offsetMinutes(label: string) {
  const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(label);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] ?? 0);
  return match[1] === "-" ? -minutes : minutes;
}

// Positivo: o horário daqui está à frente do visitante.
function formatDiff(minutes: number) {
  if (minutes === 0) return "Mesmo fuso que você";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  const amount = hours === 0 ? `${rest}min` : rest ? `${hours}h${String(rest).padStart(2, "0")}` : `${hours}h`;
  return `${amount} ${minutes > 0 ? "à frente de" : "atrás de"} você`;
}

function describe(date: Date) {
  const offset = offsetFormatter.formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const hour = Number(hourFormatter.format(date));
  return {
    time: timeFormatter.format(date),
    offset,
    diff: formatDiff(offsetMinutes(offset) + date.getTimezoneOffset()),
    isDay: hour >= 6 && hour < 18,
  };
}

export function LocationCard() {
  const minute = useSyncExternalStore(subscribe, getMinute, () => null);
  const info = minute === null ? null : describe(new Date(minute * 60_000));

  const iconClass = "size-4 shrink-0 text-subtle";
  const icon =
    info === null ? (
      <Clock aria-hidden className={iconClass} />
    ) : info.isDay ? (
      <Sun aria-hidden className={iconClass} />
    ) : (
      <Moon aria-hidden className={iconClass} />
    );

  return (
    <GlassCard className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <MapPin aria-hidden className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{site.location.city}</p>
            <p className="text-xs text-subtle">{info?.diff ?? " "}</p>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="flex items-center justify-end gap-1.5">
            {icon}
            <span className="sr-only">Horário local: </span>
            <time className="text-2xl leading-tight font-semibold tabular-nums">{info?.time ?? "--:--"}</time>
          </p>
          <p className="text-xs text-subtle">{info?.offset ?? " "}</p>
        </div>
      </div>
    </GlassCard>
  );
}
