"use client";

import { useMemo, useState } from "react";
import type { CatalogGroup, DatasetEntry } from "@/lib/types";
import { formatCount, formatDate, humanSourceUrl, sourceInstitution } from "@/lib/format";

interface Row {
  entry: DatasetEntry;
  titulo: string;
  grupo: string;
}

function buildRows(groups: CatalogGroup[]): Row[] {
  return groups.flatMap((group) =>
    group.entries.map(({ entry, titulo }) => ({ entry, titulo, grupo: group.grupo }))
  );
}

function licenseOf(entry: DatasetEntry): string {
  return entry.reuse_policy?.license ?? "Licencia sin declarar";
}

function formatsOf(entry: DatasetEntry): string[] {
  return Object.keys(entry.outputs ?? {});
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function SourceLink({ entry }: { entry: DatasetEntry }) {
  const sourceUrl = humanSourceUrl(entry.source_url);
  const fullName = entry.source_name || "Fuente sin declarar";
  const label = sourceInstitution(fullName);
  const title = label === fullName ? undefined : fullName;
  if (!sourceUrl) return <span title={title}>{label}</span>;
  return (
    <a href={sourceUrl} target="_blank" rel="noopener" title={title}>
      {label}
    </a>
  );
}

export function Catalog({ groups }: { groups: CatalogGroup[] }) {
  const rows = useMemo(() => buildRows(groups), [groups]);

  const [search, setSearch] = useState("");
  const [excludedGroups, setExcludedGroups] = useState<string[]>([]);
  const [excludedFormats, setExcludedFormats] = useState<string[]>([]);
  const [excludedLicenses, setExcludedLicenses] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<"titulo" | "rows">("titulo");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const groupNames = useMemo(() => [...new Set(rows.map((r) => r.grupo))], [rows]);
  const formatNames = useMemo(() => [...new Set(rows.flatMap((r) => formatsOf(r.entry)))], [rows]);
  const licenseNames = useMemo(() => [...new Set(rows.map((r) => licenseOf(r.entry)))], [rows]);

  const q = search.trim().toLowerCase();

  const visible = useMemo(() => {
    const filtered = rows.filter((r) => {
      if (excludedGroups.includes(r.grupo)) return false;
      const formats = formatsOf(r.entry);
      if (formats.length > 0 && formats.every((f) => excludedFormats.includes(f))) return false;
      if (excludedLicenses.includes(licenseOf(r.entry))) return false;
      if (q) {
        const haystack = `${r.titulo} ${r.entry.dataset} ${r.entry.source_name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return filtered.slice().sort((a, b) => {
      const av = sortKey === "rows" ? a.entry.record_count : a.titulo.toLowerCase();
      const bv = sortKey === "rows" ? b.entry.record_count : b.titulo.toLowerCase();
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [rows, excludedGroups, excludedFormats, excludedLicenses, q, sortKey, sortDir]);

  function setSort(key: "titulo" | "rows") {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function clearFilters() {
    setSearch("");
    setExcludedGroups([]);
    setExcludedFormats([]);
    setExcludedLicenses([]);
  }

  const activeFilterCount = excludedGroups.length + excludedFormats.length + excludedLicenses.length;

  const facets = (
    <>
      <div>
        <p className="eyebrow catalog-facet-label">Grupo</p>
        <div className="catalog-facet-list">
          {groupNames.map((g) => (
            <label key={g} className="catalog-facet">
              <input
                type="checkbox"
                checked={!excludedGroups.includes(g)}
                onChange={() => setExcludedGroups((list) => toggleValue(list, g))}
              />
              {g} <span className="note">({rows.filter((r) => r.grupo === g).length})</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow catalog-facet-label">Formato</p>
        <div className="catalog-facet-list">
          {formatNames.map((f) => (
            <label key={f} className="catalog-facet">
              <input
                type="checkbox"
                checked={!excludedFormats.includes(f)}
                onChange={() => setExcludedFormats((list) => toggleValue(list, f))}
              />
              {f} <span className="note">({rows.filter((r) => formatsOf(r.entry).includes(f)).length})</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow catalog-facet-label">Licencia</p>
        <div className="catalog-facet-list">
          {licenseNames.map((l) => (
            <label key={l} className="catalog-facet">
              <input
                type="checkbox"
                checked={!excludedLicenses.includes(l)}
                onChange={() => setExcludedLicenses((list) => toggleValue(list, l))}
              />
              {l} <span className="note">({rows.filter((r) => licenseOf(r.entry) === l).length})</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="band catalog" id="catalogo">
      <div className="wrap">
        <h2>Catálogo</h2>
        <p className="intro">
          Busca y filtra por grupo, formato o licencia — crece una fuente a la vez.
        </p>

        <div className="catalog-toolbar">
          <input
            type="text"
            className="catalog-search"
            placeholder="Buscar por nombre, slug o fuente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="chip catalog-filters-btn" onClick={() => setFiltersOpen(true)}>
            Filtros{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>

        <div className="catalog-layout">
          <aside className="catalog-facets">
            {facets}
            <button type="button" className="chip" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </aside>

          <div className="catalog-results">
            <div className="catalog-sort">
              <span className="note">Ordenar:</span>
              <button type="button" className="chip" onClick={() => setSort("titulo")}>
                Nombre {sortKey === "titulo" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </button>
              <button type="button" className="chip" onClick={() => setSort("rows")}>
                Filas {sortKey === "rows" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </button>
            </div>

            <div className="catalog-table-wrap">
              <table className="catalog-table">
                <thead>
                  <tr>
                    <th>Dataset</th>
                    <th className="nowrap">Grupo</th>
                    <th className="num nowrap">Filas</th>
                    <th className="nowrap">Formato</th>
                    <th className="nowrap">Fuente</th>
                    <th className="nowrap">Actualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r.entry.dataset}>
                      <td>
                        <div className="catalog-row-title">{r.titulo}</div>
                        <div className="dataset-slug">{r.entry.dataset}</div>
                      </td>
                      <td className="nowrap">{r.grupo}</td>
                      <td className="num nowrap">{formatCount(r.entry.record_count)}</td>
                      <td className="nowrap">{formatsOf(r.entry).join(" · ") || "—"}</td>
                      <td className="nowrap">
                        <SourceLink entry={r.entry} />
                      </td>
                      <td className="note nowrap">{formatDate(r.entry.refreshed_at_utc)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visible.length === 0 && (
                <p className="catalog-empty">Ningún dataset coincide con estos filtros.</p>
              )}
            </div>
            <p className="catalog-count catalog-count-desktop">
              {visible.length} de {rows.length} datasets
            </p>
          </div>
        </div>

        <p className="catalog-count catalog-count-mobile">
          {visible.length} de {rows.length} datasets
        </p>
        <div className="catalog-list">
          {visible.map((r) => (
            <div key={r.entry.dataset} className="dataset-card catalog-list-item">
              <div className="catalog-list-row">
                <span className="catalog-row-title">{r.titulo}</span>
                <span className="note">{formatCount(r.entry.record_count)}</span>
              </div>
              <div className="dataset-slug">{r.entry.dataset}</div>
              <p className="note catalog-list-meta">
                {r.grupo} · {formatsOf(r.entry).join(" · ") || "—"} ·{" "}
                <SourceLink entry={r.entry} />
              </p>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="catalog-empty">Ningún dataset coincide con estos filtros.</p>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="catalog-filters-sheet">
          <div className="catalog-filters-sheet-header">
            <span className="catalog-filters-sheet-title">Filtros</span>
            <button
              type="button"
              className="icon-btn"
              aria-label="Cerrar filtros"
              onClick={() => setFiltersOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
          <div className="catalog-filters-sheet-body">{facets}</div>
          <div className="catalog-filters-sheet-actions">
            <button type="button" className="btn btn-secondary" onClick={clearFilters}>
              Limpiar
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
              Ver {visible.length} resultados
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
