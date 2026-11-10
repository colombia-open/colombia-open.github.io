import { Fragment } from "react";
import type { CatalogGroup, DatasetEntry } from "@/lib/types";
import { formatCount, formatDate, humanSourceUrl } from "@/lib/format";

function DatasetCard({ entry, titulo }: { entry: DatasetEntry; titulo: string }) {
  const policy = entry.reuse_policy;
  const licenseName = policy?.license ?? "Licencia sin declarar";
  const licenseUrl = policy?.license_url;
  const isOpen = policy?.status?.startsWith("open") ?? false;

  const formats = Object.keys(entry.outputs ?? {}).join(" · ") || "—";
  const sourceUrl = humanSourceUrl(entry.source_url);

  return (
    <div className="dataset-card">
      <div className="dataset-title">
        <h3>{titulo}</h3>
        <span className="dataset-slug">{entry.dataset}</span>
      </div>
      <p>{entry.description}</p>
      <div className="dataset-meta">
        <span className="pill">{formatCount(entry.record_count)} filas</span>
        <span className="pill">{formats}</span>
        {isOpen || !licenseUrl ? (
          <span className="pill">{licenseName}</span>
        ) : (
          <a className="pill" href={licenseUrl} target="_blank" rel="noopener" title={licenseName}>
            Ver términos de uso
          </a>
        )}
      </div>
      <p className="dataset-source">
        Fuente:{" "}
        {sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noopener">
            {entry.source_name}
          </a>
        ) : (
          entry.source_name || "Fuente sin declarar"
        )}
        <br />
        Actualizado: {formatDate(entry.refreshed_at_utc)}
      </p>
    </div>
  );
}

export function Catalog({ groups }: { groups: CatalogGroup[] }) {
  return (
    <section className="band catalog" id="catalogo">
      <div className="wrap">
        <h2>Catálogo</h2>
        <p className="intro">Lo que hay disponible hoy. Crece una fuente a la vez — ver el roadmap completo abajo.</p>
        <div className="catalog-grid">
          {groups.map((group) => (
            <Fragment key={group.grupo}>
              <p className="eyebrow catalog-group-label">{group.grupo}</p>
              {group.entries.map(({ entry, titulo }) => (
                <DatasetCard key={entry.dataset} entry={entry} titulo={titulo} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
