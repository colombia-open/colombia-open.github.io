import type { RoadmapDisplayRow } from "@/lib/types";

export function Roadmap({ rows }: { rows: RoadmapDisplayRow[] }) {
  return (
    <section className="band roadmap" id="roadmap">
      <div className="wrap">
        <h2>Roadmap</h2>
        <p className="intro">
          Crece una fuente a la vez, de punta a punta. Esta tabla es el mapa completo:
          implementadas y por venir.
        </p>
        <div className="roadmap-table-wrap">
          <table className="roadmap-table">
            <thead>
              <tr>
                <th>Dominio</th>
                <th>Fuente oficial</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.dominio}>
                  <td>{row.dominio}</td>
                  <td>{row.fuente}</td>
                  <td>
                    <span className={`status-dot ${row.done ? "done" : "pending"}`} />
                    {row.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="roadmap-cta">
          ¿Conoces una fuente pública que falta?{" "}
          <a
            href="https://github.com/davidcasr/colombia-open/issues/new?template=nueva-fuente.yml"
            target="_blank"
            rel="noopener"
          >
            Propónla en GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
