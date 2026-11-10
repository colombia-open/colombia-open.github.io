import { BrandMark } from "./BrandMark";

const LIBRARY_URL = "https://github.com/davidcasr/colombia-open";

export function SiteFooter() {
  return (
    <footer className="band site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="foot-logo" href="#">
              <BrandMark />
              colombia-open
            </a>
            <p>Datasets públicos de Colombia, curados y normalizados para Python — una fuente a la vez.</p>
          </div>
          <div className="foot-col">
            <h4>Proyecto</h4>
            <a href="#catalogo">Catálogo</a>
            <a href="#roadmap">Roadmap</a>
            <a href={LIBRARY_URL} target="_blank" rel="noopener">GitHub</a>
          </div>
          <div className="foot-col">
            <h4>Paquete</h4>
            <a href="https://pypi.org/project/colombia-open/" target="_blank" rel="noopener">PyPI</a>
            <a href={`${LIBRARY_URL}/blob/main/docs/mcp.md`} target="_blank" rel="noopener">Servidor MCP</a>
            <a href={`${LIBRARY_URL}/releases`} target="_blank" rel="noopener">Releases</a>
          </div>
          <div className="foot-col">
            <h4>Comunidad</h4>
            <a href={`${LIBRARY_URL}/blob/main/.github/CONTRIBUTING.md`} target="_blank" rel="noopener">Cómo contribuir</a>
            <a href={`${LIBRARY_URL}/discussions`} target="_blank" rel="noopener">Discussions</a>
            <a href={`${LIBRARY_URL}/blob/main/.github/CODE_OF_CONDUCT.md`} target="_blank" rel="noopener">Código de Conducta</a>
          </div>
          <div className="foot-col">
            <h4>Licencias</h4>
            <a href={`${LIBRARY_URL}/blob/main/docs/licenses/data_licenses.md`} target="_blank" rel="noopener">
              Licencias por dataset
            </a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>colombia-open · cada dataset conserva la licencia de su fuente original</span>
          <span>
            Hecho por <a href="https://davidcasr.com/">David Castro</a> ·{" "}
            <a href="https://github.com/davidcasr">@davidcasr</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
