export function Examples() {
  return (
    <section className="band examples">
      <div className="wrap">
        <h2>Así se usa</h2>
        <p className="intro">Sin cuentas, sin tokens, sin lidiar con decenas de portales distintos.</p>
        <div className="terminal">
          <pre>
            <span className="muted">$</span> pip install colombia-open
            {"\n\n"}
            <span className="gold">from</span> colombia_open <span className="gold">import</span> ColombiaOpen
            {"\n\n"}
            {"hub = ColombiaOpen()\n"}
            {"municipios = hub.load_polars("}
            <span className="gold">&quot;municipios&quot;</span>
            {")\n"}
            {'municipios.filter(municipios["cod_dpto"] == '}
            <span className="gold">&quot;05&quot;</span>
            {")  "}
            <span className="muted"># municipios de Antioquia</span>
            {"\n\n"}
            {"hub.resolve_municipios(["}
            <span className="gold">&quot;medellín&quot;</span>
            {", "}
            <span className="gold">&quot;BOGOTÁ, D.C.&quot;</span>
            {", "}
            <span className="gold">&quot;santiago de cali&quot;</span>
            {"])\n"}
            <span className="muted"># tolera tildes y mayúsculas → cod_mpio: 05001, 11001, 76001</span>
          </pre>
        </div>
        <p className="terminal-note">
          Hace coincidencia exacta tras normalizar tildes y mayúsculas, no adivina apodos — por
          eso el ejemplo usa &quot;santiago de cali&quot; y no &quot;cali&quot;.
        </p>
        <p className="terminal-note">
          Paquete en{" "}
          <a href="https://pypi.org/project/colombia-open/" target="_blank" rel="noopener">
            PyPI
          </a>
          . ¿Usas agentes de IA? Instala el extra mcp y conecta el catálogo a tu agente — ver{" "}
          <a
            href="https://github.com/davidcasr/colombia-open/blob/main/docs/mcp.md"
            target="_blank"
            rel="noopener"
          >
            servidor MCP
          </a>
          .
        </p>
      </div>
    </section>
  );
}
