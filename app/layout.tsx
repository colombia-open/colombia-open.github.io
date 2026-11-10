import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://colombia-open.github.io";
const TITLE = "colombia-open — Datos públicos de Colombia para Python";
const DESCRIPTION =
  "Datos públicos de Colombia, limpios y listos para usar en Python: geografía, demografía, educación, seguridad, calidad del aire y más. Cada dataset con su fuente y licencia a la vista.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "colombia-open",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "colombia-open — logomarca de constelación sobre fondo índigo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Datos públicos de Colombia, limpios y listos para usar en Python. Cada dataset con su fuente y licencia a la vista.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Fraunces pide un peso variable (560) fuera del set fijo que
            next/font/google expone para fuentes estáticas — se mantiene como
            <link> manual para igualar exactamente docs/brand/design-system.md
            de la librería. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@1,500;1,560&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
