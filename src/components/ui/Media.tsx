import Image from "next/image";

export type MediaItem = {
  src?: string;
  alt: string;
  /** Com largura e altura, a imagem aparece na proporção real, sem corte. */
  width?: number;
  height?: number;
  /** Imagem aberta no zoom, quando for diferente da exibida (ex.: recorte → tabela completa). */
  zoomSrc?: string;
  zoomWidth?: number;
  zoomHeight?: number;
};

type MediaProps = MediaItem & {
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Força o modo de preenchimento com corte (object-cover), mesmo com dimensões. */
  fill?: boolean;
  /** No modo de preenchimento, ancora a imagem no topo (corta só embaixo). */
  alignTop?: boolean;
  /** Classes extras aplicadas à própria imagem (ex.: zoom com scale/origin). */
  imageClassName?: string;
};

// Mostra a imagem quando há src; senão, um placeholder cinza com o texto alternativo como rótulo.
export function Media({ src, alt, width, height, className = "", sizes = "100vw", priority, fill, alignTop, imageClassName = "" }: MediaProps) {
  if (src && width && height && !fill) {
    return (
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={`h-auto w-full ${className}`} />
    );
  }

  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${alignTop ? "object-top" : ""} ${imageClassName}`} />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center overflow-hidden bg-gray-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgb(0_0_0/0.03)_12px,rgb(0_0_0/0.03)_24px)] dark:bg-slate-800 ${className}`}
    >
      <span className="px-4 text-center text-sm font-medium text-gray-500 dark:text-slate-400">{alt}</span>
    </div>
  );
}
