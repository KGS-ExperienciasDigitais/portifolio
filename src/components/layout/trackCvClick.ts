// Avisa o servidor do clique no CV. O sendBeacon não é cancelado quando o download começa.
export function trackCvClick() {
  if (!navigator.sendBeacon?.("/api/cv-click")) {
    fetch("/api/cv-click", { method: "POST", keepalive: true }).catch(() => {});
  }
}
