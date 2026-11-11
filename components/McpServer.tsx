const LIBRARY_URL = "https://github.com/davidcasr/colombia-open";

export function McpServer() {
  return (
    <section className="band mcp" id="mcp">
      <div className="wrap">
        <p className="eyebrow">Para agentes de IA</p>
        <h2>Servidor MCP</h2>
        <p className="intro">
          El mismo catálogo, expuesto a tu agente por{" "}
          <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">
            Model Context Protocol
          </a>
          . Tres herramientas, no treinta: <code>list_datasets</code> para explorar,{" "}
          <code>describe_dataset</code> para ver el esquema de uno, y <code>query</code> para
          correr SQL de solo lectura entre todos los datasets a la vez.
        </p>
        <div className="terminal">
          <pre>
            <span className="muted">$</span> pip install <span className="gold">&quot;colombia-open[mcp]&quot;</span>
            {"\n\n"}
            <span className="muted"># claude_desktop_config.json</span>
            {"\n"}
            {"{"}
            {'"mcpServers": {"colombia-open": {"command": '}
            <span className="gold">&quot;colombia-open&quot;</span>
            {', "args": ['}
            <span className="gold">&quot;mcp&quot;</span>
            {"]}}}"}
          </pre>
        </div>
        <p className="terminal-note">
          Ver la{" "}
          <a href={`${LIBRARY_URL}/blob/main/docs/mcp.md`} target="_blank" rel="noopener">
            documentación del servidor MCP
          </a>{" "}
          para la lista completa de herramientas y sus límites de seguridad.
        </p>
      </div>
    </section>
  );
}
