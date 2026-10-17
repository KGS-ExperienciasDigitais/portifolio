import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { a11yInitScript } from "@/components/layout/accessibility";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeCord } from "@/components/layout/ThemeCord";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { site } from "@/content/site";
import { openGraphBase } from "./shared-metadata";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    ...openGraphBase(),
    type: "website",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

// Cor da barra do navegador no celular: o --background de globals.css no claro e no escuro.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Aplica tamanho do texto e contraste salvos antes da primeira pintura, sem piscar. */}
        <script dangerouslySetInnerHTML={{ __html: a11yInitScript }} />
      </head>
      <body className="bg-dot-grid min-h-screen font-sans">
        <ThemeProvider>
          <ThemeCord />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
