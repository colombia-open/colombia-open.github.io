import { BrandMark, GithubMark } from "./BrandMark";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <BrandMark className="hero-mark" />
        <p className="eyebrow">colombia-open</p>
        <h1>Datos públicos de Colombia, listos para usar en Python.</h1>
        <p className="lede">
          Los datos públicos de Colombia existen, pero cada uno en su portal y en su formato.
          Aquí los encuentras limpios, en un mismo lugar y listos para cargar, con su fuente y
          licencia siempre a la vista.
        </p>
        <div className="hero-audience">
          <span className="eyebrow hero-audience-label">Para</span>
          <span className="pill">Analistas</span>
          <span className="pill">Periodistas de datos</span>
          <span className="pill">Investigadores</span>
          <span className="pill">Agentes de IA</span>
        </div>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#catalogo">
            Ver catálogo
          </a>
          <a className="btn btn-secondary" href="https://github.com/davidcasr/colombia-open">
            <GithubMark width={16} height={16} />
            Ver en GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
