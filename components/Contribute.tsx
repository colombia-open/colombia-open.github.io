const LIBRARY_URL = "https://github.com/davidcasr/colombia-open";

export function Contribute() {
  return (
    <section className="band contribute" id="contribuir">
      <div className="wrap">
        <h2>Contribuir</h2>
        <p className="intro">
          colombia-open es abierto y crece con quien lo usa. Hay tres formas de sumarse, ninguna
          requiere permiso previo.
        </p>
        <div className="contribute-grid">
          <div className="dataset-card">
            <p className="eyebrow">01 · Datos</p>
            <h3>Propón una fuente</h3>
            <p>
              Una fuente oficial con endpoint verificable y licencia clara. Cada propuesta pasa
              por el mismo filtro: procedencia, vigencia y validación.
            </p>
            <a
              className="btn btn-secondary"
              href={`${LIBRARY_URL}/issues/new?template=nueva-fuente.yml`}
              target="_blank"
              rel="noopener"
            >
              Proponer fuente
            </a>
          </div>
          <div className="dataset-card">
            <p className="eyebrow">02 · Código</p>
            <h3>Escribe código</h3>
            <p>
              Toma un issue marcado para empezar, comenta que lo trabajas y sigue la guía: una
              fuente por PR, de punta a punta, con tests y docs.
            </p>
            <a
              className="contribute-link"
              href={`${LIBRARY_URL}/labels/good%20first%20issue`}
              target="_blank"
              rel="noopener"
            >
              Ver issues para empezar →
            </a>
            <a
              className="btn btn-secondary"
              href={`${LIBRARY_URL}/blob/main/.github/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener"
            >
              Guía de contribución
            </a>
          </div>
          <div className="dataset-card">
            <p className="eyebrow">03 · Comunidad</p>
            <h3>Conversa</h3>
            <p>
              Preguntas de uso, ideas aún sin forma o casos de uso que te gustaría resolver. Un
              buen lugar para empezar antes de abrir un issue.
            </p>
            <a className="btn btn-secondary" href={`${LIBRARY_URL}/discussions`} target="_blank" rel="noopener">
              Ir a Discussions
            </a>
          </div>
        </div>
        <p className="terminal-note">
          Al participar aceptas el{" "}
          <a href={`${LIBRARY_URL}/blob/main/.github/CODE_OF_CONDUCT.md`} target="_blank" rel="noopener">
            Código de Conducta
          </a>
          . ¿Encontraste una vulnerabilidad? Repórtala en privado — ver la{" "}
          <a href={`${LIBRARY_URL}/blob/main/.github/SECURITY.md`} target="_blank" rel="noopener">
            política de seguridad
          </a>
          .
        </p>
      </div>
    </section>
  );
}
