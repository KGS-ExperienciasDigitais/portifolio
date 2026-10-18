"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/content/site";

const { contact, links } = site;
const RESET_MS = 2500;

type Status = "idle" | "copied" | "failed";

// Card de e-mail do contato: copia o endereço em vez de abrir o app de e-mail e confirma no próprio card.
export function CopyEmailButton({ className }: { className: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(links.email);
      setStatus("copied");
      timer.current = window.setTimeout(() => setStatus("idle"), RESET_MS);
    } catch {
      // Sem acesso à área de transferência (página em http, permissão negada): mostra o endereço no card.
      setStatus("failed");
    }
  }

  const copied = status === "copied";
  const text = copied ? contact.email.copied : status === "failed" ? links.email : contact.email.text;

  return (
    <>
      <button type="button" onClick={copy} className={`cursor-pointer text-left ${className}`}>
        <span className="flex items-start justify-between">
          <span className="transition-colors group-hover:text-accent">
            <Mail className="size-8" />
          </span>
          {copied ? (
            <Check className="size-5 text-accent" aria-hidden />
          ) : (
            <Copy className="size-5 text-subtle transition-colors group-hover:text-accent" aria-hidden />
          )}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-lg font-semibold transition-colors group-hover:text-accent">{contact.email.label}</span>
          <span className={copied ? "font-medium text-accent" : "text-muted"}>{text}</span>
          <span className="sr-only">
            {" "}
            ({contact.email.copyHint} {links.email})
          </span>
        </span>
      </button>
      {/* Avisa o leitor de tela; o texto visível do card muda junto. */}
      <span role="status" className="sr-only">
        {copied ? contact.email.copied : ""}
      </span>
    </>
  );
}
