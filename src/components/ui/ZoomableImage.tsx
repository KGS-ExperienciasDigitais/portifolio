"use client";

import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

type ZoomableImageProps = {
  children: React.ReactNode;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

// Envolve uma imagem num botão que abre a versão completa em tela cheia (com rolagem para imagens altas).
export function ZoomableImage({ children, src, alt, width, height, className = "" }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialogRef.current?.close();
  const handleClose = () => {
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Ampliar imagem: ${alt}`}
        className={`group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      >
        {children}
        <span
          aria-hidden
          className="glass absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full text-gray-800 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-slate-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        aria-label={alt}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-black/85 p-0 backdrop:bg-transparent"
      >
        <div
          onClick={(event) => event.target === event.currentTarget && close()}
          className="h-full w-full overflow-auto p-4 sm:p-10"
        >
          {width && height ? (
            // Imagens largas e densas (diagramas, tabelas) ficam em 1000px no celular, com rolagem para os lados.
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              className={`mx-auto block h-auto rounded-lg ${width >= 1200 ? "w-250 max-w-none md:w-auto md:max-w-full" : "w-auto max-w-full"}`}
            />
          ) : (
            <div className="relative h-full w-full">
              <Image src={src} alt={alt} fill unoptimized className="object-contain" />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={close}
          className="fixed top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg"
        >
          <X className="size-4" />
          Fechar
        </button>
      </dialog>
    </>
  );
}
