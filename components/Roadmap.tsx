import type { RoadmapDisplayRow } from "@/lib/types";

const ISSUE_URL = "https://github.com/davidcasr/colombia-open/issues/new?template=nueva-fuente.yml";

export function Roadmap({ rows }: { rows: RoadmapDisplayRow[] }) {
  return (
    <section className="band roadmap" id="roadmap">
      <div className="wrap">
        <h2>Roadmap</h2>
        <p className="intro">
          Lo ya publicado está arriba, en el Catálogo. Acá solo lo que falta por incorporar.
        </p>
        <div className="roadmap-table-wrap">
          <table className="roadmap-table">
            <thead>
              <tr>
                <th>Dominio</th>
                <th>Fuente oficial</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.dominio}>
                  <td>{row.dominio}</td>
                  <td>
                    {row.fuente}
                    {row.restricted && <span className="roadmap-restricted">Licencia restringida</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="roadmap-cta-card">
          <div>
            <p className="eyebrow">¿Falta algo?</p>
            <h3>¿Conoces una fuente pública que no está aquí?</h3>
            <p>Con su endpoint verificable y licencia clara, entra directo al roadmap.</p>
          </div>
          <a className="btn btn-primary" href={ISSUE_URL} target="_blank" rel="noopener">
            Proponer fuente en GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
