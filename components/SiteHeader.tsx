import Link from "next/link";
import { BrandMark, GithubMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

const LIBRARY_URL = "https://github.com/davidcasr/colombia-open";

export function SiteHeader({ releaseTag, releaseUrl }: { releaseTag: string; releaseUrl: string }) {
  return (
    <header className="site-header">
      <div className="wrap">
        <nav className="nav">
          <div className="brand-group">
            <Link className="nav-brand" href="#">
              <BrandMark />
              colombia-open
            </Link>
            <a className="version-badge" href={releaseUrl} target="_blank" rel="noopener">
              {releaseTag}
            </a>
          </div>
          <div className="nav-links">
            <a href="#catalogo">Catálogo</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#contribuir">Contribuir</a>
            <a href="https://pypi.org/project/colombia-open/" target="_blank" rel="noopener">
              PyPI
            </a>
            <a className="nav-github" href={LIBRARY_URL}>
              <GithubMark />
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
