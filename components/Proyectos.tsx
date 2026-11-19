"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory, ProjectEntry } from "@/lib/types";
import { GithubMark } from "./BrandMark";

const ISSUE_URL = "https://github.com/davidcasr/colombia-open/issues/new";

const FILTERS: Array<{ key: "all" | ProjectCategory; label: string }> = [
  { key: "all", label: "Todos" },
  { key: "demo", label: "Demos de la comunidad" },
  { key: "externo", label: "Proyectos externos" },
];

const BADGE_LABEL: Record<ProjectCategory, string> = {
  demo: "Demo",
  externo: "Externo",
};

export function Proyectos({ proyectos }: { proyectos: ProjectEntry[] }) {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const visible = useMemo(
    () => (filter === "all" ? proyectos : proyectos.filter((p) => p.categoria === filter)),
    [proyectos, filter]
  );

  const counts = useMemo(() => {
    const byCategory = { demo: 0, externo: 0 } as Record<ProjectCategory, number>;
    proyectos.forEach((p) => byCategory[p.categoria]++);
    return { all: proyectos.length, ...byCategory };
  }, [proyectos]);

  return (
    <section className="band proyectos" id="proyectos">
      <div className="wrap">
        <h2>Proyectos</h2>
        <p className="intro">
          Demos pequeñas de la comunidad y aplicaciones externas que ya corren sobre el paquete.
        </p>

        <div className="proyecto-filters" role="group" aria-label="Filtrar proyectos">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="chip"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label} ({counts[f.key]})
            </button>
          ))}
        </div>

        <div className="proyecto-grid">
          {visible.map((p) => (
            <article key={p.repo} className="dataset-card proyecto-card">
              <div className="proyecto-card-top">
                <h3>{p.titulo}</h3>
                <span className={`proyecto-badge ${p.categoria}`}>{BADGE_LABEL[p.categoria]}</span>
              </div>
              <p className="dataset-slug">{p.repo}</p>
              <p>{p.descripcion}</p>
              <div className="proyecto-stack">
                {p.stack.map((tech) => (
                  <span key={tech} className="proyecto-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="proyecto-links">
                <a href={`https://github.com/${p.repo}`} target="_blank" rel="noopener">
                  <GithubMark width={14} height={14} />
                  GitHub
                </a>
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                    Ver demo
                  </a>
                )}
              </div>
            </article>
          ))}
          {visible.length === 0 && <p className="catalog-empty">Ningún proyecto coincide con este filtro.</p>}
        </div>

        <div className="cta-card">
          <div>
            <p className="eyebrow">Sumar el tuyo</p>
            <h3>¿Construiste algo con colombia-open?</h3>
            <p>Abre un issue con el nombre, una línea de descripción y el link — lo agregamos a esta sección.</p>
          </div>
          <a className="btn btn-primary" href={ISSUE_URL} target="_blank" rel="noopener">
            Agregar tu proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
