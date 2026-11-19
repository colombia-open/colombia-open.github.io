import type { Metadata } from "next";
import proyectosDisplay from "@/content/proyectos.json";
import { fetchCodeLicense, fetchLatestCatalog } from "@/lib/catalog";
import type { ProjectsDisplay } from "@/lib/types";
import { SiteHeader } from "@/components/SiteHeader";
import { Proyectos } from "@/components/Proyectos";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Proyectos — colombia-open",
  description:
    "Demos de la comunidad y aplicaciones externas construidas con colombia-open, el paquete de datos públicos de Colombia para Python.",
};

// Ruta propia (en vez de una sección más de app/page.tsx) para que /proyectos
// tenga su propio link compartible, fuera del scroll de la landing.
export default async function ProyectosPage() {
  const [{ tag }, codeLicense] = await Promise.all([fetchLatestCatalog(), fetchCodeLicense()]);
  const releaseUrl = `https://github.com/davidcasr/colombia-open/releases/tag/${tag}`;

  return (
    <>
      <SiteHeader releaseTag={tag} releaseUrl={releaseUrl} />
      <Proyectos proyectos={(proyectosDisplay as ProjectsDisplay).proyectos} />
      <SiteFooter codeLicense={codeLicense} />
    </>
  );
}
