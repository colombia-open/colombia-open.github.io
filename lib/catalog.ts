import { createHash } from "node:crypto";
import AdmZip from "adm-zip";
import type {
  CatalogDisplay,
  CatalogGroup,
  DatasetCatalog,
  Registry,
  Roadmap,
  RoadmapDisplayRow,
} from "./types";

// El contenido real (qué datasets existen, su licencia, su conteo de filas)
// vive SIEMPRE en el repo de la librería — nunca se hardcodea aquí. Este
// sitio solo decide cómo se presenta (título, grupo, orden).
const LIBRARY_REPO = "davidcasr/colombia-open";
const LIBRARY_BRANCH = "main";
const CATALOG_ASSET = "dataset_catalog.json";
const BUNDLE_ASSET = "colombia-open-bundle.zip";
const BUNDLE_CHECKSUM_ASSET = "colombia-open-bundle.zip.sha256";

export class SiteBuildError extends Error {}

function githubHeaders(url: string): Record<string, string> {
  const headers: Record<string, string> = { "User-Agent": "colombia-open-web" };
  const token = process.env.GITHUB_TOKEN;
  if (token && url.startsWith("https://api.github.com/")) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function fetchJson<T>(url: string): Promise<T> {
  // Export estático: cada `next build` es un proceso nuevo sin caché
  // persistente, así que el default de fetch (force-cache) ya basta para
  // pedir el catálogo una sola vez por build — "no-store" rompe el export
  // estático porque fuerza render dinámico, incompatible con output: "export".
  const res = await fetch(url, { headers: githubHeaders(url) });
  if (!res.ok) {
    throw new SiteBuildError(`GitHub respondió ${res.status} para ${url}`);
  }
  return (await res.json()) as T;
}

async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: githubHeaders(url) });
  if (!res.ok) {
    throw new SiteBuildError(`GitHub respondió ${res.status} para ${url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function catalogFromBundle(bundle: Buffer): DatasetCatalog {
  const zip = new AdmZip(bundle);
  const entry = zip.getEntries().find((e) => e.entryName.endsWith(CATALOG_ASSET));
  if (!entry) {
    throw new SiteBuildError(`El bundle no contiene ${CATALOG_ASSET}`);
  }
  return JSON.parse(entry.getData().toString("utf-8")) as DatasetCatalog;
}

/** Descarga el catálogo del último release publicado de la librería. */
export async function fetchLatestCatalog(): Promise<{ catalog: DatasetCatalog; tag: string }> {
  const release = await fetchJson<{
    tag_name: string;
    assets: Array<{ name: string; browser_download_url: string }>;
  }>(`https://api.github.com/repos/${LIBRARY_REPO}/releases/latest`);
  const assets = new Map(release.assets.map((a) => [a.name, a.browser_download_url]));

  const catalogUrl = assets.get(CATALOG_ASSET);
  if (catalogUrl) {
    const catalog = await fetchJson<DatasetCatalog>(catalogUrl);
    return { catalog, tag: release.tag_name };
  }

  // Releases anteriores solo traen el bundle: se verifica su SHA256 antes
  // de leerlo, igual que scripts/build_site.py en el repo de la librería.
  const bundleUrl = assets.get(BUNDLE_ASSET);
  const checksumUrl = assets.get(BUNDLE_CHECKSUM_ASSET);
  if (!bundleUrl || !checksumUrl) {
    throw new SiteBuildError(
      `El release ${release.tag_name} de ${LIBRARY_REPO} no tiene ${CATALOG_ASSET} ni el bundle con SHA256`
    );
  }
  const bundle = await fetchBuffer(bundleUrl);
  const expected = (await (await fetch(checksumUrl, { headers: githubHeaders(checksumUrl) })).text())
    .trim()
    .split(/\s+/)[0];
  const actual = createHash("sha256").update(bundle).digest("hex");
  if (actual !== expected) {
    throw new SiteBuildError(`SHA256 del bundle no coincide: esperado ${expected}, obtenido ${actual}`);
  }
  return { catalog: catalogFromBundle(bundle), tag: release.tag_name };
}

/** El registro estático (qué datasets existen, su fuente) vive en main, no en releases. */
export async function fetchRegistry(): Promise<Registry> {
  return fetchJson<Registry>(
    `https://raw.githubusercontent.com/${LIBRARY_REPO}/${LIBRARY_BRANCH}/data/registry/datasets.json`
  );
}

export function buildCatalogGroups(
  catalog: DatasetCatalog,
  display: CatalogDisplay
): CatalogGroup[] {
  const published = new Map(catalog.datasets.map((e) => [e.dataset, e]));
  const shown = display.datasets;

  const missing = [...published.keys()].filter((name) => !(name in shown));
  if (missing.length > 0) {
    throw new SiteBuildError(
      `Datasets publicados sin título/grupo en content/catalogo.json: ${missing.join(", ")}`
    );
  }
  const unknownGroups = [...new Set(Object.values(shown).map((v) => v.grupo))].filter(
    (g) => !display.grupos.includes(g)
  );
  if (unknownGroups.length > 0) {
    throw new SiteBuildError(`Grupos no declarados en 'grupos': ${unknownGroups.join(", ")}`);
  }

  return display.grupos
    .map((grupo) => {
      const names = Object.entries(shown)
        .filter(([name, v]) => v.grupo === grupo && published.has(name))
        .map(([name]) => name);
      return {
        grupo,
        entries: names.map((name) => ({
          entry: published.get(name)!,
          titulo: shown[name].titulo,
        })),
      };
    })
    .filter((g) => g.entries.length > 0);
}

// El roadmap ya no repite los dominios "Implementada": ese estado se ve
// arriba, en el Catálogo (tabla de búsqueda). Aquí solo queda lo pendiente,
// sin columna de estado — "restricted" es lo único que vale la pena
// distinguir visualmente, porque cambia si el dato se puede usar libremente.
export function buildRoadmapRows(
  catalog: DatasetCatalog,
  roadmap: Roadmap,
  registry: Registry
): RoadmapDisplayRow[] {
  const published = new Map(catalog.datasets.map((e) => [e.dataset, e]));

  const rows = roadmap.filas.map((fila) => {
    if (!("datasets" in fila)) {
      return {
        dominio: fila.dominio,
        fuente: fila.fuente,
        done: false,
        restricted: fila.estado.toLowerCase().includes("restringida"),
      };
    }
    const unknown = fila.datasets.filter((d) => !(d in registry));
    if (unknown.length > 0) {
      throw new SiteBuildError(`content/roadmap.json referencia datasets inexistentes: ${unknown}`);
    }
    const allPublished = fila.datasets.every((d) => published.has(d));
    if (allPublished) {
      const first = fila.datasets[0];
      const fuente = published.get(first)?.source_name ?? registry[first].source_name;
      return { dominio: fila.dominio, fuente, done: true, restricted: false };
    }
    const fuente = registry[fila.datasets[0]].source_name;
    return { dominio: fila.dominio, fuente, done: false, restricted: false };
  });

  return rows
    .filter((row) => !row.done)
    .map(({ dominio, fuente, restricted }) => ({ dominio, fuente, restricted }));
}
