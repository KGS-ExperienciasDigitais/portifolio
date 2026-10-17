import type { Metadata } from "next";
import type { MediaItem } from "@/components/ui/Media";
import { site } from "@/content/site";

// O openGraph de uma página substitui o do layout inteiro (merge raso), então cada página espalha esta base.
export function openGraphBase(image?: MediaItem) {
  const share = image?.src ? image : site.shareImage;
  return {
    siteName: site.name,
    locale: "pt_BR",
    images: share.src ? [{ url: share.src, alt: share.alt, width: 1200, height: 630 }] : undefined,
  } satisfies Metadata["openGraph"];
}
