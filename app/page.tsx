import catalogoDisplay from "@/content/catalogo.json";
import roadmapDisplay from "@/content/roadmap.json";
import { buildCatalogGroups, buildRoadmapRows, fetchLatestCatalog, fetchRegistry } from "@/lib/catalog";
import type { CatalogDisplay, Roadmap as RoadmapData } from "@/lib/types";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Examples } from "@/components/Examples";
import { Catalog } from "@/components/Catalog";
import { Roadmap } from "@/components/Roadmap";
import { Contribute } from "@/components/Contribute";
import { SiteFooter } from "@/components/SiteFooter";

// Página estática: todo el contenido de datos se resuelve en build-time (acá,
// server-side, sin JS en el cliente) a partir del último GitHub Release de
// davidcasr/colombia-open — nunca se hardcodea un dato publicado. Si el
// release no se puede leer, este build falla a propósito: ver
// .claude/rules/data-source.md.
export default async function HomePage() {
  const [{ catalog, tag }, registry] = await Promise.all([fetchLatestCatalog(), fetchRegistry()]);

  const groups = buildCatalogGroups(catalog, catalogoDisplay as CatalogDisplay);
  const rows = buildRoadmapRows(catalog, roadmapDisplay as RoadmapData, registry);
  const releaseUrl = `https://github.com/davidcasr/colombia-open/releases/tag/${tag}`;

  return (
    <>
      <SiteHeader releaseTag={tag} releaseUrl={releaseUrl} />
      <Hero />
      <Examples />
      <Catalog groups={groups} />
      <Roadmap rows={rows} />
      <Contribute />
      <SiteFooter />
    </>
  );
}
